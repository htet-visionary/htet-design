"use client";

import { useEffect } from "react";

const stickerRow1 = [
  { icon: "🐰", text: "lucky on a cushion" },
  { icon: "🍀", text: "lucky things" },
  { icon: "💜", text: "lavender bouquet" },
  { icon: "☕", text: "bunny in a teacup" },
  { icon: "📖", text: "lucky notes book" },
  { icon: "✦", text: "so lucky to have you" },
  { icon: "🧴", text: "luck charm spray" },
  { icon: "💜", text: "luck is near" },
];

const stickerRow2 = [
  { icon: "🎀", text: "lucky days ahead" },
  { icon: "🛍️", text: "lucky tote bag" },
  { icon: "📸", text: "polaroid memories" },
  { icon: "🕯️", text: "luck charm candle" },
  { icon: "🫀", text: "luck follows kind hearts" },
  { icon: "🌿", text: "little reminders" },
  { icon: "🐾", text: "mama & baby bunny" },
  { icon: "✨", text: "everything will be okay" },
];

const taglines = [
  { text: "a tiny friend to bring you luck everyday", icon: "🍀" },
  { text: "little luck,\nbig happiness", icon: "✨" },
  { text: "good things are on their way", icon: "🌿" },
  { text: "lucky me,\nlucky you", icon: "🐰" },
  { text: "collect little moments that make you smile", icon: "💜" },
  { text: "luck follows kind hearts", icon: "🫶" },
];

const icons = [
  { emoji: "🍀", label: "Four-leaf clover" },
  { emoji: "🌿", label: "Leaf sprig" },
  { emoji: "💜", label: "Lavender heart" },
  { emoji: "✦", label: "Lucky sparkle" },
  { emoji: "🏷️", label: "Gift tag" },
  { emoji: "🫧", label: "Iridescent bubble" },
];

const reminders = [
  { icon: "🍀", text: "Good luck is always around you" },
  { icon: "🤍", text: "Take care of yourself, first" },
  { icon: "🌿", text: "Be kind — it finds its way back" },
  { icon: "🫧", text: "You are enough, always" },
  { icon: "✦", text: "Everything will be okay ♡" },
];

const charVariants = [
  { emoji: "🍀", name: "Lucky", desc: "Holding a four-leaf clover, ready to share fortune" },
  { emoji: "🎀", name: "Gentle", desc: "Soft bow, offering warmth and quiet kindness" },
  { emoji: "💐", name: "Thoughtful", desc: "Carrying lavender, reflecting and caring deeply" },
  { emoji: "🫧", name: "Everyday Magic", desc: "With a bubble — finding wonder in small things" },
];

function StickerChips({ items }: { items: typeof stickerRow1 }) {
  const doubled = [...items, ...items];
  return (
    <>
      {doubled.map((chip, i) => (
        <div key={`${chip.text}-${i}`} className="sticker-chip">
          <span className="chip-icon">{chip.icon}</span> {chip.text}
        </div>
      ))}
    </>
  );
}

