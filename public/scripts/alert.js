
export function showAlert(message) {
  const alertMessage = document.getElementById("alert-message");
  const alertContainer = document.getElementById('alert-container');
  
  alertMessage.textContent = message;
  alertContainer.style.display = "block";

    alertContainer.addEventListener("click", (e) => {
    if (e.target === alertContainer) {
      alertContainer.style.display = "none";
    }
  });
};