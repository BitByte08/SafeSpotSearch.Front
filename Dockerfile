# 1단계: 종속성 설치 및 빌드
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# 2단계: 실행 환경
FROM node:18-alpine

WORKDIR /app

# 빌드 결과와 node_modules만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=4002

EXPOSE 4002

CMD ["npm", "start"]
