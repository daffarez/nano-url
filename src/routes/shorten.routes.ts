import { Router } from "express";
import { prismaClient } from "../lib/prisma-client";
import { generateCode } from "../utils/generate-code";
import { normalizeUrl } from "../utils/normalize-url";

const router = Router();

const isValidAlias = (alias: string) => {
  return /^[a-zA-Z0-9-_]+$/.test(alias);
};

router.post("/url/shorten", async (req, res) => {
  try {
    const { url, alias } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const normalized = normalizeUrl(url);

    if (!normalized) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    let code = alias;

    if (alias) {
      if (!isValidAlias(alias)) {
        return res.status(400).json({ message: "Invalid alias format" });
      }

      const exists = await prismaClient.url.findUnique({
        where: { shortCode: alias },
      });

      if (exists) {
        return res.status(409).json({ message: "Alias already taken" });
      }
    } else {
      code = generateCode();
      while (
        await prismaClient.url.findUnique({ where: { shortCode: code } })
      ) {
        code = generateCode();
      }
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

router.get("/urls/:code", async (req, res) => {
  const { code } = req.params;

  const url = await prismaClient.url.findUnique({
    where: { shortCode: code },
  });

  if (!url) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    originalUrl: url.originalUrl,
    hostname: new URL(url.originalUrl).hostname,
  });
});

export default router;
