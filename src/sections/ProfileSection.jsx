import { useEffect, useRef, useState } from "react";
import "./ProfileSection.css";
import profileFolderClosed from "../assets/images/profile-folder-closed.webp";
import profileBoardLeft from "../assets/images/profile-board-left.webp";
import profileBoardRight from "../assets/images/profile-board-right.webp";
import profilePhotoId from "../assets/images/profile-photo-id.webp";
import profilePhotoPolaroid from "../assets/images/profile-photo-polaroid.png";
import binderClip from "../assets/images/binder-clip.png";
import notePaperTapeWithQr from "../assets/images/note-paper-tape-with-qr.png";

function ProfileSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const target = sectionRef.current;

    if (!target) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="profile section" id="profile" ref={sectionRef}>
      <div className="profile__inner">
        <button
          className={`profile__stage ${isOpen ? "is-open" : ""} ${hasEntered ? "has-entered" : ""} ${isInView ? "is-entered" : ""}`}
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
                className="profile__asset profile__asset--qr-note"
                src={notePaperTapeWithQr}
                alt="QR note"
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
                            2021.04 - 2026.02
                          </span>
                          <span className="profile__detail">
                            <span className="profile__detail-title">
                              예일 화실
                            </span>
                            <br />
                            초, 중, 고, 취미미술교육
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">2024.09</span>
                          <span className="profile__detail">
                            <span className="profile__detail-title">
                              Gaia Art Space (HongKong)
                            </span>
                            <br />
                            KIAF 중, 한 통역
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2023.07-2024.08
                          </span>
                          <span className="profile__detail">
                            <span className="profile__detail-title">
                              BiBiDi 미술학원
                            </span>
                            <br />
                            저학년 대상 미술교육
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">2021.11</span>
                          <span className="profile__detail">
                            <span className="profile__detail-title">
                              서울시 교육청
                            </span>
                            <br />
                            서울시 교육청 국제 교육 프로그램 홍보영상콘티 제작
                          </span>
                        </li>
                        <li className="profile__item">
                          <span className="profile__period">
                            2018.03-2019-02
                          </span>
                          <span className="profile__detail">
                            <span className="profile__detail-title">
                              중국 심양(沈阳) 한글학교
                            </span>
                            <br />
                            저학년 대상 미술교육
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
                          <span className="profile__label">Name : </span>
                          <span className="profile__value">YOU SOOJIN</span>
                        </li>
                        <li>
                          <span className="profile__label">Birth : </span>
                          <span className="profile__value">1999.10.31</span>
                        </li>
                        <li>
                          <span className="profile__label">Contact : </span>
                          <span className="profile__value">
                            <br />
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
                            홍익대학교 대학원 회화과 석사 졸업
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
                      <h3 className="profile__heading">Skill</h3>
                      <ul className="profile__skills" role="list">
                        <li className="profile__skill-item">
                          <span className="profile__skill-name">Figma</span>
                          <span className="profile__skill-track">
                            <span
                              className="profile__skill-fill"
                              style={{ width: "96%" }}
                            />
                          </span>
                        </li>
                        <li className="profile__skill-item">
                          <span className="profile__skill-name">
                            Adobe Photoshop
                          </span>
                          <span className="profile__skill-track">
                            <span
                              className="profile__skill-fill"
                              style={{ width: "76%" }}
                            />
                          </span>
                        </li>
                        <li className="profile__skill-item">
                          <span className="profile__skill-name">
                            Adobe Illustrator
                          </span>
                          <span className="profile__skill-track">
                            <span
                              className="profile__skill-fill"
                              style={{ width: "88%" }}
                            />
                          </span>
                        </li>
                        <li className="profile__skill-item">
                          <span className="profile__skill-name">
                            Adobe After Effects
                          </span>
                          <span className="profile__skill-track">
                            <span
                              className="profile__skill-fill"
                              style={{ width: "45%" }}
                            />
                          </span>
                        </li>
                        <li className="profile__skill-item">
                          <span className="profile__skill-name">
                            Adobe Premiere Pro
                          </span>
                          <span className="profile__skill-track">
                            <span
                              className="profile__skill-fill"
                              style={{ width: "45%" }}
                            />
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
