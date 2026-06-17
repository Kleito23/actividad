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
  const rows = Array.from(document.querySelectorAll(".datatable-row"));

  if (!searchInput || rows.length === 0) {
    return;
  }

  const filterRows = () => {
    const query = searchInput.value.trim().toLowerCase();

    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.classList.toggle("hidden", !matches);
    });
  };

  searchInput.addEventListener("input", filterRows);
});
