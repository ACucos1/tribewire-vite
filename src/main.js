import { gsap, Bounce, Power1, Power2, Power3, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Swup from "swup";
import SwupJsPlugin from "@swup/js-plugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
import Lenis from "@studio-freight/lenis";
import "./styles/style.scss";

let entranceTl;
let burgerOpenTl;
let menuOpenTl;
let menuOpen = false;
let burgerEventListenereAttached = false;
let textTranslateTl;

function sanitizeLightboxHrefs() {
  const els = document.querySelectorAll(".lightbox-link");
  els.forEach((el) => {
    el.href = "javascript:void(0)";
  });
}

function entranceAnimation() {
  if (window.location.pathname == "/") {
    let heroText = document.querySelector(".title-wrapper .text-block");
    console.log(heroText.textContent);
    let heroImage = document.querySelector(".hero-image");
    entranceTl = gsap.timeline({ paused: true }).fromTo(
      [heroText, heroImage],
      { opacity: 0, scale: 1.2, filter: "blur(10px)" },
      {
        filter: "blur(0px)",
        opacity: 1,
        stagger: 0.05,
        scale: 1,
        duration: 1,
        ease: Power2.easeInOut,
        delay: 0.5,
      }
    );

    entranceTl.play();
  }
}

function indexScrollTriggerInit() {
  if (window.location.pathname == "/") {
    // Featured Animation
    let svg = document.querySelector("#featured-wrapper svg");
    let featuredScrollTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: svg,
          start: "145% center",
          end: "2000% top",
          pin: ".featured-section",
          scrub: true,
          markers: false,
          id: "featured-pin",
        },
      })
      .to(svg, { strokeDasharray: "100, 0, 200, 0" })
      .add("afterStroke", "+=0")
      .to(
        "#rect2, #rect3, #rect6, #rect8",
        { width: 0, stagger: 0.25 },
        "afterStroke"
      )
      .to(
        "#rect1, #rect4, #rect5, #rect7",
        { height: 0, stagger: 0.25 },
        "afterStroke"
      )
      .fromTo(
        ".featured-project",
        { y: 200, opacity: 0, autoAlpha: 1 },
        { y: 0, opacity: 1, autoAlpha: 1, stagger: 0.5 },
        "afterStroke+=0"
      )
      .fromTo(
        ".featured-project-label",
        { y: 50, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, stagger: 0.5 },
        "afterStroke+=0"
      );

    // Stills Animation
    let stills = document.querySelector(".stills-text-img");
    let stillsScrollTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: stills,
          start: "center center",
          end: "100% top",
          pin: ".stills-section",
          id: "stills-pin",
          scrub: true,
          markers: false,
        },
      })
      .fromTo(
        ".img1",
        { y: 300, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1 }
      )
      .add("entrance", "+= 0")
      .fromTo(
        ".img2",
        { y: 200, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1 },
        "entrance+=0.1"
      )
      .fromTo(
        ".img3",
        { y: 400, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1 },
        "entrance+=0.2"
      );
    // .to(".stills-img-wrapper", {y: "-100%"}, "entrance")

    // Motion Animation
    let motion = document.querySelector(".motion-section");
    gsap.set("#motion-svg-text", {
      transformOrigin: "center center",
    });

    let motionScrollTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: motion,
          start: "center center",
          end: "300% top",
          pin: ".motion-section",
          id: "motion-pin",
          scrub: true,
          markers: false,
        },
      })
      .fromTo("#motion-svg-text", { scale: 40 }, { scale: 1 });

    // Aerials Animation
    setTimeout(() => {
      let aerials = document.querySelector(".aerials svg");
      let skyline = document.querySelector(".skyline svg");
      let aerialsScrollTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: aerials,
            start: "center center",
            end: "400% top",
            pin: ".aerials-section",
            id: "aerials-pin",
            scrub: true,
            markers: false,
          },
        })
        .fromTo(
          aerials,
          { strokeDasharray: "100, 0, 200, 0" },
          { strokeDasharray: "0, 1400, 0, 0" }
        )
        .add("start", "+=0")
        .fromTo(
          skyline,
          { strokeDasharray: "0, 1400, 0, 0", opacity: 0, autoAlpha: 0 },
          { strokeDasharray: "100, 0, 200, 0", opacity: 1, autoAlpha: 1 },
          "start+=0"
        )
        .fromTo(skyline, { scale: 1 }, { scale: 0.8 }, "start+=0.1");
    }, 1000);
  }

  // Footer Animation
  const footer = document.querySelector(".footer");
  const footerTribewireLogo = document.querySelector(
    "#gradient-tribewire-wrapper svg"
  );
  const footerMediaLogo = document.querySelector("#gradient-media-wrapper svg");

  footerTribewireLogo &&
    footerMediaLogo &&
    gsap.set([footerTribewireLogo, footerMediaLogo], {
      strokeDasharray: "0 1400 0 0",
    });
  let logoAnimation = gsap
    .timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top center",
        end: "400% top",
        // markers: false,
      },
    })
    .to([footerTribewireLogo, footerMediaLogo], {
      strokeDasharray: "100, 0 200, 0",
      duration: 2,
    });
}

