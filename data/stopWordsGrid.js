Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.toolbar.Paging'
]);


function createStopWordsGrid(arrData){//ngramDir

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
	    title : "Stop Words",
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
	    //tbar: [	cmbNgramView],
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
            		
            		trackEvent("stopWordsGrid.select",ngram);
            	}
            },
            
            itemdblclick : {
            	fn: function( that, record, item, index, e, eOpts ){
            		
            		that.getStore().remove(record);    
            		ngramsGrid.getStore().add(record);    
            		
            		var index = viewSettings.stopWords[viewSettings.currentNgram].indexOf(record.data.str);
            		if(index!=-1){

            			viewSettings.stopWords[viewSettings.currentNgram].splice(index, 1);
            		}

            		chrome.storage.local.set({"viewSettings" : viewSettings});
            		//alert("str: " + record.data.str + " count: " + record.data.count);
            		
            		trackEvent("stopWordsGrid.removeStopword",record.data.str);
            	}
            }
            
        }
	    //renderTo:'ngram-grid-div',
	//    width: 540,
	//    height: 200
	});
	
	return grid;
}