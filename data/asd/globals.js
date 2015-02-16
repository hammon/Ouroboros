var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36838841-1']);
_gaq.push(['_trackPageview']);

//(function() {
//	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//	  ga.src = 'https://ssl.google-analytics.com/ga.js';
//	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//})();

function trackEvent(event,param) {
    _gaq.push(['_trackEvent', event, param]);
};
  

var backGroundPage = chrome.extension.getBackgroundPage();
var viewSettings = backGroundPage.viewSettings;

(function() {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    // Like setTimeout, but only takes a function argument.  There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
})();

function setStatus(text,busy){
	var status = {};
	status.iconCls = (busy ? mainStatusbar.busyIconCls : '');
	status.text = text;
	mainStatusbar.setStatus(status);
}

function ngramsWorker(){
	
	var start = Date.now();
	var tabs = chrome.extension.getBackgroundPage().allTabs;
	var ngramer = tabs.get(processedTabId).ngramer;
	
	var json = ngramer.getTokensCountJson(viewSettings.currentNgram,viewSettings.minNgram,viewSettings.maxNgram);
	
	ngramsGrid.getStore().loadData(json.ngrams);
	stopWordsGrid.getStore().loadData(json.stopWords);
	
	var end = Date.now();
	var total = end - start;
	
	setStatus(viewSettings.currentNgram + "-grams: " + json.ngrams.length 
			+ " | stop words: " +  + json.stopWords.length 
			+ " | tokens: " + ngramer.tokens.length
			+ " | tokens without separators: " + ngramer.lowerTokensNoSeps.length
			+ " | processing time: " + total + " ms" ,false);
	
	ngramsGrid.getSelectionModel().select(0);
}

var processedTabId;
function updateNgrams(tabId){
	setZeroTimeout(function(){
		setStatus("Processing " + viewSettings.currentNgram + "-grams",true);
	});
	
	processedTabId = tabId;
	setZeroTimeout(ngramsWorker);	
}