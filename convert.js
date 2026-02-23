const sharp = require('sharp');
const fs = require('fs');
const files = ['brow', 'hair', 'lash', 'master'];
files.forEach(name => {
    const inPath = `public/${name}.png`;
    const outPath = `public/${name}.webp`;
    if (fs.existsSync(inPath)) {
        sharp(inPath).webp().toFile(outPath).then(() => console.log(`Converted ${name}`)).catch(console.error);
    }
});
