// Fungsi untuk memformat input secara real-time
function formatInput(input) {
  // Ambil angka saja
  let value = input.value.replace(/[^0-9]/g, "");

  // Format menjadi ribuan dengan titik
  if (value) {
    input.value = new Intl.NumberFormat("id-ID").format(value);
  } else {
    input.value = "";
  }
}

function hitungDiskon() {
  // Ambil value, hapus semua titik agar bisa dihitung sebagai angka
  const rawHarga = document
    .getElementById("hargaAsli")
    .value.replace(/\./g, "");
  const hargaAsli = parseFloat(rawHarga);
  const persenDiskon = parseFloat(
    document.getElementById("persenDiskon").value,
  );
  const hasilArea = document.getElementById("hasilArea");

  if (isNaN(hargaAsli) || isNaN(persenDiskon)) {
    alert("Mohon masukkan harga dan diskon yang valid.");
    return;
  }

  const jumlahPotongan = (hargaAsli * persenDiskon) / 100;
  const hargaFinal = hargaAsli - jumlahPotongan;

  hasilArea.classList.remove("hidden");

  document.getElementById("totalHemat").innerText =
    formatRupiah(jumlahPotongan);
  document.getElementById("hargaAkhir").innerText = formatRupiah(hargaFinal);
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}
