import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";
import SplitType from "split-type";
import Swiper from "swiper";
import wrapLines from "../utils/utils";
import listHover from "../utils/listHover";
import navLinksHadler from "../utils/navLinksHandler";
import scramble from "../utils/scrambleText";
gsap.registerPlugin(Flip, ScrambleTextPlugin);
let mm = gsap.matchMedia();

document.addEventListener("DOMContentLoaded", () => {
  //Hovers
  mm.add("(hover:hover)", () => {
    navLinksHadler();

    //Projects and Blog list hover
    const listItems = document.querySelectorAll(".nav-list_wrapper");
    listItems.forEach((list) => {
      listHover(list);
    });

    //Inline links hover
    const inlineLinks = document.querySelectorAll(".inline-link");
    inlineLinks.forEach((link) => {
      const textItem = link.querySelector(".inline-link_text");
      const text = textItem.textContent;

      link.addEventListener("mouseover", () => {
        setTimeout(() => {
          scramble(textItem, "Send message");
        }, 150);
      });
      link.addEventListener("mouseleave", () => {
        setTimeout(() => {
          scramble(textItem, text);
        }, 150);
      });
    });
  });

  //Track when web font will be loaded
  document.fonts
    .load('1em "Jetbrainsmono"')
    .then(function () {
      mm.add("(min-width: 992px)", () => {
        //Init split text
        const splitText = new SplitType("[data-split-text]", {
          types: "lines, words",
        });

        //Wrap lines into overflow hidden
        wrapLines(".home_hero-subtext .line");

        //Initial state for text elements
        gsap.set("h1 .word,p .line", {
          autoAlpha: 0,
          y: "-100%",
          rotationX: 5,
        });
        gsap.set("h1, .home_hero-subtext", { opacity: 1 });

        gsap.set(".navbar_logo-link, .navbar_link", {
          autoAlpha: 0,
          y: "-100%",
          rotationX: 5,
        });

        //Initialize swiper slider
        const swiper = new Swiper(".swiper", {
          slidesPerView: 1,
          spaceBetween: 30,
        });

        //Slides initial position
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => {
          const rightDist = slide.parentElement.offsetWidth - slide.offsetLeft;
          gsap.set(slide, {
            x: rightDist,
          });
        });

        //Define hero timeline
        const heroTl = gsap.timeline({ paused: true });

        heroTl
          .to("h1 .word", {
            delay: 0.4,
            y: "0%",
            autoAlpha: 1,
            filter: "blur(0px)",
            transformOrigin: "left top",
            rotationX: 0,
            duration: 0.8,
            stagger: { each: 0.075 },
            ease: "expo.out",
          })
          .to(
            ".home_hero-subtext .line",
            {
              y: "0%",
              autoAlpha: 1,
              filter: "blur(0px)",
              transformOrigin: "left top",
              rotationX: 0,
              duration: 0.5,
              stagger: { each: 0.025 },
            },
            "<50%"
          )
          .to(
            ".swiper-slide",
            {
              x: "0%",
              autoAlpha: 1,
              duration: 1.2,
              ease: "expo.out",
              stagger: { each: 0.1 },
            },
            "<35%"
          )
          .to(
            ".navbar_component",
            {
              y: "0%",
              duration: 0.6,
              ease: "power4.out",
            },
            "<15%"
          )
          .to(
            ".navbar_logo-link, .navbar_link",
            {
              y: "0%",
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.6,
              rotationX: 0,
              stagger: { each: 0.05 },
              ease: "power4.out",
            },
            "<50%"
          );

        heroTl.play();
      });
    })
    .catch(function () {
      console.log("Font failed to load");
    });
});
