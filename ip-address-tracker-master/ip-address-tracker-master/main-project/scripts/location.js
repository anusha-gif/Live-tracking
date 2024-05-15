//MAP TOKEN - pk.eyJ1IjoiZGFtaWFuLWRyZXduaWsiLCJhIjoiY2t1am9nZTJoMGx4ajJycnZkZXZodGcwaiJ9.i-w9v3peS9K18GW8JRtKyA

let lat = 51.50853;
let lng = -0.12574;

var mymap = L.map("mapid").setView([lat, lng], 13);
mymap.removeControl(mymap.zoomControl);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZGFtaWFuLWRyZXduaWsiLCJhIjoiY2t1am9nZTJoMGx4ajJycnZkZXZodGcwaiJ9.i-w9v3peS9K18GW8JRtKyA",
  }
).addTo(mymap);

var myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
});

var marker = L.marker([lat, lng], { icon: myIcon }).addTo(mymap);

//IP Geolocation API key: at_li3f8R0tOlJuEDDN3GYZUg3ivU03j

const form = document.querySelector(".search-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const res = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_li3f8R0tOlJuEDDN3GYZUg3ivU03j&domain=${searchTerm}&ipAddress=${searchTerm}`
  );

  let ip = res.data.ip;
  let location = res.data.location.city + " " + res.data.location.postalCode;
  let timezone = res.data.location.timezone;
  let isp = res.data.isp;

  document.querySelector(".ip").innerText = ip;
  document.querySelector(".location").innerText = location;
  document.querySelector(".timezone").innerText = "UTC" + timezone;
  document.querySelector(".isp").innerText = isp;

  lat = res.data.location.lat;
  lng = res.data.location.lng;
  var newLatLng = new L.LatLng(lat, lng);

  marker.setLatLng(newLatLng);
  mymap.setView(newLatLng);
});
