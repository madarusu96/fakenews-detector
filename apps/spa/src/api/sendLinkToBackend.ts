import { BackendResponse } from "../types/News";

export async function sendLinkToBackend(
  link: string
): Promise<BackendResponse[]> {
  try {
    const response = await fetch("http://localhost:3000/api/receive-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    });

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error sending link:", error);
    return [];
  }
}
