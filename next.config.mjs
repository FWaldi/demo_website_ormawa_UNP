// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aktifkan mode ekspor statis. Ini akan menghasilkan situs Anda ke dalam folder 'out'.
  output: 'export',

  // Atur basePath dan assetPrefix ke nama repositori Anda untuk deployment di GitHub Pages.
  // Ini memastikan semua tautan dan aset dimuat dari sub-direktori yang benar.
  // Ganti 'website_ormawa_unp_1-2' dengan nama repositori GitHub Anda.
  basePath: '/website_ormawa_unp_1-2',
  assetPrefix: '/website_ormawa_unp_1-2',

  // Nonaktifkan pengoptimalan gambar bawaan Next.js, karena tidak didukung
  // dalam ekspor statis tanpa server kustom.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
