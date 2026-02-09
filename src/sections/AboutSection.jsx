import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css";

import aboutIconStarRed from "../assets/images/about-icon-star-red.svg";
import aboutIconStarWhite from "../assets/images/about-icon-star-white.svg";

import aboutImage01 from "../assets/images/about-image-01.png";
import aboutImage02 from "../assets/images/about-image-02.png";
import aboutImage03 from "../assets/images/about-image-03.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const panelRef = useRef(null);
  const stepsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const swapTlRef = useRef(null);

  const blocks = [
    {
      title: (
        <>
          Sensing <br />
          Art & Observation
        </>
      ),
      altTitle: "Sensing Art & Observation",
      body: "미술을 전공하며 이미지를 빠르게 소비하기보다,오래 관찰하고 축적하는 방식에 익숙해졌습니다.Luxun Academy에서는 손을 통해 사고하는 밀도 있는 작업 과정을,홍익대학교 대학원에서는 감각을 해석하고 구조화하는 과정을 경험했습니다.이 시기를 통해 시각적 완성도 이전에‘왜 이 형태가 필요한가’를 먼저 고민하는 태도가 형성되었습니다.",
      image: aboutImage01,
      icon: aboutIconStarRed,
      caption: "Luxun Academy of Fine Arts · Hongik University Graduate School",
    },
    {
      title: "Communication & Mediation",
      altTitle: "Communication & Mediation",
      body: "문화예술교육사 과정과 아동 대상 교육, 그리고 전시 현장에서의 갤러리 통역 경험을 통해 같은 내용도 대상에 따라 전혀 다르게 전달되어야 한다는 것을 체감했습니다. 상대의 반응을 기준으로 설명의 깊이와 방식을 조율하는 과정은 이후 사용자 관점에서 경험을 설계하는 사고의 기반이 되었습니다. 이 경험들은 ‘전달’과 ‘이해’ 사이의 간극을 인식하게 만든 중요한 전환점이었습니다.",
      image: aboutImage02,
      icon: aboutIconStarWhite,
      caption:
        "Cultural Arts Education · Children’s Education · Gallery Interpretation",
    },
    {
      title: "Building UIUX & Frontend",
      altTitle: "Building UIUX & Frontend",
      body: "이젠아카데미 프론트엔드 과정을 통해 감각과 소통을 실제 인터페이스로 구현하는 방법을 익혔습니다. HTML, CSS, JavaScript, React 기반의 프로젝트 경험을 통해 화면 구성과 사용자 흐름을 구조적으로 설계하는 훈련을 반복했습니다. 이전의 관찰과 조율 경험은 이 단계에서 사용자 중심의 UIUX 설계로 구체화되었습니다.",
      image: aboutImage03,
      icon: aboutIconStarRed,
      caption: "EZEN Academy · UIUX & Frontend",
    },
  ];

  /* 인디케이터 클릭 → 해당 step으로 스크롤 */
  const scrollToIndex = (index) => {
    const steps = stepsRef.current.filter(Boolean);
    const step = steps[index];
    if (!step) return;

    const rect = step.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - window.innerHeight * 0.55 + 2;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const steps = stepsRef.current.filter(Boolean);

    const swapTo = (nextIndex) => {
      if (nextIndex === activeIndexRef.current) return;

      const panel = panelRef.current;
      if (!panel) return;

      if (swapTlRef.current) swapTlRef.current.kill();

      swapTlRef.current = gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(panel, { autoAlpha: 0, y: 18, duration: 0.18 })
        .add(() => {
          flushSync(() => setActiveIndex(nextIndex));
          activeIndexRef.current = nextIndex;
        })
        .fromTo(
          panel,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.32 },
        );
    };

    const triggers = steps.map((step, index) =>
      ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => swapTo(index),
        onEnterBack: () => swapTo(index),
      }),
    );

    ScrollTrigger.refresh();

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      triggers.forEach((t) => t.kill());
      if (swapTlRef.current) swapTlRef.current.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const active = blocks[activeIndex];

  return (
    <section className="about" id="about">
      <div className="about__scrolly">
        {/* 고정 패널 */}
        <div className="about__panel" ref={panelRef}>
          {/* 좌측 상단 타이틀 */}
          <div className="about__title">
            <img src={active.icon} alt="" aria-hidden />
            <h3>{active.title}</h3>
          </div>

          <div className="about__content">
            {/* 좌측 본문 */}
            <div className="about__body">
              <p>{active.body}</p>
            </div>

            {/* 우측 하단 이미지 */}
            <div className="about__image">
              <p className="about__image-caption">{active.caption}</p>
              <img src={active.image} alt={active.altTitle} />
            </div>
          </div>

          {/* 인디케이터 */}
          <nav className="about__indicator">
            {blocks.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`about__indicator-item ${
                  i === activeIndex ? "is-active" : ""
                }`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to section ${i + 1}`}
              >
                <img src={aboutIconStarRed} alt="" aria-hidden />
              </button>
            ))}
          </nav>
        </div>

        {/* 스크롤 트리거용 더미 */}
        <div className="about__steps" aria-hidden>
          {blocks.map((_, i) => (
            <div
              key={i}
              className="about__step"
              ref={(el) => (stepsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
