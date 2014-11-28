GridView=function (colnum){
	this.noOfColumn=colnum;
	var _subjectName="";
	var _self = this;
	var _init = function(){
		_registerEvents();
	};
	var _registerEvents=function(){
		$(document).on("click","#processValue",function(e){
			console.log("search clicked");
    		_subjectName = $("#search").val();
    		$(".column").empty();
    		_self.searchBook(_subjectName);
			e.stopImmediatePropagation();
    	});
	};
	this.searchBook=function(_subjectName){
		var url = "http://it-ebooks-api.info/v1/search/"+_subjectName;
     
        var optParams={
        		url: '/cell/createJSON',
                method: 'GET',
                dataParams:{
                	link :url,
                },
                callbacks:{
                	success: function(res){
                		console.log("success");
						_displayData(res);
						$(".img-animate").unveil(10,function(){
                			$(this).load(function(){
                				$(this).removeClass("img-animate").addClass("img-effect");
                			});
                		});
                		$(".search-result").text("search result for : "+_subjectName);
 
                	},
                	error: function(){
                			   console.log("No Response!!");
                			 
                	}
                }
        };
        GridView.ajaxRequest(optParams);
	};
	var _displayData= function(cells){
		colObj = {"col0" : [],
    			"col1" : [],
    			"col2" : [],
    			"col3" : [],
    			"col4" : [],
    	};
		for(var i=0;i<cells.Books.length;i++){
        	var result = GridView.getHTMLCell(cells,i);
        	var colnum=i%_self.noOfColumn; 
        	switch(colnum){
        		case 0 :colObj["col"+colnum].push(result);
        				break;
        		case 1 :colObj["col"+colnum].push(result);
						break;
        		case 2 :colObj["col"+colnum].push(result);
						break;
        		case 3 :colObj["col"+colnum].push(result);
						break;
        		case 4 :colObj["col"+colnum].push(result);
						break;
				default: console.log("Error");
        	}
        }
		for(var i=0;i<5;i++){
			$("#column-"+i).append(colObj["col"+i].join(" "));
		}
	};
	_init();
};
//make ajax request
GridView.ajaxRequest=function(options){
	$.ajax({
		type:options.method,
		url:options.url,
		contentType: "application/json",
	    dataType: 'json',
	    data: options.dataParams,
	    success:function(res){
	    	options.callbacks.success(res);
	    },
	    error:function(res){
	    	options.callbacks.error(res);
	    }
	});
};
GridView.getHTMLCell= function(obj,i){
	var result="";
	result+= "<div class=\"cell\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"click on cell for download.\">" +
		        "<div class=\"book-img\">" +
		            "<div class=\"img-responsive\">" + 
/* 					"<%=image_tag(\"placeholder.jpg\", class:\"img-animate\", alt: \"Image not loaded\", data: {src: "+obj.Books[i].Image+"})%>"
 */		            "<img src=\"images/placeholder.jpg\" data-src=\""+obj.Books[i].Image+"\" class=\"img-animate\" alt=\"Image not loaded\">" +
		            "</div>" +
		        "</div>" +
		        "<div class=\"title\">" +
		            "<h3 data-title=\""+obj.Books[i].Title+"\">"+obj.Books[i].Title +"</h3>";
					if(typeof(obj.Books[i].SubTitle)!="undefined"){
						result+="<h6 data-subtitle=\""+obj.Books[i].SubTitle+"\"> - "+obj.Books[i].SubTitle+"</h6>";
					}
		            result+="<div class=\"description\">" +
		                "<p id=\"desc\" data-description=\""+obj.Books[i].Description+"\" >" +
		                      "<span>"+obj.Books[i].Description.substr(0,50)+"</span>" +
		                      "<span class=\"more-desc\" style=\"display:none;\">" + obj.Books[i].Description.substr(50)+"</span>" +
		                      "<a class=\"more\" > more...</a>" + 
		                "</p>" +
		            "</div>" +
		        "</div>" +
		        "<div class=\"tab clearfix\">" +
		                "<div class=\"download\">" +
		                    "<span class=\"button-color\"><button type=\"button\" class=\"btn btn-primary btn-xs\">" +
		                            "<span class=\"glyphicon glyphicon-download \"></span> Download" + 
		                    "</button></span>" +                            
		                "</div>" +
		                "<div class=\"details\">" +
		                    "<span class=\"button-color\"><button type=\"button\" class=\"btn btn-primary btn-xs\">" +
		                        "<span class=\"glyphicon glyphicon-resize-full \"></span> Details" + 
		                        "<input type=\"hidden\" value=\""+obj.Books[i].ID+"\" id=\"bookid\" name=\"bookid\">" +
		                    "</button></span>" +
		            "</div>" +
		        "</div>" +
		    "</div>";
	return result;
};

var c=new GridView(5);
