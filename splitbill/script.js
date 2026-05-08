// Fungsi untuk memformat angka menjadi string dengan titik (1000 -> 1.000)
function formatRibuan(angka) {
  if (!angka) return "";
  // Hilangkan semua karakter selain angka
  let val = angka.toString().replace(/[^0-9]/g, "");
  // Tambahkan titik setiap 3 digit dari belakang
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fungsi untuk mengembalikan string titik menjadi angka murni (1.000 -> 1000)
function parseAngka(teks) {
  return parseFloat(teks.replace(/\./g, "")) || 0;
}

// Tambahkan Event Listener ke input Total Tagihan
const inputBill = document.getElementById("totalBill");

inputBill.addEventListener("input", function (e) {
  // Simpan nilai asli, format, lalu masukkan kembali ke input
  let rawValue = e.target.value;
  e.target.value = formatRibuan(rawValue);
});

function calculateSplit() {
  // Ambil nilai yang sudah diformat titik, lalu ubah ke angka murni untuk dihitung
  const rawBill = document.getElementById("totalBill").value;
  const totalBill = parseAngka(rawBill);

  const totalPeople = parseInt(document.getElementById("totalPeople").value);
  const tipPercentage =
    parseFloat(document.getElementById("tipPercentage").value) || 0;

  const resultArea = document.getElementById("resultArea");
  const perPersonElement = document.getElementById("perPersonAmount");
  const grandTotalElement = document.getElementById("grandTotalText");

  if (totalBill <= 0 || isNaN(totalPeople) || totalPeople <= 0) {
    alert("Mohon masukkan total tagihan dan jumlah orang yang benar.");
    return;
  }

  const tipAmount = totalBill * (tipPercentage / 100);
  const grandTotal = totalBill + tipAmount;
  const perPerson = grandTotal / totalPeople;

  // Tampilkan hasil
  resultArea.classList.remove("hidden");

  // Gunakan format lokal Indonesia agar outputnya juga pakai titik
  perPersonElement.innerText = "Rp " + formatRibuan(Math.round(perPerson));
  grandTotalElement.innerText = "Rp " + formatRibuan(Math.round(grandTotal));
}
