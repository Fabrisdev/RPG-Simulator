const { registerFont, createCanvas, loadImage } = require("canvas")

/**
 * Crea una tarjeta con canvas
 * @param {string} texto 
 * @param {Interaction} userInteraction 
 * @param {number} vidaDragon 
 * @param {number} vidaDragonTotal 
 * @param {object} userSnap 
 * @returns Buffer
 **/

module.exports.crearTarjeta = async (texto, userInteraction, dragon, userSnap) => {
        //puede que haya problema acá porque puede que se tenga que poenr al lado  del cimpotrt
        registerFont("fonts/Dankduck.ttf", { family: "Dankduck" })
        registerFont("fonts/Daddy Day.ttf", { family: "Daddy Day" })

        const userVida = userSnap.salud
        const userHPMax = 40 + userSnap.nivel * 5
        const userMana = userSnap.mana

        const canvas = createCanvas(800, 400)
        const context = canvas.getContext("2d")

        //BACKGROUND
        const background = await loadImage("img/bgmazmorras.png")
        context.drawImage(background, 0, 0, canvas.width, canvas.height)

        //RECTANGULOS
        context.beginPath()
        context.rect(32, 115, 16, 55)
        context.rect(32, 198, 16, 55)
        context.rect(32, 280, 16, 55)
        context.fillStyle = "#00B3FF"
        context.fill()

        context.rect(32, 115, 16, 55)
        context.rect(32, 198, 16, 55)
        context.rect(32, 280, 16, 55)
        context.lineWidth = "2"
        context.strokeStyle = "#ffffff"
        context.stroke()
        context.closePath()

        //TEXTO
        let fontSize = 90
        context.font = `${fontSize}px Dankduck`
        while (context.measureText(texto).width > canvas.width) {
            fontSize -= 5
            context.font = `${fontSize}px Dankduck`
        }
        context.fillStyle = "#ffffff"
        context.fillText(texto, canvas.width / 2 - (context.measureText(texto).width / 2), 100)

        context.font = "50px Daddy Day"
        context.fillText(`VIDA DEL DRAGON: ${dragon.vida}/${dragon.maxVida}`, 67, 160)
        context.fillText(`VIDA DE ${userInteraction.username}: ${userVida}/${userHPMax}`, 67, 242)
        context.fillText(`CARGA DEL MANA: ${userMana}/100%`, 67, 324)

        //FOTO DE PERFIL
        context.strokeRect(0, 0, canvas.width, canvas.height)
        utils.roundRect(context, 601, 137, 177, 177, 25, true);
        context.closePath()
        context.clip()
        const avatar = await loadImage(userInteraction.displayAvatarURL({ format: "jpg" }))
        context.drawImage(avatar, 601, 137, 177, 177)
        return canvas.toBuffer()
    }