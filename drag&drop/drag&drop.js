let dragId;

function allowDrop(ev) {
  ev.preventDefault();
}
  
start1= (ev)=> {
  ev.preventDefault();
  console.log("Hi");
}
  
function drop(ev) {
  ev.preventDefault();
  var img = document.createElement('img');
  img.src = "images/scr.PNG";
  ev.target.style.border = "none";
  ev.target.appendChild(img);
}