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
              <div className="profile__content" aria-hidden={!isOpen}>
                <div className="profile__content-grid">
                  <div className="profile__column">
                    <div className="profile__section">
                      <h3 className="profile__heading">Experience</h3>
                      <ul className="profile__list" role="list">
                        <li className="profile__item">
                          <span className="profile__period">
                            2025.08 - 2026.06
                          </span>
                          <span className="profile__detail">
                            이젠 아카데미
                            <br />
                            UXUI디자인&amp;웹기획 프론트엔드 부트캠프 수료
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2023.03 - 2025.02
                          </span>
                          <span className="profile__detail">
                            홍익대학교(서울) 대학원(석사) 회화과 졸업
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="profile__section">
                      <h3 className="profile__heading">Experience</h3>
                      <ul className="profile__list" role="list">
                        <li className="profile__item">
                          <span className="profile__period">
                            2022.09 - 2023.06
                          </span>
                          <span className="profile__detail">
                            LuXun Academy of Fine Arts Oil painting과 졸업
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2018.03 - 2022.02
                          </span>
                          <span className="profile__detail">
                            LuXun Academy of Fine Arts Oil painting과 졸업
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="profile__column profile__column--right">
                    <div className="profile__section">
                      <h3 className="profile__heading">About me</h3>
                      <ul className="profile__meta" role="list">
                        <li>
                          <span className="profile__label">Name</span>
                          <span className="profile__value">YOU SOOJIN</span>
                        </li>
                        <li>
                          <span className="profile__label">Birth</span>
                          <span className="profile__value">1999.10.31</span>
                        </li>
                        <li>
                          <span className="profile__label">Contact</span>
                          <span className="profile__value">
                            dbtnwls0344@naver.com
                            <br />
                            010 2571 0344
                            <br />
                            @ysoo_jin_b
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="profile__section">
                      <h3 className="profile__heading">Education</h3>
                      <ul className="profile__list" role="list">
                        <li className="profile__item">
                          <span className="profile__period">2023 - 2025</span>
                          <span className="profile__detail">
                            홍익대학교(서울) 대학원(석사) 회화과 졸업
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">2018 - 2022</span>
                          <span className="profile__detail">
                            LuXun Academy of Fine Arts Oil painting과 졸업
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2025.08 - 2026.06
                          </span>
                          <span className="profile__detail">
                            이젠 아카데미
                            <br />
                            UXUI디자인&amp;웹기획 프론트엔드 부트캠프 수료
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="profile__section">
                      <h3 className="profile__heading">Education</h3>
                      <ul className="profile__list" role="list">
                        <li className="profile__item">
                          <span className="profile__period">2023 - 2025</span>
                          <span className="profile__detail">
                            홍익대학교(서울) 대학원(석사) 회화과 졸업
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">2018 - 2022</span>
                          <span className="profile__detail">
                            LuXun Academy of Fine Arts Oil painting과 졸업
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2025.08 - 2026.06
                          </span>
                          <span className="profile__detail">
                            이젠 아카데미
                            <br />
                            UXUI디자인&amp;웹기획 프론트엔드 부트캠프 수료
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default ProfileSection;
