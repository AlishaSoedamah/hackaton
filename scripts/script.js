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