import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { interpolate } from "flubber";
import "./ProjectSection.css";

import folderLid from "../assets/images/project-folder-lid.webp";
import folderBody from "../assets/images/project-folder-body.webp";
import buttonTop from "../assets/images/project-button-top.png";
import buttonBottom from "../assets/images/project-button-bottom.png";
import detail01 from "../assets/images/project-detail-01.webp";
import detail02 from "../assets/images/project-detail-02.webp";
import detail03 from "../assets/images/project-detail-03.png";
import detail04 from "../assets/images/project-detail-04.webp";

const TIED_PATH =
  "M31.974 292.671C17.5021 273.336 9.1698 105.77 4.78437 52.9218C1.27603 10.6434 31.0969 6.37549 46.4459 9.52632C57.7018 11.8178 80.2137 23.705 80.2137 52.9218C80.2137 82.1385 57.7018 224.928 46.4459 292.671C15.3094 328.332 -18.8983 452.246 31.9726 523.397C95.5613 612.336 120.356 619.157 139.854 707.72C163.975 817.283 90.0074 932.861 80.2137 938.446";

const LOOSE_PATH =
  "M661.98 265.121C661.98 294.361 377.746 398.421 456.007 241.901C493.03 167.856 460.307 -5.34929 330.875 100.861C246.863 169.799 188.973 184.281 128.772 184.281C16.5983 184.281 14.1031 3.25071 4.5 8.84071M661.98 265.121C661.98 235.881 643.777 218.395 632.74 216.102C617.69 212.948 588.45 217.22 591.89 259.532C596.19 312.422 661.98 265.121 661.98 265.121Z";

const ROLE_BARS = [
  { label: "Planning", value: 100 },
  { label: "Design", value: 100 },
  { label: "Publishing", value: 67 },
];

function ProjectSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFile, setActiveFile] = useState(null);

  const stringPathRef = useRef(null);
  const stringSwayTweenRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  const files = useMemo(
    () => [
      {
        id: "monami",
        label: "Team Project",
        title: "MONAMI : Brand Experience Renewal",
        category: "Rebranding",
        summary:
          "湲곗〈 ?꾧린援?釉뚮옖?쒖쓽 ?뺤껜?깆쓣 ?ы빐?앺븯怨? ?쇱긽??湲곕줉 寃쏀뿕???꾨??곸쑝濡??뺤옣??釉뚮옖???꾨줈?앺듃?낅땲?? 紐⑤굹誘멸? 吏???ㅻ━?곗?瑜??좎??섎㈃?쒕룄 ?덈줈???몃?? ?곌껐?????덈뒗 ?쒓컖 ?쒖뒪?쒓낵 釉뚮옖???ㅼ쓣 ?ъ젙由쏀뻽?듬땲??",
        href: "https://meongpunch.github.io/monamifinal/",
        secondaryHref:
          "https://www.figma.com/design/2cRRaUsj8t5czQPOQIGZg5/%EC%9C%A0%EC%88%98%EC%A7%84-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=11-29351&m=dev&t=D86PP9TySDqQWFWh-1",
        detail: detail01,
        tag: "MONAMI",
        tagStyle: "project-file__tag--monami",
        cardStyle: "project-file__card--monami",
        modalPanelClass: "project-modal__panel--monami",
        roleBars: [
          { label: "Planning", value: 84 },
          { label: "Design", value: 98 },
          { label: "Publishing", value: 67 },
        ],
      },
      {
        id: "dugout",
        label: "Team Project",
        title: "DUGOUT : Mobile Fandom App",
        category: "Product",
        summary:
          "愿?뚯뿉 癒몃Т瑜대뜕 ?쇨뎄 ??寃쏀뿕?꾧린濡앺븯怨? 怨듭쑀?섍퀬, 異뺤쟻?섎뒗 李몄뿬????寃쏀뿕?쇰줈 ?뺤옣??紐⑤컮?????꾨줈?앺듃?낅땲???뺤븘?껋? ?ъ쓣 ?⑥닚???ъ슜?먮줈 蹂댁? ?딄퀬,寃쎄린???먮쫫怨?媛먯젙???④퍡 留뚮뱾?닿???寃쏀뿕??二쇱껜濡??ъ젙?섑빀?덈떎.寃쎄린 ?뺣낫 以묒떖??湲곗〈 ?쇨뎄 ??援ъ“?먯꽌 踰쀬뼱??媛쒖씤???묒썝怨?湲곗뼲???먯뿰?ㅻ읇寃??볦씠???щ뜡 怨듦컙???쒖븞?덉뒿?덈떎.",
        href: "https://dugout-ruby.vercel.app/onboarding",
        secondaryHref:
          "https://www.figma.com/design/2cRRaUsj8t5czQPOQIGZg5/%EC%9C%A0%EC%88%98%EC%A7%84-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=7-4&m=dev&t=D86PP9TySDqQWFWh-1",
        detail: detail02,
        tag: "DUG  OUT",
        tagStyle: "project-file__tag--dugout",
        cardStyle: "project-file__card--dugout",
        modalPanelClass: "project-modal__panel--uiux",
        roleBars: [
          { label: "Planning", value: 74 },
          { label: "Design", value: 96 },
          { label: "Publishing", value: 84 },
        ],
      },
      {
        id: "arp",
        label: "Self-Initiated",
        title: "ARP : Exhibition Archive App",
        category: "Product",
        summary:
          "?꾩떆 愿??寃쏀뿕??湲곕줉?섍퀬 異뺤쟻?????덈룄濡??ㅺ퀎??紐⑤컮???꾩뭅?대툕 ???꾨줈?앺듃?낅땲?? 媛먯긽???먮쫫???뺣━?섎뒗 UI 援ъ“? ?쒓컖??由щ벉???듯빐, 媛쒖씤??愿??寃쏀뿕???먯뿰?ㅻ읇寃??뺤옣?섎룄濡?援ъ꽦?덉뒿?덈떎.",
        href: "https://www.figma.com/proto/2cRRaUsj8t5czQPOQIGZg5/ARP-APP_%EC%A0%84%EC%8B%9C%EA%B8%B0%EB%A1%9D%EC%95%B1?node-id=0-1&t=D86PP9TySDqQWFWh-1",
        secondaryHref:
          "https://www.figma.com/design/2cRRaUsj8t5czQPOQIGZg5/%EC%9C%A0%EC%88%98%EC%A7%84-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=11-26711&m=dev&t=D86PP9TySDqQWFWh-1",
        detail: detail03,
        tag: "ARP",
        tagStyle: "project-file__tag--arp",
        cardStyle: "project-file__card--arp",
        modalPanelClass: "project-modal__panel--arp",
        roleBars: [
          { label: "Planning", value: 100 },
          { label: "Design", value: 100 },
          { label: "Publishing", value: 100 },
        ],
      },
      {
        id: "personal",
        label: "Self-Initiated",
        title: "PERSONAL : Identity System",
        category: "Product",
        summary:
          "媛쒖씤???쒕룄? ?묒뾽 ?멸퀎愿??湲곕컲?쇰줈 ?꾩씠?댄떚?곕? ?뺣┰???쇱뒪??釉뚮옖???꾨줈?앺듃?낅땲?? ?쇨????쒓컖 ?쒖뒪?쒓낵 ?ㅼ쓣 ?ㅺ퀎?? ?ㅼ뒪濡쒖쓽 諛⑺뼢?깃낵 硫붿떆吏媛 紐낇솗?섍쾶 ?꾨떖?섎룄濡?援ъ꽦?덉뒿?덈떎.",

        href: "https://example.com/personal-branding",
        secondaryHref: "https://example.com/personal-branding/process",
        detail: detail04,
        tag: "personalbranding",
        tagStyle: "project-file__tag--personal",
        cardStyle: "project-file__card--personal",
        modalPanelClass: "project-modal__panel--personal",
        roleBars: [
          { label: "Planning", value: 100 },
          { label: "Design", value: 100 },
          { label: "Publishing", value: 100 },
        ],
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

  // ??紐⑦븨
  useLayoutEffect(() => {
    if (!stringPathRef.current) return;

    stringSwayTweenRef.current?.kill();
    stringSwayTweenRef.current = null;
    gsap.set(stringPathRef.current, { rotation: 0, x: 0, y: 0 });

    const targetPath = isOpen ? LOOSE_PATH : TIED_PATH;
    const currentPath = stringPathRef.current.getAttribute("d") || TIED_PATH;
    const toTarget = interpolate(currentPath, targetPath, { maxSegmentLength: 2 });
    const state = { t: 0 };

    const tween = gsap.to(state, {
      t: 1,
      duration: 0.55,
      ease: "power4.out",
      onUpdate: () => {
        stringPathRef.current?.setAttribute("d", toTarget(state.t));
      },
      onComplete: () => {
        // flubber interpolation 결과의 미세 왜곡을 막기 위해 최종 path를 강제로 고정
        stringPathRef.current?.setAttribute("d", targetPath);

        if (isOpen || !stringPathRef.current) return;

        stringSwayTweenRef.current = gsap.to(stringPathRef.current, {
          rotation: 3.2,
          x: 2.2,
          transformOrigin: "46px 52px",
          duration: 1.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    return () => {
      tween.kill();
      stringSwayTweenRef.current?.kill();
      stringSwayTweenRef.current = null;
    };
  }, [isOpen]);

  // 紐⑤떖: ESC/?ㅽ겕濡??좉툑/?ъ빱??
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
          <h2 className="project-section__title">PROJECT:</h2>
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
                stroke="#181818"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                    }}
                    onClick={() => handleFileOpen(file)}
                    disabled={!isOpen}
                    tabIndex={isOpen ? 0 : -1}
                    aria-label={`${file.title} ?곸꽭 蹂닿린`}
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
                    <ul className="project-modal__role-list">
                      {(activeFile.roleBars ?? ROLE_BARS).map((item, index) => (
                        <li
                          className="project-modal__role-row"
                          key={item.label}
                          style={{ "--i": index }}
                        >
                          <span className="project-modal__role-label">
                            {item.label}
                          </span>
                          <span className="project-modal__role-track" aria-hidden="true">
                            <span
                              className="project-modal__role-fill"
                              style={{ "--role-width": `${item.value}%` }}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-modal__actions">
                  <a
                    className="project-modal__link"
                    href={activeFile.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span
                      className="project-modal__link-icon"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M8 7h9v9m0-9-10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="project-modal__link-label">View Live</span>
                  </a>
                  <a
                    className="project-modal__link project-modal__link--secondary"
                    href={activeFile.secondaryHref}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span
                      className="project-modal__link-icon"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 3h7l5 5v13H7z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 3v6h5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="project-modal__link-label">
                      湲고쉷??蹂닿린
                    </span>
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

