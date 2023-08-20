if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/src/sw.js")
    .then(function () {
      console.log("ServiceWorker is Find");
    })
    .catch(() => {
      console.log("Service Worker is NOT Found");
    });
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  console.log(" beforeinstallprompt fired");
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

setTimeout(() => {
  console.log("This is excuted after timer");
}, 3000);

console.log("This is excuted  one time");
