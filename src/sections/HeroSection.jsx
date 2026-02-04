import "./HeroSection.css";
import heroCardFront from "../assets/images/hero-card-front.png";
import heroCardMid from "../assets/images/hero-card-mid.png";
import heroCardMidHover from "../assets/images/hero-card-mid-hover.png";
import heroCardBack from "../assets/images/hero-card-back.png";

function HeroSection() {
  return (
    <header className="hero section" id="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1>Notes on form</h1>
          <p className="hero__subtitle">process, and residue.</p>
        </div>
        <div className="hero__stage">
          <div className="hero__card">
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
        <div className="hero__date">2026 · 01 · 30 ·</div>
      </div>
    </header>
  );
}

export default HeroSection;
