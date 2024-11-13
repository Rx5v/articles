import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Buat data dummy untuk tabel User

const users = [
  {
    name: 'Akun Admin',
    email: 'admin@agendakota.com',
    password: await bcrypt.hash('Admin#1234', 10), // Hash password
    role: 'admin'
  },
  {
    name: 'Akun Penulis',
    email: 'author1@agendakota.com',
    password: await bcrypt.hash('Author#1234', 10), // Hash password
    role: 'creator'
  },
];

  // Loop untuk membuat user
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
