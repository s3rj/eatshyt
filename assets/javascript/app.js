//eatShyt////////////////////////////////////

 ////////////////////////////////////////////
//variable bank/////////////////////////////

var searchCollapse = false //variable to determine which way to slide search
var footerCollapse = false //variable to determine status of footer menu

var inputArtist //taking input value from search
var bitQuery //url query for bands in town API
var bitResponse //var storing bands in town API response

var artistName //name of artist being searched

var latLongArray = [] //Array holding pertinent information from BIT API call

 ///////////////////////////////////////////
//function bank////////////////////////////

//search sliding mechanics//

function searchSlide ()
{
	if (searchCollapse === false)
	{
		searchCollapse = true;
		$("#searchElement").animate({left: '-93%'}, 200);
		$(".titleSplash").fadeTo("slow", 0);
		$("#sideBar").fadeTo("slow", 0);
		$("#collapseSearch").html("<i class='fas fa-angle-double-left'></i>");
		setTimeout(function () {
			$("#contentDisplay").fadeIn(1000);
		}, 500);
	} 
	else
	{
		searchCollapse = false
		$("#searchElement").animate({left: '0%'}, 200);
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
	})
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