lucide.createIcons();

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const fileSizeInput = document.getElementById("fileSize");
const durationInput = document.getElementById("duration");
const presetSelect = document.getElementById("presetSelect");
const presetNote = document.getElementById("presetNote");
const outputArea = document.getElementById("outputArea");
const bitrateDisplay = document.getElementById("bitrateDisplay");
const commandResult = document.getElementById("commandResult");
const copyStatus = document.getElementById("copyStatus");

// Data Catatan Preset
const presetNotes = {
  ultrafast:
    "Proses secepat kilat, tapi kualitas paling rendah & file paling bengkak.",
  superfast: "Sangat cepat, cocok untuk testing encoding saja.",
  veryfast: "Pilihan bagus jika kamu sedang terburu-buru (ngejar deadline).",
  faster: "Sedikit lebih efisien dibanding veryfast.",
  fast: "Keseimbangan yang cukup oke antara waktu dan kualitas.",
  medium: "Bawaan standar FFmpeg. Hasil seimbang untuk penggunaan umum.",
  slow: "Hasil terbaik untuk diunggah ke media sosial (efisien & tajam).",
  slower: "Sangat lambat, khusus untuk arsip video kualitas tinggi.",
  veryslow: "Efisiensi maksimal, tapi butuh waktu sangat lama untuk diproses.",
};

// Update Catatan Saat Preset Diganti
presetSelect.addEventListener("change", () => {
  presetNote.innerText = `${presetSelect.value.toUpperCase()}: ${presetNotes[presetSelect.value]}`;
});

// Logic Perhitungan
generateBtn.addEventListener("click", () => {
  const fileSizeMB = parseFloat(fileSizeInput.value);
  const duration = durationInput.value;
  const selectedPreset = presetSelect.value;

  if (isNaN(fileSizeMB) || fileSizeMB <= 0) {
    alert("Masukkan ukuran file yang valid.");
    return;
  }

  const durationParts = duration.split(":");
  if (
    durationParts.length !== 2 ||
    isNaN(durationParts[0]) ||
    isNaN(durationParts[1])
  ) {
    alert("Gunakan format mm:ss.");
    return;
  }

  const fileSizeBytes = fileSizeMB * 1024 * 1024;
  const durationSeconds =
    parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10);

  if (durationSeconds <= 0) {
    alert("Durasi tidak boleh nol.");
    return;
  }

  const bitrateBps = Math.floor((fileSizeBytes * 8) / durationSeconds);
  const bitrateKbps = Math.floor(bitrateBps / 1000);

  outputArea.classList.remove("hidden");
  bitrateDisplay.innerText = `${bitrateKbps} kbps`;

  // Pasang bitrate dan preset yang dipilih ke dalam command[cite: 3]
  const command = `ffmpeg -i new.mp4 -vf "subtitles=new.ass" -c:a aac -b:a 128k -c:v libx264 -b:v ${bitrateKbps}k -preset ${selectedPreset} final.mp4`;
  commandResult.value = command;
});

// Copy Button Logic
copyBtn.addEventListener("click", async () => {
  const textToCopy = commandResult.value;
  if (!textToCopy) return;

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyStatus.style.opacity = "1";
    setTimeout(() => {
      copyStatus.style.opacity = "0";
    }, 2000);
  } catch (err) {
    console.error("Gagal menyalin: ", err);
  }
});
