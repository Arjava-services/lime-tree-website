const sharp = require('sharp');

sharp('scratch/ref_card1_bottom_zoom.png').raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
  const { width, height, channels } = info;
  console.log('Size:', width, height, 'channels:', channels);
  for (let y = 0; y < height; y += 10) {
    let rowColors = [];
    for (let x = 10; x < width; x += 30) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      rowColors.push(`[${r},${g},${b}]`);
    }
    console.log(`y=${y}:`, rowColors.join(' '));
  }
});
