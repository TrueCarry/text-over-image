const im = require('imagemagick');

function addText({
  image: image,
  output: output,
  text: text,
  color: color,
  x: x,
  y: y,
  w: w,
  h: h,
  pointsize: pointsize,
  font: font,
} = {}) {
  return new Promise((resolve, reject)=> {
    let args = [];

    if(!w && !h && !!pointsize){
      reject('No size params');
    }
    if(!text){
      reject('No text');
    }
    //Source image, if any
    if (image) args.push(image);

    //Set background transparent
    args.push('-background');
    args.push('transparent');

    //Add color, black if not set
    args.push('-fill');
    args.push(color || 'black');

    //Set size, if any
    if (w && h) {
      args.push('-size');
      args.push(`${w}x${h}`);
    } else {
      args.push('-pointsize');
      args.push(pointsize);
    }

    //Set font
    if(font) {
      args.push('-font');
      args.push(font);
    }

    //Set text
    args.push('caption:' + `${text}`);

    //Set offset
    args.push('-geometry');
    args.push(`+${x || 0}+${y || 0}`);

    //If we had source image, we should add this
    if(image){
      args.push('-composite');
    }

    if(output){
      args.push(output);
    }else{
      args.push('png:-')
    }

    im.convert(args, function (err, stdout) {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = addText;
