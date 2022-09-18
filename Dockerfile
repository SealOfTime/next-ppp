FROM node:lts-gallium
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY prisma ./
RUN npx prisma generate
COPY .env.prod ./.env
COPY public src next-env.d.ts next.config.js tsconfig.json entrypoint.sh ./
ENTRYPOINT ./entrypoint.sh