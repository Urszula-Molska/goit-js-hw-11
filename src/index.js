import axios, { isCancel, AxiosError } from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
let q;
const photoCard = document.querySelector('.photo-card');
const loadMore = document.querySelector('.load-more');

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
    per_page: 40,
    page: 1,
  });

  const URL = `https://pixabay.com/api/?${params}`;

  fetchPictures(URL).then(pictures => {
    const hits = pictures.hits;
    console.log(pictures);
    console.log(hits);
    console.log(pictures.totalHits);
    if (pictures.totalHits > 0) {
      let markup = '';
      gallery.innerHTML = '';
      hits.forEach(hit => {
        markup += `<div class="photo-card" style="border:gainsboro;border-width:1px;border-style:solid;border-radius:5px"><a class="lightbox" href="${hit.largeImageURL}"><img style="object-fit:cover;" src="${hit.webformatURL}" alt=${hit.tags} loading="lazy" width=263px height="176px" 
          /></a>
             <div class="info"><p class="info-item"><b>Likes</b>${hit.likes}
             </p><p class="info-item"><b>Views</b>${hit.views}</p><p class="info-item">
             <b>Comments</b>${hit.comments}</p><p class="info-item"><b>Downloads</b>${hit.downloads}</p>
             </div></div>`;
      });
      gallery.innerHTML = markup;
      //return (gallery.innerHTML = markup);

      let LightboxGallery = new SimpleLightbox('.gallery a');
      LightboxGallery.on('show.simplelightbox');
      LightboxGallery.defaultOptions.captionsData = 'alt';

      LightboxGallery.defaultOptions.captionDelay = 250;
      document.addEventListener('keyup', event => {
        if (event.code === 'Escape') {
          LightboxGallery.close;
        }
      });
    } else return console.log('0 records');
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

/*loadMore.addEventListener('click', () => {
        params.page = params.page + 1;
        console.log(params.page);
      });*/

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

//sizes ='(min-width:1200px) calc(33.333vw - 30px), (min-width:768px) calc(50vw - 30px), (min-width: 300px) 100vw';

/*fetchPictures(URL).then(pictures => {
    console.log(pictures);
    const hits = pictures.hits;
    if (pictures.totalHits > 0) {
      let markup = '';
      gallery.innerHTML = '';
      hits.forEach(hit => {
        console.log(hit);
        markup += `<div class="photo-card"><img src="${hit.webformatURL}" alt=${hit.tags} loading="lazy" srcset="${hit.webformatURL}" sizes="(min-width:1200px) 400w, (min-width:768px) calc(50vw - 30px), (min-width: 300px) 100vw"
              />
             <div class="info"><p class="info-item"><b>Likes</b>${hit.likes}
             </p><p class="info-item"><b>Views</b>${hit.views}</p><p class="info-item">
             <b>Comments</b>${hit.comments}</p><p class="info-item"><b>Downloads</b>${hit.downloads}</p>
             </div></div>`;
      });
      return (gallery.innerHTML = markup);
    }
    return console.log('0 records');
  });
}*/
