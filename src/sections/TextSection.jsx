import "./TextSection.css";
import aboutIconWhite from "../assets/images/about-icon-star-white.svg";

function TextSection() {
  return (
    <section className="text-section section" id="text">
      <img
        className="text-section__star text-section__star--hero"
        src={aboutIconWhite}
        alt=""
        aria-hidden
      />
      <div className="text-section__inner">
        <div className="text-section__title-wrap">
          <img
            className="text-section__star text-section__star--title"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
          <h2 className="text-section__title">TEXT SECTION</h2>
        </div>
        <p className="text-section__subtitle">
          I sense experiences, translate meaning, and build structure.
          <img
            className="text-section__star text-section__star--spark"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
        </p>
      </div>
    </section>
  );
}

export default TextSection;
