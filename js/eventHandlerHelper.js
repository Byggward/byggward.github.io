var $currentActiveIntermediateRow;


function initHandlers(){
	$.each($(".imageGrid"), function(index, navBlock){
		addEventHandlerToggleBoxImage($(this));
	});	

	$.each($(".mobile-imageGrid"), function(index, navBlock){
		addEventHandlerToggleBoxImage($(this));
	});

	addEventHandlerBoxClick($("[data-section=aboutSection]"), $("#intermediateRow1"));
	addEventHandlerBoxClick($("[data-section=contactSection2]"), $("#intermediateRow1b"));
	addEventHandlerBoxClick($("[data-section=fromSection]"), $("#intermediateRow2"));
	addEventHandlerBoxClick($("[data-section=projectSection2]"), $("#intermediateRow2b"), true);
	addEventHandlerBoxClick($("[data-section=projectSection]"), $("#intermediateRow3"), true);
	addEventHandlerBoxClick($("[data-section=contactSection]"), $("#intermediateRow3b"));

/*
	$.each($("#blockRow1 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow1"));
	});

	$.each($("#blockRow2 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow2"));
	});	

	$.each($("#blockRow3 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow3"));
	});
*/

	$.each($("#mobileBlockRow1 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow1"), true);
	});	

	$.each($("#mobileBlockRow2 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow2"), true);
	});	

	$.each($("#mobileBlockRow3 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow3"), true);
	});						

	$.each($("#mobileBlockRow4 [data-section*=Section]"), function(index, navBlock){
		addEventHandlerBoxClick($(this), $("#intermediateRow4"), true);
	});	

	$.each($(".closeButton"), function(index, navBlock){
		addEventHandlerCloseButton($(this));
	});
	
	$(window).on("scroll", function(event){
		if($(window).width() > 760){			
			if($(this).scrollTop() > 25){
				$(".navbar").css("border-color", "#f1f1f1");			
				$("#slogan").css("display", "none");
				$("#links").css("display", "block");
				//$("#byggward_logo").attr("src", "images/logo/logotype-ward_grey.png");
				//toggleNavbar(true);
			}else{
				$(".navbar").css("border-color", "#fff");
				$("#links").css("display", "none");
				$("#slogan").css("display", "block");						
				//$("#byggward_logo").attr("src", "images/logo/logo_text.png");
				//toggleNavbar(false);
			}				
		}

		if($(window).width() < 770){
			$("#byggward_logo").attr("src", "images/logo/logo_text_small.png");            
		}else{
			$("#byggward_logo").attr("src", "images/logo/logo_text.png");            			
		}
	});

	$(window).on("resize", function(event){
		if($(window).width() < 760 || $(this).scrollTop() > 10){			
			$("#slogan").css("display", "none");
			$("#links").css("display", "block");
		}else{			
			$("#links").css("display", "none");
			$("#slogan").css("display", "block");			
		}

		if($(window).width() < 760){
			$("#byggward_logo").attr("src", "images/logo/logo_text_small.png");            
		}else{
			$("#byggward_logo").attr("src", "images/logo/logo_text.png");            			
		}		
	});

	$("#byggward_logo").on("click", function(){
		$(".closeButton").click();
		$("#container1").ScrollTo({offsetTop:90});
	});

	$.each($("div[data-section*=Section]"), function(index, navBlock){
		addEventHandlerAnimateNavButtons($(this));	
	});

	$.each($("a[data-ref-id*=Section]"), function(index, link){
		addEventHandlerNavLinkClick($(this));
	});
}

function toggleNavbar(displayButtons){
	if(displayButtons && !$("#navButtons").hasClass("buttons-visible")){
		$("#default").detach();
	     var $buttons = $("<p></p>").attr("id","scroll").addClass("navbar-text").addClass("navbar-right");
	      $("<a data-ref-id='aboutSection' href='#'>OM F&Ouml;RETAGET</a>").addClass("custom-navbar").appendTo($buttons);
	      $("<a data-ref-id='fromSection' href='#'>FR&Aring;N SKISS TILL NYCKELF&Auml;RDIGT</a>").addClass("custom-navbar").appendTo($buttons);
	      $("<a data-ref-id='projectSection' href='#'>PROJEKT</a>").addClass("custom-navbar").appendTo($buttons);
	      $("<a data-ref-id='contactSection' href='#'>KONTAKTA OSS</a>").addClass("custom-navbar").appendTo($buttons);
	      $buttons.appendTo("#navButtons");
	      $("#navButtons").addClass("buttons-visible");
	      
	      $.each($("a[data-ref-id*=Section]"), function(index, link){
			addEventHandlerNavLinkClick($(this));
		  });
	  }else if(!displayButtons && $("#navButtons").hasClass("buttons-visible")){
	  	 $("#scroll").detach();
	  	 var $slogan = $("<p></p>").attr("id", "default").addClass("navbar-text").addClass("navbar-right");
         $("<a href='#' style='font-size:14pt;text-decoration: none;'>Byggt -om -till -nytt i &ouml;ver 30 &aring;r</a>").addClass("custom-navbar").appendTo($slogan);
         $slogan.appendTo("#navButtons");
         $("#navButtons").removeClass("buttons-visible");
	  }            
}

