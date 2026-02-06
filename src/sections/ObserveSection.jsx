import { useMemo, useState } from "react";
import "./ObserveSection.css";
import aboutIconRed from "../assets/images/about-icon-star-red.svg";
import observeFolderFront from "../assets/images/observe-folder-front.png";
import observeFolderBack from "../assets/images/observe-folder-back.png";
import observeFolderFrontOpen from "../assets/images/observe-folder-front-open.png";
import observeFolderBackOpen from "../assets/images/observe-folder-back-open.png";
import observeFashion01 from "../assets/images/observe-fashion-01.png";
import observeFashion02 from "../assets/images/observe-fashion-02.png";
import observeFashion03 from "../assets/images/observe-fashion-03.png";
import observeFashion04 from "../assets/images/observe-fashion-04.png";
import observeMovie01 from "../assets/images/observe-movie-01.png";
import observeMovie02 from "../assets/images/observe-movie-02.png";
import observeMovie03 from "../assets/images/observe-movie-03.png";
import observeMovie04 from "../assets/images/observe-movie-04.png";
import observePainting01 from "../assets/images/observe-painting-01.png";
import observePainting02 from "../assets/images/observe-painting-02.png";
import observePainting03 from "../assets/images/observe-painting-03.png";
import observePainting04 from "../assets/images/observe-painting-04.png";
import observePainting201 from "../assets/images/observe-painting2-01.png";
import observePainting202 from "../assets/images/observe-painting2-02.png";
import observePainting203 from "../assets/images/observe-painting2-03.png";
import observePainting204 from "../assets/images/observe-painting2-04.png";

function ObserveSection() {
  const folders = useMemo(
    () => [
      {
        id: "fashion",
        label: "Fashion",
        previews: [observeFashion01, observeFashion02, observeFashion03],
        images: [
          observeFashion01,
          observeFashion02,
          observeFashion03,
          observeFashion04,
        ],
      },
      {
        id: "movie",
        label: "Movie",
        previews: [observeMovie01, observeMovie02, observeMovie03],
        images: [
          observeMovie01,
          observeMovie02,
          observeMovie03,
          observeMovie04,
        ],
      },
      {
        id: "painting-01",
        label: "Painting",
        previews: [observePainting01, observePainting02, observePainting03],
        images: [
          observePainting01,
          observePainting02,
          observePainting03,
          observePainting04,
        ],
      },
      {
        id: "painting-02",
        label: "Painting",
        previews: [observePainting201, observePainting202, observePainting203],
        images: [
          observePainting201,
          observePainting202,
          observePainting203,
          observePainting204,
        ],
      },
    ],
    [],
  );

  const [activeFolder, setActiveFolder] = useState(null);

  const handleOpen = (folder) => {
    setActiveFolder(folder);
  };

  const handleClose = () => {
    setActiveFolder(null);
  };

  const handleMouseMove = (event) => {
    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    const tiltX = (relX - 0.5) * 2;
    const tiltY = (relY - 0.5) * 2;
    panel.style.setProperty("--cursor-x", tiltX.toFixed(3));
    panel.style.setProperty("--cursor-y", tiltY.toFixed(3));
  };

  const handleMouseLeave = (event) => {
    const panel = event.currentTarget;
    panel.style.setProperty("--cursor-x", "0");
    panel.style.setProperty("--cursor-y", "0");
  };

  return (
    <section
      className={`observe-section section${
        activeFolder ? " observe-section--modal" : ""
      }`}
      id="observe"
    >
      <div className="observe-section__inner">
        <div className="observe-section__header">
          <img
            className="observe-section__star"
            src={aboutIconRed}
            alt=""
            aria-hidden
          />
          <h2 className="observe-section__title">What I Observe</h2>
          <p className="observe-section__subtitle">
            Moments I notice before they become meaning.
          </p>
        </div>

        <div className="observe-grid">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className="observe-folder"
              type="button"
              onClick={() => handleOpen(folder)}
            >
              <div className="observe-folder__stack">
                <img
                  className="observe-folder__back"
                  src={observeFolderBack}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="observe-folder__back observe-folder__back--open"
                  src={observeFolderBackOpen}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="observe-folder__front"
                  src={observeFolderFront}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="observe-folder__front observe-folder__front--open"
                  src={observeFolderFrontOpen}
                  alt=""
                  aria-hidden="true"
                />
                <div className="observe-folder__previews" aria-hidden="true">
                  {folder.previews.map((src, index) => (
                    <img
                      key={src}
                      className="observe-folder__preview"
                      src={src}
                      alt=""
                      loading="lazy"
                      style={{ "--preview-index": index }}
                    />
                  ))}
                </div>
              </div>
              <span className="observe-folder__label">{folder.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeFolder && (
        <div className="observe-modal" role="dialog" aria-modal="true">
          <button
            className="observe-modal__overlay"
            type="button"
            onClick={handleClose}
          >
            <span className="sr-only">Close gallery</span>
          </button>
          <div
            className="observe-modal__panel"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="observe-modal__close"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <div className="observe-modal__gallery">
              {activeFolder.images.map((src, index) => (
                <div
                  className="observe-modal__item"
                  key={`${activeFolder.id}-${src}`}
                  style={{
                    "--i": index,
                    "--x": `${(index % 3) * 120 - 120}px`,
                    "--y": `${Math.floor(index / 3) * 90 - 70}px`,
                    "--r": `${(index % 2 === 0 ? -1 : 1) * (10 + index * 2)}deg`,
                  }}
                >
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ObserveSection;
