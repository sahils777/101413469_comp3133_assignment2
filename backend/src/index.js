const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const schema = require("./schema");

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// Authentication Middleware
app.use((req, res, next) => {
  authMiddleware(req, res, next);
});

app.use("/graphql", graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { user: req.user }  
  })));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
