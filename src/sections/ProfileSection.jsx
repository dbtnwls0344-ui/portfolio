import { useState } from "react";
import "./ProfileSection.css";
import profileFolderClosed from "../assets/images/profile-folder-closed.png";
import profileBoardLeft from "../assets/images/profile-board-left.png";
import profileBoardRight from "../assets/images/profile-board-right.png";
import profilePhotoId from "../assets/images/profile-photo-id.png";
import profilePhotoPolaroid from "../assets/images/profile-photo-polaroid.png";
import binderClip from "../assets/images/binder-clip.png";

function ProfileSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="profile section" id="profile">
      <div className="profile__inner">
        <button
          className={`profile__stage ${isOpen ? "is-open" : ""}`}
          type="button"
          onClick={toggleOpen}
          aria-pressed={isOpen}
          aria-label={isOpen ? "Close profile folder" : "Open profile folder"}
        >
          <span className="profile__closed">
            <img src={profileFolderClosed} alt="Closed profile folder" />
          </span>

          <span className="profile__open">
            <span className="profile__spread">
              <img
                className="profile__board profile__board--left"
                src={profileBoardLeft}
                alt="Profile board left"
              />
              <img
                className="profile__board profile__board--right"
                src={profileBoardRight}
                alt="Profile board right"
              />
              <img
                className="profile__asset profile__asset--photo"
                src={profilePhotoId}
                alt="Profile photo"
              />
              <img
                className="profile__asset profile__asset--polaroid"
                src={profilePhotoPolaroid}
                alt="Polaroid snapshot"
              />
              <img
                className="profile__asset profile__asset--clip"
                src={binderClip}
                alt="Binder clip"
              />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default ProfileSection;
