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
              <p>경험?� ?�용???�난 ?�에 ?�성?�다�??�각?�니??</p>
              <p>
                ?�자?�의 ??��?� ?�면??보이???�간?�만 머무르�? ?�는?�고
                믿습?�다. ?�???�용???�난 ?�후?�도 ?�해?� 감각???�아 ?�는
                ?�태�?기�??�로 경험???�계?�니??
              </p>
            </div>
            <div className="philosophy__item">
              <h3>Structure defines choice</h3>
              <p>구조???�용?�의 ?�택 ??만든?�고 ?�각?�니??</p>
              <p>
                ?�태보다 먼�? 구조�??�의?�는 것이
                명확???�택�??��????�름??만든?�고 믿습?�다.
                ?�???�각???�성?�보?? ?�단??가?�한 구조�??�선?�니??</p>
            </div>
            <div className="philosophy__item">
              <h3>Observation precedes design</h3>
              <p>관찰�? ?�계보다 ?�선?�고 ?�각?�니??</p>
              <p>
                ?�용?��? ?�떻�??�동?�야 ?�는지�?가?�하기보??
                ?�제 반응�??�름??관찰하??것에???�계�??�작?�니??
                ??관찰�? 모든 ?�자???�단??출발?�이 ?�니??
              </p>
            </div>
            <div className="philosophy__item">
              <h3>Clarity over complexity</h3>
              <p>복잡?�보??명확?�을 ?�선?�니??</p>
              <p>
                많�? 기능?�나 ?�치보다,
                ?�용?��? 망설?��? ?�고 ?�해?????�는 ?�태�???중요?�게 ?�각?�니??
                ?�??문제�??�순?�하??것이 ?�니??
                불필?�한 복잡?�을 걷어?�는 방향?�로 ?�자?�합?�다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;

