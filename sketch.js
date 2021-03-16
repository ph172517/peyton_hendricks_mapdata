const key = 'pk.eyJ1IjoicGgxNzI1MTciLCJhIjoiY2ttMmQ4Zmg0NG5jNTJ3cG1rdnZyMXFzYyJ9.Nmfy_jejZ69TVEjpTq7JAQ';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 12,
  style: 'mapbox://styles/ph172517/ckmawtswh6d4k17o78so7ivsu',
  pitch: 0
}

const mappa = new Mappa("MapboxGL", key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  place = loadTable('Feb12-Mar12.csv', 'csv', 'header');
}


function draw() {
  clear();
  //noFill();
  stroke(19,47,89);
  strokeWeight(3);
  const athens = myMap.latLngToPixel(39.329239, -82.101257)
  
 // ellipse(athens.x, athens.y, 200, 200);
  
  if(dist(athens.x, athens.y, mouseX, mouseY)<100){
    fill(255,100);
  }else{
    fill(255,255,255,0);
  }
  
  //load .csv data
  for (let i = 0; i < place.getRowCount(); i++) {
    const latitude = Number(place.getString(i, 'reclat'));
    const longitude = Number(place.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    
    const name = place.getString(i, 'place');
    
    ellipse(pos.x, pos.y, 15, 15);
  
  //tooltip
  if(dist(pos.x, pos.y, mouseX, mouseY) < 15){
    textSize(20);
    text(name,pos.x,pos.y);
  }
  }
  
}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /*false to get page from cache */
  }, 200)
});
