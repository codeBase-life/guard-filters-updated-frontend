// flip logo
const logos = document.getElementById("logo");
let two_logos = ["./assets/logo.png", "./assets/super-gac.png"];
let current_logo = 0;

function swith_logo() {
  current_logo = (current_logo + 1) % two_logos.length;
  let logo = two_logos[current_logo];
  logos.src = logo;
}
setInterval(() => {
  swith_logo();
}, 3000);
