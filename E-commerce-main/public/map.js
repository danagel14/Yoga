// map.js
async function loadMapScript() {
    try {
        // בקשה לקבלת מפתח ה-API מהשרת
        const response = await fetch('/api/google-maps-api-key');
        const data = await response.json();
        const apiKey = data.apiKey;

        // יצירת תגית <script> לטעינת Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);
    } catch (error) {
        console.error('נכשל בהטענת סקריפט Google Maps:', error);
    }
}

function initMap() {
    var centerLocation = { lat: 32.0853, lng: 34.7818 }; // מיקום מרכזי לתל אביב
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: centerLocation
    });

    var branches = [
        { name: 'סניף מודיעין', position: { lat: 31.8974, lng: 35.0268 }, address: 'רחוב יוסף לוי 10, מודיעין' },
        { name: 'סניף רמת גן', position: { lat: 32.0821, lng: 34.7896 }, address: 'רחוב מנחם בגין 1, רמת גן' },
        { name: 'סניף אילת', position: { lat: 29.5581, lng: 34.9482 }, address: 'רחוב הים האדום 7, אילת' },
        { name: 'סניף ראשון לציון', position: { lat: 31.9712, lng: 34.7972 }, address: 'רחוב יצחק רבין 14, ראשון לציון' },
        { name: 'סניף באר שבע', position: { lat: 31.2518, lng: 34.7913 }, address: 'רחוב בן גוריון 32, באר שבע' },
        { name: 'סניף חיפה', position: { lat: 32.8140, lng: 34.9896 }, address: 'רחוב יפה נוף 45, חיפה' },
        { name: 'סניף ירושלים', position: { lat: 31.7683, lng: 35.2137 }, address: 'רחוב יפו 26, ירושלים' }
    ];

    branches.forEach(function(branch) {
        var marker = new google.maps.Marker({
            position: branch.position,
            map: map,
            title: branch.name
        });

        var infoWindow = new google.maps.InfoWindow({
            content: '<div><strong>' + branch.name + '</strong><br>' + branch.address + '</div>'
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });
}

// קריאה לפונקציה loadMapScript כאשר הדף נטען
window.onload = loadMapScript;
