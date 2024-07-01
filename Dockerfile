# Build
FROM node:22 as build

RUN corepack enable pnpm

COPY . /build

WORKDIR /build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone
ENV SHARP_EFFORT=3

RUN pnpm run build:prod

# Package
FROM node:22-alpine as package

RUN apk --no-cache add curl

WORKDIR /server

COPY --from=build /build/.next/standalone .
COPY --from=build /build/.next/static .next/static
COPY --from=build /build/public public

EXPOSE 3000

CMD ["node", "server.js"]
