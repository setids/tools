let selectedGender = "pria";

// Fungsi Reset (Baru)
function resetCalculator() {
  document.getElementById("berat").value = "";
  document.getElementById("tinggi").value = "";
  document.getElementById("hasilArea").classList.add("hidden");
  // Kembalikan posisi pointer ke 0
  document.getElementById("bmiPointer").style.left = "0%";
}

function setGender(gender) {
  // Jalankan reset setiap kali gender diubah
  if (selectedGender !== gender) {
    resetCalculator();
  }

  selectedGender = gender;
  const btnPria = document.getElementById("btnPria");
  const btnWanita = document.getElementById("btnWanita");

  btnPria.className = `flex-1 py-3 border-2 border-gray-900 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${gender === "pria" ? "bg-indigo-500 text-white" : "bg-white text-gray-900"}`;
  btnWanita.className = `flex-1 py-3 border-2 border-gray-900 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${gender === "wanita" ? "bg-pink-500 text-white" : "bg-white text-gray-900"}`;
}

function formatInput(input) {
  let value = input.value.replace(/[^0-9]/g, "");
  input.value = value ? new Intl.NumberFormat("id-ID").format(value) : "";
}

function hitungBMI() {
  const beratStr = document.getElementById("berat").value.replace(/\./g, "");
  const tinggiStr = document.getElementById("tinggi").value.replace(/\./g, "");

  const berat = parseFloat(beratStr);
  const tinggiCm = parseFloat(tinggiStr);

  if (!berat || !tinggiCm) {
    alert("Masukkan data yang valid.");
    return;
  }

  const bmi = berat / (tinggiCm / 100) ** 2;
  const skorFixed = bmi.toFixed(1);
  const sG = selectedGender === "pria" ? "Bro" : "Sist";

  // Visual Bar Setup (Skala 10 - 40)
  const minS = 10,
    maxS = 40;
  const totalR = maxS - minS;

  document.getElementById("barKurus").style.width =
    ((18.5 - 10) / totalR) * 100 + "%";
  document.getElementById("barIdeal").style.width =
    ((25.0 - 18.5) / totalR) * 100 + "%";
  document.getElementById("barGemuk").style.width =
    ((30.0 - 25.0) / totalR) * 100 + "%";
  document.getElementById("barObesitas").style.width =
    ((40.0 - 30.0) / totalR) * 100 + "%";

  let res = { status: "", pesan: "", warna: "" };

  // Logika Kategori & Pesan Granular
  if (bmi < 17.0) {
    res = {
      status: "Sangat Kurus",
      warna: "bg-red-400",
      pesan: `Waduh ${sG}, berat badanmu jauh di bawah ideal. Yuk, perbaiki asupan nutrisi.`,
    };
  } else if (bmi >= 17.0 && bmi < 18.5) {
    res = {
      status: "Kurus",
      warna: "bg-orange-300",
      pesan: `Sedikit lagi menuju ideal, ${sG}. Tambahkan porsi protein ya.`,
    };
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    res = {
      status: "Normal (Ideal)",
      warna: "bg-green-400",
      pesan: `Keren banget ${sG}! Kondisimu sangat fit. Pertahankan gaya hidup sehat ini.`,
    };
  } else if (bmi >= 23.0 && bmi <= 24.9) {
    res = {
      status: "Ideal (Ambang Batas)",
      warna: "bg-emerald-500 text-white",
      pesan: `Masih ideal, tapi sudah mendekati batas atas. Jaga pola makan ya ${sG}.`,
    };
  } else if (bmi >= 25.0 && bmi <= 27.4) {
    res = {
      status: "Gemuk (Overweight)",
      warna: "bg-yellow-300",
      pesan: `Sudah masuk kategori gemuk nih, ${sG}. Yuk, lebih aktif bergerak!`,
    };
  } else if (bmi >= 27.5 && bmi <= 29.9) {
    res = {
      status: "Hampir Obesitas",
      warna: "bg-orange-500 text-white",
      pesan: `⚠️ Peringatan ${sG}! Kamu hampir menyentuh obesitas. Waktunya olahraga rutin.`,
    };
  } else {
    res = {
      status: "Obesitas",
      warna: "bg-red-600 text-white",
      pesan: `Kesehatanmu berisiko, ${sG}. Disarankan konsultasi dokter untuk program penurunan berat.`,
    };
  }

  const area = document.getElementById("hasilArea");
  area.classList.remove("hidden");
  document.getElementById("bmiStatusBox").innerText = res.status;
  document.getElementById("bmiStatusBox").className =
    `inline-block px-6 py-2 border-2 border-gray-900 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-3 ${res.warna}`;
  document.getElementById("bmiPesan").innerText = res.pesan;

  let pPos = ((Math.max(minS, Math.min(maxS, bmi)) - minS) / totalR) * 100;
  document.getElementById("bmiPointer").style.left = pPos + "%";
  document.getElementById("skorPop").innerText = skorFixed;

  area.classList.remove("animate__fadeIn");
  void area.offsetWidth;
  area.classList.add("animate__fadeIn");
}
