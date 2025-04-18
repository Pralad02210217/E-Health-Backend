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
DATABASE_URL=your_neondb_url
REDIS_URL=your_upstash_redis_url
JWT_SECRET=your_secret
EMAIL_API_KEY=your_email_key
```

### 3. Migrate Database
```bash
npx drizzle-kit push
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

## 🎉 Contributions & Acknowledgments
This project was developed as part of a final year capstone project. Special thanks to all contributors, mentors, and reviewers who provided feedback to improve the functionality and usability of the system.

## 🌐 Future Improvements
- Streamlit mobile interface for translation module
- WebSockets-based live notifications (e.g., mental health cases)
- Enhanced audit trail with immutable logs
- Export medical records to PDF/CSV

---

_Developed by: Pralad Mishra

