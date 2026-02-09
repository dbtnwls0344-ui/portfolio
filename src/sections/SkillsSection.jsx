import "./SkillsSection.css";
import skillsChatgpt from "../assets/images/skills-chatgpt.svg";
import skillsGemini from "../assets/images/skills-gemini.svg";
import skillsMidjourney from "../assets/images/skills-midjourney.svg";
import skillsLightroom from "../assets/images/skills-lightroom.svg";
import skillsPhotoshop from "../assets/images/skills-photoshop.svg";
import skillsIllustrator from "../assets/images/skills-illustrator.svg";
import skillsAfterEffects from "../assets/images/skills-aftereffects.svg";
import skillsPremiere from "../assets/images/skills-premiere.svg";
import skillsFigma from "../assets/images/skills-figma.svg";
import skillsGit from "../assets/images/skills-git.svg";
import skillsGithub from "../assets/images/skills-github.svg";
import skillsVscode from "../assets/images/skills-vscode.svg";
import skillsReact from "../assets/images/skills-react.svg";
import skillsJavascript from "../assets/images/skills-js.svg";
import skillsJquery from "../assets/images/skills-jquery.svg";
import skillsHtml from "../assets/images/skills-html.svg";
import skillsCss from "../assets/images/skills-css.svg";
import skillsNotion from "../assets/images/skills-notion.svg";

const SKILLS = [
  { name: "ChatGPT", icon: skillsChatgpt },
  { name: "Gemini", icon: skillsGemini },
  { name: "Midjourney", icon: skillsMidjourney },
  { name: "Lightroom", icon: skillsLightroom },
  { name: "Photoshop", icon: skillsPhotoshop },
  { name: "Illustrator", icon: skillsIllustrator },
  { name: "After Effects", icon: skillsAfterEffects },
  { name: "Premiere Pro", icon: skillsPremiere },
  { name: "Figma", icon: skillsFigma },
  { name: "Git", icon: skillsGit },
  { name: "GitHub", icon: skillsGithub },
  { name: "VS Code", icon: skillsVscode },
  { name: "React", icon: skillsReact },
  { name: "JavaScript", icon: skillsJavascript },
  { name: "jQuery", icon: skillsJquery },
  { name: "HTML5", icon: skillsHtml },
  { name: "CSS3", icon: skillsCss },
  { name: "Notion", icon: skillsNotion },
];

function SkillsSection() {
  return (
    <section className="skills-section section" id="skills">
      <div className="skills-section__inner">
        <h2 className="skills-section__title">Skill &amp; Tools</h2>
      </div>

      <div className="skills-marquee" aria-label="Skill icons marquee">
        <div className="skills-marquee__track">
          {SKILLS.map((skill) => (
            <div className="skills-icon" key={skill.name}>
              <img src={skill.icon} alt={skill.name} />
            </div>
          ))}
        </div>
        <div className="skills-marquee__track" aria-hidden="true">
          {SKILLS.map((skill) => (
            <div className="skills-icon" key={`${skill.name}-dup`}>
              <img src={skill.icon} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
