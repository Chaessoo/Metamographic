"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalLink, Mail, MapPin, X } from "lucide-react";

export type ProfileMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string;
  social: Array<{
    label: string;
    url: string;
  }>;
  location: string;
  education: Array<{
    school: string;
    degree: string;
    years: string;
  }>;
  softSkills: string[];
  technicalSkills: string[];
  software: {name : string; logo : string} [];
  languages: Array<{
    name: string;
    level: number;
  }>;
  highlights?: string[];
};

type ProfileCardProps = {
  member: ProfileMember;
  onClose: () => void;
};

function ProfileText({ text, highlights = [] }: { text: string; highlights?: string[] }) {
  if (!highlights.length) return <>{text}</>;

  const escaped = highlights.map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return (
    <>
      {text.split(pattern).map((part, index) => {
        const marked = highlights.some(
          (phrase) => phrase.toLowerCase() === part.toLowerCase(),
        );

        return marked ? (
          <mark key={`${part}-${index}`}>{part}</mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}

function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="profile-bullet-row">
      <span aria-hidden="true">{"\u2733"}</span>
      <p>{children}</p>
    </li>
  );
}

export default function ProfileCard({ member, onClose }: ProfileCardProps) {
  return (
    <div
      aria-modal="true"
      className="profile-modal-shell"
      onClick={onClose}
      role="dialog"
    >
      <div className="profile-modal-backdrop" />

      <article
        aria-label={`${member.name} profile`}
        className="profile-resume"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="profile-stars" aria-hidden="true">
          <span>{"\u2726"}</span>
          <span>{"\u2727"}</span>
          <span>{"\u2726"}</span>
        </div>

        <div className="profile-binder" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="profile-binder-hole" key={index}>
              <span />
            </div>
          ))}
        </div>

        <button
          aria-label="Close profile"
          className="profile-close"
          onClick={onClose}
          type="button"
        >
          <X size={20} />
        </button>

        <div className="profile-resume-scroll">
          <div className="profile-resume-grid">
            <div className="profile-main-column">
              <header className="profile-header">
                <h2>
                  <mark>{member.name}</mark>
                </h2>
                <p>{member.role}</p>
              </header>

              <section className="profile-section">
                <p className="profile-about-text">
                  <ProfileText text={member.bio} highlights={member.highlights} />
                </p>
              </section>

              <div className="profile-contact-strip">
                <span>
                  <Mail size={15} />
                  {member.email}
                </span>
                <span>
                  <MapPin size={15} />
                  {member.location}
                </span>
                {member.social.map((item) => (
                  <a href={item.url} key={item.label} rel="noreferrer" target="_blank">
                    <ExternalLink size={15} />
                    {item.label}
                  </a>
                ))}
              </div>

              <section className="profile-section">
                <h3>Education</h3>
                <ul className="profile-skill-list">
                  {member.education.map((item) => (
                    <BulletItem key={`${item.school}-${item.years}`}>
                      <strong>{item.school}</strong>
                      <br />
                      {item.degree}
                      <br />
                      <small>{item.years}</small>
                    </BulletItem>
                  ))}
                </ul>
              </section>

              <section className="profile-section">
                <h3>Technical Skills</h3>
                <ul className="profile-skill-list">
                  {member.technicalSkills.map((skill) => (
                    <BulletItem key={skill}>{skill}</BulletItem>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="profile-side-column">
              <div className="profile-polaroid">
                <div className="profile-star-pin" aria-hidden="true">
                  <span>{"\u2726"}</span>
                </div>
                <div className="profile-polaroid-image">
                  <Image
                    alt={member.name}
                    className="profile-image"
                    fill
                    sizes="(max-width: 768px) 76vw, 330px"
                    src={member.photo}
                  />
                </div>
              </div>

              <section className="profile-section profile-compact-section">
                <h3>Soft Skills</h3>
                <ul className="profile-skill-list">
                  {member.softSkills.map((skill) => (
                    <BulletItem key={skill}>{skill}</BulletItem>
                  ))}
                </ul>
              </section>

              <section className="profile-section profile-compact-section">
             <h3>Software</h3>
              <div className="profile-software-grid">
              {member.software.map((item) => (
              <div key={item.name} className="software-logo-item" title={item.name}>
          <img
          src={item.logo}
          alt={item.name}
          style={{ width: 28, height: 28, objectFit: "contain" }}
        />
      </div>
    ))}
  </div>
</section>

              <section className="profile-section profile-compact-section">
                <h3>Language</h3>
                <div className="profile-language-list">
                  {member.languages.map((language) => (
                    <div className="profile-language-row" key={language.name}>
                      <span>{language.name}</span>
                      <div>
                        <i style={{ width: `${language.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
