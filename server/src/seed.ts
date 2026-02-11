import { PrismaClient } from '@prisma/client';
import { HashService } from './common/hash.service';

const prisma = new PrismaClient();

const main = async () => {
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin';
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
  const name = process.env.DEFAULT_ADMIN_NAME || 'admin';

  const hashPassword = await new HashService().hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email: email },
    create: { email, password: hashPassword, name },
    update: {},
  });
  console.log({
    user,
    isPasswordMatch: await new HashService().comparePasswords(
      password,
      user.password,
    ),
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
