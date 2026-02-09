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

function App() {
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
