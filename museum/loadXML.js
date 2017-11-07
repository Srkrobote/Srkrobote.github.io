//图片地址
var imgArr = [];
// 加载xml文档
       function loadXML(xmlFile, tingID) {
           imgArr = [];
           var xhr = new XMLHttpRequest();
           xhr.open('GET', xmlFile, true);
           xhr.send();
           xhr.onreadystatechange = function(){
               if ( xhr.readyState == 4 && xhr.status == 200 && xhr.responseText.length > 0) {
                    getPicURL(xhr.responseText, tingID);
               } else {
               }
           };
        }
//获取图片url
function getPicURL(xmlDoc, tingID) {
//创建文档对象
    var parser=new DOMParser();
    var xml=parser.parseFromString(xmlDoc,"text/html");
    //提取数据
    var ting = xml.getElementsByTagName('ting');
    for(var i = 0; i < ting.length; i++){
        if(ting[i].id == tingID){   //得到当前大厅
         var pic_arr = ting[i].getElementsByTagName('picture');
         for(var j = 0; j < pic_arr.length; j++){
             imgArr[j] = pic_arr[j].getElementsByTagName('path')[0].firstChild.nodeValue;
             CreateTex(imgArr[j], pic_arr[j].id);  //创建THREE.Texture对象
         }
        }
    }
        console.log("QQQ", imgArr);
}
