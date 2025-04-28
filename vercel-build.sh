#!/bin/sh
echo "➡️ Instalando dependências..."
npm install --force || exit 1

echo "➡️ Rodando build..."
npm run build || exit 1

echo "➡️ Verificando estrutura de arquivos..."
ls -R .next  # Lista todos os arquivos gerados

exit 0