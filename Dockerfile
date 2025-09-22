# Используем официальный Node.js образ как базовый
FROM node:18-alpine AS base

# Устанавливаем зависимости только когда нужно
FROM base AS deps
# Проверяем https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем зависимости на основе предпочитаемого менеджера пакетов
COPY package.json package-lock.json* ./
RUN npm ci

# Пересобираем исходный код только когда нужно
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Следующая строка отключает telemetry во время сборки.
# Узнать больше о telemetry здесь: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Продакшн образ, скопируем все файлы и запустим next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Следующая строка отключает telemetry во время выполнения.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Устанавливаем правильные права доступа для prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Автоматически используем output traces для уменьшения размера образа
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# Устанавливаем hostname на localhost
ENV HOSTNAME="0.0.0.0"

# server.js создается автоматически при использовании output: 'standalone'
CMD ["node", "server.js"]
