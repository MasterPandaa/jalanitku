const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const svgPath = path.join(__dirname, '../public/favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const outDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // 1. Copy SVG to src/app/icon.svg and src/app/apple-icon.svg
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgBuffer);
  fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), svgBuffer);

  // 2. Generate PNG sizes: 16x16, 32x32, 48x48, 180x180, 192x192, 512x512
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(outDir, 'favicon-16x16.png'), p16);
  fs.writeFileSync(path.join(outDir, 'favicon-32x32.png'), p32);
  fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(outDir, 'android-chrome-192x192.png'), p192);
  fs.writeFileSync(path.join(outDir, 'android-chrome-512x512.png'), p512);

  // 3. Create a valid Windows ICO file containing 16x16, 32x32, and 48x48 PNGs
  // ICO header format:
  // 2 bytes reserved (0), 2 bytes type (1 = icon), 2 bytes image count
  // Each entry (16 bytes): width, height, colors, reserved, planes, bpp, size, offset
  const images = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ];

  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + (count * dirEntrySize);

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // image data offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('All favicons, Apple touch icons, and multi-res ICO generated successfully!');
}

generate().catch(console.error);
