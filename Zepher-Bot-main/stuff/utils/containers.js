const { ContainerBuilder, TextDisplayBuilder, SectionBuilder, ThumbnailBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js')

const palette = {
    brand: 0x5865F2,
    success: 0x3AE374,
    error: 0xFF4D6D,
    warning: 0xFFB020,
    info: 0x8B5CF6,
    neutral: 0x94A3B8
}

const icons = {
    brand: '✦',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    neutral: '•'
}

function normalizeDescription(value) {
    if (value === undefined || value === null || value === '') return 'No additional details.'
    return String(value)
        .replace(/\r\n/g, '\n')
        .trim()
}

function buildContainer(kind, title, description, linkButton, thumbnailUrl) {
    const accent = palette[kind] ?? palette.brand
    const displayTitle = String(title ?? 'Untitled').trim() || 'Untitled'
    const cleanDescription = normalizeDescription(description)
    const icon = icons[kind] ?? icons.neutral
    const badge = kind.toUpperCase()

    const headline = `# ${icon} ${displayTitle}`
    const meta = `-# ${badge} • sleek status card`
    const body = cleanDescription.includes('\n') ? cleanDescription : cleanDescription

    const content = [headline, meta, '', body].join('\n')

    const container = new ContainerBuilder().setAccentColor(accent)

    if (thumbnailUrl) {
        container.addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(new TextDisplayBuilder().setContent(content))
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(thumbnailUrl))
        )
    } else {
        container.addTextDisplayComponents(new TextDisplayBuilder().setContent(content))
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
    return buildContainer('success', title, description, linkButton, thumbnailUrl)
}

function errorContainer(title, description, linkButton) {
    return buildContainer('error', title, description, linkButton)
}

function infoContainer(title, description, linkButton) {
    return buildContainer('info', title, description, linkButton)
}

function warningContainer(title, description, linkButton) {
    return buildContainer('warning', title, description, linkButton)
}

function plainContainer(content) {
    return new ContainerBuilder()
        .setAccentColor(palette.brand)
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# ${icons.brand} Update\n\n${normalizeDescription(content)}`)
        )
}

module.exports = {
    successContainer,
    errorContainer,
    infoContainer,
    warningContainer,
    plainContainer,
    ComponentsV2Flags: MessageFlags.IsComponentsV2
}
