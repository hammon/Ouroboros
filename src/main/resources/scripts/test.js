print("Hello Ouroboros!");


for(var m in this){
    print(m + "\n");
}


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

