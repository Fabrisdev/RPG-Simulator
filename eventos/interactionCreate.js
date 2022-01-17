module.exports = async (interaction) => {
	if(interaction.isButton()){
		client.botones.find(boton => boton.regex.test(interaction.customId))?.run(interaction)
	}

    if (interaction.isCommand()) {
		const command = client.slashComandos.get(interaction.commandName)
		if (!command) return
		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(`[SLASH-CMD] Ha ocurrido un error mientras ${interaction.user.tag} ejecutaba el comando ${interaction.commandName}. Para más información leer debajo:`)
			console.error(error)
			return interaction.reply({ content: 'Hubo un error mientras se ejecutaba el comando. Por favor, contacta con Fabri (Fabri#6560).', ephemeral: true })
		}
	}

	
}