const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

// Read environment variables from .env manually if dotenv is not installed
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length > 0) {
        const val = rest.join("=").replace(/^["']|["']$/g, "").trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  });
}

const username = process.env.ADMIN_USERNAME || "omar";
const password = process.env.ADMIN_PASSWORD || "OmarAdmin2026!#";

async function main() {
  console.log("🦆 Initializing Admin User for بطة Platform...");
  console.log(`👤 Admin Username: ${username}`);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const dataDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const storeFile = path.join(dataDir, "batta-store.json");
  let store = {
    admin: null,
    projects: [],
    skills: [],
    settings: {},
    messages: []
  };

  if (fs.existsSync(storeFile)) {
    try {
      store = JSON.parse(fs.readFileSync(storeFile, "utf-8"));
    } catch (e) {
      console.warn("Existing store had invalid JSON, resetting.");
    }
  }

  store.admin = {
    id: "admin-1",
    username: username,
    passwordHash: passwordHash,
    createdAt: new Date().toISOString()
  };

  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2), "utf-8");

  console.log("✅ Admin user configured successfully and securely!");
  console.log("🔒 Password hashed with bcrypt and persisted.");
  console.log("🚀 You can now login at /admin/login");
}

main().catch((err) => {
  console.error("❌ Error setting up admin user:", err);
  process.exit(1);
});
