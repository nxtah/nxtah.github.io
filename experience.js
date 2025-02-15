document.addEventListener("DOMContentLoaded", () => {
    const experienceItems = document.querySelectorAll(".experience-item");
  
    experienceItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
      }, 500 * (index + 1)); // Delay increases for each item
    });
  });