module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    `postgres://bwmhwbrvhmpivu:54ce9c5166e6e94a29f49ac7481cf1316c0d212cffef0d7d12f0b5773fd976bd@ec2-54-221-212-126.compute-1.amazonaws.com:5432/d333h3ape40f1g?ssl=true`
};