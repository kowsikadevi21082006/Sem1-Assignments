const $climate = document.getElementById("climate");
const $consumption = document.getElementById("consumption");
const $resources = document.getElementById("resources");
const $people = document.getElementById("people");

$climate.onclick = () => {
  document.body.style.background =
    "url('https://kq-storage.s3.ap-south-1.amazonaws.com/Github/earth/climate-change-bg%5B1%5D.png')";
  document.body.style.backgroundSize = "100% 100%";
  $climate.style.backgroundColor = "red";
  $consumption.style.backgroundColor = "transparent";
  $resources.style.backgroundColor = "transparent";
  $people.style.backgroundColor = "transparent";
  document.getElementById("frame").src =
    "https://www.theworldcounts.com/embed/challenges/23?background_color=transparent&color=white&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=20";
  document.getElementById("save").innerHTML =
    " Do your bit! Save trees, use renewable energy soureces and prefer to travel green";
};
$consumption.onclick = () => {
  document.body.style.background =
    "url('https://kq-storage.s3.ap-south-1.amazonaws.com/Github/earth/food-wastage-bg%5B1%5D.png')";
  document.body.style.backgroundSize = "100% 100%";
  $climate.style.backgroundColor = "transparent";
  $consumption.style.backgroundColor = "blue";
  $resources.style.backgroundColor = "transparent";
  $people.style.backgroundColor = "transparent";
  document.getElementById("save").innerHTML =
    "Do your bit! Shop only what you need,eat only what you need and always save the left overs.";
  document.getElementById("frame").src =
    "https://www.theworldcounts.com/embed/challenges/107?background_color=transparent&color=white&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=20";
};
$resources.onclick = () => {
  document.body.style.background =
    "url('https://kq-storage.s3.ap-south-1.amazonaws.com/Github/earth/natural-resources-bg%5B1%5D.png')";
  document.body.style.backgroundSize = "100% 100%";
  $climate.style.backgroundColor = "transparent";
  $consumption.style.backgroundColor = "transparent";
  $resources.style.backgroundColor = "orange";
  $people.style.backgroundColor = "transparent";
  document.getElementById("save").innerHTML =
    "Do your bit! Avoid all things plastic. Believe in Reduce, Reuse and Recycle";
  document.getElementById("frame").src =
    "https://www.theworldcounts.com/embed/challenges/5?background_color=transparent&color=white&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=20";
};
$people.onclick = () => {
  document.body.style.background =
    "url('https://kq-storage.s3.ap-south-1.amazonaws.com/Github/earth/poverty-bg%5B1%5D.png')";
  document.body.style.backgroundSize = "100% 100%";
  $climate.style.backgroundColor = "transparent";
  $consumption.style.backgroundColor = "transparent";
  $resources.style.backgroundColor ="transparent";
  $people.style.backgroundColor = "yellow";
  document.getElementById("save").innerHTML =
    " Do your bit! Never waste  food.Rather offer it to people or animals who are in need.";
  document.getElementById("frame").src =
    "https://www.theworldcounts.com/embed/challenges/2?background_color=transparent&color=white&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=20";
};
