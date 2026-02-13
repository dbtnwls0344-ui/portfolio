import notePaperTape from "../assets/images/note-paper-tape.png";
import contactQr from "../assets/images/contact-qr.png";
import "./ContactNote.css";

function ContactNote({ className = "", qrAlt = "Instagram QR", ariaHidden = true }) {
  const rootClassName = ["contact-note", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName} aria-hidden={ariaHidden}>
      <img className="contact-note__tape" src={notePaperTape} alt="" />
      <div className="contact-note__qr">
        <img src={contactQr} alt={qrAlt} />
      </div>
    </div>
  );
}

export default ContactNote;
