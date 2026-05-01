// DATA MASTER MOTOR
const motorData = [
  {
    id: "v125_2017",
    name: "Vario 125 (2017)",
    capacity: 5.5,
    totalBars: 6,
    reserve: 1.0,
  },
  {
    id: "scoopy_2023",
    name: "Scoopy (2023)",
    capacity: 4.2,
    totalBars: 6,
    reserve: 0.6,
  },
  {
    id: "beat_karbu_2011",
    name: "BeAT Karbu (2011)",
    capacity: 3.5,
    totalBars: 4,
    reserve: 0.5,
  },
];

const motorSelect = document.getElementById("motorSelect");
const barInput = document.getElementById("barInput");
const priceInput = document.getElementById("priceInput");
const calculateBtn = document.getElementById("calculateBtn");

// 1. Fungsi Format Titik Ribuan (saat mengetik)
priceInput.addEventListener("input", function (e) {
  let value = this.value.replace(/[^0-9]/g, ""); // Ambil hanya angka
  if (value) {
    this.value = parseInt(value).toLocaleString("id-ID");
  } else {
    this.value = "";
  }
});

// 2. Inisialisasi Dropdown
motorData.forEach((motor) => {
  let opt = document.createElement("option");
  opt.value = motor.id;
  opt.innerHTML = motor.name;
  motorSelect.appendChild(opt);
});

function updateLimits() {
  const selectedMotor = motorData.find((m) => m.id === motorSelect.value);
  barInput.max = selectedMotor.totalBars;
  barInput.placeholder = `0-${selectedMotor.totalBars}`;
}

motorSelect.addEventListener("change", updateLimits);

// 3. Fungsi Perhitungan
function calculateFuel() {
  const motor = motorData.find((m) => m.id === motorSelect.value);

  // Hilangkan titik agar bisa dihitung sebagai angka
  const cleanPrice = priceInput.value.replace(/\./g, "");
  const price = parseFloat(cleanPrice);
  const sisaBar = parseInt(barInput.value);

  if (!price || isNaN(sisaBar)) {
    alert("Masukkan harga per liter dan sisa bar bensin Anda.");
    return;
  }

  let sisaLiter = 0;
  if (sisaBar === 0) {
    sisaLiter = 0.2;
  } else if (sisaBar === 1) {
    sisaLiter = motor.reserve;
  } else {
    const rangePerBar =
      (motor.capacity - motor.reserve) / (motor.totalBars - 1);
    sisaLiter = motor.reserve + rangePerBar * (sisaBar - 1);
  }

  const literPerlu = Math.max(0, motor.capacity - sisaLiter);
  const totalBiaya = literPerlu * price;

  // Update UI Hasil
  document.getElementById("motorNameDisplay").innerText = motor.name;
  document.getElementById("capDisplay").innerText = motor.capacity + "L Full";
  document.getElementById("litersNeeded").innerText =
    literPerlu.toFixed(2) + " Liter";
  document.getElementById("totalCost").innerText =
    "Rp " + Math.round(totalBiaya).toLocaleString("id-ID");

  document.getElementById("resultBox").classList.remove("hidden");
}

calculateBtn.addEventListener("click", calculateFuel);
updateLimits();
