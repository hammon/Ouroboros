
//Ext.Loader.setConfig({
//    enabled: true
//});
//
Ext.Loader.setPath('Ext.ux', '../ux/');
//
Ext.require([
//  'Ext.panel.Panel',
  'Ext.button.Button',
//  'Ext.window.Window',
  'Ext.ux.statusbar.StatusBar',
  'Ext.toolbar.TextItem',
//  'Ext.menu.Menu',
  'Ext.toolbar.Spacer',
//  'Ext.button.Split',
//  'Ext.form.field.TextArea'
]);

var mainStatusbar = null;



function createMainStatusBar(){
	mainStatusbar = Ext.create('Ext.ux.StatusBar', {
        id: 'main-statusbar',

        // defaults to use when the status is cleared:
        defaultText: 'Ready',
        //defaultIconCls: 'default-icon',
    
        // values to set initially:
        text: 'Ready',
        //iconCls: 'x-status-valid',

        // any standard Toolbar items:
//        items: [
//            {
//                xtype: 'button',
//                text: 'Show Warning & Clear',
//                handler: function (){
//                    var sb = Ext.getCmp('main-statusbar');
//                    sb.setStatus({
//                        text: 'Oops!',
//                        //iconCls: 'x-status-error',
//                        clear: true // auto-clear after a set interval
//                    });
//                }
//            },
//            {
//                xtype: 'button',
//                text: 'Show Busy',
//                handler: function (){
//                    var sb = Ext.getCmp('main-statusbar');
//                    // Set the status bar to show that something is processing:
//                    sb.showBusy();
//                }
//            },
//            {
//                xtype: 'button',
//                text: 'Clear status',
//                handler: function (){
//                    var sb = Ext.getCmp('main-statusbar');
//                    // once completed
//                    sb.clearStatus(); 
//                }
//            },
//            '-',
//            'Plain Text'
//        ]
    });
	return mainStatusbar;
}

//var mainStatusBar = createMainStatusBar();