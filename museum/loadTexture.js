/**
 * 初始化贴图方法
 */
var texLoader = new THREE.ImageLoader();
var time = 0;
var tex_arr = [];
function CreateTex(tex, id ) {
    var mytexture = new THREE.Texture();
    texLoader.load( tex, function ( image ) {
        mytexture.image = image;
        mytexture.needsUpdate = true;
        tex_arr[id-1] = mytexture;
    } );
}