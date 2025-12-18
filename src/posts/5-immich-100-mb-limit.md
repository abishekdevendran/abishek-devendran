---
title: 'Breaking the 100MB Limit: Self-Hosting Immich with Oracle Cloud & Tailscale'
publishedAt: '2025-12-18'
description: "How I engineered a free, secure, and unlimited reverse proxy for my home server using Oracle's Free Tier to bypass Cloudflare Tunnel limits."
tags: ['self-hosting', 'oracle-cloud', 'immich', 'tailscale', 'nginx', 'home-lab']
published: true
coverImage: /5.jpg
author: Abishek Devendran
---

# Life Update

It has been almost a year since my last post. A lot has changed—I’ve moved to Chennai and joined **Amazon as an SDE-I**. While my day job involves building massive-scale systems, my love for tinkering with my home lab hasn't faded. In fact, it's only gotten stronger.

Today, I want to share how I solved a frustrating problem with my self-hosted photo library, **Immich**.

---

# The Problem: The "Free Tier" Trap

I recently migrated from Google Photos to [Immich](https://immich.app/), hosted on my Fedora desktop at home. Since my ISP uses CGNAT (no public IP), I initially used a **Cloudflare Tunnel** to access it remotely.

It worked perfectly... until I tried to upload a 4K video.

### The Wall

Cloudflare's free tier imposes a strict **100MB upload limit**. For backup software, this is a dealbreaker. I needed a way to stream gigabytes of data to my home server without paying for a static IP or an expensive enterprise tunnel.

# The Solution: The Oracle Relay

I engineered a custom reverse proxy using **Oracle Cloud's Always Free Tier**. It acts as a gateway, accepting traffic from the internet and tunneling it privately to my home desktop.

## The Architecture (For 5-Year-Olds)

Think of my home server as a **Secret Treehouse**. It has no door to the outside world (CGNAT).

1.  **The Bouncer (Oracle VPS):** I got a free house (VPS) in the cloud that _does_ have a front door (Public IP).
2.  **The Secret Tunnel (Tailscale):** I dug a private underground tunnel connecting the Cloud House to my Treehouse.
3.  **The Butler (Nginx):** When I visit `immich.abishek.work`, the Butler at the Cloud House takes my package (video file) and runs it through the tunnel to the Treehouse.

## The Tech Stack (For SDEs)

- **Compute:** Oracle VM.Standard.A1.Flex (4 OCPUs, 24GB RAM) - _Free_
- **Networking:** Tailscale (Mesh VPN) - _Free_
- **Proxy:** Nginx with `client_max_body_size 0;`
- **Security:** UFW + Fail2Ban + Let's Encrypt

# The Implementation Challenges

It wasn't straightforward. Oracle Cloud is notorious for its security complexity. Here is how I cracked it.

### 1. The Double Firewall Lock

Oracle instances are locked down twice:

- **VCN Security List:** The cloud-level firewall.
- **IPTables:** The OS-level firewall.

Most tutorials miss the second one. Even if you open Port 443 in the Cloud Console, the Ubuntu instance will silently drop the packets. I had to perform a "Nuclear Flush" of the default `iptables` rules and switch to `ufw` to strictly allow only SSH, HTTP, HTTPS, and the Tailscale UDP port.

### 2. The "Offline" Fedora Desktop

Connecting my home desktop was tricky because Fedora's `firewalld` treats new network interfaces as untrusted by default. My desktop was connected to Tailscale but refusing all traffic.

The fix was explicitly trusting the `tailscale0` interface:

```bash
# Trust the tunnel
sudo firewall-cmd --permanent --zone=trusted --add-interface=tailscale0
sudo firewall-cmd --reload
```

### 3. Nginx Tuning

To handle large video uploads, the default Nginx config isn't enough. I had to explicitly disable the body size limit and tune the proxy timeouts to ensure long uploads didn't time out halfway through.

```nginx
server {
    server_name immich.abishek.work;

    # The magic line
    client_max_body_size 0;

    location / {
        # Proxying to the static Tailscale IP of my desktop
        proxy_pass [http://100.82.62.27:2283](http://100.82.62.27:2283);
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Security Considerations

Exposing a home server to the public internet is risky. I implemented a "Defense in Depth" strategy:

Fail2Ban: Bans IPs instantly after 5 failed attempts.

Rate Limiting: Nginx is configured to drop traffic if a single IP floods the server (DDoS protection).

Tailscale Isolation: The VPS acts as a DMZ. If the VPS is compromised, the attacker still has to cross the Tailscale authentication layer to reach my home network.

## Conclusion

I now have a professional-grade, unlimited backup solution for ₹0/month. It handles 4GB video uploads effortlessly, and I own my data completely.

If you're stuck behind CGNAT or Cloudflare limits, give this architecture a shot. It's a bit more work than a one-click tunnel, but the control you get is worth every second.
