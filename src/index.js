import axios, { isCancel, AxiosError } from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
let q;

form.addEventListener('submit', handlesubmit);

function handlesubmit(event) {
  event.preventDefault();
  q = form.elements.searchQuery.value;
  console.log(q);
}

const params = new URLSearchParams({
  key: '30974723-e837a19c04863567111943fb7',
  q: q,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const URL = `https://pixabay.com/api/?${params}`;

form.addEventListener('submit', async () => {
  try {
    const pictures = await fetchPictures();
  } catch (error) {
    console.log('error catched');
  }
});

async function fetchPictures() {
  const userPictures = [];
  const arrayOfPromises = userPictures.map(async userPicture => {
    const response = await fetch(`${URL}`);
    return response.json();
  });
}
