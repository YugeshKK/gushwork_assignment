    /* Carousel */
    // array of all the carousel images we're gonna use
    const images = [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3"

    ];
    let current = 0;
    // set the slide to a specific index and update the active thumbnail
    function setSlide(idx) {
      current = (idx + images.length) % images.length;
      const img = document.getElementById('mainImg');
      img.style.opacity = '0';
      // fade effect when changing slides, looks smoother
      setTimeout(() => { img.src = images[current]; img.style.opacity = '1'; }, 200);
      document.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === current));
    }
    // change to next or previus slide based on direction
    function changeSlide(dir) { setSlide(current + dir); }

    /* FAQ accordion */
    // toggle the faq item open/close and close all other items
    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // close all open faq items first
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // if it wasnt open before, open it now
      if (!wasOpen) item.classList.add('open');
    }

    /* Mobile nav */
    // toggle the mobile menu visibility
    function toggleNav() {
      document.getElementById('mobileNav').classList.toggle('open');
    }
  

/* Modal Functions */
// open a modal by id and prevent body scrolling
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

// close the modal and restore scrolling
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = 'auto';
}

// close modal when clicking on the overlay background
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});


/* APPLICATIONS SLIDER */
// grab the slider element and navigation buttons
const applicationsSlider = document.querySelector(".applications-slider");
const appPrevBtn = document.querySelector(".applications-arrows button:first-child");
const appNextBtn = document.querySelector(".applications-arrows button:last-child");

if (applicationsSlider && appPrevBtn && appNextBtn) {

  // calculate how much to scroll based on card width and gap
  function getScrollAmount() {
    const card = document.querySelector(".application-card");

    if (!card) return 300;

    const gap = 16;
    return card.offsetWidth + gap;
  }

  // scroll left when prev button is clicked
  appPrevBtn.addEventListener("click", () => {
    applicationsSlider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  // scroll right when next button is clicked
  appNextBtn.addEventListener("click", () => {
    applicationsSlider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

}

/* IMAGE ZOOM */
// grab all the zoom related elements from the DOM
const carouselMain = document.querySelector(".carousel-main");
const mainImage = document.getElementById("mainImg");
const zoomResult = document.getElementById("zoomResult");
const zoomToggle = document.getElementById("zoomToggle");

let zoomEnabled = false;
const zoomLevel = 2.5;

if (carouselMain && mainImage && zoomResult && zoomToggle) {
// setup the zoom image backgrond with proper size and position
function setZoomImage() {
  const imageUrl = mainImage.getAttribute("src");

  zoomResult.style.backgroundImage = `url('${imageUrl}')`;
  zoomResult.style.backgroundRepeat = "no-repeat";
  zoomResult.style.backgroundSize = `${mainImage.offsetWidth * zoomLevel}px ${mainImage.offsetHeight * zoomLevel}px`;
  zoomResult.style.backgroundPosition = "center";
}

  // toggle zoom on/off when button is clicked
  zoomToggle.addEventListener("click", () => {
    zoomEnabled = !zoomEnabled;
    carouselMain.classList.toggle("zoom-active", zoomEnabled);

    if (zoomEnabled) {
      setZoomImage();
    }
  });

  // update zoom position as mouse moves over the image
  mainImage.addEventListener("mousemove", (e) => {
    if (!zoomEnabled) return;

    const rect = mainImage.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // calculate the zoom lens position
    const bgX = -(x * zoomLevel - zoomResult.offsetWidth / 2);
    const bgY = -(y * zoomLevel - zoomResult.offsetHeight / 2);

    zoomResult.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });

  // reset zoom position when mouse leaves the image
  mainImage.addEventListener("mouseleave", () => {
    if (!zoomEnabled) return;
    zoomResult.style.backgroundPosition = "center";
  });

  // refresh zoom image when a new image loads
  mainImage.addEventListener("load", () => {
    if (zoomEnabled) {
      setZoomImage();
    }
  });
}