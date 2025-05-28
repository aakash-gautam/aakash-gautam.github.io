<script>
  document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let current = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
      });
      slides[index].classList.add("active");
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    showSlide(current); // Show the first slide initially
    setInterval(nextSlide, 5000); // Change every 5 seconds
  });
</script>
