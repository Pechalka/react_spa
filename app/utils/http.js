var $ = require('jquery');

$.ajaxSetup({ cache: false});

module.exports = {
    get : function(url, q){
        return $.get(url, q);
    },
    post : function(url, data){
        //return $.post(url, data)
        return $.ajax({
          url:url,
          type:"POST",
          data:JSON.stringify(data),
          contentType:"application/json; charset=utf-8",
          dataType:"json"
        })
    },
    del : function(url){
        return $.ajax({
            url : url,
            type : 'DELETE'
        })
    },
    put : function(url ,data){
        return $.ajax({
                url : url,
                type : 'PUT',
                contentType:"application/json",
                data : JSON.stringify(data)
            })
    }
}
