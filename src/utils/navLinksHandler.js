import { gsap } from "gsap";
import scramble from "./scrambleText";
import { listItemsReveal } from "./listItemsReveal";

export default function navLinksHadler() {
  //Nav links hover
  const navLinks = document.querySelectorAll(".navbar_link");
  const navMenus = document.querySelectorAll(".nav-list_wrapper");

  function scrambleIn(link) {
    if (link.getAttribute("data-nav-link") === "projects")
      scramble(link, "See work");
    if (link.getAttribute("data-nav-link") === "insights")
      scramble(link, "Read blog");
    if (link.getAttribute("data-nav-link") === "contact")
      scramble(link, "Let's connect");
  }

  function scrambleOut(link) {
    if (!link.classList.contains("is-opened")) {
      if (link.getAttribute("data-nav-link") === "projects")
        scramble(link, "Projects");
      if (link.getAttribute("data-nav-link") === "insights")
        scramble(link, "Insights");
      if (link.getAttribute("data-nav-link") === "contact")
        scramble(link, "Contact me");
    } else scramble(link, "Close");
  }

  function removeOpenedClas() {
    navLinks.forEach((link) => {
      link.classList.remove("is-opened");
    });
  }

  function openNavMenu(link) {
    const name = link.getAttribute("data-nav-link");
    navMenus.forEach((menu) => {
      menu.getAttribute("data-nav-list") === name
        ? menu.classList.add("is-opened")
        : null;
      const target = document.querySelector(`[data-nav-list=${name}]`);
      if (menu.classList.contains("is-opened")) {
        if (menu.getAttribute("data-nav-list") !== name) {
          const tlOut = gsap.timeline();
          const tlIn = gsap.timeline();
          tlOut
            .to(menu, {
              top: "auto",
              duration: 0,
            })
            .to(menu, {
              height: 0,
              duration: 0.8,
              ease: "power4.out",
            })
            .to(menu, {
              top: 0,
              duration: 0,
            });
          tlIn
            .call(() => {
              listItemsReveal(target);
            })
            .to(
              `[data-nav-list=${name}]`,
              {
                height: "100vh",
                duration: 0.8,
                ease: "power4.out",
              },
              0.2
            );
        } else {
          const tl = gsap.timeline();
          tl.call(() => {
            listItemsReveal(target);
          }).to(
            menu,
            {
              height: "100vh",
              delay: 0.2,
              duration: 0.8,
              ease: "power4.out",
            },
            0
          );
        }
      }
    });
  }
  function closeNavMenu(link) {
    const name = link.getAttribute("data-nav-link");
    gsap.to(`[data-nav-list]`, {
      height: 0,
      top: "auto",
      duration: 1,
      ease: "power4.out",
    });
  }

  navLinks.forEach((link) => {
    //Hover in
    link.addEventListener("mouseover", () => {
      if (link.classList.contains("is-opened")) {
        scramble(link, "Close");
      } else scrambleIn(link);
    });
    //Hover out
    link.addEventListener("mouseleave", () => {
      scrambleOut(link);
    });

    //Click in
    link.addEventListener("click", (e) => {
      navLinks.forEach((link) => {
        const name = link.getAttribute("data-nav-link");
        const dropdown = document.querySelector(`[data-nav-list=${name}]`);

        if (link === e.currentTarget) {
          if (!link.classList.contains("is-opened")) {
            link.classList.add("is-opened");
            //dropdown.classList.add("is-opened");
            scramble(link, "Close");
            // closeNavMenu(link);
            openNavMenu(link);
          } else {
            scrambleIn(link);
            const tl = gsap.timeline();
            tl.to(`[data-nav-list].is-opened`, {
              height: 0,
              duration: 0.8,
              ease: "power4.in",
            })
              .to(
                ".blog-list_question h3, .blog-list_category-wrap p",
                {
                  opacity: 0,
                  stagger: { each: 0.05, start: "start" },
                },
                0.2
              )
              .to(
                ".blog-list_divider",
                {
                  opacity: 0,
                  width: "0%",
                  stagger: { each: 0.05, start: "end" },
                },
                0.2
              );
            link.classList.remove("is-opened");
          }
        } else if (link !== e.currentTarget) {
          if (link.classList.contains("is-opened")) {
            link.classList.remove("is-opened");
            scrambleIn(link);
          }
        }
      });
    });
  });
}
