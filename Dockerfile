FROM node:22 as build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone

RUN pnpm run build:prod

FROM node:22-alpine as package

RUN apk --no-cache add curl

WORKDIR /.next

COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static .next/static
COPY --from=build /app/public public

EXPOSE 3000

CMD ["node", "server.js"]
