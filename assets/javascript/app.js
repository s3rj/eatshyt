//eatShyt////////////////////////////////////

//variable bank/////////////////////////////

var searchCollapse = false //variable to determine which way to slide search
var footerCollapse = false //variable to determine status of footer menu

//function bank////////////////////////////

//search sliding mechanics

function searchSlide ()
{
	if (searchCollapse === false)
	{
		searchCollapse = true;
		$("#searchElement").animate({left: '-90%'}, 200);
		$(".titleSplash").fadeTo("slow", 0);
		$("#collapseSearch").css({transform: 'rotate(180deg)'});
	} 
	else
	{
		searchCollapse = false
		$("#searchElement").animate({left: '0%'}, 200);
		$("#collapseSearch").css({transform: 'rotate(0deg)'});
	}
};

//site progression/////////////////////////

$("#collapseSearch").on("click", function () 
{
	searchSlide();
});

$("#footerMenu").on("click", function ()
{
	if (footerCollapse === false)
	{
	$("#footerMenu").html("<h6>© 2018 &nbsp - &nbsp <i class='fas fa-angle-double-up'></i></h6>");
	footerCollapse = true;
	}
	else
	{
		$("#footerMenu").html("<h6>© 2018 &nbsp - &nbsp <i class='fas fa-angle-double-down'></i></h6>");
		footerCollapse = false;
	}
});