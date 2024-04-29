import { gsap } from "gsap";

export function listItemsReveal(targetEl) {
  const blogSection = targetEl;
  const blogSectionListItems = blogSection.querySelectorAll(".blog-list_item");
  blogSectionListItems.forEach((item, index) => {
    const divider = item.querySelector(".blog-list_divider");
    const heading = item.querySelector(".blog-list_question h3");
    const category = item?.querySelectorAll(".blog-list_category-wrap p");

    gsap.set(divider, {
      width: "0%",
      opacity: 0,
    });
    gsap.set([heading, category], {
      y: "-100%",
      opacity: 0,
    });
    const tl = gsap.timeline({ delay: index * 0.075 });
    tl.to(divider, {
      width: "100%",
      opacity: 1,
      duration: 0.7,
      ease: "power4.inOut",
    })
      .to(
        heading,
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
        },
        "<.1"
      )
      .call(() => {
        item.closest(".blog-list_items-wrap").classList.add("is-ready");
      })
      .to(
        category,
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power4.inOut",
          stagger: {
            each: 0.025,
          },
        },
        ".5"
      );
  });
}
