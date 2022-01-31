const displayedPhotos = document.querySelector(".image-grid");
const pageIndicator = document.querySelector(".page-indicator");
const disabled = document.querySelector(".disabled");
const loader = document.querySelector("#loading")
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.thecatapi.com/v1/images/search",
  "method": "GET",
  "headers": {
    "x-api-key": "7873eb92-041d-4959-b69b-3fe222739561",
  },
  "page": 0,
  "limit": 12,
  "order": "asc",
}


function renderNewPhotos(data) {
  displayedPhotos.textContent = null;

  data.forEach(({ url }) => {
    const $img = document.createElement("img");
    $img.src = url;
    displayedPhotos.append($img);
  });
}

function displayLoading() {
    loader.classList.add("display");

}
function hideLoading() {
    loader.classList.remove("display");
}


async function getCats() {
  const url = new URL(settings.url);

  url.searchParams.append("limit", settings.limit);
  url.searchParams.append("page", settings.page);
  url.searchParams.append("order", settings.order);

  pageIndicator.textContent = `Page ${settings.page}`;
  displayedPhotos.textContent = "Loading new photos..";
  displayLoading();
 



  toggleButtons(true);

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": "7873eb92-041d-4959-b69b-3fe222739561",
      },
    });
    const data = await response.json();
    renderNewPhotos(data);
    
  } catch (err) {
    displayedPhotos.textContent =
      "Something went wrong while fetching data from the server";
  } finally {
    toggleButtons(false);
    previous.disabled = settings.page === 0;
    hideLoading();
  }
}

function toggleButtons(disabled) {
  previous.disabled = disabled;
  next.disabled = disabled;
}
previous.addEventListener("click", () => {
  settings.page--;
  getCats();
});
next.addEventListener("click", () => {
  settings.page++;
  getCats();
});

getCats();
