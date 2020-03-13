'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoicmtsZXBwZXIiLCJhIjoiY2s3Z2ZsYmdhMGQ2ZTNmb2RjbDBuanB4diJ9.sSYh3Y87xtJWWc4xSzyBZA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-75.16370205770407, 39.95336946383193],
    zoom: 13
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let data = [
    {
        location: [-75.18203791905461,39.9559240414018],
        content: 'Stop 1: Meet at station at 10:30am'
    },
    {
        location: [-75.1590135561212,39.95329882536828],
        content: 'Stop 2: Buy snacks at Reading Terminal Market'
    },
    {
        location: [-75.17284302607497,39.960659252852025],
        content: 'Stop 3: Art at the Barnes Foundation'
    },
    {
        location: [-75.14518336302324,39.946303074798635],
        content: 'Stop 4: Wait in line for dinner at Zahav'
    },
    {
        location: [-75.18494700612314,39.95614582349273],
        content: 'Stop 5: Get bus back to New York'
    },
    ]

    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()
    marker.setLngLat(d.location)
    marker.addTo(map)

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})
