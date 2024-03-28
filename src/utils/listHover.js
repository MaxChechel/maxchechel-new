import { Flip } from "gsap/all";

//Blog list items hover
export default function listHover(targetEl) {
  const target = targetEl;
  const listItems = target.querySelectorAll(".blog-list_item");
  const shape = target.querySelector(".blog-list_pad");
  const listsParent = target.querySelector(".blog-list_items-wrap");

  listItems[0].classList.add("is-first");
  listItems[listItems.length - 1].classList.add("is-last");

  listItems.forEach(function (li) {
    li.addEventListener("mouseover", function () {
      let state = Flip.getState(shape, { props: "height" });
      li.appendChild(shape);

      !shape.classList.contains("is-active")
        ? shape.classList.add("is-active")
        : null;

      Flip.from(state, {
        duration: 0.4,
        ease: "power4.out",
      });
    });
    li.addEventListener("mouseleave", function (e) {
      let currentItem = e.target;
      let state = Flip.getState(shape, { props: "height" });
      if (
        currentItem.classList.contains("is-first") ||
        currentItem.classList.contains("is-last")
      ) {
        Flip.from(state, {
          duration: 0.4,
          ease: "power4.out",
        });
      }
    });
  });

  listsParent.addEventListener("mouseover", function (e) {
    let state = Flip.getState(shape, { props: "height" });
    Flip.from(state, {
      duration: 0.3,
      ease: "power2.out",
    });
  });
  listsParent.addEventListener("mouseleave", function () {
    shape.classList.remove("is-active");
    let state = Flip.getState(shape, { props: "height" });
    Flip.from(state, {
      duration: 0.3,
      ease: "power2.out",
    });
  });
}
