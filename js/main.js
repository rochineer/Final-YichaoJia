
var detroitSchool = "https://opendata.arcgis.com/datasets/b308d05e82614ab4979690e04c90294b_0.geojson";
var detroitPark = "https://opendata.arcgis.com/datasets/7a608c3ca434474abbca3cbcf1f96c59_0.geojson";
var detroitLibrary = "https://opendata.arcgis.com/datasets/464cf28590764dd69169d8d01428ce90_0.geojson";
var detroitRec = "https://opendata.arcgis.com/datasets/5639faf260dd483aa5ab0f578e24154f_0.geojson";
var detroitAlameda = "https://opendata.arcgis.com/datasets/4b886654a8d846a782658bd4712e7952_0.geojson";
var detroitHospital = "https://opendata.arcgis.com/datasets/00c18efb31d94dc99ed61308e9c84562_0.geojson";
#var detroitNeighborhood = "https://opendata.arcgis.com/datasets/f08cca6141fc454394e25f96ea9facef_0.geojson";
var detroitNeighborhood = "https://opendata.arcgis.com/datasets/a9fdbb729c904eddaa9353471b07e81c_0.geojson";



var myLayers = [];

var layerList = document.getElementById("barSelect");
var inputs = layerList.getElementsByTagName("input");
// console.log(inputs.length);



var outlineLyr = L.geoJson(outline, {
  style: {
  "fillColor": "#000",
  "fillOpacity": 0,
  "color": "#000",
  "weight": 1,
  "dashArray": 4,
  "opacity": 1
    }
  });

outlineLyr.addTo(map);

function addPopUpSchool(feature, layer) {
  var popupContent = "<dl>School/Site Name: " + "<dd>" + feature.properties.sitename;
  layer.bindPopup(popupContent);
}

function addPopUpPark(feature, layer) {
  var popupContent = "<dl>Type: " + "<dd>" + feature.properties.new_class + " Park</dd>"
      + "<dl>Name: " + "<dd>" + feature.properties.name + "</dd>"
      + "<dl>Acres: " + "<dd>" + feature.properties.acres + "</dd>";
  layer.bindPopup(popupContent);
}

function addPopUpLib(feature, layer) {
  var popupContent = "<dl>Name: " + "<dd>" + feature.properties.name
      + "<dl>Address: " + "<dd>" + feature.properties.address + "</dd>";
  layer.bindPopup(popupContent);
}


function addPopUpRec(feature, layer) {
  var popupContent = "<dl>Type: " + "<dd>" + feature.properties.type
      + "<dl>Name: " + "<dd>" + feature.properties.name + "</dd>"
      + "<dl>Address: " + "<dd>" + feature.properties.address + "</dd>"
      + "<dl>Condition: " + "<dd>" + feature.properties.condition + "</dd>"
      + "<dl>Suggestion: " + "<dd>" + feature.properties.recommend + "</dd>";
  layer.bindPopup(popupContent);
}


var markerOption0 = {
        radius: 2,
        fillColor: "#0066cc",
        color: "#0066cc",
        weight: 1,
        fillOpacity: 1
};


var addSchools = () => {
  $.getJSON(detroitSchool,function(data) {
      myLayers[0] = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, markerOption0);
          },
    onEachFeature: addPopUpSchool
    });
  });
};


var addParks = () => {
  $.getJSON(detroitPark,function(data) {
      myLayers[1] = L.geoJson(data, {
        style: {
      "color": "#366821",
      "weight": 1,
      "opacity": 0.8
      },
      onEachFeature: addPopUpPark
    });
  });
};




var markerOption1 = {
      radius: 6,
      fillColor: "#7265a0",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

var markerOption2 = {
        radius: 4,
        fillColor: "#ed61dc",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
};

var markerOption3 = {
        radius: 7,
        fillColor: "#ea892e",
        color: "#000",
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.8
};





var addLib = () => {
  $.getJSON(detroitLibrary,function(data) {
    myLayers[2] = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markerOption1);
      },
      onEachFeature: addPopUpLib
    });
  });
};

var addRec = () => {
  $.getJSON(detroitRec,function(data) {
      myLayers[3] = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, markerOption2);
      },
      onEachFeature: addPopUpRec
    });
  });
};

var addBL = () => {
  $.getJSON(detroitAlameda,function(data) {
    myLayers[4] = L.geoJson(data, {
      style: {
        "color": "#dc6906",
        "weight": 3,
      }
    });
  });
};

var addHos = () => {
  $.getJSON(detroitHospital,function(data) {
    myLayers[5] = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markerOption3);
      }
    });
  });
};

var addAllLayers = () => {
  addSchools();
  addParks();
  addLib();
  addRec();
  addBL();
  addHos();
}

addAllLayers();
// console.log(myLayers);

for (var i = 0; i < inputs.length; i++) {
  inputs[i].checked = false;
}


$("#barSelect").click(() => {
  for (var i = 0; i < inputs.length; i++)
  if (inputs[i].checked == true) {
    myLayers[i].addTo(map);
  } else {
    map.removeLayer(myLayers[i]);
  }
});

$("#extra1").click(() => {
  for (var i = 0; i < inputs.length; i++)
  if (inputs[i].checked == true) {
    map.removeLayer(myLayers[i]);
    inputs[i].checked = false;
    }
  });



//Neighborhood Layer Interaction Effects

var nbhLayer;

function getColor(acr) {
    return acr > 1000 ? '#BD0026' :
           acr > 500  ? '#E31A1C' :
           acr > 200  ? '#FC4E2A' :
           acr > 100  ? '#FD8D3C' :
           acr > 50   ? '#FED976' :
                      '#FFEDA0';
          }

