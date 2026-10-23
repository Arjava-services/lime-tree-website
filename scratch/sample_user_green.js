const sharp = require('sharp');
const imgPath = 'C:/Users/Santhosh/.gemini/antigravity-ide/brain/64203c6f-aead-4fca-85d9-67caed6584ac/.user_uploaded/media_1792686967954.png';

sharp(imgPath).raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
  const { width, height, channels } = info;
  console.log('Image dimensions:', width, height, 'channels:', channels);

  let greens = [];
  for (let y = Math.round(height * 0.5); y < height - 10; y += 2) {
    for (let x = 10; x < width - 10; x += 2) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (g > r && g > b && g > 50) {
        greens.push({ r, g, b, hex: '#' + [r,g,b].map(v => v.toString(16).padStart(2, '0')).join('') });
      }
    }
  }

  console.log('Found green pixels:', greens.length);
  if (greens.length > 0) {
    let avgR = Math.round(greens.reduce((s, c) => s + c.r, 0) / greens.length);
    let avgG = Math.round(greens.reduce((s, c) => s + c.g, 0) / greens.length);
    let avgB = Math.round(greens.reduce((s, c) => s + c.b, 0) / greens.length);
    const toHex = (r, g, b) => '#' + [r,g,b].map(v => v.toString(16).padStart(2, '0')).join('');
    console.log('Average Green:', 'rgb(' + avgR + ',' + avgG + ',' + avgB + ')', toHex(avgR, avgG, avgB));

    // Sort by brightness/green vibrancy
    greens.sort((a, b) => (b.g - b.r) - (a.g - a.r));
    console.log('Vibrant leaf green:', greens[Math.round(greens.length * 0.1)].hex, 'rgb(' + greens[Math.round(greens.length * 0.1)].r + ',' + greens[Math.round(greens.length * 0.1)].g + ',' + greens[Math.round(greens.length * 0.1)].b + ')');
    console.log('Medium leaf green:', greens[Math.round(greens.length * 0.5)].hex, 'rgb(' + greens[Math.round(greens.length * 0.5)].r + ',' + greens[Math.round(greens.length * 0.5)].g + ',' + greens[Math.round(greens.length * 0.5)].b + ')');
    console.log('Deep leaf green:', greens[Math.round(greens.length * 0.85)].hex, 'rgb(' + greens[Math.round(greens.length * 0.85)].r + ',' + greens[Math.round(greens.length * 0.85)].g + ',' + greens[Math.round(greens.length * 0.85)].b + ')');
  }
});
