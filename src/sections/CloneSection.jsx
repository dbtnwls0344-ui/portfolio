import { useMemo, useState } from "react";
import "./CloneSection.css";
import cloneYStudio from "../assets/images/clone-y-studio.webp";
import cloneMusign from "../assets/images/clone-musign.webp";
import cloneCrew from "../assets/images/clone-crew-a-la-mode.webp";
import clonePhomein from "../assets/images/clone-phomein.webp";
import cloneDaebang from "../assets/images/clone-daebang.webp";
import cloneConcierge from "../assets/images/clone-concierge.webp";

function CloneSection() {
  const projects = useMemo(
    () => [
      {
        id: "y-studio",
        label: "Y_STUDIO",
        preview: cloneYStudio,
        note: "Analysis & Reconstruction",
        href: "https://y-studio-clone-2026.vercel.app/",
      },
      {
        id: "musign",
        label: "MUSIGN",
        preview: cloneMusign,
        note: "Analysis & Reconstruction",
        href: "https://muza-in-clone-2026-84gnd2o9j-soooooo.vercel.app/",
      },
      {
        id: "crew-a-la-mode",
        label: "CREW A LA MODE",
        preview: cloneCrew,
        note: "Analysis & Reconstruction",
        href: "https://cruella-mode-clone-2026.vercel.app/",
      },
      {
        id: "phomein",
        label: "Phomein",
        preview: clonePhomein,
        note: "Analysis & Reconstruction",
        href: "https://phomein-clone-2026.vercel.app/",
      },
      {
        id: "daebang",
        label: "DAEBANG Construction",
        preview: cloneDaebang,
        note: "Analysis & Reconstruction",
        href: "https://clone-daebang-2026.vercel.app/",
      },
      {
        id: "concierge",
        label: "Concierge",
        preview: cloneConcierge,
        note: "Analysis & Reconstruction",
        href: "https://dobda-concierge-2026.vercel.app/",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");

  const handleActivate = (projectId) => {
    setActiveId(projectId);
  };

  return (
    <section className="clone-section section" id="clone">
      <div className="clone-section__inner">
        <div className="clone-section__intro">
          <h2 className="clone-section__title">
            <span>Clone</span>
            <span>Coding</span>
          </h2>
          <div className="clone-section__copy">
            <p>
              클론 코딩은 화면을 그대로 복제하는 작업이 아니라 서비스의 구조와 흐름을
              분석하는 과정이라고 생각합니다. 실제 사이트를 기반으로 레이아웃 구성,
              인터랙션 연결 방식, 반응형 환경에서의 차이를 중심으로 코드를
              재구성했습니다. 이 과정을 통해 시각 구현을 넘어 설계 의도를 이해하고
              구현하는 기준을 만들었습니다.
            </p>
          </div>
        </div>

        <div className="clone-section__content">
          <ul className="clone-list" role="list">
            {projects.map((project) => {
              const isActive = activeId === project.id;

              return (
                <li
                  key={project.id}
                  className={`clone-item${isActive ? " is-active" : ""}`}
                >
                  <button
                    type="button"
                    className="clone-item__button"
                    onMouseEnter={() => handleActivate(project.id)}
                    onFocus={() => handleActivate(project.id)}
                    onClick={() => handleActivate(project.id)}
                    aria-expanded={isActive}
                    aria-controls={`clone-panel-${project.id}`}
                  >
                    <span className="clone-item__dot" aria-hidden="true" />
                    <span className="clone-item__label">{project.label}</span>
                  </button>
                  <div
                    id={`clone-panel-${project.id}`}
                    className="clone-item__panel"
                    role="region"
                    aria-hidden={!isActive}
                  >
                    <div className="clone-item__panel-inner">
                      <span className="clone-item__note">{project.note}</span>
                      <a
                        className="clone-item__image"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{
                          "--preview-image": project.preview
                            ? `url(${project.preview})`
                            : "none",
                        }}
                        aria-label={`${project.label} 프로젝트 열기`}
                      >
                        <span
                          className="clone-item__read-more"
                          aria-hidden="true"
                        >
                          <span className="clone-item__read-more-text">
                            Read more
                          </span>
                          <span
                            className="clone-item__read-more-icon"
                            aria-hidden="true"
                          >
                            -&gt;
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CloneSection;

