var map = L.map('map', {
  center: [42.353634, -83.087062],
  zoom: 11
});

// var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   subdomains: 'abcd',
//   minZoom: 0,
//   maxZoom: 20,
//   ext: 'png'
// }).addTo(map);

//
// var Stamen_TonerLite = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


var stamen1 = L.tileLayer('http://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 20,
    ext: 'png'
  });

var stamen2 = L.tileLayer('http://basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 20,
    ext: 'png'
  });

var stamen3 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 20,
    ext: 'png'
  });

var stamen4 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 20,
    ext: 'png'
  });


var layerOnMap = stamen1;
layerOnMap.addTo(map);

function switchMap1() {
  map.removeLayer(layerOnMap);
  layerOnMap = stamen1;
  layerOnMap.addTo(map);
}

function switchMap2() {
  map.removeLayer(layerOnMap);
  layerOnMap = stamen2;
  layerOnMap.addTo(map);
}

function switchMap3() {
  map.removeLayer(layerOnMap);
  layerOnMap = stamen3;
  layerOnMap.addTo(map);
}

function switchMap4() {
  map.removeLayer(layerOnMap);
  layerOnMap = stamen4;
  layerOnMap.addTo(map);
}

  document.getElementById("LabelsOn").onclick = function() {
    if (layerOnMap !== stamen1) {
      switchMap1();
    }
  };

  document.getElementById("LabelsOff").onclick = function() {
    if (layerOnMap !== stamen2) {
      switchMap2();
    }
  };

  document.getElementById("LightAll").onclick = function() {
    if (layerOnMap !== stamen3) {
      switchMap3();
    }
  };

  document.getElementById("DarkAll").onclick = function() {
    if (layerOnMap !== stamen4) {
      switchMap4();
    }
  };
