---
title: "SuperCon2019 予選 参加記"
date: 2019-06-29T13:27:19+09:00
tags: ["SuperCon2019","Qual"]
---
## はじめに

第25回スーパーコンピューティングコンテスト 予選に参加しました．  
部活の副部長と一緒に出ました．  
相方はC++は書けないの基本的に1人で作業しました．  

## 競技中

### 1日目 (5/29)

問題を一読しましたが，日本語力が無いので理解が出来ず苦しんでいました．  
夜になり，やっと理解出来たので取り敢えず2,3級の回答コードを書きました．  

### 2日目 (5/30)

何をすれば良いのか分からないので取り敢えず愚直な山登り法のコードを書きました．

### 3日目 (5/31)

山登り法では改善方向にしか遷移しないため，局所最適解にはまり答えに辿り着けなかったら怖いなと思い100万回の試行で解にたどり着けなかった場合初期状態に戻すように変更しました．  

### 13日目 (6/10)

何も思いつかずに放置していたらいつの間にか13日目になっていました．
誤差範囲の高速化ですが，取り敢えずfor文を全てwhile文に書き換えました．

### 14日目 (6/11)

まだ残り日数がありますが，初日に書いた2級のコードを用いてテストして大丈夫だったので提出をしました．

## 提出データ

Ryzen 7 2700(3.2GHz)の環境でサンプルに対して7.0[sec]程度の実行時間でした．

<details><summary>コード</summary>

```cpp
#include "sc1.h"

inline int check(int c)
{
  int ret = 0;
  int query, input, output, newlon[4], sum, x, i, j, layer;
  query = 0;
  while (query < 10)
  {
    input = SC_prob[c][query * 2];
    output = 0;
    newlon[0] = 0, newlon[1] = 0, newlon[2] = 0, newlon[3] = 0;
    i = 0;
    while (i < 7)
    {
      sum = 0;
      j = 0;
      while (j < 6)
      {
        if (input & (1 << j))
          sum += SC_J[i * 6 + j];
        j++;
      }
      if (0 < sum)
        newlon[0] |= (1 << i);
      i++;
    }
    layer = 0;
    while (layer < 3)
    {
      i = 0;
      while (i < 7)
      {
        sum = 0;
        j = 0;
        while (j < 7)
        {
          if (newlon[layer] & (1 << j))
            sum += SC_J[42 + 49 * layer + i * 7 + j];
          j++;
        }
        if (0 < sum)
          newlon[layer + 1] |= (1 << i);
        i++;
      }
      layer++;
    }
    i = 0;
    while (i < 4)
    {
      sum = 0;
      j = 0;
      while (j < 7)
      {
        if (newlon[3] & (1 << j))
          sum += SC_J[189 + i * 7 + j];
        j++;
      }
      if (0 < sum)
        output |= (1 << i);
      i++;
    }
    x = output ^ SC_prob[c][query * 2 + 1];
    i = 0;
    while (i < 4)
    {
      if (x & (1 << i))
        ret++;
      i++;
    }
    query++;
  }
  return ret;
}

int main()
{
  int i, query, best, reset, tmp, test;
  init_genrand(0);
  SC_input();
  i = 0;
  while (i < SC_NJIJ)
  {
    SC_J[i] = 1;
    i++;
  }
  query = 0;
  while (query < SC_n)
  {
    best = 40;
    reset = 1000000;
    while (true)
    {
      tmp = genrand_int31() % SC_NJIJ;
      SC_J[tmp] *= -1;
      test = check(query);
      if (test == 0)
        break;
      if (best < test)
        SC_J[tmp] *= -1;
      else
        best = test;
      reset--;
      if (reset == 0)
      {
        i = 0;
        while (i < SC_NJIJ)
        {
          SC_J[i] = 1;
          i++;
        }
        best = 40;
        reset = 1000000;
      }
    }
    SC_output();
    query++;
  }
  return 0;
}
```

</details>

## 締め切り後

Twitter上の他のチームが殆ど1[sec]~3[sec]程度の実行時間で震えました．  
格の違いを感じ，これは落ちたなと思いました．

## 結果

オーストラリア研修中の6/19 13:54にメールで本選出場の通知が届いているのを確認しました．  
落ちるのを確信していたので嬉しかったです．  
