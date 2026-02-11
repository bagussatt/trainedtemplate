# Backend API Server

API NestJS untuk manajemen pelanggan, faktur, dan dashboard analytics dengan PostgreSQL dan Prisma.

## Fitur

- **Authentication**: JWT-based authentication dengan register dan login
- **Dashboard**: Analytics untuk revenue, invoices, dan customer metrics
- **Customers**: CRUD operations untuk data pelanggan
- **Invoices**: Manajemen faktur dengan status (PAID/PENDING)
- **Database**: PostgreSQL 17 dengan Prisma ORM
- **Docker**: Containerized environment dengan docker-compose
- **Documentation**: Swagger/OpenAPI documentation
- **Validation**: Request validation dengan class-validator

## Tech Stack

- **Framework**: NestJS 
- **Database**: PostgreSQL 17
- **ORM**: Prisma 5.9.1
- **Authentication**: JWT
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 17

## Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma Client
pnpm run prisma:generate

# Push schema ke database
pnpm run prisma:push

# (Optional) Seed database dengan data sampel
pnpm run prisma:seed
```

## Environment Variables

Buat file `.env` di root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# App
NODE_ENV="development"
PORT=3000
```

## Docker Setup

### Menggunakan Docker Compose

```bash
# Start database dan backend
cd server
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
```

### Konfigurasi Docker

- **PostgreSQL**: Port 5436:5432
- **Backend**: Port 3000:3000
- **Database**: mydb

## Running the Application

```bash
# Development mode dengan hot-reload
pnpm run start:dev

# Production mode
pnpm run build
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

## API Documentation

Setelah menjalankan server, buka browser:

- **Swagger UI**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

## Authentication

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Refresh Token

```http
POST /auth/refresh
Authorization: Bearer {access_token}
```

### Get Profile

```http
GET /auth/me
Authorization: Bearer {access_token}
```

## API Endpoints

### Dashboard

```http
# Get card data (total customers, revenue, invoices)
GET /dashboard/card-data
Authorization: Bearer {token}

# Get revenue data untuk chart
GET /dashboard/revenue
Authorization: Bearer {token}

# Get latest invoices
GET /dashboard/invoices
Authorization: Bearer {token}
```

### Customers

```http
# Get all customers dengan pagination
GET /customers?page=1&limit=10
Authorization: Bearer {token}

# Get customer by ID
GET /customers/:id
Authorization: Bearer {token}

# Create new customer
POST /customers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "PT Maju Jaya",
  "email": "info@majujaya.co.id",
  "img_url": "https://api.dicebear.com/7.x/initials/MJ"
}

# Update customer
PATCH /customers/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "PT Maju Jaya Updated",
  "email": "newemail@majujaya.co.id"
}

# Delete customer
DELETE /customers/:id
Authorization: Bearer {token}
```

### Invoices

```http
# Get all invoices dengan pagination
GET /invoices?page=1&limit=10
Authorization: Bearer {token}

# Get invoice by ID
GET /invoices/:id
Authorization: Bearer {token}

# Create new invoice
POST /invoices
Authorization: Bearer {token}
Content-Type: application/json

{
  "custId": 1,
  "amount": 150000000,
  "status": "PAID",
  "date": "2026-02-01"
}

# Update invoice
PATCH /invoices/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 200000000,
  "status": "PAID"
}

# Delete invoice
DELETE /invoices/:id
Authorization: Bearer {token}
```

## Database Schema

### User Model
```prisma
model User {
  userId    Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
}
```

### Customer Model
```prisma
model Customers {
  customerId Int      @id @default(autoincrement())
  name       String
  email      String   @unique
  img_url    String?
  Invoices   Invoices[]
}
```

### Invoice Model
```prisma
model Invoices {
  invoicesId Int      @id @default(autoincrement())
  custId     Int
  amount     Int
  status     Status   @default(PENDING)
  date       DateTime @default(now())
  CustomerId Customers @relation(fields: [custId], references: [customerId])
}

enum Status {
  PAID
  PENDING
}
```

## Seeding Data

Untuk populate database dengan data sampel Indonesian:

```bash
pnpm run prisma:seed
```

Data yang akan dibuat:
- 2 Users dengan password `12345678`
- 5 Customers (PT Maju Jaya, CV Berkah Selalu, UD. Sejahtera, Toko Makmur, CV Global Tekno)
- 6 Revenue records (6 bulan terakhir)
- 8 Invoices dengan berbagai status

### Login Credentials untuk Seed Data

```
Email: budi@santoso.com
Password: 12345678

Email: siti@aminah.com
Password: 12345678
```

## Prisma Commands

```bash
# Generate Prisma Client
pnpm run prisma:generate

# Push schema changes ke database
pnpm run prisma:push

# Open Prisma Studio (database GUI)
pnpm run prisma:studio

# Create migration
pnpm run prisma:migrate

# Seed database
pnpm run prisma:seed
```

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma        # Database schema
├── src/
│   ├── auth/               # Authentication module
│   ├── customers/          # Customers CRUD
│   ├── invoices/           # Invoices CRUD
│   ├── dashboard/          # Dashboard analytics
│   ├── common/             # Shared utilities
│   │   ├── prisma.service.ts
│   │   └── hash.service.ts
│   ├── logging/            # Logging middleware
│   ├── seed.ts             # Database seeder
│   └── main.ts             # Application entry point
├── docker-compose.yml      # Docker services
├── Dockerfile              # Docker image
└── package.json
```

## Error Handling

API menggunakan standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Validation failed"
}
```

## Development Tips

1. **Hot Reload**: Gunakan `pnpm run start:dev` untuk development
2. **Prisma Studio**: Gunakan `pnpm run prisma:studio` untuk melihat data
3. **Logs**: Prisma query logs hanya muncul di development mode
4. **Validation**: Check DTO files untuk request validation rules

## Troubleshooting

### Database Connection Error
```bash
# Cek PostgreSQL container
docker ps

# Cek database logs
docker-compose logs db
```

### Prisma Client Not Generated
```bash
pnpm run prisma:generate
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

## License

MIT
