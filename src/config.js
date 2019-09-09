module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    `postgres://excvceomftmxcp:6cb7b97fcfec1e3ea31e6b8025bb5801cc8613d68acfd3611f68353c7336e48f@ec2-54-221-212-126.compute-1.amazonaws.com:5432/d3b6dtdee4qn1r?ssl=true`
};