mapboxgl.accessToken = 'pk.eyJ1IjoieWFneWFtaXRyYSIsImEiOiJja3FtM3NhMmoxMXA5MnFueDdpOHc1emdoIn0.HM2JLf8cEvQn1tSk29Bsnw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campground.geometry.coordinates,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

 new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
        )
    .addTo(map)


