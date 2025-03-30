import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import analyzeTextWithTransformers from "./analize-text-with-transformers";

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN || "";

// Funcție pentru a extrage textul din URL
async function extractTextFromUrl(url: string): Promise<string | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    console.log("$$$$$", $);
    let text = $("p").text(); // Extrage text din toate elementele <p>
    return text.substring(0, 5000); // Limităm la 500 caractere
  } catch (error) {
    console.error("Eroare la extragerea textului:", error);
    return null;
  }
}

// Funcție pentru a analiza textul cu RoBERTa (Hugging Face API)
async function analyzeText(text: string) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/zeroshot/facebook-roberta-mnli",
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
    );
    return response.data[0]; // Returnează rezultatul analizei
  } catch (error) {
    console.error("Eroare la analiza textului:", error);
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

  console.log("Received link:", link);

  // Extrage textul din URL
  const extractedText = await extractTextFromUrl(link);
  if (!extractedText) {
    return res
      .status(400)
      .json({ error: "Could not extract text from the link" });
  }

  console.log("Extracted text:", extractedText);

  // Analizează textul cu RoBERTa
  // const analysis = await analyzeTextWithTransformers(extractedText);

  const classificationResults = await analyzeTextWithTransformers(link);
  console.log(classificationResults, "classificationResults");

  if (classificationResults) {
    return res.status(200).json({
      message: "Text classified successfully",
      results: classificationResults,
    });
  } else {
    return res.status(500).json({ error: "Failed to classify text" });
  }
}
