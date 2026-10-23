const sharp = require('sharp');

function analyzeTop(filePath, name) {
  sharp(filePath).raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
    const { width, height, channels } = info;
    console.log(`\n=== Analyzing ${name} (${width}x${height}) ===`);
    // Sample rows at y = 10, 30, 50, 70, 90, 110, 130
    for (let y of [10, 25, 45, 70, 95, 120, 140]) {
      let firstPhotoX = -1, lastPhotoX = -1;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        // If not cream background (cream is r>230, g>225, b>215) and not green hero background
        // Photo tends to have warmer/different tones or darker
        const isCream = (r > 235 && g > 230 && b > 220);
        const isOuterBg = (r > 200 && g > 200 && b < 180);
        if (!isCream && !isOuterBg && (r < 225 || g < 220 || b < 210)) {
          if (firstPhotoX === -1) firstPhotoX = x;
          lastPhotoX = x;
        }
      }
      console.log(`y=${y}: photo from x=${firstPhotoX} to x=${lastPhotoX}`);
    }
  });
}

analyzeTop('scratch/ref_card1_top_zoom.png', 'Card 1 Top');
analyzeTop('scratch/ref_card3_top_zoom.png', 'Card 3 Top');
