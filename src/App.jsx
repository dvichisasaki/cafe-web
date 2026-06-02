import { useState, useEffect, useRef, useCallback } from "react";

const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`;

const IMGS = {
  interior1: imagePath("interior1.jpg"),
  exterior: imagePath("exterior.jpg"),
  interior2: imagePath("interior2.jpg"),
  interior3: imagePath("interior3.jpg"),
  tiramisu: imagePath("tiramisu.jpg"),
  choco: imagePath("choco.jpg"),
  montblanc: imagePath("montblanc.jpg"),
  menu: imagePath("menu.jpg"),
  menuDesktop: imagePath("menu-desktop.jpg"),
  latte: imagePath("latte.jpg"),
  caramelMacchiato: imagePath("caramel-macchiato.jpg"),
  americano: imagePath("americano.jpg"),
  iceLatte: imagePath("ice-latte.jpg"),
};

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

// NAV
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Coffee", "Dessert", "Menu", "Location"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-stone-100" : ""}`}>
      <div className="flex justify-between items-center px-6 md:px-12 py-5 md:py-7">
        <a href="#" className={`text-sm tracking-[0.3em] transition-colors duration-300 ${scrolled ? "text-stone-900" : "text-white"}`} style={{ fontFamily: "Cormorant Garamond, serif" }}>
          S & C
        </a>
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-10 list-none">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${scrolled ? "text-stone-900" : "text-white"}`}>{l}</a>
              </li>
            ))}
          </ul>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 hover:opacity-60 ${scrolled ? "text-stone-900" : "text-white"}`} aria-label="Instagram">
            <InstagramIcon className="w-[18px] h-[18px]" />
          </a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${scrolled ? "text-stone-900" : "text-white"}`} aria-label="Instagram">
            <InstagramIcon className="w-[18px] h-[18px]" />
          </a>
          <button className="flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-stone-900" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-stone-900" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-stone-900" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-500 overflow-hidden bg-white ${menuOpen ? "max-h-64" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 pb-6 gap-5 list-none">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-[13px] tracking-[0.3em] uppercase text-stone-900 hover:text-stone-400 transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// HERO
function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <img src={IMGS.interior1} alt="Cafe interior" className="w-full h-full object-cover"
        style={{ animation: "heroZoom 12s ease-out forwards", transform: "scale(1.08)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
      <div className="absolute bottom-16 md:bottom-20 left-6 md:left-12 text-white">
        <h1 className="font-light leading-none tracking-tight"
          style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(52px, 11vw, 140px)", animation: "fadeUp 1.2s ease 0.3s both" }}>
          LIGHT<br /><em style={{ fontStyle: "italic" }}>Coffee</em><br />DESSERT
        </h1>
        <p className="mt-5 text-[10px] md:text-[11px] tracking-[0.4em] uppercase opacity-80" style={{ animation: "fadeUp 1.2s ease 0.8s both" }}>
          Open daily &nbsp;·&nbsp; Handcrafted with care
        </p>
      </div>
      <div className="absolute bottom-20 right-6 md:right-12 text-white hidden md:flex flex-col items-center gap-3"
        style={{ animation: "fadeIn 1.2s ease 1.5s both", writingMode: "vertical-rl" }}>
        <span className="block w-px bg-white" style={{ height: "48px", animation: "lineGrow 1s ease 1.8s both", transformOrigin: "top" }} />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-70">Scroll</span>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1.0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { to { opacity: 0.7; } }
        @keyframes lineGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      `}</style>
    </section>
  );
}

// SPLIT SECTION (Coffee / Space)
function SplitSection({ id, imgSrc, imgAlt, label, title, desc, reverse = false, bg = "bg-white" }) {
  return (
    <section id={id} className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} min-h-screen`}>
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden">
        <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
      </div>
      <div className={`w-full md:w-1/2 flex flex-col justify-end px-8 py-14 md:px-16 md:py-20 ${bg}`}>
        <Reveal>
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-5">{label}</p>
          <h2 className="font-light leading-none tracking-tight text-stone-900"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(56px, 7vw, 120px)" }}>
            {title}
          </h2>
          <p className="mt-8 text-[13px] leading-relaxed text-stone-400 max-w-xs border-t border-stone-100 pt-6">{desc}</p>
        </Reveal>
      </div>
    </section>
  );
}

// COFFEE SECTION — swipe through signature cups
const COFFEE_ITEMS = [
  { img: IMGS.latte,            name: "Craft Coffee",      note: "Espresso pulled with intention, finished with a quiet pour of milk.", price: "¥600" },
  { img: IMGS.caramelMacchiato, name: "Caramel Macchiato", note: "Velvety espresso, steamed milk, and a ribbon of caramel.", price: "¥650" },
  { img: IMGS.americano,        name: "Americano",          note: "Espresso opened with hot water for a clean, quiet finish.", price: "¥500" },
  { img: IMGS.iceLatte,         name: "Ice Latte",          note: "Chilled espresso and milk, smooth over ice.", price: "¥600" },
];

function CoffeeSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);
  const accRef = useRef(0);
  const sectionRef = useRef(null);

  const goTo = useCallback((next, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setDirection(null);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const prev = useCallback(() => goTo((index - 1 + COFFEE_ITEMS.length) % COFFEE_ITEMS.length, "right"), [goTo, index]);
  const next = useCallback(() => goTo((index + 1) % COFFEE_ITEMS.length, "left"), [goTo, index]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer = null;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      accRef.current += e.deltaX;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (accRef.current > 40) next();
        else if (accRef.current < -40) prev();
        accRef.current = 0;
      }, 80);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx > 40) next();
    else if (dx < -40) prev();
    touchStartX.current = null;
  };

  const item = COFFEE_ITEMS[index];
  const imgSlideIn  = direction === "left"  ? "translate-x-8 opacity-0"  : direction === "right" ? "-translate-x-8 opacity-0" : "translate-x-0 opacity-100";
  const textSlideIn = direction === "left"  ? "translate-x-4 opacity-0"  : direction === "right" ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100";

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="flex flex-col md:flex-row min-h-screen select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden bg-stone-100">
        <img
          key={index}
          src={item.img}
          alt={item.name}
          className={`w-full h-full object-cover transition-all duration-400 ease-out ${imgSlideIn}`}
          style={{ transition: "transform 0.4s ease, opacity 0.4s ease" }}
        />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {COFFEE_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? "left" : "right")}
              className={`rounded-full transition-all duration-300 ${i === index ? "bg-white w-5 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
              aria-label={`Go to ${COFFEE_ITEMS[i].name}`}
            />
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200 text-white"
          aria-label="Previous coffee"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200 text-white"
          aria-label="Next coffee"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-end px-8 py-14 md:px-16 md:py-20 bg-white">
        <div
          key={`coffee-text-${index}`}
          className={`transition-all duration-400 ease-out ${textSlideIn}`}
          style={{ transition: "transform 0.4s ease, opacity 0.4s ease" }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-5">01 — Craft</p>
          <h2 className="font-light leading-none tracking-tight text-stone-900"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(44px, 6vw, 100px)" }}>
            {item.name}
          </h2>
          <p className="mt-8 text-[13px] leading-relaxed text-stone-400 max-w-xs border-t border-stone-100 pt-6">
            {item.note}
          </p>
          <p className="mt-4 text-[12px] tracking-[0.3em] text-stone-300">{item.price}</p>

          <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-stone-300 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
            Swipe or scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}

// DESSERT SECTION — trackpad/swipe to change photo
const DESSERT_ITEMS = [
  { img: IMGS.tiramisu,  name: "Tiramisu",       note: "Mascarpone cream & espresso-soaked ladyfingers", price: "¥650" },
  { img: IMGS.choco,     name: "Chocolate Cake",  note: "Rich chocolate sponge with creamy chocolate mousse", price: "¥600" },
  { img: IMGS.montblanc, name: "Mont Blanc",      note: "Chestnut cream over sponge cake with a hint of sweetness", price: "¥650" },
];

function DessertSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null); // "left" | "right"
  const [animating, setAnimating] = useState(false);
  const accRef = useRef(0);
  const sectionRef = useRef(null);

  const goTo = useCallback((next, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setDirection(null);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const prev = useCallback(() => goTo((index - 1 + DESSERT_ITEMS.length) % DESSERT_ITEMS.length, "right"), [goTo, index]);
  const next = useCallback(() => goTo((index + 1) % DESSERT_ITEMS.length, "left"), [goTo, index]);

  // Trackpad horizontal scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer = null;

    const onWheel = (e) => {
      // Only hijack horizontal scroll (trackpad swipe)
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      accRef.current += e.deltaX;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (accRef.current > 40) next();
        else if (accRef.current < -40) prev();
        accRef.current = 0;
      }, 80);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  // Touch swipe
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx > 40) next();
    else if (dx < -40) prev();
    touchStartX.current = null;
  };

  const item = DESSERT_ITEMS[index];

  // slide direction classes
  const imgSlideIn  = direction === "left"  ? "translate-x-8 opacity-0"  : direction === "right" ? "-translate-x-8 opacity-0" : "translate-x-0 opacity-100";
  const textSlideIn = direction === "left"  ? "translate-x-4 opacity-0"  : direction === "right" ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100";

  return (
    <section
      id="dessert"
      ref={sectionRef}
      className="flex flex-col md:flex-row-reverse min-h-screen select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Photo side */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden bg-stone-100">
        <img
          key={index}
          src={item.img}
          alt={item.name}
          className={`w-full h-full object-cover transition-all duration-400 ease-out ${imgSlideIn}`}
          style={{ transition: "transform 0.4s ease, opacity 0.4s ease" }}
        />

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {DESSERT_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? "left" : "right")}
              className={`rounded-full transition-all duration-300 ${i === index ? "bg-white w-5 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
              aria-label={`Go to ${DESSERT_ITEMS[i].name}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200 text-white"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-200 text-white"
          aria-label="Next"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Text side */}
      <div className="w-full md:w-1/2 flex flex-col justify-end px-8 py-14 md:px-16 md:py-20 bg-stone-50">
        <div
          key={`text-${index}`}
          className={`transition-all duration-400 ease-out ${textSlideIn}`}
          style={{ transition: "transform 0.4s ease, opacity 0.4s ease" }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-5">02 — Sweet</p>
          <h2 className="font-light leading-none tracking-tight text-stone-900"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(44px, 6vw, 100px)" }}>
            {item.name}
          </h2>
          <p className="mt-8 text-[13px] leading-relaxed text-stone-400 max-w-xs border-t border-stone-100 pt-6">
            {item.note}
          </p>
          <p className="mt-4 text-[12px] tracking-[0.3em] text-stone-300">{item.price}</p>

          {/* Swipe hint */}
          <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-stone-300 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
            Swipe or scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}

// ATMOSPHERE
function Atmosphere() {
  return (
    <section id="location" className="relative h-[70vh] md:h-screen overflow-hidden">
      <img src={IMGS.exterior} alt="Exterior" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
        <Reveal>
          <div className="text-center text-white px-6">
            <p className="text-[10px] md:text-[11px] tracking-[0.6em] uppercase opacity-75 mb-5">Where time slows down</p>
            <h2 className="font-light leading-snug"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 6vw, 80px)", fontStyle: "italic" }}>
              A place to<br />just be.
            </h2>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// MENU
function MenuSection() {
  const [lightbox, setLightbox] = useState(false);
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setLightbox(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <section id="menu" className="px-6 md:px-12 py-24 md:py-40 bg-white">
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-20 border-b border-stone-100 pb-8 gap-4">
            <h2 className="font-light tracking-tight text-stone-900"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(48px, 6vw, 80px)" }}>
              Menu
            </h2>
            <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase">Tap to enlarge</p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="cursor-zoom-in overflow-hidden block w-full md:max-w-6xl md:mx-auto" onClick={() => setLightbox(true)}>
            <picture>
              <source media="(min-width: 768px)" srcSet={IMGS.menuDesktop} />
              <img src={IMGS.menu} alt="Full Menu" className="w-full transition-transform duration-700 hover:scale-[1.02]" />
            </picture>
          </div>
          <p className="mt-6 text-[11px] tracking-[0.2em] text-stone-300 uppercase">Tax included · Prices may change seasonally</p>
        </Reveal>
      </section>
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-8 text-white text-[11px] tracking-[0.3em] uppercase hover:opacity-60 transition-opacity" onClick={() => setLightbox(false)}>Close</button>
          <picture onClick={(e) => e.stopPropagation()}>
            <source media="(min-width: 768px)" srcSet={IMGS.menuDesktop} />
            <img src={IMGS.menu} alt="Menu" className="max-w-full max-h-[90vh] object-contain" />
          </picture>
        </div>
      )}
    </>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="border-t border-stone-100 px-6 md:px-12 py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-end">
        <div className="font-light text-stone-900" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3vw, 40px)" }}>
          SUNLIGHT<br />& COFFEE
        </div>
        <div className="flex flex-col gap-4">
          {[{ label: "Instagram", href: "https://instagram.com", icon: true }, { label: "Location", href: "#location" }, { label: "Reservations", href: "#" }].map(({ label, href, icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-stone-900 hover:text-stone-400 transition-colors w-fit">
              {icon && <InstagramIcon className="w-3.5 h-3.5" />}{label}
            </a>
          ))}
        </div>
        <div className="text-[11px] tracking-[0.2em] text-stone-400 uppercase leading-loose md:text-right">
          Open Daily<br />9AM — 10PM<br /><br />Coffee · Food · Sweets<br />& Good Days
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-stone-50 flex justify-between text-[10px] tracking-[0.2em] text-stone-200 uppercase">
        <span>© 2026 Sunlight & Coffee</span>
        <span>Light · Coffee · Dessert</span>
      </div>
    </footer>
  );
}

// APP
export default function App() {
  return (
    <div className="bg-white text-stone-900" >
      <Nav />
      <Hero />
      <CoffeeSection />
      <DessertSection />
      <Atmosphere />
      <SplitSection
        id="space"
        imgSrc={IMGS.interior2}
        imgAlt="Interior"
        label="03 — Space"
        title="THE ROOM"
        desc="Concrete, wood, and light. A space designed to disappear into."
        bg="bg-stone-50"
      />
      <MenuSection />
      <Footer />
    </div>
  );
}
