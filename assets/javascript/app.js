//seeShyt////////////////////////////////////

 ////////////////////////////////////////////
//variable bank/////////////////////////////

var searchCollapse = false; //variable to determine which way to slide search
var footerCollapse = false; //variable to determine status of footer menu

var inputArtist; //taking input value from search
var bitQuery; //url query for bands in town API
var bitResponse; //var storing bands in town API response

var artistName; //name of artist being searched

var latLongArray = []; //Array holding pertinent information from BIT API call
var dateCall = ("YYYY-MM-DD hh:mm:ss"); //BIT API call display format
var dateConvert; //Converting date from BIT API call into moment usable format
var dateNew; //Converted unix date for sorting purposes
var dateDisplay; //Converted day for display purposes

var map; //New google map for googlemaps API call
var marker; //marker variable for googlemaps results
var markerArray = []; //marker array to clear map on re-search
var markerIcon = 0;

var coords; //testing add marker function
var contentString; //content string for info window
var infowindow; //info window for google marker

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
	mapClear()

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
		latLongPull();
		console.log(latLongArray)
		bubbleSort(latLongArray);
		}
	}).then(markerSet);
}

//Pulling pertinent information out of BIT API call//
function latLongPull ()
{
	for (i = 0; i < bitResponse.length; i++) 
	{
		timeSetter()
		latLongArray.push({
			"band": bitResponse[i].lineup[0],
			"name": bitResponse[i].venue.name,
			"latitude": bitResponse[i].venue.latitude,
			"longitude": bitResponse[i].venue.longitude,
			"date": dateDisplay,
			"unixdate": parseInt(dateNew),
			"markerIcon": "assets/images/customMarkers/" + markerIcon + ".png",
		})
	}
}

//Converting time of show in BIT API call//
function timeSetter () {
	var dateCall = moment(bitResponse[i].datetime, dateConvert);
	dateNew = moment(dateCall).format("X");
	var dateCall = moment(dateNew, "X");
	dateDisplay = moment(dateCall).format("MM-DD-YYYY hh:mm");
}

//sort array by tour dates
function bubbleSort(arr) {
	var sorted = false;

	while(!sorted) {

		sorted = true;
		for (var i = 0; i < arr.length - 1; i++) {
			var sortItem = arr[i].unixdate;
			var sortItemTwo = arr[i + 1].unixdate;
			if (sortItem > sortItemTwo) {
				sorted = false;
				var temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
		}
	}
	console.log(arr);
}

//Google maps API call//

function initMap () {
		map = new google.maps.Map(document.getElementById('contentMap'), {
			zoom: 4,
			center: {lat: 39.8283, lng: -98.5795},
		});
};

//google maps marker function//
function markerSet () {
	for (i = 0; i < latLongArray.length; i++) {
		labelOrder = (i + 1).toString();
		coords = {lat: parseFloat(latLongArray[i].latitude), lng: parseFloat(latLongArray[i].longitude)};
		contentString = "<h2>" + latLongArray[i].band + "</h2><h3>" + latLongArray[i].name + "</h3><h3>" + latLongArray[i].date + "</h3>";
		addMarker(latLongArray[i]);
	};
};

function addMarker () {
	// add marker(coords)
	var marker = new google.maps.Marker({
			position: coords,
			map: map,
			label: labelOrder,
			icon: latLongArray[i].markerIcon,
	});
	markerArray.push(marker)

	// add info window
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
}

function mapClear () {
	// latLongArray = [];
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setMap(null);
	};
	markerArray = [];
}

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
	markerIcon++;
	inputArtist = $("#searchBar").val().trim();
	bitAPI(inputArtist);
})