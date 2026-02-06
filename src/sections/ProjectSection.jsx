import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { interpolate } from "flubber";
import "./ProjectSection.css";

import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import folderLid from "../assets/images/project-folder-lid.png";
import folderBody from "../assets/images/project-folder-body.png";
import buttonTop from "../assets/images/project-button-top.png";
import buttonBottom from "../assets/images/project-button-bottom.png";
import detail01 from "../assets/images/project-detail-01.png";
import detail02 from "../assets/images/project-detail-02.png";
import detail03 from "../assets/images/project-detail-03.png";
import detail04 from "../assets/images/project-detail-04.png";

const TIED_PATH =
  "M31.974 292.671C17.5021 273.336 9.1698 105.77 4.78437 52.9218C1.27603 10.6434 31.0969 6.37549 46.4459 9.52632C57.7018 11.8178 80.2137 23.705 80.2137 52.9218C80.2137 82.1385 57.7018 224.928 46.4459 292.671C15.3094 328.332 -18.8983 452.246 31.9726 523.397C95.5613 612.336 120.356 619.157 139.854 707.72C163.975 817.283 90.0074 932.861 80.2137 938.446";

const LOOSE_PATH =
  "M661.98 265.121C661.98 294.361 377.746 398.421 456.007 241.901C493.03 167.856 460.307 -5.34929 330.875 100.861C246.863 169.799 188.973 184.281 128.772 184.281C16.5983 184.281 14.1031 3.25071 4.5 8.84071M661.98 265.121C661.98 235.881 643.777 218.395 632.74 216.102C617.69 212.948 588.45 217.22 591.89 259.532C596.19 312.422 661.98 265.121 661.98 265.121Z";

function ProjectSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFile, setActiveFile] = useState(null);

  const stringPathRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  const files = useMemo(
    () => [
      {
        id: "monami",
        label: "MONAMI",
        title: "DUGOUT : Mobile Fandom App",
        category: "Branding",
        summary:
          "관람에 머무르던 야구 팬 경험을 기록하고, 공유하며, 확장하는 모바일 앱 프로젝트입니다.",
        detail: detail01,
        tag: "MONAMI",
        tagStyle: "project-file__tag--monami",
        cardStyle: "project-file__card--monami",
      },
      {
        id: "art",
        label: "ART",
        title: "ART Direction : Visual System",
        category: "Art",
        summary:
          "경험의 흐름을 조형적으로 정리하고, 시각적 리듬으로 재구성한 시리즈입니다.",
        detail: detail02,
        tag: "ART",
        tagStyle: "project-file__tag--art",
        cardStyle: "project-file__card--art",
      },
      {
        id: "personal",
        label: "Personal",
        title: "Personal Branding",
        category: "Identity",
        summary:
          "나의 태도와 시선이 드러나는 톤을 정리하고, 브랜드 언어를 설계했습니다.",
        detail: detail03,
        tag: "personalbranding",
        tagStyle: "project-file__tag--personal",
        cardStyle: "project-file__card--personal",
      },
      {
        id: "uiux",
        label: "UIUX",
        title: "UIUX System",
        category: "Product",
        summary:
          "사용자 경험을 빠르게 검증하고 구현까지 이어지는 프로토타입 실험입니다.",
        detail: detail04,
        tag: "DUG  OUT",
        tagStyle: "project-file__tag--dugout",
        cardStyle: "project-file__card--dugout",
      },
    ],
    [],
  );

  const handleClose = () => setActiveFile(null);

  const handleFolderToggle = () => {
    setIsOpen((prev) => !prev);
    if (activeFile) setActiveFile(null);
  };

  const handleFileOpen = (file) => setActiveFile(file);

  // 끈 모핑
  useLayoutEffect(() => {
    if (!stringPathRef.current) return;

    const morph = interpolate(TIED_PATH, LOOSE_PATH, { maxSegmentLength: 2 });
    const state = { t: isOpen ? 1 : 0 };
    stringPathRef.current.setAttribute("d", morph(state.t));

    const tween = gsap.to(state, {
      t: isOpen ? 1 : 0,
      duration: 1.5,
      ease: "sine.inOut",
      onUpdate: () => stringPathRef.current?.setAttribute("d", morph(state.t)),
    });

    return () => tween.kill();
  }, [isOpen]);

  // 모달: ESC/스크롤 잠금/포커스
  useLayoutEffect(() => {
    if (!activeFile) return;

    lastActiveElRef.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;

      if (lastActiveElRef.current?.focus) lastActiveElRef.current.focus();
    };
  }, [activeFile]);

  return (
    <section
      className={`project-section section${
        activeFile ? " project-section--modal" : ""
      }`}
      id="project"
    >
      <div className="project-section__stage">
        <div className="project-section__header">
          <h2 className="project-section__title">
            PROJECT
            <img
              className="project-section__star"
              src={aboutIconWhite}
              alt=""
              aria-hidden
            />
          </h2>
          <p className="project-section__subtitle">
            From observation to interaction.
          </p>
        </div>

        <div
          className={`project-folder${isOpen ? " project-folder--open" : ""}`}
        >
          <button
            className="project-folder__toggle"
            type="button"
            onClick={handleFolderToggle}
          >
            <span className="sr-only">Toggle project folder</span>
          </button>

          <div className="project-folder__string" aria-hidden="true">
            <svg
              className="project-folder__string-svg"
              viewBox="0 0 678 946"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className="project-folder__string-path"
                ref={stringPathRef}
                d={TIED_PATH}
                stroke="black"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="project-folder__lid">
            <img
              className="project-folder__panel"
              src={folderLid}
              alt=""
              aria-hidden
            />
          </div>

          <div className="project-folder__body">
            <img
              className="project-folder__panel"
              src={folderBody}
              alt=""
              aria-hidden
            />

            <div className="project-folder__slot" aria-hidden={!isOpen}>
              <div className="project-folder__files">
                {files.map((file, index) => (
                  <button
                    key={file.id}
                    className="project-file"
                    type="button"
                    style={{
                      "--file-index": index,
                      "--file-image": `url(${file.thumb})`,
                    }}
                    onClick={() => handleFileOpen(file)}
                    disabled={!isOpen}
                    tabIndex={isOpen ? 0 : -1}
                    aria-label={`${file.title} 상세 보기`}
                  >
                    <span
                      className={`project-file__card ${file.cardStyle}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`project-file__tag ${file.tagStyle}`}
                      aria-hidden="true"
                    >
                      {file.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <img
            className="project-folder__button project-folder__button--top"
            src={buttonTop}
            alt=""
            aria-hidden
          />
          <img
            className="project-folder__button project-folder__button--bottom"
            src={buttonBottom}
            alt=""
            aria-hidden
          />
        </div>
      </div>

      {activeFile && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            className="project-modal__overlay"
            type="button"
            onClick={handleClose}
          >
            <span className="sr-only">Close project detail</span>
          </button>

          <div className="project-modal__panel" role="document">
            <button
              ref={closeBtnRef}
              className="project-modal__close"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>

            <div className="project-modal__content">
              <div className="project-modal__image">
                <img
                  src={activeFile.detail}
                  alt={activeFile.title}
                  loading="lazy"
                />
                <span className="project-modal__badge">{activeFile.label}</span>
              </div>

              <div className="project-modal__info">
                <h3 id="project-modal-title">{activeFile.title}</h3>
                <p className="project-modal__category">{activeFile.category}</p>
                <p className="project-modal__summary">{activeFile.summary}</p>

                <div className="project-modal__meta">
                  <div>
                    <p>My Role / Contribution</p>
                    <div className="project-modal__bars" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectSection;
