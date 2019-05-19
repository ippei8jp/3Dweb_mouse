#### WEB 3D表示テストプログラム

##### 概要

WebGLを使用(ラッパにthree.jsを使用)した3D表示のテスト

URLパラメータ指定により、いくつかの`MTL/OBJ`ファイルを読み込むようにした

マウスの移動/ホイールで表示を動かすことができる

NW.jsによるデスクトップアプリ化にも対応。



##### プログラム実行

ブラウザでサーバにアクセスするだけ。

`http://《サーバアドレス》?pattern=《パターン名》`

《パターン名》には以下が使用できる。省略時はenterpriseが選択される。

- falcon

- x-wing

- F18

- eagle

- enterprise

  プログラムの動作は以下の通り。

- マウス ドラッグでカメラ位置変更

- マウス ホイールでズームイン/アウト



##### NW.jsによるデスクトップアプリ化

NW.jsによってデスクトップアプリ化することもできる。このとき、buildする環境はWindowsでもUbuntuでも構わない。作成されたアプリはWindowsのみ実行できる。

あらかじめ`NW.js` と `NW-builder` をグローバルインストールしておく。
```
npm install nw nw-builder -g
```

NW.jsでとりあえず実行したい場合は以下のように実行する。
```
npm run nw_start
```

デスクトップアプリをbuildするには以下のように実行する。
```
npm run nw_build
```

`build\3Dweb_mouse\[win32|win64]\3Dweb_mouse.exe` を実行するとプログラムが実行される。

アプリをリリースする場合は、`build\3Dweb_mouse\[win32|win64]` を丸ごとリリースする。