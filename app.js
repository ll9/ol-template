/// <reference path="./node_modules/@types/openlayers/index.d.ts" />

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});

let source = new ol.source.Vector();
let layer = new ol.layer.Vector({
    source: source
});

map.addLayer(layer);

let draw = new ol.interaction.Draw({
    type: 'Polygon',
    source: source
})

map.addInteraction(draw);

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 8) {
        draw.removeLastPoint();
    }
    if (e.keyCode == 27) {
        draw.setActive(false);
    }
    if (e.keyCode == 220) {
        draw.setActive(true);
    }
    console.log(e.keyCode)
});