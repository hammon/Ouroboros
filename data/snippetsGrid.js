Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.toolbar.Paging'
]);





Ext.define('SnippetModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'snippet',  type: 'string'}//,
//        {name: 'id',  type: 'int'}
    ]
});

function scrollToTextSelection(e){
	//alert(e.currentTarget.innerText)
	location.hash = e.currentTarget.attributes["id"].value.replace("snip","");
	trackEvent("snippetsGrid.scrollToTextSelection",e.currentTarget.innerText);
}



function createSnippetsGrid(arrData){//ngramDir

	// create the Data Store
	var store = Ext.create('Ext.data.ArrayStore', {
		model: 'SnippetModel',
		autoLoad: true,
		autoSync: true,
		data: arrData
	});
	
	// create the grid
	var grid = Ext.create('Ext.grid.Panel', {
	    store: store,
	   // region: "north",
	    //height: '50%',
	    //border: true,
	    //minHeight: 80,
	    //flex: 1,
        //minHeight: 80,
        //split: true,
	    autoRender: true,
	    autoScroll: true,
	    layout: 'fit',
	    columns: [
	        {text: "Snippet", dataIndex: 'snippet',flex: 1, sortable: true}//,, width: '100%'
//	        {text: "id", dataIndex: 'id', sortable: true, hidden:true}
	    ],
        listeners: {
        	selectionchange:{
            	fn: function( /*Ext.selection.Model*/ that, /* Ext.data.Model[]*/ selected,/* Object*/ eOpts ){
            		//alert(JSON.stringify(selected[0].data));
            		//var tabs = chrome.extension.getBackgroundPage().tabs;
            		
            		//ngramsGrid.getStore().loadData(tabs.get(selected[0].data.id).ngramer.getTokensCountJson(1));
            		
    				
    				//showExtensions(selected[0].data.Name);
            	}
            }
        }
	    
	});
	
	return grid;
}