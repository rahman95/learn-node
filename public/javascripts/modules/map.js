import axios from 'axios';
import { $ } from './bling'

const mapOptions = {
  center: {
    lat: 43.2,
    lng: -79.8
  },
  zoom: 10
};

function loadPlaces(map, lat = 43.2, lng = -79.8) {
  axios.get(`/api/stores/near?lat=${lat}&lng=${lng}`)
    .then(res => {
      const places = res.data;
      if(! places.length) return;

      //Create bounds for markers
      const bounds = new google.maps.LatLngBounds();

      //Create InfoWindow
      const infoWindow = new google.maps.InfoWindow();

      //Add markers
      const markers = places.map((place) => {
        const [lng, lat] = place.location.coordinates;
        const position = { lat, lng };

        // Add places to bounds
        bounds.extend(position);
        const marker = new google.maps.Marker({ map, position });
        marker.place = place;

        return marker;
      });

      //create infowindow for marker
      markers.forEach(marker => marker.addListener('click', function() {
        const html = `
          <div class="popup">
            <a href="/stores/${this.place.slug}">
              <img src="/uploads/${this.place.photo || 'store.png'}" alt="${this.place.name}" />
              <p>${this.place.name} - ${this.place.location.address}</p>
            </a>
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, this);
      }));

      //zoom into bounds and center it
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    })
}

function makeMap(mapDiv) {
  if(!mapDiv) return;

  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);

  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng())
  })
}

export default makeMap;