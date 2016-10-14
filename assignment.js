var list_template, albums_template, photos_template, animal_template;
var current_album = animals_data.category[0];
var current_photo = current_album.animals[0];

//Compiling function
function showTemplate(template, data, area){ 
	var html = template(data);
	$(area).html(html);
};

$(document).ready(function(){
	
	var source = $("#list-template").html();
	list_template = Handlebars.compile(source);

	source = $("#albums-template").html();
	albums_template = Handlebars.compile(source);

	source = $("#photos-template").html();
	photos_template = Handlebars.compile(source); 

	source = $("#photo-template").html();
	animal_template = Handlebars.compile(source);

	//Function for clicking the home tab/button.
	$('#list').on("click","#home",function() {
		showTemplate(albums_template,animals_data,"#content");
		$(".nav-tabs .active").removeClass("active");
		$("#home").addClass("active");
		$("#photos").addClass("disabled");
		$('.album-thumbnail').on("click",albumClick);
	})

	//The Photos tab should not be clickable. This function is used to achieve that.
	function check() { 
		if ($('#photos').hasClass("disabled")) {
			return true;
		} else {
			$('#photos').addClass("disabled");
		}
	}

	//Function for changing the pictures of the animal.
	function imageClick() { 
		$('#toggle').click(function(){
			$(this).find(".image12").slideToggle();
		})
	}

	//Function to call after clicking an animal.
	function photoClick () { 
		var index = $(this).data("id");
		console.log(index);
		current_photo = current_album.animals[index];
		$(".nav-tabs .active").removeClass("active");
		$("#photos").removeClass("disabled");
		$("#photos").addClass("active");
		showTemplate(animal_template,current_photo,"#content");
		imageClick();
	}

	//Function for clicking an animal class (reptile, mamal, or bird).
	function albumClick () {
		var index = $(this).data("id");
		current_album = animals_data.category[index];
		$(".nav-tabs .active").removeClass("active");
		$("#albums").addClass("active");
		showTemplate(photos_template,current_album,"#content");
		check();
		$('.photo-thumbnail').on("click", photoClick);
		}	

//Functions for initializing the content. The first one is for the navbar.
//The second one is for the content div.
//The third one is for the dropdown menu in the albums tab.
showTemplate(list_template,animals_data,"#list");
$('#home').click();
$('#classList li').on("click",albumClick);
})