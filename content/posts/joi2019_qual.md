---
title: "JOI2019 予選 参加記"
date: 2019-12-08T16:52:08+09:00
tags: ["競プロ"]
---
## はじめに

第19回日本情報オリンピックの二次予選に参加しました。
昨年度は予選Aランクだったので、一次予選は免除でしたが一応3回毎回出て全部満点でした。

## 競技前

9時に起きて過去問を少し解いていたらとても緊張してきて、まともに思考が出来ませんでした。
今年も去年同様に、naoppyさんと競技開始前に通話して過ごしました。
通話し始めたら落ち着きを取り戻せたので良かったです。

## 競技中

![Submit list](submitlist.jpg)

### 1問目 ポスター

最初は愚直に全探索すれば良いと分かっていたので素直に取り組みました。

<details><summary>解法</summary>
0,90,180,270度回転させた場合それぞれで不一致数を数えてそれに回転にかかる時間を足して最も小さい物が答えです。
</details>

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  vector<string> s(n), t(n);
  for (i64 i = 0; i < n; i++)
    cin >> s[i];
  for (i64 i = 0; i < n; i++)
    cin >> t[i];
  i64 ans[4] = {0, 1, 2, 1};
  for (i64 i = 0; i < n; i++)
    for (i64 j = 0; j < n; j++)
    {
      if (s[i][j] != t[i][j])
        ans[0]++;
      if (s[j][n - i - 1] != t[i][j])
        ans[1]++;
      if (s[n - i - 1][n - j - 1] != t[i][j])
        ans[2]++;
      if (s[n - j - 1][i] != t[i][j])
        ans[3]++;
    }
  cout << min({ans[0], ans[1], ans[2], ans[3]}) << endl;
  return 0;
}
```

</details>

### 2問目 いちご

一緒どうやって解くのか考えましたが、素直に東端から収穫すれば良いことに気がついたので実装しました。

<details><summary>解法</summary>
東端まで移動する時間と東端のいちごが収穫出来る時間の大きい方を取り、西に進みながら隣の苺からの移動時間と収穫可能時間の大きい方を取り続けます。
</details>

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  vector<pair<i64, i64>> s(n);
  for (i64 i = 0; i < n; i++)
    cin >> s[i].first >> s[i].second;
  sort(s.begin(), s.end());
  i64 ans = max(s[n - 1].first, s[n - 1].first);
  for (i64 i = n - 2; 0 <= i; i--)
    ans = max(ans + s[i + 1].first - s[i].first, s[i].second);
  cout << ans + s[0].first << endl;
  return 0;
}
```

</details>

### 3問目 桁和

全部試してると間に合わないので何処かで判定出来ないかと考えたら大きい順に見れば既知の値に1回で当たって直ぐ判定出来ると気がついたのですぐ実装しましたが、少し実装に手間取りました。

<details><summary>解法</summary>
大きい数から順に試して行くと、一回桁和を足すと必ず大きくなるため、必ず探索済みの物を見ます。
なので、既に探索済みの物はNに出来るか覚えておき、桁和を1回足したものがNに出来る数であれば答えに1加算します。
</details>

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

i64 sum(i64 n)
{
  i64 ret = 0;
  while (n)
  {
    ret += n % 10;
    n = n / 10;
  }
  return ret;
}

