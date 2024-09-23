import { Attachment } from "./attachment.types.js";
import { Embed } from "./embed.types.js";

type BaseExecuteParams = {
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    allowed_mentions?: "roles" | "users" | "everyone";
    attachments?: Attachment[];
    thread_name?: string;
    applied_tags?: string[];
};

export type EmbedExecuteParams = BaseExecuteParams & {
    embeds?: Embed[];
};

export type ContentExecuteParams = BaseExecuteParams & {
    content: string;
};
