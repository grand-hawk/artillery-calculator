# Build layer
FROM node:21 AS build

RUN corepack enable pnpm

COPY . /build
WORKDIR /build

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

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

COPY --from=build /build/.next/standalone .
COPY --from=build /build/.next/static .next/static
COPY --from=build /build/public public

EXPOSE 3000

CMD ["node", "server.js"]
