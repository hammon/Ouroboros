
Ext.require(['*']);


Ext.onReady(function(){

   Ext.create('Ext.Viewport',{
       layout: {
           type: 'border',
           padding: 5
       },
       defaults: {
          collapsible: true,
          split: true
       },
       items: [
        Ext.createWidget('tabpanel', {
            id: 'mainTabs',
            region: 'center',
            collapsible: false,
            activeTab: 0,
            items: [
                Ext.create('Ouroboros.SplitView',{
                    region:'center',
                    title: 'Files',
                    items: [
                        Ext.create('Ouroboros.SplitView',{
                            region:'west',
                            width: 325,
                            items: [
                                Ext.create('Ouroboros.FilesTree',{
                                    region:'center',
                                    minWidth: 100,
                                }),
                                Ext.create('Ouroboros.NgramsGrid',{
                                    region:'south',
                                    id:'ngramsGrid'
                                })
                            ]
                         }),
                        Ext.create('Ouroboros.SplitView',{
                            region:'center',
                            items: [
                            Ext.create('Ouroboros.SnippetsGrid',{
                                region:'center',
                                id: 'snippetsGrid'
                            }),
                            Ext.create('Ouroboros.TextView',{
                             region:'south',
                             id:'textView'
                            })
                            ]
                        })
                    ]
                }),
                {
                    html: '<h2>Web</h2><p>Wellcome!</p>',
                    title: 'Web'
                }]
            })
        ]
   });
});
