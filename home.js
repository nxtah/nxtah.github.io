document.addEventListener("DOMContentLoaded", () => {
    const curvedText = document.getElementById("curved-text");
  
    // Trigger the curved text animation after the main text finishes
    setTimeout(() => {
      curvedText.style.opacity = 1; // Fade in
      curvedText.style.transform = "translateY(0)"; // Move to normal position
    }, 3000); // Delay for 3 seconds (adjust based on main text animation duration)
  });