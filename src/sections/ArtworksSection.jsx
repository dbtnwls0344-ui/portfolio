import { useEffect, useMemo, useRef, useState } from "react";
import "./ArtworksSection.css";
import aboutIconWhite from "../assets/images/about-icon-star-white.svg";

function ArtworksSection() {
  const coverImage = "/images/artworks-cover.png";
  const spreads = useMemo(
    () => [
      {
        id: "spread-01",
        left: {
          label: "ART WORK",
          image: "/images/artworks-page-01-left.png",
          caption: "Oil on canvas · 2024",
        },
        right: {
          image: "/images/artworks-page-01-right.png",
          caption: "Acrylic and oil on board · 2024",
        },
      },
      {
        id: "spread-02",
        left: {
          label: "ART WORK",
          image: "/images/artworks-page-02-left.png",
          caption: "Oil on canvas · 2024",
        },
        right: {
          image: "/images/artworks-page-02-right.png",
          caption: "Oil on canvas · 2022",
        },
      },
    ],
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const flipTimeoutRef = useRef(null);

  const activeSpread = spreads[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === spreads.length - 1;
  const isFlipping = Boolean(flipDirection);

  const resetFlip = () => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    flipTimeoutRef.current = null;
    setFlipDirection(null);
  };

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    resetFlip();
    setIsOpen(false);
    setActiveIndex(0);
  };

  const handleNext = () => {
    if (isLast || isFlipping) return;
    setFlipDirection("next");
    flipTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => Math.min(prev + 1, spreads.length - 1));
      resetFlip();
    }, 360);
  };

  const handlePrev = () => {
    if (isFirst || isFlipping) return;
    setFlipDirection("prev");
    flipTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      resetFlip();
    }, 360);
  };

  return (
    <section className="artworks-section section" id="artworks">
      <div className="artworks-section__header">
        <div className="artworks-section__title-wrap">
          <img
            className="artworks-section__star artworks-section__star--left"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
          <h2 className="artworks-section__title">MY ARTWORKS</h2>
          <img
            className="artworks-section__star artworks-section__star--right"
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
            style={{
              "--cover-image": coverImage ? `url(${coverImage})` : "none",
            }}
          >
            <span className="artworks-cover__label">Works Catalogue</span>
            <span className="artworks-cover__name">YOU SOOJIN</span>
            <span className="artworks-cover__hint">Click to open</span>
          </button>
        ) : (
          <div className="artworks-book-area">
            <div
              className={`artworks-book${
                isFlipping ? ` is-flipping is-flipping--${flipDirection}` : ""
              }`}
            >
              <div className="artworks-book__pages">
                <div className="artworks-page artworks-page--left">
                  <span className="artworks-page__label">
                    {activeSpread?.left?.label}
                  </span>
                  <div
                    className="artworks-page__image"
                    style={{
                      "--page-image": activeSpread?.left?.image
                        ? `url(${activeSpread.left.image})`
                        : "none",
                    }}
                    role="img"
                    aria-label="왼쪽 페이지 작품"
                  />
                  <span className="artworks-page__caption">
                    {activeSpread?.left?.caption}
                  </span>
                </div>
                <div className="artworks-page artworks-page--right">
                  <div
                    className="artworks-page__image"
                    style={{
                      "--page-image": activeSpread?.right?.image
                        ? `url(${activeSpread.right.image})`
                        : "none",
                    }}
                    role="img"
                    aria-label="오른쪽 페이지 작품"
                  />
                  <span className="artworks-page__caption">
                    {activeSpread?.right?.caption}
                  </span>
                </div>
              </div>
              <span className="artworks-book__spine" aria-hidden="true" />
            </div>

            <div className="artworks-controls">
              <button
                className="artworks-controls__button"
                type="button"
                onClick={handlePrev}
                disabled={isFirst}
              >
                Prev
              </button>
              <span className="artworks-controls__count">
                {activeIndex + 1} / {spreads.length}
              </span>
              <button
                className="artworks-controls__button"
                type="button"
                onClick={handleNext}
                disabled={isLast}
              >
                Next
              </button>
              <button
                className="artworks-controls__close"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArtworksSection;
