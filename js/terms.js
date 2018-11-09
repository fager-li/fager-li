const terms =["UX", "Design","Design", "Graphic", "Digital", "Visual","Psycho", "Compu", "Design", "Design", "Shit", "Junior", "Creative", "Strategic", "Great", "Design", "System", "Isaac",];

const bigwords = document.getElementsByClassName("term");


var intervalID = window.setInterval(myCallback, 900);

function myCallback() {
    var i = Math.round(Math.random());
    bigwords[i].textContent = terms[Math.floor(Math.random() * terms.length)];
}