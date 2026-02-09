import { useEffect, useMemo, useRef, useState } from "react";
import "./ObserveSection.css";
import aboutIconRed from "../assets/images/about-icon-star-red.svg";
import observeFolderFront from "../assets/images/observe-folder-front.png";
import observeFolderBack from "../assets/images/observe-folder-back.png";
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

const pseudoRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const createScatterLayout = (count, seed) => {
  const points = [];

  for (let index = 0; index < count; index += 1) {
    let x = 0;
    let y = 0;
    let accepted = false;

    for (let attempt = 0; attempt < 30; attempt += 1) {
      const randX = pseudoRandom(seed * 11.3 + index * 17.7 + attempt * 5.9);
      const randY = pseudoRandom(seed * 7.1 + index * 13.1 + attempt * 3.7);
      x = (randX - 0.5) * 620;
      y = (randY - 0.5) * 360;

      const isFarEnough = points.every((point) => {
        const dx = point.x - x;
        const dy = point.y - y;
        return Math.hypot(dx, dy) > 140;
      });

      if (isFarEnough) {
        accepted = true;
        break;
      }
    }

    if (!accepted) {
      x = (index % 3) * 180 - 180;
      y = Math.floor(index / 3) * 120 - 120;
    }

    const rotation = (pseudoRandom(seed * 19.4 + index * 9.3) - 0.5) * 28;
    points.push({ x, y, rotation });
  }

  return points;
};

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
  const [scatterSeed, setScatterSeed] = useState(1);
  const [itemPositions, setItemPositions] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const galleryRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const dragRef = useRef(null);
  const rafRef = useRef(null);

  const scatterLayout = useMemo(() => {
    if (!activeFolder) return [];
    return createScatterLayout(activeFolder.images.length, scatterSeed);
  }, [activeFolder, scatterSeed]);

  useEffect(() => {
    if (!scatterLayout.length) {
      setItemPositions([]);
      return;
    }

    setItemPositions(
      scatterLayout.map((point) => ({
        x: point.x,
        y: point.y,
        r: point.rotation,
        vx: 0,
        vy: 0,
      })),
    );
  }, [scatterLayout]);

  const handleOpen = (folder) => {
    setScatterSeed((prev) => prev + 1);
    pointerRef.current = { x: 0, y: 0, active: false };
    setActiveFolder(folder);
  };

  const handleClose = () => {
    pointerRef.current = { x: 0, y: 0, active: false };
    dragRef.current = null;
    setDraggingIndex(null);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setActiveFolder(null);
  };

  const animateRepel = () => {
    const gallery = galleryRef.current;
    if (!gallery) {
      rafRef.current = null;
      return;
    }

    const rect = gallery.getBoundingClientRect();
    const pointer = pointerRef.current;
    const radius = 210;
    const repelPower = 1.05;
    const response = 0.085;
    const coasting = 0.94;
    const maxSpeed = 5.2;
    const bounce = 0.72;
    const draggedIndex = dragRef.current?.index ?? -1;

    setItemPositions((prev) =>
      prev.map((item, index) => {
        if (index === draggedIndex) {
          return item;
        }

        let targetVx = 0;
        let targetVy = 0;

        if (pointer.active) {
          const itemX = rect.width / 2 + item.x;
          const itemY = rect.height / 2 + item.y;
          const dx = itemX - pointer.x;
          const dy = itemY - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < radius && dist > 0.001) {
            const force = ((radius - dist) / radius) ** 1.8;
            const speed = force * repelPower * maxSpeed;
            targetVx = (dx / dist) * speed;
            targetVy = (dy / dist) * speed;
          }
        }

        const reverseX = targetVx !== 0 && Math.sign(targetVx) !== Math.sign(item.vx);
        const reverseY = targetVy !== 0 && Math.sign(targetVy) !== Math.sign(item.vy);
        const brakeX = reverseX ? 0.8 : 1;
        const brakeY = reverseY ? 0.8 : 1;
        let nextVx = (item.vx * brakeX + (targetVx - item.vx) * response) * coasting;
        let nextVy = (item.vy * brakeY + (targetVy - item.vy) * response) * coasting;
        const halfW = rect.width / 2 - 90;
        const halfH = rect.height / 2 - 90;
        let nextX = item.x + nextVx;
        let nextY = item.y + nextVy;

        if (nextX > halfW) {
          nextX = halfW;
          nextVx *= -bounce;
        } else if (nextX < -halfW) {
          nextX = -halfW;
          nextVx *= -bounce;
        }

        if (nextY > halfH) {
          nextY = halfH;
          nextVy *= -bounce;
        } else if (nextY < -halfH) {
          nextY = -halfH;
          nextVy *= -bounce;
        }

        const nextR = (item.r + nextVx * 0.7) * 0.985;

        return {
          x: nextX,
          y: nextY,
          r: Math.max(-28, Math.min(28, nextR)),
          vx: nextVx,
          vy: nextVy,
        };
      }),
    );

    rafRef.current = requestAnimationFrame(animateRepel);
  };

  const ensureRepelLoop = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(animateRepel);
  };

  const handleItemPointerDown = (index) => (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    event.preventDefault();
    const rect = gallery.getBoundingClientRect();
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      halfW: rect.width / 2 - 90,
      halfH: rect.height / 2 - 90,
    };
    setDraggingIndex(index);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    ensureRepelLoop();
  };

  const handleItemPointerMove = (index) => (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.index !== index || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const now = performance.now();
    const dt = Math.max(8, now - drag.lastTime);
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    const instantVx = dx * (16 / dt);
    const instantVy = dy * (16 / dt);

    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = now;

    setItemPositions((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        const nextX = Math.max(-drag.halfW, Math.min(drag.halfW, item.x + dx));
        const nextY = Math.max(-drag.halfH, Math.min(drag.halfH, item.y + dy));

        return {
          ...item,
          x: nextX,
          y: nextY,
          vx: instantVx,
          vy: instantVy,
          r: Math.max(-28, Math.min(28, item.r + instantVx * 0.35)),
        };
      }),
    );
  };

  const handleItemPointerUp = (index) => (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.index !== index || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDraggingIndex(null);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
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

    if (galleryRef.current) {
      const galleryRect = galleryRef.current.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - galleryRect.left,
        y: event.clientY - galleryRect.top,
        active: true,
      };
      ensureRepelLoop();
    }
  };

  const handleMouseLeave = (event) => {
    const panel = event.currentTarget;
    panel.style.setProperty("--cursor-x", "0");
    panel.style.setProperty("--cursor-y", "0");
    pointerRef.current = { x: 0, y: 0, active: false };
  };

  useEffect(
    () => () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (activeFolder) {
      ensureRepelLoop();
    }
  }, [activeFolder, scatterLayout.length]);

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
            <div className="observe-modal__gallery" ref={galleryRef}>
              {activeFolder.images.map((src, index) => (
                <div
                  className={`observe-modal__item${
                    draggingIndex === index ? " is-dragging" : ""
                  }`}
                  key={`${activeFolder.id}-${src}-${scatterSeed}`}
                  onPointerDown={handleItemPointerDown(index)}
                  onPointerMove={handleItemPointerMove(index)}
                  onPointerUp={handleItemPointerUp(index)}
                  onPointerCancel={handleItemPointerUp(index)}
                  style={{
                    "--i": index,
                    "--x": `${itemPositions[index]?.x ?? scatterLayout[index]?.x ?? 0}px`,
                    "--y": `${itemPositions[index]?.y ?? scatterLayout[index]?.y ?? 0}px`,
                    "--r": `${itemPositions[index]?.r ?? scatterLayout[index]?.rotation ?? 0}deg`,
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
