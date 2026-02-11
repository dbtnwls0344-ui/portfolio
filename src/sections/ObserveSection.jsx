import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ObserveSection.css";
import aboutIconRed from "../assets/images/about-icon-star-red.svg";
import observeFolderFront from "../assets/images/observe-folder-front.png";
import observeFolderBack from "../assets/images/observe-folder-back.png";
import observeFolderBackOpen from "../assets/images/observe-folder-back-open.png";
import observeFilm01 from "../assets/images/observe-film-01.png";
import observeFilm02 from "../assets/images/observe-film-02.png";
import observeFilm03 from "../assets/images/observe-film-03.png";
import observeFilm04 from "../assets/images/observe-film-04.png";
import observeTravel01 from "../assets/images/observe-travel-01.png";
import observeTravel02 from "../assets/images/observe-travel-02.png";
import observeTravel03 from "../assets/images/observe-travel-03.png";
import observeTravel04 from "../assets/images/observe-travel-04.png";
import observeFashion01 from "../assets/images/observe-fashion-01.png";
import observeFashion02 from "../assets/images/observe-fashion-02.png";
import observeFashion03 from "../assets/images/observe-fashion-03.png";
import observeFashion04 from "../assets/images/observe-fashion-04.png";
import observePainting01 from "../assets/images/observe-painting-01.png";
import observePainting02 from "../assets/images/observe-painting-02.jpg";
import observePainting03 from "../assets/images/observe-painting-03.png";
import observePainting04 from "../assets/images/observe-painting-04.png";

const filmImages = [
  observeFilm01,
  observeFilm02,
  observeFilm03,
  observeFilm04,
];
const travelImages = [
  observeTravel01,
  observeTravel02,
  observeTravel03,
  observeTravel04,
];
const fashionImages = [
  observeFashion01,
  observeFashion02,
  observeFashion03,
  observeFashion04,
];
const paintingImages = [
  observePainting01,
  observePainting02,
  observePainting03,
  observePainting04,
];

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

const toItemPositions = (layout) =>
  layout.map((point) => ({
    x: point.x,
    y: point.y,
    r: point.rotation,
    vx: 0,
    vy: 0,
  }));

