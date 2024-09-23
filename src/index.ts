import { Attachment } from "./services/discord/types/attachment.types.js";
import { Embed } from "./services/discord/types/embed.types.js";
import WebhookService from "./services/discord/webhooks.js";
import { PexelsPhotoService } from "./services/pexels/photos.js";
import { Photo } from "./services/pexels/types.js";

let pexelsService: PexelsPhotoService, webhookService: WebhookService;

async function getRandomPexelsItem(): Promise<Photo> {
    const res = await pexelsService.searchPhoto({
        query: "frog",
        per_page: 50,
        page: 1,
    });
    if (res.photos.length == 0) throw new Error("No photos found");
    return res.photos[(Math.random() * res.photos.length) | 0];
}

async function main() {
    const apiToken = process.env.PEXELS_API_TOKEN;
    if (!apiToken)
        throw new Error("Missing environment variable 'PEXELS_API_TOKEN'");

    const webhook = process.env.DISCORD_WEBHOOK;
    if (!webhook)
        throw new Error("Missing environment variable 'DISCORD_WEBHOOK'");

    pexelsService = new PexelsPhotoService(apiToken);
    webhookService = await new WebhookService().init(webhook);

    const image = await getRandomPexelsItem();
    const embed: Embed = {
        title: image.id.toString(),
        description: image.alt,
        url: image.src.original,
        thumbnail: {
            url: image.src.tiny,
        },
        image: {
            url: image.src.original,
            height: 1000,
            width: 1000,
        },
        color: Number(image.avg_color.replace("#", "0x")),
        author: {
            name: `${image.photographer} on Pexels`,
            url: image.photographer_url,
        },
        footer: {
            text: "images provided by pexels",
            icon_url: "attachment://pexels.png",
        },
        fields: [
            {
                name: "width",
                value: image.width.toString(),
                inline: true,
            },
            {
                name: "height",
                value: image.height.toString(),
                inline: true,
            },
        ],
    };

    await webhookService.send_embeds([embed]);
}

main().catch(console.error);
