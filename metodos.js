module.exports = class Metodos{
    elegirRandom(arr){
        return arr[Math.floor(Math.random() * arr.length)]
    }
    
    generarNumeroRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    obtenerOrdenInverso(prop) {    
        return function(a, b) {    
            return b[prop] - a[prop]    
        }    
    } 
}