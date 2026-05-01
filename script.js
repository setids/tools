const themeMenuButton = document.getElementById("theme-menu-button");
const themeOptions = document.getElementById("theme-options");
const html = document.documentElement;

// Fungsi untuk menampilkan/menyembunyikan dropdown tema
themeMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  themeOptions.classList.toggle("hidden");
});

// Menutup dropdown jika klik di luar area menu
window.addEventListener("click", () => {
  themeOptions.classList.add("hidden");
});

// Fungsi menerapkan tema ke elemen HTML
function applyTheme(theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Fungsi menyimpan pilihan pengguna dan memperbarui tampilan
function setTheme(theme) {
  localStorage.theme = theme;
  applyTheme(theme);
  updateIcon(theme);
}

// Memperbarui ikon pada tombol utama berdasarkan tema aktif
function updateIcon(theme) {
  const icon = document.getElementById("current-theme-icon");
  if (theme === "light") icon.innerText = "☀️";
  else if (theme === "dark") icon.innerText = "🌙";
  else icon.innerText = "🌓";
}

// Inisialisasi saat halaman dimuat pertama kali
const savedTheme = localStorage.theme || "system";
applyTheme(savedTheme);
updateIcon(savedTheme);

// Mendengarkan perubahan tema pada level sistem operasi secara real-time
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (localStorage.theme === "system" || !localStorage.theme) {
      applyTheme("system");
    }
  });
