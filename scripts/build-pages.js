const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const docsDir = path.join(rootDir, 'docs');
const apiDir = path.join(rootDir, 'app', 'api');
const tempApiDir = path.join(rootDir, '.temp_api');
const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');

let apiMoved = false;

try {
  // Move app/api out temporarily so Next.js static export skips server API routes
  if (fs.existsSync(apiDir)) {
    console.log('🔄 Temporarily stashing app/api for static export...');
    fs.renameSync(apiDir, tempApiDir);
    apiMoved = true;
  }

  console.log('📦 1. Building static export for GitHub Pages...');
  execSync(`"${process.execPath}" "${nextBin}" build`, {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_EXPORT: 'true',
      NODE_ENV: 'production'
    }
  });

  console.log('📂 2. Copying out/ to docs/...');
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

  if (!fs.existsSync(outDir)) {
    console.error('❌ out/ directory not found after build.');
    process.exit(1);
  }

  if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(docsDir, { recursive: true });
  copyRecursiveSync(outDir, docsDir);

  // Guarantee .nojekyll exists
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');

  console.log('✅ Static build successfully exported to /docs for GitHub Pages!');
} catch (err) {
  console.error('❌ Build failed:', err);
  process.exitCode = 1;
} finally {
  // Always restore app/api
  if (apiMoved && fs.existsSync(tempApiDir)) {
    console.log('🔄 Restoring app/api...');
    fs.renameSync(tempApiDir, apiDir);
  }
}
