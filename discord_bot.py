import discord
from discord.ext import commands
from config import DISCORD_TOKEN
from llm_client import LLMClient

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents, help_command=None)
eliza = LLMClient()

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
        # Obtenir la réponse via ton LLMClient
        response = eliza.query(user_question)
        
        # Créer l'embed AVEC la réponse
        embed = discord.Embed(
            title="🤖 LilleMove",
            description=response[:2000],  # Discord limite les embeds à 2000 caractères
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
