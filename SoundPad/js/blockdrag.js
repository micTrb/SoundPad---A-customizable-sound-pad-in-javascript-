
$(document).ready(function()
{

/************************************************************************************
    
    GLOBAL VARIABLES

*************************************************************************************/

var dropArr = new Array(); // Array of Dropped Blocks as DOM elements
var playBlocks = new Array(); // Array of Dropped Blocks as sound objects

var dropped = false; //Dropped flag


//Dom selections
var dropzone1 = $("#dropzone1");
var itembar = $("#itembar");
var container = $("#container0")
var draggableBox = $(".draggable");
var boxClone = $(".box-clone");


/************************************************************************************
    
    PlayBlock Object

*************************************************************************************/



/*

L'oggetto BlockPlay è cotruito da 
	un id Colore
	la sorgente della traccia sonora 
	pad: l'elemento html su cui richiamare l'evento hover di Jquery
	loop: se la traccia si ripete
*/
var BlockPlay = function (idColor, sampleSrc, pad, loop) {
	var b = this;
	var audio = new Audio();
	audio.src = sampleSrc;
	audio.loop = loop;

	this.Col = idColor;
 	var block = this.pad = pad;

 	//Evento Hover
	block.hover
	(function()
	{
		block.pulsate(
		{
			glow: true
		});
		// Suono
		audio.play();
	},
	function()
	{
		block.pulsate("destroy");
	});
}

/*

Funzione che istanzia un oggetto BlockPlay 
nel particolare: mappa il colore ad una traccia prescelta 
*/

function createPlayBlockArray()
{
	var Block;

	for (i in dropArr)
	{
		switch($(dropArr[i]).attr("id"))
		{
			case "green":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/woodcrack.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;
			
			case "blue":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/splash.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);

			break;


			case "red":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/fireball1.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "yellow":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/coin.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "cyano":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/crashglass.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "magenta":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/laser1.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "orange":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/laserbeam.wav",
					pad = $(dropArr[i]),
					lloop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "purple":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/arrow.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "brown":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/boom.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;

			case "pink":
				var id = $(dropArr[i]).attr("id"),
					src = "Sounds/gunshot.wav",
					pad = $(dropArr[i]),
					loop = false;
			Block = new BlockPlay(id, src, pad, loop);
			break;
		}
	}
	playBlocks.push(Block);
}

/*
Funzione per resettare gli array degli oggetti 
e degli elementi DOM
*/
function clearBlocks()
{
	playBlocks = new Array();
	dropArr = new Array();
}



/************************************************************************************
    
    DRAGGING 

*************************************************************************************/

draggableBox.draggable
({
	addClasses: false,

	//Defining the helper the ".draggable" item
	helper: function (e, ui)
	{
		return $(this).clone()
	},

	//Drag Start Event
	start: function(e, ui)
	{
		var el = ui.helper;
		el.pulsate
		({
			speed: 500,
			glow: true
		});
		el.removeClass().addClass("box-clone")
	},

	//On Drag Event
	drag: function(e, ui)
	{
		var el = $(ui.helper);
		el.removeClass().addClass("box-clone")
	},

	//Drag Stop Event
	stop: function(e, ui)
	{
		//Preparing the clone
		var dropClone = $(ui.helper).clone();
		if(dropped)
		{
			dropClone.appendTo("#dropzone1")
			.pulsate("destroy")
			.draggable
			({
				addClasses: false,

				//When the Drag clone is created
				create: function(e, ui)
				{
					//Add the DOM element to the array
					dropArr.push($(this)[0]);
				},

				//On drag clone star
				start: function(e, ui)
				{
					var elDrag = $(ui.helper);
					elDrag.removeClass().addClass("box-clone");
					elDrag.animate
					({
						borderColor: "#808080"
					},
					200);
				},
				//On Drag clone stop
				stop: function (e, ui)
				{
					var elDrag = $(ui.helper);
					elDrag.removeClass().addClass("box-clone");
					elDrag.animate
					({
						borderColor: "#ffffff"					
					},
					200);
				},
				containment: "parent", //Inside the dropzone
				stack: ".box-clone",
			})
			.removeClass().addClass("box-clone")

			//Double click remove the block 
			.dblclick(function() 
			{
				var idx1 = $.inArray($(this)[0], dropArr, 0);
				dropArr.splice(idx1, 1);
				playBlocks.splice(idx1, 1);
				$(this).fadeOut(200, function() 
				{
					$(this).remove();
				});
			});

		//Calling the 
		createPlayBlockArray();		
		}
		else
		{
			dropClone.appendTo("#dropzone1")
				.fadeOut(400, function()
				{
					dropClone.remove()
				});
		}

	}
});



/*
Verifica se il block è stato droppato sulla dropzone o
fuori dalla stessa.
*/

$("body").droppable
({
	drop: function(e, ui)
	{
		dropped = false;
	}
});

dropzone1.droppable
({
	accept: "#green, #blue, #red, #yellow, #cyano, #magenta, #orange, #purple, #brown, #pink",

	//User Feedback highlighting
	activeClass: "dropActive",
	hoverClass: "dropHover",
	tolerance: "fit",
	drop: function(e, ui)
	{
		dropped = true;
	},
	out: function(e,ui)
	{
		dropped = false;
	}
});



//Clear Pad Button Events

//Hover event
$("#clearPad").hover(
function()
{
	var audio = new Audio();
	audio.src = "Sounds/voltage.wav";
	audio.loop;
	audio.play();
	$("#clearPad").pulsate({
		speed: 500
	});
},
function()
{
	$("#clearPad").pulsate("destroy");
});


//Click event
$("#clearPad").click(function()
{
	$("#clearPad").animate({
		"color": "white"
	}, 200);

	//Remove all blocks
	for(i in dropArr) {
		$(dropArr[i]).fadeOut(400, function() {
			$(this).remove();
		});
	}
	clearBlocks();
	$("#clearPad").animate({ 
		color: "black" 
	}, 200);
});

$(".draggable").mouseenter(function()
{
	//Sound Effect onHover
	var audio = new Audio();
	audio.src = "Sounds/click.wav";
	audio.loop;
	audio.play();
});

//End of $(document).ready();
});




