const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'out');
const destDir = path.join(__dirname, '..', 'docs');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(srcDir)) {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });
  copyRecursiveSync(srcDir, destDir);
  console.log('✓ Successfully exported static build to /docs for GitHub Pages!');
} else {
  console.error('Error: out directory not found.');
}
