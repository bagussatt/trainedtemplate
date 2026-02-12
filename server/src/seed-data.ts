import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('🌱 Menyiapkan data sampel...');

  // 1. Create Users
  console.log('👤 Menambahkan pengguna...');
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'budi@santoso.com' },
      update: {},
      create: {
        name: 'Budi Santoso',
        email: 'budi@santoso.com',
        password: '$2b$10$abcdefghijklmnopqrstuv', // Dummy hash
      },
    }),
    prisma.user.upsert({
      where: { email: 'siti@aminah.com' },
      update: {},
      create: {
        name: 'Siti Aminah',
        email: 'siti@aminah.com',
        password: '$2b$10$abcdefghijklmnopqrstuv',
      },
    }),
  ]);
  console.log(`✅ ${users.length} pengguna berhasil dibuat`);

  // 2. Create Customers
  console.log('🏢 Menambahkan pelanggan...');
  const customers = await Promise.all([
    prisma.customers.upsert({
      where: { customerId: 1 },
      update: {},
      create: {
        customerId: 1,
        name: 'PT Maju Jaya',
        email: 'info@majujaya.co.id',
        img_url: 'https://api.dicebear.com/7.x/initials/Majujaya',
      },
    }),
    prisma.customers.upsert({
      where: { customerId: 2 },
      update: {},
      create: {
        customerId: 2,
        name: 'CV Berkah Selalu',
        email: 'admin@berkahselalu.com',
        img_url: 'https://api.dicebear.com/7.x/initials/Berkah',
      },
    }),
    prisma.customers.upsert({
      where: { customerId: 3 },
      update: {},
      create: {
        customerId: 3,
        name: 'UD. Sejahtera',
        email: 'info@sejahtera.com',
        img_url: 'https://api.dicebear.com/7.x/initials/Sejahtera',
      },
    }),
    prisma.customers.upsert({
      where: { customerId: 4 },
      update: {},
      create: {
        customerId: 4,
        name: 'Toko Makmur',
        email: 'tokomakmur@gmail.com',
        img_url: 'https://api.dicebear.com/7.x/initials/Tokomakmur',
      },
    }),
    prisma.customers.upsert({
      where: { customerId: 5 },
      update: {},
      create: {
        customerId: 5,
        name: 'CV Global Tekno',
        email: 'sales@globaltekno.com',
        img_url: 'https://api.dicebear.com/7.x/initials/Global',
      },
    }),
  ]);
  console.log(`✅ ${customers.length} pelanggan berhasil dibuat`);

  // 3. Create Revenue Data (6 bulan terakhir)
  console.log('💰 Menambahkan data pendapatan...');
  const now = new Date();
  const revenueData = await Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const amount = Math.floor(Math.random() * 100000000) + 50000000; // 50jt-150jt

      return prisma.revenue.upsert({
        where: { revenueId: i + 1 },
        update: {},
        create: {
          month,
          revenue: amount,
        },
      });
    })
  );
  console.log(`✅ ${revenueData.length} data pendapatan berhasil dibuat`);

  // 4. Create Invoices
  console.log('📄 Menambahkan faktur...');
  const invoices = await Promise.all([
    prisma.invoices.create({
      data: {
        custId: 1,
        amount: 150000000,
        status: 'PAID',
        date: new Date('2026-02-01'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 2,
        amount: 75000000,
        status: 'PENDING',
        date: new Date('2026-02-05'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 3,
        amount: 200000000,
        status: 'PAID',
        date: new Date('2026-02-03'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 4,
        amount: 50000000,
        status: 'PENDING',
        date: new Date('2026-02-07'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 1,
        amount: 300000000,
        status: 'PAID',
        date: new Date('2026-02-10'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 5,
        amount: 125000000,
        status: 'PENDING',
        date: new Date('2026-02-08'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 2,
        amount: 180000000,
        status: 'PAID',
        date: new Date('2026-02-06'),
      },
    }),
    prisma.invoices.create({
      data: {
        custId: 3,
        amount: 95000000,
        status: 'PENDING',
        date: new Date('2026-02-09'),
      },
    }),
  ]);
  console.log(`✅ ${invoices.length} faktur berhasil dibuat`);

  console.log('\n✨ Data sampel berhasil dibuat!');
  console.log(`
Ringkasan:
- Pengguna: ${users.length}
- Pelanggan: ${customers.length}
- Data Pendapatan: ${revenueData.length} bulan
- Faktur: ${invoices.length}
  `);

  // Show some sample data
  console.log('\n📊 Contoh Data Faktur:');
  for (const invoice of invoices.slice(0, 3)) {
    const customer = customers.find((c) => c.customerId === invoice.custId);
    console.log(
      `  • ${customer?.name}: Rp${invoice.amount.toLocaleString('id-ID')} (${invoice.status})`
    );
  }
};

main()
  .catch((e) => {
    console.error('❌ Error:', e.message);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
