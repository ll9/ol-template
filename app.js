/// <reference path="./node_modules/@types/openlayers/index.d.ts" />

const LonCenter = 10.9;
const LatCenter = 49.3;
var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([LonCenter, LatCenter]),
    zoom: 4
  })
});

let source = new ol.source.Vector();
let layer = new ol.layer.Vector({ source: source });
let mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: "EPSG:4326",
  undefinedHTML: "&nbsp;"
});

map.addLayer(layer);
map.addControl(mousePositionControl);

function generateMockFeatures(amount = 1) {
  for (let n = 0; n < amount; n++) {
    let feature = new ol.Feature(
      new ol.geom.Point(
        ol.proj.fromLonLat([
          (LonCenter - 10 / 2) + Math.random() * 10,
          (LatCenter - 10 / 2) + Math.random() * 10
        ]),
      )
    );
    feature.setProperties({
        "Ort": "Prien",
        "Montagedatum": "22.02.2019"
    })

    source.addFeature(feature);
  }
}

/**
 * 
 * @param {ol.Feature} feature 
 */
function styleFunction(feature) {
    let text = new ol.style.Text({
        text: feature.getProperties()["Ort"],
        stroke: new ol.style.Stroke({color: 'black', width: 4}),
        fill: new ol.style.Fill({color: 'white'}),
        font: '15px sans-serif'
    });
    let style = new ol.style.Style({
        text: text,
        image: new ol.style.Circle({
            radius: 15,
            stroke: new ol.style.Stroke({color: 'blue', width: 3}),
            fill: new ol.style.Fill({color: 'rgba(0, 0, 255, 0.3)'})
        })
    })

    return style;
}

layer.setStyle(styleFunction);

generateMockFeatures(100);
