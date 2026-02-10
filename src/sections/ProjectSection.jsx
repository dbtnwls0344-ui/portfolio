import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { interpolate } from "flubber";
import "./ProjectSection.css";

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
        summary: "모나미.",
        href: "https://meongpunch.github.io/monamifinal/",
        detail: detail01,
        tag: "MONAMI",
        tagStyle: "project-file__tag--monami",
        cardStyle: "project-file__card--monami",
        modalPanelClass: "project-modal__panel--monami",
      },
      {
        id: "uiux",
        label: "UIUX",
        title: "UIUX System",
        category: "Product",
        summary:
          "관람에 머무르던 야구 팬 경험을 기록하고, 공유하며, 확장하는 모바일 앱 프로젝트입니다.",
        href: "https://dugout-ruby.vercel.app/onboarding",
        detail: detail02,
        tag: "DUG  OUT",
        tagStyle: "project-file__tag--dugout",
        cardStyle: "project-file__card--dugout",
        modalPanelClass: "project-modal__panel--uiux",
      },
      {
        id: "art",
        label: "ART",
        title: "ART Direction : Visual System",
        category: "Art",
        summary:
          "경험의 흐름을 조형적으로 정리하고, 시각적 리듬으로 재구성한 시리즈입니다.",
        href: "https://example.com/art-direction",
        detail: detail03,
        tag: "ART",
        tagStyle: "project-file__tag--art",
        cardStyle: "project-file__card--art",
        modalPanelClass: "project-modal__panel--art",
      },
      {
        id: "personal",
        label: "Personal",
        title: "Personal Branding",
        category: "Identity",
        summary:
          "나의 태도와 시선이 드러나는 톤을 정리하고, 브랜드 언어를 설계했습니다.",
        href: "https://example.com/personal-branding",
        detail: detail04,
        tag: "personalbranding",
        tagStyle: "project-file__tag--personal",
        cardStyle: "project-file__card--personal",
        modalPanelClass: "project-modal__panel--personal",
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
      duration: 0.55,
      ease: "power4.out",
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
          <h2 className="project-section__title">PROJECT:✸</h2>
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
              <defs>
                <filter
                  id="project-string-inner-shadow"
                  x="-25%"
                  y="-25%"
                  width="150%"
                  height="150%"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodColor="#ffffff"
                    floodOpacity="0.16"
                    result="shadowColor"
                  />
                  <feComposite
                    in="shadowColor"
                    in2="SourceAlpha"
                    operator="in"
                    result="shadowAlpha"
                  />
                  <feOffset
                    in="shadowAlpha"
                    dx="6.87"
                    dy="1.72"
                    result="offsetShadow"
                  />
                  <feGaussianBlur
                    in="offsetShadow"
                    stdDeviation="3.35"
                    result="blurShadow"
                  />
                  <feComposite
                    in="blurShadow"
                    in2="SourceAlpha"
                    operator="in"
                    result="innerShadow"
                  />
                  <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="innerShadow" />
                  </feMerge>
                </filter>
              </defs>
              <path
                className="project-folder__string-path"
                ref={stringPathRef}
                d={TIED_PATH}
                stroke="#181818"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#project-string-inner-shadow)"
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

          <div
            className={`project-modal__panel ${activeFile.modalPanelClass}`}
            role="document"
          >
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

                <div className="project-modal__actions">
                  <a
                    className="project-modal__link"
                    href={activeFile.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    바로가기
                  </a>
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
