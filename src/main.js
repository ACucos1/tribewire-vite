import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Lenis from '@studio-freight/lenis'
import './styles/style.css'

function animate() {
  let tl = gsap.timeline()
  let els = document.querySelectorAll(".hero-container > *")
  tl.fromTo([els[0], els[1]], {opacity: 0, autoAlpha: 0, y: "200px"}, {y: 0, opacity: 1, autoAlpha: 1, duration: 1, delay: 2, stagger: 0.1})
  .add("start", "+=0")
  .from([els[2], els[3]], {width: 0, duration: 0.5}, "start")

  tl.from(".word-wrapper h1", {y: "200px", duration: 0.5, stagger: 0.1})
  let svg = document.querySelectorAll("#featured-wrapper svg")
  let featuredScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: svg,
    start: "bottom center",
    end: "2000% top",
    pin: '.featured-section',
    scrub: true,
    markers: false
  }})
  .to(svg, {strokeDasharray: "100, 0, 200, 0"})
  .add("afterStroke", "+=0").to("#rect2, #rect3, #rect6, #rect8", {width: 0, stagger: .5}, "afterStroke")
  .to("#rect1, #rect4, #rect5, #rect7", {height: 0, stagger: .5}, "afterStroke")
  .fromTo(".featured-project", {y: 200, opacity: 0, autoAlpha: 1}, {y: 0, opacity: 1, autoAlpha: 1, stagger: .5 }, "afterStroke+=0")


  let stills = document.querySelector(".stills-text-img")
  let stillsScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: stills,
    start: "center center",
    end: "100% top",
    pin: ".stills-section",
    id: 'stills-pin',
    scrub: true,
    markers: false
  }}).fromTo(".img1",
            {y:300, opacity: 0, autoAlpha: 0}, 
            {y: 0, opacity: 1, autoAlpha: 1})
      .add("entrance", "+= 0")
      .fromTo(".img2", {y:200,opacity: 0, autoAlpha: 0}, 
            {y: 0, opacity: 1, autoAlpha: 1}, "entrance+=0.1")
      .fromTo(".img3", {y:400,opacity: 0, autoAlpha: 0}, 
            {y: 0, opacity: 1, autoAlpha: 1}, "entrance+=0.2")
      // .to(".stills-img-wrapper", {y: "-100%"}, "entrance")

  let motion = document.querySelector(".motion-section")
  gsap.set("#motion-svg-text", {
    transformOrigin: "center center"
  });

  let motionScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: motion,
    start: "center center",
    end: "300% top",
    pin: '.motion-section',
    id: "motion-pin",
    scrub: true,
    markers: false
  }}).fromTo("#motion-svg-text", { scale: 20 }, { scale: 1})

  let aerials = document.querySelector(".aerials svg")
  let skyline = document.querySelector(".skyline svg")
  let aerialsScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: aerials,
    start: "center center",
    end: "500% top",
    pin:'.aerials-section',
    id: "aerials",
    scrub: true,
    markers: false
  }})
  .fromTo(aerials, 
      { strokeDasharray: "100, 0, 200, 0"},
      { strokeDasharray: "0, 1400, 0, 0"})
  .add("start", "+=0")
  .fromTo(skyline, 
  { strokeDasharray: "0, 1400, 0, 0", opacity: 0, autoAlpha: 0},
  { strokeDasharray: "100, 0, 200, 0", opacity: 1, autoAlpha: 1}, "start+=0")
  .fromTo(skyline,
  {scale: 1}, {scale: 0.8}, "start+=0.1")
  

}




// Initialize Lenis (smooth scroll)
const lenis = new Lenis({duration: 1.2})
function raf(time) {
  lenis.raf(time)
  ScrollTrigger.update();
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


if(document.readyState !== 'loading'){
  init()
}
else {
  document.addEventListener("DOMContentLoaded", (e) => {
    init()
  })
}
 	
function init() {
  animate()
}