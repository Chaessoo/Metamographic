"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowRight, UserCheck } from "lucide-react";
import ProfileCard, { type ProfileMember } from "./ProfileCard";
import { useTranslations, useLocale } from 'next-intl';


const teamMembers: ProfileMember[] = [
  {
    name: "Revi Ardiano",
    role: "Frontend Developer",
    bio: "A creative director with a strong passion for visual storytelling, graphic design, film, and digital media. Arlecchino builds meaningful visuals that connect with people and turn static ideas into cinematic identity systems.",
    photo: "/no.jpeg",
    email: "arlecchino@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/arlecchino" },
      { label: "Portfolio", url: "https://github.com" },
    ],
    location: "Sidoarjo, Indonesia",
    education: [
      {
        school: "Institut Kesenian Jakarta",
        degree: "Bachelor of Arts in Visual Communication Design",
        years: "2018 - 2022",
      },
      {
        school: "SMA Negeri 1 Kejayan",
        degree: "Mathematics and Science",
        years: "2015 - 2018",
      },
    ],
    softSkills: [
      "Collaborative team player",
      "Fast learner and adaptable",
      "Attention to detail",
      "Visual communicator",
    ],
    technicalSkills: ["Art Direction", "Brand Systems", "Storyboarding", "Visual Design"],
    software: ["Ps", "Ai", "Canva", "Fig"],
    languages: [
      { name: "English", level: 90 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["visual storytelling", "graphic design", "film", "digital media"],
  },
  {
    name: "Usamah Hasan Zaid",
    role: "Backend Developer",
    bio: "A motion director specializing in the fluid physics of digital movement. Usamah designs transitions and animation systems that feel natural, precise, and emotionally paced for modern brand films.",
    photo: "/chatte.jpg",
    email: "usamah@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/usamah" },
      { label: "Behance", url: "https://github.com" },
    ],
    location: "Bandung, Indonesia",
    education: [
      {
        school: "Institut Teknologi Bandung",
        degree: "Bachelor of Design",
        years: "2019 - 2023",
      },
    ],
    softSkills: ["Problem solver", "Creative thinker", "Time management", "Leadership"],
    technicalSkills: ["Motion Graphics", "Animation", "Kinetic Typography", "Compositing"],
    software: ["Ae", "C4D", "Pr", "Fig"],
    languages: [
      { name: "English", level: 85 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["motion director", "digital movement", "animation systems"],
  },
  {
    name: "Yusuf Izzaturrahman",
    role: "VFX Artist",
    bio: "A VFX artist focused on particle systems, compositing, and hyper-real simulations. Yusuf bridges reality and the digital realm through seamless visual effects for cinematic campaigns.",
    photo: "/suf.jpg",
    email: "yusuf@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/yusufizzat" },
      { label: "Showreel", url: "https://github.com" },
    ],
    location: "Jember, Indonesia",
    education: [
      {
        school: "Pondok Information Technology",
        degree: "Computer Science",
        years: "2017 - 2021",
      },
    ],
    softSkills: ["Analytical thinking", "Patience", "Team collaboration", "Adaptability"],
    technicalSkills: ["Particle Simulation", "Rotoscoping", "Matchmoving", "Color Science"],
    software: ["Nuke", "Houd", "Maya", "Ae"],
    languages: [
      { name: "English", level: 80 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["VFX artist", "particle systems", "compositing", "visual effects"],
  },
  {
    name: "Roofid Rizqu",
    role: "3D Designer",
    bio: "A 3D designer crafting depth and dimension in every frame. Roofid specializes in high-fidelity modeling, lighting, procedural workflows, and rendering systems that bring concepts to life.",
    photo: "/pid.jpg",
    email: "roofid@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/roofid" },
      { label: "Artstation", url: "https://github.com" },
    ],
    location: "Yogyakarta, Indonesia",
    education: [
      {
        school: "Pondok Information Technology",
        degree: "Fine Arts",
        years: "2018 - 2022",
      },
    ],
    softSkills: ["Spatial awareness", "Creativity", "Dedication", "Self-motivated"],
    technicalSkills: ["3D Modeling", "Texturing", "Lighting", "Rendering"],
    software: ["Blend", "ZBr", "SP", "Unrl"],
    languages: [
      { name: "English", level: 75 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["3D designer", "high-fidelity modeling", "lighting", "rendering systems"],
  },
  {
    name: "Raka Adrel",
    role: "Video Editor",
    bio: "A video editor who treats pacing and narrative as the core of every cut. Raka transforms raw footage into compelling stories with rhythm, clarity, and cinematic momentum.",
    photo: "/raka.jpg",
    email: "raka@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/rakaadrel" },
      { label: "YouTube", url: "https://github.com" },
    ],
    location: "Bali, Indonesia",
    education: [
      {
        school: "Jakarta Institute of Arts",
        degree: "Film and Television",
        years: "2016 - 2020",
      },
    ],
    softSkills: ["Storytelling", "Rhythm and pacing", "Communication", "Work under pressure"],
    technicalSkills: ["Offline Editing", "Online Editing", "Sound Design", "Color Grading"],
    software: ["Pr", "Resolve", "FCPX", "Au"],
    languages: [
      { name: "English", level: 85 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["pacing", "narrative", "compelling stories", "cinematic momentum"],
  },
  {
    name: "Marcelino",
    role: "Compositor",
    bio: "A compositor focused on the final touch of perfection. Marcelino excels at color grading, keying, tracking, and multi-layer integration so every pixel supports the overall vision.",
    photo: "/acel.jpg",
    email: "marcelino@metamographic.studio",
    social: [
      { label: "Instagram", url: "https://instagram.com/marcel" },
      { label: "Showreel", url: "https://github.com" },
    ],
    location: "Jakarta, Indonesia",
    education: [
      {
        school: "Universitas Hangtuah Bali",
        degree: "Film and Animation",
        years: "2019 - 2023",
      },
    ],
    softSkills: ["Critical observation", "Efficiency", "Team player", "Technical troubleshooting"],
    technicalSkills: ["Compositing", "Color Grading", "Keying", "Tracking"],
    software: ["Nuke", "Resolve", "Ae", "Mocha"],
    languages: [
      { name: "English", level: 80 },
      { name: "Indonesian", level: 100 },
    ],
    highlights: ["compositor", "color grading", "keying", "tracking"],
  },
];

