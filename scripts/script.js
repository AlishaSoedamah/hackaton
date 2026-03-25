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
const marquee = document.querySelector('.marquee');
const details = document.querySelector('.details-section');
const footer = document.querySelector('.site-footer');

const indicator = document.querySelector('.scroll-indicator');
const satellite = document.querySelector('.scroll-indicator__satellite');
const fill = document.querySelector('.scroll-indicator__fill');
const rail = document.querySelector('.scroll-indicator__rail');

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function updateProgress() {
	if (!carousel || !footer || !indicator || !satellite || !fill || !rail) {
		return;
	}

	const viewportHeight = window.innerHeight;
	const scrollY = window.scrollY;

	// Progress start
	const start = carousel.offsetTop - viewportHeight * 0.7;

	// Progress end: vlak voor de footer
	const endOffset = 40;
	const end = footer.offsetTop - viewportHeight - endOffset;

	const rawProgress = (scrollY - start) / (end - start);
	const progress = clamp(rawProgress, 0, 1);

	body.classList.toggle('progress-active', progress > 0);

	// Fill + satellite
	const railHeight = rail.offsetHeight;
	const satelliteHeight = satellite.offsetHeight;
	const travelDistance = railHeight - satelliteHeight;

	const y = progress * travelDistance;

  // visuele correctie omdat de PNG niet exact op de onderrand "ankert"
  const satelliteVisualOffset = 70;

  const satelliteTop = y + satelliteVisualOffset;
  const fillHeight = satelliteTop + satelliteHeight - satelliteVisualOffset;

fill.style.height = `${fillHeight}px`;
satellite.style.top = `${satelliteTop}px`;

	// Indicator position: fixed totdat footer bereikt is,
	// daarna "plakt" hij net boven de footer.
	const indicatorTopInViewport = 40; // zelfde als je CSS top
	const indicatorHeight = indicator.offsetHeight;

	const maxDocumentTop =
		footer.offsetTop - indicatorHeight - endOffset;

	const fixedDocumentTop = scrollY + indicatorTopInViewport;

	if (fixedDocumentTop >= maxDocumentTop) {
		indicator.classList.add('is-stuck');
		indicator.style.top = `${maxDocumentTop}px`;
	} else {
		indicator.classList.remove('is-stuck');
		indicator.style.top = `${indicatorTopInViewport}px`;
	}
}

updateProgress();

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const resizeObserver = new ResizeObserver(() => {
	updateProgress();
});

if (main) resizeObserver.observe(main);
if (carousel) resizeObserver.observe(carousel);
if (heading) resizeObserver.observe(heading);
if (marquee) resizeObserver.observe(marquee);
if (details) resizeObserver.observe(details);
if (footer) resizeObserver.observe(footer);
if (indicator) resizeObserver.observe(indicator);

/*********************/
/* MARK: EATSTER EGG */
/*********************/

const konamiCode = [
  "ArrowUp","ArrowUp",
  "ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight",
  "ArrowLeft","ArrowRight",
  "b","a"
];

let inputSequence = [];

window.addEventListener("keydown", (e) => {
  inputSequence.push(e.key.toLowerCase());

  if (inputSequence.length > konamiCode.length) {
    inputSequence.shift();
  }

  if (inputSequence.join("") === konamiCode.join("").toLowerCase()) {
    activateBlackHoleMode();
    inputSequence = [];
  }
});

function activateBlackHoleMode() {
  document.body.classList.add("blackhole-mode");
}

// TYPING FOR EASTER EGG
const text = "-.-- --- ..- / .... .- ...- . / -... . . -. / .- -... ... --- .-. -... . -.. / .. -. - --- / - .... . / ...- --- .. -.. .-.-.- .-.-.- .-.-.-";
const el = document.getElementById("typingText");
const typingSound = new Audio('../audio/morsethevoid.mp3');

let i = 0;
let typingActive = false;


function typeWriter() {
  if (!typingActive) return;

  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    i++;


    if (typingSound.paused) {
      typingSound.currentTime = 0;
      typingSound.play();
    }

    setTimeout(typeWriter, 100);
  }
}

function activateBlackHoleMode() {
  document.body.classList.add("blackhole-mode");

  el.innerHTML = "";
  i = 0;
  typingActive = true;

  typingSound.currentTime = 0;
  typingSound.play();

  typeWriter();
}

// EXIT BUTTON
const exitBtn = document.getElementById("exitBlackhole");

if (exitBtn) {
  exitBtn.addEventListener("click", () => {
    document.body.classList.remove("blackhole-mode");

    typingActive = false;
    typingSound.pause();
    typingSound.currentTime = 0;
  });
}


/********************************/
/* MARK: ANIMATION WHEN VISIBLE */
/********************************/

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("in-view");

			// zorgt dat animatie maar 1x afspeelt
			observer.unobserve(entry.target);
		}
	});
}, {
	threshold: 0.3
});

document.querySelectorAll(".heading").forEach(section => {
	observer.observe(section);
});

/**********************/
/* MARK: DETAILS INFO */
/**********************/

const detailInfoRadio = document.querySelector('.button-list');

detailInfoRadio.addEventListener('change', showDetailInfo);

const initialRadio = document.getElementById('science');
initialRadio.setAttribute('checked', true);
initialRadio.dispatchEvent(new Event('change', {bubbles: true}));

function showDetailInfo(event) {
  const inputId = event.target.getAttribute('id');

  const details = document.querySelectorAll('.detail-element');
  details.forEach((detail) => {
    if (detail.getAttribute('data-for') === inputId) {
      detail.classList.add('active');
    } else if (detail.classList.contains('active')) {
      detail.classList.remove('active');
    }
  });
}


