import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import analyzeTextWithTransformers from "./analize-text-with-transformers";

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN || "";

async function extractTextFromUrl(url: string): Promise<string | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    console.log("$$$$$", $);
    let text = $("p").text();
    return text.substring(0, 5000);
  } catch (error) {
    console.error("Eroare la extragerea textului:", error);
    return null;
  }
}

// Endpoint API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { link } = req.body;
  if (!link || typeof link !== "string") {
    return res.status(400).json({ error: "Invalid link" });
  }

  const extractedText = await extractTextFromUrl(link);
  if (!extractedText) {
    return res
      .status(400)
      .json({ error: "Could not extract text from the link" });
  }

  const classificationResults = await analyzeTextWithTransformers(link);

  if (classificationResults) {
    return res.status(200).json({
      message: "Text classified successfully",
      results: classificationResults,
    });
  } else {
    return res.status(500).json({ error: "Failed to classify text" });
  }
}
