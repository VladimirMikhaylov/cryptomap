var mymap = L.map('mapid').setView([50.1188 , 8.6843], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFzdGhlcm9pbiIsImEiOiJjazVsem9sa3cwZ3JxM2RydzNpZTViajZwIn0.iX3QFFLWX40Vo7FB-IjxrQ', {
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 9,
    minZoom: 2,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
coord = coord.split(',');
var markers = L.markerClusterGroup();
coord.forEach(element => {
    let res = element.split(' ');
    var a = [res[0],res[1]];
    var marker = L.marker(new L.LatLng(a[0],a[1]));
    markers.addLayer(marker);

});
mymap.addLayer(markers);

