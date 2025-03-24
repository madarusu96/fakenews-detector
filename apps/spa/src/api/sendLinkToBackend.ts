export async function sendLinkToBackend(link: string) {
  try {
    const response = await fetch("http://localhost:3000/api/receive-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    });

    const data = await response.json();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Error sending link:", error);
  }
}
