import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PhilosophySection.css";
import aboutIconWhite from "../assets/images/about-icon-star-white.svg";
import aboutIconRed from "../assets/images/about-icon-star-red.svg";
import philosophyBigD from "../assets/images/philosophy-big-d.svg";

function PhilosophySection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const swapDuration = 0.85;
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
        "--philo-bg": "#dfdfdf",
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

        // ✅ “윗 섹션이 거의 안 보이는” 시점에 맞춰 살짝 늦게 전환
        // (필로소피 top이 화면 top에 닿고 + 8px 더 내려온 후)
        start: "top+=8 top",

        // ✅ 섹션이 화면 위로 넘어가기 시작할 때까지는 스왑 상태 유지
        end: "bottom top",

        onEnter: setSwapColors,
        onEnterBack: setSwapColors,

        // ✅ 다시 위로 올라갈 때만 원래 색으로 복귀 (자연스러움 유지)
        onLeaveBack: setBaseColors,

        // 안정감: 레이아웃 변화 시 트리거 재계산
        invalidateOnRefresh: true,
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
            I design by focusing on what remains after the experience, not just
            what appears on the screen.
          </p>
        </div>

        <div className="philosophy__grid">
          <div className="philosophy__left" aria-hidden="true">
            <div className="philosophy__rail">Design Philosophy</div>
            <img
              className="philosophy__dropcap-image"
              src={philosophyBigD}
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="philosophy__list">
            <div className="philosophy__item">
              <h3>Design begins after use</h3>
              <p>경험은 ‘사용’이 끝난 뒤에 완성된다고 생각합니다.</p>
              <p>
                사용자의 첫 화면에서 보이는 순간만 머무르지 않는다고 믿습니다.
                사용이 끝난 이후에도 잔상이 남는 형태로 경험을 설계합니다.
              </p>
            </div>

            <div className="philosophy__item">
              <h3>Structure defines choice</h3>
              <p>구조는 사용자의 선택을 만든다고 생각합니다.</p>
              <p>
                형태보다 먼저 구조를 세우는 것이 명확한 선택과 흐름을 만든다고
                믿습니다. 감각적 완성보다, 판단 가능한 구조를 우선합니다.
              </p>
            </div>

            <div className="philosophy__item">
              <h3>Observation precedes design</h3>
              <p>관찰은 설계보다 우선한다고 생각합니다.</p>
              <p>
                사용자가 어떻게 행동해야 하는지 ‘가르치기’보다, 실제 반응과
                흐름을 관찰하는 것에서 설계를 시작합니다. 관찰은 모든 판단의
                출발점입니다.
              </p>
            </div>

            <div className="philosophy__item">
              <h3>Clarity over complexity</h3>
              <p>복잡함보다 명확함을 우선합니다.</p>
              <p>
                많은 기능이나 장치보다, 사용자가 망설이지 않고 이해할 수 있는
                상태를 중요하게 생각합니다. 문제를 단순화하는 것이 아니라,
                불필요한 복잡함을 걷어내는 방향으로 최적화합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
