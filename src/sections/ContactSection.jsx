import { useState } from "react";
import "./ContactSection.css";
import contactCover from "../assets/images/contact-cover.png";
import contactPhoto from "../assets/images/contact-photo.png";
import contactQr from "../assets/images/contact-qr.png";
import notePaperTape from "../assets/images/note-paper-tape.png";
import contactIconInstagram from "../assets/images/contact-icon-instagram.svg";
import contactIconMail from "../assets/images/contact-icon-mail.svg";
import contactIconPhone from "../assets/images/contact-icon-phone.svg";

function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="contact-section section" id="contact">
      <div className="contact-section__inner">
        <div className="contact-stage">
          <button
            className={`contact-cover${isOpen ? " contact-cover--open" : ""}`}
            type="button"
            onClick={handleToggle}
          >
            <img src={contactCover} alt="Contact cover" />
            <span className="sr-only">Toggle contact card</span>
          </button>

          <div className="contact-note" aria-hidden>
            <img src={notePaperTape} alt="" />
            <div className="contact-note__qr">
              <img src={contactQr} alt="Instagram QR" />
              <span>YSOO_JIN_B</span>
            </div>
          </div>

          <div
            className={`contact-card${isOpen ? " contact-card--open" : ""}`}
            role="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleToggle();
              }
            }}
            aria-label="Close contact card"
          >
            <div className="contact-card__paper">
              <div className="contact-card__profile">
                <img src={contactPhoto} alt="You Soojin" />
              </div>
              <div className="contact-card__info">
                <div className="contact-card__info-top">
                  <div className="contact-card__name">
                    <span>YOU</span>
                    <span>SOOJIN</span>
                  </div>
                  <div className="contact-card__contact">
                    <span>CONTACT</span>
                    <span>If relevant</span>
                  </div>
                </div>
                <div className="contact-card__lines">
                  <div className="contact-card__line">
                    <span className="contact-card__icon" aria-hidden>
                      <img src={contactIconMail} alt="" />
                    </span>
                    <span>dbtnwls0344@naver.com</span>
                  </div>
                  <div className="contact-card__line">
                    <span className="contact-card__icon" aria-hidden>
                      <img src={contactIconInstagram} alt="" />
                    </span>
                    <span>ysoo_jin_b</span>
                  </div>
                  <div className="contact-card__line">
                    <span className="contact-card__icon" aria-hidden>
                      <img src={contactIconPhone} alt="" />
                    </span>
                    <span>+82 010 0269 3400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
