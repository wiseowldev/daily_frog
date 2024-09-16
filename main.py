from random import seed, choice
from time import time
import requests
import logging

class PexelsService:
    BASE_URL = "https://api.pexels.com"

    def __init__(self, api_token: str):
        self.__api_token = api_token
        self.__logger = logging.getLogger(self.__class__.__name__)

    def search_image(self, query: str):
        url = f"{self.BASE_URL}/v1/search"
        params = {"query":  query.encode("utf-8")}
        headers = {"Authorization": self.__api_token}
        response = requests.get(url, params=params, headers=headers)

        if not response.ok:
            self.__logger.error(f"pexels api responded with code {response.status_code}")
            return

        seed(time())
        return choice(response.json()["photos"])


class DiscordWebhookService:
    BASE_URL = "https://discord.com/api/webhooks"

    def __init__(self, channelId, token):
        self.__channelId = channelId
        self.__token = token
        self.__logger = logging.getLogger(self.__class__.__name__)

    def send_file(self, filename: str, fbytes: bytes):
        try:
            url = f"{self.BASE_URL}/{self.__channelId}/{self.__token}"
            response = requests.post(url, files={
                "file": (filename, fbytes)
            })
            if not response.ok:
                self.__logger.error(f"failed to send file, response code {response.status_code}")
                return -1
        except Exception as e:
            self.__logger.error(f"An error of type '{type(e).__name__}' occurred")
            return -1


if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    load_dotenv() if os.environ.get("GITHUB_ACTIONS", "false") == "true" else load_dotenv("./.env")

    logging.basicConfig(level=logging.INFO,
                        format="[%(name)s] %(levelname)s: %(msg)s")
    logger = logging.getLogger("main")

    if (discord_webhook_url := os.environ.get("DISCORD_WEBHOOK")) is None:
        logger.error("Missing environment variable 'DISCORD_WEBHOOK'")

    if (pexels_api_token := os.environ.get("PEXELS_TOKEN")) is None:
        logger.error("Missing environment variable 'PEXELS_TOKEN'")

    response = requests.get(discord_webhook_url)
    if not response.ok:
        logger.error(f"Could not retrieve webhook information, code {response.status_code}")
        exit(1)

    webhook_data = response.json()
    pexels_service = PexelsService(pexels_api_token)
    webhook_service = DiscordWebhookService(
        webhook_data["channel_id"], 
        webhook_data["token"]
    )

    pexels_response = pexels_service.search_image("frog")
    if pexels_response != None:
        image_url = pexels_response["src"]["original"]
        image_name = os.path.basename(image_url)
        response = requests.get(image_url)
        if not response.ok:
            logger.error(f"failed to fetch '{image_name}' from <{image_url}>, code {response.status_code}")
            exit(1)

        if DiscordWebhookService.send_file(image_name, response.content) == -1:
            exit(1)