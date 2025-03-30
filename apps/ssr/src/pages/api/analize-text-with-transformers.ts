import { pipeline } from "@xenova/transformers";

async function analyzeTextWithTransformers(text: string) {
  try {
    const classifier = await pipeline(
      "text-classification",
      "mihalca/bert_model_ro_fake_news"
    );

    const results = await classifier(text);

    return results;
  } catch (error) {
    console.error("Eroare la analiza textului:", error);
    return null;
  }
}

export default analyzeTextWithTransformers;
