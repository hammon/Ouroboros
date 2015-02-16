
var window = {};
window.Date = Date;
window.JSON = JSON;
window.navigator = navigator;
window.location = {};
window.location.protocol = {};
window.addEventListener = function(){};

var document = {};
document.getElementsByTagName = function(){return [];};
document.head = {};
document.documentElement = {};
document.documentElement.style = {};
document.addEventListener = function(){};
document.getElementById = function(){return {dom:{}};};

var DOC = document;

importScripts('ext-all.js');
//try{
//	
//	
//}
//catch(err){
//	
//	//console.log(JSON.stringify(err));
//	//self.postMessage(JSON.stringify(err));
//}

importScripts('ngramer.js');

self.onmessage = function(event) {
	
	var ngramer = new Ngramer(event.text,event.stopWords);
	
	var json = ngramer.getTokensCountJson(event.currentNgram,event.minNgram,event.maxNgram);
	
	self.postMessage(json);
};