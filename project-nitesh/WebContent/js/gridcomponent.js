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
		// for logout button
		$(document).on("click","#logout",function(){
			_logout();
		});
		//for login button
		$(document).on("click","#login",function(){
			$("#login-modal").modal("show");
		});
		$(".user-login").click(function(e){
			e.preventDefault();
			_authanticateUser();
			
		});
		// for fb user login
		$(document).on("click",".user-fb-login",function(){
			FB.login(function(){ 
				  _checkLoginState();
			});
		});
		$(document).on("showtab",".tab",function(){
			$(".tab").show();
		});
		$(document).on("click",".cell",function(){
			if(_isSession==true){
            	var bookno=$(this).find("#bookid").val();
        		_self.showDetails(bookno);
        		 _makeHistoryForModals(bookno);
        	}else{
            	$("#login-modal").modal("show");
            }
        });
		$(document).on("mouseover",".cell",function(){
			if(!_isSession){
				$(this).tooltip("show");
			}
		});
		$("#processValue").click(function(){
    		_subjectName = $("#search").val();
    		$(".column").empty();
    		_self.searchBook(_subjectName);
    		_makeHistoryForPages(_subjectName);
    	});
		$(document).on("click",".details",function(e){
			var bookno=$(this).find("#bookid").val();
			e.stopPropagation();
    		_self.showDetails(bookno);
    		 _makeHistoryForModals(bookno);
    	});
		$(document).on("click",".more",function(e){
			var elem = $(this);
			elem.parent().find(".more-desc").slideToggle("slow"); 
			var elemText = elem.text();
			if(elemText==" more..."){
				elem.text("...less");
			}else{
				elem.text(" more...");
			}		
			e.stopPropagation();
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
	// get facebook data
	var _checkLoginState = function(){
		  FB.getLoginStatus(function(response){ 
			  console.log(response);
			  _status(response);
		  });
	};
	var _status = function(response){
		if(response.status == "connected"){
			  console.log("success");
			  $("#login").addClass("hidden");
			  $(".profile-pic").removeClass("hidden");
			  _showFBUserDetails();
		  }else if(response.status == "not_authorized"){
			  console.log("not authorized");
		  }else if(response.status == "unknown"){
			  console.log("unknown");
		  }
	}; 
	var _showFBUserDetails = function(){
		FB.api("/me",function(response){ 
			$(".fbusername").text(response.name);
			_getProfilePic();
		});  
	};
	var _getProfilePic = function(){
		FB.api("/me/picture",function(response){ console.log(response);
            $(".profile-pic").attr("src",response.data.url);
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
                		$(".search-result").text("search result for : "+_subjectName);
                		_self.reqInProgress = false;
                		if(_isSession){
                			$(".tab").trigger("showtab");
                		}
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
        $("#bookModal").modal("show");/*.on("hidden.bs.modal", function(){
        	_makeHistoryForModals("n");
        });*/
	};
	var _authanticateUser = function(){
		var username = $("#username").val();
		var password = $("#password").val();
		var optParams = {
				url:'authanticateuser',
				method:'POST',
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
		    				$("#login").addClass("hidden");
		    				$("#logout").removeClass("hidden");
		    				$(".tab").trigger("showtab");
						}
					},
					error: function(res){
						console.log("failed");
					}
				}
		};
		GridView.ajaxRequest(optParams);
	};
	var _logout = function(){
		var optParams = {
				url:'logout',
				method:'POST',
				callbacks:{
					success: function(res){
						_isSession = res;
						$("#logout").addClass("hidden");
						$("#login").removeClass("hidden");
						$(".tab").hide();
		    		},
					error: function(res){
						console.log("failed");
					}
				}
		};
		GridView.ajaxRequest(optParams);
	};
	var _makeHistoryForModals = function(res){
		history.pushState({id : res},"book-id : "+res,res);
	};
	var _makeHistoryForPages = function(res){
		history.pushState({subName : res},"subject-name : "+res,res);
	};
	window.onpopstate = function(){
		_loadContent(history.state);
	};
	var _loadContent = function(obj){
		if(obj.id === undefined){
			$(".column").empty();
			_self.searchBook(obj.subName);
		}else{
			_self.showDetails(obj.id);
		}
	};
	_init();
};
//make ajax request
GridView.ajaxRequest=function(options){
	$.ajax({
		type:options.method,
		url:options.url,
//		contentType: "application/json",
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
GridView.getHTMLCell= function(obj,i){
	var result="";
	result+= "<div class=\"cell\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"click on cell for download.\">" +
		        "<div class=\"book-img\">" +
		            "<div class=\"img-responsive\">" + 
		            "<img src=\"images/placeholder.jpg\" data-src=\""+obj.Books[i].Image+"\" class=\"img-animate\" alt=\"Image not loaded\">" +
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
