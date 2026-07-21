#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# 1. Install Powerlevel10k theme if missing
P10K_DIR="/home/node/.oh-my-zsh/custom/themes/powerlevel10k"
if [ ! -d "$P10K_DIR" ]; then
    echo "Installing Powerlevel10k..."
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$P10K_DIR"
fi

# 2. Install project dependencies
# This populates your isolated Docker Volume
if [ -f "package.json" ]; then
    echo "Installing dependencies into isolated volume..."
    pnpm install
else
    echo "No package.json found, skipping npm install."
fi

# 3. Force-reset the global .gitconfig to remove Mac-injected paths
echo "Cleaning container .gitconfig..."
cat <<EOF > ~/.gitconfig
[user]
    name = GITHUB USER NAME
    email = GITHUB USER EMAIL
[init]
    defaultBranch = main
[commit]
    template = /home/node/commit-template.txt
[core]
    editor = code --wait
EOF