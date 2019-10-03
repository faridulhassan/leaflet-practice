var map,
  lat = -35.280937,
  lng = 149.130005,
  center = [lat, lng],
  tileLayer,
  mapProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  mapEl = 'map',
  mapContainer = document.querySelector('.map-container'),
  mapOptions = {
    zoom: 15,
    maxZoom: 19,
    preferCanvas: true,
    // worldCopyJump: true,
    zoomDelta: 0.5,
    attributionControl: false,
    subscriptionKey: 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA',
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  },
  marker,
  circle,
  popup,
  featureGroup;

map = L.map(mapEl, mapOptions).setView(center);
tileLayer = L.tileLayer(mapProvider, mapOptions);
tileLayer.addTo(map);
featureGroup = L.featureGroup().addTo(map);
marker = L.marker(center, {
  name: 'farid',
  from: 'dhaka'
}).addTo(featureGroup);
//marker.bindPopup('<h3>I\'m a popup</h3>');
popup = L.popup();
marker.on('click', function (e) {
  debugger;
  popup.setLatLng(e.latlng).setContent('Latlong : ' + e.latlng.lat + ',' + e.latlng.lng).openOn(map);
});
map.on('click', function (e) {
  //L.marker([e.latlng.lat, e.latlng.lng]).addTo(featureGroup);
  //map.fitBounds(featureGroup.getBounds());
});
circle = L.circle(center, 1000).addTo(map);
/*
circle = L.circle(center, {
  color: 'blue',
  fillOpacity: 0.2,
  radius: 500
}).addTo(map);
*/