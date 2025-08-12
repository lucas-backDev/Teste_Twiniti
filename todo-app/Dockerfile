# Usa uma imagem base oficial do Node.js para a fase de build
FROM node:18-alpine as builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código fonte
COPY . .

# Constrói a aplicação Next.js para produção
RUN npm run build

# Segunda fase: Cria uma imagem menor para a execução
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de produção da fase de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expõe a porta que a aplicação Next.js usa
EXPOSE 3000

# Define o comando para executar a aplicação quando o contêiner iniciar
CMD ["npm", "start"]