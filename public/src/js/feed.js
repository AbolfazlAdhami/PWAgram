var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector("#close-create-post-modal-btn");
var sharedMomentsArea = document.querySelector("#shared-moments");

async function openCreatePostModal() {
  createPostArea.style.display = "block";
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    if (outcome == "dismissed") {
      console.log("User Dimissed Prompt");
    } else {
      console.log("User Accepted Prompt");
    }
    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}
const savePost = async () => {
  console.log("for save post Clicked...");
  if ("caches" in window) {
    const userCache = await caches.open("user-chache");
    await userCache.add("https://httpbin.org/get");
    await userCache.add("/src/images/sf-boat.jpg");
  }
};
shareImageButton.addEventListener("click", openCreatePostModal);
closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

const saveButton = document.createElement("button");
saveButton.textContent = "save post";
saveButton.classList.add("save-btn");
saveButton.style.marginLeft = "0.5rem";
saveButton.style.padding = "0.5rem";
saveButton.style.borderRadius = "0.5rem";
saveButton.style.cursor = "pointer";
saveButton.style.backgroundColor = "#ff4081";
saveButton.style.border = "none";
saveButton.style.outline = "none";
saveButton.style.color = "#fff";

function createCard() {
  var cardWrapper = document.createElement("div");

  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = "San Francisco Trip";
  cardTitleTextElement.style.color = "#fff";
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = "In San Francisco";
  cardSupportingText.style.textAlign = "center";

  saveButton.addEventListener("click", savePost);
  cardSupportingText.appendChild(saveButton);
  cardWrapper?.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch("https://httpbin.org/get")
  .then(async (res) => {
    const data = await res.json();
    console.log(data);
    return data;
  })
  .then(() => {
    createCard();
  });
