from random import choice
import requests
import os


def get_frog(pexels_api_base, pexels_token):
    req_url = pexels_api_base + "/search?query=frog&per_page=30"
    res = requests.get(req_url, headers = dict(Authorization = pexels_api_token))
    if res.status_code < 300:
        return choice(res.json()["photos"])

def send_frog(frog, webhook):
    image_url = frog["src"]["original"]
    image_name = os.path.basename(image_url)
    image_data = requests.get(image_url).content
    requests.post(
        f"{discord_webhook_url}/{discord_webhook_id}/{discord_webhook_token}", 
        files=dict(
            file = (image_name, image_data)
        )
    )

def main(wh_id, wh_token, wh_url, api_token, api_base):
    webhook = f"{wh_url}/{wh_id}/{wh_token}"
    send_frog(get_frog(api_base, api_token), webhook)

if __name__ == "__main__":
    from dotenv import load_dotenv
    import schedule
    import time
    load_dotenv()
    
    discord_webhook_id = os.environ.get("DISCORD_WEBHOOK_ID")
    discord_webhook_token = os.environ.get("DISCORD_WEBHOOK_TOKEN")
    discord_webhook_url = os.environ.get("DISCORD_WEBHOOK_BASE")
    pexels_api_token = os.environ.get("PEXELS_API_TOKEN")
    pexels_api_base = os.environ.get("PEXELS_API_BASE")
    
    schedule.every().day.at("10:00").do(
        main,
        discord_webhook_id,
        discord_webhook_token,
        discord_webhook_url,
        pexels_api_token,
        pexels_api_base
    )
    
    while True:
        schedule.run_pending()
        time.sleep(60)