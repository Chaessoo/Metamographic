"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';


// FAQ data for a premium motion graphics studio
const FAQ_ITEMS = [
  {
    id: 1,
    question: "How long does a typical project take?",
    answer:
      "Production timelines vary depending on the complexity of the project. A short motion graphics piece around 15 to 30 seconds usually takes 7 to 14 working days, while projects with heavier VFX or 3D animation can take 3 to 6 weeks. We always provide a clear production timeline at the beginning of the collaboration.",
  },
  {
    id: 2,
    question: "Can I request revisions?",
    answer:
      "Absolutely. Every project includes 2 to 3 revision rounds based on the agreement made at the start. We prioritize client satisfaction, so the revision process stays collaborative until the final result matches your expectations.",
  },
  {
    id: 3,
    question: "What makes Metamographic different from other studios?",
    answer:
      "We combine a cinematic approach with technical precision. Every frame is designed with intention, not just animated for movement. Supported by an experienced creative team and studio-grade hardware, we produce visuals with a refined cinematic quality that is difficult to match.",
  },
  {
    id: 4,
    question: "How do I start a project with Metamographic?",
    answer:
      "Simply click the 'Start Project' button or reach out through the contact form. We will schedule a free discovery session to understand your needs, then send a proposal with pricing and timeline details. Once everything is approved, our team gets to work right away.",
  },
];

// useInView hook
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

export default function Faq() {
  const t = useTranslations('faq');
  const [openId, setOpenId] = useState<number | null>(null);
  const [sectionRef, sectionVisible] = useInView();

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`faq-section fade-up ${sectionVisible ? "visible" : ""}`}
      id="faq"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background orbs for premium visual accents */}
      <div className="orb orb1" style={{ opacity: 0.3, filter: "blur(120px)" }} />
      <div className="orb orb2" style={{ opacity: 0.2, filter: "blur(140px)" }} />

      <div className="faq-container">
        {/* Header with scroll reveal */}
        <div className="faq-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">
            {t('t1')}{" "}
            <span className="font-latin gradient-text">{t("t2")}</span>
          </h2>
          <p className="faq-subtitle">
            {t("subt")}
          </p>
        </div>

        {/* Accordion list */}
        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="faq-item"
                style={{ transitionDelay: `${idx * 0.07}s` }}
              >
                <button
                  type="button"
                  className={`faq-question-btn ${isOpen ? "open" : ""}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <Plus
                    size={20}
                    className={`faq-icon ${isOpen ? "rotated" : ""}`}
                    strokeWidth={1.8}
                  />
                </button>

                <div className={`faq-answer-wrapper ${isOpen ? "expanded" : ""}`}>
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA block linked to contact */}
        <div className="faq-cta" style={{ transitionDelay: "0.25s" }}>
          <div className="faq-cta-glow" />
          <h3 className="faq-cta-title">{t('t3')} </h3>
          <p className="faq-cta-text">
            {t('t4')}
          </p>
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t('t5')}
          </button>
        </div>
      </div>
    </section>
  );
}
