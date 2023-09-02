import { gsap, Bounce, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Swup from "swup";
import SwupJsPlugin from "@swup/js-plugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
import Lenis from "@studio-freight/lenis";
import "./styles/style.scss";

function indexScrollTriggerInit() {
  if (window.location.pathname == "/") {
    // Featured Animation
    let svg = document.querySelector("#featured-wrapper svg");
    let featuredScrollTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: svg,
          start: "bottom center",
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
        { width: 0, stagger: 0.5 },
        "afterStroke"
      )
      .to(
        "#rect1, #rect4, #rect5, #rect7",
        { height: 0, stagger: 0.5 },
        "afterStroke"
      )
      .fromTo(
        ".featured-project",
        { y: 200, opacity: 0, autoAlpha: 1 },
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
      .fromTo("#motion-svg-text", { scale: 20 }, { scale: 1 });

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
      // duration: 1,
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
  let menuOpen = false;
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu-link");
  const burger = document.querySelector(".burger-wrapper");
  const burgerBars = burger.querySelectorAll(".burger-bar");
  const burgerTl = gsap
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
    )
    .to(
      menu,
      {
        y: 0,
      },
      "translate-=0.3"
    )
    .fromTo(
      menuLinks,
      {
        y: 120,
      },
      { y: 0, stagger: 0.1 },
      "translate+=0"
    );

  burger.addEventListener("click", () => {
    menuOpen == false ? burgerTl.play() : burgerTl.reverse();
    menuOpen = !menuOpen;
  });

  // Link Interactions
  const cursorInteractiveEls = document.querySelectorAll(".cursor-interact");
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
    });
    el.addEventListener("mouseout", () => {
      document.querySelector(".cursor-wrap").style.mixBlendMode = "normal";
      gsap.to(cursor, { height: 75, width: 75, ease: Bounce.easeOut });
      gsap.to(cursor.querySelector(".point"), {
        height: 10,
        width: 10,
        duration: 0.2,
      });
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
        gsap.to(cursor, { width: 0, height: 0, ease: Bounce.easeOut });
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
              // const container = document.querySelector("#swup");
              const wiper1 = document.querySelector(".wiper1");
              const wiper2 = document.querySelector(".wiper2");
              // container.style.opacity = 1;
              gsap.set([wiper1, wiper2], {
                x: "-100%",
              });
              gsap.to([wiper1, wiper2], {
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                onComplete: done,
              });
            },
            in: (done) => {
              // const container = document.querySelector("#swup");
              const wiper1 = document.querySelector(".wiper1");
              const wiper2 = document.querySelector(".wiper2");

              gsap.set([wiper1, wiper2], {
                x: 0,
              });

              gsap.to([wiper1, wiper2], {
                x: "100%",
                stagger: 0.1,
                duration: 0.5,
                onComplete: done,
              });
            },
          },
        ],
      }),
    ],
  });
}

const svgs = [
  {
    target: "#featured-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/featured.html",
  },
  {
    target: "#skyline-wrapper",
    url: "https://raw.githubusercontent.com/ACucos1/Tribewire/main/torontoskyline.html",
  },
];

async function fetchSVG(targetId, url) {
  const target = document.querySelector(targetId);
  const data = await fetch(url);
  const html = await data.text();
  target.innerHTML = html;
  console.log("SVG Injected");
}

async function fetchAllSvgs(svgs) {
  const promises = svgs.map((svg) => fetchSVG(svg.target, svg.url));
  await Promise.all(promises);
}

async function init() {
  if (window.location.pathname == "/") await fetchAllSvgs(svgs);
  indexScrollTriggerInit();
  cursorInteractions();

  const swup = swupSetup();

  swup.hooks.on("page:view", async () => {
    console.log("Page Changed. Initializing Scroll Triggers...");
    if (window.location.pathname == "/") {
      await fetchAllSvgs(svgs);
    }
    indexScrollTriggerInit();
    cursorInteractions();
  });

  swup.hooks.on(
    "content:replace",
    () => {
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

const lenis = new Lenis({ duration: 1.2 });
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
