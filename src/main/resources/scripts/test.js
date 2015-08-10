

runner.load("../../src/main/resources/scripts/esprima.js");

print(JSON.stringify(esprima.parse(runner.readFile("/home/michael/dev/Ouroboros/src/main/resources/webStatic/js/json/jsonTree.js"))));


//var FileInputStream = java.io.FileInputStream;
//var Properties = java.util.Properties;
//
//var props = new Properties();
//
//props.load(new FileInputStream("./conf/test.properties"));
//
//print(props.getProperty("test"));
//print(props.getProperty("test2"));





//print("Hello Ouroboros!\n" + runner.getWorkingDir());
//
//
//
//
for(var m in this){
    print(m + " type: " + typeof this[m] + "\n");
}
//
//


//getMethods(this);

//getMethods(http);

//getMethods(es);

//print("typeof: " + typeof(es) + "\n");
//
////var JavaClass = Java.type("java.lang.Class");
//
//var c = es.getClass();
//
//print("typeof c: " + typeof(c) + "\n");
//
//print("getName: " + c.getName());
//
//var methodsArr = c.getDeclaredMethods();
//
//for (var i = 0;i < methodsArr.length;i++) {
// // if (method.getAnnotation(PostConstruct.class) != null) {
//    print(methodsArr[i].getName());
// // }
//}
////
////for(var m in proc){
////    print(m + "\n");
////}

function getMethods(obj){
    print("getName: " + obj.getClass().getName());
    var methodsArr = obj.getClass().getDeclaredMethods();
    for (var i = 0;i < methodsArr.length;i++) {

        print(methodsArr[i].getName());

    }
}

