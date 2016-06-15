//AutoJax | Copyright 2016 | Kieran Harris | South Africa | Free to use by anyone, anywhere.
(function($){
    //Defines AutoJax Function
    $.fn.autojax = function(options) {
      //Defines variables, and default options
      
      	var form = this,php,validated,empty,email,number,dataInput;
		//set PLugin defaults
		var defaults = {
		    type:'POST',
		    customUrl:'false',
		    data:'default',
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
			  	validated = 'false';
			}else{
				validated = 'true';
			}
		//Submit form with ajax
		if(settings.method === 'submit'){

				form.submit(function(event){
					//prevent Default form sending
					event.preventDefault();
					event.stopPropagation();


					//check settings for default data type, default is Form.serialize();

					if(settings.data === 'default'){
						dataInput = form.serialize();
					}else{
						dataInput = settings.data;
					}


					if(validated === 'true'){
						for(i=0;i<3;i++){
					    	settings.Validation[i]();
					    }
					    if(empty === 'true' && email === 'true' && number === 'true'){
					    	//console.log(empty + ' ' + email + ' ' + number)
					    	$.ajax({
							  type:settings.type,
							  url:php,
							  data:dataInput,
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
						  data:dataInput,
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
			//check settings for default data type, default is Form.serialize();
					
			if(settings.data === 'default'){
				dataInput = form.serialize();
			}else{
				dataInput = settings.data;
			}

			if(validated === 'true'){
				for(i=0;i<3;i++){
			    	settings.Validation[i]();
			    }
			    if(empty === 'true' && email === 'true' && number === 'true'){
			    	$.ajax({
					  type:settings.type,
					  url:php,
					  data:dataInput,
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
				  data:dataInput,
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
	    	empty = 'false';
	    	var found = false;
	    	var exists = false;
	    	$('form').find('*').each(function(){
	    		var attr = $(this).attr('data-empty');
				if (typeof attr !== typeof undefined && attr !== false) {
				    exists = true;
		    		if($(this).attr('data-empty') === 'true'){
		    			if($(this).val() === ''){
		    				found = true;
		    			}else{
		    				empty = 'true';
		    			}
		    		}
		    	}else {

		    	}
	    	}); 
	    	if(exists === true){ 
		    	if(found === true){
		    		empty = 'false';
		    		settings.emptyError.call();
		    	}
			}else{
				empty = 'true';
			}
		}
		function emailValidation(){
			email = 'false';
			var found = false;
			var exists = false;
			var val = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			$('form').find('*').each(function(){
				var attr = $(this).attr('data-email');
				if (typeof attr !== typeof undefined && attr !== false) {
				    exists = true;
		    		if($(this).attr('data-email') === 'true' && empty === 'true'){
		    			if(val.test($(this).val()) === false){
		    				found = true;
		    			}else{
		    				email = 'true';
		    			}
		    		}
		    	}else {

		    	}
	    	});  
	    	if(exists === true){
		    	if(found === true){
		    		email = 'false';
		    		settings.emailError.call();
		    	} 
			}else {
				email = 'true';
			}
		}
		function numberValidation(){
			number = 'false';
			var found = false;
			var exists = false;
			$('form').find('*').each(function(){
				var attr = $(this).attr('data-number');
				if (typeof attr !== typeof undefined && attr !== false) {
				    exists = true;
				    if($(this).attr('data-number') === 'true' && empty === 'true' && email === 'true'){
		    			if(!$.isNumeric($(this).val())){
		    				found = true;
		    			}else{
		    				number = 'true';
		    			}
		    		}
				}else{

				}
	    	});
	    	if(exists === true){
		    	if(found === true){
		    		number = 'false';
		    		settings.numberError.call();
		    	} 
			}else {
				number = 'true';
			}
		}
	};
}( jQuery ));



