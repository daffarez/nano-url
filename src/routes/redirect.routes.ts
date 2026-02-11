import { Router } from "express";
import { prismaClient } from "../lib/prisma-client";

const router = Router();

router.get("/:code", async (req, res) => {
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
