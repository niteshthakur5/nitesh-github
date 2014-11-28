
$(document).ready(function(){
	$('#json').click(function() {
		$.ajax({
			type:'GET',
			url:'/getdata/getjson',
			contentType: "application/json",
			dataType: 'json',
			success:function(res){
				$("#json-here").text(res);
			},
			error:function(res){
				console.log("error in requesting");
			}
		});
	});
});


/* 
console.log("Hello i am not in function");
function hello(){
	console.log("Hello i am in function");
}
 */