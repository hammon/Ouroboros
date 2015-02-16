
Ext.require(['*']);


Ext.onReady(function(){

   Ext.create('Ext.Viewport',{
       //title: 'FB',
           layout: {
               type: 'border',
               padding: 5
           },
           defaults: {
              collapsible: true,
              split: true,
             // bodyPadding: 10
           },
           items: [
                         Ext.create('Ouroboros.SplitView',{
                            region:'west',
                            width: 325,
                            items: [
                                Ext.create('Ouroboros.FilesTree',{
                                    region:'center',
                                  //  floatable: false,
                                  //  margin: '5 0 0 0',
                                    //width: 225,
                                    minWidth: 100,
                                }),
                                Ext.create('Ouroboros.NgramsGrid',{
                                    region:'south',
                                    id:'ngramsGrid'
                                //    floatable: false,
                                 //   margin: '5 0 0 0',
                                  //  width: 225,
                                  //  minWidth: 100,
                                })
                            ]
                         }),

                        Ext.create('Ouroboros.SplitView',{
                            region:'center',
                           // width: 225,
                            items: [
                            Ext.create('Ouroboros.SnippetsGrid',{
                             region:'center',
                             id: 'snippetsGrid'
                            //  floatable: false,
                            //  margin: '5 0 0 0',
                             //width: 225,
                            // minWidth: 100,
                            }),
                            Ext.create('Ouroboros.TextView',{
                             region:'south',
                             id:'textView'
                            //    floatable: false,
                            //   margin: '5 0 0 0',
                            //  width: 225,
                            //  minWidth: 100,
                            })
                            ]
                        })


//                        ,

//                Ext.createWidget('tabpanel', {
//                        id: 'mainTabs',
//                        region: 'center',
//                        collapsible: false,
//                        activeTab: 0,
////                        defaults :{
////                            bodyPadding: 10
////                        },
//                        items: [
////                        {
////                            html: '<h2>Main Page</h2><p>This is where the main content would go</p>',
////                            title: 'Short Text',
////                            closable: true
////                        },
//                        {
//                            html: '<h2>Environment configuration</h2><p>Wellcome!</p>',
//                            title: 'Environment configuration'
//                        }]
//                    })
           ]//,

       });


//loadEnvs();

});


