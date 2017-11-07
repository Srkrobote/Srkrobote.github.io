/**
 * Created by song on 2017/9/22.
 */
// ArrayBuffer转为字符串，参数为ArrayBuffer对象
var getPic1;
var isConnected = false;
function ab2str(buf)
{
    var ia=new Uint16Array(buf);
    var str="";
    for(var i=0;i<ia.length;i++)
    {
        str=str+String.fromCharCode(ia[i]);
    }
    return str;
}

function processData(ab)
{

    //取出返回数据的前4个字节
    //转化为整数，获得类型编号
    var type = new Int32Array(ab.slice(0,4));
    if(type[0]==3)
    {//字符串
        //获取字符串字节
        getPic1=ab2str(ab.slice(4));
    }
    else if(type[0]==1)
    {//整数
        var intVal=new Int32Array(ab.slice(4));
    }
    else if(type[0]==2)
    {//浮点数
        var floatVal=new Float32Array(ab.slice(4));
    }
}

function sendInt(socket,val)
{
    var b = new ArrayBuffer(8);
    var i = new Int32Array(b);
    i[0]=1;
    i[1]=val;
    socket.send(b);
}

function sendFloat(socket,val)
{
    var b = new ArrayBuffer(8);
    var i = new Int32Array(b);
    var f = new Float32Array(b);
    i[0]=2;
    f[1]=val;
    socket.send(b);
}

// 字符串转为ArrayBuffer对象，参数为字符串
function sendString(socket,str)
{
    //总字节数为字符串类型整数4字节加字符串字符数乘以2个字节（每个字符16比特）
    var buf = new ArrayBuffer(str.length*2+4);
    //字符串类型号3
    var buf32View = new Uint32Array(buf);
    buf32View[0]=3;
    //字符串数据字节（每个字符2个字节）
    var buf16View = new Uint16Array(buf);
    for (var i=0,strLen=str.length; i<strLen; i++)
    {
        buf16View[i+2] = str.charCodeAt(i);
    }
    socket.send(buf);
}

var socket;
if (!window.WebSocket)
{
    window.WebSocket = window.MozWebSocket;
}
if (window.WebSocket)
{
    socket = new WebSocket("ws://localhost:9999/ws");
    socket.binaryType = "arraybuffer" ;
    socket.onmessage = function(event)
    {
        // var ta = document.getElementById('taLog');
        if(!(event.data instanceof ArrayBuffer))
        {
          //  ta.value = ta.value + '\n' + event.data
        }
        else
        {
            processData(event.data);
        }
    };
    socket.onopen = function(event)
    {
        // var ta = document.getElementById('taLog');
        // ta.value = "连接开启!";
        console.log("连接开启");
         send(123);

    };
    socket.onclose = function(event)
    {
        // var ta = document.getElementById('taLog');
        // ta.value = ta.value + "\n连接被关闭";
        console.log("连接被关闭");
    };
} else
{
    alert("你的浏览器不支持 WebSocket！");
}

function send(message)
{
    console.log("进入send");
    if (!window.WebSocket)
    {
        console.log("被返回了");
        return;
    }
    if (socket.readyState == WebSocket.OPEN)
    {
        //sendInt(socket,16);
       // sendFloat(socket,16.88);
        sendString(socket,message);
        console.log("已发送");
    } else
    {
        alert("连接没有开启!");
    }
}