function addEventHandlerNavLinkClick($link){
	$link.on("click", function(event){
		$("#collapsableNavbar").collapse('hide');
		var refid = $link.attr("data-ref-id");

		if($(window).width() <= 480)
			refid += "480";

		var $navButton = $("div[data-section=" + refid + "]");
		if($navButton != null && $navButton != undefined){
			$navButton.click();
			//$(".navbar-toggle").dropdown('toggle');
		}
		return false;
	});
}

function addEventHandlerAnimateNavButtons($navBox){
	$navBox.on("mouseover", function(event){				
		$(this).animate({backgroundColor: '#363636'}, 200)
		$(this).attr("data-orgBgColor", "" + $(this).css("background-color"));
	})
	.on("mouseout", function(event){		
		$(this).animate({backgroundColor: $(this).attr("data-orgBgColor")}, 200);
		//$(this).animate({backgroundColor : $(this).attr("data-orgBgColor")}, 500);
	});
}

function addEventHandlerCloseButton($button){
	$button.on("click", function(event){
		var $intermediateRow = $(this).parent().parent().parent();
		//var $content = $(this).parent().parent();
		$(".content", $intermediateRow).animate({height: "0"}, 500, function(){
			$intermediateRow.css("display","none");				
		});
		$currentActiveIntermediateRow = null;
	});
}

function addEventHandlerBoxClick($box, $row, isMobile){
	$box.on("click", function(event){
		if($currentActiveIntermediateRow == null){
			$row.css("display", "block");
				
				if(isMobile != undefined && isMobile){
					$("#text", $row).html("<i class=\"fa fa-spinner fa-spin fa-white\"></i>");
					$(".content", $row).load( "html/" + $box.attr("data-section") + ".html", function( response, status, xhr ) {
						$("#text", $row).html("");
						$(this).animate({height: "20%"}, 500, function(){
					});
				$row.ScrollTo({ offsetTop:90});												
			});
			}else{
				$(".content", $row).animate({height: "20%"}, 500, function(){});
				$row.ScrollTo({ offsetTop:90});		
			}
			$currentActiveIntermediateRow = $row;
		}else{
			$(".content", $currentActiveIntermediateRow).animate({height: "0"}, 500, function(){				
				$currentActiveIntermediateRow.css("display", "none");

				$row.css("display", "block");
				if(isMobile != undefined && isMobile){
					$("#text", $row).html("<i class=\"fa fa-spinner fa-spin fa-white\"></i>");
					$(".content", $row).load( "html/" + $box.attr("data-section") + ".html", function( response, status, xhr ) {
						$("#text", $row).html("");
						$(this).animate({height: "20%"}, 500, function(){							
						});
						$row.ScrollTo({ offsetTop:90});		
					});		
				}else{
					$(".content", $row).animate({height: "20%"}, 500, function(){});
					$row.ScrollTo({ offsetTop:90});		
				}
				$currentActiveIntermediateRow = $row;	
			});
		}				
	});
}

function addEventHandlerToggleBoxImage($box){
	var $img = $("#img" + $box.attr("id"));
	$box.on("mouseover", function(event){		
		if($(this).attr("data-sibling-ref") != undefined){
			$img.animate({"opacity" : "1"}, 300);
			$("#" + $(this).attr("data-sibling-ref")).animate({"opacity" : "1"}, 300);					
		}else{
			$img.animate({"opacity" : "1"}, 300);
		}
	})
	.on("mouseout", function(event){		
		if($(this).attr("data-sibling-ref") != undefined){
			$img.animate({"opacity" : "0"}, 300);
			$("#" + $(this).attr("data-sibling-ref")).animate({"opacity" : "0"}, 300);					
		}else{
			$img.animate({"opacity" : "0"}, 300);
		}		
	});
}