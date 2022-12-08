---
title: "第29回TCB 参加記"
date: 2020-09-21T00:05:38+09:00
tags: ["競プロ"]
---
## はじめに

第29回TechFUL Coding Battleに参加しました。
前回の第28回TCBで1問だけ解けなくて悔しくなったので今回は全完かつ10位以内目指して頑張っていきます。

## 競技中

![Scorebord](scoreboard.jpg)

### 1問目 28度 (難易度1)

今回も序盤は簡単なのでさっと解いていきます。

<details><summary>解法</summary>

28より大きいか小さいかを判定し、差と共に出力します。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N;
  cin >> N;
  if (N < 28)
    cout << "Up" << 28 - N << endl;
  else
    cout << "Down" << N - 28 << endl;
  return 0;
}
```

</details>

### 2問目 ぐるぐるぐる (難易度1)

<details><summary>解法</summary>

Nを4で割った余りで場合分けします。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N;
  cin >> N;
  if (N % 4 == 0)
    cout << "front" << endl;
  else if (N % 4 == 1)
    cout << "right" << endl;
  else if (N % 4 == 2)
    cout << "back" << endl;
  else
    cout << "left" << endl;
  return 0;
}
```

</details>

### 3問目 急がば回るべきなのか？ (難易度2)

<details><summary>解法</summary>

友人宅に付くまでの時間を更新していきながら、それぞれの友人宅から会場までの時間の和を出して最小値を出力します。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, F;
  cin >> N >> F;
  vector<i64> M(F), L(F);
  for (i64 i = 0; i < F; i++)
    cin >> M[i] >> L[i];
  i64 ans = N, sum = 0;
  for (i64 i = 0; i < F; i++)
  {
    sum += M[i];
    ans = min(ans, sum + L[i]);
  }
  cout << ans << endl;
  return 0;
}
```

</details>

### 4問目 ぐるぐるぐる2 (難易度1)

<details><summary>解法</summary>

奇数回の移動では左右、偶数回の移動では前後しか向けないのでそれを満たしているかを確認します。
向くべき方向にN回で到達出来ない場合が有るので注意します。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N;
  string S;
  cin >> N >> S;
  if ((S == "left" || S == "right") && N < 1)
  {
    cout << "No" << endl;
    return 0;
  }
  if (S == "back" && N < 2)
  {
    cout << "No" << endl;
    return 0;
  }
  if (N % 2 == 0 && (S == "front" || S == "back"))
  {
    cout << "Yes" << endl;
    return 0;
  }
  if (N % 2 == 1 && (S == "left" || S == "right"))
  {
    cout << "Yes" << endl;
    return 0;
  }
  cout << "No" << endl;
  return 0;
}
```

</details>

### 5問目 3つの関数 (難易度3)

<details><summary>解法</summary>

指示通りに計算します。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

const i64 MOD = 1e9 + 7;

int main()
{
  i64 N, Q;
  string arith;
  cin >> N >> Q >> arith;
  for (i64 i = 0; i < Q; i++)
  {
    if (arith[i] == 'F')
      N = (N * 3) % MOD;
    else if (arith[i] == 'G')
      N = (N + 2) % MOD;
    else
      N = ((N * 3) % MOD + (N + 2) % MOD) % MOD;
  }
  cout << N << endl;
  return 0;
}
```

</details>

### 6問目 Find the shapes (難易度4)

<details><summary>解法</summary>

それぞれの点について次数が0の場合、点になる。
1の場合は、その辺の先の点の次数も1であれば線になる。
2の場合は、それぞれの辺の先の点の次数が2であり、その2点が接していれば三角形になる。
また、重複があるので線と三角形の数は最後に2,3で割る。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, M;
  cin >> N >> M;
  vector<i64> edge[N];
  for (i64 i = 0; i < M; i++)
  {
    i64 a, b;
    cin >> a >> b;
    a--;
    b--;
    edge[a].push_back(b);
    edge[b].push_back(a);
  }
  i64 ansP = 0, ansL = 0, ansT = 0;
  for (i64 i = 0; i < N; i++)
  {
    if (edge[i].size() == 0)
      ansP++;
    if (edge[i].size() == 1 && edge[edge[i][0]].size() == 1)
      ansL++;
    if ((edge[i].size() == 2 && edge[edge[i][0]].size() == 2 && edge[edge[i][1]].size() == 2) && (edge[edge[i][0]][0] == edge[i][1] || edge[edge[i][0]][1] == edge[i][1]))
      ansT++;
  }
  cout << ansP << endl
       << ansL / 2 << endl
       << ansT / 3 << endl;
  return 0;
}
```

