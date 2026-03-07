FROM node:20-alpine AS builder

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


FROM node:20-alpine AS runner

WORKDIR /usr/src/app

RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/nest-cli.json ./nest-cli.json
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/app/tsconfig.build.json ./tsconfig.build.json

ENV NODE_ENV=development
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main.js"]
