const processSalesCoffee = async () => {
  const tableBody = document.getElementById("datatable-body");

  if (!tableBody) {
    return;
  }

  try {
    const response = await getSalesCoffee();
    if (!response.ok) {
      throw new Error("Request failed");
    }

    const xmlText = await response.text();
    const xmlDocument = new DOMParser().parseFromString(xmlText, "application/xml");
    const salesRows = Array.from(xmlDocument.querySelectorAll("row"));
    const escapeHtml = (value) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    tableBody.innerHTML = salesRows
      .map((row) => {
        const getValue = (selector) => row.querySelector(selector)?.textContent?.trim() ?? "";

        return `
          <tr class="datatable-row border-b border-white/5">
            <td class="px-4 py-4 font-medium text-slate-100">${escapeHtml(getValue("Date"))}</td>
            <td class="px-4 py-4 text-slate-200">${escapeHtml(getValue("Time"))}</td>
            <td class="px-4 py-4 text-slate-200">${escapeHtml(getValue("coffee_name"))}</td>
            <td class="px-4 py-4 text-slate-300">${escapeHtml(getValue("cash_type"))}</td>
            <td class="px-4 py-4 text-slate-400">${escapeHtml(getValue("money"))}</td>
          </tr>
        `;
      })
      .join("");
  } catch (error) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-4 py-8 text-center text-red-300">No se pudo cargar la información.</td>
      </tr>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", processSalesCoffee, { once: true });
});
