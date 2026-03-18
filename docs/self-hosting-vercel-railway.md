# Self-hosting with Vercel and Railway

This fork is easiest to run with:

- `Vercel` for the web app and optional `/api/get-config` endpoint
- `Railway` for infrastructure that should be easy to move later, especially:
  - your TURN server
  - a WebTorrent tracker
  - the simple RTC config API if you do not want to use Vercel Functions

## Why split it this way

- The frontend is just static files. That makes it easy to redeploy on another host fast.
- TURN and tracker services are the parts most likely to need provider changes.
- If a provider or domain gets blocked, you can move the static frontend without rewriting the app.

## Important limitation

Chitchatter peers can only connect when they are using the **same domain**. If you move from `chat-a.example.com` to `chat-b.example.com`, everyone needs to use the new link.

For censorship resilience, keep a second standby domain ready and document it for your family.

## Recommended setup

### 1. Frontend on Vercel

Set these environment variables in Vercel:

- `VITE_HOMEPAGE=https://your-chat-domain.example/`
- `VITE_ROUTER_TYPE=hash`
- `VITE_GITHUB_REPO=https://github.com/your-user/your-fork`
- `VITE_TRACKER_URL=wss://tracker.your-domain.example`
- `VITE_RTC_CONFIG_ENDPOINT=/api/get-config`
- `PRIMARY_APP_ORIGIN=https://your-chat-domain.example`
- `CORS_ALLOWED_ORIGINS=https://your-chat-domain.example`
- `RTC_CONFIG=<base64-encoded RTCConfiguration with your TURN server>`

Why `hash` routing:

- room names stay out of server path logs
- fallback hosting is easier on static providers

### 2. TURN server on Railway

Use a `coturn` deployment on Railway with your own credentials.

Minimum requirements:

- `turn:your-turn-domain:3478`
- `turns:your-turn-domain:5349`
- a static username/password or time-limited auth

Then generate your `RTC_CONFIG` value:

```bash
npm run generate-rtc-config
```

Paste the generated base64 string into Vercel or Railway as `RTC_CONFIG`.

### 3. Tracker on Railway

Deploy a small WebSocket tracker service. Two common options:

- run `bittorrent-tracker` in a Railway service
- use your own small Node service/container dedicated to the tracker

Point the frontend at it with:

```bash
VITE_TRACKER_URL=wss://tracker.your-domain.example
```

### 4. Optional: RTC config API on Railway instead of Vercel

If you want zero Vercel dependency, run:

```bash
node simple-api-server.js
```

Set these environment variables on that service:

- `PORT=3003`
- `PRIMARY_APP_ORIGIN=https://your-chat-domain.example`
- `CORS_ALLOWED_ORIGINS=https://your-chat-domain.example`
- `RTC_CONFIG=<base64-encoded RTCConfiguration>`

Then set the frontend to:

```bash
VITE_RTC_CONFIG_ENDPOINT=https://api.your-domain.example/api/get-config
```

## Railway-only fallback

This repo now includes a `Dockerfile` and `railway.json` so the frontend can also run directly on Railway.

Build args you should set on Railway:

- `VITE_HOMEPAGE=https://your-chat-domain.example/`
- `VITE_ROUTER_TYPE=hash`
- `VITE_TRACKER_URL=wss://tracker.your-domain.example`
- `VITE_RTC_CONFIG_ENDPOINT=https://api.your-domain.example/api/get-config`
- `VITE_GITHUB_REPO=https://github.com/your-user/your-fork`

## Operational advice for Argentina <-> Russia calls

- Prefer one private room per family thread instead of public rooms.
- Use readable passphrase room names so non-technical users can recover by phone.
- Keep two domains ready:
  - your primary domain
  - a backup domain on another DNS/provider
- Keep TURN and tracker on different providers when possible.
- Test from two real networks:
  - mobile data
  - home Wi-Fi
- If a block happens, migrate everyone to the backup domain immediately. Mixed domains will not connect.
