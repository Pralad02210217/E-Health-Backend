# E-Health-Backend
# College Infirmary Management System (CIMS)

## 🌟 Overview
The **College Infirmary Management System (CIMS)** is a comprehensive digital health management platform designed to streamline and manage medical services offered within a college campus. The system handles patient management, medical inventory, treatments, staff/family health records, mental health case tracking, analytics dashboards, and role-based access control for Students, Staff, HA (Health Assistant), and Deans.

## 📂 Features
### 🏥 Core Modules
- **Authentication & Authorization:**
  - Role-based access for Students, HA, Dean, Staff, and Family Members
  - JWT authentication with session & refresh token strategy

- **User Management:**
  - Create, update, and fetch users with roles and types
  - Staff family member management (CRUD)

- **Inventory Management:**
  - Drug & Non-drug stock tracking
  - Batch-wise quantity management with expiry detection
  - FIFO-based stock deduction

- **Treatment Management:**
  - Add treatment records linked with patients or staff family members
  - Record prescribed medicines, dosage, and illness
  - Auto-stock deduction from inventory

- **Medical History:**
  - Complete treatment history by user ID
  - Illness & medicine tracking

- **Illness Classification:**
  - Illness categories with custom tagging (e.g., Mental Health)
  - Zod validations for creation and update

- **Mental Health Cases:**
  - Automatically flagged from treatment with Mental Health category
  - Tracked until resolved, visible to Dean only

- **Analytics Dashboard:**
  - Total treatments, patient types, top illnesses, medicine usage

## 🌐 Tech Stack
| Layer       | Technology                            |
|-------------|----------------------------------------|
| Backend     | Node.js, Express.js                    |
| Database    | PostgreSQL (NeonDB) + Drizzle ORM     |
| Caching     | Upstash Redis                          |
| Auth        | JWT, Passport.js                       |
| Frontend    | Next.js 14, TypeScript, ShadCN UI      |
| State Mgmt  | React Query (TanStack Query)           |
| Scheduling  | node-cron                              |

## 📆 Folder Structure (Backend)
```
src/
├── modules/
│   ├── auth/
│   ├── inventory/
│   ├── illness/
│   ├── treatment/
│   ├── users/
│   ├── dashboard/
│   └── staff-family/
├── middlewares/
├── common/
├── database/
│   ├── schema.ts
│   └── drizzle.ts
├── utils/
├── validation/
└── routes/
```

## 🔧 How to Run
### 1. Install dependencies
```bash
npm install
```

### 2. Configure `.env`
```env
PORT = your_development_port
NODE_ENV = your_project_environment(prodution / development)
DATABASE_URL =  you_postgres_connection_string

APP_ORIGIN =your_frontend_app_url
JWT_SECRET = your_jwt_secret_key
JWT_EXPIRES_IN = jwt_expiration_time( E.g "3m")
JWT_REFRESH_SECRET = your_jwt-refresh_secret_key
JWT_REFRESH_EXPIRES_IN = your_jwt_refresh_expiration_time(E.g "30d")

SMTP_HOST=your_smpt_host  
SMTP_PORT=your_smpt_port             
SMTP_SECURE=false          
SMTP_USER= your_gmail_account
SMTP_PASS= your_app_password_gamil
MAILER_SENDER="no-reply@yourapp.com"

REDIS_URL = your_redis_url
REDIS_TOKEN = your_redis_token
```

### 3. Migrate Database
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Start Dev Server
```bash
npm run dev
```

## 📊 Sample Endpoints
| Feature | Method | Route |
|---------|--------|-------|
| Add Treatment | POST | `/api/v1/treatment/create` |
| Add Family Member | POST | `/api/v1/staff/family/create` |
| Fetch All Illnesses | GET | `/api/v1/illness/` |
| Inventory Analytics | GET | `/api/v1/dashboard/inventory` |

Check out the [API Documentation](API_DOCUMENTATION.md) for details on all endpoints.

## 🎉 Contributions & Acknowledgments
This project was developed as part of a final year capstone project. Special thanks to all contributors, mentors, and reviewers who provided feedback to improve the functionality and usability of the system.

## 🌐 Future Improvements
- Enhanced audit trail with immutable logs
- Export medical records to PDF/CSV

---

_Developed by: Pralad Mishra

