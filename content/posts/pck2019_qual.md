---
title: "PCK2019 予選 参加記"
date: 2019-09-25T15:01:41+09:00
tags: ["PCK2019","Qual"]
draft: false
---
## はじめに
プログラミング部門の予選に参加しました．
相方はSuperCon2019に引き続き副部長です．

## 競技前
13:30開始なのに12:45まで授業でHRが終わったのは13:00過ぎでお昼を速攻で食べました．  
もう少しゆっくりお昼を食べさせてほしいです．  
この時忘れ物に気が付きました．家に蟻本を忘れました．  
致命的です．  

## 競技中
![](/images/pck2019_qual_submitlist.jpg)

### 1問目 柴犬の数
去年はFAが取れず悔しかったので今年こそはと思いFAを狙いに行きました．  
提出をしたら提出IDが1でACが出てFAが取れたと確信してとても喜びました．  
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">初の正解チームは 芝浦工業大学柏高等学校 P008 「TLE」 チームです。<br>わずか34秒で正解しました！ <a href="https://twitter.com/hashtag/pckoushien?src=hash&amp;ref_src=twsrc%5Etfw">#pckoushien</a> <a href="https://twitter.com/hashtag/u_aizu?src=hash&amp;ref_src=twsrc%5Etfw">#u_aizu</a></p>&mdash; パソコン甲子園ツイッター班 (@pc_koshien) <a href="https://twitter.com/pc_koshien/status/1172730137642553344?ref_src=twsrc%5Etfw">September 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<details><summary>解法</summary>
入力を受け取って全て足して出力します。  
</details>

<details><summary>コード (00:00:34)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 r, b, w, g;
  cin >> r >> b >> w >> g;
  cout << r + b + w + g << endl;
  return 0;
}
```
</details>

### 2問目 アスキー文字
大文字のアスキーコードが65~90なのにif文を60~99で分岐を書いてしまいWAを出しました．  
通るだろうと思って3問目時終わった後に確認したらWAになってて絶望的な気持ちになりました．  

<details><summary>解法</summary>
問題の指示通りにif文を書きます．  
</details>

<details><summary>コード (00:05:44+1WA)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  if (65 <= n && n <= 90)
    cout << 1 << endl;
  else if (97 <= n && n <= 122)
    cout << 2 << endl;
  else
    cout << 0 << endl;
  return 0;
}
```
</details>

### 3問目 2の累乗
素直に書いて無事通って安心しました．  

<details><summary>解法</summary>
1に2を掛けていきNを次2を掛けたらNを超える場合にループから抜けます．  
</details>

<details><summary>コード (00:04:52)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  i64 ans = 1;
  while (ans * 2 <= n)
    ans *= 2;
  cout << ans << endl;
  return 0;
}
```
</details>

### 4問目 集会所
最小の時間を出力しなければならないのに，集会所の場所を出力してWAを出しました．  
誤読してサンプル通るのやめて欲しいです．  

<details><summary>解法</summary>
ソートして西の端と東の端の平均の座標が集会所の場所です．  
西端，東端それぞれからかかる時間を求めて大きい方を出力します．    
</details>

<details><summary>コード(00:24:36 1WA)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  vector<i64> x(n);
  for (i64 i = 0; i < n; i++)
    cin >> x[i];
  sort(x.begin(), x.end());
  i64 p = (x[0] + x[n - 1]) / 2;
  cout << max(abs(p - x[0]), abs(p - x[n - 1])) << endl;
  return 0;
}
```
</details>

### 5問目 ねこのあな
穴の中に居ない状態から出てくる可能性が有るのを忘れててWAを出しました．  
こうゆうところでWAを出すのはほんと良くないです．  

<details><summary>解法</summary>
Stackを用いてシュミレーションをします。  
</details>

