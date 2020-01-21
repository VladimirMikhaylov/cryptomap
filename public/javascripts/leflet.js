var mymap = L.map('mapid').setView([50.1188 , 8.6843], 4);

var coords = coord.split(',');
var marker
coords = coords.map( item => item.replace(' ', ','));
coords = coords.map( item => {
    let arr = item.split(',');
    arr = arr.map( item => parseFloat(item))
    marker = L.marker(arr).addTo(mymap);
    marker.bindPopup(`ip:`).openPopup();
})


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFzdGhlcm9pbiIsImEiOiJjazVsem9sa3cwZ3JxM2RydzNpZTViajZwIn0.iX3QFFLWX40Vo7FB-IjxrQ', {
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 8,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);