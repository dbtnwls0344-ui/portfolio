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
          `r`n{" "}
          <div className="clone-section__copy">
            <p>
              ?�론코딩?�??�면??그�?�???��???�업???�니?? ?�비?�의 구조?�?              ?�름??분석?�는 과정?�라�??�각?�니??
            </p>
            <p>
              ?�제 ?�이?��? 기�??�로 ?�이?�웃 구성, ?�터?�션???�결 방식, 반응??
              ?�경?�서??차이�?중심?�로 코드�??�구?�했?�니??
            </p>
            <p>
              ?��? ?�해 ?�각??구현보다 ?�계 ?�도�??�해?�고 구현?�는 기�??? ?�을
              ???�었?�니??
            </p>
          </div>
          `r`n
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
                        aria-label={`${project.label} �̸�����`}
                      >
                        <span className="clone-item__read-more" aria-hidden="true">
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


