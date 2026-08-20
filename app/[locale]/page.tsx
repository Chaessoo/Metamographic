"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Faq from "@/components/ui/faq";
import { Typewriter } from "@/components/ui/typewriter";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import TeamSection from "@/components/ui/team";
import {
  Film,
  Layers,
  Scissors,
  Palette,
  Code,
  Mail,
  MapPin,
  Phone,
  Play,
  X,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

/*
  ──────────────────────────────────────────
  3-D Logo
  ──────────────────────────────────────────
*/
const MetamographicLogo3D = dynamic(
  () => import("@/components/ui/MetamographicLogo3D"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          width: "min(400px, 100%)",
          height: "clamp(220px, 30vw, 340px)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png"
          alt=""
          style={{ width: 120, opacity: 0.35, filter: "blur(2px)" }}
        />
      </div>
    ),
  },
);

const LOGO_SRC = "/logo.png";

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

function Navbar({
  scrolled,
  onContact,
}: {
  scrolled: boolean;
  onContact: () => void;
}) {
  const t = useTranslations('nav'); // ← tambah ini
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const switchLocale = (newLocale: string) => {
  const newPath = pathname.replace(/^\/(id|en)/, `/${newLocale}`);
  router.push(newPath);
};
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <img
        src={LOGO_SRC}
        alt="Metamographic"
        style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <ul className="nav-links">
        {(
          [
            [t('home'), "hero"],       // ← ganti hardcode jadi t(...)
            [t('works'), "works"],
            [t('service'), "service"],
            [t('about'), "philosophy"],
            [t('contact'), "contact"],
          ] as [string, string][]
        ).map(([label, id]) => (
          <li key={label}>
            <a className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
     <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
  <button
    onClick={() => switchLocale('id')}
    style={{ opacity: locale === 'id' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
  >
    <img src="https://flagcdn.com/w40/id.png" alt="ID" width={28} height={20} style={{ display: 'block', borderRadius: 3 }} />
  </button>
  <button
    onClick={() => switchLocale('en')}
    style={{ opacity: locale === 'en' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
  >
    <img src="https://flagcdn.com/w40/us.png" alt="EN" width={28} height={20} style={{ display: 'block', borderRadius: 3 }} />
  </button>
</div>
      <button className="cta-btn" onClick={onContact}>
        Let&apos;s Create
      </button>
    </nav>
  );
}

function Hero({ onContact }: { onContact: () => void }) {
  const t = useTranslations('hero');
  return (
    <div className="hero-section" id="hero" style={{position:"relative"}}>

       <Image className="bubble1"
    src="/21.webp"
    alt=""
    width={450}
    height={450}
    style={{
      position: "absolute",
      top: "-180px",
      left: "-190px",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
      opacity: "0.5",
      filter:"blur(10px)"
    }}
    priority
  />

   <Image className="bubble2"
    src="/80.webp"
    alt=""
    width={300}
    height={300}
    style={{
      position: "absolute",
      top: "0.2%",
      right: "-120px",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
      opacity: "0.5",
      filter:"blur(5px)"
    }}
  />

      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1300,
          margin: "0 auto",
          width: "100%",   
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div className="hero-badge">
            <Sparkles size={12} style={{ color: "#A78BFA" }} />
            ✦ {t('badge')}
          </div>

          <h1 className="hero-title">
            <span className="hero-t1">
              METAMOGRAPHIC
            </span>
          </h1>

          <p className="hero-body">
           {t('body')}
          </p>

          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
               {t('btnWork')}{" "}
              <ArrowRight
                size={16}
                style={{
                  marginLeft: 6,
                  display: "inline",
                  verticalAlign: "middle",
                }}
              />
            </button>
            
          </div>
        </div>

        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="hero-logo-3d-wrapper"
        >
          {/* <MetamographicLogo3D /> */}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: 0.4,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(transparent, rgba(139,92,246,0.8))",
            borderRadius: 50,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   WORKS / PORTFOLIO
───────────────────────────────────────── */
type VideoItem = {
  id: number;
  title: string;
  category: "Long Shoot" | "Short Shoot";
  thumb: string;
  url: string;
};

const INITIAL_VIDEOS: VideoItem[] = [
  { 
    id: 1, 
    title: "Neon City Intro", 
    category: "Long Shoot", 
    thumb: "neon_city_intro_thumb_1776738298260.png",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example embed
  },
  { 
    id: 2, 
    title: "Brand Identity Reel", 
    category: "Short Shoot", 
    thumb: "brand_identity_thumb_1776738470444.png",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
  { 
    id: 3, 
    title: "Kinetic Typography Vol.1", 
    category: "Long Shoot", 
    thumb: "kinetic_typography_thumb_1776738789943.png",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
  { 
    id: 4, 
    title: "Product Launch VFX", 
    category: "Short Shoot", 
    thumb: "neon_city_intro_thumb_1776738298260.png", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
  { 
    id: 5, 
    title: "3D Logo Animation", 
    category: "Long Shoot", 
    thumb: "brand_identity_thumb_1776738470444.png", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
  { 
    id: 6, 
    title: "Cinematic Showreel", 
    category: "Short Shoot", 
    thumb: "kinetic_typography_thumb_1776738789943.png", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
];

function Works() {
  const t = useTranslations('portofolio');
  const [ref, visible] = useInView();
  const [filter, setFilter] = useState<"All" | "Long Shoot" | "Short Shoot">(
    "All"
  );
  const [videos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const filterValues = ["All", "Long Shoot", "Short Shoot"] as const;
  type FilterType = typeof filterValues[number];
  const filterLabels: Record<FilterType, string> = {
  "All": t('all'),
  "Long Shoot": t('longshoot'),
  "Short Shoot": t('shortshoot'),
};
  const filtered =
    filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <section
      className="works-section"
      id="works"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ paddingTop: "7rem" }}
    >
      <Image className="bubble4"
    src="/21.webp"
    alt=""
    width={350}
    height={350}
    style={{
      position: "absolute",
      bottom: "-110px",
      right:"-120px",
      zIndex: 0,
      pointerEvents: "none",
      userSelect: "none",
      opacity: "0.5",
      filter: "blur(4px)"
    }}
  />

    <Image className="cloud"
    src="/cloud_2.webp"
    alt=""
    width={999}
    height={350}
    style={{
      position:"absolute",
      bottom:"-140px",
      left:"5px",
      zIndex:"0",
      opacity:"0.85",
      userSelect:"none"
    }}
    />
    <Image className="cloud"
    src="/cloud_2.webp"
    alt=""
    width={990}
    height={350}
    style={{
      position:"absolute",
      bottom:"-140px",
      right:"5px",
      zIndex:"0",
      opacity:"0.85",
      userSelect:"none",
    }}
    />

  <Image className="cloud cloud-left"
  src="/cloud.webp"
  alt=""
  width={600}
  height={420}
  style={{
    position: "absolute",
    bottom: "-140px",
    left: "-100px",
    zIndex: 0,
    opacity: 0.85,
    userSelect: "none",
  }}
/>

<Image
  className="cloud cloud-right"
  src="/cloud.webp"
  alt=""
  width={600}
  height={420}
  style={{
    position: "absolute",
    bottom: "-140px",
    right: "-100px",
    zIndex: 0,
    opacity: 0.85,
    userSelect: "none",
  }}
/>

      <div className={`fade-up ${visible ? "visible" : ""}`}>
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">
          {t('heading1')} <span className="gradient-text">{t('heading2')}</span>
        </h2>
      </div>

      <div  className="section-text">
        <p>
          {t('section-text')}
        </p>
      </div>

      <div
  className={`filter-tabs fade-up ${visible ? "visible" : ""}`}
  style={{ transitionDelay: "0.15s" }}
>
  {filterValues.map((f) => (
    <button
      key={f}
      className={`filter-tab${filter === f ? " active" : ""}`}
      onClick={() => setFilter(f)}
    >
      {filterLabels[f]}
    </button>
  ))}
</div>

      <div className="video-grid">
        {filtered.map((v, i) => (
          <div
            key={v.id}
            className={`fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="video-card group" onClick={() => setActiveVideo(v)}>
              <div className="video-thumb">
                <img 
                  src={v.thumb} 
                  alt={v.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  className="group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="play-icon">
                    <div className="pulse-ring" />
                    <Play size={20} fill="#fff" color="#fff" />
                  </div>
                </div>
              </div>
              <div className="video-info">
                <div className="video-title">{v.title}</div>
                <div className="video-cat">{v.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="modal-overlay" 
          onClick={() => setActiveVideo(null)}
          style={{ padding: '4rem 2rem' }}
        >
          <div 
            className="modal-card" 
            style={{ maxWidth: '1000px', width: '100%', padding: 0, overflow: 'hidden', background: '#000' }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="modal-close" 
              onClick={() => setActiveVideo(null)}
              style={{ top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.5)' }}
            >
              <X size={20} />
            </button>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={activeVideo.url}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--bg2)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>{activeVideo.title}</h3>
                    <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600 }}>{activeVideo.category}</p>
                  </div>
                  <a 
                    href={activeVideo.url.replace('embed/', 'watch?v=')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Open Link <ExternalLink size={14} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Services() {
  const [ref, visible] = useInView();
  const t = useTranslations('services')

  const cards = [
    {
      num: "01",
      icon: <Film size={22} />,
      name: "2D/3D Motion Design",
      body: t('bdy1'),
    },
    {
      num: "02",
      icon: <Layers size={22} />,
      name: "Visual Effects (VFX)",
      body:t('bdy2'),
    },
    {
      num: "03",
      icon: <Scissors size={22} />,
      name: "Advanced Video Editing",
      body: t('bdy3'),
    },
    {
      num: "04",
      icon: <Palette size={22} />,
      name: "UI/UX Designer",
      body: t('bdy4'),
    },
    {
      num: "05",
      icon: <Code size={22} />,
      name: "Backend Developer",
      body: t('bdy5'),
    },
    {
      num: "06",
      icon: <Code size={22} />,
      name: "Frontend Developer",
      body: t('bdy6'),
    },
  ];

  return (
    <section id="service" ref={ref as React.RefObject<HTMLElement>}>
      <div
        className={`fade-up ${visible ? "visible" : ""}`}
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <div className="section-label">{t('label')}</div>
        <h2 className="section-title">
          {t('title')} <span className="gradient-text">{t('title2')}</span>
        </h2>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(24px,4vw,35px)",
            fontWeight: 800,
            marginBottom: "1rem",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin:"0 auto 0.5rem auto"
          }}
        >
          Motion Graphics <span className="font-latin" style={{ fontWeight: 400, textTransform: 'none', marginLeft: '0.1em', fontSize: '1.2em' }}></span>
          <br />
          <span>
            &amp; <span>Creative</span> Editing
          </span>
        </h3>
        <p
          style={{
            color: "rgb(248, 250, 252)",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
            fontFamily: "var(--font-heading)",
          }}
        >
          {t('text')}
        </p>
      </div>

      <div className="service-cards">
        {cards.map((c, i) => (
          <div
            key={c.num}
            className={`service-card fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="service-num">{c.num}</div>
            <div className="service-icon">{c.icon}</div>
            <div className="service-name">{c.name}</div>
            <div className="service-body">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  const [ref, visible] = useInView(0.2);
  const t = useTranslations('philosophy');
  const words = t.raw('words') as string[];

  return (
    <div className="philosophy-wrap section-full" id="philosophy">
      <div className="philosophy-bg" />
      <div className="philosophy-vert">{t("philotext")}</div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="philosophy-quote">
            <Typewriter
              words={words}
              speed={55}
              delayBetweenWords={2800}
              cursor={true}
              cursorChar="|"
            />
          </p>
        </div>
        <p
          className={`philosophy-body fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          {t('t1')}
        </p>
      </div>
    </div>
  );
}

function Contact() {
  const [ref, visible] = useInView();
  const t = useTranslations('contact');
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="contact-wrap" id="contact">
      <div
        className="contact-grid"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <div className="section-label">{t('label')}</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(40px,6vw,72px)" }}
          >
            {t('section-title')}
            <br />
            <span className="gradient-text">{t("something-epic")}</span>
          </h2>

          <div className="contact-info-item">
            <div className="contact-icon">
              <Mail size={18} />
            </div>
            <span>hello@metamographic.studio</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon">
              <MapPin size={18} />
            </div>
            <span>{t('loc')}</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon">
              <Phone size={18} />
            </div>
            <span>+62 812 3456 7890</span>
          </div>

          <div className="social-row">
            <button className="social-btn" aria-label="Instagram">
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.5"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </button>
            <button className="social-btn" aria-label="YouTube">
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon
                  points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </button>
            <button
              className="social-btn"
              aria-label="Behance"
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              Be
            </button>
          </div>
        </div>

        <div
          className={`fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="contact-form-card">
            {success ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                <CheckCircle
                  size={56}
                  color="#22D3EE"
                  className="check-anim"
                  style={{ display: "block", margin: "0 auto 1rem" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("message-sent")}
                </h3>
                <p style={{ color: "rgba(248,250,252,0.5)" }}>
                  {t('notif')}
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label">{t('form-label-name')}</label>
                    <input
                      className="form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('service')}</label>
                  <select
                    className="form-input"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                  >
                    <option value="">{t('service-selection')}</option>
                    <option>Motion Design</option>
                    <option>VFX & Compositing</option>
                    <option>Video Editing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('messages')}</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                <button
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? <span className="spinner" /> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <img src={LOGO_SRC} alt="Metamographic" style={{ height: 30, opacity: 0.5 }} />
        <div className="footer-nav">
          <a className="footer-link">Privacy</a>
          <a className="footer-link">Terms</a>
          <a className="footer-link">Contact</a>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} METAMOGRAPHIC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 50;
      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main style={{ background: "var(--bg)" }}>
      <div className="grain-overlay" />
      <Navbar scrolled={scrolled} onContact={onContact} />
      <Hero onContact={onContact} />
      <Works />
      <Services />
      <Philosophy />
      <TeamSection />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
