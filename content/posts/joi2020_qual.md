---
title: "JOI2020 予選 参加記"
date: 2020-12-22T02:48:43+09:00
tags: ["競プロ"]
---

## はじめに

第20回日本情報オリンピックの二次予選に参加しました。
昨年度は予選Aランクだったので、一次予選は免除でした。
最初は去年みたく一次予選も全て参加しようと思ってましたが、面倒くさくなったので1回も出ませんでした。

## 競技前

去年、一昨年と、JOI予選前は通話して心を落ち着かせていましたが、今年は本選選別資格が無いので緊張しませんでしたが、久しぶりに競プロをするので問題がまともに解けるか不安な気持ちになりました。

## 競技中

![Submit list](submitlist.jpg)

### 1問目 往復すごろく

去年の1問目より明らかにレベルが上がったなと問題を見て思いました。

<details><summary>解法</summary>
1度通った場所は飛ばしながら、シミュレーションします。
</details>

<details><summary>コード</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 40/40 |
| 2    | AC        | 60/60 |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, A;
  string S;
  cin >> N >> A >> S;
  vector<i64> b{0};
  for (i64 i = 0; i < N; i++)
    if (S[i] == '#')
      b.push_back(i + 1);
  b.push_back(N + 1);
  i64 ans = 0, now = A;
  i64 l = b[upper_bound(b.begin(), b.end(), A) - b.begin() - 1];
  i64 r = b[lower_bound(b.begin(), b.end(), A) - b.begin()];
  for (i64 i = 0; l != 0 || r != N + 1; i++)
    if (i % 2 == 0)
    {
      i64 it = lower_bound(b.begin(), b.end(), r) - b.begin();
      if (it == b.size() - 1)
      {
        ans += N + 1 - now;
        now = N + 1;
        r = N + 1;
      }
      else
      {
        ans += b[it] - now;
        now = b[it];
        r = b[it + 1];
      }
    }
    else
    {
      i64 it = upper_bound(b.begin(), b.end(), l) - b.begin() - 1;
      if (it <= 0)
      {
        ans += now;
        now = 0;
        l = 0;
      }
      else
      {
        ans += now - b[it];
        now = b[it];
        l = b[it - 1];
      }
    }
  cout << ans << endl;
  return 0;
}

```

</details>

### 2問目 パンケーキ

小課題4が通らなくてとても焦りました。

<details><summary>解法(小課題1,2,3)</summary>
愚直に文字列で持って完成から全部試すと定数倍が重いため、小課題1,2,3のみ通ります。
</details>

<details><summary>コード[74点]</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 4/4   |
| 2    | AC        | 10/10 |
| 3    | AC        | 60/60 |
| 4    | TLE       | 0/26  |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, Q;
  cin >> N >> Q;
  for (i64 _ = 0; _ < Q; _++)
  {
    string S;
    cin >> S;
    string c = S;
    sort(c.begin(), c.end());
    if (S == c)
    {
      cout << 0 << endl;
      continue;
    }
    priority_queue<pair<i64, string>, vector<pair<i64, string>>, greater<pair<i64, string>>> que;
    set<string> s;
    que.push({0, S});
    s.insert(S);
    while (que.size())
    {
      pair<i64, string> p = que.top();
      que.pop();
      for (i64 i = 1; i < N + 1; i++)
      {
        pair<i64, string> t = p;
        t.first++;
        reverse(t.second.begin(), t.second.begin() + i);
        if (s.count(t.second) == 0)
        {
          s.insert(t.second);
          que.push(t);
        }
        if (t.second == c)
        {
          cout << t.first << endl;
          goto fin;
        }
      }
    }
  fin:;
  }
  return 0;
}
```

</details>

### 3問目 イベント巡り

今回全体的に難易度高すぎて怖いなって思い、先に明らかな部分点回収をしに走りました。

<details><summary>解法(小課題1)</summary>
行くイベントを決めてそれが実現出来るか全て試します。
</details>

