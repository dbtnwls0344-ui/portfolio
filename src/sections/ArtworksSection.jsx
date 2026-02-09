import { useEffect, useMemo, useRef, useState } from "react";
import "./ArtworksSection.css";

import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import artworksCover from "../assets/images/artworks-cover.png";
import artworksPage01Left from "../assets/images/artworks-page-01-left.png";
import artworksPage01Right from "../assets/images/artworks-page-01-right.png";
import artworksPage02Left from "../assets/images/artworks-page-02-left.png";
import artworksPage02Right from "../assets/images/artworks-page-02-right.png";

export default function ArtworksSection() {
  const spreads = useMemo(
    () => [
      { left: artworksPage01Left, right: artworksPage01Right },
      { left: artworksPage02Left, right: artworksPage02Right },
    ],
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isCoverFlipped, setIsCoverFlipped] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null);
  const [flipGo, setFlipGo] = useState(false);

  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const loadIdRef = useRef(0);

  const flipTimeoutRef = useRef(null);
  const cacheRef = useRef(new Set());

  const activeSpread = spreads[activeIndex];
  const nextIndex = Math.min(activeIndex + 1, spreads.length - 1);
  const prevIndex = Math.max(activeIndex - 1, 0);
  const nextSpread = spreads[nextIndex];
  const prevSpread = spreads[prevIndex];

  const preload = (src) =>
    new Promise((resolve) => {
      if (!src) return resolve();
      if (cacheRef.current.has(src)) return resolve();

      const img = new Image();
      img.onload = () => {
        cacheRef.current.add(src);
        resolve();
      };
      img.onerror = resolve;
      img.src = src;
    });

  /* open 시: cover + 첫 spread 로드 */
  useEffect(() => {
    if (!isOpen) return;

    const myLoadId = ++loadIdRef.current;

    Promise.all([
      preload(artworksCover),
      preload(spreads[0]?.left),
      preload(spreads[0]?.right),
    ]).then(() => {
      if (loadIdRef.current !== myLoadId) return;
      setIsAssetsReady(true);
    });
  }, [isOpen, spreads]);

  /* 페이지 바뀔 때: next/prev warm */
  useEffect(() => {
    if (!isOpen) return;

    const toWarm = [
      spreads[activeIndex]?.left,
      spreads[activeIndex]?.right,
      spreads[nextIndex]?.left,
      spreads[nextIndex]?.right,
      spreads[prevIndex]?.left,
      spreads[prevIndex]?.right,
    ].filter(Boolean);

    toWarm.forEach((src) => preload(src));
  }, [isOpen, activeIndex, nextIndex, prevIndex, spreads]);

  const handleOpen = () => {
    if (isOpen) return;

    setIsAssetsReady(false);
    setActiveIndex(0);
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
    if (!isCoverFlipped) return;
    if (activeIndex === spreads.length - 1) return;
    startFlip("next", activeIndex + 1);
  };

  const handlePrev = () => {
    if (!isCoverFlipped) return;
    if (activeIndex === 0) return;
    startFlip("prev", activeIndex - 1);
  };

  useEffect(() => {
    return () => clearTimeout(flipTimeoutRef.current);
  }, []);

  return (
    <section className="artworks-section section" id="artworks">
      <div className="artworks-section__header">
        <div className="artworks-section__title-wrap">
          <img className="artworks-section__star" src={aboutIconWhite} alt="" />
          <h2 className="artworks-section__title">MY ARTWORKS</h2>
          <img className="artworks-section__star" src={aboutIconWhite} alt="" />
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
