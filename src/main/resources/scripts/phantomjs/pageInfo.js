var page = require('webpage').create(),
    system = require('system'),
    city,
    url;

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

phantom.onError = function(msg, trace) {
    //console.error("error: " + msg);
}

page.onError = function(msg, trace) {
    //console.error("error: " + msg);
}

if (system.args.length > 1) {
    url = Array.prototype.slice.call(system.args, 1).join(' ');
}

page.open(url, function(status) {
    var result, data;
    if (status !== 'success') {
        console.log('Error: Unable to access network! ' + status);
    } else {
        result = page.evaluate(function () {
            var res = {};
            res.title = document.title;
            res.text = document.body.innerText;

            var links = [];

            var list = document.getElementsByTagName("a");
            for(var i = 0;i < list.length;i++){
                var link = list.item(i);
                links.push({"href":link.href,"text":link.text});
            }

            res.links = links;

            return JSON.stringify(res);
        });

        console.log(result);
    }
    phantom.exit();
});
