import { API_BASE_URL } from "./constants.js";
import { Attachment } from "./types/attachment.types.js";
import { Embed } from "./types/embed.types.js";
import { EmbedExecuteParams } from "./types/webhook.types.js";

export default class WebhookService {
    private __token: string;
    private __webhookId: string;

    public async init(webhook: string) {
        const response = await fetch(webhook);
        if (!response.ok) {
            const message = await response.text();
            throw new Error(
                `Unable to retrieve webhook details [${response.status} - ${response.statusText}]`,
            );
        }

        const data = await response.json();
        this.__token = data["token"];
        this.__webhookId = data["id"];
        return this;
    }

    private getWebhookUrl() {
        return `${API_BASE_URL}/webhooks/${this.__webhookId}/${this.__token}`;
    }

    public async send_embeds(embeds: Embed[], attachments?: Attachment[]) {
        if (embeds.length == 0)
            throw new Error("Expected at least 1, and at max 10 embeds.");
        if (embeds.length > 10)
            throw new Error(
                "Can only send a maximum of 10 embeds via discord webhooks.",
            );
        for (let i = 0; i < embeds.length; ++i) embeds[i].type = "rich";

        const headers = { "Content-Type": "application/json" };
        const data: EmbedExecuteParams = {
            embeds,
            ...(((attachments?.length ?? 0) > 0 && { attachments }) || {}),
        };

        const res = await fetch(this.getWebhookUrl(), {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const message = await res.text();
            throw new Error(
                `Failed to send the embeds [${res.status} - ${res.statusText}]\n${message}`,
            );
        }
    }
}
