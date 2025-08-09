# Tahap 1: Pemasangan Dependensi (deps)
# Menggunakan Node.js versi LTS (Long-Term Support) dengan basis Alpine untuk ukuran yang kecil.
FROM node:22-alpine AS deps
WORKDIR /app

# Menyalin hanya package.json dan lock file terlebih dahulu untuk memanfaatkan cache Docker.
# Lapisan ini hanya akan dibangun ulang jika file-file ini berubah.
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
 if [ -f pnpm-lock.yaml ]; then \
   npm install -g pnpm && pnpm install --frozen-lockfile; \
 elif [ -f package-lock.json ]; then \
   npm ci; \
 else \
   echo "Lockfile not found." && exit 1; \
 fi

# Tahap 2: Pembangun (builder)
# Memulai dari tahap 'deps' yang sudah memiliki node_modules.
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variabel lingkungan yang diperlukan saat build time.
# Ini akan diganti dengan nilai dari docker-compose.yml.
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Menjalankan build produksi.
RUN npm run build

# Tahap 3: Pelari (runner)
# Memulai dari image Alpine yang bersih dan kecil untuk produksi.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Menonaktifkan telemetri Next.js.
ENV NEXT_TELEMETRY_DISABLED 1

# Membuat pengguna non-root untuk keamanan.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Menyalin output dari mode standalone yang sudah dioptimalkan.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Menyalin aset publik.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Menyalin aset statis hasil build.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Mengatur pengguna ke non-root.
USER nextjs

# Mengekspos port yang digunakan oleh Next.js.
EXPOSE 3000

# Perintah untuk menjalankan server Next.js standalone.
CMD ["node", "server.js"]