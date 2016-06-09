# AutoJax V1.8
Automatically handles the Ajax Php form process with jQuery.
A plugin that helps make the Ajax Php submit process a lot simpler.

//UPDATES v1.8
---------

//Added Validation, plugin now has options to check if any input is filled in, if its a valid email address, or if its a valid number. each error has its own callback. 

//Added support for custom function placement, so you can now add this ajax plugin to your own function rather than the default submit function, for example if you want this to run in a click function or on page load.

-------------------

Purpose
-------

To send PHP forms with ajax and to get php data from a server faster.
this plugin is not limited to forms and can be used for other ajax requests.

Basic Useage
------------

1 - Add a simple HTML form

	<form action="send.php">
		<input type="text" name="name" placeholder="Name">
		<input type="text" name="email" placeholder="Email">
		<textarea name="message" placeholder="Message"></textarea>
		<input type="submit" name="submit">
	</form>

2 - Include these scripts in this order ( any jQuery will do ).

	<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.0.min.js"></script> 
	<script type="text/javascript" src="autojax.min.js"></script> 

3 - Call the function after the above scripts.

	$('form').autojax();

4 - Thats it, all done, here are some more options and instructions.

	Custom parameters.

	$('form').autojax({
		type:'POST' //Change the ajax type, default is POST
		customUrl:'false', // If left out, the url used in <form action=""> will be used, if you add an url here, it will override the action="" url. e.g customUrl:'custom.php'
		data:form.serialize(), //what data will be sent, default is the form's elements values.
		sentCallback:function(){
		  //callback if ajax is successful
		  alert(data);
		},
		errorCallback:function(){
		  //callback if ajax isn't successful
		}
	});

 
Updated Useage | Advanced
-------------------------

The updated options are as follows.

	method:'submit' //submit is the default and will fire AutoJax in a form.submit() function, if you set this to 'custom' it will fire ajax outside of a function, allowing you to run autojax() within your own function ie click().
	
	useValidation:'false' //if set to 'true' AutoJax will use validation where specified.


Add validation to your ajax form
--------------------------------

If you would like to add validation to your form you can do so by specifying in your html and in AutoJax. Here is how.

There are now three html attributes that let AutoJax know that you want to check for validation.

	data-empty="true"
	data-email="true"
	data-number="true"

add any of these to your input and it is ready to be checked by AutoJax.

example

	<input type="text" name="name" placeholder="Name" data-empty="true" data-number="true">
	<input type="text" name="email" placeholder="Email" data-email="true">

The first input will be checked to see if it is not empty and if it is not a number, the second one will be checked to see if it is a valid email.

Once you have added these attributes you must call AutoJax with some custom options

	//Basic AutoJax call
	$('form').autojax({
		sentCallback:function(){
			//alert(data);
		}
	});
	
	//Validated AutoJax call
	$('form').autojax({
		useValidation:'true',
		sentCallback:function(){
			//alert(data);
		},
		emptyError : function() {
			//alert('one or more fields are empty');
		},
		emailError : function() {
			//alert('not an email address');
		},
		numberError : function() {
			//alert('not an number');
		}
	});


Adding AutoJax to a custom function
-----------------------------------

If you want to run AutoJax within your own function or onload etc, simply add the following to your call.

	method:'custom'
	//please note only 'submit' and 'custom' strings will work here. default is 'submit'.

Now AutoJax will fire straight away, allowing you to call it in a custom function.