<details><summary>コード(00:29:50 1WA)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 l;
  cin >> l;
  vector<i64> c(l);
  for (i64 i = 0; i < l; i++)
    cin >> c[i];
  vector<i64> h;
  vector<bool> in(l);
  for (i64 i = 0; i < l; i++)
  {
    if (0 < c[i])
    {
      h.push_back(c[i]);
      if (in[c[i] - 1])
      {
        cout << i + 1 << endl;
        return 0;
      }
      in[c[i] - 1] = true;
    }
    else
    {
      if (0 < h.size() && h[h.size() - 1] == -c[i])
      {
        h.pop_back();
        in[-c[i] - 1] = false;
      }
      else
      {
        cout << i + 1 << endl;
        return 0;
      }
    }
  }
  cout << "OK" << endl;
  return 0;
}
```
</details>

### 6問目 床
なんか素直に実装しても通りそうでしたが良いのか何か簡単な方法が有るのかと思ってとても悩みました．  
悩んでたせいで無駄に時間を使いました．  

<details><summary>解法</summary>
四角形の角4点の座標を持ち範囲内に入力の座標が来るまで繰り返します．  
</details>

<details><summary>コード(00:53:31)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 x, y;
  cin >> x >> y;
  i64 px[2] = {0, 1};
  i64 py[2] = {0, 1};
  if (x == 0 && y == 0)
  {
    cout << 1 << endl;
    return 0;
  }
  for (i64 i = 0;; i++)
  {
    if (i % 4 == 0)
    {
      px[1] += abs(py[1] - py[0]);
      if (px[0] <= x && x < px[1] && py[0] <= y && y < py[1])
      {
        cout << (i + 1) % 3 + 1 << endl;
        return 0;
      }
    }
    else if (i % 4 == 1)
    {
      py[1] += abs(px[1] - px[0]);
      if (px[0] <= x && x < px[1] && py[0] <= y && y < py[1])
      {
        cout << (i + 1) % 3 + 1 << endl;
        return 0;
      }
    }
    else if (i % 4 == 2)
    {
      px[0] -= abs(py[1] - py[0]);
      if (px[0] <= x && x < px[1] && py[0] <= y && y < py[1])
      {
        cout << (i + 1) % 3 + 1 << endl;
        return 0;
      }
    }
    else
    {
      py[0] -= abs(px[1] - px[0]);
      if (px[0] <= x && x < px[1] && py[0] <= y && y < py[1])
      {
        cout << (i + 1) % 3 + 1 << endl;
        return 0;
      }
    }
  }
  return 0;
}
```
</details>

### 7問目 アカベコ20
128bit整数を使ったり謎な事をして2WAです．  

<details><summary>解法</summary>
全ての組み合わせで何日周期で公演をするか最小公倍数を求め，最小公倍数の種類の数を出力します．  
</details>

<details><summary>コード(01:59:10 2WA)</summary>

```cpp
#include <bits/stdc++.h>
#include <assert.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  vector<i64> p(n);
  for (i64 i = 0; i < n; i++)
    cin >> p[i];
  set<i64> d;
  for (i64 i = 1; i < (1LL << n); i++)
  {
    i64 g = -1;
    for (i64 j = 0; j < n; j++)
      if (i & (1 << j))
      {
        if (g == -1)
          g = p[j];
        else
          g = g * p[j] / __gcd(g, p[j]);
      }
    d.insert(g);
  }
  cout << d.size() << endl;
  return 0;
}
```
</details>

### 9問目 天空の城ツルガ
何も分かりません．  
幾何は無理です．  

### 10問目 トーナメントの記録
サンプルだけ何故か通るコードを出しました．  
勿論WAです．  

## 競技後
7完5WA，ペナルティの数的に地域枠も無理そうな結果でした．  
順位表凍結時で31位でそこから何も通していないので35位ぐらいかなと思いました．  
相方にほぼ確実に落ちたことを報告しました．  
とても悔しく，今年こそは本選に行きたかったので泣いていました．  

## 結果
発表の日は落ちたことを察していたので気にせずに寝ていました．  
起きたら14時過ぎで，Twitterを開いたらHideさんからリプライが来ていて内容を見て最初嫌がらせか???って思いました．(ほんとごめんなさい)  
ページを見たらほんとに通っててとても驚きました．  
直ぐ人を疑うのをやめましょう．  
