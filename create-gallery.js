import imageGallery from "./gallery-items.js"
/* console.log(imageGallery); */
const refs = {
  containerImages: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  openModal: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  closeModalForClickToOverlay:document.querySelector('.lightbox__overlay'),
};


const createImageGalleryMarcup = arrays =>
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
        .join('');
 
/* console.log(createImageGalleryMarcup(imageGallery)); */
refs.containerImages.insertAdjacentHTML("beforeend",(createImageGalleryMarcup(imageGallery)))


const onClick = evt => {
  window.addEventListener('keydown', (evt) => {
    /* console.log(evt.code); */
    if (evt.code === "Escape") {
    onCloseModal()
    }
    if (evt.code === "ArrowLeft") {
    arrowLeft()
  }
  if (evt.code === "ArrowRight") {
    arrowRight()
  }
  }/* onCloseToEsc */);
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
 /*  if (evt.target.nodeName === 'IMG') {
    return;
  } */
  refs.lightbox.classList.remove("is-open");
  refs.openModal.removeAttribute('src');
  refs.openModal.removeAttribute('alt');
 };
refs.closeModal.addEventListener('click', onCloseModal);
refs.closeModalForClickToOverlay.addEventListener('click', onCloseModal);

/* const onCloseToEsc = evt => { 
  if (evt.code === "Escape") {
    onCloseModal()
  }

}; */
function setNewSrc(step, index) {
  refs.openModal.dataset.index = `${index + step}`
  refs.openModal.src = imageGallery[index + step].original
}

function arrowLeft() {
  let i = Number(refs.openModal.dataset.index)
  if (i === 0) {
    setNewSrc(0, imageGallery.length - 1)
    return
  }
  setNewSrc(-1, i)
}

function arrowRight() {
  let i = +refs.openModal.dataset.index
  if (i === imageGallery.length - 1) {
    setNewSrc(0, 0)
    return
  }
  setNewSrc(1, i)
}