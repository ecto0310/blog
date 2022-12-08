---
title: "[覚書] PC98版 コープスパーティー 起動方法"
date: 2020-07-30T15:06:29+09:00
tags: ["ゲーム"]
---
## はじめに

久しぶりにPC98版のコープスパーティーをやろうとDante98 for Windowsを使いプレイを試みましたが，初回は起動のみ上手く行き，2回目以降に読み込み違反でエラーを吐くのでPC98のエミュレートを試してみました．

## 必要ファイルのダウンロード

- [ゲーム本体](https://web.archive.org/web/20161203125144/https://www.enterbrain.co.jp/gamecon/a_con2.html)
リンク切れしてるのでWayBackMachineを使ってダウンロードします．
- [FreeDOS起動イメージ](http://bauxite.sakura.ne.jp/software/dos/freedos.htm)
FreeDOS(98) 起動ディスクイメージ>FreeDOS(98)各種PC-98エミュレータ用ハードディスクイメージ（HDI形式）をダウンロードします．
- [DiskExplorer](http://hp.vector.co.jp/authors/VA013937/editdisk/)
ディスクイメージ読み書き用です．
- [T98-NEXT](http://akiyuki.boy.jp/t98next/)
PC-98のエミュレーターです．

## 起動イメージにゲームを書き込む

FreeDOS起動イメージをDiskExplorerで開き，ゲーム本体のCORPSEフォルダをDnDして書き込みます．
ついでに，RUN.BATを作り，中身を以下の様にして書き込んでおきます．

```shell
cd CORPSE
corpse.bat
```

![Disk edit](diskedit.jpg)

## エミュレーターの設定

T98-NEXTを起動してDISKのHD DRIVEでさっき弄った起動イメージを選択するだけです．

![Emu config](emuconfig.jpg)

## 起動

右上の初めからのボタンを押すと起動します．
しばらくしてA:&#92;>が表示されたら，以下のコマンドを実行してゲームを起動します．

```shell
run
```

![Boot](boot.jpg)
