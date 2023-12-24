---
title: Snapgram Devlog (Part 1)
publishedAt: 24/12/2023
description: Devlog update detailing the progress of Snapgram
tags: [Devlog, Snapgram, Sveltekit, Personal Project, SQL, DrizzleORM]
published: true
coverImage: /2.png
---

It's been a while since I've posted anything on here, and it's already Christmas Eve. Maintaining blogs is harder than I initially gave it credit for (just like with everything that involves Habits).

![Merry Christmas and a Happy New Year!](https://2.bp.blogspot.com/-P0r1g9bD8OI/WFxbo4yRiCI/AAAAAAAAkWE/_4_eIucjGXYNoNIE-tFuX6lXW4fR_gRRQCLcB/s400/christmas%2Bgif.gif)

As an aspiring CS undergrad, I have been throwing myself at oppurtunities for a while now, to no avail. So I decided to dwell less on the sad state of the Software Job Market (~~hard cope~~), and start fleshing out some interesting ideas to populate my portfolio.

## What's Snapgram?

I wanted to build something easy to demonstrate, but also while challenging the boundaries of what I already know. I decided to build an Instagram clone (very original, I know), but follow through with it as if I would with a real project, from Architecture diagram, Schema design, to deployment.

### I'm not a designer

Taking this project seriously means I have to take the design seriously. I'm not a designer, and I tried to pick up Figma. 10 mins in, I decided that my UI/UX skills from an elective was more than sufficient to wing it as the project goes on. With [TailwindCSS](https://tailwindcss.com/) and [ShadCN Svelte](https://www.shadcn-svelte.com/) at my disposal, even I can't screw up the design that hard (nevermind, I jinxed it, I think).

### Initial Stack

#### SveteKit

I decided to go with [SvelteKit](https://kit.svelte.dev/) for the frontend. I have been loving my time in Svelteland for quite some time now, and am pumped about what [the future](https://svelte-5-preview.vercel.app/docs/runes) has in store, so I decided to be an early adopter and use SvelteKit+Svelte 5+Typescript for the frontend. No regrest so far, and I'm loving the DX. If I had to nitpick, the Typescript support is a bit lacking, but I'm sure it'll get better as Svelte 5 reaches stability.

#### DrizzleORM

This was a hard choice, one that I'm glad I stuck with. In the past, I have used MongoDB and NoSQL in places where SQL is supposed to shine, with a sense of guilt hanging over my head. I decided to plan stuff out beforehand this time around, and planned a preliminary schema for the project. I learnt about the nuances of all Joins, and decided to try and build with utmost 1 query per functionality.
I decided to go with [DrizzleORM](https://orm.drizzle.team) for the ORM, since it also compliments my "utmost 1 query per functionality" approach, and I'm glad I did. It's a very lightweight ORM, and it's Typescript support is amazing. I'm not sure if I'm using it right, but I'm loving it so far. I initially didn't fathom its custom Query Builder syntax, but once I built a 3 step nested Join with partial select in both Raw SQL, Drizzle Select, and Drizzle Query Builder, I was sold. The Relationship support is also amazing, and helps me visualize my own schema better. (The Prepared statements, MySQL and Drizzle in general have been light on my [Railway](https://railway.app/) free tier, while maintaining uncompromised performance, so I'm happy about that too).

#### Object Storage

This was a wild journey. In a professional sense, I have only been accomodated with S3, but even there, I was never very sure about the best way to facilitate lightning fast uploads, especially if I was going to process said images before storing. An Instagram clone's most important aspect is images afterall, so I spent considerable time to research the best way to store images.

#### Self Hosting Philosophy

Just like with Auth, I prefer having an opinionated framework guide me, whle letting me own my, and my users' data. I was looking at self hosted Object storages, and [MinIO](https://min.io/) stood out to me. I could host it on Railway too, and it came with a pretty sweet console too. While this solved my storage problem, I decided to delegate my image processing to a third party so that

- I don't have to worry about serverless/edge limits, or even a stateful server of mine overloading over simple image processing.
- I can focus on the core functionality of the app, and not worry about image processing.
- I can get the image off of the user's device as soon as possible, and let the user know that the image is being processed, and will be available soon.

I started with [Uppy](https://uppy.io/) for their great uploading widget and [Tus](https://tus.io/) support for bulk image uploading with resumability. I stumbled upon [Transloadit](https://transloadit.com/) from their docs, and their free tier even with Tus support was great. Unfortunately, my Min.io instance only had a Wildcard TLS certificate, and Transloadit didn't support that.
I'm ultimately saddened it didn't work out, so I settled for the next best thing, [Cloudinary](https://cloudinary.com/). I'm not thrilled that I don;t own my user's data, especially considering they don;t have an export policy for free users, but I have to make do with my resources for now. I'm still looking for a better alternative, so if you know any, please let me know.

#### Auth

![A PassportJS meme](https://pbs.twimg.com/media/EWEDoiYXYAQ1j_d.jpg)

I stumbled upon [Lucia](https://lucia-auth.com/) and their exceptional docs when I was clawing my way out of the clutches of PassportJS when I had to do backend stuff in ExpressJS. I heard [AuthJS](https://authjs.dev/) has been doing well these days, but I would take databse sessions over JWTs anyday, and I'm not a big fan of AuthJS's docs(yet), so I'm sticking for Lucia for now. I may consider switching to an edge Redis instance for sessions, but I'm not sure if it's worth the hassle.

#### Deployment

- Framework: Serverless @ [Vercel](https://vercel.com/), maybe on the edge with [Cloudflare Pages](https://pages.cloudflare.com/) when my product becomes decnt enough.
- Database: Managed MySQL @ [Railway](https://railway.app/)

## What's next?

Currently the deployment looks like shit, but I'm more of a funcitonality over form kinda guy, and the functionality I've been stressing over, especially because of SQL have been working without a hitch, even barring any caching strategies, so I can slowly focus on the frontend for now.

Do checkout, and maybe even contribute to the source code @ [SnapGram Github](https://github.com/abishekdevendran/SnapGram)
It's currently live @ https://thesnapgram.vercel.app/

P.S shoutout to [FakerJS](https://fakerjs.dev/) for the seamless seeding process. I get over seemingly daunting processes everyday, and seeding was one of those, but Faker was so intuitive that my databse was populated in under 5 mins 💀.
