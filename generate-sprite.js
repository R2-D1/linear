const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');

const inputDir = './src/assets/images/icons/library/';
const outputFile = '../src/assets/images/icons/sprite.svg';

const spriter = new SVGSpriter({
  mode: {
    symbol: {
      sprite: outputFile,
    },
  },
});

// Directory containing SVG files
const svgDir = path.join(inputDir);

fs.readdirSync(svgDir).forEach(file => {
  if (path.extname(file) === '.svg') {
    let filePath = path.resolve(svgDir, file);
    let svgContent = fs.readFileSync(filePath, 'utf8');

    // Replace fill and stroke attributes with currentColor
    svgContent = svgContent
      .replace(/fill="(?!none)[^"]+"/gi, 'fill="currentColor"')
      .replace(/stroke="(?!none)[^"]+"/gi, 'stroke="currentColor"');

    spriter.add(filePath, file, svgContent);
  }
});

spriter.compile((error, result) => {
  for (let mode in result) {
    for (let resource in result[mode]) {
      fs.writeFileSync(
        path.join(__dirname, result[mode][resource].relative),
        result[mode][resource].contents
      );
    }
  }
});
