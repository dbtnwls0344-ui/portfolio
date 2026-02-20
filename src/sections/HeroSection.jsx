import { useEffect, useRef } from "react";
import "./HeroSection.css";
import heroCardFront from "../assets/images/hero-card-front.webp";
import heroCardMid from "../assets/images/hero-card-mid.png";
import heroCardMidHover from "../assets/images/hero-card-mid-hover.png";
import heroCardBack from "../assets/images/hero-card-back.webp";
import redMiniStar from "../assets/images/red-mini-star.svg";

function HeroSection() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    let rafId = 0;

    const updateScrollShift = () => {
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const normalized = clampedProgress * 2 - 1;
      const boosted =
        Math.sign(normalized) * Math.pow(Math.abs(normalized), 0.5);
      const maxShift = window.innerWidth <= 640 ? 36 : 84;
      const scrollShift = boosted * maxShift;

      card.style.setProperty("--scroll-tx", `${scrollShift.toFixed(2)}px`);
    };

    const onScrollOrResize = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        updateScrollShift();
        rafId = 0;
      });
    };

    updateScrollShift();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <header className="hero section" id="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1>Notes on form</h1>
          <p className="hero__subtitle">process, and residue.</p>
        </div>
        <div className="hero__stage">
          <div className="hero__card" ref={cardRef}>
            <img
              className="hero__img hero__img--back"
              src={heroCardBack}
              alt=""
            />
            <img
              className="hero__img hero__img--mid"
              src={heroCardMid}
              alt=""
            />
            <img
              className="hero__img hero__img--mid-hover"
              src={heroCardMidHover}
              alt=""
            />
            <img
              className="hero__img hero__img--front"
              src={heroCardFront}
              alt="Notes on form hero card"
            />
          </div>
        </div>
        <div className="hero__date">
          <span>2026 · 01 · 30 ·</span>
          <img src={redMiniStar} alt="" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
