import asyncio

import discord
from discord.ext import commands
from config import DISCORD_TOKEN
from llm_client import LLMClient

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents, help_command=None)
# Une conversation par utilisateur : chacun garde son propre historique.
clients = {}


def get_client(user_id):
    if user_id not in clients:
        clients[user_id] = LLMClient()
    return clients[user_id]

@bot.event
async def on_ready():
    """Affiché quand le bot est connecté."""
    print(f"{bot.user.name} est connecté à Discord !")
    print(f"Invite link: https://discord.com/api/oauth2/authorize?client_id={bot.user.id}&permissions=2048&scope=bot")


@bot.event
async def on_message(message):
    """Gère les messages reçus."""
    # Ignorer les messages du bot
    if message.author == bot.user:
        return
    
    # Ignorer si le message ne commence pas par !eliza
    if not message.content.startswith("!eliza"):
        return
    
    # Extraire la question
    user_question = message.content[len("!eliza"):].strip()
    if not user_question:
        await message.channel.send("Pose-moi une question après `!eliza` !")
        return
    
    # Indiquer que le bot réfléchit
    async with message.channel.typing():
        # L'appel à Ollama peut durer plusieurs secondes : on le lance dans un thread
        # pour ne pas bloquer le bot (il continue de répondre aux autres salons).
        response = await asyncio.to_thread(get_client(message.author.id).query, user_question)
        
        # Créer l'embed AVEC la réponse
        embed = discord.Embed(
            title="🤖 LilleMove",
            description=response[:4096],  # limite Discord pour la description d'un embed
            color=0x00ff2a,
            timestamp=discord.utils.utcnow()
        )
        embed.set_footer(text="Réponse générée par LilleMove")
        
        # Envoyer l'embed via message.channel.send()
        await message.channel.send(embed=embed)
    
    await bot.process_commands(message)

if __name__ == "__main__":
    if not DISCORD_TOKEN:
        print("Erreur: DISCORD_TOKEN non configuré dans config.py ou .env")
        exit(1)
    
    print("Lancement du bot Discord LilleMove")
    bot.run(DISCORD_TOKEN)
