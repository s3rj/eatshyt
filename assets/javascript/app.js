var searchCollapse = false

$("#collapseSearch").on("click", function () 
{
	if (searchCollapse === false)
	{
		searchCollapse = true;
		$("#searchElement").animate({left: '-50%'}, 200);
		$(".titleSplash").fadeTo("slow", 0);
		$("#collapseSearch").css({transform: 'rotate(180deg)'});
	} 
	else
	{
		searchCollapse = false
		$("#searchElement").animate({left: '0%'}, 200);
		$("#collapseSearch").css({transform: 'rotate(0deg)'});
	}
});