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
}