//seeShyt////////////////////////////////////

 ////////////////////////////////////////////
//variable bank/////////////////////////////

var searchCollapse = false //variable to determine which way to slide search
var footerCollapse = false //variable to determine status of footer menu

var inputArtist //taking input value from search
var bitQuery //url query for bands in town API
var bitResponse //var storing bands in town API response

var artistName //name of artist being searched

var latLongArray = [] //Array holding pertinent information from BIT API call

var map //New google map for googlemaps API call
var marker //marker variable for googlemaps results

var coords //testing add marker function

 ///////////////////////////////////////////
//function bank////////////////////////////

//search sliding mechanics//

function searchSlide ()
{
	if (searchCollapse === false)
	{
		searchCollapse = true;
		$(".searchSplash").animate({left: '-72%'}, 200);
		$(".titleSplash").fadeTo("fast", 0);
		$(".asideWrap").fadeTo("fast", 0);
		$("#collapseSearch").html("<i class='fas fa-angle-double-left'></i>");
		$("#contentDisplay").animate({top: '5%'}, 1000);
	} 
	else
	{
		searchCollapse = false
		$(".searchSplash").animate({left: '0%'}, 200);
		$("#collapseSearch").html("<i class='fas fa-angle-double-right'></i>");
	}
};

//footer menu mechanics//
function footerSlide ()
{
	if (footerCollapse === false)
	{
		$("#footerMenu").html("<h6>© 2018 &nbsp - &nbsp <i class='fas fa-angle-double-up'></i></h6>");
		$("#creditMenu").show();
		footerCollapse = true;
	}
	else
	{
		$("#footerMenu").html("<h6>© 2018 &nbsp - &nbsp <i class='fas fa-angle-double-down'></i></h6>");
		$("#creditMenu").hide()
		footerCollapse = false;
	}
}

//API stuff///////////////////

//Bands in Town API call//
function bitAPI (artist)
{
	latLongArray = [];
	bitQuery = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=seeShyt";
	$.ajax({
		url: bitQuery,
		method: "GET"
	}).then(function(response) 
	{
		if (response.length < 1)
		{
			$("#contentHeadline").empty();
			$("#contentHeadline").append("<h1>No upcoming shows dude");
		}
		else
		{
		bitResponse = response;
		artistName = $("<h1>").text(bitResponse["0"].lineup["0"]);
		$("#contentHeadline").empty();
		$("#contentHeadline").append("<h1>" + bitResponse["0"].lineup["0"] + "</h1><h2>" + bitResponse.length + " upcoming shows.");
		latLongPull()
		console.log(latLongArray)
		}
	}).then(markerSet);
}

//Pulling pertinent information out of BIT API call//
function latLongPull ()
{
	for (i = 0; i < bitResponse.length; i++) 
	{
		latLongArray.push({
			"name": bitResponse[i].venue.name,
			"latitude": bitResponse[i].venue.latitude,
			"longitude": bitResponse[i].venue.longitude,
			"date": bitResponse[i].datetime,
		})
	}
}

//Google maps API call//

function initMap () {
	console.log("Function running");
	var options = {lat: 39.8283, lng: -98.5795};
		map = new google.maps.Map(document.getElementById('contentMap'), {
			zoom: 4,
			center: options,
		});
};

//google maps marker function//
function markerSet () {
	for (i = 0; i < latLongArray.length; i++) {
		labelOrder = (i + 1).toString();
		coords = {lat: parseFloat(latLongArray[i].latitude), lng: parseFloat(latLongArray[i].longitude)};
		// addMarker(coords);
		marker = new google.maps.Marker({
				position: coords,
				map: map,
				label: labelOrder,
		});
		marker.setMap(map);
	};
};

 ///////////////////////////////////////////
//site progression/////////////////////////

$("#collapseSearch").on("click", function () 
{
	searchSlide();
});

$("#footerMenu").on("click", function ()
{
	footerSlide();
});

$("#submit").on("click", function(event) {
	event.preventDefault();
	searchSlide();
	inputArtist = $("#searchBar").val().trim();
	bitAPI(inputArtist);
})

// <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD-d2navTuPoVDJXPWB7ZEp_OmJrM4z_iI&callback=initMap'></script>