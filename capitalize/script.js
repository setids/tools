let textInput = document.getElementById("inputText");

function capitalizeText() {
  if (textInput.value.trim() !== "") {
    let originalText = textInput.value;

    let lines = originalText.split("\n");

    for (let i = 0; i < lines.length; i++) {
      lines[i] = modifyAfterSpecialCharacters(lines[i]);

      if (
        lines[i].trim().startsWith("“") ||
        lines[i].trim().startsWith("(") ||
        lines[i].trim().startsWith("―")
      ) {
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

function copyText() {
  textInput.select();
  document.execCommand("copy");
  textInput.value = "";
}
