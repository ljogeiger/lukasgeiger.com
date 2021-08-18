// Template taken from https://github.com/amberweinberg/Wanderer-Map and adjusted

function initMap() {

    var yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'; // Home
    var red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Visited
    var green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // Planned
    var pink = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'; //Natalie

    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: .4,
        scale: 2
    };

    var singapore = { lat: 1.2494, lng: 103.8303 }
    var cincinnati = { lat: 39.1031, lng: -84.5120 };
    var newyork = { lat: 40.7128, lng: -74.0060 };
    var kobe = { lat: 34.6869, lng: 135.2665 }
    var geneva = { lat: 46.2044, lng: 6.1432 }

    var stops;

    var bounds = new google.maps.LatLngBounds();

    // Create a map object and specify the DOM element for display.

    var map = new google.maps.Map(document.getElementById('wanderer-map'), {
        scrollwheel: false,
        zoom: 3,
        styles: [{
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#f5f5f2"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.place_of_worship",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.school",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [{
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "stylers": [{
                    "color": "#71c8d4"
                }]
            },
            {
                "featureType": "landscape",
                "stylers": [{
                    "color": "#e5e8e7"
                }]
            },
            {
                "featureType": "poi.park",
                "stylers": [{
                    "color": "#8ba129"
                }]
            },
            {
                "featureType": "road",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#c7c7c7"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [{
                    "color": "#a0d3d3"
                }]
            },
            {
                "featureType": "poi.park",
                "stylers": [{
                    "color": "#91b65d"
                }]
            },
            {
                "featureType": "poi.park",
                "stylers": [{
                    "gamma": 1.51
                }]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "landscape",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }
        ]
    });

    // Display multiple markers on a map

    var infoWindow = new google.maps.InfoWindow(),
        marker, i;

    function addMarker(locations, startingPoint, stops) {

        var flightPlanCoordinates = [];

        for (i = 0; i < locations.length; i++) {
            var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: locations[i][3]
            });

            // Allow each marker to have an info window

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(locations[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen

            map.fitBounds(bounds);

            // Add coordinates to lines

            if (stops == "single") {
                flightPlanCoordinates[i] = [{ lat: locations[i][1], lng: locations[i][2] }];
            } else if (stops == "multi") {
                flightPlanCoordinates[i] = { lat: locations[i][1], lng: locations[i][2] };
            }
        }

        if (stops == "single") {
            for (i = 0; i < flightPlanCoordinates.length; i++) {
                var line = new google.maps.Polyline({
                    path: [startingPoint, flightPlanCoordinates[i][0]],
                    strokeOpacity: 0,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '10px'
                    }],
                    map: map
                });
            }

        } else if (stops == "multi") {

            flightPlanCoordinates.unshift(startingPoint);

            var line = new google.maps.Polyline({
                path: flightPlanCoordinates,
                strokeOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '10px'
                }],
                map: map
            });
        }
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });

    // Custom Legend

    var legend = document.createElement('div');
    legend.id = 'map-legend';
    var content = [];
    content.push('<h3>Legend</h3>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" alt="Yellow pins are home Bases"/>Home Base(s)</p>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Red pins are visited places"/>Visited</p>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Green pins are countries that I\'ve lived in."/>Countries Lived</p>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    // Location Sets

    addMarker([
        ['<strong>Fankfurt, Germany</strong> (Birthplace 1999)', 50.1109, 8.6821, green]
    ]);

    addMarker([
        ['<strong>Geneva, Switzerland</strong> (1st Move 2000)', 46.2044, 6.1432, green],
        ['<strong>Casablanca, Morocco</strong>', 33.5731, -7.5898, red],
        ['<strong>Paris, France</strong>', 48.8566, 2.3522, red],
        ['<strong>Salzburg, Austria</strong>', 47.8095, 13.0550, red],
        ['<strong>Munich, Germany</strong>', 48.1351, 11.5820, red],
        ['<strong>Zurich, Switzerland</strong>', 47.3769, 8.5417, red],
        ['<strong>Nice, France</strong>', 43.7102, 7.2620, red],
        ['<strong>Seville, Spain</strong>', 37.3891, -5.9845, red],
    ], geneva, 'single');

    addMarker([
        ['<strong>Kobe, Japan</strong> (2nd Move 2005)', 34.6869, 135.2665, green],
        ['<strong>Tokyo, Japan</strong>', 35.6804, 139.7690, red],
        ['<strong>Hokaido, Japan</strong>', 43.2203, 142.8635, red],
        ['<strong>Nara Prefecure, Japan</strong>', 34.2976, 135.8280, red],
        ['<strong>Kyoto, Japan</strong>', 35.0116, 135.7681, red],
        ['<strong>Manila, Philipeans</strong>', 14.5995, 120.9842, red],
        ['<strong>Hong Kong, China</strong>', 22.3193, 114.1694, red],
        ['<strong>Beijing, China</strong>', 39.9042, 116.4074, red],
        ['<strong>Chon Buri, Thailand</strong>', 13.3611, 100.9847, red],
        ['<strong>Krong Preah, Cambodia</strong>', 10.6253, 103.5234, red],
        ['<strong>Chang Mai, Thailand</strong>', 18.7953, 98.9620, red],
        ['<strong>Hanoi, Vietnam</strong>', 21.0278, 105.8342, red],
        ['<strong>Okinawa, Japan</strong>', 26.3344, 127.8056, red]
    ], kobe, 'single');

    addMarker([
        ['<strong>Singapore, Singapore</strong> (3rd Move 2010)', 1.2494, 103.8303, green],
        ['<strong>Kuala Lumpur, Malaysia</strong>', 26.3344, 127.8056, red],
        ['<strong>Trang, Thailand</strong>', 7.5645, 99.6239, red],
        ['<strong>Caluya, Philipeans</strong>', 12.0684, 121.3909, red],
        ['<strong>Sydney, Australia</strong>', -33.8688, 151.2093, red],
        ['<strong>Brisbane, Australia</strong>', -27.4698, 153.0251, red],
        ['<strong>Bali, Indonesia</strong>', -8.3405, 115.0920, red],
        ['<strong>Kerala, India</strong>', 10.8505, 76.2711, red],
        ['<strong>Ho Chi Minh City, Vietnam</strong>', 10.8231, 106.6297, red],
        ['<strong>Washington DC., USA</strong>', 38.9072, -77.0369, red],
        ['<strong>Bintan, Indonesia</strong>', 1.1701, 104.3784, red],
        ['<strong>Kuala Lumpur, Malaysia</strong>', 3.1390, 101.6869, red]
    ], singapore, 'single');

    addMarker([
        ['<strong>Cincinnati, Ohio</strong> (4th Move 2012)', 39.1031, -84.5120, green],
        ['<strong>Miami, Florida</strong>', 25.7617, -80.1918, red],
        ['<strong>Louisville, Kentucky (Hi Natalie :) )</strong>', 38.2527, -85.7585, pink],
        ['<strong>Indianapolis, Indiana</strong>', 39.7684, -86.1581, red],
        ['<strong>Cleveland, Ohio</strong>', 41.4993, -81.6944, red],
        ['<strong>Chicago, Illinois</strong>', 41.8781, -87.6298, red],
        ['<strong>St. Louis, Missouri</strong>', 38.6270, -90.1994, red],
        ['<strong>Pittsburgh, Pennsylvania</strong>', 40.4406, -79.9959, red],
        ['<strong>Philadelphia, Pennsylvania</strong>', 39.9526, -75.1652, red],
        ['<strong>Providence, Rhode Island</strong>', 41.8240, -71.4128, red],
        ['<strong>Boston, Massachusetts</strong>', 42.3601, -71.0589, red],
        ['<strong>Saratoga Springs, New York</strong>', 43.0324, -73.9360, red],
        ['<strong>Charlotte, North Carolina</strong>', 35.2271, -80.8431, red],
        ['<strong>Chattanooga, Tennessee</strong>', 35.0456, -85.3097, red],
        ['<strong>Cancun, Mexico</strong>', 21.1619, -86.8515, red],
        ['<strong>Punta Cana, Dominican Republic</strong>', 18.5601, -68.3725, red],
        ['<strong>Road Town, BVIs</strong>', 18.4286, -64.6185, red],
        ['<strong>US Virgin Islands</strong>', 18.3358, -64.8963, red],
        ['<strong>Nassau, Bahamas</strong>', 25.0443, -77.3504, red],
        ['<strong>Lima, Peru</strong>', -12.0464, -77.0428, red],
        ['<strong>San Francisco, California</strong>', 37.7749, -122.4194, red],
        ['<strong>Sacramento, California</strong>', 38.5816, -121.4944, red],
        ['<strong>Las Vegas, California</strong>', 36.1699, -115.1398, red],
        ['<strong>St. George, Utah</strong>', 37.0965, -113.5684, red],
        ['<strong>London, England</strong>', 51.5074, 0.1278, red],
        ['<strong>Malaga, Spain</strong>', 36.7213, -4.4213, red],
        ['<strong>Havana, Cuba</strong>', 23.1136, -82.3666, red],
        ['<strong>Atlanta, Georgia</strong>', 33.7490, -84.3880, red]
    ], cincinnati, 'single');

    addMarker([
        ['<strong>New York City, New York</strong> (5th Move 2017)', 40.7128, -74.0060, green],
        ['<strong>Moscow, Russia</strong> (Family Base)', 55.7558, 37.6173, yellow],
        ['<strong>Lake Lure, North Carolina</strong>', 35.4279, -82.2048, red],
        ['<strong>Oakland, California</strong>', 37.8044, -122.2712, red],
        ['<strong>Chula Vista, California</strong>', 32.6401, -117.0842, red],
        ['<strong>Los Angeles, California</strong>', 34.0522, -118.2437, red],
        ['<strong>Brussels, Belgium</strong>', 50.8503, 4.3517, red],
        ['<strong>Amsterdam, Netherlands</strong>', 52.3680, 4.9036, red],
        ['<strong>Berlin, Germany</strong>', 52.5200, 13.4050, red],
        ['<strong>Managua, Nicaragua</strong>', 12.1150, -86.2362, red],
        ['<strong>Copenhagen, Denmark</strong>', 55.6761, 12.5683, red],
        ['<strong>Budapest, Hungary</strong>', 47.4979, 19.0402, red],
        ['<strong>Split, Croatia</strong>', 43.5081, 16.4402, red],
        ['<strong>Dubai, United Arab Emirates</strong>', 25.2048, 55.2708, red],
        ['<strong>Athens, Greece</strong>', 37.9838, 23.7275, red],
        ['<strong>Trieste, Italy</strong>', 45.6495, 13.7768, red],
        ['<strong>Venice, Italy</strong>', 45.4408, 12.3155, red],
        ['<strong>Florence, Italy</strong>', 43.7696, 11.2558, red],
        ['<strong>Rome, Italy</strong>', 41.9028, 12.4964, red],
        ['<strong>Bodrum, Turkey</strong>', 37.0344, 27.4305, red],
        ['<strong>Cyprus, Greece</strong>', 35.1264, 33.4299, red],
        ['<strong>Chios, Greece</strong>', 38.3682, 26.1310, red],
        ['<strong>Rhodos, Greece</strong>', 36.4341, 28.2176, red],
        ['<strong>Santorini, Greece</strong>', 36.3932, 25.4615, red],
        ['<strong>Rome, Italy</strong>', 51.5074, 0.1278, red],
    ], newyork, 'single');

    addMarker([
        ['<strong>Vienna, Austria</strong> (Extended Family Base)', 48.2082, 16.3738, yellow]
    ]);



    // addMarker([
    //     ['<strong>Bath, England</strong> (2012)', 51.3801748,-2.3995494, red],
    //     ['<strong>Paris, France</strong> (2012)', 48.8589507,2.2770199, red],
    //     ['<strong>Swansea, Wales</strong> (2012)', 51.6255408,-3.9655064, red],
    //     ['<strong>Brighten, England</strong> (2012)', 50.8375054,-0.1762296, red],
    //     ['<strong>Cardiff, Wales</strong> (2014)', 51.5023268,-3.2694495, red],
    //     ['<strong>Nottingham, England</strong> (2014)', 52.9541053,-1.2401016, red],
    //     ['<strong>Leigh-on-Sea, England</strong> (2012)', 51.548048,0.6300103, red],
    //     ['<strong>Eastbourne, England</strong> (2012)', 50.7825347,0.2525859, red]
    // ],london,'single');

    // addMarker([
    //     ['<strong>Barcelona, Spain</strong> (2016)', 41.3948976,2.0787277, red],
    //     ['<strong>Palma de Mallorca, Spain</strong> (2016)', 39.570064,2.6107149, red],
    //     ['<strong>Marseille, France</strong> (2016)', 43.280555,5.2650544, red],
    //     ['<strong>Pisa, Italy</strong> (2016)', 43.7068534,10.3253381, red],
    //     ['<strong>Civitavecchia, Italy</strong> (2016)', 42.0888596,11.7656521, red],
    //     ['<strong>Pompeii, Italy</strong> (2016)', 40.7466793,14.4586626, red],
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Edinburgh, Scotland</strong> (2015)', 55.9411418,-3.2754232, red],
    //     ['<strong>Glasgow, Scotland</strong> (2015)', 55.8555734,-4.3725413, red],
    //     ['<strong>Dublin, Ireland</strong> (2015)', 53.3244431,-6.3857872, red],
    //     ['<strong>Durham, England</strong> (2015)', 54.7817994,-1.5872561, red],
    //     ['<strong>York, England</strong> (2015)', 53.9586419,-1.115611, red],
    //     ['<strong>London, England</strong> (Second Home) (2012, 2013, 2015)', 51.5287718,-0.2416821, yellow],
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Tulum, Mexico</strong>', 20.2096594,-87.4893856, red],
    //     ['<strong>Grand Caymen</strong>', 19.3301467,-81.3925165, red],
    //     ['<strong>Jamaica</strong>', 18.1160128,-77.8364914, red],
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Nassau, Bahamas</strong> (2011)', 25.0326645,-77.4763358, red],
    //     ['<strong>St. Thomas</strong> (2011)', 18.3430473,-65.0069724, red],
    //     ['<strong>St. Maarten</strong> (2011)', 18.0347444,-63.1031311, red],
    // ],nashville, 'multi');

    // addMarker([
    //  ['<strong>Edinburgh, Scotland</strong> (2017)', 55.9411418,-3.275423, red],
    //  ['<strong>Stirling, Scotland</strong> (2017)', 56.118728,-3.9572079, red],
    //     ['<strong>Inverness, Scotland</strong> (2017)', 57.4680375,-4.256877, red],
    //     ['<strong>Isle of Skye, Scotland</strong> (2017)', 57.3630291,-6.4981954, red]
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Costa Maya, Mexico</strong> (2018)', 18.7332202,-87.6970724, red],
    //     ['<strong>Havana, Cuba</strong> (2018)', 23.0508292,-82.4030415, red],
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Key West, Florida</strong> (2018)', 24.5646583,-81.7893828, green],
    //     ['<strong>Cozumel, Mexico</strong> (2018)', 20.4322304,-86.9442929, green],
    // ],nashville, 'multi');

    // addMarker([
    //     ['<strong>Juneau, Alaska</strong> (2019)', 58.3845202,-134.7581444, green],
    //     ['<strong>Skagway, Alaska</strong> (2019)', 59.5701727,-135.6380691, green],
    //     ['<strong>Victoria, British Columbia</strong> (2019)', 48.4262626,-123.376732, green],
    // ],nashville, 'multi');
}
