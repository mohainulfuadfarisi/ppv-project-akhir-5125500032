
/* Satu tempat untuk API JavaScript Bootstrap */
window.TugasKuUI = {
  toast(message) {
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
};
