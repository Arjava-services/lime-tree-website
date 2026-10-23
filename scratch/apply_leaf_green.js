const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

// Replace dark olive with natural botanical leaf green from user's image
css = css.replace('color: #2D3D22;', 'color: #4B601C;');
css = css.replace('background: rgba(45, 61, 34, 0.38);', 'background: rgba(75, 96, 28, 0.45);');
css = css.replace('color: #26361D;', 'color: #384A15;');
css = css.replace('color: #4C5D3A;', 'color: #556B22;');
css = css.replace('background: rgba(36, 52, 28, 0.98);', 'background: linear-gradient(150deg, #5B7222 0%, #46591A 100%);');
css = css.replace('color: #CDE0BE;', 'color: #E8EEB8;');
css = css.replace('color: #D3E0C9;', 'color: rgba(255, 255, 255, 0.88);');
css = css.replaceAll('color: #25361B;', 'color: #46591A;');

fs.writeFileSync('style.css', css, 'utf8');
console.log('✓ style.css updated with leaf green palette');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replaceAll('stroke="#25371D"', 'stroke="#46591A"');
fs.writeFileSync('index.html', html, 'utf8');
console.log('✓ index.html updated with leaf green stroke');
