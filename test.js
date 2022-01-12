var myObject = {
    _firstname: "Fabri",
    _surname: "Cobucci",
    _age: 15,

    get age(){
        return this._age
    },

    set age(value){
        this._age = value * 10
    }
}
myObject.age = 5
console.log(myObject.age)