</details>

### 7問目 国土改造計画 (難易度5)

<details><summary>解法</summary>

$d_i-c_i<=0$の辺は全て追加し、その後クラスカル法で$d_i-c_i$の小さい順に追加するか検討していきます。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

struct UnionFind
{
  vector<i64> data;
  UnionFind(i64 size) : data(size, -1) {}
  bool merge(i64 x, i64 y)
  {
    x = root(x);
    y = root(y);
    if (x != y)
    {
      if (data[y] < data[x])
        swap(x, y);
      data[x] += data[y];
      data[y] = x;
    }
    return x != y;
  }
  bool check(i64 x, i64 y)
  {
    return root(x) == root(y);
  }
  i64 root(i64 x)
  {
    return data[x] < 0 ? x : data[x] = root(data[x]);
  }
};

int main()
{
  i64 N, M;
  cin >> N >> M;
  vector<pair<i64, pair<i64, i64>>> edge;
  for (i64 i = 0; i < M; i++)
  {
    i64 a, b, c, d;
    cin >> a >> b >> c >> d;
    a--;
    b--;
    edge.push_back({c - d, {a, b}});
  }
  sort(edge.begin(), edge.end());
  UnionFind uf(N);
  i64 ans = 0;
  for (i64 i = 0; i < M; i++)
    if (edge[i].first <= 0 || !uf.check(edge[i].second.first, edge[i].second.second))
    {
      ans += edge[i].first;
      uf.merge(edge[i].second.first, edge[i].second.second);
    }
  cout << ans << endl;
  return 0;
}
```

</details>

### 8問目 Letter Collector (難易度6)

ここで少し詰まりました。
提出する時にめっちゃバグってそうで怖かったです。

<details><summary>解法</summary>

辞書順最小の訪問順を答える必要が有るのでedgeをそれぞれそれぞれソートしておきます。
その後、頂点Aを決めてそこから引数(現在居る頂点,現在のSの長さ)でメモ化再帰をします。

</details>

<details><summary>コード</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
  i64 N, M, L;
  cin >> N >> M >> L;
  vector<i64> edge[N];
  for (i64 i = 0; i < M; i++)
  {
    i64 a, b;
    cin >> a >> b;
    a--;
    b--;
    edge[a].push_back(b);
    edge[b].push_back(a);
  }
  string X, T;
  cin >> X >> T;
  vector<vector<bool>> dp(N, vector<bool>(L + 1));
  vector<i64> ans(L);
  for (i64 i = 0; i < N; i++)
    sort(edge[i].begin(), edge[i].end());
  function<bool(i64, i64)> dfs = [&](i64 pos, i64 now) -> bool {
    ans[now] = pos;
    if (now == L)
    {
      for (i64 i = 0; i < L; i++)
        cout << ans[i] + 1 << endl;
      exit(0);
    }
    if (dp[pos][now])
      return dp[pos][now];
    if (X[pos] != T[now])
      return dp[pos][now] = true;
    for (i64 i : edge[pos])
      dfs(i, now + 1);
    return dp[pos][now] = true;
  };
  for (i64 i = 0; i < N; i++)
  {
    ans[0] = i;
    dfs(i, 0);
  }
  cout << "No" << endl;
  return 0;
}
```

</details>

### 9問目 Game on Graph (難易度7)

