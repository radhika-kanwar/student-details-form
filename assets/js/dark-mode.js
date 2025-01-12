document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.ariaLabel = "Toggle Dark Mode";
    themeToggle.innerHTML = "🌓";

    themeToggle.addEventListener("click", toggleDarkMode);

    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);

    document.body.appendChild(themeToggle);

    function toggleDarkMode() {
      const body = document.body;
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  });