if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# 2. Path to your oh-my-zsh installation (CRITICAL LINE)
export ZSH="$HOME/.oh-my-zsh"

# 3. Path for custom plugins/themes (where your setup.sh downloads things)
ZSH_CUSTOM="$ZSH/custom"

# 4. Theme & Plugins
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)

# 5. Initialize Oh My Zsh (Actually turns everything on)
source $ZSH/oh-my-zsh.sh

# 6. Load P10k configuration
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# 7. Your Personal Aliases
alias ls="ls -al"
alias add-dep="pnpm add"
alias add-dev-dep="pnpm add -D"
alias install="pnpm install"
# Overwrites on regular npm commands to avoid running npm and npx commands
#alias npm="pnpm"
#alias npx="pnpx"
alias push="git push"
alias pull="git pull"
alias add="git add"
alias commit="git commit"
alias switch="git switch"


# 8. Run the Lab Health Check on login (Optional)
# bash .devcontainer/scripts/verify.sh