<details><summary>コード[8点]</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 8/8   |
| 2    | WA        | 0/11  |
| 3    | WA        | 0/24  |
| 4    | WA        | 0/12  |
| 5    | WA        | 0/23  |
| 6    | WA        | 0/22  |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, D, K;
  cin >> N >> D >> K;
  vector<pair<i64, i64>> E(N);
  for (i64 i = 0; i < N; i++)
    cin >> E[i].second >> E[i].first;
  sort(E.begin(), E.end());
  i64 ans = 0;
  for (i64 bit = 0; bit < (1 << N); bit++)
  {
    i64 cnt = 0, nowP = -1, nowS = 0;
    for (i64 i = 0; i < N; i++)
      if (bit & (1 << i))
      {
        if (nowP == -1)
          nowP = E[i].second;
        if (nowP != E[i].second)
          nowS += D;
        if (nowS <= E[i].first)
        {
          cnt++;
          nowS = E[i].first + 1;
        }
        else
          cnt == -1e9;
        nowP = E[i].second;
      }
    ans = max(ans, cnt);
  }
  cout << ans << endl;
  return 0;
}
```

</details>

### 4問目 安全点検

3問目同様、明らかな部分点を回収しました。

<details><summary>解法(小課題1)</summary>
素直に左から仕事をしていくシミュレーションをします。
</details>

<details><summary>コード[3点]</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 3/3   |
| 2    | WA        | 0/15  |
| 3    | WA        | 0/82  |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, K;
  cin >> N >> K;
  vector<i64> A(N), B(N);
  for (i64 i = 0; i < N; i++)
    cin >> A[i];
  for (i64 i = 0; i < N; i++)
    cin >> B[i];
  i64 ans = A[0] + B[0];
  for (i64 i = 1; i < N; i++)
    ans += A[i] - A[i - 1] + B[i];
  cout << ans << endl;
  return 0;
}
```

</details>

### 5問目 スパイ 2

3問目同様、明らかな部分点を回収しました。

<details><summary>解法(小課題1)</summary>
全パターン試し、矛盾が生じるかを確認します。
</details>

<details><summary>コード[7点]</summary>

| ID   | Verdict   | Score |
| ---- | --------- | ----- |
| 1    | AC        | 7/7   |
| 2    | WA        | 0/38  |
| 3    | WA        | 0/55  |

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, M;
  cin >> N >> M;
  vector<i64> T(N), A(M), B(M), C(M);
  for (i64 i = 0; i < N; i++)
    cin >> T[i];
  for (i64 i = 0; i < M; i++)
  {
    cin >> A[i] >> B[i] >> C[i];
    A[i]--;
    B[i]--;
    C[i]--;
  }
  for (i64 bit = 0; bit < (1 << N); bit++)
  {
    bool t = true;
    for (i64 i = 0; i < N; i++)
      if ((T[i] == 1 && !(bit & (1 << i))) || (T[i] == 2 && bit & (1 << i)))
        t = false;
    for (i64 i = 0; i < M; i++)
      if (bit & (1 << A[i]) && bit & (1 << B[i]) && !(bit & (1 << C[i])))
        t = false;
    if (t)
    {
      for (i64 i = 0; i < N; i++)
        if (bit & (1 << i))
          cout << 1 << endl;
        else
          cout << 2 << endl;
      return 0;
    }
  }
  cout << -1 << endl;
  return 0;
}
```

</details>

## 競技後

ボーダーが200ぐらいになるだろうと思いつつ、終わり、Bランクを確信していて、人数分布も公開されて、確実にBだなと思っていました。
最悪、今年はBでもAでも変わりがないので悲しい思いもありましたが、気持ちをすぐ切り替えられました。

## 結果

奇跡的にボーダーが188点まで下がってくれて、Aランクだと思って結果を見たらBランクになってて、とても悲しい気持ちになりました。
しかし、連絡したら本選選抜資格なしのKアカウントの基準設定が間違っていた事が分かり、無事Aランクになりました。

<details><summary>修正前の結果</summary>

![Resulte error](result_error.jpg)

</details>

![Result](result.jpg)