export function RabbitSite() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));

    const handleClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((a) => a.addEventListener("click", handleClick));

    return () => {
      observer.disconnect();
      links.forEach((a) => a.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <>
      <nav>
        <div className="nav-logo">
          Lucky<span>Charm</span> ✦
        </div>
        <ul>
          <li>
            <a href="#story">Story</a>
          </li>
          <li>
            <a href="#character">Character</a>
          </li>
          <li>
            <a href="#palette">Palette</a>
          </li>
          <li>
            <a href="#collection">Collection</a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-bg-circle c1" />
        <div className="hero-bg-circle c2" />
        <div className="hero-bg-circle c3" />

        <span className="float-el clover1">🍀</span>
        <span className="float-el clover2">🌿</span>
        <span className="float-el sparkle1">✦</span>
        <span className="float-el sparkle2">✧</span>
        <span className="float-el lavender">💜</span>

        <div className="hero-content">
          <p className="hero-eyebrow">A tiny friend</p>
          <h1 className="hero-title">
            Lucky
            <br />
            <span className="charm">Charm</span>
          </h1>
          <p className="hero-subtitle">to bring you luck everyday 🍀</p>
          <div>
            <a href="#story" className="hero-cta">
              Discover Lucky
            </a>
            <a href="#character" className="hero-cta-secondary">
              Meet the bunny →
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      <section id="story" style={{ background: "var(--cream)", padding: "7rem 3rem" }}>
        <div className="brand-story fade-in-up">
          <div className="story-visual">
            <div className="story-card">
              <div className="story-card-deco" />
              <p className="story-quote">
                Lucky is a tiny little bunny who brings small pieces of luck into your
                everyday life.
              </p>
              <span className="story-attr">— The Brand Story</span>
              <div className="story-pills" style={{ marginTop: "2rem" }}>
                <span className="pill pill-green">🍀 Clovers</span>
                <span className="pill pill-purple">💜 Lavender</span>
                <span className="pill pill-green">🐰 Gentle spirit</span>
                <span className="pill pill-golden">✨ Everyday magic</span>
                <span className="pill pill-purple">🫧 Soft pillows</span>
                <span className="pill pill-green">📝 Sweet notes</span>
              </div>
            </div>
            <div className="motto-card">
              <span style={{ fontSize: "2rem" }}>🐇</span>
              <div>
                <p className="motto-quote">&ldquo;so lucky to have you&rdquo;</p>
                <p className="motto-label">Lucky Charm motto</p>
              </div>
            </div>
          </div>

          <div className="story-text">
            <p className="section-label">Brand Story</p>
            <h2 className="section-title">
              Good things are
              <br />
              <em>always on their way</em>
            </h2>
            <p className="section-body">
              With a heart full of kindness and a pocket full of clovers, Lucky gently
              reminds you that good things are always on their way.
            </p>
            <p className="section-body" style={{ marginTop: "1.2rem" }}>
              Born on March 17th, Lucky embodies the quiet magic of noticing small moments
              — a four-leaf clover, the scent of lavender, a soft note tucked away just
              for you.
            </p>
            <p className="section-body" style={{ marginTop: "1.2rem" }}>
              Lucky isn&apos;t loud about luck. Lucky whispers it. Carries it carefully.
              Shares it freely.
            </p>
            <div className="story-callout">
              <p>✦ little luck, big happiness ✦</p>
            </div>
          </div>
        </div>
      </section>

      <section id="character" className="character-section" style={{ padding: "7rem 3rem" }}>
        <div className="character-inner fade-in-up">
          <div>
            <p className="section-label">Character Profile</p>
            <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
              Meet <em>Lucky</em>
            </h2>
            <div className="character-profile-card">
              <div className="card-header">
                <div className="char-avatar">🐰</div>
                <div>
                  <h3 className="char-name">Lucky</h3>
                  <p className="char-species">Little Bunny · Lucky Charm™</p>
                </div>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">🍀</span> Name
                </span>
                <span className="profile-val">Lucky</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">🐾</span> Species
                </span>
                <span className="profile-val">Little Bunny</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">🎂</span> Birthday
                </span>
                <span className="profile-val">March 17</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">💚</span> Likes
                </span>
                <div className="profile-val">
                  <div className="personality-tags">
                    <span className="ptag">Clovers</span>
                    <span className="ptag">Lavender</span>
                    <span className="ptag">Soft pillows</span>
                    <span className="ptag">Sweet notes</span>
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">✨</span> Personality
                </span>
                <div className="profile-val">
                  <div className="personality-tags">
                    <span className="ptag">Gentle</span>
                    <span className="ptag">Kind</span>
                    <span className="ptag">Thoughtful</span>
                    <span className="ptag">A little shy</span>
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">🌟</span> Special power
                </span>
                <span className="profile-val">Bringing everyday luck</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">
                  <span className="profile-key-icon">🏡</span> Home
                </span>
                <span className="profile-val">Wherever you carry them</span>
              </div>
            </div>
          </div>

          <div className="character-right">
            <p className="section-label">Character Variants</p>
            <p className="section-body">
              Lucky appears in four emotional states, each capturing a different facet
              of bringing everyday luck to those they love.
            </p>
            <div className="char-variations">
              {charVariants.map((v) => (
                <div key={v.name} className="char-card">
                  <span className="char-card-emoji">{v.emoji}</span>
                  <p className="char-card-name">{v.name}</p>
                  <p className="char-card-desc">{v.desc}</p>
                </div>
              ))}
            </div>
            <div className="daily-reminder">
              <p className="daily-reminder__label">Lucky&apos;s daily reminder</p>
              <p className="daily-reminder__text">
                collect little moments
                <br />
                that make you smile ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="taglines-section">
        <p className="tagline-eyebrow">✦ Tagline Options ✦</p>
        <div className="taglines-grid">
          {taglines.map((t) => (
            <div key={t.text} className="tagline-item">
              <p className="tagline-text">
                {t.text.split("\n").map((line, i, arr) => (
                  <span key={line}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <span className="tagline-icon">{t.icon}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="palette" style={{ padding: "7rem 3rem", background: "white" }}>
        <div className="palette-section fade-in-up">
          <p className="section-label">Color Palette</p>
          <h2 className="section-title">
            The colours of <em>everyday luck</em>
          </h2>
          <p className="section-body">
            Each colour carries a feeling — from the softness of a morning meadow to the
            quiet shimmer of something magical just around the corner.
          </p>
          <div className="palette-grid">
            <div className="palette-swatch">
              <div className="swatch-color" style={{ background: "#B7CDB1" }}>
                <span className="swatch-hex">#B7CDB1</span>
              </div>
              <div className="swatch-info">
                <p className="swatch-name">Soft Green</p>
                <p className="swatch-desc">Meadow calm, gentle growth</p>
              </div>
            </div>
            <div className="palette-swatch">
              <div className="swatch-color" style={{ background: "#BDBDBD" }}>
                <span className="swatch-hex">#BDBDBD</span>
              </div>
              <div className="swatch-info">
                <p className="swatch-name">Misty Grey</p>
                <p className="swatch-desc">Quiet morning, soft balance</p>
              </div>
            </div>
            <div className="palette-swatch">
              <div
                className="swatch-color"
                style={{ background: "#F7F7F7", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <span
                  className="swatch-hex"
                  style={{ background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.4)" }}
                >
                  #F7F7F7
                </span>
              </div>
              <div className="swatch-info">
                <p className="swatch-name">White Rabbit</p>
                <p className="swatch-desc">Pure, clean, like Lucky&apos;s fur</p>
              </div>
            </div>
            <div className="palette-swatch">
              <div className="swatch-color" style={{ background: "#8E6FAE" }}>
                <span
                  className="swatch-hex"
                  style={{
                    background: "rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  #8E6FAE
                </span>
              </div>
              <div className="swatch-info">
                <p className="swatch-name">Static Purple</p>
                <p className="swatch-desc">Dried lavender, gentle magic</p>
              </div>
            </div>
            <div className="palette-swatch">
              <div
                className="swatch-color"
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700, #FF9999, #99DDFF, #AAFFAA, #FFD700)",
                }}
              >
                <span
                  className="swatch-hex"
                  style={{
                    background: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Iridescent
                </span>
              </div>
              <div className="swatch-info">
                <p className="swatch-name">Golden Iridescence</p>
                <p className="swatch-desc">The shimmer of something lucky</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 3rem", background: "var(--cream)" }}>
        <div className="icons-section fade-in-up">
          <p className="section-label">Brand Icons</p>
          <h2 className="section-title">
            Symbols of <em>Lucky&apos;s world</em>
          </h2>
          <div className="icons-grid">
            {icons.map((icon) => (
              <div key={icon.label} className="icon-card">
                <span className="icon-emoji">{icon.emoji}</span>
                <p className="icon-label">{icon.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="stickers-section" style={{ padding: "6rem 0" }}>
        <div className="stickers-inner" style={{ padding: "0 3rem" }}>
          <p className="section-label">Sticker Collection</p>
          <h2 className="section-title">
            Little pieces of <em>Lucky&apos;s life</em>
          </h2>
          <p className="section-body">
            Each sticker tells a tiny story — Lucky on a cushion, Lucky with lavender,
            Lucky reading lucky notes.
          </p>
        </div>
        <div className="stickers-marquee-wrap" style={{ marginTop: "3rem" }}>
          <div className="sticker-row">
            <StickerChips items={stickerRow1} />
          </div>
          <div className="sticker-row">
            <StickerChips items={stickerRow2} />
          </div>
        </div>
      </section>

      <section className="messaging-section" style={{ padding: "7rem 3rem" }}>
        <div className="messaging-inner fade-in-up">
          <p className="section-label">Little Reminders</p>
          <h2 className="section-title">
            What <em>Lucky</em> wants you to know
          </h2>
          <div className="reminders-card">
            <ul className="reminders-list">
              {reminders.map((r) => (
                <li key={r.text}>
                  <div className="reminder-icon">{r.icon}</div>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
            <div className="reminders-aside">
              <span className="big-clover">🐰</span>
              <p className="reminders-tagline">
                good things
                <br />
                are coming ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "7rem 3rem", background: "var(--cream)" }}>
        <div className="type-inner fade-in-up">
          <p className="section-label">Typography</p>
          <h2 className="section-title">
            The voice of <em>Lucky Charm</em>
          </h2>
          <div className="type-showcase">
            <div className="type-row">
              <p className="type-label">Display</p>
              <p className="type-sample type-display">Lucky Charm*</p>
            </div>
            <div className="type-row">
              <p className="type-label">Heading</p>
              <p className="type-sample type-heading">
                A tiny friend to bring you luck everyday
              </p>
            </div>
            <div className="type-row">
              <p className="type-label">Sub-heading</p>
              <p className="type-sample type-subheading">so lucky to have you ♡</p>
            </div>
            <div className="type-row">
              <p className="type-label">Body</p>
              <p className="type-sample type-body">
                Lucky is a tiny little bunny who brings small pieces of luck into your
                everyday life. With a heart full of kindness and a pocket full of
                clovers, Lucky gently reminds you that good things are always on their
                way.
              </p>
            </div>
            <div className="type-row">
              <p className="type-label">Caption</p>
              <p className="type-sample type-caption">
                little luck · big happiness · good things are coming
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p className="footer-logo">Lucky Charm*</p>
        <p className="footer-tagline">a tiny friend to bring you luck everyday 🍀</p>
        <div className="footer-icons">
          <span>🍀</span>
          <span>🐰</span>
          <span>💜</span>
          <span>✦</span>
          <span>🌿</span>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <span>© Lucky Charm™</span>
          <div className="footer-links">
            <a href="#">Brand Kit</a>
            <a href="#">Sticker Pack</a>
            <a href="#">About Lucky</a>
          </div>
          <span>luck follows kind hearts ♡</span>
        </div>
      </footer>
    </>
  );
}
