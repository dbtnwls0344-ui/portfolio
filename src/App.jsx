import { useEffect } from "react";
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
