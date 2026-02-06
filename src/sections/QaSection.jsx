import { useState } from "react";
import "./QaSection.css";
import aboutIconWhite from "../assets/images/about-icon-star-white.svg";

const QA_ITEMS = [
  {
    id: "q1",
    question: "왜 당신의 프로젝트는 설명이 많은가요?",
    answer: [
      "저는 결과보다, 그 결과가 만들어진 과정을 중요하게 봅니다.",
      "사용자는 화면을 보지만, 설계자는 맥락을 봐야 한다고 생각합니다.",
    ],
  },
  {
    id: "q2",
    question: "파인아트 전공이 UX에 실제로 도움이 되나요?",
    answer: [
      "미술은 답을 만드는 훈련이 아니라,",
      "왜 그렇게 보이는지를 질문하는 훈련이었다고 생각합니다.",
      "그 질문 방식이 UX에서도 그대로 이어졌습니다.",
    ],
  },
  {
    id: "q3",
    question: "클론 코딩을 왜 했나요?",
    answer: [
      "그대로 만드는 것이 목적이 아니라,",
      "이미 잘 작동하는 구조를 분해하고 이해하기 위함이었습니다.",
      "이해한 뒤에야, 다른 선택을 할 수 있다고 생각합니다.",
    ],
  },
  {
    id: "q4",
    question: "디자인에서 가장 중요하게 보는 기준은 무엇인가요?",
    answer: ["사용이 끝난 뒤에도,", "이해와 감정이 남는지 여부입니다."],
  },
  {
    id: "q5",
    question: "협업에서 당신의 역할은 무엇인가요?",
    answer: [
      "의견을 밀기보다,",
      "서로 다른 언어를 같은 방향으로 정리하는 역할을 자주 맡았습니다.",
    ],
  },
  {
    id: "q6",
    question: "왜 함께 일해야 하나요?",
    answer: [
      "저는 문제를 빠르게 덮기보다,",
      "왜 이런 문제가 생겼는지를 끝까지 보려고 합니다.",
      "그 태도가 프로젝트의 방향을 안정시킨다고 믿습니다.",
    ],
  },
];

function QaSection() {
  const [openId, setOpenId] = useState("q1");

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="qa-section section" id="qa">
      <div className="qa-section__inner">
        <div className="qa-section__header">
          <img
            className="qa-section__star qa-section__star--top"
            src={aboutIconWhite}
            alt=""
            aria-hidden
          />
          <h2 className="qa-section__title">
            Q &amp; A
            <img
              className="qa-section__star qa-section__star--inline"
              src={aboutIconWhite}
              alt=""
              aria-hidden
            />
          </h2>
          <p className="qa-section__subtitle">
            Questions that reveal how I decide.
          </p>
        </div>

        <div className="qa-list">
          {QA_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                className={`qa-item${isOpen ? " qa-item--open" : ""}`}
                key={item.id}
              >
                <button
                  className="qa-item__question"
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="qa-item__dot" aria-hidden="true" />
                  <span className="qa-item__label">
                    Q{index + 1}. {item.question}
                  </span>
                </button>
                <div className="qa-item__answer" aria-hidden={!isOpen}>
                  <div className="qa-item__answer-inner">
                    <span className="qa-item__answer-label">A.</span>
                    <div className="qa-item__answer-text">
                      {item.answer.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QaSection;
