// src/services/AuthServices.js

const AdminsRepo = require("../Repositories/AdminRepository");
const PatientsRepo = require("../Repositories/PatientRepository");
const PharmacistsRepo = require("../Repositories/PharmacistRepository");
const supabase = require("../Config/supabaseClient");

// Helpers to ensure email is not already taken
async function ensureAdminEmailNotTaken(email) {
  const existing = await AdminsRepo.getAdminByEmail(email);
  if (existing) {
    const err = new Error(`An admin with email ${email} already exists`);
    err.status = 409;
    throw err;
  }
}

async function ensurePharmacistEmailNotTaken(email) {
  const existing = await PharmacistsRepo.getPharmacistByEmail(email);
  if (existing) {
    const err = new Error(`A pharmacist with email ${email} already exists`);
    err.status = 409;
    throw err;
  }
}

async function ensurePatientEmailNotTaken(email) {
  const existing = await PatientsRepo.getPatientByEmail(email);
  if (existing) {
    const err = new Error(`A patient with email ${email} already exists`);
    err.status = 409;
    throw err;
  }
}

// Register Admin
async function registerAdmin({ email, password, name }) {
  await ensureAdminEmailNotTaken(email); // Ensure email is not taken

  // Create the user in Supabase Auth
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "admin", // Role metadata for the user
        name,
      },
    },
  });

  if (error) {
    console.error("Error creating user in Supabase:", error.message);
    throw new Error(`Error creating user: ${error.message}`);
  }

  // Insert user data into the 'admins' table in the database
  const { data, error: dbErr } = await supabase
    .from("admins")
    .insert([{ email, username: name, password_hash: password, role: "admin" }]); // Insert the necessary columns

  if (dbErr) {
    console.error("Error inserting user into database:", dbErr.message);
    throw new Error(`Error inserting user into database: ${dbErr.message}`);
  }

  return user;
}

// Register Pharmacist
async function registerPharmacist({ email, password, name }) {
  await ensurePharmacistEmailNotTaken(email); // Ensure email is not taken

  // Create the user in Supabase Auth
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "pharmacist", // Role metadata for the user
        name,
      },
    },
  });

  if (error) {
    console.error("Error creating user in Supabase:", error.message);
    throw new Error(`Error creating user: ${error.message}`);
  }

  // Insert user data into the 'pharmacists' table in the database
  const { data, error: dbErr } = await supabase
    .from("pharmacists")
    .insert([{ email, username: name, password_hash: password, role: "pharmacist" }]); // Insert the necessary columns

  if (dbErr) {
    console.error("Error inserting user into database:", dbErr.message);
    throw new Error(`Error inserting user into database: ${dbErr.message}`);
  }

  return user;
}

// Register Patient
async function registerPatient({ email, password, name }) {
  await ensurePatientEmailNotTaken(email); // Ensure email is not taken

  // Create the user in Supabase Auth
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "patient", // Role metadata for the user
        name,
      }
    }
  });

  // Insert user data into the 'patients' table in the database
  const { data, error: dbErr } = await supabase
    .from("patients")
    .insert([{ email, username: name, password_hash: password, role: "patient" }]); // Insert the necessary columns

  if (dbErr) {
    console.error("Error inserting user into database:", dbErr.message);
    throw new Error(`Error inserting user into database: ${dbErr.message}`);
  }

  return user;
}

module.exports = {
  registerAdmin,
  registerPharmacist,
  registerPatient,
};
