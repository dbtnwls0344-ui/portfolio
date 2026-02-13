import { useEffect, useMemo, useRef, useState } from "react";
import "./ArtworksSection.css";

import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import artworksCover from "../assets/images/artworks-cover.webp";
import artworksPage01Left from "../assets/images/artworks-page-01-left.webp";
import artworksPage01Right from "../assets/images/artworks-page-01-right.webp";
import artworksPage02Left from "../assets/images/artworks-page-02-left.webp";
import artworksPage02Right from "../assets/images/artworks-page-02-right.webp";

export default function ArtworksSection() {
  const spreads = useMemo(
    () => [
      { left: artworksPage01Left, right: artworksPage01Right },
      { left: artworksPage02Left, right: artworksPage02Right },
    ],
    [],
  );
  const pages = useMemo(
    () =>
      spreads.flatMap((spread, spreadIndex) => [
        {
          src: spread.left,
          alt: `Artwork page ${spreadIndex * 2 + 1}`,
        },
        {
          src: spread.right,
          alt: `Artwork page ${spreadIndex * 2 + 2}`,
        },
      ]),
    [spreads],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isCoverFlipped, setIsCoverFlipped] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [isMobileFlipping, setIsMobileFlipping] = useState(false);
  const [mobileFlipDir, setMobileFlipDir] = useState(null);
  const [mobileFlipGo, setMobileFlipGo] = useState(false);
  const [mobileFlipTargetIndex, setMobileFlipTargetIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px)").matches;
  });

  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null);
  const [flipGo, setFlipGo] = useState(false);

  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const loadIdRef = useRef(0);

  const flipTimeoutRef = useRef(null);
  const mobileFlipTimeoutRef = useRef(null);
  const cacheRef = useRef(new Set());

  const activeSpread = spreads[activeIndex];
  const nextIndex = Math.min(activeIndex + 1, spreads.length - 1);
  const prevIndex = Math.max(activeIndex - 1, 0);
  const nextSpread = spreads[nextIndex];
  const prevSpread = spreads[prevIndex];
  const activeMobilePage = pages[mobilePageIndex];
  const targetMobilePage = pages[mobileFlipTargetIndex];
  const mobilePrevIndex = Math.max(mobilePageIndex - 1, 0);
  const mobileNextIndex = Math.min(mobilePageIndex + 1, pages.length - 1);

  const preload = (src) =>
    new Promise((resolve) => {
      if (!src) return resolve();
      if (cacheRef.current.has(src)) return resolve();

      const img = new Image();
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        cacheRef.current.add(src);
        resolve();
      };

      img.onload = done;
      img.onerror = done;
      img.decoding = "async";
      img.src = src;

      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done);
      }
    });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const syncViewport = (event) => {
      const nextIsMobile = event.matches;
      setIsMobileViewport(nextIsMobile);

      if (nextIsMobile) {
        setMobilePageIndex((prev) => Math.min(prev, pages.length - 1));
        return;
      }

      setActiveIndex((prev) => Math.min(prev, spreads.length - 1));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncViewport);
    } else {
      mediaQuery.addListener(syncViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncViewport);
      } else {
        mediaQuery.removeListener(syncViewport);
      }
    };
  }, [pages.length, spreads.length]);

  /* open 시: cover + 첫 spread 로드 */
  useEffect(() => {
    if (!isOpen) return;

    const myLoadId = ++loadIdRef.current;

    Promise.all([
      preload(artworksCover),
      preload(pages[0]?.src),
      preload(pages[1]?.src),
    ]).then(() => {
      if (loadIdRef.current !== myLoadId) return;
      setIsAssetsReady(true);
    });
  }, [isOpen, pages]);

  /* 페이지 바뀔 때: next/prev warm */
  useEffect(() => {
    if (!isOpen) return;

    if (isMobileViewport) {
      const toWarm = [
        pages[mobilePageIndex]?.src,
        pages[mobileNextIndex]?.src,
        pages[mobilePrevIndex]?.src,
      ].filter(Boolean);

      toWarm.forEach((src) => preload(src));
      return;
    }

    const toWarm = [
      spreads[activeIndex]?.left,
      spreads[activeIndex]?.right,
      spreads[nextIndex]?.left,
      spreads[nextIndex]?.right,
      spreads[prevIndex]?.left,
      spreads[prevIndex]?.right,
    ].filter(Boolean);

    toWarm.forEach((src) => preload(src));
  }, [
    isOpen,
    isMobileViewport,
    pages,
    mobilePageIndex,
    mobileNextIndex,
    mobilePrevIndex,
    activeIndex,
    nextIndex,
    prevIndex,
    spreads,
  ]);

  const handleOpen = () => {
    if (isOpen) return;

    setIsAssetsReady(false);
    setActiveIndex(0);
    setMobilePageIndex(0);
    setIsMobileFlipping(false);
    setMobileFlipDir(null);
    setMobileFlipGo(false);
    setMobileFlipTargetIndex(0);
    setIsCoverFlipped(false);
    setIsOpen(true);

    requestAnimationFrame(() => setIsOpening(true));
  };

  const startFlip = (dir, target) => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipDir(dir);
    setFlipGo(false);

    requestAnimationFrame(() => setFlipGo(true));

    clearTimeout(flipTimeoutRef.current);
    flipTimeoutRef.current = setTimeout(() => {
      setActiveIndex(target);
      setIsFlipping(false);
      setFlipDir(null);
      setFlipGo(false);
    }, 700);
  };

  const handleNext = () => {
    if (isMobileViewport) return;
    if (!isCoverFlipped) return;
    if (activeIndex === spreads.length - 1) return;
    startFlip("next", activeIndex + 1);
  };

  const handlePrev = () => {
    if (isMobileViewport) return;
    if (!isCoverFlipped) return;
    if (activeIndex === 0) return;
    startFlip("prev", activeIndex - 1);
  };

  const handleMobileNext = () => {
    if (isMobileFlipping || mobilePageIndex >= pages.length - 1) return;

    const target = mobilePageIndex + 1;
    setIsMobileFlipping(true);
    setMobileFlipDir("next");
    setMobileFlipTargetIndex(target);
    setMobileFlipGo(false);

    requestAnimationFrame(() => setMobileFlipGo(true));

    clearTimeout(mobileFlipTimeoutRef.current);
    mobileFlipTimeoutRef.current = setTimeout(() => {
      setMobilePageIndex(target);
      setIsMobileFlipping(false);
      setMobileFlipDir(null);
      setMobileFlipGo(false);
    }, 560);
  };

  const handleMobilePrev = () => {
    if (isMobileFlipping || mobilePageIndex <= 0) return;

    const target = mobilePageIndex - 1;
    setIsMobileFlipping(true);
    setMobileFlipDir("prev");
    setMobileFlipTargetIndex(target);
    setMobileFlipGo(false);

    requestAnimationFrame(() => setMobileFlipGo(true));

    clearTimeout(mobileFlipTimeoutRef.current);
    mobileFlipTimeoutRef.current = setTimeout(() => {
      setMobilePageIndex(target);
      setIsMobileFlipping(false);
      setMobileFlipDir(null);
      setMobileFlipGo(false);
    }, 560);
  };

  useEffect(() => {
    return () => {
      clearTimeout(flipTimeoutRef.current);
      clearTimeout(mobileFlipTimeoutRef.current);
    };
  }, []);

  return (
    <section className="artworks-section section" id="artworks">
      <div className="artworks-section__header">
        <div className="artworks-section__title-wrap">
          <img className="artworks-section__star" src={aboutIconWhite} alt="" />
          <h2 className="artworks-section__title">MY ARTWORKS</h2>
        </div>
        <p className="artworks-section__subtitle">Notes on form</p>
      </div>

      <div className="artworks-section__stage">
        {!isOpen ? (
          <button
            className="artworks-cover"
            type="button"
            onClick={handleOpen}
            style={{ "--cover-image": `url(${artworksCover})` }}
          >
            <span className="artworks-cover__label">Works Catalogue</span>
            <span className="artworks-cover__name">YOU SOOJIN</span>
            <span className="artworks-cover__hint">Click to open</span>
          </button>
        ) : (
          <div
            className={[
              "artworks-book",
              !isAssetsReady ? "is-loading" : "",
              flipGo && flipDir ? `is-${flipDir}` : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ "--cover-image": `url(${artworksCover})` }}
          >
            {/* ✅ left fake cover (back cover) */}
            <div
              className={[
                "artworks-book__backcover",
                isCoverFlipped ? "is-hidden" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            />

            {isMobileViewport ? (
              <div className="artworks-mobile">
                <div className="artworks-mobile__viewport">
                  <img
                    className="artworks-page__full artworks-mobile__current"
                    src={activeMobilePage?.src}
                    alt={activeMobilePage?.alt ?? ""}
                    loading="eager"
                    decoding="async"
                  />

                  {isMobileFlipping && mobileFlipDir && targetMobilePage && (
                    <div
                      className={[
                        "artworks-mobile__flip",
                        `is-${mobileFlipDir}`,
                        mobileFlipGo ? "is-go" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden
                    >
                      <div className="artworks-mobile__face artworks-mobile__face--front">
                        <img
                          src={activeMobilePage?.src}
                          alt=""
                          decoding="async"
                          loading="eager"
                        />
                      </div>
                      <div className="artworks-mobile__face artworks-mobile__face--back">
                        <img
                          src={targetMobilePage.src}
                          alt=""
                          decoding="async"
                          loading="eager"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    className="artworks-mobile__hit artworks-mobile__hit--prev"
                    type="button"
                    onClick={handleMobilePrev}
                    disabled={isMobileFlipping || mobilePageIndex === 0}
                    aria-label="Previous artwork page"
                  />
                  <button
                    className="artworks-mobile__hit artworks-mobile__hit--next"
                    type="button"
                    onClick={handleMobileNext}
                    disabled={
                      isMobileFlipping || mobilePageIndex === pages.length - 1
                    }
                    aria-label="Next artwork page"
                  />
                </div>

                <nav className="artworks-mobile__dots" aria-label="Artwork pages">
                  {pages.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      className={`artworks-mobile__dot ${
                        dotIndex === mobilePageIndex ? "is-active" : ""
                      }`}
                      type="button"
                      onClick={() => setMobilePageIndex(dotIndex)}
                      aria-label={`Go to artwork page ${dotIndex + 1}`}
                    />
                  ))}
                </nav>
              </div>
            ) : (
              <>
                {/* pages */}
                <div className="artworks-book__pages">
                  <div
                    className="artworks-page artworks-page--left"
                    onClick={handlePrev}
                  >
                    <img
                      className="artworks-page__full"
                      src={activeSpread.left}
                      alt=""
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <div
                    className="artworks-page artworks-page--right"
                    onClick={handleNext}
                  >
                    <img
                      className="artworks-page__full"
                      src={activeSpread.right}
                      alt=""
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* flip sheet */}
                {isCoverFlipped && isFlipping && flipDir && (
                  <div className={`artworks-flip is-${flipDir}`} aria-hidden>
                    {flipDir === "next" && (
                      <>
                        <div className="face front">
                          <img src={activeSpread.right} alt="" decoding="async" />
                        </div>
                        <div className="face back">
                          <img src={nextSpread.left} alt="" decoding="async" />
                        </div>
                      </>
                    )}

                    {flipDir === "prev" && (
                      <>
                        <div className="face front">
                          <img src={activeSpread.left} alt="" decoding="async" />
                        </div>
                        <div className="face back">
                          <img src={prevSpread.right} alt="" decoding="async" />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            {/* right cover */}
            <div
              className={[
                "artworks-book__cover",
                isOpening ? "is-opening" : "",
                isCoverFlipped ? "is-flipped" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--cover-image": `url(${artworksCover})` }}
              onTransitionEnd={(e) => {
                if (e.propertyName !== "transform") return;
                setIsCoverFlipped(true);
                setIsOpening(false);
              }}
              aria-hidden
            />
          </div>
        )}
      </div>
    </section>
  );
}
