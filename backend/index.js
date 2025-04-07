    const express = require("express");
    const { ApolloServer } = require("@apollo/server");
    const { expressMiddleware } = require("@apollo/server/express4");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const dotenv = require("dotenv");
    const typeDefs = require("./schema/typeDefs");
    const resolvers = require("./schema/resolvers");
    const jwt = require("jsonwebtoken");

    dotenv.config();

    const app = express();
    const port = process.env.PORT || 5000;

    // Connect to MongoDB
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error", err));

    async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        "/graphql",
        cors(),
        express.json(),
        expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req.headers.authorization || "";
            if (auth.startsWith("Bearer ")) {
            try {
                const token = auth.split(" ")[1];
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return { user };
            } catch (e) {
                console.warn("Invalid token");
            }
            }
            return {};
        },
        })
    );

    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}/graphql`);
    });
    }

    startServer();
