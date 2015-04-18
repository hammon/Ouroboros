
function addJsonTreeNode(treeNode,jsonNode){

    var nodeType = Object.prototype.toString.call(jsonNode);

    if(nodeType === "[object Object]"){
        for(var m in jsonNode){
            console.log("obj: " + m + " : " + jsonNode[m]);
            var t = Object.prototype.toString.call(jsonNode[m]);

            var treeObj = {"name":m,"type":t,"value":jsonNode[m],"leaf":true};
            if(t === "[object Object]" || t === "[object Array]" ){
                treeObj.leaf = false;
            }
            var childTreeNode = treeNode.appendChild(treeObj);

            addJsonTreeNode(childTreeNode,jsonNode[m]);
        }
    }
    else if(nodeType === "[object Array]"){
        for(var i = 0; i < jsonNode.length;i++){
            console.log("arr: " + i + " : " + jsonNode[i]);
            var t = Object.prototype.toString.call(jsonNode[i]);

            var treeObj = {"name":i,"type":t,"value":jsonNode[i],"leaf":true};
            if(t === "[object Object]" || t === "[object Array]" ){
                treeObj.leaf = false;
            }
            var childTreeNode = treeNode.appendChild(treeObj);
            //var childTreeNode = treeNode.appendChild({"name":i,"type":t,"value":jsonNode[i]});

            addJsonTreeNode(childTreeNode,jsonNode[i]);
        }
    }
//    else{
//        console.log("jsonNode: " + " : " + jsonNode);
//    }

}


Ext.define('Ouroboros.JsonTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.jsontree',

    id: 'jsonTree',
    title: 'JSON',
    rootVisible: false,

    plugins:[
        Ext.create('Ext.grid.plugin.CellEditing', {
          clicksToEdit:2
        })
      ],

//    requires: [
//            'Ext.data.*',
//            'Ext.grid.*',
//            'Ext.tree.*',
//            'Ext.ux.CheckColumn'
//
//        ],

    xtype: 'tree-grid',//'tree-reorder',

    columns: [{
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Name',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name',
                    editor:{
                      xtype:'textfield'
                    }
                },
                {
                   // xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Type',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'type'
                },
                {
                   // xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Value',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'value',
                    editor:{
                      xtype:'textfield'
                    }
                }
//                {
//                    xtype: 'datecolumn',
//                    format: 'Y-m-d H:i:s',
//                    text: 'lastModified',
//                    flex: 1,
//                    sortable: true,
//                    dataIndex: 'lastModified'
//                },
//                {
//                    xtype: 'checkcolumn',
//                    header: 'selected',
//                    dataIndex: 'selected',
//                    width: 55,
//                    stopSelection: false,
//                    menuDisabled: true,
//                    listeners: {
//                        checkchange: function( that, rowIndex, checked, eOpts ) {
//                            //Ext.Msg.alert('Editing' + (record.get('selected') ? ' completed task' : '') , record.get('text'));
//                            console.log("checkchange" + rowIndex + " checked " + checked);
//
//                            var arrSelected = [];
//
//                            var findSelected = function(node){
//                                node.eachChild(function(n){
//                                    //console.log(n.data.text + " " + n.data.selected);
//                                    if(n.data['selected'] == true){
//                                        console.log(">>>> " + n.data.text + " " + n.data.selected);
//                                        arrSelected.push(n.getPath('text'));
//                                    }
//                                });
//
//                                if(node.childNodes.length > 0){
//                                    node.eachChild(findSelected);
//                                }
//                            }
//
//                           findSelected( that.up().up().getStore().getRootNode());
//
//                           console.log("arrSelected: " + JSON.stringify(arrSelected));
//
//                        }
//                    }
//                }
        ],
    initComponent : function(){

        this.store = Ext.create('Ext.data.TreeStore', {
             root: {
                 text: 'Root',
                 expanded: true
             },
             folderSort: true,
             fields: [
                  {name: 'name',  type: 'string'},
                  {name: 'type',  type: 'string'},
                  {name: 'value',  type: 'string'}
             ]
                             //, lastModified
//             sorters: [{
//                 property: 'text',
//                 direction: 'ASC'
//             }]
         });

         this.viewConfig = {
             plugins: {
                 ptype: 'treeviewdragdrop',
                 containerScroll: true
             }
         };

        var treeStore = this.getStore();
        var root = treeStore.getRootNode();

        http.get("/api/text?path=home/michael/dev/Ouroboros/src/main/resources/webStatic/task.json",function(res){
            console.log(res);

            var jsonObj = JSON.parse(res);

            addJsonTreeNode(root,jsonObj);
            //Object.prototype.toString.call(jsonObj.task.arr)

//            filesArr.forEach(function(file){
//                root.appendChild(file);
//            });

//            treeStore.sort([
//                {
//                    property : 'text',
//                    direction: 'ASC'
//                }
//            ]);
        });


         this.callParent(arguments);
    },



    listeners: {
        //itemclick: function( that, record, item, index, e, eOpts) {
        select : function( that, record, index, eOpts ){

//            var path = "task.json";//record.getPath('text','/').replace('/Root/','');
//
//            if(record.data.leaf === false){
//
//                 http.get("/api/files?op=list&path=" + path,function(res){
//                    console.log(res);
//
//                    record.removeAll();
//                    var filesArr = JSON.parse(res);
//
//                    filesArr.forEach(function(file){
//                        record.appendChild(file);
//                    });
//
//                    record.expand();
//                });
//            }
//            else{
//
//                http.get("/api/text?path=" + path,function(res){
//                    //console.log(res);
//
//                   Ext.getCmp('textView').update("<pre>" + res + "</pre>");
//                });
//
//                 http.get("/api/chargram?path=" + path,function(res){
//                    //console.log(res);
//
//                  //  var ngramsGrid = Ext.getCmp('ngramsGrid').getStore().loadData(JSON.parse(res));
//                 });
//
//                http.get("/api/ngram?path=" + path,function(res){
//                    //console.log(res);
//
//                    var ngramsGrid = Ext.getCmp('ngramsGrid').getStore().loadData(JSON.parse(res));
//                });
//            }



        }
    }
});