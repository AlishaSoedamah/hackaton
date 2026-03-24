/***********************/
/* MARK: CURSOR ONLOAD */
/***********************/

window.onload = () => {
  const cursors = [
    "public/images/earth_32x32.png",
    "public/images/mars_32x32.png",
    "public/images/venus_32x32.png",
    "public/images/jupiter_32x32.png",
    "public/images/saturn_32x32.png",
    "public/images/uranus_32x32.png",
    "public/images/mercury_32x32.png",
    "public/images/neptune_32x32.png"
  ];

  const random = cursors[Math.floor(Math.random() * cursors.length)];
  document.documentElement.style.cursor = `url(${random}) 16 16, auto`;
};


/**********************/
/* MARK: PROGRESS BAR */
/**********************/

const body = document.body;
const heading = document.querySelector('.heading');
const carousel = document.querySelector('.carousel');
const main = document.querySelector('main');

const indicator = document.querySelector('.scroll-indicator');
const satellite = document.querySelector('.scroll-indicator__satellite');
const fill = document.querySelector('.scroll-indicator__fill');
const rail = document.querySelector('.scroll-indicator__rail');


function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function updateProgress() {
	const viewportHeight = window.innerHeight;

  // Start: When the satellite is nearly out of view
	const start = carousel.offsetTop - viewportHeight * 0.7;

  // End: Bottom of all content
	const end = main.offsetTop + main.offsetHeight - viewportHeight;

	const rawProgress = (window.scrollY - start) / (end - start);
	const progress = clamp(rawProgress, 0, 1);

  // Activate progress mode
	body.classList.toggle('progress-active', progress > 0);

  // Height of the rail that the satellite moves over
	const railHeight = rail.offsetHeight;
	const satelliteHeight = satellite.offsetHeight;
	const travelDistance = railHeight - satelliteHeight;
  const indicatorPosition = progress * railHeight;

	const y = travelDistance * progress;

  fill.style.height = `${indicatorPosition}px`;
  satellite.style.top = `${indicatorPosition}px`;
}

updateProgress();
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);

// If content changes, recalculate
const resizeObserver = new ResizeObserver(() => {
	updateProgress();
});

resizeObserver.observe(main);
resizeObserver.observe(carousel);
resizeObserver.observe(heading);