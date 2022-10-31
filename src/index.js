import axios, { isCancel, AxiosError } from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
let q;

form.addEventListener('submit', handlesubmit);

function handlesubmit(event) {
  event.preventDefault();
  let q = form.elements.searchQuery.value;

  const params = new URLSearchParams({
    key: '30974723-e837a19c04863567111943fb7',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const URL = `https://pixabay.com/api/?${params}`;
  console.log(URL);

  fetchPictures(URL).then(pictures => {
    console.log(pictures);
    const hits = pictures.hits;
    if (pictures.totalHits > 0) {
      let markup = '';
      gallery.innerHTML = '';
      hits.forEach(hit => {
        console.log(hit);
        markup += `<div class="photo-card"><img src="${hit.webformatURL}" alt=${hit.tags} loading="lazy" />
             <div class="info"><p class="info-item"><b>Likes</b>${hit.likes}
             </p><p class="info-item"><b>Views</b>${hit.views}</p><p class="info-item">
             <b>Comments</b>${hit.comments}</p><p class="info-item"><b>Downloads</b>${hit.downloads}</p>
             </div></div>`;
      });
      return (gallery.innerHTML = markup);
    }
    return console.log('0 records');
  });
}

async function fetchPictures(URL) {
  const response = await fetch(`${URL}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const pictures = await response.json();
  return pictures;
}
/*   webformatURL - link do małego obrazka.
    largeImageURL - link do dużego obrazka.
    tags - wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
    likes - liczba lajków.
    views - liczba wyświetleń.
    comments - liczba komentarzy.
    downloads - liczba pobrań.*/

/*form.addEventListener('submit', async () => {
  try {
    const pictures = await fetchPictures();
  } catch (error) {
    console.log('error catched');
  }
});*/

/*async function fetchPictures() {
  const URL = `https://pixabay.com/api/?${params}`;
  const userPictures = [];
  const arrayOfPromises = userPictures.map(async userPicture => {
    const response = await fetch(`${URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const pictures = await response.json();
    return pictures;
  });
  console.log(URL);
}*/
