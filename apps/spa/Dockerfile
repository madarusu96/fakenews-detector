FROM node

WORKDIR /app

COPY . .
# Install pnpm and turbo
RUN npm install -g pnpm 

RUN pnpm install

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD pnpm run dev:spa