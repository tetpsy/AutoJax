//AutoJax | Copyright 2016 | Kieran Harris | South Africa | Free to use by anyone, anywhere.
(function($){
    //Defines AutoJax Function
    $.fn.autojax = function(options) {
      //Defines variables, and default options
      
      var form = this,php;
      //Submit form with ajax
      form.submit(function(event){
        //prevent Default form sending
        event.preventDefault();
        event.stopPropagation();
        //set PLugin defaults
        var defaults = {
            type:'POST',
            customUrl:'false',
            data:form.serialize(),
            sentCallback : function() {},
            errorCallback : function() {}
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
      });
        return form;
    };
}( jQuery ));