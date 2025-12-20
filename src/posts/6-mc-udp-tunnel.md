---
title: 'The Loopback: Over-Engineering a Minecraft Server with Oracle Cloud, Tailscale, and Docker'
publishedAt: '2025-12-20'
description: "How I bypassed CGNAT to host a modded, server-side-only Minecraft fabric instance on my Fedora workstation, controlled via a custom Discord bot."
tags: ['minecraft', 'self-hosting', 'tailscale', 'docker', 'python', 'nginx', 'fabric']
published: true
coverImage: /6.webp
author: Abishek Devendran
---

# Life Update & The Problem

It has been a busy few months. Between settling into my role as an **SDE-I at Amazon** and adjusting to life in Chennai, my home lab has been gathering a bit of dust. But recently, the urge to punch trees returned. My friends wanted to play Minecraft.

The problem? **Networking.**

My ISP, like most in India, puts me behind **CGNAT**. I don't have a public IP address. My powerful Fedora workstation (Ryzen 5, 32GB RAM) is effectively invisible to the internet.

I had three options:
1.  **Pay for a Realm:** (Expensive, low performance, no mods).
2.  **Use Hamachi:** (Gross. Requires everyone to install software).
3.  **Over-engineer a solution using enterprise-grade cloud tools for zero cost.**

Obviously, I chose option 3. I call it **"The Loopback."**

---

# The Architecture

The goal was simple: My friends type `mc.abishek.work` into their vanilla Minecraft launcher, and they connect. No VPNs, no client-side mods, no friction.

Here is the Rube Goldberg machine I built to make that packet travel from their PC to my bedroom:

1.  **The Front Door (Oracle Cloud):** An "Always Free" ARM VPS acting as the public gateway.
2.  **The Tunnel (Tailscale):** A WireGuard mesh VPN connecting the Cloud VPS to my Fedora Desktop.
3.  **The Proxy (Nginx Stream):** Forwarding raw TCP/UDP traffic from the Cloud to the Tunnel.
4.  **The Engine (Docker):** A containerized Fabric server running on my desktop.
5.  **The Remote (Discord Bot):** A Python script that lets us spin up the infrastructure via slash commands.

---

# Layer 1: The Gateway (Oracle & Nginx)

I used Oracle Cloud's **VM.Standard.A1.Flex** instance. It’s generous (4 OCPUs, 24GB RAM) and, crucially, has a static Public IP.

### The "Stream" Problem
Standard Nginx is great for websites (HTTP), but Minecraft speaks **TCP** (on port 25565). You can't just `proxy_pass` it like a web page. I had to use the Nginx `stream` module to handle raw TCP forwarding.

The config essentially says: *"If anyone knocks on port 25565, blindfold them and shove them down the tunnel to 100.82.62.27."*

```nginx
stream {
    upstream minecraft {
        server 100.82.62.27:25565;
    }
    server {
        listen 25565;
        listen 25565 udp;
        proxy_pass minecraft;
    }
}
```

*Note: I also had to fight a three-boss gauntlet of firewalls: Oracle Security Lists (Cloud), UFW (Ubuntu), and Firewalld (Fedora). If you try this, remember: allow UDP/TCP on both ends.*

---

# Layer 2: The Engine (Docker & Fabric)

I refuse to install Java versions globally on my daily driver Fedora machine. **Docker** is the answer.

I used the `itzg/minecraft-server` image, which is the gold standard for containerized Minecraft. It handles the EULA, the Java version management, and the mod loader download automatically.

### The `docker-compose.yml`
This is the heart of the operation. I pinned the version to **1.21.1** to ensure stability with my chosen mods.

