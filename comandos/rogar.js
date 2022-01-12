module.exports = {
    run: (msg, args) => {
        const userID = msg.author.id
        const dioses = ["Opera", "Faku", "Nebula", "Thry"]
        const dineroDado = utils.generarNumeroRandom(5,15)
        msg.channel.send(`Le rogaste al todo poderoso ${utils.elegirRandom(dioses)}, quien se apiadó de ti y te dió $${dineroDado}.`)
        client.jugadores.get(String(userID)).incrementarDinero(dineroDado)
    }
}