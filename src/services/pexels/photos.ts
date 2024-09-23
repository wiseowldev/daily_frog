import { API_BASE_URL } from "./constants.js";
import {
    ISearchPhotoParams,
    ISearchPhotoResponse,
} from "./photos.interfaces.js";

export class PexelsPhotoService {
    private __token: string;

    constructor(apiToken: string) {
        this.__token = apiToken;
    }

    public async searchPhoto(
        params: ISearchPhotoParams,
    ): Promise<ISearchPhotoResponse> {
        const sParams = new URLSearchParams();
        const entries = Object.entries(params);
        for (let i = 0; i < entries.length; i++) {
            const [k, v] = entries[i];
            if (v !== undefined) sParams.set(k, v.toString());
        }

        const response = await fetch(
            `${API_BASE_URL}/v1/search?${sParams.toString()}`,
            {
                headers: {
                    Authorization: this.__token,
                },
            },
        );

        if (!response.ok)
            throw new Error(
                `Error searching for images [code: ${response.status}]`,
            );
        return await response.json();
    }
}
