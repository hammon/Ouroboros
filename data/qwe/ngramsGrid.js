Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.toolbar.Paging'
]);




//viewSettings.currentNgram = 1;
//viewSettings.stopWords = [];






Ext.define('Ngram', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'str',  type: 'string'},
        {name: 'count',   type: 'int'}
    ]
});


//function updateNgrams(dir,callback){
//	 Ext.Ajax.request({
//	        method: 'GET',
//	        url: 'NGram',
//	        params: { dir : dir },
//	        success: function( result, request ){
//	        	callback(result.responseText);
//	        }
//	    });
//}

function createNgramGrid(arrData){//ngramDir

	// create the Data Store
	var store = Ext.create('Ext.data.ArrayStore', {
	//var store = Ext.create('Ext.data.Store', {
		sortInfo: { field: "count", direction: "DESC" },
		autoLoad: true,
		autoSync: true,
		fields: [
		         {name: 'str',  type: 'string'},
		         {name: 'count',   type: 'int'}
		     ],
		data: arrData
	    //model: 'Ngram',
	});
	
	// create the grid
	var grid = Ext.create('Ext.grid.Panel', {
	    store: store,
	    title : "N-grams",
//	    region: "south",
//	    //height: '50%',
//        flex: 1,
//        minHeight: 80,
//        split: true,
	    autoRender: true,
	    autoScroll: true,
	    layout: 'fit',
	    columns: [
	        {text: "String", flex: 1, dataIndex: 'str', sortable: true},
	        {text: "Count", width: 180, dataIndex: 'count', sortable: true}
	    ],
	    //tbar: [	createNgramsToolbar()],
	    listeners: {
        	selectionchange:{
            	fn: function( /*Ext.selection.Model*/ that, /* Ext.data.Model[]*/ selected,/* Object*/ eOpts ){
            		
            		if(!selected || selected.length == 0){
            			return;
            		}
            		
            		var ngram = selected[0].data.str;
            		var tabs = chrome.extension.getBackgroundPage().allTabs;
            		
            		var ngramer = tabs.get(viewSettings.selectedTabId).ngramer;         		
            		var len = parseInt(viewSettings.currentNgram);
            		var snips = ngramer.getSnippets(ngram,len);
            		 		
            		snippetsGrid.getStore().loadData(snips);
            		
            		textContent.update("<pre>" + ngramer.getTextWithHighlightedKeywords(ngram,viewSettings.currentNgram) + "</pre>");
            		
            		var positions = ngramer.ngramPos[len].get(ngram);
            		for(var i = 0;i < positions.length;i++){
            			var ngramPos = ngramer.noSepsToSepsPos[positions[i]];
            			
            			var a = document.getElementById('snip' + ngramPos);
            			a.addEventListener('click', scrollToTextSelection);
            		}
            		
            		trackEvent("ngramsGrid.select",ngram);
            	}
            },
            
            itemdblclick : {
            	fn: function( that, record, item, index, e, eOpts ){
            		
            		that.getStore().remove(record);  
            		stopWordsGrid.getStore().add(record);
            		
            		if(viewSettings.stopWords[viewSettings.currentNgram]){
            			viewSettings.stopWords[viewSettings.currentNgram].push(record.data.str);
            		}
            		else{
            			viewSettings.stopWords[viewSettings.currentNgram] = [record.data.str];
            		}
            			
            		chrome.storage.local.set({"viewSettings" : viewSettings});
            		
            		trackEvent("ngramsGrid.addStopword",record.data.str);
            	}
            }
            
        }
	    //renderTo:'ngram-grid-div',
	//    width: 540,
	//    height: 200
	});
	
	return grid;
}