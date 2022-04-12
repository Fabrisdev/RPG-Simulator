module.exports = class Utils{
    static elegirRandom(arr){
        return arr[Math.floor(Math.random() * arr.length)]
    }
    
    static generarNumeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static obtenerOrdenInverso(prop) {    
        return function(a, b) {    
            return b[prop] - a[prop]    
        }    
    } 

    static sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

    static getRandomId = () => (Math.random() * 100).toString(36).replace('.', '').slice(-10)

    static roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      
      }


}