---
title: Moving off Google Photos
publishedAt: 25/02/2024
description: In this post, I talk about my motivation for moving off Google Photos and the steps I took to do so.
tags: [Self Hosting, Google, Photos, Immich, VPN, ZeroTier]
published: true
coverImage: /3.png
---

# The usual excuses

It's been quite some time since I talked about Snapgram and its development. A lot has happened, like me getting to intern at a new company called [RandomWalk](https://randomwalk.ai/)(where I've been working on some crazy projects, do checkout [Fortune Cookie](http://fortunecookie.randomwalk.ai/)), going outside, meeting new people, touching grass and all that. All that eventually led to me being slightly more carefree with my photos, and oof, my longtime primary Google account is on the verge of an overquota.

# The Google Photos Dilemma

Google Photos as a service is great really, especially compared to its market competitors, their features and pricing structures. But photos are aren't even a profession or even a hobby per se to me, and yet, it is an irreplaceably important part of everyone's life. I have even contemplpated getting a secondhand Pixel 2 just for the unlimited original quality uploads, but after weighing on it a bit, I decided to move off Google Photos, and here's why:

- **Privacy**: Google Photos is a part of the Google ecosystem, and I'm not a fan of the privacy implications of that. I'm not a privacy nut, but I do believe in the right to privacy, and I don't want to be a part of a system that doesn't respect that.
- **Ownership**: I don't own my photos on Google Photos. I can't even export them in a way that I can use them elsewhere(more on this later). I don't want to be in a position where I can't access my own photos.
- **Account Lockout**: I have been locked out of my Google account before, and it was a nightmare. I don't want to be in a position where I can't access my own photos.
- **Accessiblity**: I want to be able to access my photos from anywhere, and I don't want to be in a position where I can't access my own photos.

# The Search for Alternatives

Having my mind set on moving off Google Photos, I started looking for alternatives. Here are all the important factors I considered:

- **Cost**: I don't want to pay for something I don't use that much.
- **Privacy**: I want to be in control of my photos, so preferably something self hosted.
- **Accessiblity**: I want to be able to access my photos from anywhere, so I finally had to get my hands dirty with VPNs and ZeroTier,(which was a total breeze, considering I have already been using them for Minecraft with friends).
- **Ease of Use**: I don't want to spend too much time managing my photos, so I want something that's easy to use.
- **Automatic Backup**: I want my photos to be backed up automatically, so I don't have to worry about losing them. It's also a great way to keep my photos in sync across devices.

After a lot of research, I decided to go with [Immich](https://immich.app/). It's a self hosted photo management system, and it's been great so far. I have it running on my old laptop at home, and I can access it from anywhere using ZeroTier. Even though Immich is not advertised as stable software yet, it's been great so far, and I'm loving it. It's also been a great way to learn about self hosting, and I'm planning to self host more stuff in the future. I did dabble with Nextcloud, but it was a bit too much for my use case, and I didn't want to pay for a VPS just for my photos.

# The Setup

My Phone and Laptop are setup in the same Zerotier Mesh VPN with virtual static IPs(maybe even other family members in the future, Zerotier supports upto 15 nodes per network). I run a docker compose Immich setup that exposes the api @ localhost:2283, I configure the <Virtual Static IP>:2283 on my phone's Immich app, and I'm good to go. The phone app built with flutter comes with automatic foreground and background syncs, and I basically don't have to worry about my photos anymore. I might setup a cron job that backs up my photos folder in my Immich library to a different disk, but I'm not sure if I need to do that yet.

# The Future

One thing that bothers me and I would have to tackle eventually is data integrity and recoverability in case the single harddrive I store my entire lifetime's worth of photos dies on me. I looked into RAID5 and Fedora already uses btrfs, so I might learn a bit more about all that, and maybe even get a NAS in the future. The future is exciting, and I'm looking forward to it. Getting port forwarding working with Indian ISPs is a pain, so I am not sure how I would work with a NAS yet, but I'm sure I'll figure it out.
