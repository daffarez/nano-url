import { Router } from "express";
import { prismaClient } from "../lib/prisma-client";
import path from "path";

const router = Router();

// preview page
router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const found = await prismaClient.url.findUnique({
    where: { shortCode: code },
  });

  if (!found) {
    return res.status(404).send("URL not found");
  }

  const url = new URL(found.originalUrl);

  res.sendFile(path.join(process.cwd(), "public", "preview.html"));
});

// actual redirect
router.get("/r/:code", async (req, res) => {
  const { code } = req.params;

  const found = await prismaClient.url.findUnique({
    where: { shortCode: code },
  });

  if (!found) {
    return res.status(404).send("URL not found");
  }

  await prismaClient.url.update({
    where: { id: found.id },
    data: { visits: { increment: 1 } },
  });

  res.redirect(found.originalUrl);
});

export default router;
