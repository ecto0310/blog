---
title: "PCK2019 本選 参加記 (1)"
date: 2019-11-15T23:34:18+09:00
tags: ["PCK2019","Final"]
---
## はじめに

予選に通ったので本選に参加しました．  
この記事では競技中の事を書きます．  
[本選参加記(2)](../pck2019_final_2)  
[予選参加記](../pck2019_qual)  

## 競技前

競技環境が去年まで画像で見てたのと違くて少し驚きました．  
結構緊張してましたが，人と話したことで少し落ち着きました．  
競技開始前にログインさせて欲しいと思いました．  
担当は私が基本的に解いて相方は日本語担当です．  

## 競技中

![Submit list](submitlist.jpg)

### 1問目 目盛りのないストップウォッチ

FAを狙っていましたが，ログインに3回も失敗して1分強無駄にした挙げ句，焦ってフォーム直書きで出そうとしてCE,WA,WAを食らってこの時点で精神が死にました．  
4回目で大人しくTeraPadを起動してちゃんとサンプルを通してから提出しました．  

<details><summary>解法</summary>
$ \displaystyle T/A*R$を計算します．  
</details>

<details><summary>コード(00:08:06 3WA)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  std::cout.setf(std::ios_base::fixed, std::ios_base::floatfield);
  i64 a, t, r;
  cin >> a >> t >> r;
  cout << (double)t / a * r << endl;
  return 0;
}
```

</details>

### 2問目 ガソリンスタンド

審査委員特別賞が欲しかったので綺麗に書くように意識してました．  
1問目を引きずっていて，とても焦っていました．  

<details><summary>解法</summary>
素直にシミュレーションをします．  
</details>

<details><summary>コード(00:17:56)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n, m;
  cin >> n >> m;
  queue<i64> que[10];
  for (i64 _ = 0; _ < m; _++)
  {
    i64 s;
    cin >> s;
    if (s == 0)
    {
      i64 lane;
      cin >> lane;
      cout << que[lane - 1].front() << endl;
      que[lane - 1].pop();
    }
    else
    {
      i64 car;
      cin >> car;
      i64 p = 0, c = 1e9;
      for (i64 i = 0; i < n; i++)
        if (que[i].size() < c)
        {
          p = i;
          c = que[i].size();
        }
      que[p].push(car);
    }
  }
  return 0;
}
```

</details>

### 3問目 海苔

O(1)で計算しようとして事故りました．  
事故らない方を実装した方が良いなと思いました．  

<details><summary>解法</summary>
2枚の面積から重なってる面積の2倍を引きます．  
</details>

<details><summary>コード(01:49:24 2WA)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 x1, y1, w1, h1, x2, y2, w2, h2;
  cin >> x1 >> y1 >> w1 >> h1 >> x2 >> y2 >> w2 >> h2;
  if (x1 + w1 <= x2 || x2 + w2 <= x1 || y1 + h1 <= y2 || y2 + h2 <= y1)
    cout << h1 * w1 + h2 * w2 << endl;
  else
  {
    i64 hh, ww;
    if (x1 < x2 && x2 + w2 < x1 + w1)
      ww = w2;
    else if (x2 < x1 && x1 + w1 < x2 + w2)
      ww = w1;
    else if (x1 < x2)
      ww = x1 + w1 - x2;
    else
      ww = x2 + w2 - x1;
    if (y1 < y2 && y2 + h2 < y1 + h1)
      hh = h2;
    else if (y2 < y1 && y1 + h1 < y2 + h2)
      hh = h1;
    else if (y1 < y2)
      hh = y1 + h1 - y2;
    else
      hh = y2 + h2 - y1;
    cout << h1 * w1 + h2 * w2 - hh * ww * 2 << endl;
  }
  return 0;
}
```

</details>

### 4問目 へびの脱皮

紙に書いたら直ぐ方針が生えました．  

<details><summary>解法</summary>
oが連続している箇所が有れば$ \displaystyle 2^n-1$を加算します．  
</details>

<details><summary>コード(01:07:23)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

i64 pow(i64 a, i64 n)
{
  i64 ret = 1;
  for (; 0 < n; n >>= 1, a = a * a)
    if (n % 2 == 1)
      ret *= a;
  return ret;
}

int main()
{
  i64 l, n;
  string snake;
  cin >> l >> n >> snake;
  i64 ans = l, t = (1 - pow(2, n)) / -1;
  for (i64 i = 0; i < l - 1; i++)
    if (snake[i] == 'o' && snake[i + 1] == 'o')
      ans += t * 3;
  cout << ans << endl;
  return 0;
}
```

</details>

### 5問目 デジットK

解法は正しかったのですが，印刷して持っていったセグ木がバグってました．  
悲しいです．  
途中で諦めてPriorityQueueを使う実装に移れば良かったなと今更思ってます．  

### 6問目 2つの多角形

最初，制約を見ずにbit全探索をしました．制約はちゃんと見ましょう．  

## 競技後

ログイン失敗して焦って3WAの時点でもう結果が察せてた気がします．  
競技中に一回テンパった後に正常な思考が出来るのは滅多に無いので．  
事故った後でも焦らずにもう少し落ち着けるようにしたかったです．

## おわりに

悔いが少し残りましたが，次はJOI2次予選が有るのでそれに向けて頑張っていきたいです．  
