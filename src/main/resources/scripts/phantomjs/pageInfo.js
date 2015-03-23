var page = require('webpage').create(),
    system = require('system'),
    city,
    url;

if (system.args.length > 1) {
    url = Array.prototype.slice.call(system.args, 1).join(' ');
}

page.open(url, function(status) {
    var result, data;
    if (status !== 'success') {
        console.log('Error: Unable to access network!');
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
