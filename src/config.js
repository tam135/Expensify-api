module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    `postgres://puijhbwsareyeb:2c8b068bb4029575541a9eda2eae88e63f3a5fd38890e03c856865efe2b46d4f@ec2-54-227-251-33.compute-1.amazonaws.com:5432/d2e7uvag1t9dq5?ssl=true`
};