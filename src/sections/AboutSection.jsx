import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css";

import aboutIconStarRed from "../assets/images/about-icon-star-red.svg";
import aboutIconStarWhite from "../assets/images/about-icon-star-white.svg";

import aboutImage01 from "../assets/images/about-image-01.webp";
import aboutImage02 from "../assets/images/about-image-02.webp";
import aboutImage03 from "../assets/images/about-image-03.webp";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 980px)").matches;
  });

  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const mobileTrackRef = useRef(null);
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
      bodyTitle: (
        <>
          회화 전공에서
          <br />
          익힌 조형 설계를 UX 정보 구조에 적용합니다
        </>
      ),
      body: "순수미술을 전공하며 이미지를 빠르게 소비하기보다, 오래 관찰하고 축적하는 방식에 익숙해졌습니다.Luxun Academy에서는 손으로 사고하는 밀도 있는 작업 과정을 경험했고,홍익대학교 대학원에서는 감각을 해석하고 구조화하는 훈련을 이어갔습니다.이 과정 속에서 시각적 완성도 이전에, “왜 이 형태가 필요한가”를 먼저 질문하는 태도가 자리 잡았습니다.",
      image: aboutImage01,
      icon: aboutIconStarRed,
      caption: "Luxun Academy of Fine Arts · Hongik University Graduate School",
    },
    {
      title: "Communication & Mediation",
      altTitle: "Communication & Mediation",
      bodyTitle: "현장 커뮤니케이션 경험을 UX 문제 정의에 활용합니다",
      body: "문화예술교육사 과정과 다양한 연령층을 대상으로 한 미술교육, 그리고 전시 현장에서의 갤러리 통역 경험을 통해같은 내용이라도 대상의 맥락에 따라 전달 방식이 달라져야 한다는 것을 배웠습니다.상대의 반응을 기준으로 설명의 순서와 밀도를 조정해왔고,이 경험은 사용자 관점에서 문제를 재구성하는 사고로 이어졌습니다.저는 ‘전달’이 아니라 ‘이해’를 기준으로 경험을 설계합니다.",
      image: aboutImage02,
      icon: aboutIconStarWhite,
      caption:
        "Cultural Arts Education · Children’s Education · Gallery Interpretation",
    },
    {
      title: "Building UIUX",
      altTitle: "Building UIUX",
      bodyTitle: "설계한 UX를 HTML·CSS·React로 직접 구현합니다",
      body: "이젠아카데미 UX/UI 디자인 & 웹기획 프론트엔드 부트캠프를 통해감각과 소통의 경험을 실제 인터페이스로 구현하는 방법을 배웠습니다.HTML, CSS, JavaScript, React 기반의 프로젝트를 수행하며화면 구성과 사용자 흐름을 코드 구조로 설계해왔습니다.이전의 관찰과 조율 경험은 이 과정에서 사용자 중심의 UX 설계로 구체화되었습니다.",
      image: aboutImage03,
      icon: aboutIconStarRed,
      caption: "EZEN Academy · UIUX & Frontend",
    },
  ];

  /* 인디케이터 클릭 → 해당 step으로 스크롤 */
  const scrollToIndex = (index) => {
    if (isMobileLayout) {
      const track = mobileTrackRef.current;
      if (!track) return;

      track.scrollTo({
        left: track.clientWidth * index,
        behavior: "smooth",
      });

      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 980px)");
    const syncLayout = (event) => setIsMobileLayout(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncLayout);
    } else {
      mediaQuery.addListener(syncLayout);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncLayout);
      } else {
        mediaQuery.removeListener(syncLayout);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (isMobileLayout) return undefined;

    const section = sectionRef.current;
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

    const getBackgroundShift = () => {
      if (!section) return 0;
      const scrollRange = Math.max(
        section.scrollHeight - window.innerHeight,
        0,
      );
      const baseShift = window.innerHeight * 0.55;
      return Math.round(Math.min(Math.max(baseShift, scrollRange * 0.24), 620));
    };

    const bgTween =
      section &&
      gsap.to(section, {
        "--about-bg-shift": () => `-${getBackgroundShift()}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

    ScrollTrigger.refresh();

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      triggers.forEach((t) => t.kill());
      if (bgTween) bgTween.kill();
      if (swapTlRef.current) swapTlRef.current.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileLayout]);

  useEffect(() => {
    if (!isMobileLayout) return undefined;

    const track = mobileTrackRef.current;
    if (!track) return undefined;

    let frameId = 0;
    const maxIndex = blocks.length - 1;

    const syncActiveFromScroll = () => {
      if (track.clientWidth <= 0) return;
      const next = Math.round(track.scrollLeft / track.clientWidth);
      const clamped = Math.min(Math.max(next, 0), maxIndex);

      if (clamped === activeIndexRef.current) return;
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    };

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(syncActiveFromScroll);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isMobileLayout, blocks.length]);

  useEffect(() => {
    if (!isMobileLayout) return;

    const track = mobileTrackRef.current;
    if (!track) return;

    track.scrollLeft = track.clientWidth * activeIndexRef.current;
  }, [isMobileLayout]);

  const active = blocks[activeIndex];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__scrolly">
        {/* 고정 패널 */}
        <div className="about__panel" ref={isMobileLayout ? null : panelRef}>
          {isMobileLayout ? (
            <div className="about__mobile-track" ref={mobileTrackRef}>
              {blocks.map((block, i) => (
                <article className="about__mobile-slide" key={i}>
                  <div className="about__title">
                    <img src={block.icon} alt="" aria-hidden />
                    <h3>{block.title}</h3>
                  </div>

                  <div className="about__content">
                    <div className="about__body">
                      <h4 className="about__body-title">{block.bodyTitle}</h4>
                      <p className="about__body-text">{block.body}</p>
                    </div>

                    <div className="about__image">
                      <p className="about__image-caption">{block.caption}</p>
                      <img src={block.image} alt={block.altTitle} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <>
              <div className="about__title">
                <img src={active.icon} alt="" aria-hidden />
                <h3>{active.title}</h3>
              </div>

              <div className="about__content">
                <div className="about__body">
                  <h4 className="about__body-title">{active.bodyTitle}</h4>
                  <p className="about__body-text">{active.body}</p>
                </div>

                <div className="about__image">
                  <p className="about__image-caption">{active.caption}</p>
                  <img src={active.image} alt={active.altTitle} />
                </div>
              </div>
            </>
          )}

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
              />
            ))}
          </nav>
        </div>

        {!isMobileLayout && (
          <div className="about__steps" aria-hidden>
            {blocks.map((_, i) => (
              <div
                key={i}
                className="about__step"
                ref={(el) => (stepsRef.current[i] = el)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
