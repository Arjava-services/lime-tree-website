const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Hope3\\.gemini\\antigravity-ide\\brain\\58f4e440-ed78-447f-b5c4-72213c14568d';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.jpg')) {
    // clean name by stripping _timestamp
    const cleanName = file.replace(/_\d+\.jpg$/, '.jpg');
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, cleanName));
    console.log(`Copied ${file} -> ${cleanName}`);
  }
});

console.log('All images copied successfully!');
