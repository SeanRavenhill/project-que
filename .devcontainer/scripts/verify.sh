#!/bin/bash
echo "--- 🛠️  LAB HEALTH CHECK ---"

# 1. Check Git
if [ -f "$(git config --get commit.template)" ]; then
    echo "✅ Git Template: Linked"
else
    echo "❌ Git Template: Missing"
fi

# 2. Check node_modules Isolation
MOUNT_TYPE=$(df -T /workspaces/nodejs-lab/node_modules | awk 'NR==2 {print $2}')
if [[ "$MOUNT_TYPE" == "ext4" || "$MOUNT_TYPE" == "vfat" || "$MOUNT_TYPE" == "virtiofs" ]]; then
    echo "✅ Node Isolation: Active ($MOUNT_TYPE)"
else
    echo "⚠️ Node Isolation: Potential Bind Mount detected"
fi

# 3. Check Zsh
if [ -d "/home/node/.oh-my-zsh/custom/themes/powerlevel10k" ]; then
    echo "✅ P10k Theme: Installed"
else
    echo "❌ P10k Theme: Missing"
fi

echo "--------------------------"