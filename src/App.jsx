import "./App.css";
import HeroSection from "./sections/HeroSection";
import ProfileSection from "./sections/ProfileSection";
import AboutSection from "./sections/AboutSection";
import PhilosophySection from "./sections/PhilosophySection";
import TextSection from "./sections/TextSection";
import CloneSection from "./sections/CloneSection";
import ArtworksSection from "./sections/ArtworksSection";
import ProjectSection from "./sections/ProjectSection";

function App() {
  return (
    <div className="page">
      <HeroSection />
      <ProfileSection />
      <AboutSection />
      <PhilosophySection />
      <TextSection />
      <CloneSection />
      <ArtworksSection />
      <ProjectSection />
    </div>
  );
}

export default App;