function cursorInteractions() {
  // Add general mousemove

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX - window.innerWidth / 2,
      y: e.clientY - window.innerHeight / 2,
      // duration: 0.5,
      ease: Power1.easeOut,
    });
    gsap.to(cursor.querySelector("#drone-wrapper svg"), {
      rotation: e.movementX > 0 ? 15 : -15,
      ease: Power1.easeOut,
      onComplete: () => {
        gsap.to(cursor.querySelector("#drone-wrapper svg"), {
          rotation: 0,
          ease: Power1.easeOut,
        });
      },
    });
  });

  // Menu
  // let menuOpen = false;
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu-link");
  const burger = document.querySelector(".burger-wrapper");
  const burgerBars = burger.querySelectorAll(".burger-bar");
  burgerOpenTl = gsap
    .timeline({ paused: true })
    .to([burgerBars[0], burgerBars[2]], {
      top: "50%",
      y: "-50%",
      duration: 0.3,
    })
    .add("translate", "+=0")
    .to(burgerBars[0], { rotate: 45, duration: 0.1 }, "translate+=0")
    .to(
      [burgerBars[1], burgerBars[2]],
      { rotate: -45, duration: 0.1 },
      "translate+=0"
    );

  menuOpenTl = gsap.timeline({ paused: true }).to(menu, {
    y: 0,
    duration: 0.3,
  });
  textTranslateTl = gsap.timeline({ paused: true }).fromTo(
    menuLinks,
    {
      y: 300,
    },
    { y: 0, delay: 0.2, duration: 0.3, ease: Power1.easeOut }
  );

  if (burgerEventListenereAttached == false) {
    burgerEventListenereAttached = true;
    burger.addEventListener("click", () => {
      console.log(`menuOpen: ${menuOpen}`);
      if (menuOpen == false) {
        burgerOpenTl.play();
        menuOpenTl.play();
        textTranslateTl.play();
      } else {
        burgerOpenTl.reverse(0.5, false);
        menuOpenTl.reverse();
        textTranslateTl.reverse();
      }

      menuOpen = !menuOpen;
    });
  }

  // Link Interactions
  const cursorInteractiveEls = document.querySelectorAll(".cursor-interact");
  const cursorArrow = document.querySelector(".cursor .arrow");
  const cursorIgnoreEls = document.querySelectorAll(".cursor-ignore");
  const cursor = document.querySelector(".cursor");
  cursorInteractiveEls.forEach((el) => {
    el.addEventListener("mouseover", () => {
      document.querySelector(".cursor-wrap").style.mixBlendMode = "difference";
      gsap.to(cursor, { height: 125, width: 125, ease: Bounce.easeOut });
      gsap.to(cursor.querySelector(".point"), {
        height: 125,
        width: 125,
        duration: 0.2,
      });
      gsap.to(cursorArrow, {
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        ease: Bounce.easeOut,
      });
    });
    el.addEventListener("mouseout", () => {
      document.querySelector(".cursor-wrap").style.mixBlendMode = "normal";
      gsap.to(cursor, { height: 75, width: 75, ease: Bounce.easeOut });
      gsap.to(cursor.querySelector(".point"), {
        height: 10,
        width: 10,
        duration: 0.2,
      });
      gsap.to(cursorArrow, {
        opacity: 0,
        autoAlpha: 0,
        scale: 0,
        ease: Power1.easeOut,
      });
    });
  });

  cursorIgnoreEls.forEach((el) => {
    el.addEventListener("mouseover", () => {
      console.log("Ignoring Cursor");
      gsap.to(cursor, { opacity: 0, autoAlpha: 0, duration: 0.3 });
    });
    el.addEventListener("mouseout", () => {
      gsap.to(cursor, { opacity: 1, autoAlpha: 1, duration: 0.3 });
    });
  });

  const drone = document.querySelectorAll("#drone-wrapper svg path");
  gsap.set(drone, {
    strokeDasharray: "0, 1400, 0, 0",
  });
  gsap.set("#drone-wrapper svg", {
    opacity: 0,
    autoAlpha: 0,
  });
  if (window.location.pathname == "/") {
    // Section Interactions
    const skyline = document.querySelector("#skyline-wrapper svg");

    skyline &&
      skyline.addEventListener("mouseenter", () => {
        gsap.to("#drone-wrapper svg", {
          opacity: 1,
          autoAlpha: 1,
          ease: Power1.easeOut,
        });
        gsap.to(drone, {
          strokeDasharray: "100, 0, 200, 0",
          duration: 1,
          ease: Power1.easeOut,
        });
        gsap.to(cursor, { width: 250, height: 250, ease: Bounce.easeOut });
      });
    skyline &&
      skyline.addEventListener("mouseleave", () => {
        gsap.to("#drone-wrapper svg", {
          opacity: 0,
          autoAlpha: 0,
          ease: Power1.easeOut,
        });
        gsap.to(drone, {
          strokeDasharray: "0, 1400, 0, 0",
          duration: 1,
          ease: Power1.easeOut,
        });

        gsap.to(cursor, { width: 75, height: 75, ease: Bounce.easeOut });
      });

    // Stills Section
    const stillsSection = document.querySelector(".stills-section");
    const backgroundImages = document.querySelectorAll(".cursor-img");
    // backgroundImages[0].classList.add("active");
    gsap.set(backgroundImages, { opacity: 0, autoAlpha: 0 });

    let gindex = 0,
      last = { x: 0, y: 0 };
    stillsSection.addEventListener("mousemove", (e) => {
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) > 100) {
        let image = backgroundImages[gindex % backgroundImages.length];
        let prevImage =
          backgroundImages[(gindex - 1) % backgroundImages.length];
        image.classList.add("active");
        if (prevImage) prevImage.classList.remove("active");
        gindex++;
        last.x = e.clientX;
        last.y = e.clientY;
      }
    });

    stillsSection.addEventListener("mouseenter", () => {
      document.querySelector(".cursor-wrap").style.mixBlendMode = "normal";
      gsap.to(cursor, {
        width: 200,
        height: 300,
        borderRadius: 0,
        ease: Bounce.easeOut,
      });

      gsap.to(cursorArrow, {
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        delay: 0.2,
        ease: Bounce.easeOut,
      });

      gsap.to(backgroundImages, {
        opacity: 1,
        autoAlpha: 1,
        // scale: 1,
        width: 202,
        height: 298,
        borderRadius: 0,
        ease: Power1.easeOut,
      });
    });

    stillsSection.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        width: 75,
        height: 75,
        borderRadius: "100%",
        ease: Bounce.easeOut,
      });

      gsap.to(cursorArrow, {
        opacity: 0,
        autoAlpha: 0,
        scale: 0,
        ease: Power1.easeInOut,
      });

      gsap.to(backgroundImages, {
        opacity: 0,
        // scale: 0,
        height: 0,
        width: 0,
        autoAlpha: 0,
        borderRadius: "100%",
        ease: Power1.easeOut,
      });
    });
  }
}