int main()
{
  i64 n;
  cin >> n;
  i64 ans = 0;
  vector<i64> ok(n + 1, -1);
  ok[n] = 1;
  for (i64 i = n; 1 <= i; i--)
  {
    i64 t = i;
    while (t + sum(t) <= n)
    {
      if (ok[t + sum(t)] == 0)
      {
        ok[t] = 0;
        break;
      }
      if (ok[t + sum(t)] == 1)
      {
        ok[t] = 1;
        break;
      }
      t += sum(t);
    }
    if (ok[i] == 1)
      ans++;
    else
      ok[i] = 0;
  }
  cout << ans << endl;
  return 0;
}
```

</details>

### 4問目 テンキー

ここから部分点が有ったのでここからが例年の4問目以降の難易度なんだなと思いました。
なのでDP出来ないか考えたら出来そうだったので実装しました。

<details><summary>解法</summary>
dp[i][j]:= 最後にjを押したときのMで割った余りがiの数の最小手数を求めて、更新が発生しなくなるまで繰り返します。
するとmin(dp[R][i],0<=i<=9)が答えです。
</details>

<details><summary>コード</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 30/30 |
| 2    | AC        | 70/70 |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

i64 mov[10][10] = {{1, 2, 3, 4, 3, 4, 5, 4, 5, 6},
                   {2, 1, 2, 3, 2, 3, 4, 3, 4, 5},
                   {3, 2, 1, 2, 3, 2, 3, 4, 3, 4},
                   {4, 3, 2, 1, 4, 3, 2, 5, 4, 3},
                   {3, 2, 3, 4, 1, 2, 3, 2, 3, 4},
                   {4, 3, 2, 3, 2, 1, 2, 3, 2, 3},
                   {5, 4, 3, 2, 3, 2, 1, 4, 3, 2},
                   {4, 3, 4, 5, 2, 3, 4, 1, 2, 3},
                   {5, 4, 3, 4, 3, 2, 3, 2, 1, 2},
                   {6, 5, 4, 3, 4, 3, 2, 3, 2, 1}};

int main()
{
  i64 m, r;
  cin >> m >> r;
  vector<vector<i64>> dp(m, vector<i64>(10, 1e18));
  dp[0][0] = 0;
  while (true)
  {
    bool ok = true;
    for (i64 i = 0; i < m; i++)
      for (i64 j = 0; j < 10; j++)
        for (i64 k = 0; k < 10; k++)
          if (dp[i][k] + mov[k][j] < dp[(i * 10 + j) % m][j])
          {
            dp[(i * 10 + j) % m][j] = dp[i][k] + mov[k][j];
            ok = false;
          }
    if (ok)
      break;
  }
  i64 ans = 1e18;
  for (i64 i = 0; i < 10; i++)
    ans = min(ans, dp[r][i]);
  cout << ans << endl;
  return 0;
}
```

</details>

### 5問目 じゃんけん式

考え始めた時は全く分からなかったので、小課題1は全部試して良さそうなので実装をしました。
計算をどうするか考えましたが、前書いた再帰下降構文解析を少し書き換えました。
終了直前に部分的にを計算した時にP,R,Sになるのはそれぞれ何通りか覚えて置けば解けるかもしれないって思いました。
が、実装が間に合わず時間切れで終わりです。
(追記:12/11)後日時間切れで実装出来なかった部分を実装したら通りました。

<details><summary>解法(小課題1)</summary>
?を全てRPSの何れかに置き換えた物を全て試します。
</details>

<details><summary>コード[20点]</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 20/20 |
| 2    | TLE       | 0/20  |
| 3    | RE        | 0/60  |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int expr(string &s, int &i);
int term(string &s, int &i);
int factor(string &s, int &i);
int number(string &s, int &i);

int expr(string &s, int &i)
{
  int val = term(s, i);
  while (s[i] == '+' || s[i] == '-')
  {
    char op = s[i];
    i++;
    int val2 = term(s, i);
    if (op == '+')
    {
      if (val == val2)
        val = val;
      else if (val == 0 && val2 == 1)
        val = 0;
      else if (val == 0 && val2 == 2)
        val = 2;
      else if (val == 1 && val2 == 0)
        val = 0;
      else if (val == 1 && val2 == 2)
        val = 1;
      else if (val == 2 && val2 == 0)
        val = 2;
      else if (val == 2 && val2 == 1)
        val = 1;
    }
    else
    {
      if (val == val2)
        val = val;
      else if (val == 0 && val2 == 1)
        val = 1;
      else if (val == 0 && val2 == 2)
        val = 0;
      else if (val == 1 && val2 == 0)
        val = 1;
      else if (val == 1 && val2 == 2)
        val = 2;
      else if (val == 2 && val2 == 0)
        val = 0;
      else if (val == 2 && val2 == 1)
        val = 2;
    }
  }
  return val;
}

int term(string &s, int &i)
{
  int val = factor(s, i);
  while (s[i] == '*' || s[i] == '/')
  {
    char op = s[i];
    i++;
    int val2 = factor(s, i);
    if (op == '*')
    {
      if (val == val2)
        val = val;
      else if (val == 0 && val2 == 1)
        val = 2;
      else if (val == 0 && val2 == 2)
        val = 1;
      else if (val == 1 && val2 == 0)
        val = 2;
      else if (val == 1 && val2 == 2)
        val = 0;
      else if (val == 2 && val2 == 0)
        val = 1;
      else if (val == 2 && val2 == 1)
        val = 0;
    }
  }
  return val;
}

int factor(string &s, int &i)
{
  if (isdigit(s[i]))
    return number(s, i);
  i++;
  int ret = expr(s, i);
  i++;
  return ret;
}

int number(string &s, int &i)
{
  int n = s[i++] - '0';
  while (isdigit(s[i]))
    n = n * 10 + s[i++] - '0';
  return n;
}

vector<string> all;

