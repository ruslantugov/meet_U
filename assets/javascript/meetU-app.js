$(document).ready(function() {
    const sectTwo = $("#nuSect-friendsPN");
    sectTwo.hide();
    $("#showPostClick").hide();
    $("#info-chgConf").hide();
    $("#mapPAGE").hide();
    //$("#finalSubmit").hide();
    //show this later after submitting all friends
    ///////////
    // global 
    const meetU = {
        name: [],
        zipCode: [],
    };
    const entName = $("#nameIn");
    const entZip = $("#zipLocIn");
    
    entName.on('click', function() {
       
        entName.val('')
    })
    entZip.on('click', function() {
        
       entZip.val('')
    })

    //enter data to arrays
    $("#userSUBMIT").on('click', function() {
           
        userName = entName.val();
            meetU.name.push(userName);
            
        userZip = entZip.val();
            meetU.zipCode.push(userZip);
            console.log(meetU);
             
        $("#input-section").hide(); 

        // show the SECOND flipBox \\
        $(document.body).append(sectTwo.show());
        console.log(sectTwo + "this works just not filled yet"); 
        $("#mapFigure").append('<img src="assets/images/compass.png"/>') 
        
        
        
    })
    
    /* @this point << the user name 
    and zipCode pushed to {meetU}
    */
    //~START~ >> semantics for sectTwo [object Object]
    const newNameIN = $("#add-nuName");
    const newZipIN = $("#add-nuZipCode");
    const pushClrIN = $("#nuSubmit");

    //renderMap():: commented out because this will go somehwere else !! may come back here;
/*
    //create a function for the map to show in the $("#mapLocation")
    //later << reCall(this.fucntion) ^^^^^^^^^^ //
    function renderMap() {
        //def variable for the map placeHolder
        const map = $("#mapFigure");
        // def queryURL;
        // * && def API key;

        // $.ajax({queryURL+API, GET})
        // \cont'd\.then(function(callBacks))  \\START//

        //                                     \\BREAK//

    }
*/

    //nuSubmit btn on click function
    pushClrIN.on('click', function() {
        
        namePP = newNameIN.val();
            meetU.name.push(namePP);
        
        zipPP = newZipIN.val();
            meetU.zipCode.push(zipPP);

        //console.log(this)
        console.log(meetU);
        console.log(meetU.name);
        console.log(meetU.zipCode);
        // determined from console that the app now properly adds to object//
        //now clear the input(text) values
        newNameIN.val('');
        newZipIN.val('');
        console.log(meetU);  // ALL GOOD UP TO HERE!!!
        ////////\\\/\/\/\/\/\/\/\/\ FAIL/SAFE POINT!!!!!
        //call function {{above pushClrIN.onClick}}
    //-cmBk.fn    renderMap();
        

        $("#header-sectionListNames").empty();
        //have loop of meetU.name.length appendTo 
        for (var n = 0; n < meetU.name.length; n++) {
            $("#header-sectionListNames").append('<button class="pplChange" data-index='+n+'>'+meetU.name[n]+'</button>'+'<br>');
            
            $("#info-chgConf").show();
            //$("#finalSubmit").show();
        }//this loop keep repeating the whole array like last time, maybe the loop should go sooner!???
        //ASK FOR HELP!!!!
        //ALMOST GOT IT CRACKED!!!!!
        
        
    })
    
    
   
    function render(){
        $("#header-sectionListNames").empty()
        for (var n = 0; n < meetU.name.length; n++) {
            $("#header-sectionListNames").append('<button class="pplChange" data-index='+n+'>'+meetU.name[n]+'</button>'+'<br>');
            $("#info-chgConf").show();
            
        }
    }
    // ~| MAJOR KEY << MAP FUNCTIONALITY |~
    $("#finalSubmit").on('click', function () {
        window.open("./yapi_client2.html?zip=" + meetU.zipCode[0]);
        //searchMeets(meetU.zipCode[0]);


        console.log("FINALIZE(grn)Btn works!");
        console.log(meetU);
        console.log(meetU.zipCode);
        //disable all other buttons 
        //have the flipBox << STOP flipping
        //change rus' mapRender code << store map into $("#mapLocation");
        // \\START MAP HERE//
            //clear out divs-presently
            $("#datepicker").hide();
            $("#nameButtons").hide();
            $("#nuSect-friendsPN").hide();

        const mapINbox = $("#mapPAGE");
        // \\mapINbox// sematics from ruslov::app.js |||
        //START:: take from here on in to put into meetU-app.js({mapRener();})
function placeMarker(location, turtle) {
    var marker = new google.maps.Marker({
        position: location,
        map: turtle
    });
}
//____________________________________________________________________
function codeAddress(zipCode) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': zipCode }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //Got result, center the map and put it out there
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 10, center: { lat: 40.706005, lng: -74.008827 } });

            locations.push({
                position: results[0].geometry.location,
            })
            
            //for loop for creating new markers on a map
            for (let i = 0; i < locations.length; i++) {
                var marker = new google.maps.Marker({

                    position: locations[i].position,
                    map: map
                    
                });
            }
            

            map.addListener( 'click', function (event) {
                //structure that google gives back -> R
                var selectedLong = event.latLng.lng();
                var selectedLat = event.latLng.lat();
                
                //SEND TO BACKEND
                //toBackend(selectedLat,selectedLong);

                /*    
                var queryURL = "https://radiant-temple-43796.herokuapp.com/yapi/bylatlong/" + selectedLat + "/" + selectedLong;
                console.log(queryURL);
                console.log(event.latLng);
                */
                placeMarker(event.latLng, map);
                // \\|//
                //14:59--MIKE: searchMeets(selectedLat,selectedLong);
                //searchMeets(selectedLat, selectedLong);
                // //|\\

                /*
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    console.log(response[0].name);
                })
                */

            });

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
// _________________________________________
// create new map when the page load
function initAutocomplete() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.706005, lng: -74.008827 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('person-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

   

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

        // show the map page
        mapINbox.show();
        //15:29__Jim: instead.clear(doc).then(show(map<<section) && show(navbar(results)<<section));

        // //MAP FUCNTION HERE\\
    })
    
    $(document).on('click',".pplChange", function() {
            
            var selectedBtn = $(this);
            var selectedIndex = selectedBtn.data("index");

            console.log(meetU.name[selectedIndex]);

            // removes button && removes data from array
            meetU.name.splice(selectedIndex,1);
            meetU.zipCode.splice(selectedIndex,1);
            console.log(meetU);
            //call render function!!
            render();
            // check object activity
            console.log(meetU);
            
            //////////////////
            //insert map callBackFucntion
            //AJAX

            
        })
        $( function() {
            $( "#datepicker" ).datepicker({
              inline: true,
                firstDay: 1,
                showOtherMonths: true,
                dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            });
          } );
})

