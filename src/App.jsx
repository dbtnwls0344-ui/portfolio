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

const DECOR_SECTION_SELECTOR = [
  ".hero",
  ".profile.section",
  ".text-section",
  ".about",
  ".observe-section",
  ".philosophy",
  ".project-section.section",
  ".clone-section",
  ".artworks-section",
  ".skills-section",
  ".qa-section",
  ".contact-section",
].join(", ");

function App() {
  const cursorRef = useRef(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState("");
  const [cursorTone, setCursorTone] = useState("light");

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
      'button, a, [role="button"], summary, .project-file, .clone-item__button, .observe-folder, .observe-carousel__dot';
    const DRAG_SELECTOR = ".observe-modal__item, .observe-carousel__viewport";
    const INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";

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
      if (target.closest(INPUT_SELECTOR)) return "";
      if (target.closest(DRAG_SELECTOR)) return "drag";
      if (target.closest(CLICK_SELECTOR)) return "click";
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

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll(DECOR_SECTION_SELECTOR),
    );
    if (!sections.length) return undefined;
    const hoverCapable = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const removeHoverListeners = [];

    const defaults = {
      a: "6% 10%",
      b: "92% 16%",
      c: "84% 84%",
    };

    const parsePos = (raw, fallback) => {
      const source = (raw || fallback || "").trim().replace(/\s+/g, " ");
      const [left = "0%", top = "0%"] = source.split(" ");
      return { left, top };
    };

    sections.forEach((section) => {
      let layer = section.querySelector(".section-decor-hit-layer");
      if (!layer) {
        layer = document.createElement("div");
        layer.className = "section-decor-hit-layer";
        layer.setAttribute("aria-hidden", "true");

        ["a", "b", "c"].forEach((key) => {
          const hit = document.createElement("span");
          hit.className = `section-decor-hit section-decor-hit--${key}`;
          layer.append(hit);
        });

        section.append(layer);
      }

      if (hoverCapable) {
        const hits = Array.from(layer.querySelectorAll(".section-decor-hit"));
        const handleEnter = () => section.classList.add("is-bg-icon-hover");
        const handleLeave = (event) => {
          if (layer.contains(event.relatedTarget)) return;
          section.classList.remove("is-bg-icon-hover");
        };

        hits.forEach((hit) => {
          hit.addEventListener("pointerenter", handleEnter);
          hit.addEventListener("pointerleave", handleLeave);
        });

        removeHoverListeners.push(() => {
          hits.forEach((hit) => {
            hit.removeEventListener("pointerenter", handleEnter);
            hit.removeEventListener("pointerleave", handleLeave);
          });
          section.classList.remove("is-bg-icon-hover");
        });
      }
    });

    const applyHitPositions = () => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches;

      sections.forEach((section) => {
        const styles = window.getComputedStyle(section);

        ["a", "b", "c"].forEach((key) => {
          const mobilePos = styles
            .getPropertyValue(`--bg-pos-${key}-mobile`)
            .trim();
          const desktopPos = styles.getPropertyValue(`--bg-pos-${key}`).trim();
          const { left, top } = parsePos(
            isMobile && mobilePos ? mobilePos : desktopPos,
            defaults[key],
          );

          section.style.setProperty(`--bg-hit-${key}-left`, left);
          section.style.setProperty(`--bg-hit-${key}-top`, top);
        });
      });
    };

    applyHitPositions();
    window.addEventListener("resize", applyHitPositions);

    return () => {
      window.removeEventListener("resize", applyHitPositions);
      removeHoverListeners.forEach((dispose) => dispose());
      sections.forEach((section) => {
        section.style.removeProperty("--bg-hit-a-left");
        section.style.removeProperty("--bg-hit-a-top");
        section.style.removeProperty("--bg-hit-b-left");
        section.style.removeProperty("--bg-hit-b-top");
        section.style.removeProperty("--bg-hit-c-left");
        section.style.removeProperty("--bg-hit-c-top");

        const layer = section.querySelector(".section-decor-hit-layer");
        if (layer) layer.remove();
      });
    };
  }, []);

  return (
    <div className="page">
      <div
        ref={cursorRef}
        className={`ui-cursor${cursorMode ? ` is-${cursorMode}` : ""} is-surface-${cursorTone}`}
        aria-hidden="true"
      >
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
