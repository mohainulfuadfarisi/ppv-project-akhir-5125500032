export function showToast(message) {
  const element = document.getElementById("tugaskuToast");
  const messageElement = document.getElementById("tugaskuToastMessage");

  if (!element || !messageElement || !window.bootstrap) {
    console.info(message);
    return;
  }

  messageElement.textContent = message;
  const toast = window.bootstrap.Toast.getOrCreateInstance(element);
  toast.show();
}

export function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}