普通に難しくて解けませんでした、なので得点の最大化を試みました。
8問目まで結構簡単だったので解けなくてめっちゃ悔しいです。

<details><summary>解法[5/10]</summary>

取り敢えず分からないので、シュミレーションしてFulちゃんが$t=1$の時はTechちゃんが行ける点に辿りつけるか、それ以降は全点に辿り着けるならゲーム終了として、判定しました。

</details>

<details><summary>コード[5/10]</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-3  | AC        |
| 4    | WA        |
| 5    | AC        |
| 6-9  | WA        |
| 10   | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

const int timeLimit = 4000;

int main()
{
  chrono::system_clock::time_point start = chrono::system_clock::now();
  i64 N, M, T;
  cin >> N >> M >> T;
  vector<i64> U(M), V(M), A(T), B(T), C(T), D(T);
  for (i64 i = 0; i < M; i++)
  {
    cin >> U[i] >> V[i];
    U[i]--;
    V[i]--;
  }
  for (i64 i = 0; i < T; i++)
  {
    cin >> A[i] >> B[i] >> C[i] >> D[i];
    A[i]--;
    B[i]--;
    C[i]--;
    D[i]--;
  }
  vector<i64> edge1[N], edge2[N];
  for (i64 i = A[0]; i <= B[0]; i++)
  {
    edge1[U[i]].push_back(V[i]);
    edge1[V[i]].push_back(U[i]);
  }
  for (i64 i = C[0]; i <= D[0]; i++)
  {
    edge2[U[i]].push_back(V[i]);
    edge2[V[i]].push_back(U[i]);
  }
  vector<bool> vis1(N), vis2(N);
  queue<i64> que;
  vis1[0] = true;
  que.push(0);
  while (0 < que.size())
  {
    i64 p = que.front();
    que.pop();
    for (i64 i : edge1[p])
      if (!vis1[i])
      {
        vis1[i] = true;
        que.push(i);
      }
  }
  vis2[0] = true;
  que.push(0);
  while (0 < que.size())
  {
    i64 p = que.front();
    que.pop();
    for (i64 i : edge2[p])
      if (!vis2[i])
      {
        vis2[i] = true;
        que.push(i);
      }
  }
  bool f = vis2[N - 1];
  for (i64 i = 0; i < N; i++)
    if (vis1[i] && !vis2[i])
      f = false;
  if (f)
  {
    cout << 1 << endl;
    return 0;
  }
  i64 t = 2;
  while (t <= T && chrono::duration_cast<chrono::microseconds>(chrono::system_clock::now() - start).count() / 1000 < timeLimit)
  {
    vector<i64> edge[N];
    for (i64 i = C[t - 1]; i <= D[t - 1]; i++)
    {
      edge[U[i]].push_back(V[i]);
      edge[V[i]].push_back(U[i]);
    }
    vector<bool> vis(N);
    vis[0] = true;
    que.push(0);
    while (0 < que.size())
    {
      i64 p = que.front();
      que.pop();
      for (i64 i : edge[p])
        if (!vis[i])
        {
          vis[i] = true;
          que.push(i);
        }
    }
    if (vis[N - 1])
    {
      cout << t << endl;
      return 0;
    }
    t++;
  }
  cout << T + 1 << endl;
  return 0;
}
```

</details>

### 10問目 国土改造計画 2 (難易度8)

手も足も出なくてめっちゃ悔しいです。
得点を最大化するためにも1ケースだけでも通してやろうと焼き鈍しを書いたりしましたがサンプルさえ通らずに終わってしまいました。

## 競技後

今回はペナは生やさなかったですが、普通に解けなくて得点が伸びませんでした...
結果は130人中11位でした。
後13点でAmazonギフト券が手に入りそうだったのでとても悔しいです。

## おわりに

前回今回と13,11位で10位に届かず悲しいので次こそAmazonギフト券が欲しいです。
上位勢に暖色コーダーが多くて厳しいですね...
