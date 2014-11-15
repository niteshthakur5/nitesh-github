GridView=function (colnum){
	this.noOfColumn=colnum;
	this.reqInProgress = false;
	this.pageNo = 1;
	var _isUser = "";
	var _isSession= false;
	var _subjectName="";
	var _self = this;
	var _init = function(){
		_registerEvents();
	};
	var _registerEvents=function(){
		$(document).on("click","#login",function(){
			$("#login-modal").modal("show");
		});
		$(".user-login").click(function(e){
			e.preventDefault();
			_authanticateUser();
			$("#login").text("Logout");
		});
		$(document).on("click",".cell",function(){
			if(_isSession==true){
            	var bookno=$(this).find("#bookid").val();
        		_self.showDetails(bookno);
            }else{
            	$("#login-modal").modal("show");
            }
        });
		$("#processValue").click(function(){
    		_subjectName = $("#search").val();
    		$(".column").empty();
    		_self.searchBook(_subjectName);
    	});
		$(document).on("click",".details",function(e){
			e.stopPropagation();
    		var bookno=$(this).find("#bookid").val();
    		_self.showDetails(bookno);
    	});
		$(document).on("click",".more",function(){
			var elem = $(this);
			elem.parent().find(".more-desc").slideToggle("slow"); 
			var elemText = elem.text();
			if(elemText=="more..."){
				elem.text("...less");
			}else{
				elem.text("more...");
			}				
        });
		$(window).scroll(function(){
			if($(window).scrollTop()==0){
				$(".scroll-to-top").hide();
			}else{
				$(".scroll-to-top").show();
			} 
			if((($(window).scrollTop()+$(window).height())>=($(".content").height())-100) && ($(".content").height()>1) ){
				_self.searchBook(_subjectName);
			}
		});
		$(".to-top").click(function(){
			$("html,body").animate({"scrollTop":"0"},800);
		});
		
	};
	this.searchBook=function(_subjectName){
		var url = "http://it-ebooks-api.info/v1/search/"+_subjectName+"/page/"+_self.pageNo;
        // var url="http://www.json-generator.com/api/json/get/bZJmJBfpbC?indent=2";
        var optParams={
        		url: 'getbooks',
                method: 'GET',
                dataParams:{
                	link :url,
                },
                callbacks:{
                	success: function(res){
                		_displayData(res);
                		$(".img-animate").unveil(10,function(){
                			$(this).load(function(){
                				$(this).removeClass("img-animate").addClass("img-effect");
                			});
                		});
                		_self.reqInProgress = false;
                	},
                	error: function(){
                			   console.log("No Response!!");
                			   _self.reqInProgress = false;
                	}
                }
        };
        if(!_self.reqInProgress){
        	_self.reqInProgress = true;
	        GridView.ajaxRequest(optParams,_isUser);
	       	_self.pageNo++;
        }
	};
	var _displayData= function(cells){
		var colArr = ["","","","",""];
		for(var i=0;i<cells.Books.length;i++){
        	var obj={
        		imgsrc:	cells.Books[i].Image,
        		title: cells.Books[i].Title,
        		subTitle: cells.Books[i].SubTitle,
        		description: cells.Books[i].Description,
        		id: cells.Books[i].ID
        	};
        	var result = GridView.getHTMLCell(obj);
        	var colnum=i%_self.noOfColumn; 
        	switch(colnum){
        		case 0 :colArr[colnum] += result;
        				break;
        		case 1 :colArr[colnum] += result;
						break;
        		case 2 :colArr[colnum] += result;
						break;
        		case 3 :colArr[colnum] += result;
						break;
        		case 4 :colArr[colnum] += result;
						break;
				default: console.log("Error");
        	}
        }
		for(var i=0;i<colArr.length;i++){
			$("#column-"+i).append(colArr[i]);
		}
		if(_isSession==true){
			$("#login-modal").modal("hide");
			$(".tab").show();
		}
    };
	this.showDetails= function(bookno){
		var url = "http://it-ebooks-api.info/v1/book/"+bookno;
        var optParams={
        		url: 'getbooks',
                method: 'GET',
                dataParams: {
                	'link' :url
                },
                callbacks:{
                    success: function(res){
                    	_displayModal(res);
                    },
                    error: function(){
                            console.log("No Response!!");
                    }
               }
        };
        GridView.ajaxRequest(optParams);
    };
    //display individual book details
	var _displayModal= function(res){
		var result=GridView.getHTMLModal(res);
		$("#modal-data").html(result);
        $("#bookModal").modal("toggle");
	};
	var _authanticateUser = function(){
		var username = $("#username").val();
		var password = $("#password").val();
/*		$.ajax({
			type:'GET',
			url:"authanticateuser",
			contentType: "application/json",
		    dataType: 'json',
		    data: {
		    	'user' :username,
		    	'pass' :password
		    },
		    success:function(res){
		    	_isSession = res; 
		    	console.log(_isSession);
		    	if(_isSession==true){
		    		$("#login-modal").modal("hide");
				}
		    },
		    error:function(res){
		    	console.log("failed");
		    }
		});*/
		var optParams = {
				url:'authanticateuser',
				method:'GET',
				dataParams:{
                	'user' :username,
		    		'pass' :password
                },
				callbacks:{
					success: function(res){
						_isSession = res; 
		    			console.log(_isSession);
		    			if(_isSession==true){
		    				$("#login-modal").modal("hide");
						}
					},
					error: function(res){
						console.log("failed");
					}
				}
		};
		GridView.ajaxRequest(optParams);
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
// return html code for cells
GridView.getHTMLCell= function(obj){
	var result="";
	result+= "<div class=\"cell\">" +
		        "<div class=\"book-img\">" +
		            "<div class=\"img-responsive\">" + 
		            "<img src=\"images/placeholder.jpg\" data-src=\""+obj.imgsrc+"\" class=\"img-animate\" alt=\"Image not loaded\">" +
		            "</div>" +
		        "</div>" +
		        "<div class=\"title\">" +
		            "<h3 data-title=\""+obj.title+"\">"+obj.title +"</h3>";
					if(typeof(obj.subTitle)!="undefined"){
						result+="<h6 data-subtitle=\""+obj.subTitle+"\"> - "+obj.subTitle+"</h6>";
					}
		            result+="<div class=\"description\">" +
		                "<p id=\"desc\" data-description=\""+obj.description+"\" >" +
		                      "<span>"+obj.description.substr(0,50)+"</span>" +
		                      "<span class=\"more-desc\" style=\"display:none;\">" + obj.description.substr(50)+"</span>" +
		                      "<a class=\"more\" >more...</a>" + 
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
		                        "<input type=\"hidden\" value=\""+obj.id+"\" id=\"bookid\" name=\"bookid\">" +
		                    "</button></span>" +
		            "<\div>" +
		        "</div>" +
		    "</div>";
	return result;
};
// return html code for modal
GridView.getHTMLModal= function(obj){
	var result="";
    result="<div class=\"modal fade\" id=\"bookModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"bookModalLabel\" aria-hidden=\"true\">" +
    	        "<div class=\"modal-dialog \">" +
    	            "<div class=\"modal-content\">" +
    	                "<div class=\"modal-header\">" +
    	                    "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span>" + 
    	                    "</button>" +
    	                    "<h4 class=\"modal-title\">Books Details</h4>" +
    	                "</div>" +
    	                "<div class=\"modal-body\">" +
    	                    "<div class=\"row\">" +
    	                        "<div class=\"col-sm-3\">" +
    	                            "<img src=\""+obj.Image+"\" alt=\"image not loaded\" class=\"img-responsive\">" +
    	                        "</div>" +
    	                        "<div class=\"col-sm-9\">" +
    	                            "<h1>"+obj.Title+"</h1>";
    								if(typeof(obj.SubTitle)!="undefined"){
    									result += "<h4> - "+obj.SubTitle+"</h4>";
    								}
    	                        result += "<h2>Description: </h2>" +
    	                            "<p>"+obj.Description+"</p>" +
    	                        "</div>" +
    	                    "</div>" +
    	                    "<div class=\"row\">" +
    	                        "<div class=\"col-sm-3\">" +
    	                            "<a href=\""+obj.Download+"\">download</a>" +
    	                        "</div>" +
    	                        "<div class=\"col-sm-9\">" +
    	                            "<h3>Details: </h3>" +
    	                        "<div class=\"col-sm-4 \">" +
    	                                "<p>Publisher: </p>" + 
    	                                "<p>ISBN: </p>" +
    	                                "<p>Year: </p>" +
    	                         "</div>" +
    	                         "<div class=\"col-sm-5\">" +
    	                                   "<p>"+obj.Publisher+"</p>" +
    	                                   "<p>"+obj.ISBN+"</p>" +
    	                                   "<p>"+obj.Year+"</p>" +
    	                         "</div>" +
    	                    "</div>" +
    	                "</div>" +
    	            "</div>" +
    	        "</div>" +
            "</div>";
    return result;
};