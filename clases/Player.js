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

    incrementarDinero(value){
        this._dinero = this._dinero + value
        db.collection("usuarios").doc(this._id).update({ dinero: FieldValue.increment(value) })
    }

    incrementarSalud(value){
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
        this._items[value] = {encantamientos: [] }
        db.collection("usuarios").doc(this._id).update({ items: {[value]: {encantamientos: []} }})
    }
}