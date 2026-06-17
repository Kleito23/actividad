tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("table-search");

  if (!searchInput) {
    return;
  }

  const filterRows = () => {
    const query = searchInput.value.trim().toLowerCase();
    const rows = Array.from(document.querySelectorAll(".datatable-row"));

    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.classList.toggle("hidden", !matches);
    });
  };

  searchInput.addEventListener("input", filterRows);
});
