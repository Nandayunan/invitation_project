"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const invitation = {
  groom: "Fazrin Syafiq",
  groomNickname: "Munok",
  groomParents: "Putra dari Bapak Nama Ayah (Contoh) dan Ibu Nama Ibu (Contoh)",
  bride: "",
  brideNickname: "",
  brideParents: "",
  groomFather: "",
  groomMother: "",
  brideFather: "",
  brideMother: "",
  date: "2026-12-20T08:00:00+07:00",
  ceremony: "08.00 - 10.00",
  reception: "13.00 - selesai",
  venue: "Ruang Rasa",
  address: "Ruko La Fenza, Villa Mutiara Cikarang 1 No.2 Blok R4, Ciantra, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17532",
  mapUrl: "https://maps.app.goo.gl/piE4DGqfcg3H9jTS8",
  groomInstagram: "",
  brideInstagram: "",
  groomPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
  bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=88",
  story: [] as { title: string; text: string; image: string }[],
  episodes: [] as { title: string; image: string }[],
  gallery: [] as { image: string; alt: string }[],
  trailerUrl: "",
  rsvpUrl: "",
  giftUrl: "",
  giftAccount: { bank: "", accountName: "", accountNumber: "" },
  musicUrl: "",
};

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
type GalleryPhoto = { image: string; alt: string };

const demoGallery: GalleryPhoto[] = [
  {
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=88",
    alt: "Foto contoh pasangan di hari pernikahan",
  },
  {
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=88",
    alt: "Foto contoh pasangan berjalan bersama",
  },
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=88",
    alt: "Foto contoh momen pernikahan",
  },
  {
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=88",
    alt: "Foto contoh pasangan merayakan pernikahan",
  },
];

