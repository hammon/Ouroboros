
var http = {
    get : function (url,callback){

    var start = Date.now();

        Ext.Ajax.request({
            method: 'GET',
            url: url,

            success: function(response){
                var end = Date.now();
                var total = end - start;

                var text = response.responseText;

                console.log("Request took: " + total + " size: " + text.length);


                //console.log("text:" + text);

                if(callback){
                    callback(text);
                }

                //updateRecommendations(text);
            },
            failure: function(response, opts) {
                var end = Date.now();
                var total = end - start;

                console.log("Request took: " + total + 'server-side failure with status code ' + response.status);
            }
        });
    }
};



