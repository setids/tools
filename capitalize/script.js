let textInput = document.getElementById("inputText");

function capitalizeText() {
  if (textInput.value.trim() !== "") {
    let originalText = textInput.value;

    let lines = originalText.split("\n");

    for (let i = 0; i < lines.length; i++) {
      // Hapus penomoran di awal dan akhir baris
      lines[i] = removeLeadingAndTrailingNumbering(lines[i]);

      // Modifikasi setelah karakter spesial
      lines[i] = modifyAfterSpecialCharacters(lines[i]);

      // Capitalize jika tidak diawali tanda tertentu
      if (
        lines[i].trim().startsWith("“") ||
        lines[i].trim().startsWith("(") ||
        lines[i].trim().startsWith("―")
      ) {
        continue; // Abaikan untuk baris ini
      } else {
        lines[i] = capitalizeFirstLetter(lines[i]);
      }
    }

    let capitalizeResult = lines.join("\n");

    textInput.value = capitalizeResult;
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function modifyAfterSpecialCharacters(str) {
  return str.replace(/([“(])(\w)/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
}

function removeLeadingAndTrailingNumbering(str) {
  return str
    .replace(/^\d+\.\s*/, "") // Menghapus angka diikuti titik dan spasi di awal baris
    .replace(/\d+\.$/, ""); // Menghapus angka diikuti titik di akhir baris
}

function convertToHTML() {
  if (textInput.value.trim() !== "") {
    let originalText = textInput.value;

    // Pecah teks berdasarkan baris kosong untuk membentuk paragraf
    let paragraphs = originalText.split(/\n\s*\n/);

    // Format setiap paragraf sebagai tag <p> dengan jarak dan indentasi
    let htmlResult = paragraphs
      .map((paragraph) => {
        let lines = paragraph
          .split("\n")
          .map((line) => `  ${line.trim()} <br>`)
          .join("\n");
        return `<p>\n${lines.trimEnd()}\n</p>`;
      })
      .join("\n\n");

    textInput.value = htmlResult; // Tampilkan hasil HTML di textarea
  }
}

function copyText() {
  textInput.select();
  document.execCommand("copy");
  textInput.value = "";
}
