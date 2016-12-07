
$(document).ready(function(){//get
	$("#ordinazione").click(function(){
		$.get("http://127.0.0.1:5000/caricagiorni");
	});
	
});