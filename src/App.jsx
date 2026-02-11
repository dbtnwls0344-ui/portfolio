import { useEffect, useRef, useState } from "react";
import "./App.css";
import HeroSection from "./sections/HeroSection";
import ProfileSection from "./sections/ProfileSection";
import AboutSection from "./sections/AboutSection";
import PhilosophySection from "./sections/PhilosophySection";
import TextSection from "./sections/TextSection";
import CloneSection from "./sections/CloneSection";
import ArtworksSection from "./sections/ArtworksSection";
import ProjectSection from "./sections/ProjectSection";
import SkillsSection from "./sections/SkillsSection";
import QaSection from "./sections/QaSection";
import ContactSection from "./sections/ContactSection";
import ObserveSection from "./sections/ObserveSection";
import cursorClickRed from "./assets/images/cursor-click-red.svg";
import cursorClickWhite from "./assets/images/cursor-click-white.svg";

function App() {
  const cursorRef = useRef(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState("");
  const [cursorTone, setCursorTone] = useState("light");
  const [cursorImageFailed, setCursorImageFailed] = useState({
    red: false,
    white: false,
  });
  const CURSOR_IMAGE_SRC = {
    red: cursorClickRed,
    white: cursorClickWhite,
  };
  const preferredImageKey = cursorTone === "dark" ? "white" : "red";
  const fallbackImageKey = preferredImageKey === "white" ? "red" : "white";
  const activeImageKey = cursorImageFailed[preferredImageKey]
    ? fallbackImageKey
    : preferredImageKey;
  const cursorImageSrc = CURSOR_IMAGE_SRC[activeImageKey];
  const cursorHasImage = !cursorImageFailed[activeImageKey];

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCursorEnabled(media.matches);
    sync();

    if (media.addEventListener) {
      media.addEventListener("change", sync);
    } else {
      media.addListener(sync);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", sync);
      } else {
        media.removeListener(sync);
      }
    };
  }, []);

  useEffect(() => {
    if (!cursorEnabled) return undefined;

    const cursorEl = cursorRef.current;
    if (!cursorEl) return undefined;

    const CLICK_SELECTOR =
      "button, a, [role='button'], summary, label, .project-file, .clone-item__button, .observe-folder, .observe-carousel__dot, .artworks-page";
    const DRAG_SELECTOR = ".observe-modal__item, .observe-carousel__viewport";

    let activeMode = "";
    let activeTone = "light";

    const parseRgb = (raw) => {
      if (!raw || raw === "transparent") return null;
      const match = raw.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const [r = 0, g = 0, b = 0, a = 1] = match[1]
        .split(",")
        .map((part) => Number.parseFloat(part.trim()));
      return { r, g, b, a: Number.isFinite(a) ? a : 1 };
    };

    const relativeLuminance = ({ r, g, b }) => {
      const toLinear = (channel) => {
        const v = channel / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return (
        0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
      );
    };

    const resolveSurfaceTone = (target) => {
      if (!(target instanceof Element)) return "light";
      let node = target;

      while (node && node !== document.documentElement) {
        const bg = parseRgb(window.getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0.08) {
          return relativeLuminance(bg) > 0.62 ? "light" : "dark";
        }
        node = node.parentElement;
      }

      return "light";
    };

    const resolveMode = (target) => {
      if (!(target instanceof Element)) return "";
      if (target.closest(DRAG_SELECTOR)) return "drag";

      let node = target;
      let cursorHint = "";
      while (node && node !== document.documentElement) {
        const cursor = window.getComputedStyle(node).cursor;
        if (cursor && cursor !== "auto" && cursor !== "default") {
          cursorHint = cursor;
          break;
        }
        node = node.parentElement;
      }

      if (cursorHint.includes("grab")) return "drag";
      if (target.closest(CLICK_SELECTOR)) return "click";
      if (cursorHint === "pointer") return "click";
      return "";
    };

    const setMode = (nextMode) => {
      if (activeMode === nextMode) return;
      activeMode = nextMode;
      setCursorMode(nextMode);
    };

    const setTone = (nextTone) => {
      if (activeTone === nextTone) return;
      activeTone = nextTone;
      setCursorTone(nextTone);
    };

    const handlePointerMove = (event) => {
      cursorEl.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorEl.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursorEl.classList.add("is-visible");
      const nextMode = resolveMode(event.target);
      setMode(nextMode);
      if (nextMode) {
        setTone(resolveSurfaceTone(event.target));
      }
    };

    const handlePointerLeave = () => {
      cursorEl.classList.remove("is-visible");
      setMode("");
      setTone("light");
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      cursorEl.classList.remove("is-visible");
    };
  }, [cursorEnabled]);

  return (
    <div className="page">
      <div
        ref={cursorRef}
        className={`ui-cursor${cursorMode ? ` is-${cursorMode}` : ""} is-surface-${cursorTone}${cursorHasImage ? " has-image" : ""}`}
        aria-hidden="true"
      >
        <img
          className="ui-cursor__image"
          src={cursorImageSrc}
          alt=""
          onLoad={() =>
            setCursorImageFailed((prev) =>
              prev[activeImageKey]
                ? { ...prev, [activeImageKey]: false }
                : prev,
            )
          }
          onError={() =>
            setCursorImageFailed((prev) =>
              prev[activeImageKey]
                ? prev
                : { ...prev, [activeImageKey]: true },
            )
          }
        />
        <span className="ui-cursor__label">
          {cursorMode === "drag" ? "drag" : "click"}
        </span>
      </div>
      <HeroSection />
      <ProfileSection />
      <TextSection variant="prof" />
      <AboutSection />
      <ObserveSection />
      <PhilosophySection />
      <TextSection />
      <ProjectSection />
      <CloneSection />
      <ArtworksSection />
      <SkillsSection />
      <QaSection />
      <ContactSection />
    </div>
  );
}

export default App;
