import { Color, Locale, Orientation, Size, Photo } from "./types.ts";

export interface ISearchPhotoParams {
    query?: string;
    orientation?: Orientation;
    size?: Size;
    color?: Color;
    locale?: Locale;
    page?: number;
    per_page?: number;
}

export interface ISearchPhotoResponse {
    photos: Photo[];
    page: number;
    per_page: number;
    total_results: number;
    prev_page: number;
    next_page: number;
}
