import { Router } from "express";
import { prismaClient } from "../lib/prisma-client";
import { generateCode } from "../utils/generate-code";
import { normalizeUrl } from "../utils/normalize-url";

const router = Router();

router.post("/url/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const normalized = normalizeUrl(url);

    if (!normalized) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    let code = generateCode();

    while (await prismaClient.url.findUnique({ where: { shortCode: code } })) {
      code = generateCode();
    }

    const newUrl = await prismaClient.url.create({
      data: {
        originalUrl: normalized,
        shortCode: code,
      },
    });

    res.json({
      shortUrl: `http://localhost:9099/${newUrl.shortCode}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
