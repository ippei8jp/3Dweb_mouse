// デバッグ用のフラグ
const flag_wide_view = false;

// scene(シーン)の作成
const scene = new THREE.Scene();

// group(グループ)を作成してsceneに追加
const group = new THREE.Group();
scene.add(group);

// 描画領域の初期値はウィンドウサイズ
var clientWidth  = window.innerWidth;
var clientHeight = window.innerHeight;

const container = document.getElementById('container');
if (container) {
    // コンテナサイズに差し替え
    clientWidth  = container.clientWidth;
    clientHeight = container.clientHeight;
}

// camera(カメラ)の作成
// 通常のカメラパラメータ
var far_limit = 1000;
var cam_pos_y = -250;
if (flag_wide_view) {
    // 探しやすくするためにパラメータ変更してみる場合はこちらを使うようフラグを設定
    far_limit = 100000;
    cam_pos_y = -25000;
}
const camera = new THREE.PerspectiveCamera(50, clientWidth/clientHeight, 1, far_limit);
camera.position.set(0, cam_pos_y, 0);       // cameraの位置設定
camera.up.set(0, 0, 1);                     // カメラの上方向はZ軸方向

// renderer(レンダラー)の作成
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(clientWidth, clientHeight);

if (container) {
    // containerに展開する場合はこちら
    container.appendChild(renderer.domElement);
}
else {
    // ID "container" が見つからなければ bodyに直接展開する
    document.body.appendChild(renderer.domElement);
}

// 背景色
renderer.setClearColor(0x888888, 1);

// Light(ライト)の設定
const ambientLight = new THREE.AmbientLight(0xcccccc, 2);
scene.add(ambientLight);

// XYZ軸の表示
const axis1 =  new THREE.AxisHelper(80);    // 長さを指定
axis1.position.set(0, 0, 0);                // 位置の初期化
group.add(axis1);                           // 座標軸をグループに追加


// URLパラメータから表示モデルを取得する
var model_pattern = 'enterprise';                                   // デフォルトパターン
var match = location.search.match(/pattern=(.*?)(&|$)/);            // URLから"pattern"を探す
if(match) {
    model_pattern = decodeURIComponent(match[1]);                   // 見つかったら変数に設定
}

// MTLファイルとObjファイルの読み込み
if (model_pattern == "falcon") {
    var model_path     = 'models/falcon/';                      // ファイルの存在するpath
    var model_mtl_name = 'millenium-falcon.mtl';                // MTLファイルのファイル名
    var model_obj_name = 'millenium-falcon.obj';                // OBJファイルのファイル名
    var model_scale    = 0.2;                                   // 倍率
    var model_pos      = {"x" : -2650, "y" : -80, "z":  0};     // 位置
    var model_rot      = {"x" :    90, "y" : -90, "z":  0};     // 回転量(度)
}
else if (model_pattern == "x-wing") {
    var model_path     = 'models/x-wing/';                      // ファイルの存在するpath
    var model_mtl_name = 'x-wing.mtl';                          // MTLファイルのファイル名
    var model_obj_name = 'x-wing.obj';                          // OBJファイルのファイル名
    var model_scale    = 0.2;                                   // 倍率
    var model_pos      = {"x" : 1720, "y" : -1410, "z":  -77};  // 位置
    var model_rot      = {"x" :    90, "y" : 90, "z": 0};       // 回転量(度)
}
else if (model_pattern == "F18") {
    var model_path     = 'models/F18/';                         // ファイルの存在するpath
    var model_mtl_name = 'FA-18E_SuperHornet.mtl';              // MTLファイルのファイル名
    var model_obj_name = 'FA-18E_SuperHornet.obj';              // OBJファイルのファイル名
    var model_scale    = 8;                                     // 倍率
    var model_pos      = {"x" : 0, "y" : 0, "z": 0.52};         // 位置
    var model_rot      = {"x" : 0, "y" : 0, "z": -90};          // 回転量(度)
}
else if (model_pattern == "eagle") {
    var model_path     = 'models/EAGLE/';                       // ファイルの存在するpath
    var model_mtl_name = 'EAGLE_2.MTL';                         // MTLファイルのファイル名
    var model_obj_name = 'EAGLE_2.OBJ';                         // OBJファイルのファイル名
    var model_scale    = 100;                                   // 倍率
    var model_pos      = {"x" : 0, "y" : 0, "z": 0};            // 位置
    var model_rot      = {"x" : 90, "y" : 90, "z": 0};          // 回転量(度)
}
else /* if (model_pattern == "enterprise") */ {             // デフォルトパターン
    var model_path     = 'models/NCC-1701/';                    // ファイルの存在するpath
    var model_mtl_name = 'untitled.mtl';                        // MTLファイルのファイル名
    var model_obj_name = 'untitled.obj';                        // OBJファイルのファイル名
    var model_scale    = 30;                                    // 倍率
    var model_pos      = {"x" :   0, "y" :  1.75, "z":  0};     // 位置
    var model_rot      = {"x" :  90, "y" :  90,   "z":  0};     // 回転量(度)
}

new THREE.MTLLoader().setPath(model_path).load(model_mtl_name,function(materials){
    materials.preload();
    new THREE.OBJLoader().setPath(model_path).setMaterials(materials).load(model_obj_name,function (object){
        object.scale.set(model_scale, model_scale, model_scale);                                                // 縮尺の初期化
        object.position.set(model_pos.x * model_scale, model_pos.y * model_scale, model_pos.z * model_scale);   // 位置の初期化
        object.rotation.set(model_rot.x * Math.PI/180, model_rot.y * Math.PI/180, model_rot.z * Math.PI/180);   // 角度の初期化

        // objectをgroupに追加
        group.add(object);
    }); 
});

// camera(カメラ)をマウス操作する設定
var controls = new THREE.OrbitControls(camera);

// 繰り返しの処理
var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
