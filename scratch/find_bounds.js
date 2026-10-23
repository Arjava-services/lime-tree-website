const sharp = require('sharp');

sharp('scratch/ref_card1_crop.png').raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
  const { width, height, channels } = info;
  // Let's find for row y=260 (inside the dark olive box) where the dark olive pixels start and end.
  // Dark olive is r ~ 35-65, g ~ 45-75, b ~ 20-45.
  const isDarkOlive = (r, g, b) => r >= 30 && r <= 70 && g >= 45 && g <= 80 && b >= 15 && b <= 45;
  const isCardCream = (r, g, b) => r >= 230 && g >= 220 && b >= 200;

  console.log('Testing width bounds at y=250 (near bottom of dark box):');
  let firstDark = -1, lastDark = -1;
  const y = 250;
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (isDarkOlive(r, g, b)) {
      if (firstDark === -1) firstDark = x;
      lastDark = x;
    }
  }
  console.log(`Dark olive box: left=${firstDark}, right=${lastDark}, width=${lastDark - firstDark}`);

  // Let's find top and bottom of dark olive box
  let firstDarkY = -1, lastDarkY = -1;
  const x = 70; // mid-left
  for (let yScan = 0; yScan < height; yScan++) {
    const idx = (yScan * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (isDarkOlive(r, g, b)) {
      if (firstDarkY === -1) firstDarkY = yScan;
      lastDarkY = yScan;
    }
  }
  console.log(`Dark olive box vertically at x=70: top=${firstDarkY}, bottom=${lastDarkY}, height=${lastDarkY - firstDarkY}`);
});
