import { showAlert } from "./alert.js";

const form = document.getElementById("url-form");
const inputField = document.getElementById("url-input");
const generatedUrlDiv = document.getElementById("generated-url");
const outputDiv = document.getElementById("output-div");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!inputField.value.trim()) {
    showAlert("Please enter a URL!");
    return;
  }

  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  if (!urlPattern.test(inputField.value)) {
    showAlert("Please enter a valid URL (must start with http:// or https://)");
    return;
  }

  try {
    const resposne = await fetch("/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputField.value }),
    });

    const data = await resposne.json();

    if (!resposne.ok) {
      showAlert(data.error || "Something went Wrong!");
      return;
    }
    console.log(data);
    outputDiv.style.display = "flex";
    generatedUrlDiv.innerHTML = `
        <p id="generated-para">
              <a href="http://localhost:8080/${data.id}" target="_blank">
               http://localhost:8080/${data.id}
             </a>
              
         </p><button id="copy-btn">📋</button>`;
    document.getElementById("copy-btn").addEventListener("click", () => {
      const urlToCopy = `http://localhost:8080/${data.id}`;
      navigator.clipboard
        .writeText(urlToCopy)
        .then(() => showAlert("Copied to clipboard!"))
        .catch((err) => showAlert("Failed to copy URL"));
    });
    showAlert("Operation Successful!");
    inputField.value = "";
  } catch (error) {
    console.error("Error:", error);
    showAlert("Failed to submit URL");
  }
});