function swupSetup() {
  return new Swup({
    animateHistoryBrowsing: true,
    plugins: [
      new SwupJsPlugin({
        animations: [
          {
            from: "(.*)",
            to: "(.*)",
            out: (done) => {
              lenis.stop();
              // const container = document.querySelector("#swup");
              const wiper1 = document.querySelector(".wiper1");
              const wiper2 = document.querySelector(".wiper2");
              // container.style.opacity = 1;
              gsap.set([wiper1, wiper2], {
                x: "-100%",
              });
              gsap.to([wiper1, wiper2], {
                x: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: Power1.ease,
                onComplete: () => {
                  lenis.start();
                  done();
                },
              });
            },
            in: (done) => {
              // const container = document.querySelector("#swup");
              const wiper1 = document.querySelector(".wiper1");
              const wiper2 = document.querySelector(".wiper2");

              gsap.set([wiper1, wiper2], {
                x: 0,
              });

              gsap.to([wiper2, wiper1], {
                x: "100%",
                stagger: 0.05,
                duration: 0.3,
                ease: Power1.ease,
                onComplete: done,
              });
            },
          },
        ],
      }),
    ],
  });
}

function restartWebflow() {
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
}

const indexSvgs = [
  {
    target: "#featured-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/featured.html",
  },
  {
    target: "#skyline-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/torontoskyline.html",
  },
];

const footerSvgs = [
  {
    target: "#gradient-tribewire-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/gradient-tribewire.html",
  },
  {
    target: "#gradient-media-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/gradient-media.html",
  },
];

async function fetchSVG(targetId, url) {
  const target = document.querySelector(targetId);
  const data = await fetch(url);
  const html = await data.text();
  target.innerHTML = html;
  console.log("SVG Injected");
}

async function fetchSvgs(svgs) {
  const promises = svgs.map((svg) => fetchSVG(svg.target, svg.url));
  await Promise.all(promises);
}

const lenis = new Lenis({ duration: 1.2 });
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

async function init() {
  if (window.location.pathname == "/") entranceAnimation();
  if (window.location.pathname == "/") await fetchSvgs(indexSvgs);
  await fetchSvgs(footerSvgs);
  indexScrollTriggerInit();
  cursorInteractions();
  sanitizeLightboxHrefs();
  const swup = swupSetup();

  swup.hooks.on("page:view", async () => {
    console.log("Page Changed. Initializing Scroll Triggers...");
    if (window.location.pathname == "/") {
      await fetchSvgs(indexSvgs);
    }
    burgerOpenTl.kill();
    menuOpenTl.kill();
    indexScrollTriggerInit();
    cursorInteractions();
    sanitizeLightboxHrefs();
    restartWebflow();
  });

  swup.hooks.on(
    "content:replace",
    () => {
      if (menuOpen) {
        burgerOpenTl.revert();
        menuOpenTl.revert();
        menuOpen = false;
      }
      ScrollTrigger.getAll().forEach((st) => {
        st.kill();
      });
    },
    { before: true }
  );
}

// Initialize Lenis (smooth scroll)

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", (e) => {
    init();
  });
}
