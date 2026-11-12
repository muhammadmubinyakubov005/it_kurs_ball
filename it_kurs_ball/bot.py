"""
IT KURS GAMIFIKATSIYA — TELEGRAM BOT
Ushbu bot Telegramda Mini-Appni (Web App) ochish tugmasini beradi.
"""

import json
import os
import time
import urllib.request
import urllib.parse

# 1. Botingiz Tokeni (muhit o'zgaruvchisidan olinadi):
BOT_TOKEN = os.environ.get("BOT_TOKEN", "")

# 2. Vercel'ga yuklangan Mini-App havolasi (HTTPS bo'lishi shart):
WEBAPP_URL = "https://itkursball.vercel.app"

BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

def send_message(chat_id, text, reply_markup=None):
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    
    req = urllib.request.Request(
        f"{BASE_URL}/sendMessage",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Xatolik: {e}")
        return None

def main():
    print("🤖 IT Kurs Ball Boti ishga tushdi...")
    offset = 0

    while True:
        try:
            url = f"{BASE_URL}/getUpdates?offset={offset}&timeout=20"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode())

            for update in data.get("result", []):
                offset = update["update_id"] + 1
                msg = update.get("message")
                if not msg:
                    continue

                chat_id = msg["chat"]["id"]
                text = msg.get("text", "")

                if text.startswith("/start"):
                    welcome_text = (
                        "👋 <b>Assalomu alaykum, yosh dasturchi!</b>\n\n"
                        "⚡ <b>CODE ACADEMY</b> reyting va ballar tizimiga xush kelibsiz!\n\n"
                        "Bu yerda siz:\n"
                        "• O'z ballaringiz (XP) va darajangizni bilasiz 🪙\n"
                        "• Guruhdagi jonli reyting va o'rningizni ko'rasiz 🏆\n"
                        "• Ballarni ajoyib IT sovg'alarga almashtirasiz 🎁\n\n"
                        "<i>Pastdagi tugmani bosing va ilovani oching:</i>"
                    )

                    # Telegram WebApp tugmasi
                    keyboard = {
                        "inline_keyboard": [
                            [
                                {
                                    "text": "🚀 Ilovani Ochish (Reyting & Ballar)",
                                    "web_app": {"url": WEBAPP_URL}
                                }
                            ]
                        ]
                    }

                    send_message(chat_id, welcome_text, keyboard)

        except Exception as e:
            print("Kutilmagan xato:", e)
            time.sleep(2)

if __name__ == "__main__":
    main()
