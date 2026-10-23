const sharp = require('sharp');

sharp('scratch/ref_card1_crop.png').extract({left: 0, top: 0, width: 220, height: 160}).toFile('scratch/ref_card1_top_zoom.png').then(() => {
  console.log('Top zoom saved');
});
sharp('scratch/ref_card3_crop.png').extract({left: 0, top: 0, width: 220, height: 160}).toFile('scratch/ref_card3_top_zoom.png').then(() => {
  console.log('Card 3 top zoom saved');
});
sharp('scratch/ref_card2_crop.png').extract({left: 0, top: 0, width: 230, height: 160}).toFile('scratch/ref_card2_top_zoom.png').then(() => {
  console.log('Card 2 top zoom saved');
});
