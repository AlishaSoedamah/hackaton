window.onload = () => {
  const cursors = [
    "/images/earth_32x32.png",
    "/images/mars_32x32.png",
    "/images/venus_32x32.png",
    "/images/jupiter_32x32.png",
    "/images/saturn_32x32.png",
    "/images/uranus_32x32.png",
    "/images/mercury_32x32.png",
    "/images/neptune_32x32.png"
  ];

  const random = cursors[Math.floor(Math.random() * cursors.length)];
  document.documentElement.style.cursor = `url(${random}) 16 16, auto`;
};