i64 create(i64 now, string s, i64 fin)
{
  if (now == fin + 1)
  {
    all.push_back(s);
    return 0;
  }
  if (s[now] != '?')
    create(now + 1, s, fin);
  else
    for (i64 i = 0; i < 3; i++)
    {
      s[now] = ('0' + i);
      create(now + 1, s, fin);
    }
  return 0;
}

int main()
{
  i64 n;
  string s, e;
  cin >> n >> s >> e;
  for (i64 i = 0; i < n; i++)
    if (s[i] == 'R')
      s[i] = '0';
    else if (s[i] == 'S')
      s[i] = '1';
    else if (s[i] == 'P')
      s[i] = '2';
  create(0, s, n);
  i64 ans = 0;
  i64 c = (e == "R" ? 0 : (e == "S" ? 1 : 2));
  for (string i : all)
  {
    int t = 0;
    i64 v = expr(i, t);
    if (v == c)
      ans++;
  }
  cout << ans << endl;
  return 0;
}
```

</details>

<details><summary>解法(満点)</summary>
それぞれの計算結果をRSPの通り数を持って行います。

<details><summary>コード(時間外)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

const i64 MOD = 1e9 + 7;

vector<i64> expr(string &s, int &i);
vector<i64> term(string &s, int &i);
vector<i64> factor(string &s, int &i);
vector<i64> number(string &s, int &i);

vector<i64> expr(string &s, int &i)
{
  vector<i64> val = term(s, i);
  while (s[i] == '+' || s[i] == '-')
  {
    char op = s[i];
    i++;
    vector<i64> val2 = term(s, i), tmp(3);
    if (op == '+')
    {
      tmp[0] = (val[0] * val2[0] + val[0] * val2[1] + val[1] * val2[0]) % MOD;
      tmp[1] = (val[1] * val2[1] + val[1] * val2[2] + val[2] * val2[1]) % MOD;
      tmp[2] = (val[2] * val2[2] + val[0] * val2[2] + val[2] * val2[0]) % MOD;
    }
    else
    {
      tmp[0] = (val[0] * val2[0] + val[0] * val2[2] + val[2] * val2[0]) % MOD;
      tmp[1] = (val[1] * val2[1] + val[0] * val2[1] + val[1] * val2[0]) % MOD;
      tmp[2] = (val[2] * val2[2] + val[1] * val2[2] + val[2] * val2[1]) % MOD;
    }
    val = tmp;
  }
  return val;
}

vector<i64> term(string &s, int &i)
{
  vector<i64> val = factor(s, i);
  while (s[i] == '*' || s[i] == '/')
  {
    char op = s[i];
    i++;
    vector<i64> val2 = factor(s, i), tmp(3);
    if (op == '*')
    {
      tmp[0] = (val[0] * val2[0] + val[1] * val2[2] + val[2] * val2[1]) % MOD;
      tmp[1] = (val[1] * val2[1] + val[0] * val2[2] + val[2] * val2[0]) % MOD;
      tmp[2] = (val[2] * val2[2] + val[0] * val2[1] + val[1] * val2[0]) % MOD;
    }
    val = tmp;
  }
  return val;
}

vector<i64> factor(string &s, int &i)
{
  if (isdigit(s[i]))
    return number(s, i);
  i++;
  vector<i64> ret = expr(s, i);
  i++;
  return ret;
}

vector<i64> number(string &s, int &i)
{
  i++;
  if (s[i - 1] == '0')
    return {1, 0, 0};
  if (s[i - 1] == '1')
    return {0, 1, 0};
  if (s[i - 1] == '2')
    return {0, 0, 1};
  return {1, 1, 1};
}

int main()
{
  i64 n;
  string s, e;
  cin >> n >> s >> e;
  for (i64 i = 0; i < n; i++)
    if (s[i] == 'R')
      s[i] = '0';
    else if (s[i] == 'S')
      s[i] = '1';
    else if (s[i] == 'P')
      s[i] = '2';
    else if (s[i] == '?')
      s[i] = '3';
  i64 c = (e == "R" ? 0 : (e == "S" ? 1 : 2));
  int t = 0;
  vector<i64> ans = expr(s, t);
  cout << ans[c] << endl;
  return 0;
}
```

</details>
</details>

## 競技後

4問目が簡単だったのでボーダーが高そうで怖いです。
5問目が解けそうだったので全完したかったです。
420点が微妙すぎて、木曜に結果が出るまでが怖いです。
今年は嘘解法で通した物が無さそうで安心しました。

## 結果

Aランクボーダーが350点で無事予選を通過しました。
去年今年と予選通過出来てとても嬉しいです。
春合宿にも行けるように本選も頑張ります。
![Result](result.jpg)
