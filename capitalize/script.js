let textInput = document.getElementById("inputText");

function capitalizeText() {
  if (textInput.value.trim() !== "") {
    let originalText = textInput.value;

    // 1. Memecah teks menjadi baris-baris
    let lines = originalText.split("\n");
    
    // 2. Filter baris: Hapus baris yang HANYA berisi angka/nomor atau spasi kosong berlebih
    // Kita simpan baris yang mengandung huruf atau baris yang benar-benar kosong (sebagai pemisah paragraf)
    let filteredLines = [];
    for (let i = 0; i < lines.length; i++) {
      let currentLine = lines[i].trim();
      
      // Cek apakah baris hanya berisi angka dan titik (seperti "2." atau "5")
      let isOnlyNumber = /^\d+\.?$/.test(currentLine);
      
      if (!isOnlyNumber) {
        filteredLines.push(lines[i]);
      }
    }

    // 3. Proses kapitalisasi pada baris yang tersisa
    for (let i = 0; i < filteredLines.length; i++) {
      let line = filteredLines[i];
      
      if (line.trim() === "") continue; // Abaikan baris kosong pemisah paragraf

      // Modifikasi setelah karakter spesial (seperti tanda kutip/kurung)
      line = modifyAfterSpecialCharacters(line);

      // Capitalize jika tidak diawali tanda tertentu
      if (
        line.trim().startsWith("“") ||
        line.trim().startsWith("(") ||
        line.trim().startsWith("―")
      ) {
        filteredLines[i] = line;
      } else {
        filteredLines[i] = capitalizeFirstLetter(line.trim());
      }
    }

    // 4. Gabungkan kembali dan bersihkan baris kosong yang menumpuk (lebih dari dua enter)
    let result = filteredLines.join("\n").replace(/\n{3,}/g, "\n\n");

    textInput.value = result.trim();
  }
}

function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function modifyAfterSpecialCharacters(str) {
  return str.replace(/([“(])(\w)/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
}

function removeLeadingAndTrailingNumbering(str) {
  // Tetap dipertahankan jika masih ingin menghapus angka yang nempel di depan kalimat
  return str
    .replace(/^\d+\.\s*/, "")
    .replace(/\d+\.$/, "");
}

function convertToHTML() {
  if (textInput.value.trim() !== "") {
    let paragraphs = textInput.value.split(/\n\s*\n/);
    let htmlResult = paragraphs
      .map((paragraph) => {
        let lines = paragraph
          .split("\n")
          .map((line) => `  ${line.trim()} <br>`)
          .join("\n");
        return `<p>\n${lines.trimEnd()}\n</p>`;
      })
      .join("\n\n");
    textInput.value = htmlResult;
  }
}

function copyText() {
  textInput.select();
  document.execCommand("copy");
  textInput.value = "";
}
