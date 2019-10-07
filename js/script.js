var map,
  lat = -35.280937,
  lng = 149.130005,
  center = [lat, lng],
  tileLayer,
  mapProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  mapEl = 'map',
  mapOptions = {
    zoom: 15,
    maxZoom: 19,
    preferCanvas: true,
    // worldCopyJump: true,
    attributionControl: false,
  },
  marker,
  circle,
  popup,
  featureGroup,
  markedData = [];

map = L.map(mapEl, mapOptions).setView(center);
tileLayer = L.tileLayer(mapProvider, mapOptions);
tileLayer.addTo(map);
featureGroup = L.featureGroup().addTo(map);
popup = L.popup();
/*loop all data from data.js*/
data.map(function (item) {
  var _center = [item.Lat, item.Lng];
  var _marker = L.marker(_center, item).addTo(featureGroup);
  markedData.push(_marker);
});
var popupTemplate = `
<div class="leaflet_popup">
  <h5 class="popup-title" style="margin: 0;">{title}</h5>
  <div class="popup-thumb-holder">
  <img class="popup-img" src="{img}" alt="" style="max-width: 100%;">
  </div>
  <div class="popup-content">
    <p style="margin:5px 0 8px 0">{addressLine},&nbsp;<br>{town}<br>{postcode}<br>Club Type: {clubType}<br>Email: {email}<br>Phone: {phone}</p>
  </div>
</div>
`;
markedData.map(function (_marker) {
  _marker.on('click', function (e) {
    var optionsData = e.target.options,
      popupContent = popupTemplate
        .replace('{title}', optionsData.ClubName)
        .replace('{img}', 'https://paddleaustralia.azolve.com/store/Repository/2/287964/' + optionsData.ClubPhoto)
        .replace('{addressLine}', optionsData.ClubaddressLine1)
        .replace('{town}', optionsData.Clubtown)
        .replace('{postcode}', optionsData.Clubpostcode)
        .replace('{clubType}', optionsData.ClubType)
        .replace('{email}', optionsData.ClubemailAddress)
        .replace('{phone}', optionsData.ClubPhoneNumber);
    popup.setLatLng(e.latlng).setContent(popupContent).openOn(map);
  });
});
//Fit bounds
map.fitBounds(featureGroup.getBounds());
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