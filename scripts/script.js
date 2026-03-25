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
  const end = marquee.offsetTop + marquee.offsetHeight - viewportHeight;

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

const resizeObserver = new ResizeObserver(() => {
	updateProgress();
});

resizeObserver.observe(main);
resizeObserver.observe(carousel);
resizeObserver.observe(heading);
resizeObserver.observe(marquee);


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