function ObserveSection() {
  const folders = useMemo(
    () => [
      {
        id: "film",
        label: "FILM",
        previews: filmImages.slice(0, 3),
        images: filmImages,
      },
      {
        id: "travel",
        label: "TRAVEL",
        previews: travelImages.slice(0, 3),
        images: travelImages,
      },
      {
        id: "fashion",
        label: "FASHION",
        previews: fashionImages.slice(0, 3),
        images: fashionImages,
      },
      {
        id: "painting",
        label: "PAINTING",
        previews: paintingImages.slice(0, 3),
        images: paintingImages,
      },
    ],
    [],
  );

  const [activeFolder, setActiveFolder] = useState(null);
  const [scatterSeed, setScatterSeed] = useState(1);
  const [itemPositions, setItemPositions] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [mobileFolderIndex, setMobileFolderIndex] = useState(0);
  const [isMobileCarousel, setIsMobileCarousel] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 760px)").matches;
  });
  const galleryRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const dragRef = useRef(null);
  const rafRef = useRef(null);
  const animateRepelRef = useRef(null);
  const carouselSwipeRef = useRef({ startX: 0, startY: 0, active: false });
  const suppressTapRef = useRef(false);

  const handleOpen = (folder) => {
    const nextSeed = scatterSeed + 1;
    const nextLayout = createScatterLayout(folder.images.length, nextSeed);

    setScatterSeed(nextSeed);
    setItemPositions(toItemPositions(nextLayout));
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
    setItemPositions([]);
    setActiveFolder(null);
  };

  const animateRepel = useCallback(() => {
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

        const reverseX =
          targetVx !== 0 && Math.sign(targetVx) !== Math.sign(item.vx);
        const reverseY =
          targetVy !== 0 && Math.sign(targetVy) !== Math.sign(item.vy);
        const brakeX = reverseX ? 0.8 : 1;
        const brakeY = reverseY ? 0.8 : 1;
        let nextVx =
          (item.vx * brakeX + (targetVx - item.vx) * response) * coasting;
        let nextVy =
          (item.vy * brakeY + (targetVy - item.vy) * response) * coasting;
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

    rafRef.current = requestAnimationFrame(() => {
      animateRepelRef.current?.();
    });
  }, []);

  useEffect(() => {
    animateRepelRef.current = animateRepel;
  }, [animateRepel]);

  const ensureRepelLoop = useCallback(() => {
    if (rafRef.current || !animateRepelRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      animateRepelRef.current?.();
    });
  }, []);

  const shiftMobileFolder = useCallback(
    (direction) => {
      setMobileFolderIndex(
        (prev) => (prev + direction + folders.length) % folders.length,
      );
    },
    [folders.length],
  );

  const getMobileSlotClass = useCallback(
    (index) => {
      const total = folders.length;
      const offset = (index - mobileFolderIndex + total) % total;

      if (offset === 0) return "is-center";
      if (offset === 1) return "is-next";
      if (offset === total - 1) return "is-prev";
      return "is-hidden";
    },
    [folders.length, mobileFolderIndex],
  );

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

  const handleCarouselPointerDown = (event) => {
    carouselSwipeRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      active: true,
    };
  };

  const handleCarouselPointerUp = (event) => {
    const swipe = carouselSwipeRef.current;
    if (!swipe.active) return;
    swipe.active = false;

    const dx = event.clientX - swipe.startX;
    const dy = event.clientY - swipe.startY;
    const horizontalSwipe =
      Math.abs(dx) >= 46 && Math.abs(dx) > Math.abs(dy) * 1.15;
    if (!horizontalSwipe) return;

    suppressTapRef.current = true;
    if (dx < 0) {
      shiftMobileFolder(1);
    } else {
      shiftMobileFolder(-1);
    }
  };

  const handleCarouselPointerCancel = () => {
    carouselSwipeRef.current.active = false;
  };

  const handleFolderTrigger = (folder, index) => {
    if (suppressTapRef.current) {
      suppressTapRef.current = false;
      return;
    }

    if (isMobileCarousel && index !== mobileFolderIndex) {
      setMobileFolderIndex(index);
      return;
    }

    handleOpen(folder);
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
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const syncCarouselMode = (event) => setIsMobileCarousel(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncCarouselMode);
    } else {
      mediaQuery.addListener(syncCarouselMode);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncCarouselMode);
      } else {
        mediaQuery.removeListener(syncCarouselMode);
      }
    };
  }, []);

  useEffect(() => {
    if (activeFolder) {
      ensureRepelLoop();
    }
  }, [activeFolder, ensureRepelLoop]);

  const renderFolderButton = (folder, index, className = "") => (
    <button
      key={folder.id}
      className={["observe-folder", className].filter(Boolean).join(" ")}
      type="button"
      onClick={() => handleFolderTrigger(folder, index)}
      aria-label={`${folder.label} folder`}
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
          {folder.previews.map((src, previewIndex) => (
            <img
              key={src}
              className="observe-folder__preview"
              src={src}
              alt=""
              loading="lazy"
              style={{ "--preview-index": previewIndex }}
            />
          ))}
        </div>
      </div>
      <span className="observe-folder__label">{folder.label}</span>
    </button>
  );

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

        {isMobileCarousel ? (
          <div className="observe-carousel">
            <div
              className="observe-carousel__viewport"
              onPointerDown={handleCarouselPointerDown}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerCancel}
            >
              <div className="observe-carousel__track">
                {folders.map((folder, index) =>
                  renderFolderButton(
                    folder,
                    index,
                    `observe-folder--carousel ${getMobileSlotClass(index)}`,
                  ),
                )}
              </div>
            </div>

            <nav className="observe-carousel__dots" aria-label="Folder slides">
              {folders.map((folder, index) => (
                <button
                  key={`${folder.id}-dot`}
                  className={`observe-carousel__dot ${
                    index === mobileFolderIndex ? "is-active" : ""
                  }`}
                  type="button"
                  onClick={() => setMobileFolderIndex(index)}
                  aria-label={`Go to ${folder.label}`}
                />
              ))}
            </nav>
          </div>
        ) : (
          <div className="observe-grid">
            {folders.map((folder, index) => renderFolderButton(folder, index))}
          </div>
        )}
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
                    "--x": `${itemPositions[index]?.x ?? 0}px`,
                    "--y": `${itemPositions[index]?.y ?? 0}px`,
                    "--r": `${itemPositions[index]?.r ?? 0}deg`,
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
