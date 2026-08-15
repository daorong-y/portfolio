import { useEffect, useState } from "react";
import { disableAnalytics, loadAnalytics, trackEvent } from "./analytics";

const publications = [
  {
    year: "2026",
    type: "Research article",
    title:
      "Three-dimensional printing of continuous carbon fibre reinforced silicon carbide ceramic matrix composites",
    authors: "Daorong Ye and Jon Binner",
    venue: "npj Advanced Manufacturing",
    href: "https://doi.org/10.1038/s44334-026-00090-z",
    accent: "carbon",
  },
  {
    year: "2026",
    type: "Industry feature",
    title: "Adding to the mix",
    authors: "Jon Binner and Dolly Ye",
    venue: "Materials World, IOM3",
    href: "https://www.iom3.org/resource/adding-to-the-mix.html",
    accent: "clay",
  },
  {
    year: "2023",
    type: "Review article",
    title: "A review on additive manufacturing of ceramic matrix composites",
    authors: "Jinxing Sun, Daorong Ye, Ji Zou, et al.",
    venue: "Journal of Materials Science & Technology, 138, 1-16",
    href: "https://doi.org/10.1016/j.jmst.2022.06.039",
    accent: "mineral",
  },
];

const conferences = [
  {
    year: "2026",
    event: "Advanced Materials Show and the Advanced Ceramics Show",
    presentation: "Poster Presenter",
    location: "National Exhibition Centre, UK",
  },
  {
    year: "2026",
    event: "2nd Ceramic AM Summit",
    presentation: "Oral Presenter",
    location: "Freiburg, Germany",
  },
  {
    year: "2025",
    event: "Young Ceramists Additive Manufacturing Forum",
    presentation: "Poster Presenter",
    location: "Toulouse, France",
  },
  {
    year: "2025",
    event: "1 Day Research Meeting on Advanced Ceramics",
    presentation: "Invited Speaker",
    location: "Manufacturing Technology Centre, UK",
  },
  {
    year: "2023",
    event: "11th International Conference on High Temperature Ceramic Matrix Composites",
    presentation: "Oral Presenter",
    location: "Jeju, South Korea",
  },
  {
    year: "2023",
    event: "47th International Conference & Exposition on Advanced Ceramics and Composites",
    presentation: "Speech Contributor",
    location: "Daytona Beach, USA",
  },
  {
    year: "2022",
    event: "Composite Technology Forum for UK Defence",
    presentation: "Invited Speaker",
    location: "National Composite Centre, UK",
  },
  {
    year: "2022",
    event: "Young Ceramists Additive Manufacturing Forum",
    presentation: "Poster Presenter",
    location: "Barcelona, Spain",
  },
  {
    year: "2022",
    event: "17th ECerS Conference",
    presentation: "Poster Presenter",
    location: "Krakow, Poland",
  },
];

const news = [
  {
    date: "July 2026",
    content: (
      <>
        Won first place in Product Innovation at the{" "}
        <a
          className="supervisor-link"
          href="https://micg.org.uk/winners-announced-in-alan-mclelland-poster-competition/"
          target="_blank"
          rel="noreferrer"
        >
          Alan McLelland Poster Competition
        </a>
        . Organised industry engagement for the Advanced Ceramics Group at The Advanced Ceramics
        Show, NEC Birmingham.
      </>
    ),
  },
  {
    date: "June 2026",
    content: (
      <>
        Received grant from{" "}
        <a className="supervisor-link" href="https://www.dkg.de/en" target="_blank" rel="noreferrer">
          DKG
        </a>
        ,{" "}
        <a className="supervisor-link" href="https://3dceram.com/" target="_blank" rel="noreferrer">
          3DCeram
        </a>{" "}
        and the{" "}
        <a className="supervisor-link" href="https://www.jecstrust.org/" target="_blank" rel="noreferrer">
          JECS Trust
        </a>
        .
      </>
    ),
  },
  {
    date: "April 2025",
    content:
      "Chaired the Hybrid and Emerging Technologies symposium at the European Ceramic Society Additive Manufacturing Forum in France.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9v9M6 6.5v.1M10 18v-5.2c0-2.4 4-2.6 4 0V18M10 9v9M18 18v-5.8c0-4.6-4.8-4.4-8-2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.2 6-12a6 6 0 1 0-12 0c0 6.8 6 12 6 12Z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

function ConservationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 4C12 4 6 8 6 14c0 3 2 5 5 5 6 0 8-7 8-15Z" />
      <path d="M5 20c2-5 6-8 11-11" />
    </svg>
  );
}

function CollaborationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <path d="m7 8.5 3 2.5M17 8.5 14 11M12 15v4M9 20h6" />
    </svg>
  );
}

function SportsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8v4c0 4-2 6-4 6s-4-2-4-6V4Z" />
      <path d="M8 6H5v2c0 2 1.5 3.5 3.5 3.5M16 6h3v2c0 2-1.5 3.5-3.5 3.5M12 14v4M8 20h8" />
    </svg>
  );
}

export default function Home() {
  const [analyticsConsent, setAnalyticsConsent] = useState<"granted" | "denied" | null>(() => {
    const storedConsent = window.localStorage.getItem("analytics-consent");
    return storedConsent === "granted" || storedConsent === "denied" ? storedConsent : null;
  });

  useEffect(() => {
    if (analyticsConsent !== "granted") return;

    loadAnalytics();

    const viewedSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id.replaceAll("-", "_");
          if (entry.isIntersecting && !viewedSections.has(sectionId)) {
            viewedSections.add(sectionId);
            trackEvent(`section_view_${sectionId}`);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [analyticsConsent]);

  function chooseAnalyticsConsent(consent: "granted" | "denied") {
    window.localStorage.setItem("analytics-consent", consent);
    setAnalyticsConsent(consent);
    if (consent === "denied") disableAnalytics();
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="mobile-header">
        <a className="mobile-brand" href="#top" aria-label="Daorong Ye home">
          Daorong Ye&apos;s Research Portfolio
        </a>
        <nav aria-label="Site navigation">
          <a href="#news">Activities</a>
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#conferences">Conference presentations</a>
          <a href="#experience">CV</a>
          <a href="#about-me">About me</a>
        </nav>
      </header>

      <aside className="profile-rail" aria-label="Profile">
        <a className="portrait-mark" href="#top" aria-label="Daorong Ye home">
          <img
            src="/portfolio/profile-daorong-ye.jpg"
            alt="Portrait of Daorong Ye"
            width="800"
            height="1000"
            decoding="async"
          />
        </a>

        <div className="profile-copy">
          <p className="eyebrow">Materials researcher</p>
          <h1>Daorong Ye</h1>
          <p className="role">PhD researcher in advanced ceramics and additive manufacturing</p>
          <p className="location">
            <LocationIcon />
            <span>Birmingham, United Kingdom</span>
          </p>
        </div>

        <div className="profile-links">
          <a
            href="mailto:dollyyebham@gmail.com"
            onClick={() => trackEvent("email_click", { link_location: "profile" })}
          >
            <MailIcon />
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/daorong-ye-dolly"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#news">News</a>
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#conferences">Conference presentations</a>
          <a href="#experience">Experience</a>
          <a href="#about-me">About me</a>
          <a href="#contact">Contact</a>
        </nav>

        <p className="rail-note">Open to research and industrial collaboration.</p>
      </aside>

      <main id="main-content" className="content" tabIndex={-1}>
        <section id="top" className="hero section-pad">
          <div className="hero-kicker" aria-label="Research approach">
            <span>Materials research</span>
            <span>Scientific inquiry</span>
            <span>Technology translation</span>
          </div>
          <h2>
            Researching high-performance composites
            <span> from material behaviour to future applications.</span>
          </h2>
          <p className="hero-lede">
            My work combines ceramic science, additive manufacturing and technology development
            to investigate complex material systems, generate evidence and identify practical
            routes towards industrial impact.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#publications">
              View publications <ArrowIcon />
            </a>
            <a
              className="button text-button"
              href="#contact"
              onClick={() => trackEvent("schedule_discussion_click")}
            >
              schedule a chat
            </a>
          </div>

          <div className="metrics" aria-label="Selected research metrics">
            <div>
              <strong>2</strong>
              <span>Bespoke AM systems commissioned</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Industrial development partners</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Interns trained and mentored</span>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">01</p>
            <div>
              <p className="eyebrow">About</p>
              <h2>Research grounded in making.</h2>
            </div>
          </div>
          <div className="about-grid">
            <p className="lead-paragraph">
              I am a final-year PhD candidate at the{" "}
              <a
                className="supervisor-link"
                href="https://www.birmingham.ac.uk/"
                target="_blank"
                rel="noreferrer"
              >
                University of Birmingham
              </a>
              , researching the additive manufacturing of high-temperature continuous
              fibre-reinforced ceramic matrix composites for demanding applications. I am
              supervised by{" "}
              <a
                className="supervisor-link"
                href="https://www.birmingham.ac.uk/staff/profiles/metallurgy/binner-jon"
                target="_blank"
                rel="noreferrer"
              >
                Prof. Jon Binner
              </a>
              ,{" "}
              <a
                className="supervisor-link"
                href="https://www.birmingham.ac.uk/staff/profiles/metallurgy/dancer-claire"
                target="_blank"
                rel="noreferrer"
              >
                Dr. Claire Dancer
              </a>
              , and{" "}
              <a
                className="supervisor-link"
                href="https://www.lboro.ac.uk/departments/materials/staff/moataz-attallah/"
                target="_blank"
                rel="noreferrer"
              >
                Prof. Moataz Attallah
              </a>
              . Previously, I graduated with a First-Class Honours MEng in{" "}
              <a
                className="supervisor-link"
                href="https://www.birmingham.ac.uk/study/undergraduate/subjects/materials-science-and-engineering-courses/materials-science-and-engineering-meng"
                target="_blank"
                rel="noreferrer"
              >
                Materials Science and Engineering
              </a>{" "}
              from the University of Birmingham, following one year of studying Medicine at the same institution.
            </p>
          </div>
        </section>

        <section id="news" className="section-pad ruled-section">
          <div className="section-heading compact-heading">
            <p className="section-index">02</p>
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>Recent activities</h2>
            </div>
          </div>
          <div className="news-list">
            {news.map((item) => (
              <article className="news-item" key={item.date}>
                <time>{item.date}</time>
                <p>{item.content}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">03</p>
            <div>
              <p className="eyebrow">Research</p>
              <h2>From printable feedstocks to structural ceramic matrix composites.</h2>
            </div>
          </div>

          <div className="research-grid">
            <article className="research-card card-dark">
              <figure className="material-visual research-image">
                <img
                  src="/portfolio/filaments.jpg"
                  alt="Backscattered-electron micrographs of SiC filament cross-sections and a coiled ceramic filament"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p className="card-number">01</p>
              <h3>Fused filament fabrication</h3>
              <p>
                Ceramic-filled filaments engineered for reliable extrusion,
                dimensional control and pressureless densification.
              </p>
            </article>

            <article className="research-card card-clay">
              <figure className="material-visual research-image">
                <img
                  src="/portfolio/composite-manufacturing.jpg"
                  alt="Continuous-fibre SiC composite co-printing concept, deposition system and manufactured lattice specimens"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p className="card-number">02</p>
              <h3>Continuous fibre CMCs</h3>
              <p>
                Simultaneous placement of carbon fibre reinforcement and SiC-based matrix
                material for complex, directionally reinforced components.
              </p>
            </article>

            <article className="research-card card-light">
              <figure className="material-visual research-image">
                <img
                  src="/portfolio/process-integration-scale-up.jpg"
                  alt="Integrated ceramic-composite feedstock, additive manufacturing, furnace processing and inspection workflow"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p className="card-number">03</p>
              <h3>Process integration & scale-up</h3>
              <p>
                Bespoke hardware, controlled debinding, high-temperature co-sintering and
                multi-technique characterisation connected in one manufacturing workflow.
              </p>
            </article>
          </div>

        </section>

        <section id="publications" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">04</p>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Publications</h2>
            </div>
          </div>
          <div className="publication-list">
            {publications.map((publication) => (
              <a
                className="publication"
                href={publication.href}
                target="_blank"
                rel="noreferrer"
                key={publication.title}
                onClick={() =>
                  trackEvent("publication_click", {
                    publication_title: publication.title,
                    publication_year: publication.year,
                  })
                }
              >
                <div className={`publication-swatch ${publication.accent}`} aria-hidden="true">
                  <span>{publication.year}</span>
                </div>
                <div className="publication-copy">
                  <div className="publication-meta">
                    <span>{publication.type}</span>
                    <span>{publication.year}</span>
                  </div>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <p className="venue">{publication.venue}</p>
                </div>
                <span className="publication-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </div>
        </section>

        <section id="conferences" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">05</p>
            <div>
              <p className="eyebrow">Scientific communication</p>
              <h2>Conference presentations</h2>
            </div>
          </div>

          <div className="conference-list">
            {conferences.map((conference) => (
              <article
                className="conference-item"
                key={conference.year + conference.event + conference.location}
              >
                <time>{conference.year}</time>
                <div className="conference-copy">
                  <div className="conference-meta">
                    <strong>{conference.presentation}</strong>
                    <span>{conference.location}</span>
                  </div>
                  <h3>{conference.event}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">06</p>
            <div>
              <p className="eyebrow">Curriculum vitae</p>
              <h2>Research experience & education</h2>
            </div>
          </div>

          <div className="timeline-group">
            <div className="timeline-label">Research Experience</div>
            <article className="timeline-item">
              <div className="timeline-date">2021 - 2026</div>
              <div>
                <h3>PhD Researcher</h3>
                <p className="timeline-org">University of Birmingham · Advanced Ceramics Group</p>
                <p>
                  Research on developing 3D printing material systems and a manufacturing
                  technology framework for short and continuous fibre‒reinforced high and
                  ultra-high temperature ceramic matrix composites for demanding applications.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">Mar & Nov 2023</div>
              <div>
                <h3>Visiting Researcher</h3>
                <p className="timeline-org">
                  Shanghai Jiao Tong University ·{" "}
                  <a
                    className="supervisor-link"
                    href="https://en.smse.sjtu.edu.cn/about/overview"
                    target="_blank"
                    rel="noreferrer"
                  >
                    SMSE
                  </a>
                  {" & "}
                  <a
                    className="supervisor-link"
                    href="https://www.sustech.edu.cn/en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    SUSTech
                  </a>{" "}
                  · Department of Mechanical and Energy Engineering
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">Sep - Nov 2020</div>
              <div>
                <h3>Multiphysics Simulation Researcher</h3>
                <p className="timeline-org">University of Birmingham · Advanced Ceramics Group</p>
                <p>
                  Evaluated fibre-matrix interfacial parameters in ultra-high temperature CMCs
                  and supported impact failure analysis using finite element modelling.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">Sep - Dec 2019</div>
              <div>
                <h3>Battery Development Researcher</h3>
                <p className="timeline-org">
                  <a
                    className="supervisor-link"
                    href="https://www.birmingham.ac.uk/research/centres-institutes/energy-storage/energy-materials-group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Birmingham Energy Materials Group
                  </a>
                </p>
                <p>
                  Designed lithium-ion battery formation and cycling protocols and performed
                  electrochemical analysis within an interdisciplinary research team.
                </p>
              </div>
            </article>
          </div>

          <div className="timeline-group education-group">
            <div className="timeline-label">Education</div>
            <article className="timeline-item">
              <div className="timeline-date">2021 - 2026</div>
              <div>
                <h3>PhD</h3>
                <p className="timeline-org">University of Birmingham</p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">2017 - 2021</div>
              <div>
                <h3>MEng, Materials Science and Engineering · First Class Honours</h3>
                <p className="timeline-org">University of Birmingham</p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">2016 - 2017</div>
              <div>
                <h3>Medicine, MBChB</h3>
                <p className="timeline-org">University of Birmingham</p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">2014 - 2016</div>
              <div>
                <h3>A-levels</h3>
                <p className="timeline-org">Ruthin School</p>
              </div>
            </article>
          </div>
        </section>

        <section id="about-me" className="section-pad ruled-section">
          <div className="section-heading">
            <p className="section-index">07</p>
            <div>
              <p className="eyebrow">Personal profile</p>
              <h2>About me</h2>
            </div>
          </div>

          <ul className="about-me-list">
            <li>
              <span className="about-me-icon">
                <CollaborationIcon />
              </span>
              <span>
                I&apos;m driven to make manufacturing faster, higher-quality and more adaptable. I
                lead collaborations across academia and industry, with experience spanning direct
                ink writing, solid oxide fuel cells, lithium-ion batteries and multiphysics
                modelling of fibre-matrix interfaces.
              </span>
            </li>
            <li>
              <span className="about-me-icon">
                <ConservationIcon />
              </span>
              <span>
                Environmental conservation is one of my key causes. My interest in research began
                in autumn 2012, when I worked as an intern at the Beijing Forest Ecosystem Station (
                <a
                  className="supervisor-link"
                  href="https://deims.org/9516fa76-79cc-4620-bc27-e721cdaf0db3"
                  target="_blank"
                  rel="noreferrer"
                >
                  BJF, CERN
                </a>
                ), analysing root-zone water storage alongside botanists and climatologists.
              </span>
            </li>
            <li>
              <span className="about-me-icon">
                <SportsIcon />
              </span>
              <span>
                I am a team member of Edgbaston Hockey Club&apos;s Ladies 5s and enjoy fencing in my
                spare time.
              </span>
            </li>
          </ul>
        </section>

        <section id="contact" className="contact-section">
          <p className="eyebrow">Contact</p>
          <h2>
            <em>I would love the opportunity to</em>
            <br />
            <em>work with you!</em>
          </h2>
          <p>
            <em>Any questions, please contact:</em>
          </p>
          <a
            className="contact-link"
            href="mailto:dollyyebham@gmail.com"
            onClick={() => trackEvent("email_click", { link_location: "contact" })}
          >
            dollyyebham@gmail.com <ArrowIcon />
          </a>
        </section>

        <footer>
          <span>© 2026 Daorong Ye</span>
          <span>Materials innovation · curiosity-driven &amp; evidence-led research · Strategic impact</span>
          <button
            className="analytics-preferences"
            type="button"
            onClick={() => setAnalyticsConsent(null)}
          >
            Analytics preferences
          </button>
        </footer>
      </main>

      {analyticsConsent === null && (
        <aside className="analytics-notice" aria-label="Analytics preferences">
          <div>
            <strong>Optional website analytics</strong>
            <p>
              With your permission, Google Analytics will measure visits and interactions to help
              improve this portfolio. It may process usage data and approximate location.
            </p>
          </div>
          <div className="analytics-actions">
            <button type="button" onClick={() => chooseAnalyticsConsent("denied")}>
              Decline
            </button>
            <button
              className="analytics-accept"
              type="button"
              onClick={() => chooseAnalyticsConsent("granted")}
            >
              Accept analytics
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
