# AutoJax V1.0
Automatically handles the Ajax Php form process with jQuery.

A plugin that helps make the Ajax Php process a lot simpler.


Purpose
-------

To send PHP forms with ajax and to get php data from server easier.

This is only the first version, future releases will include database integration, more customisable fields and more updates.


Useage
------

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
		customUrl:'false', // If left out the url used in <form action=""> will be used, if you add an url here ,it will override the action="" url. e.g customUrl:'Custom.php'
		data:form.serialize(), //what data will be sent, default is the form's elements values.
		sentCallback:function(){
		  //callback if ajax is successful
		  alert(data);
		},
		errorCallback:function(){
		  //callback if ajax isn't successful
		}
	});

 
