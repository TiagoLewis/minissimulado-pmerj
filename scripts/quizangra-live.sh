#!/usr/bin/env bash
# Gera a página quizangra.institutosouto.com.br a partir da versão no ar + ajustes (scripts/quizangra-edit.js)
set -e
U=https://quizangra.institutosouto.com.br
mkdir -p out/img
curl -fsSL "$U/" -o out/index.html
curl -fsSL "$U/img/brasao-angra.webp" -o out/img/brasao-angra.webp
curl -fsSL "$U/img/ismael.webp" -o out/img/ismael.webp
node "$(dirname "$0")/quizangra-edit.js"
grep -q 'aulaTitulo' out/index.html
