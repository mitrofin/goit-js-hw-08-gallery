import imageGallery from "./gallery-items.js"
import { createImagesGallary }  from './create-image-item.js';
const refs = {
  containerImages: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  openModal: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  closeModalForClickToOverlay:document.querySelector('.lightbox__overlay'),
};

/* const createImageGalleryMarcup = arrays =>
     arrays.map(({ preview, original, description }, index) => {
            return `<li class="gallery__item">
              <a class="gallery__link"
                href="${original}">
                <img class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                  data-index="${index}"/>
              </a>
            </li>`;
        }
        )
        .join(''); */
 
const makeItemsGallery = imageGallery.map(createImagesGallary).join('');
refs.containerImages.insertAdjacentHTML("beforeend", makeItemsGallery);


const onClick = evt => {
  window.addEventListener('keydown', (evt) => {
  
    if (evt.code === "Escape") {
    onCloseModal()
    }
    if (evt.code === "ArrowLeft") {
    arrowLeft()
  }
  if (evt.code === "ArrowRight") {
    arrowRight()
  }
  });
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.openModal.src = evt.target.dataset.source;
  refs.openModal.alt = evt.target.alt;
  refs.openModal.dataset.index = evt.target.dataset.index
};
refs.containerImages.addEventListener('click', onClick);

const onCloseModal = evt => {
 
  refs.lightbox.classList.remove("is-open");
  refs.openModal.removeAttribute('src');
  refs.openModal.removeAttribute('alt');
  window.removeEventListener('keydown',(evt));


 };
refs.closeModal.addEventListener('click', onCloseModal);
refs.closeModalForClickToOverlay.addEventListener('click', onCloseModal);

function changeSrc(step, index) {
  refs.openModal.dataset.index = `${index + step}`
  refs.openModal.src = imageGallery[index + step].original
}

function arrowLeft() {
  let i = Number(refs.openModal.dataset.index)
  if (i === 0) {
    changeSrc(0, imageGallery.length - 1)
    return
  }
  changeSrc(-1, i)
}

function arrowRight() {
  let i = +refs.openModal.dataset.index
  if (i === imageGallery.length - 1) {
    changeSrc(0, 0)
    return
  }
  changeSrc(1, i)
}