function initialStyle(feature) {
    return {
        fillColor: getColor(feature.properties.acres),
        weight: 3,
        opacity: 1,
        color: 'white',
        dashArray: '5',
        fillOpacity: 0.35
      };
    }

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
      this._div.innerHTML = '<h5>Neighborhood Snapshot</h5>' +  (props ?
        '<b>' + props.nhood_num + ' ' + props.nhood_name
        : 'Neighborhood Number & Name');
};

info.addTo(map);


function highlightFeature(e) {
    var hoveredLayer = e.target;

    hoveredLayer.setStyle({
        weight: 6,
        color: '#fff6',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        hoveredLayer.bringToFront();}

    info.update(hoveredLayer.feature.properties);

}

function resetHighlight(e) {
    nbhLayer.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function mouseEffects(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var addNeighborhood = () => {
  $.getJSON(detroitNeighborhood,function(data) {
      nbhLayer = L.geoJson(data, {
        style: initialStyle,
        onEachFeature: mouseEffects
      });
    });
  };

    // "color": "#fff",
    // "weight": 4,
    // "dashArray": 10,
    // "opacity": 0.8,
    // "fillOpacity": 0.25,
    // "fillColor": "#ddc1dc",

addNeighborhood();



var sliderInput = document.getElementById("sliderCheck");

$("#sliderSwitch").click(() => {
  if (sliderInput.checked == true) {
    nbhLayer.addTo(map);
    $("#sliderCheck2").prop('checked', false);
    map.removeLayer(outlineLyr);
  } else {
    outlineLyr.addTo(map);
    $("#sliderCheck2").prop('checked', true);
    map.removeLayer(nbhLayer);
  }
});

var sliderInput2 = document.getElementById("sliderCheck2");

$("#sliderSwitch2").click(() => {
  if (sliderInput2.checked == false) {
    map.removeLayer(outlineLyr);
  } else {
    outlineLyr.addTo(map);
  }
});







//Turf draw

var distanceInfo = document.getElementById('info2');
distanceInfo.innerHTML = '<p>Draw two circlemarkers on the map to measure their distance</p>';

var distance;

var disDataCount = 0;

var disData1 = {
  "type": "FeatureCollection",
  "features": []
};


var lineString = {
    "type": "Feature",
    "geometry": {
    "type": "LineString",
    "coordinates": []
    }
};


// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    circlemarker: {
      'radius': 5,
      'color': '#000',
      'fillOpacity': 0
    },
    marker: false,
    rectangle: false,
  }
});

map.addControl(drawControl);

var drawRemoveAll = function() {
      map.removeLayer(marker1);
      map.removeLayer(marker2);
      map.removeLayer(measureLine);
};


var exitDis = function() {
  if (disDataCount == 1) {
    map.removeLayer(marker1);
  }
  else if (disDataCount == 2) {
      drawRemoveAll();
      distanceInfo.innerHTML = '<p>Draw two circlemarkers on the map to measure their distance</p>';
  }
  disDataCount = 0;
  disData1 = {
    "type": "FeatureCollection",
    "features": []
  };
  $('#info-btn').hide();
}



$('#info-btn').hide();
$('#info-btn').click(exitDis);




map.on(L.Draw.Event.CREATED, function (e) {
  // $('#button-reset').show();
  var newData = e.layer.toGeoJSON();
  // var lat = newData.geometry.coordinates[1];
  // var lng = newData.geometry.coordinates[0];

  var point = {
      "type": "Feature",
      "geometry": {
      "type": "Point",
      "coordinates": [
          newData.geometry.coordinates[0],
          newData.geometry.coordinates[1]
      ]
    },
  }

  if (disDataCount == 0) {
        marker1 = L.geoJSON(newData, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, markerOption0);}
        }).addTo(map);
        $('#info-btn').show();
        disData1.features.push(point);
        disDataCount = disDataCount + 1;

  } else if (disDataCount == 1) {
        marker2 = L.geoJSON(newData, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, markerOption0);}
        }).addTo(map);
        disData1.features.push(point);
        disDataCount = disDataCount + 1;
        lineString.geometry.coordinates = disData1.features.map(function(marker) {
          return marker.geometry.coordinates;
          });
        measureLine = L.geoJSON(lineString, {
          style: {
            "color": "#000",
            "weight": 2,
            }
          }).addTo(map);
        distance = turf.lineDistance(lineString).toLocaleString();
        var distance_feet = distance * 3280.84;
        distance_feet = distance_feet.toFixed(2);
        var distance_miles = distance * 0.6214;
        distance_miles = distance_miles.toFixed(2);
        // console.log(distance);
        if (distance_miles > 1) {
          distanceInfo.innerHTML = '<p>Distance between two points: ' + distance_miles + ' miles</p>';
        } else {
          distanceInfo.innerHTML = '<p>Distance between two points: ' + distance_feet + ' feet</p>';
        }
      } else {
          disDataCount = 1;
          drawRemoveAll();
          disData1 = {
            "type": "FeatureCollection",
            "features": []
          };
          distanceInfo.innerHTML = '<p>Draw two circlemarkers on the map to measure their distance</p>';
          marker1 = L.geoJSON(newData, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, markerOption0);}
          }).addTo(map);
          disData1.features.push(point);
    }
  });




  // var parseData = function(dataLink) {
  //   $.ajax(dataLink).done(function(res) {
  //       myData = JSON.parse(res);
  //     });
  //   };


// var plotData = function() {
//     _.each(myData, function(dataObj) {
//       if (dataObj.KW >= numericField1 && dataObj.KW <= numericField2) {
//         L.marker([dataObj.LAT,dataObj.LONG_]).addTo(map)
//         .bindPopup(dataObj.NAME);
//       }
//     });
// };
