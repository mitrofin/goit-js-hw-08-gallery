import imageGallery from "./gallery-items.js"
/* console.log(imageGallery); */
const refs = {
  containerImages: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  openModal: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  closeModalForClickToOverlay:document.querySelector('.lightbox__overlay'),
};


const createImageGalleryMarcup = arrays => {
    return arrays
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item">
              <a class="gallery__link"
                href="${original}">
                <img class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"/>
              </a>
            </li>`;
        }
        )
        .join('');
 }
/* console.log(createImageGalleryMarcup(imageGallery)); */
refs.containerImages.insertAdjacentHTML("beforeend",(createImageGalleryMarcup(imageGallery)))


const onClick = evt => {
  window.addEventListener('keydown', onCloseToEsc);
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.openModal.src = evt.target.dataset.source;
  refs.openModal.alt = evt.target.alt;
};
refs.containerImages.addEventListener('click', onClick);

const onCloseModal = evt => {
 /*  if (evt.target.nodeName === 'IMG') {
    return;
  } */
  refs.lightbox.classList.remove("is-open");
  refs.openModal.removeAttribute('src');
  refs.openModal.removeAttribute('alt');
 };
refs.closeModal.addEventListener('click', onCloseModal);
refs.closeModalForClickToOverlay.addEventListener('click', onCloseModal);

const onCloseToEsc = evt => { 
  if (evt.code === "Escape") {
    onCloseModal()
  }

};