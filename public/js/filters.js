document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      window.location.href = `/listings?category=${category}`;
    });
  });
});