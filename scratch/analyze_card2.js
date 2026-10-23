const sharp = require('sharp');

sharp('scratch/ref_card2_crop.png').raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
  const { width, height, channels } = info;
  console.log('Card 2 size:', width, height);

  // Check dark olive box on Card 2
  const isDarkOlive = (r, g, b) => r >= 30 && r <= 70 && g >= 45 && g <= 80 && b >= 15 && b <= 45;
  let firstDarkY = -1, lastDarkY = -1;
  const x = 100;
  for (let y = 0; y < height; y++) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (isDarkOlive(r, g, b)) {
      if (firstDarkY === -1) firstDarkY = y;
      lastDarkY = y;
    }
  }
  console.log(`Card 2 dark olive box vertically at x=100: top=${firstDarkY}, bottom=${lastDarkY}`);
});
