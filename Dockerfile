FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_HOMEPAGE=https://chat.example.com/
ARG VITE_ROUTER_TYPE=hash
ARG VITE_RTC_CONFIG_ENDPOINT=
ARG VITE_TRACKER_URL=
ARG VITE_GITHUB_REPO=https://github.com/jeremyckahn/chitchatter

ENV VITE_HOMEPAGE=$VITE_HOMEPAGE
ENV VITE_ROUTER_TYPE=$VITE_ROUTER_TYPE
ENV VITE_RTC_CONFIG_ENDPOINT=$VITE_RTC_CONFIG_ENDPOINT
ENV VITE_TRACKER_URL=$VITE_TRACKER_URL
ENV VITE_GITHUB_REPO=$VITE_GITHUB_REPO

RUN npm pkg set homepage="$VITE_HOMEPAGE" && npm run build:app

FROM node:20-alpine

WORKDIR /app

RUN npm install --global serve

COPY --from=build /app/dist ./dist

ENV PORT=3000

CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT}"]
