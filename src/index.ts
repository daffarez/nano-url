import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/shorten.routes";
import redirectRoutes from "./routes/redirect.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.listen(9099, () => {
  console.log("Server running at http://localhost:9099");
});

// API routes
app.use("/api", urlRoutes);

// redirect routes HARUS terakhir
app.use("/", redirectRoutes);
