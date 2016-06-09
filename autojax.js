//AutoJax | Copyright 2016 | Kieran Harris | South Africa | Free to use by anyone, anywhere.
(function($){
    //Defines AutoJax Function
    $.fn.autojax = function(options) {
      //Defines variables, and default options
      
      	var form = this,php,validated,empty,email,number;
		//set PLugin defaults
		var defaults = {
		    type:'POST',
		    customUrl:'false',
		    data:form.serialize(),
		    method:'submit',//'submit' defaults to a form submit function, 'custom' executes without a function, if you need to run ajax in your own function ie .click(), 
		    sentCallback : function() {},
		    errorCallback : function() {},
		    emptyError : function() {},
		    emailError : function() {},
		    numberError : function() {},
		    useValidation:'false',
		    Validation:[emptyValidation,emailValidation,numberValidation]
		}
		var settings = $.extend({}, defaults, options);
		//if no custom url then use <form action="">
			if(settings.customUrl === 'false'){
			  php = form.attr('action');  
			}
		//if customUrl then use customUrl input 
			else{
			  php = settings.customUrl;
			}
		//Use validation or not
			if(settings.useValidation === 'false'){
			  	validated = 'true';
			}else{
				validated = 'false';
			}
		//Submit form with ajax
		if(settings.method === 'submit'){

				form.submit(function(event){
					//prevent Default form sending
					event.preventDefault();
					event.stopPropagation();
					if(validated === 'false'){
						for(i=0;i<3;i++){
					    	settings.Validation[i]();
					    }
					    if(empty === 'true' && email === 'true' && number === 'true'){
					    	$.ajax({
							  type:settings.type,
							  url:php,
							  data:settings.data,
							  success:function(response){
							    data = response;
							    //call sentCallback on success
							    settings.sentCallback.call(data);
							  },
							  error:function(){
							    //call errorCallback on error
							    settings.errorCallback.call(data);
							  }
							});
					    }
					}else{
						$.ajax({
						  type:settings.type,
						  url:php,
						  data:settings.data,
						  success:function(response){
						    data = response;
						    //call sentCallback on success
						    settings.sentCallback.call(data);
						  },
						  error:function(){
						    //call errorCallback on error
						    settings.errorCallback.call(data);
						  }
						});
					}
				});
		}else if(settings.method === 'custom'){
			if(validated === 'false'){
				for(i=0;i<3;i++){
			    	settings.Validation[i]();
			    }
			    if(empty === 'true' && email === 'true' && number === 'true'){
			    	$.ajax({
					  type:settings.type,
					  url:php,
					  data:settings.data,
					  success:function(response){
					    data = response;
					    //call sentCallback on success
					    settings.sentCallback.call(data);
					  },
					  error:function(){
					    //call errorCallback on error
					    settings.errorCallback.call(data);
					  }
					});
			    }
			}else{
				$.ajax({
				  type:settings.type,
				  url:php,
				  data:settings.data,
				  success:function(response){
				    data = response;
				    //call sentCallback on success
				    settings.sentCallback.call(data);
				  },
				  error:function(){
				    //call errorCallback on error
				    settings.errorCallback.call(data);
				  }
				});
			}
		}else{
			alert('Invalid method supplied');
		}
		return form;
	    //functions to check for input validations
	    function emptyValidation(){
	    	$('form').find('*').each(function(){
	    		if($(this).attr('data-empty') === 'true'){
	    			if($(this).val() === ''){
	    				settings.emptyError.call();
	    			}else{
	    				empty = 'true';
	    			}
	    		}
	    	});  
		}
		function emailValidation(){
			var val = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			$('form').find('*').each(function(){
	    		if($(this).attr('data-email') === 'true' && empty === 'true'){
	    			if(val.test($(this).val()) === false){
	    				settings.emailError.call();
	    			}else{
	    				email = 'true';
	    			}
	    		}
	    	});  
		}
		function numberValidation(){
			$('form').find('*').each(function(){
	    		if($(this).attr('data-number') === 'true' && empty === 'true' && email === 'true'){
	    			if(!$.isNumeric($(this).val())){
	    				settings.numberError.call();
	    			}else{
	    				number = 'true';
	    			}
	    		}
	    	});  
		}
	};
}( jQuery ));



