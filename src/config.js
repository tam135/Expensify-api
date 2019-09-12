module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    `postgres://luxsfkrdbjhaag:e90735e45110c66761a6d201cbe47e90f276aa1ed2ca09fd9572ee82a34a3d1f@ec2-184-73-169-163.compute-1.amazonaws.com:5432/dculva6a0po2aq?ssl=true`
};