```yaml
services:
  mc:
    image: itzg/minecraft-server
    container_name: mc-server
    environment:
      TYPE: "FABRIC"
      VERSION: "1.21.1"
      MEMORY: "8G"
      MOTD: "\u00A7b\u00A7lThe Loopback \u00A7r\u00A77- \u00A7o127.0.0.1 via the Cloud"
      Icon: "server-icon.png" 
      # Security
      ENABLE_WHITELIST: "TRUE"
      ONLINE_MODE: "FALSE" # (More on this later)
    ports:
      - "25565:25565" # Game
    volumes:
      - ./data:/data
```

---

# Layer 3: The "Vanilla+" Modpack

This is where the magic happens. I wanted a modded experience (new biomes, structures, optimization) but **I didn't want my friends to install Fabric.**

The solution? **Server-Side Only Mods.**

These mods use standard vanilla blocks to generate custom structures. The server does the math; the client just sees "Oak Planks" arranged in a new shape.

### 🌍 World Generation (The "Stardust" Suite)
* **Terralith:** The MVP. Overhauls the Overworld with 85+ new biomes (Canyons, Volcanoes, Alpine Highlands) without adding a single new block.
* **Incendium:** Does for the Nether what Terralith does for the Overworld. Adds "Sanctums" and hanging gardens.
* **Nullscape:** Makes the End generation 128 blocks taller and infinitely more terrifying.

### 🏰 Structures
* **Structory:** Adds lore-friendly ruins, graveyards, and cottages that blend seamlessly into the world.
* **Yung's Better Series:** Completely reworks Mineshafts, Dungeons, and Strongholds to be actual challenges rather than boring boxes.

### ⚡ Performance & Tech
Since I'm hosting this on the same machine I use for coding and browsing, efficiency is key.
* **Lithium:** Optimizes game physics and chunk loading.
* **FerriteCore:** Slashes RAM usage (crucial for keeping within my 8GB allocation).
* **ModernFix:** Patches random bugs and speeds up startup.

---

# Layer 4: The Controller (Discord Bot)

I don't leave the server running 24/7. It wastes electricity and heats up my room. But I didn't want to SSH in every time a friend wanted to play.

I wrote a custom Discord bot in Python (`mc_bot.py`) that lives on the Oracle Cloud VPS. It acts as the remote control for my home PC.

### The Logic
1.  **Command:** Friend types `/mine` in Discord.
2.  **Tunnel:** The Bot uses `paramiko` to SSH into my Fedora machine via the private Tailscale IP.
3.  **Action:** It executes `docker start mc-server`.
4.  **Feedback:** It updates the Discord status to **"Playing The Loopback"** and posts a green Embed: *"The Loopback is spooling up..."*

### The "Force Stop" Safety
I implemented a smart `/stop` command.
* If players are online (checked via RCON), the bot **refuses** to stop the server to prevent data loss.
* If I (the Admin) need to kill it, I can use `/stop force:True`, which bypasses the check.

```python
# Snippet of the safety check
match = re.search(r"There are (\d+) of", rcon_out)
if match and int(match.group(1)) > 0 and not force:
    await interaction.followup.send("❌ Cannot Stop. Players are online!")
    return
```

---

# The "Pirate" Problem & Security

Since not everyone in our group owns a legitimate copy of Minecraft (don't ask), I had to set `ONLINE_MODE: "FALSE"`.

This is dangerous. It means the server doesn't verify usernames. Anyone could log in as "Abishek", steal my admin permissions, and grief the server.

To fix this, I installed **EasyAuth**. It's a server-side authentication mod.
* When you join, you are frozen (invulnerable, unable to move/break blocks).
* You must type `/login <password>` to unlock your character.
* It effectively adds a 2FA layer inside the game itself.

---

# Conclusion

The Loopback is now live.
* **Cost:** ₹0/month.
* **Performance:** Better than any shared hosting I've used.
* **Convenience:** Fully automated via Discord.

It connects my cloud infrastructure to my physical hardware in a way that feels seamless. And the best part? When I'm exploring a massive Terralith volcano, I know that the entire world is being served from a container running quietly in the background of my Fedora desktop.

If you have a spare PC and a bit of patience, stop paying for Realms. Build a tunnel.