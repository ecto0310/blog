---
title: "GCJ2020 Qualに参加しました"
date: 2020-04-07T15:31:51+09:00
tags: ["GCJ2020","Qual"]
---
## はじめに
GCJ2020 Qualに参加しました．  
Qualは順位関係なく30点以上取れば通過できるので気楽に参加できます．  

## 競技中
![](/images/gcj2020_qual_submitlist.jpg)

### 1問目 Vestigium
開始4時間ぐらいで存在を思い出し，解き始めました．  
問題文を理解するのに若干時間を持っていかれましたが，Qualなので制限時間長いので少し溶けてもまあ良いかなという気持ちになりました．  

<details><summary>解法</summary>
対角の和と成分に重複がある行，列を素直にループを書いて求めます．  
</details>

<details><summary>コード(04:04:17)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 T;
  cin >> T;
  for (i64 _ = 1; _ <= T; _++)
  {
    i64 N;
    cin >> N;
    vector<vector<i64>> M(N, vector<i64>(N));
    for (i64 i = 0; i < N; i++)
      for (i64 j = 0; j < N; j++)
        cin >> M[i][j];
    i64 k = 0;
    for (i64 i = 0; i < N; i++)
      k += M[i][i];
    i64 r = 0;
    for (i64 i = 0; i < N; i++)
    {
      vector<bool> use(N);
      for (i64 j = 0; j < N; j++)
      {
        if (use[M[i][j]])
        {
          r++;
          break;
        }
        use[M[i][j]] = true;
      }
    }
    i64 c = 0;
    for (i64 i = 0; i < N; i++)
    {
      vector<bool> use(N);
      for (i64 j = 0; j < N; j++)
      {
        if (use[M[j][i]])
        {
          c++;
          break;
        }
        use[M[j][i]] = true;
      }
    }
    cout << "Case #" << _ << ": " << k << " " << r << " " << c << endl;
  }
  return 0;
}
```
</details>

### 2問目 Nesting Depth
貪欲に括弧を閉じ開きをしていけばなんとかなりそうと直感的に感じたのでそのまま実装しました．  

<details><summary>解法</summary>
数列の数字を見ながら括弧を追加していきます．  
</details>

<details><summary>コード(04:17:03)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 T;
  cin >> T;
  for (i64 _ = 1; _ <= T; _++)
  {
    string S;
    cin >> S;
    string ans;
    i64 c = 0;
    for (char i : S)
    {
      i64 t = c - (i - '0');
      if (0 < t)
      {
        ans += string(t, ')');
      }
      else if (t < 0)
      {
        ans += string(abs(t), '(');
      }
      ans += i;
      c = i - '0';
    }
    ans += string(c, ')');
    cout << "Case #" << _ << ": " << ans << endl;
  }
  return 0;
}
```
</details>

### 3問目 Parenting Partnering Returns
これも素直にアクティビティをこなして行けば良さそうなので思ったまま実装しました．  

<details><summary>解法</summary>
開始時間でソートして手が空いてる子供に割り振って行きます．  
割り振れないアクティビティが現れたら構成不可能です．  
</details>

<details><summary>コード(04:35:36)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

struct Time
{
  i64 S, E, ind;
  bool operator<(const Time &r) const
  {
    return S < r.S;
  }
};

int main()
{
  i64 T;
  cin >> T;
  for (i64 _ = 1; _ <= T; _++)
  {
    i64 N;
    cin >> N;
    vector<Time> time(N);
    for (i64 i = 0; i < N; i++)
    {
      i64 S, E;
      cin >> S >> E;
      time[i] = {S, E, i};
    }
    sort(time.begin(), time.end());
    string ans = string(N, '-');
    bool imp = false;
    i64 t[2] = {};
    char c[2] = {'C', 'J'};
    for (i64 i = 0; i < N; i++)
    {
      if (t[2] < t[1])
      {
        swap(t[0], t[1]);
        swap(c[0], c[1]);
      }
      for (i64 j = 0; j < 2; j++)
      {
        if (t[j] <= time[i].S)
        {
          t[j] = time[i].E;
          ans[time[i].ind] = c[j];
          break;
        }
      }
      if (ans[time[i].ind] == '-')
        imp = true;
    }
    if (imp)
      cout << "Case #" << _ << ": "
           << "IMPOSSIBLE" << endl;
    else
      cout << "Case #" << _ << ": " << ans << endl;
  }
  return 0;
}
```
</details>

### 4問目 ESAb ATAd
見た感じ何も思い浮かばないし予選通過ボーダーの30点を超えてるのは既に確実だったのでset1だけを通しました．  
3クエリ程度使って何の変化が起こったか確定させられれば解けそうだな，とは思いましたがどう確定させれば良いのかが分かりませんでした．  

<details><summary>解法(Test set 1)</summary>
10回聞いてそのまま返すだけです．  
</details>

<details><summary>コード(05:06:11[1点])</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
//#define endl "\n"

int main()
{
  i64 T, B;
  cin >> T >> B;
  if (B != 10)
    return 1;
  for (i64 _ = 1; _ <= T; _++)
  {
    string ans;
    string res;
    for (i64 i = 1; i <= 10; i++)
    {
      cout << i << endl;
      cin >> res;
      ans += res;
    }
    cout << ans << endl;
    cin >> res;
    if (res != "Y")
      break;
  }
  return 0;
}
```
</details>

### 5問目 Indicium
適当に色々やっていましたが，全く通る気配が無く諦めました．    

## 競技後
まあ通過するのは途中で確定したので気楽に解けましたが，4問目をもう少し粘っても良かったかなと思いました．  

## 結果
43点のペナルティ5:06:11で7551位で無事予選通過です．  
去年はR1の壁を超えられなかったので今年は超えられるように頑張ります．  
