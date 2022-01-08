module.exports = {
    aliases: ["shop"],
    run: async (msg, args) => {
        if(args.length > 1) return

        switch(args[0]){
            case "2":
                msg.channel.send({ content: "Aquí puede ver los objetos a la venta", embeds: [embedsTienda.pagina2] }); break
            default:
                msg.channel.send({ content: "Aquí puede ver los objetos a la venta", embeds: [embedsTienda.pagina1] }); break
        }
    }
}