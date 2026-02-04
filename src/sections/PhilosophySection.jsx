import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PhilosophySection.css";
import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import aboutIconRed from "../assets/images/about-icon-star-red.svg";

function PhilosophySection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const swapDuration = 0.8;
    const swapEase = "power3.out";

    const setSwapColors = () => {
      gsap.to(section, {
        "--philo-bg": "#9c2020",
        "--philo-text": "#d9d7d4",
        "--philo-accent": "#ffffff",
        "--philo-border": "rgba(217, 215, 212, 0.35)",
        "--philo-star-a": 0,
        "--philo-star-b": 1,
        duration: swapDuration,
        ease: swapEase,
        overwrite: "auto",
      });
    };

    const setBaseColors = () => {
      gsap.to(section, {
        "--philo-bg": "#d9d7d4",
        "--philo-text": "#b11226",
        "--philo-accent": "#b11226",
        "--philo-border": "rgba(177, 18, 38, 0.35)",
        "--philo-star-a": 1,
        "--philo-star-b": 0,
        duration: swapDuration,
        ease: swapEase,
        overwrite: "auto",
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: setSwapColors,
        onEnterBack: setSwapColors,
        onLeaveBack: setBaseColors,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy section" id="philosophy" ref={sectionRef}>
      <div className="philosophy__inner">
        <div className="philosophy__quote">
          <span className="philosophy__star-wrap" aria-hidden="true">
            <img className="philosophy__star" src={aboutIconRed} alt="" />
            <img
              className="philosophy__star philosophy__star--swap"
              src={aboutIconWhite}
              alt=""
            />
          </span>
          <p>
            I design by focusing on what remains after the experience,
            not just what appears on the screen.
          </p>
        </div>

        <div className="philosophy__grid">
          <div className="philosophy__left" aria-hidden="true">
            <div className="philosophy__rail">Design Philosophy</div>
            <div className="philosophy__dropcap">D</div>
          </div>

          <div className="philosophy__list">
            <div className="philosophy__item">
              <h3>Design begins after use</h3>
              <p>경험은 사용이 끝난 뒤에 완성된다고 생각합니다.</p>
              <p>
                디자인의 역할은 화면이 보이는 순간에 머무르지 않는다고 믿습니다.
                저는 사용이 끝난 이후에도 이해와 감각이 남아 있는 상태를 기준으로
                경험을 설계합니다.
              </p>
            </div>
            <div className="philosophy__item">
              <h3>Structure defines choice</h3>
              <p>구조는 사용자의 선택을 만든다고 생각합니다.</p>
              <p>
                형태보다 먼저 구조를 정의하는 것이
                명확한 선택과 일관된 흐름을 만든다고 믿습니다.
                저는 시각적 완성도보다, 판단이 가능한 구조를 우선합니다.
              </p>
            </div>
            <div className="philosophy__item">
              <h3>Observation precedes design</h3>
              <p>관찰은 설계보다 앞선다고 생각합니다.</p>
              <p>
                사용자가 어떻게 행동해야 하는지를 가정하기보다,
                실제 반응과 흐름을 관찰하는 것에서 설계를 시작합니다.
                이 관찰은 모든 디자인 판단의 출발점이 됩니다.
              </p>
            </div>
            <div className="philosophy__item">
              <h3>Clarity over complexity</h3>
              <p>복잡함보다 명확함을 우선합니다.</p>
              <p>
                많은 기능이나 장치보다,
                사용자가 망설이지 않고 이해할 수 있는 상태를 더 중요하게 생각합니다.
                저는 문제를 단순화하는 것이 아니라,
                불필요한 복잡함을 걷어내는 방향으로 디자인합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
