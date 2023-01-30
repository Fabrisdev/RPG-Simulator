const { Collection } = require('discord.js')

module.exports = class ItemsManager extends Collection{
    constructor(){
        super();
        this.set("1", { tipo: "Armas", nombre: "Espada de madera", precio: 500, emoji: '<:espadamadera:929207102109532211>', multiplicadorAT: 1.5 })
        this.set("2", { tipo: "Armas", nombre: "Hacha de madera", precio: 700, emoji: '<:hachamadera:929211502332882984>', multiplicadorAT: 2 })
        this.set("3", { tipo: "Consumibles", nombre: "Pan", precio: 100, emoji: '🍞', curacion: 20 })
        this.set("4", { tipo: "Armaduras", nombre: "Casco de diamante", precio: 1500, emoji: '<:casco:930913840311459860>', defensaPorcentaje: 90 })
        this.set("5", { tipo: "Mazmorras", nombre: "Llave de mazmorra", precio: 5000, emoji: '<:llave:931273942184894534>', utilidad: "Te permite entrar en una mazmorra" })
    }
}