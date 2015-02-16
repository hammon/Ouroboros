Ext.require(['*']);





var mainView = null;


var tabsGrid = null;
var ngramsGrid = createNgramGrid([["  ",1],["  ",2]]);

var ngramsToolbar = createNgramsToolbar();
var stopWordsGrid = createStopWordsGrid([[" ",1],["  ",2]]);

var snippetsGrid = createSnippetsGrid([["Hello"]]);
var textContent = null;
//{
//      //title: 'South Eastern',
//      region: 'south',
//      height: '50%',
//      //flex: 1,
//      minHeight: 80,
//      //html: 'South Eastern',
//      split: true,
//      //collapsible: true,
//      html: "<div id='ngram-grid-div' >Hello</div>"
//      //collapsible: true
//  }

function getTabsArr(){
	var tabs = chrome.extension.getBackgroundPage().allTabs.getValues();
	var arr = [];
	for(var i = 0;i < tabs.length;i++){
		
		arr.push(["<img src='" + tabs[i].favIconUrl + "' width='16' height='16' alt='" + tabs[i].title + "' />",tabs[i].title,tabs[i].url,tabs[i].id]);
	}
	
	return arr;
}

Ext.onReady(function() {
    var cw;
    
    tabsGrid = createTabsGrid(getTabsArr());
    
        
    textContent = Ext.create('Ext.panel.Panel', {
       // title: 'Hello',
        //autoRender: true,
	    autoScroll: true,
	    border: true,
	    //layout: 'fit',
	    //anchor: '100% 100%',
	    //region: "south",
        html: '<p>Text Content</p>'//,
        //renderTo: Ext.getBody()
    });
    
    mainView = Ext.create('Ext.Viewport', {//
    	
    	listeners: {
    		afterrender:{
            	fn: function(that){
            		//ngramsToolbar.doAutoRender();
            		
            		var index = tabsGrid.getStore().find("id",backGroundPage.activeTabId);
            		if(index != -1){
            			tabsGrid.getSelectionModel().select(index);
            		}
        			
        			//ngramsGrid.getStore()
            	}
        	}
    	},
    	
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        //bbar: createMainStatusBar(),
        items: [
		{
            region: 'west',
            layout: 'border',
            //layout: 'fit',
//            layout: {
//                type: 'border',
//                padding: 5
//            },
            collapsible: true,
            //title: 'Left',
            split: true,
            width: '30%',
            minWidth: 100,
            minHeight: 140,
            items:[tabsGrid ,Ext.createWidget('tabpanel', {
                activeTab: 0,
                plain: true,
                region: "south",
        	    //height: '50%',
                flex: 1,
                minHeight: 80,
                split: true,
                defaults :{
                    autoScroll: true,
                    bodyPadding: 1
                },
                tbar: [ngramsToolbar],
                items: [ngramsGrid,stopWordsGrid]
            })]
            

            //html: "<div id='dir-tree-div' ></div><br/><div id='ngram-grid-div' ></div>"
        },
//        centralTabs,
        {
            region: 'center',
            layout: 'border',
//            layout: {
//                type: 'border',
//                padding: 5
//            },
            split: true,
    //        html:"Hello center",
   //         border: false//,
            items: [{
                layout: 'fit',
                region: 'center',
                split: true,
                height: '50%',
                flex: 1,
                minHeight: 150,
                items: snippetsGrid
            },    
            {
                layout: 'fit',
                region: 'south',
                split: true,
                height: '50%',
                flex: 1,
                minHeight: 150,
                items: textContent
            }
             ]
           // html: "Hello"
   //         items: [centralTabs]
            
        },
        {
        	region: 'south',
        	//collapsible: true,
        	maxHeight: 23,
        	minHeight: 23,
        	//title: 'south',
            //layout: 'border',
            //split: true,
            bbar: createMainStatusBar()
            //items:[createNgramsToolbar()]
        }
    ]
    });
});