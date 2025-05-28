<script>
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
  });
</script>
