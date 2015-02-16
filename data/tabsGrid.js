Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.toolbar.Paging'
]);





Ext.define('TabInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'icon',  type: 'string'},
        {name: 'title',  type: 'string'},
        {name: 'url',  type: 'string'},
        {name: 'id',  type: 'int'}
    ]
});



function createTabsGrid(arrData){//ngramDir

	// create the Data Store
	var store = Ext.create('Ext.data.ArrayStore', {
		model: 'TabInfo',
		autoLoad: true,
		autoSync: true,
		data: arrData
	});
	
	// create the grid
	var grid = Ext.create('Ext.grid.Panel', {
	    store: store,
	    region: "center",
	    //height: '100%',
	    
	    split: true,
	    //autoRender: true,
	    autoScroll: true,
	    layout: 'fit',
	    
        flex: 1,
        minHeight: 80,
//        split: true,
//	    autoRender: true,
//	    autoScroll: true,
//	    layout: 'fit',
	    columns: [
	        {text: " ", dataIndex: 'icon',width:30},
	        {text: "Title", dataIndex: 'title', flex: 1,sortable: true},
	        {text: "Url", dataIndex: 'url', sortable: true, hidden:true},
	        {text: "id", dataIndex: 'id', sortable: true, hidden:true}
	    ],
        listeners: {
        	selectionchange:{
            	fn: function( /*Ext.selection.Model*/ that, /* Ext.data.Model[]*/ selected,/* Object*/ eOpts ){
            		//alert(JSON.stringify(selected[0].data));
            		if(selected.length > 0){
            			trackEvent("tabsGrid.select",selected[0].data.url);
            			var tabId = selected[0].data.id;
                		viewSettings.selectedTabId = tabId;
                		
                		updateNgrams(tabId);
            		}
            		
            		
            		
            		//var tabs = chrome.extension.getBackgroundPage().tabs;
            		//ngramsGrid.getStore().loadData(tabs.get(selected[0].data.id).ngramer.getTokensCountJson(viewSettings.currentNgram));
            		
    				
    				//showExtensions(selected[0].data.Name);
            	}
            }
        }
	    
	});
	
	return grid;
}