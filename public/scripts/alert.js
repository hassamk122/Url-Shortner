
export function showAlert(message) {
  const alertMessage = document.getElementById("alert-message");
  const alertContainer = document.getElementById("alert-container");

  alertMessage.textContent = message;
  alertContainer.style.display = "flex";


  setTimeout(() => {
    alertContainer.classList.add("show");
  }, 20);


  alertContainer.addEventListener("click", (e) => {
    if (e.target === alertContainer) {
      alertContainer.classList.remove("show");
      setTimeout(() => {
        alertContainer.style.display = "none";
      },20); 
    }
  });
}