function subscribeToGuestName(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getGuestName() {
  return new URLSearchParams(window.location.search).get("to")?.trim() ?? "";
}

function WeddingOrnaments() {
  return (
    <div className="wedding-ornaments" aria-hidden="true">
      <svg className="ornament-branch" viewBox="0 0 220 260" fill="none">
        <path className="ornament-stem" d="M206 251C151 204 148 158 111 123S65 74 25 20" />
        <path className="ornament-stem" d="M148 204C175 183 193 161 201 137M116 132C80 136 57 125 43 105M77 83C99 67 106 48 101 33M169 224C143 225 124 237 112 255" />
        <path className="ornament-leaf" d="M180 178C183 158 196 146 207 141C207 158 198 174 180 178ZM74 130C59 139 42 134 32 126C46 117 62 118 74 130ZM96 65C99 49 95 39 88 30C80 43 82 56 96 65ZM145 221C130 213 116 218 107 225C120 233 134 232 145 221Z" />
        <g className="ornament-bloom" transform="translate(25 20)">
          <ellipse className="ornament-petal" cy="-8" rx="4" ry="8" />
          <ellipse className="ornament-petal" cy="-8" rx="4" ry="8" transform="rotate(72)" />
          <ellipse className="ornament-petal" cy="-8" rx="4" ry="8" transform="rotate(144)" />
          <ellipse className="ornament-petal" cy="-8" rx="4" ry="8" transform="rotate(216)" />
          <ellipse className="ornament-petal" cy="-8" rx="4" ry="8" transform="rotate(288)" />
          <circle className="ornament-center" r="3" />
        </g>
        <g className="ornament-bloom ornament-bloom-small" transform="translate(111 123)">
          <ellipse className="ornament-petal" cy="-6" rx="3" ry="6" />
          <ellipse className="ornament-petal" cy="-6" rx="3" ry="6" transform="rotate(72)" />
          <ellipse className="ornament-petal" cy="-6" rx="3" ry="6" transform="rotate(144)" />
          <ellipse className="ornament-petal" cy="-6" rx="3" ry="6" transform="rotate(216)" />
          <ellipse className="ornament-petal" cy="-6" rx="3" ry="6" transform="rotate(288)" />
          <circle className="ornament-center" r="2.5" />
        </g>
        <circle className="ornament-bud" cx="201" cy="137" r="3" />
        <circle className="ornament-bud" cx="88" cy="30" r="2.5" />
      </svg>
      <svg className="ornament-bird bird-one" viewBox="0 0 54 28">
        <path d="M2 19C9 10 16 9 25 17C31 7 41 5 52 11C40 10 33 16 26 25C19 17 11 15 2 19Z" />
      </svg>
      <svg className="ornament-bird bird-two" viewBox="0 0 54 28">
        <path d="M2 19C9 10 16 9 25 17C31 7 41 5 52 11C40 10 33 16 26 25C19 17 11 15 2 19Z" />
      </svg>
      <span className="drifting-petal petal-one" />
      <span className="drifting-petal petal-two" />
      <span className="drifting-petal petal-three" />
    </div>
  );
}

function getCountdown(): Countdown {
  const difference = Math.max(0, new Date(invitation.date).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatDate() {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(invitation.date));
}

export default function InvitationExperience() {
  const [opened, setOpened] = useState(false);
  const guestName = useSyncExternalStore(subscribeToGuestName, getGuestName, () => "");
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [giftCopied, setGiftCopied] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const galleryPhotos = invitation.gallery.length > 0 ? invitation.gallery : demoGallery;
  const isDemoGallery = invitation.gallery.length === 0;

  useEffect(() => {
    const initialUpdate = window.setTimeout(() => setCountdown(getCountdown()), 0);
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!opened) return;

    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    if (activePhotoIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhotoIndex(null);
      if (event.key === "ArrowLeft") setActivePhotoIndex((index) => index === null ? null : (index - 1 + galleryPhotos.length) % galleryPhotos.length);
      if (event.key === "ArrowRight") setActivePhotoIndex((index) => index === null ? null : (index + 1) % galleryPhotos.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, galleryPhotos.length]);

  async function toggleMusic() {
    if (!audioRef.current || !invitation.musicUrl) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  async function copyGiftAccount() {
    if (!invitation.giftAccount.accountNumber) return;
    try {
      await navigator.clipboard.writeText(invitation.giftAccount.accountNumber);
      setGiftCopied(true);
      window.setTimeout(() => setGiftCopied(false), 1800);
    } catch {
      setGiftCopied(false);
    }
  }

  function movePhoto(direction: -1 | 1) {
    setActivePhotoIndex((index) => index === null ? null : (index + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  const demoBride = "Alya Putri (Contoh)";
  const brideName = invitation.bride || demoBride;
  const brideNickname = invitation.brideNickname || (invitation.bride ? "" : "Alya (Contoh)");
  const brideParents = invitation.brideParents || (invitation.bride ? "" : "Putri dari Bapak Nama Ayah (Contoh) dan Ibu Nama Ibu (Contoh)");
  const coupleNames = `${invitation.groom} & ${brideName}`;
  const castMembers = [
    { name: invitation.groom, nickname: invitation.groomNickname, role: "Mempelai pria" },
    { name: invitation.bride, nickname: invitation.brideNickname, role: "Mempelai wanita" },
    { name: invitation.groomFather, nickname: "", role: "Ayah mempelai pria" },
    { name: invitation.groomMother, nickname: "", role: "Ibu mempelai pria" },
    { name: invitation.brideFather, nickname: "", role: "Ayah mempelai wanita" },
    { name: invitation.brideMother, nickname: "", role: "Ibu mempelai wanita" },
  ].filter((member) => member.name);

  return (
    <>
      <section className={`cover ${opened ? "cover-opened" : ""}`} aria-label="Sampul undangan" aria-hidden={opened}>
        <div className="cover-photo" style={{ backgroundImage: `url("${invitation.coverImage}")` }} />
        <div className="cover-wash" />
        <WeddingOrnaments />
        <div className="cover-topline"><span>AN INVITATION</span><span>20 / 12 / 2026</span></div>
        <div className="cover-content">
          <p className="bismillah">Bismillahirrahmanirrahim</p>
          <p className="eyebrow">The wedding of</p>
          <h1>{coupleNames}</h1>
          <p className="cover-recipient">Kepada Bapak/Ibu/Saudara/i</p>
          <p className="cover-guest">{guestName || "Nama Tamu"}</p>
          <button className="button button-primary cover-button" onClick={(event) => { setOpened(true); event.currentTarget.blur(); }} type="button">
            <span aria-hidden="true">+</span> Buka Undangan
          </button>
        </div>
        <span className="cover-index">F / 20.12.26</span>
      </section>

      <main className={`experience ${opened ? "experience-visible" : ""}`}>
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Ke bagian Home"><span className="wordmark-symbol">F</span><span>20.12.26</span></a>
          <nav className="main-nav" aria-label="Navigasi utama">
            <a href="#home">Home</a>
            {invitation.story.length > 0 && <a href="#story">Story</a>}
            <a href="#wedding">Wedding</a>
            <a href="#gallery">Gallery</a>
            {invitation.rsvpUrl && <a href="#rsvp">RSVP</a>}
          </nav>
          {invitation.musicUrl && (
            <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Jeda musik" : "Putar musik"}>
              <span className={musicPlaying ? "music-bars is-playing" : "music-bars"}><i /><i /><i /></span>
            </button>
          )}
        </header>

        <section className="film-hero" id="home">
          <div className="film-hero-image" style={{ backgroundImage: `url("${invitation.coverImage}")` }} />
          <div className="film-hero-shade" />
          <WeddingOrnaments />
          <div className="film-hero-content">
            <p className="eyebrow light-eyebrow">A day to remember</p>
            <h2>{coupleNames}</h2>
            <p className="film-date">{formatDate()} / Bekasi</p>
            {guestName && <p className="welcome-line">Welcome, {guestName}</p>}
            <a className="text-link" href="#wedding">Explore the invitation <span aria-hidden="true">↓</span></a>
          </div>
          <span className="hero-caption">A NEW CHAPTER / 01</span>
        </section>

        <section className="countdown-band" aria-label="Hitung mundur pernikahan">
          <div className="countdown-intro"><span className="eyebrow">Counting down to</span><strong>the celebration</strong></div>
          <div className="countdown-values">
            {[[countdown.days, "Hari"], [countdown.hours, "Jam"], [countdown.minutes, "Menit"], [countdown.seconds, "Detik"]].map(([value, label]) => (
              <div className="countdown-unit" key={label}><span>{String(value).padStart(2, "0")}</span><small>{label}</small></div>
            ))}
          </div>
        </section>

        <section className="couple-section reveal" id="couple">
          <div className="couple-intro">
            <p className="bismillah bismillah-arabic" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="couple-greeting">Assalamu&apos;alaikum Wr. Wb.</p>
            <p className="couple-invitation">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat untuk menghadiri acara pernikahan kami.</p>
          </div>
          <div className="couple-profiles">
            <article className="profile-block">
              <div className="profile-photo" role="img" aria-label="Foto contoh mempelai pria" style={{ backgroundImage: `url("${invitation.groomPhoto}")` }} />
              <p className="profile-role">Mempelai pria · foto contoh</p>
              <h2>{invitation.groom}</h2>
              <p className="profile-nickname">Akrab disapa {invitation.groomNickname}</p>
              <p className="profile-family">{invitation.groomParents}</p>
            </article>
            <span className="profile-ampersand" aria-hidden="true">&</span>
            <article className="profile-block">
              <div className="profile-photo" role="img" aria-label="Foto contoh mempelai wanita" style={{ backgroundImage: `url("${invitation.bridePhoto}")` }} />
              <p className="profile-role">Mempelai wanita · {invitation.bride ? "foto contoh" : "data contoh"}</p>
              <h2>{brideName}</h2>
              {brideNickname && <p className="profile-nickname">Akrab disapa {brideNickname}</p>}
              {brideParents && <p className="profile-family">{brideParents}</p>}
            </article>
          </div>
          <p className="demo-note">Nama keluarga dan foto bertanda contoh perlu diganti dengan data asli sebelum undangan dibagikan.</p>
        </section>

        {invitation.story.length > 0 && (
          <section className="content-section" id="story">
            <div className="section-heading"><div><span className="eyebrow">The beginning</span><h2>Our Story</h2></div><span className="section-count">01 / STORY</span></div>
            <div className="story-row horizontal-row">
              {invitation.story.map((moment) => (
                <article className="story-card" key={moment.title}>
                  <div className="story-image" style={{ backgroundImage: `url("${moment.image}")` }} />
                  <div className="story-copy"><span className="eyebrow">A shared moment</span><h3>{moment.title}</h3><p>{moment.text}</p></div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="wedding-section reveal" id="wedding">
          <div className="section-heading"><div><span className="eyebrow">Save the date</span><h2>Wedding Details</h2></div><span className="section-count">20 DECEMBER 2026</span></div>
          <div className="details-layout">
            <div className="event-times">
              <article className="event-block"><span className="event-number">01</span><div><span className="eyebrow">Akad</span><p>{invitation.ceremony}</p></div><span className="event-icon" aria-hidden="true">+</span></article>
              <article className="event-block"><span className="event-number">02</span><div><span className="eyebrow">Resepsi</span><p>{invitation.reception}</p></div><span className="event-icon" aria-hidden="true">+</span></article>
            </div>
            <article className="venue-panel">
              <span className="eyebrow">The venue</span><h3>{invitation.venue}</h3><p>{invitation.address}</p>
              <div className="venue-actions">
                {invitation.mapUrl && <a className="button button-dark" href={invitation.mapUrl} target="_blank" rel="noreferrer">Buka Google Maps <span aria-hidden="true">+</span></a>}
                {invitation.groomInstagram && <a className="button button-outline" href={invitation.groomInstagram} target="_blank" rel="noreferrer">Instagram pria</a>}
                {invitation.brideInstagram && <a className="button button-outline" href={invitation.brideInstagram} target="_blank" rel="noreferrer">Instagram wanita</a>}
              </div>
            </article>
          </div>
        </section>

        <section className="gift-section reveal" id="gift">
          <span className="eyebrow">A token of love</span>
          <h2>Amplop Digital</h2>
          <p className="gift-intro">Doa restu Anda adalah hadiah terbaik. Jika ingin berbagi tanda kasih, detail amplop digital tersedia di bawah ini.</p>
          <div className="gift-account">
            <span className="eyebrow">Informasi rekening</span>
            <strong>{invitation.giftAccount.bank || "Nama bank (contoh)"}</strong>
            <span>{invitation.giftAccount.accountName || "Nama penerima (contoh)"}</span>
            <span className="gift-account-number">{invitation.giftAccount.accountNumber || "XXXX XXXX XXXX"}</span>
            <button className="button button-dark" type="button" onClick={copyGiftAccount} disabled={!invitation.giftAccount.accountNumber}>
              {giftCopied ? "Nomor tersalin" : invitation.giftAccount.accountNumber ? "Salin nomor rekening" : "Menunggu data rekening"}
            </button>
          </div>
          {!invitation.giftAccount.accountNumber && <p className="demo-note">Contoh tampilan saja. Nomor rekening belum diisi dan tombol salin belum aktif.</p>}
          {invitation.giftUrl && <a className="button button-outline gift-link" href={invitation.giftUrl} target="_blank" rel="noreferrer">Buka wedding gift</a>}
        </section>

        <section className="gallery-section reveal" id="gallery">
          <div className="section-heading">
            <div><span className="eyebrow">Frames we keep</span><h2>Galeri Foto</h2></div>
            <span className="section-count">{String(galleryPhotos.length).padStart(2, "0")} FOTO</span>
          </div>
          {isDemoGallery && <p className="gallery-note">Foto contoh sementara. Ganti daftar foto di konfigurasi undangan sebelum dibagikan.</p>}
          <div className="gallery-grid">
            {galleryPhotos.map((photo, index) => (
              <button
                className={`gallery-tile ${index === 0 ? "gallery-tile-featured" : ""}`}
                key={`${photo.image}-${index}`}
                type="button"
                aria-label={`Buka foto ${index + 1}: ${photo.alt}`}
                style={{ backgroundImage: `url("${photo.image}")` }}
                onClick={() => setActivePhotoIndex(index)}
              />
            ))}
          </div>
        </section>

        {invitation.episodes.length > 0 && (
          <section className="content-section" aria-labelledby="episodes-title">
            <div className="section-heading"><div><span className="eyebrow">Scenes from us</span><h2 id="episodes-title">Episodes</h2></div><span className="section-count">A PHOTO JOURNAL</span></div>
            <div className="episode-row horizontal-row">
              {invitation.episodes.map((episode, index) => (
                <article className="episode-card" key={episode.title}><div className="episode-image" style={{ backgroundImage: `url("${episode.image}")` }} /><span className="episode-index">EP. {String(index + 1).padStart(2, "0")}</span><h3>{episode.title}</h3></article>
              ))}
            </div>
          </section>
        )}

        {invitation.trailerUrl && <section className="trailer-section reveal"><span className="eyebrow">The film</span><h2>Trailer</h2><video controls playsInline src={invitation.trailerUrl} /></section>}
        {castMembers.length > 0 && (
          <section className="cast-section">
            <div className="section-heading"><div><span className="eyebrow">The people at the heart of it</span><h2>The Cast</h2></div></div>
            <div className="cast-row horizontal-row">
              {castMembers.map((member) => (
                <article className="cast-card" key={member.role}>
                  <span className="cast-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  {member.nickname && <p className="cast-nickname">Akrab disapa {member.nickname}</p>}
                </article>
              ))}
            </div>
          </section>
        )}
        {invitation.rsvpUrl && <section className="closing-section" id="rsvp"><span className="eyebrow">Be part of our day</span><h2>We saved you a seat.</h2><a className="button button-primary" href={invitation.rsvpUrl} target="_blank" rel="noreferrer">RSVP</a></section>}
        {invitation.giftUrl && <section className="gift-section"><span className="eyebrow">A little kindness</span><h2>Wedding Gift</h2><a className="text-link" href={invitation.giftUrl} target="_blank" rel="noreferrer">Send a gift</a></section>}
        <footer className="site-footer"><span>{coupleNames}</span><span>20 / 12 / 2026</span></footer>
      </main>
      {activePhotoIndex !== null && (
        <div className="lightbox-backdrop" onClick={() => setActivePhotoIndex(null)}>
          <section
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${activePhotoIndex + 1} dari ${galleryPhotos.length}`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="lightbox-toolbar">
              <span>{activePhotoIndex + 1} / {galleryPhotos.length}</span>
              <button className="lightbox-close" type="button" onClick={() => setActivePhotoIndex(null)} aria-label="Tutup galeri">×</button>
            </header>
            <button className="lightbox-arrow lightbox-previous" type="button" onClick={() => movePhoto(-1)} aria-label="Foto sebelumnya">‹</button>
            <div
              className="lightbox-stage"
              onPointerDown={(event) => { pointerStartX.current = event.clientX; }}
              onPointerUp={(event) => {
                if (pointerStartX.current === null) return;
                const distance = event.clientX - pointerStartX.current;
                pointerStartX.current = null;
                if (Math.abs(distance) > 55) movePhoto(distance < 0 ? 1 : -1);
              }}
              onPointerCancel={() => { pointerStartX.current = null; }}
            >
              <div className="lightbox-image" role="img" aria-label={galleryPhotos[activePhotoIndex].alt} style={{ backgroundImage: `url("${galleryPhotos[activePhotoIndex].image}")` }} />
            </div>
            <button className="lightbox-arrow lightbox-next" type="button" onClick={() => movePhoto(1)} aria-label="Foto berikutnya">›</button>
            <p className="lightbox-caption">{galleryPhotos[activePhotoIndex].alt}</p>
          </section>
        </div>
      )}
      {invitation.musicUrl && <audio ref={audioRef} src={invitation.musicUrl} loop preload="none" />}
    </>
  );
}
