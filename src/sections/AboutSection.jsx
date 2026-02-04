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
      title: "Sensing Art & Observation",
      body:
        "미술을 전공하며 이미지를 빠르게 소비하기보다 오래 관찰하고 " +
        "축적하는 방식에 익숙해졌습니다.",
      image: aboutImage01,
      icon: aboutIconStarRed,
    },
    {
      title: "Communication & Mediation",
      body: "사람과 사람, 사람과 서비스 사이의 맥락을 정리하고 전달하는 일을 좋아합니다.",
      image: aboutImage02,
      icon: aboutIconStarWhite,
    },
    {
      title: "Building UIUX & Frontend",
      body: "리서치부터 프로토타입, 프론트엔드 구현까지 이어지는 흐름을 즐깁니다.",
      image: aboutImage03,
      icon: aboutIconStarRed,
    },
  ];

  /* 클릭 시 해당 step 위치로 스크롤 */
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
        .timeline({
          defaults: { ease: "power2.out" },
        })
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
        markers: false, // 필요하면 true
        onEnter: () => swapTo(index),
        onEnterBack: () => swapTo(index),
      }),
    );

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (swapTlRef.current) swapTlRef.current.kill();
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

          {/* 좌측 본문 */}
          <div className="about__body">
            <p>{active.body}</p>
          </div>

          {/* 우측 하단 이미지 */}
          <div className="about__image">
            <img src={active.image} alt={active.title} />
          </div>

          {/* ⭐ 인디케이터 */}
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
