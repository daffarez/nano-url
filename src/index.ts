import express from "express";
import dotenv from "dotenv";
import redirectRoutes from "./routes/redirect.routes";
import urlRoutes from "./routes/shorten.routes";
import swaggerUi from "swagger-ui-express";
import { setupSwagger } from "./docs/swagger";

dotenv.config();

const app = express();
setupSwagger(app);
app.use(express.json());

// API routes
app.use("/api", urlRoutes);

// redirect routes
app.use("/", redirectRoutes);

app.listen(9099, () => {
  console.log("Server running at http://localhost:9099");
});
