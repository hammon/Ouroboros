 
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.lastIndexOf(str, 0) === 0;
  };
}


var allTabs = new Ext.util.HashMap();
var url_to_tab = new Ext.util.HashMap();

var mainWnd = null;

var mainTabId = null;

var activeTabId = null;
var activeWndId = null;

//var stopWords = [];

var viewSettings = null;
chrome.storage.local.get("viewSettings",function(o){
	viewSettings = o.viewSettings || {currentNgram:1,stopWords:[],minNgram:2,maxNgram:100000};
	
});


function isSupportedUrl (url){
	if(url.startsWith("http://") 
			|| url.startsWith("https://") 
			|| url.startsWith("chrome://newtab")  
			|| url.startsWith("file:///")){
		return true;
	}
	else{
		return false;
	}
}

function getMain(){
	var views = chrome.extension.getViews();
	
	for(var i = 0;i < views.length;i++){
		if(views[i].location.pathname == "/main.html"){
			return views[i];
		}
	}
	return null;
}



//chrome.runtime.onInstalled.addListener(function() {
	
	
	
chrome.windows.getAll({populate:true}, function (arrWnd){
	console.log("chrome.windows.getAll");
	
	for(var i = 0;i < arrWnd.length;i+=1){
		for(var j = 0;j < arrWnd[i].tabs.length;j+=1){
			var tab = arrWnd[i].tabs[j];
			if(isSupportedUrl(tab.url)){
				console.log("SupportedUrl: " + tab.url);
				allTabs.add(tab.id,tab);				
				//url_to_tab.add(tab.url,tab.id);
				//chrome.tabs.executeScript(tab.id,{file:"js/get_content.js",allFrames :false},function(results){
				
				var code = "var res = {\"tabId\":" + tab.id + ",\"type\" : \"url_content\",\"url\" : window.location.href,\"title\" : window.document.title,\"innerText\" : document.body.innerText};res;"
				
				chrome.tabs.executeScript(tab.id,{code:code,allFrames :false},function(results){
					
					if(results != undefined){
						console.log("chrome.tabs.executeScript tab: " + results[0].tabId + " results: " + results[0].url);
						addUrlData(results[0]);
					}
					
					console.log("chrome.tabs.executeScript chrome.runtime.lastError: " + JSON.stringify(chrome.runtime.lastError));
				});
			}
		}
	}
});
	

function addUrlData(data){
	console.log("addUrlData:" + data.url);
	if(isSupportedUrl(data.url)){
		//var tab = tabs.get(url_to_tab.get(data.url));
		var tab = allTabs.get(data.tabId);
		tab.title = data.title;
		//tab.url = data.url;
		//tab.title = data.title;
		//tab.text = data.innerText;
		tab.ngramer = new Ngramer(data.innerText,viewSettings.stopWords);
		//url_to_tab.removeAtKey(data.url);
		
		
		if(mainTabId == null){
			return;
		}
		mainWnd = getMain();
		
		if(mainWnd == null){
			console.log("addUrlData - mainWnd == null");
			return;
		}
		var grid = mainWnd.tabsGrid;
		
		
		var rec = grid.getStore().findRecord('id',tab.id);
		
		if(rec == null){
			console.log("addUrlData rec = grid.getStore().findRecord rec == null");
			mainWnd.tabsGrid.getStore().add({icon:"<img src='" + tab.favIconUrl + "' width='16' height='16' alt='" + tab.title + "' />",title:tab.title,url:tab.url,id:tab.id});
		}
		else{
			rec.beginEdit();
			rec.set("icon","<img src='" + tab.favIconUrl + "' width='16' height='16' alt='" + tab.title + "' />");
			rec.set("title",tab.title);
			rec.set("url",tab.url);
			rec.endEdit();
		}
		
		
		//grid.store.commitChanges();
		
//		if(!this.gui){
//			console.log("SessionInfo.addUrlData no gui!!!");
//			return;
//		}
//		this.gui.updateTabInTable(tab.id);
	}
}

//chrome.extension.onConnect.addListener(function(port) {
//	port.onMessage.addListener(function(data) {
//		console.log("chrome.self.onConnect: " + data.url);
////		if(!sessionInfo.isSupportedUrl(data.url)){
////			return;
////		}
////		
//		addUrlData(data);
//		
//
//	});
//});


 
console.log("Background.html");
chrome.browserAction.onClicked.addListener(function(tab) {

	console.log("Hello from text analyzer");
	
	if(mainTabId == null){
		chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
			activeTabId = tabs[0].id;
			
			chrome.tabs.create({url:chrome.extension.getURL('main.html')}, function (tab){
				console.log("chrome.browserAction.onClicked chrome.tabs.create main.html" + tab.id);

				mainTabId = tab.id;
				mainWnd = getMain();
				
				//var index = mainWnd.tabsGrid.getStore().find("id",activeTabId);
				//mainWnd.tabsGrid.getSelectionModel().select(index);
			});
		}); 
	}
	else{
		mainWnd = getMain();
		
		chrome.tabs.update(mainTabId,{active:true},function(tab){
			var index = mainWnd.tabsGrid.getStore().find("id",activeTabId);
			mainWnd.tabsGrid.getSelectionModel().select(index);
		});
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo){
	console.log("chrome.tabs.onActivated tab: " + JSON.stringify(activeInfo));
	
	chrome.tabs.get(activeInfo.tabId, function(tab){
		if(isSupportedUrl(tab.url)){
			if(activeInfo.tabId != mainTabId){
				activeTabId = activeInfo.tabId;
				activeWndId = activeInfo.windowId;
			}
		}
	});
});


chrome.tabs.onCreated.addListener(function(tab) {
	console.log("chrome.tabs.onCreated tab: " + JSON.stringify(tab));
	//sessionInfo.addTab(tab);
	
	if(!isSupportedUrl(tab.url)){
		return;
	}
	
	//url_to_tab.add(tab.url,tab.id);
	allTabs.add(tab.id,tab);
	
	mainWnd = getMain();
	
	if(mainWnd != null){
		mainWnd.tabsGrid.getStore().add({icon:"<img src='" + tab.favIconUrl + "' width='16' height='16' alt='" + tab.title + "' />",title:tab.title,url:tab.url,id:tab.id});
	}
	
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	console.log("chrome.tabs.onRemoved : " + tabId);

	
	if(tabId == mainTabId){
		mainTabId = null;
		mainWnd = null;
		return;
	}
	
	allTabs.removeAtKey(tabId);
	
	if(mainWnd == null){
		console.log("onRemoved - mainWnd == null");
		return;
	}
	
	
	
	var grid = mainWnd.tabsGrid;
	
	var rec = grid.getStore().findRecord('id',tabId);
	
	grid.getStore().remove(rec);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	console.log("chrome.tabs.onUpdated : " + changeInfo.status + " tab: " + tabId + " url: " + tab.url);
	if (changeInfo.status == "complete") {
		
		if(!isSupportedUrl(tab.url)){
			return;
		}
		
		//url_to_tab.add(tab.url,tabId);
		allTabs.add(tab.id,tab);
		
		var code = "var res = {\"tabId\":" + tab.id + ",\"type\" : \"url_content\",\"url\" : window.location.href,\"title\" : window.document.title,\"innerText\" : document.body.innerText};res;"
		chrome.tabs.executeScript(tab.id,{code:code,allFrames :false},function(results){
			if(results != undefined){
				console.log("chrome.tabs.onUpdated executeScript tab: " + results[0].tabId + " callback: " + results[0].url);
				addUrlData(results[0]);
			}
			
		});
		
	}
});//chrome.tabs.onUpdated