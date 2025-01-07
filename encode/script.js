function calculateBitrate() {
  // Get inputs
  const fileSizeMB = parseFloat(document.getElementById("fileSize").value);
  const duration = document.getElementById("duration").value;

  // Validate inputs
  if (isNaN(fileSizeMB) || fileSizeMB <= 0) {
    alert("Please enter a valid file size in MB.");
    return;
  }

  const durationParts = duration.split(":");
  if (
    durationParts.length !== 2 ||
    isNaN(durationParts[0]) ||
    isNaN(durationParts[1])
  ) {
    alert("Please enter a valid duration in the format mm:ss.");
    return;
  }

  // Convert file size to bytes and duration to seconds
  const fileSizeBytes = fileSizeMB * 1024 * 1024; // Convert MB to bytes
  const durationSeconds =
    parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10); // Convert mm:ss to seconds

  if (durationSeconds <= 0) {
    alert("Please enter a valid duration greater than 0.");
    return;
  }

  // Calculate maximum bitrate
  const bitrateBps = Math.floor((fileSizeBytes * 8) / durationSeconds); // Bitrate in bits per second (floor ensures no decimal)
  const bitrateKbps = Math.floor(bitrateBps / 1000); // Convert to kilobits per second and floor it

  // Display result
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `Maximum Bitrate: <strong>${bitrateKbps} kbps</strong>`;

  // Generate ffmpeg command
  const ffmpegCommand = `ffmpeg -i sotsu.mp4 -vf "subtitles=sotsu.ass" -an -c:v libx264 -b:v ${bitrateKbps}k -preset slow upload.mp4`;
  const commandDiv = document.getElementById("command");
  commandDiv.style.display = "block";
  commandDiv.innerHTML = `<strong>FFmpeg Command:</strong><br><textarea readonly style="width: 100%; height: 60px;">${ffmpegCommand}</textarea>`;
}
