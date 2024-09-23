/**
 * For more information, see the [documentation](https://discord.com/developers/docs/resources/message#embed-object)
 */
export type Embed = {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
};

type EmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

type EmbedFooter = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

type EmbedImage = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedThumbnail = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedVideo = {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedProvider = {
    name?: string;
    url?: string;
};

type EmbedAuthor = {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

type EmbedField = {
    name: string;
    value: string;
    inline?: boolean;
};
