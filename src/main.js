import { gsap, Bounce, Power1 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "@studio-freight/lenis";
import "./styles/style.scss";

function animate() {
  let tl = gsap.timeline();
  let els = document.querySelectorAll(".hero-container > *");
  tl.fromTo(
    [els[0], els[1]],
    { opacity: 0, autoAlpha: 0, y: "200px" },
    { y: 0, opacity: 1, autoAlpha: 1, duration: 1, delay: 2, stagger: 0.1 }
  )
    .add("start", "+=0")
    .from([els[2], els[3]], { width: 0, duration: 0.5 }, "start");

  tl.from(".word-wrapper h1", { y: "200px", duration: 0.5, stagger: 0.1 });
  let svg = document.querySelectorAll("#featured-wrapper svg");
  let featuredScrollTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: svg,
        start: "bottom center",
        end: "2000% top",
        pin: ".featured-section",
        scrub: true,
        markers: false,
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

  let aerials = document.querySelector(".aerials svg");
  let skyline = document.querySelector(".skyline svg");
  let aerialsScrollTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: aerials,
        start: "center center",
        end: "400% top",
        pin: ".aerials-section",
        id: "aerials",
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

  const footer = document.querySelector(".footer");
  const footerTribewireLogo = document.querySelector(
    "#gradient-tribewire-wrapper svg"
  );
  const footerMediaLogo = document.querySelector("#gradient-media-wrapper svg");

  gsap.set([footerTribewireLogo, footerMediaLogo], {
    strokeDasharray: "0 1400 0 0",
  });
  let logoAnimation = gsap
    .timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top center",
        end: "400% top",
        // markers: true,
      },
    })
    .to([footerTribewireLogo, footerMediaLogo], {
      strokeDasharray: "100, 0 200, 0",
      duration: 2,
    });
}

function cursorBind() {
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

  // Section Interactions
  const skyline = document.querySelector("#skyline-wrapper svg");
  const drone = document.querySelectorAll("#drone-wrapper svg path");
  gsap.set(drone, {
    strokeDasharray: "0, 1400, 0, 0",
  });
  gsap.set("#drone-wrapper svg", {
    opacity: 0,
    autoAlpha: 0,
  });
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
      let prevImage = backgroundImages[(gindex - 1) % backgroundImages.length];
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

// Initialize Lenis (smooth scroll)
const lenis = new Lenis({ duration: 1.2 });
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", (e) => {
    init();
  });
}

function init() {
  animate();
  cursorBind();
}
