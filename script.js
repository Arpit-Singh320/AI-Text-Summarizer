// Function to query Hugging Face API for text summarization
async function querySummarization(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_API_TOKEN  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", // Replace with your token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error querying summarization:", error);
    return null;
  }
}

// Event Listener for Summarize Button
document.getElementById("summarize-btn").addEventListener("click", async () => {
  const inputText = document.getElementById("input-text").value.trim();

  // Show error notification if input is empty
  if (!inputText) {
    Toastify({
      text: "Please enter some text to summarize.",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      duration: 3000,
    }).showToast();
    return;
  }

  // Display loading message
  const summaryOutput = document.getElementById("summary-output");
  summaryOutput.innerHTML = "Loading summary...";

  // Fetch summarization result
  const result = await querySummarization({ inputs: inputText });

  // Display summary or error message
  if (result && result[0] && result[0].summary_text) {
    summaryOutput.innerHTML = result[0].summary_text;
  } else {
    summaryOutput.innerHTML =
      "Sorry, an error occurred. Please try again later.";
  }
});
