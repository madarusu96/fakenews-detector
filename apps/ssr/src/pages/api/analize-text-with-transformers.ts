import { pipeline } from '@xenova/transformers';

async function analyzeTextWithTransformers(text: string) {
  try {
    // Încarcă modelul și tokenizer-ul
    const classifier = await pipeline('text-classification', 'mihalca/bert_model_ro_fake_news');

    // Clasicifică textul
    const results = await classifier(text);

    // Afișează rezultatele
    console.log('Classification Results:', results);

    // Returnează rezultatele
    return results;
  } catch (error) {
    console.error("Eroare la analiza textului:", error);
    return null;
  }
}

export default analyzeTextWithTransformers;
