const { ContainerBuilder, TextDisplayBuilder, SectionBuilder, ThumbnailBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js')

// New vibrant color scheme
const brandColor = 0x5865F2      // Discord Blurple
const successColor = 0x00FF41     // Neon Green
const errorColor = 0xFF4365       // Hot Pink/Red
const warningColor = 0xFFB81C     // Vibrant Orange

function buildContainer(color, title, description, linkButton, thumbnailUrl) {
    const container = new ContainerBuilder().setAccentColor(color)
    
    // Enhanced text with more styling
    const text = new TextDisplayBuilder().setContent(`**${title}**\n${description}`)

    if (thumbnailUrl) {
        container.addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(text)
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(thumbnailUrl))
        )
    } else {
        container.addTextDisplayComponents(text)
    }

    if (linkButton) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(linkButton.label)
                .setURL(linkButton.url)
                .setStyle(ButtonStyle.Link)
        )
        container.addActionRowComponents(row)
    }

    return container
}

function successContainer(title, description, linkButton, thumbnailUrl) {
    return buildContainer(successColor, title, description, linkButton, thumbnailUrl)
}

function errorContainer(title, description) {
    return buildContainer(errorColor, title, description)
}

function infoContainer(title, description, linkButton) {
    return buildContainer(brandColor, title, description, linkButton)
}

function warningContainer(title, description, linkButton) {
    return buildContainer(warningColor, title, description, linkButton)
}

function plainContainer(content) {
    return new ContainerBuilder()
        .setAccentColor(brandColor)
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(content)
        )
}

module.exports = { successContainer, errorContainer, infoContainer, warningContainer, plainContainer, ComponentsV2Flags: MessageFlags.IsComponentsV2 }
