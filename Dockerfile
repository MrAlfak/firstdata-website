# ---------- Stage 1: Build ----------
FROM docker.arvancloud.ir/node:22-alpine AS builder
WORKDIR /usr/src/app

ENV NODE_NO_WARNINGS=1
ENV SKIP_DEV_PORT_GUARD=1

# مهم: نصب کتابخانه‌های پایه برای اجرای esbuild و sharp در Alpine Linux
RUN apk add --no-cache libc6-compat

# کپی کردن فایل‌های وابستگی
COPY package.json ./

# نصب پکیج‌ها (اگر ارور ignored_builds داد، مطمئن شوید pnpm approve-builds را در سیستم خودتان زده‌اید و package.json آپدیت شده است)
RUN npm install

# کپی کل سورس کد
COPY . .

# ۴. گرفتن خروجی پروژه (این خط در کد شما کامنت شده بود!)
# اگر برای بیلد هم نیاز به پروکسی دارید، آن را قبل از pnpm build قرار دهید
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM docker.arvancloud.ir/node:22-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_NO_WARNINGS=1
ENV NODE_ENV=production
ENV PORT=3000

# اگر در کپی فایل‌های standalone به ارور خوردید، مطمئن شوید در فایل next.config.js 
# حتما output: 'standalone' تنظیم شده باشد.
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000
# Persist SQLite auth/contact data — mount a volume at /usr/src/app/data in production
VOLUME ["/usr/src/app/data"]
CMD ["node", "server.js"]