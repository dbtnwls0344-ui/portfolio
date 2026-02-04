import { useMemo, useState } from "react";
import "./CloneSection.css";
import cloneYStudio from "../assets/images/clone-y-studio.png";
import cloneMusign from "../assets/images/clone-musign.png";
import cloneCrew from "../assets/images/clone-crew-a-la-mode.png";
import clonePhomein from "../assets/images/clone-phomein.png";
import cloneDaebang from "../assets/images/clone-daebang.png";
import cloneConcierge from "../assets/images/clone-concierge.png";

function CloneSection() {
  const projects = useMemo(
    () => [
      {
        id: "y-studio",
        label: "Y_STUDIO",
        preview: cloneYStudio,
        note: "Analysis & Reconstruction",
      },
      {
        id: "musign",
        label: "MUSIGN",
        preview: cloneMusign,
        note: "Analysis & Reconstruction",
      },
      {
        id: "crew-a-la-mode",
        label: "CREW A LA MODE",
        preview: cloneCrew,
        note: "Analysis & Reconstruction",
      },
      {
        id: "phomein",
        label: "Phomein",
        preview: clonePhomein,
        note: "Analysis & Reconstruction",
      },
      {
        id: "daebang",
        label: "DAEBANG Construction",
        preview: cloneDaebang,
        note: "Analysis & Reconstruction",
      },
      {
        id: "concierge",
        label: "Concierge",
        preview: cloneConcierge,
        note: "Analysis & Reconstruction",
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
              클론코딩은 화면을 그대로 옮기는 작업이 아니라, 서비스의 구조와
              흐름을 분석하는 과정이라고 생각합니다.
            </p>
            <p>
              실제 사이트를 기준으로 레이아웃 구성, 인터랙션의 연결 방식, 반응형
              환경에서의 차이를 중심으로 코드를 재구성했습니다.
            </p>
            <p>
              이를 통해 시각적 구현보다 설계 의도를 이해하고 구현하는 기준을
              쌓을 수 있었습니다.
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
                      <div
                        className="clone-item__image"
                        style={{
                          "--preview-image": project.preview
                            ? `url(${project.preview})`
                            : "none",
                        }}
                        role="img"
                        aria-label={`${project.label} 미리보기`}
                      />
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
