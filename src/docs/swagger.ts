import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
