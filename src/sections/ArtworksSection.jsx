import { useEffect, useMemo, useRef, useState } from "react";
import "./ArtworksSection.css";

import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import artworksCover from "../assets/images/artworks-cover.png";
import artworksPage01Left from "../assets/images/artworks-page-01-left.png";
import artworksPage01Right from "../assets/images/artworks-page-01-right.png";
import artworksPage02Left from "../assets/images/artworks-page-02-left.png";
import artworksPage02Right from "../assets/images/artworks-page-02-right.png";

function ArtworksSection() {
  const spreads = useMemo(
    () => [
      { left: artworksPage01Left, right: artworksPage01Right },
      { left: artworksPage02Left, right: artworksPage02Right },
    ],
    [],
  );

  // open/close
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isCoverFlipped, setIsCoverFlipped] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // pages
  const [activeIndex, setActiveIndex] = useState(0);

  // flip
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null); // "next" | "prev"
  const [flipGo, setFlipGo] = useState(false);

  // ✅ “밑에 깔릴 페이지”를 state로 안두고, 목표 인덱스를 따로 둠
  const [targetIndex, setTargetIndex] = useState(0);

  const flipTimeoutRef = useRef(null);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === spreads.length - 1;

  const activeSpread = spreads[activeIndex];
  const nextSpread = spreads[Math.min(activeIndex + 1, spreads.length - 1)];
  const prevSpread = spreads[Math.max(activeIndex - 1, 0)];

  // ✅ underSpread는 “플립 중이면 targetIndex, 아니면 activeIndex”
  const underIndex = isFlipping ? targetIndex : activeIndex;
  const underSpread = spreads[underIndex];

  const canInteract = isOpen && !isOpening && !isClosing && !isFlipping;

  /* ================= OPEN ================= */

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setIsOpening(false);
    setIsCoverFlipped(false);
    setIsClosing(false);
    setFlipGo(false);
    setIsFlipping(false);
    setFlipDir(null);
    setTargetIndex(0);
  };

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => setIsOpening(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  /* ================= CLOSE ================= */

  const cleanupFlipTimer = () => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
  };

  const handleClose = () => {
    if (!isOpen || isClosing) return;

    cleanupFlipTimer();
    setIsClosing(true);
    setIsFlipping(false);
    setFlipDir(null);
    setFlipGo(false);
  };

  const onCoverTransitionEnd = (e) => {
    if (e.propertyName !== "transform") return;

    if (isOpening) {
      setIsCoverFlipped(true);
      setIsOpening(false);
      return;
    }

    if (isClosing) {
      setIsClosing(false);
      setIsOpen(false);
      setActiveIndex(0);
      setTargetIndex(0);
      setIsCoverFlipped(false);
      setFlipGo(false);
      setIsFlipping(false);
      setFlipDir(null);
    }
  };

  /* ================= FLIP ================= */

  const finalizeFlip = (target) => {
    setActiveIndex(target);
    setTargetIndex(target);
    setIsFlipping(false);
    setFlipDir(null);
    setFlipGo(false);
    cleanupFlipTimer();
  };

  const startFlip = (dir, target) => {
    setIsFlipping(true);
    setFlipDir(dir);
    setTargetIndex(target);

    setFlipGo(false);
    requestAnimationFrame(() => setFlipGo(true));

    cleanupFlipTimer();
    flipTimeoutRef.current = setTimeout(() => finalizeFlip(target), 720);
  };

  const handleNext = () => {
    if (!canInteract) return;

    // ✅ 마지막 페이지에서 오른쪽 클릭 -> 닫기
    if (isLast) {
      handleClose();
      return;
    }

    startFlip("next", activeIndex + 1);
  };

  const handlePrev = () => {
    if (!canInteract) return;

    // ✅ 첫 페이지에서 왼쪽 클릭 -> 닫기
    if (isFirst) {
      handleClose();
      return;
    }

    startFlip("prev", activeIndex - 1);
  };

  useEffect(() => {
    return () => cleanupFlipTimer();
  }, []);

  return (
    <section className="artworks-section section" id="artworks">
      <div className="artworks-section__header">
        <div className="artworks-section__title-wrap">
          <img
            className="artworks-section__star"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
          <h2 className="artworks-section__title">MY ARTWORKS</h2>
          <img
            className="artworks-section__star"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
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
          <div className="artworks-book-area">
            <div
              className={[
                "artworks-book",
                isCoverFlipped ? "is-cover-open" : "is-cover-closed",
                flipGo && flipDir ? `is-${flipDir}` : "",
                isClosing ? "is-closing" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* under pages */}
              <div className="artworks-book__pages">
                <div
                  className="artworks-page artworks-page--left"
                  onClick={handlePrev}
                >
                  <img src={underSpread.left} alt="" aria-hidden />
                </div>

                <div
                  className="artworks-page artworks-page--right"
                  onClick={handleNext}
                >
                  <img src={underSpread.right} alt="" aria-hidden />
                </div>
              </div>

              {/* flip sheet */}
              {isCoverFlipped && isFlipping && flipDir && (
                <div
                  className={`artworks-flip is-${flipDir}`}
                  onTransitionEnd={(e) => {
                    if (e.propertyName !== "transform") return;
                    finalizeFlip(targetIndex);
                  }}
                  aria-hidden="true"
                >
                  {flipDir === "next" && (
                    <>
                      <div className="face front">
                        <img src={activeSpread.right} alt="" aria-hidden />
                      </div>
                      <div className="face back">
                        <img src={nextSpread.left} alt="" aria-hidden />
                      </div>
                    </>
                  )}

                  {flipDir === "prev" && (
                    <>
                      <div className="face front">
                        <img src={activeSpread.left} alt="" aria-hidden />
                      </div>
                      <div className="face back">
                        <img src={prevSpread.right} alt="" aria-hidden />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* cover layer (click to close) */}
              <div
                className={[
                  "artworks-book__cover",
                  isOpening ? "is-opening" : "",
                  isCoverFlipped ? "is-flipped" : "",
                  isClosing ? "is-closing" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--cover-image": `url(${artworksCover})` }}
                onClick={handleClose}
                onTransitionEnd={onCoverTransitionEnd}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArtworksSection;
