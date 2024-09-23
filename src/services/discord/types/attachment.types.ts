/**
 * For more information, see [documentation](https://discord.com/developers/docs/resources/message#attachment-object)
 */
export type Attachment = {
    id: string;
    filename: string;
    title?: string;
    description?: string;
    content_type?: string;
    size?: number;
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
    ephermal?: boolean;
    duration_secs?: number;
    waveform?: string;
    flags?: number;
};
