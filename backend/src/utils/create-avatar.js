'use strict';

 
const { createCanvas } = require('canvas')


function _gen(name, size, callback) {

  name = name || '';
  size = size || 60;

  const canvas = createCanvas(size,size);
  const ctx = canvas.getContext('2d')

  const colours = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
    '#f1c40f', '#e67e22', '#e74c3c', '#f39c12', '#d35400', '#c0392b', '#7f8c8d'
  ];

  const nameSplit = String(name).toUpperCase().split(' ');

  let initials = '?';
  if (nameSplit.length === 1) {
    initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
  } else {
    initials = nameSplit[0].charAt(0) + nameSplit[nameSplit.length - 1].charAt(0);
  }

  let charsum = '?'.charCodeAt(0);
  if (name) {
    for (let i = 0; i < name.length; i++) {
      charsum += name.charCodeAt(i);
    }
  }

  const colourIndex = charsum % 17;

  ctx.fillStyle = colours[colourIndex - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = Math.round(canvas.width / 2) + 'px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFF';
  ctx.fillText(initials, size / 2, size / 1.5);

  if (callback && typeof callback === 'function') {
    if (!canvas.toBuffer) {
      callback(null, canvas.toDataURL());
      return;
    }
    return canvas.toBuffer(function (err, buffer) {
      callback(err, buffer);
    });
  }
  else {
    if (!canvas.toBuffer) {
      return canvas.toDataURL();
    }
    return canvas.toBuffer();
  }
}
 
exports.createAvatar = function (name, size) {
  return _gen(name, size);
};
