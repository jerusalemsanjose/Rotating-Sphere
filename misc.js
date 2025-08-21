const words = ["spinning", "glowing", "moving", "amazing", "alive", "3D"];
const span = document.getElementById("randomWord");

setInterval(() => {
  const random = words[Math.floor(Math.random() * words.length)];
  span.textContent = random;
}, 1000);