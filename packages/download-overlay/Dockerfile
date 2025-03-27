# Build layer
FROM node:21 AS build

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY . /build
WORKDIR /build

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

WORKDIR /build/packages/download-overlay

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone

# only lint if DEVELOPMENT env var is not true
ARG DEVELOPMENT=false
ENV DEVELOPMENT=$DEVELOPMENT
RUN if [ "$DEVELOPMENT" != "true" ]; then pnpm run lint; fi

RUN pnpm run build

# Package layer
FROM node:21-alpine AS package

RUN apk --no-cache add curl

WORKDIR /server

COPY --from=build /build/packages/download-overlay/.next/standalone .
COPY --from=build /build/packages/download-overlay/.next/static .next/static
COPY --from=build /build/packages/download-overlay/public public

EXPOSE 3000

CMD ["node", "server.js"]
