var cuid = require('cuid');

var X_MIN = 1;
var X_MAX = 100;
var Y_MIN = 10;
var Y_MAX = 90;
var Z_MIN = 1;
var Z_MAX = 10;

var ns = {};

ns.generate = function(n) {
  var res = [];
  for (var i = 0; i < n; i++) {
   res.push(this.generateDatum([X_MIN, X_MAX]));
  }
  return res;
};
/*
balls.push(new Ball(svg, 501, 101, 'n1', 'red', Math.PI / 6));
balls.push(new Ball(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
balls.push(new Ball(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 90));
balls.push(new Ball(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
balls.push(new Ball(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
balls.push(new Ball(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));
*/

ns.generateDatum = function(domain) {
  return {
    id: this._uid(),
    x: this._randomIntBetween(domain[0], domain[1]),
    y: this._randomIntBetween(Y_MIN, Y_MAX),
    z: this._randomIntBetween(Z_MIN, Z_MAX),
    color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
    aoa: Math.PI / Math.round(Math.random() * 10),
    weight: this._randomIntBetween(Y_MIN, Y_MAX)
  };
};

ns._randomIntBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

ns._uid = function() {
  return cuid();
};

module.exports = ns;
