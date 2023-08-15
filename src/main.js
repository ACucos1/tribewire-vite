import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Lenis from '@studio-freight/lenis'
import './styles/style.css'

function animate() {

  let tl = gsap.timeline()
  let els = document.querySelectorAll(".hero-container > *")
  console.log(els)
  tl.fromTo([els[0], els[1]], {opacity: 0, autoAlpha: 0, y: "200px"}, {y: 0, opacity: 1, autoAlpha: 1, duration: 1, delay: 2, stagger: 0.1})
  .add("start", "+=0")
  .from([els[2], els[3]], {width: 0, duration: 0.5}, "start")

tl.from(".word-wrapper h1", {y: "200px", duration: 0.5, stagger: 0.1})
  console.log("loaded!");
  let svg = document.querySelectorAll("#featured-wrapper svg")
  let featuredScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: svg,
    start: "bottom center",
    end: "3500% top",
    pin: '.featured-section',
    scrub: true,
    markers: false
  }})
  .to(svg, {strokeDasharray: "100, 0, 200, 0"})
  .add("afterStroke").to("#rect2, #rect3, #rect6, #rect8", {width: 0, stagger: .5}, "afterStroke")
  .to("#rect1, #rect4, #rect5, #rect7", {height: 0, stagger: .5}, "afterStroke")
  .fromTo(".featured-project", {y: 200, opacity: 0, autoAlpha: 1}, {y: 0, opacity: 1, autoAlpha: 1, stagger: .5 })


  let stills = document.querySelector(".stills-text-img")
  let stillsScrollTl = gsap.timeline({ scrollTrigger: {
    trigger: stills,
    start: "center center",
    end: "600% top",
    pin: ".stills-section",
    id: 'stills-pin',
    scrub: true,
    markers: true
  }}).fromTo(".still-img",
            {y: 200, opacity: 0, autoAlpha: 0}, 
            {y: -200, opacity: 1, autoAlpha: 1, stagger: .1})
      .add("entrance", "+= 0")
      // .to(".stills-img-wrapper", {y: "-100%"}, "entrance")
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
  animate()
}
else {
  document.addEventListener("DOMContentLoaded", (e) => {
    animate()
  })
}
 	