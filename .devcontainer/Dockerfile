FROM mcr.microsoft.com/devcontainers/typescript-node:22

# tauri dependencies
RUN apt-get update && apt-get install -y \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  libwebkit2gtk-4.0-dev \
  && rm -rf /var/lib/apt/lists/*

# install rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /workspace
