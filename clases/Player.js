const admin = require("firebase-admin")
const db = admin.firestore()
const FieldValue = require("firebase-admin").firestore.FieldValue

module.exports = class Player{
    _dinero;
    _items;
    _nivel;
    _salud;
    _xp;
    _ultimoDaily;
    _mundo;
    _ultimoMundo;
    _enMazmorra;
    _consumibles;
    _equipo;
    _mana;

    constructor(id, data){
        this._id = id
        this._dinero = data.dinero
        this._items = data.items
        this._nivel = data.nivel
        this._salud = data.salud
        this._xp = data.xp
        this._ultimoDaily = data.ultimoDaily
        this._mundo = data.mundo
        this._ultimoMundo = data.ultimoMundo
        this._enMazmorra = false
        this._consumibles = data.consumibles
        this._equipo = data.equipo
        this._mana = 0
    }

    get mana(){
        return this._mana
    }

    get id(){
        return this._id
    }

    get dinero(){
        return this._dinero
    }

    get items(){
        return this._items
    }

    get nivel(){
        return this._nivel
    }

    get salud(){
        return this._salud
    }

    get xp(){
        return this._xp
    }

    get ultimoDaily(){
        return this._ultimoDaily
    }

    get mundo(){
        return this._mundo
    }

    get ultimoMundo(){
        return this._ultimoMundo
    }

    get enMazmorra(){
        return this._enMazmorra
    }

    get consumibles(){
        return this._consumibles
    }

    get equipo(){
        return this._equipo
    }

    set mana(value){
        this._mana = value
    }

    set dinero(value){
        this._dinero = value
        db.collection("usuarios").doc(this._id).update({ dinero: value })
    }

    set items(value){
        this._items = value
        db.collection("usuarios").doc(this._id).update({ items: value })
    }

    set nivel(value){
        this._nivel = value
        db.collection("usuarios").doc(this._id).update({ nivel: value })
    }

    set salud(value){
        this._salud = value
        db.collection("usuarios").doc(this._id).update({ salud: value })
    }

    set xp(value){
        this._xp = value
        db.collection("usuarios").doc(this._id).update({ xp: value })
    }

    set ultimoDaily(value){
        this._ultimoDaily = value
        db.collection("usuarios").doc(this._id).update({ ultimoDaily: value })
    }

    set enMazmorra(value){
        this._enMazmorra = value
    }

    set mundo(value){
        this._mundo = value
        db.collection("usuarios").doc(this._id).update({ mundo: value })
    }

    equiparItem(tipo, value){
        this._equipo[tipo] = value
        db.collection("usuarios").doc(this._id).update({
            [`equipo.${tipo}`]: value
        })
    }

    incrementarUltimoMundo(value){
        this._ultimoMundo+=value
        db.collection("usuarios").doc(this._id).update({ ultimoMundo: FieldValue.increment(value) })
    }

    incrementarDinero(value){
        this._dinero = this._dinero + value
        db.collection("usuarios").doc(this._id).update({ dinero: FieldValue.increment(value) })
    }

    incrementarSalud(value){
        const maxHP = 40 + this._nivel * 5
        if(this._salud + value > maxHP){
            this._salud = maxHP
            db.collection("usuarios").doc(this._id).update({ salud: maxHP })
            return
        }
        if(this._salud + value <= 0){
            this._salud = 0
            db.collection("usuarios").doc(this._id).update({ salud: maxHP })
            return
        }
        this._salud = this._salud + value
        db.collection("usuarios").doc(this._id).update({ salud: FieldValue.increment(value) })
    }

    incrementarNivel(value){
        this._nivel = this._nivel + value
        db.collection("usuarios").doc(this._id).update({ nivel: FieldValue.increment(value) })
    }

    incrementarXP(value){
        this._xp = this._xp + value
        db.collection("usuarios").doc(this._id).update({ xp: FieldValue.increment(value) })
    }

    incrementarItems(value){
        this._items[value] = { encantamientos: [] }
        db.collection("usuarios").doc(this._id).update({
            [`items.${value}`]:
            {
                encantamientos: []
            }
        })
    }

    eliminarItem(value){
        delete this._items[value]
        db.collection("usuarios").doc(this._id).update({
            [`items.${value}`]: FieldValue.delete()
        })
    }

    incrementarConsumibles(value, cantidad){
        const previaCantidad = this._consumibles[value]?.cantidad ?? 0
        if(previaCantidad+cantidad <= 0){
            delete this._consumibles[value]
            db.collection("usuarios").doc(this._id).update({
                [`consumibles.${value}`]: FieldValue.delete()
            })
            return
        }
        this._consumibles[value] = { cantidad: previaCantidad+cantidad }
        db.collection("usuarios").doc(this._id).update({
            [`consumibles.${value}`]:
            {
                cantidad: previaCantidad+cantidad
            }
        })
    }

    atacar(){
        const armaEquipada = this._equipo["Arma"]
        if(!armaEquipada) return Math.floor(utils.generarNumeroRandom(25,50))
        
        const itemSnap = client.items.get(armaEquipada)
        return Math.floor(utils.generarNumeroRandom(25,50) * itemSnap.multiplicadorAT)
    }

    defenderse(ataque){
        const armaduraEquipada = this._equipo["Armadura"]
        if(!armaduraEquipada) return ataque

        const itemSnap = client.items.get(armaduraEquipada)
        return (ataque * (100 - itemSnap.defensaPorcentaje)) / 100
    }

    incrementarMana(value){
        this._mana += value
    }
}