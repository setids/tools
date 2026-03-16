document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text-input");
  const generateBtn = document.getElementById("generate-btn");
  const qrContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("download-btn");
  const colorDark = document.getElementById("color-dark");
  const colorLight = document.getElementById("color-light");
  const placeholder = document.getElementById("placeholder");

  function generateQR() {
    let value = textInput.value.trim();
    if (!value) {
      alert("Silakan masukkan teks atau link terlebih dahulu.");
      return;
    }

    // Auto-fix URL agar link aktif saat di-scan
    const urlPattern =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
    if (urlPattern.test(value) && !value.startsWith("http")) {
      value = "https://" + value;
    }

    // 1. Bersihkan kontainer lama
    qrContainer.innerHTML = "";
    if (placeholder) placeholder.style.display = "none";

    // 2. Langsung tampilkan tombol download agar user tidak bingung
    downloadBtn.style.display = "block";

    // 3. Konfigurasi QR Code High Definition (1000px)
    const config = {
      text: value,
      width: 1000,
      height: 1000,
      colorDark: colorDark.value,
      colorLight: colorLight.value,
      correctLevel: QRCode.CorrectLevel.H,

      // TEKS DI TENGAH (Logo Style)
      logo: "SCAN",
      logoWidth: 280,
      logoHeight: 120,
      logoBackgroundColor: "#ffffff",
      logoBackgroundTransparent: false,
      logoFont: "bold 100px 'Plus Jakarta Sans', sans-serif",

      // STYLE TITIK MODERN
      dotScale: 0.8,

      // KOTAK POJOK (Position Markers)
      PO: colorDark.value,
      PI: colorDark.value,
    };

    // 4. Proses Rendering
    try {
      new QRCode(qrContainer, config);
    } catch (err) {
      console.error("Gagal membuat QR Code:", err);
      alert("Terjadi kesalahan teknis. Silakan coba lagi.");
    }
  }

  // Listener Tombol Generate
  generateBtn.addEventListener("click", generateQR);

  // Listener Keyboard Enter
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generateQR();
  });

  // Fitur Download Gambar HD
  downloadBtn.addEventListener("click", () => {
    const canvas = qrContainer.querySelector("canvas");
    const img = qrContainer.querySelector("img");

    let downloadUrl = "";

    // Cek apakah library merender ke Canvas atau <img>
    if (canvas) {
      downloadUrl = canvas.toDataURL("image/png");
    } else if (img && img.src) {
      downloadUrl = img.src;
    }

    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `QR_Cetak_HD_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(
        "Gambar sedang diproses, silakan tunggu sejenak atau klik Generate kembali.",
      );
    }
  });
});
