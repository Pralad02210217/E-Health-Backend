import { boolean, char, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const programmes = pgTable('programmes',{
    programme_id: varchar('programme_id', {length: 10}).unique().notNull().primaryKey(),
    programme_name: varchar('programme_name', {length: 255}).unique().notNull()
})

export const GENDER_ENUM = pgEnum('gender', ['MALE', 'FEMALE', 'OTHERS'])
export const BLOOD_GROUP_ENUM = pgEnum('blood_type', ['O+', 'O-', 'A+','A-','B+','B-','AB+','AB-'])
export const USER_TYPE_ENUM = pgEnum('user_type', ['STUDENT', 'STAFF', 'DEAN', 'NON-STAFF','HA'])
export const ROLE_ENUM = pgEnum('role', ['STUDENT', 'STAFF', 'DEAN','HA'])

export const users = pgTable("users", {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    student_id: varchar('student_id', {length: 8}).unique(), 
    name: varchar('name').notNull(),
    gender: GENDER_ENUM('gender'),
    department_id: varchar('department_id', {length: 10}),
    std_year: varchar('std_year'),
    userType: USER_TYPE_ENUM('user_type'),
    blood_type : BLOOD_GROUP_ENUM('blood_type'),
    contact_number: varchar('contact_number', {length: 10}).unique().notNull(),
    profile_url: varchar('profile_url', {length: 255})
})


export const login = pgTable("login", {
    id : uuid('id').notNull().primaryKey().defaultRandom().unique(),
    user_id: uuid("user_id").references(() => users.id).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    password: text().notNull(),
    role: ROLE_ENUM('role'),
    verified: boolean().default(false),
    mfa_required: boolean("mfa_required").default(false)
})

export const sessions = pgTable("sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => users.id).notNull(), 
    user_agent: varchar("user_agent", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    expired_at: timestamp("expired_at").notNull()
});
export const ha_details = pgTable("ha_details", {
    ha_id: uuid("ha_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),  
    secret_key: text("secret_key").notNull(), 
    is_available: boolean("is_available").default(true),
    is_onLeave: boolean("is_on_leave").default(false),
    updated_at: timestamp("updated_at").defaultNow()
});
export const ha_availability = pgTable("ha_availability", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    ha_id: uuid("ha_id").references(() => ha_details.ha_id, { onDelete: "cascade" }),
    start_date: timestamp("start_date").notNull(),
    end_date: timestamp("end_date").notNull(),
    reason: text("reason"),
    created_at: timestamp("created_at").defaultNow(),
    processed: boolean("processed").default(false),
});
