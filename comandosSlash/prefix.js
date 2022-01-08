module.exports = {
    data: new SlashCommands.SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Configuración del bot")
        .addSubcommand(subcommand => 
            subcommand
                .setName("set")
                .setDescription("Cambia la prefix del bot a una nueva.")
                .addStringOption(option => option.setName("prefix").setDescription("La nueva prefix del bot").setRequired(true))
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("reset")
                .setDescription("Devuelve la prefix del bot a la original.")    
        ),
    async execute(interaction){
        await interaction.deferReply()
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.editReply("No puedes ejecutar ese comando ya que no tienes el permiso necesario. (`MANAGE_GUILD`)")

        if(interaction.options.getSubcommand() === "set"){
            const nuevaPrefix = interaction.options.getString("prefix")
            const serverID = interaction.guild.id
            client.servers.get(serverID).setPrefix(nuevaPrefix)
            interaction.editReply(`La prefix ha sido cambiada a ${nuevaPrefix.toLowerCase()} satisfactoriamente!`)
        }

        if(interaction.options.getSubcommand() === "reset"){
            const serverID = interaction.guild.id
            client.servers.get(serverID).setPrefix("rpg ")
            interaction.editReply("La prefix ha sido devuelta a la por defecto satisfactoriamente!")
        }
    }
}