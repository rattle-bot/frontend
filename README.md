# Rattle Frontend

Vue 3 + TypeScript + Vite-based frontend for the [Rattle](https://github.com/rattle-bot/rattle) project.  
This interface is used for managing container log alerts via Telegram Mini App.

---

## 🚀 Features

- ✅ Telegram Mini App UI
- ✅ TypeScript + Vue 3 + Pinia
- ✅ TailwindCSS styling
- ✅ Designed for GHCR deployment

---

## 🛠️ Setup & Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

App will be available at [http://localhost:52100](http://localhost:52100) (or the port defined in `.env`).

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Port for local dev server or container
FRONTEND_PORT=52100

# Public API base URL (must match your backend)
VITE_PUBLIC_API_HOST=https://your-domain.com/api
```

---

## 🐳 Docker (Production)

This frontend is bundled and deployed as a Docker image:
`ghcr.io/rattle-bot/rattle-frontend:<version>`

### Option 1: Build and Run manually

```bash
docker build -t rattle-frontend -f Dockerfile .
docker run -p 52100:52100 rattle-frontend
```

### Option 2: Run prebuilt image (image-only)

```bash
docker run -d \
  --name rattle-frontend \
  -p 52100:80 \
  ghcr.io/rattle-bot/rattle-frontend:latest
```

Or use it via `docker-compose` from the [main backend repo](https://github.com/rattle-bot/rattle).

---

## 🧱 Tech Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [TMA](https://core.telegram.org/bots/webapps)

---

## 📦 Used By

This frontend is used in:
👉 [`rattle-bot/rattle`](https://github.com/rattle-bot/rattle)

You don't need to run this repo manually in production — it's built and deployed via CI with each release.

---

## 📝 License

MIT — see [LICENSE](./LICENSE)