const TEAM_AUTO_SPEED = -0.09;
const TEAM_DRAG_SENSITIVITY = 0.13;
const TEAM_VELOCITY_SENSITIVITY = 0.075;

export default function TeamSection() {
  const t = useTranslations('team');
  const [selectedMember, setSelectedMember] = useState<ProfileMember | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef({
    dragged: false,
    dragging: false,
    lastX: 0,
    pointerId: -1,
    rotation: -14,
    startX: 0,
    velocity: TEAM_AUTO_SPEED,
  });

  useEffect(() => {
    let frameId = 0;
    const interaction = interactionRef.current;

    const spin = () => {
      if (!interaction.dragging) {
        interaction.rotation += interaction.velocity;
        interaction.velocity =
          interaction.velocity * 0.965 + TEAM_AUTO_SPEED * 0.035;
      }

      ringRef.current?.style.setProperty(
        "--team-rotation",
        `${interaction.rotation}deg`,
      );
      frameId = window.requestAnimationFrame(spin);
    };

    spin();

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    interaction.dragged = false;
    interaction.dragging = true;
    interaction.lastX = event.clientX;
    interaction.pointerId = event.pointerId;
    interaction.startX = event.clientX;
    interaction.velocity = 0;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (!interaction.dragging || interaction.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - interaction.lastX;
    interaction.lastX = event.clientX;
    interaction.rotation += deltaX * TEAM_DRAG_SENSITIVITY;
    interaction.velocity = deltaX * TEAM_VELOCITY_SENSITIVITY;
    interaction.dragged =
      interaction.dragged || Math.abs(event.clientX - interaction.startX) > 6;

    if (
      interaction.dragged &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (interaction.pointerId !== event.pointerId) return;

    interaction.dragging = false;
    interaction.pointerId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleCardClick = (member: ProfileMember) => {
    if (interactionRef.current.dragged) {
      interactionRef.current.dragged = false;
      return;
    }

    setSelectedMember(member);
  };

  return (
    <section id="team" className="team-marquee-section">
      <svg
        aria-hidden="true"
        className="team-deco-svg"
        fill="none"
        height="154"
        viewBox="0 0 460 154"
        width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_team)">
          <path
            d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="40"
          />
        </g>
        <defs>
          <clipPath id="clip0_team">
            <rect fill="white" height="154" width="460" />
          </clipPath>
        </defs>
      </svg>

      <div className="team-marquee-inner">
        <div className="team-marquee-header">
          <div className="team-marquee-icon">
            <UserCheck size={24} />
          </div>

          <h2 className="team-marquee-title">
            {t("marquee-title")} <span className="gradient-text">{t("marquee-title2")}</span>
            <svg
              aria-hidden="true"
              className="team-marquee-title-deco"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>
          <p className="team-marquee-subtitle">
            {t('team-marquee-subtitle')}
          </p>
        </div>

        <div
          className="team-marquee-track"
          onPointerCancel={handlePointerUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="team-marquee-fade-left" />
          <div className="team-marquee-fade-right" />

          <div className="team-carousel-stage">
            <div
              className="team-carousel-ring"
              ref={ringRef}
              style={
                {
                  "--team-rotation": "-14deg",
                } as CSSProperties
              }
            >
              {teamMembers.map((member, index) => (
                <button
                  aria-label={`See profile for ${member.name}`}
                  className="team-marquee-card"
                  key={member.name}
                  onClick={() => handleCardClick(member)}
                  style={
                    {
                      "--team-angle": `${(360 / teamMembers.length) * index}deg`,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <div className="team-marquee-img-wrap">
                    <Image
                      alt={member.name}
                      className="team-marquee-img"
                      fill
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 330px"
                      src={member.photo}
                    />
                    <div className="team-card-shade" />
                    <div className="team-profile-hover">
                      <span>See Profile</span>
                      <ArrowRight size={12} />
                    </div>
                    <div className="team-marquee-label">
                      <h3 className="team-marquee-name">{member.name}</h3>
                      <p className="team-marquee-role">{member.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedMember ? createPortal(
        <ProfileCard
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />,
        document.body,
      ) : null}
    </section>
  );
}
