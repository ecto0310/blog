---
title: "第32回TCB 参加記"
date: 2020-12-22T23:55:00+09:00
tags: ["競プロ"]
---
## はじめに

第32回TechFUL Coding Battleに参加しました．
第30,31回と出ていなかったので3ヶ月ぶりのTCBです。

## 競技中

![Scorebord](scoreboard.jpg)

### 1問目 クリスマス? (難易度1)

今回も序盤は簡単なのでさっと解いていきます。

<details><summary>解法</summary>

M,Dがそれぞれ12,25であるか、確認します。

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
  i64 M, D;
  cin >> M >> D;
  if (M == 12 && D == 25)
    cout << "Christmas!" << endl;
  else
    cout << "NotChristmas!" << endl;
  return 0;
}
```

</details>

### 2問目 お正月 (難易度1)

<details><summary>解法</summary>

1日ずつ31日までシミュレーションします。

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
  i64 ans = 0;
  for (i64 i = N; i <= 31; i++)
    ans += (i % 10 == 0 ? 2 : 1);
  cout << ans << endl;
  return 0;
}
```

</details>

### 3問目 TechFUL Cooking Battle (難易度2)

<details><summary>解法</summary>

$0<A$の場合は下に凸なグラフになるので、0分とT分で大きい方を出力します。
その他の場合は3分探索を行って最も大きい場所を求めます。
また小数第4位で四捨五入するために、1000倍して小数第1位を四捨五入して1000で割ります。

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

double ro(double n)
{
  n *= 1000;
  n = round(n);
  n /= 1000;
  return n;
}

int main()
{
  i64 A, B, C, T;
  cin >> A >> B >> C >> T;
  if (0 < A)
    cout << fixed << setprecision(3) << ro(max(C, A * T * T + B * T + C)) << endl;
  else
  {
    double l = 0, r = T;
    i64 cnt = 500;
    while (cnt--)
    {
      double t1 = (l * 2 + r) / 3;
      double t2 = (l + r * 2) / 3;
      if (A * t1 * t1 + B * t1 + C < A * t2 * t2 + B * t2 + C)
        l = t1;
      else
        r = t2;
    }
    cout << fixed << setprecision(3) << ro(A * l * l + B * l + C) << endl;
  }
  return 0;
}
```

</details>

### 4問目 単純？な計算 (難易度2)

<details><summary>解法</summary>

$N=0$の場合、0を出力し、その他の場合、$N*M$の値の後ろに$M$個の0を並べます。

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
  if (N == 0)
    cout << 0 << endl;
  else
    cout << N * M << string(M, '0') << endl;
  return 0;
}
```

</details>

### 5問目 プレゼント配り (難易度3)

<details><summary>解法</summary>

どれを誰にあげるかを、全通り、試します。

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
  vector<vector<i64>> h(N, vector<i64>(N));
  for (i64 i = 0; i < N; i++)
    for (i64 j = 0; j < N; j++)
      cin >> h[i][j];
  vector<i64> tmp(N);
  for (i64 i = 0; i < N; i++)
    tmp[i] = i;
  i64 ans = 1e9;
  do
  {
    i64 mi = 1e9, ma = 0;
    for (i64 i = 0; i < N; i++)
    {
      mi = min(mi, h[i][tmp[i]]);
      ma = max(ma, h[i][tmp[i]]);
    }
    ans = min(ans, ma - mi);
  } while (next_permutation(tmp.begin(), tmp.end()));
  cout << ans << endl;
  return 0;
}
```

</details>

### 6問目 グリッドワープツアー (難易度4)

<details><summary>解法</summary>

$i+j$それぞれで最大値を求めておき、それの総和を求めます。

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
  i64 H, W;
  cin >> H >> W;
  vector<vector<i64>> A(H, vector<i64>(W));
  for (i64 i = 0; i < H; i++)
    for (i64 j = 0; j < W; j++)
      cin >> A[i][j];
  vector<i64> cost(H + W);
  for (i64 i = 0; i < H; i++)
    for (i64 j = 0; j < W; j++)
      cost[i + j] = max(cost[i + j], A[i][j]);
  i64 ans = 0;
  for (i64 i = 0; i < H + W; i++)
    ans += cost[i];
  cout << ans << endl;
  return 0;
}
```

</details>

### 7問目 Tech山と登山家 (難易度5)

<details><summary>解法</summary>

$RA_i+RB_i$の有り得る物を予め列挙しておき、各クエリで$X-RC_i$が存在するか確認します。

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
  i64 N, Q;
  cin >> N >> Q;
  vector<i64> RA(N), RB(N), RC(N);
  for (i64 i = 0; i < N; i++)
    cin >> RA[i];
  for (i64 i = 0; i < N; i++)
    cin >> RB[i];
  for (i64 i = 0; i < N; i++)
    cin >> RC[i];
  vector<bool> sumAB(6002);
  for (i64 i = 0; i < N; i++)
    for (i64 j = 0; j < N; j++)
      sumAB[RA[i] + RB[j]] = true;
  for (i64 _ = 0; _ < Q; _++)
  {
    i64 X;
    cin >> X;
    bool ans = false;
    for (i64 i = 0; i < N; i++)
      if (sumAB[clamp(X - RC[i], 0LL, 6001LL)])
        ans = true;
    if (ans)
      cout << "Yes" << endl;
    else
      cout << "No" << endl;
  }
  return 0;
}
```

</details>

### 8問目 都市の移動経路 (難易度6)

解法は思い浮かびましたが、何故か1ケース通らなくて謎です...
毎回8問目から詰まり始めるのでやっぱ私の実力だと壁が有るのかなと思いました。

<details><summary>解法[9/10]</summary>

ダイクストラをし、経路復元をして使える道のみを有向辺で貼ったグラフを再構築します。
その後、発展度$T$以上の都市を$D$個以上通って都市$N$に行くことが可能かを$T$に関して二分探索します。

</details>

<details><summary>コード[9/10]</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-3  | AC        |
| 4    | WA        |
| 5-10 | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

struct Edge
{
  i64 to, cost;
};

int main()
{
  i64 N, M, D;
  cin >> N >> M >> D;
  vector<i64> X(N);
  for (i64 i = 0; i < N; i++)
    cin >> X[i];
  vector<Edge> edge[N];
  for (i64 i = 0; i < M; i++)
  {
    i64 A, B, C;
    cin >> A >> B >> C;
    A--;
    B--;
    edge[A].push_back({B, C});
    edge[B].push_back({A, C});
  }
  vector<i64> cost(N, 1e18);
  priority_queue<pair<i64, i64>, vector<pair<i64, i64>>, greater<pair<i64, i64>>> que;
  cost[0] = 0;
  que.push({0, 0});
  while (que.size())
  {
    pair<i64, i64> p = que.top();
    que.pop();
    i64 v = p.second;
    if (cost[v] < p.first)
      continue;
    for (Edge i : edge[v])
      if (cost[v] + i.cost < cost[i.to])
      {
        cost[i.to] = cost[v] + i.cost;
        que.push({cost[i.to], i.to});
      }
  }
  vector<i64> okEdge[N];
  vector<bool> use(N);
  priority_queue<pair<i64, i64>> rque;
  rque.push({cost[N - 1], N - 1});
  while (rque.size())
  {
    pair<i64, i64> p = rque.top();
    rque.pop();
    i64 v = p.second;
    if (use[v])
      continue;
    use[v] = true;
    for (Edge i : edge[v])
      if (cost[v] - i.cost == cost[i.to] && !use[i.to])
      {
        okEdge[i.to].push_back(v);
        rque.push({cost[i.to], i.to});
      }
  }
  i64 ok = 0, ng = 1e9 + 1;
  while (1 < ng - ok)
  {
    i64 mid = (ok + ng) / 2;
    priority_queue<pair<i64, i64>, vector<pair<i64, i64>>, greater<pair<i64, i64>>> tque;
    vector<i64> cnt(N);
    tque.push({(mid <= X[0] ? 1 : 0), 0});
    cnt[0] = (mid <= X[0] ? 1 : 0);
    while (tque.size())
    {
      pair<i64, i64> p = tque.top();
      tque.pop();
      i64 v = p.second;
      if (p.first < cnt[v])
        continue;
      for (i64 i : okEdge[v])
        if (cnt[i] < cnt[v] + (mid <= X[i] ? 1 : 0))
        {
          cnt[i] = cnt[v] + (mid <= X[i] ? 1 : 0);
          tque.push({cnt[i], i});
        }
    }
    if (cnt[N - 1] < D)
      ng = mid;
    else
      ok = mid;
  }
  if (ok == 0)
    cout << -1 << endl;
  else
    cout << ok << endl;
  return 0;
}
```

</details>

### 9問目 TechFUL社の大掃除 (難易度7)

今回の9問目は結構簡単でした。

<details><summary>解法</summary>

ゴミを1から順に回収出来るなら回収します。
UnionFindを用いてゴミが回収出来るかを確認します。
初めにゴミの有る区画を通らずに行ける区画をマージしておき、ゴミを回収する度にそのゴミを回収した事で4方向で繋がった場所があればマージしていきます。

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
  void merge(i64 x, i64 y)
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
    return;
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

i64 dr[] = {0, 0, 1, -1}, dc[] = {1, -1, 0, 0};

int main()
{
  i64 H, W, K;
  cin >> H >> W >> K;
  vector<i64> r(K), c(K);
  vector<vector<bool>> dust(H, vector<bool>(W));
  for (i64 i = 0; i < K; i++)
  {
    cin >> r[i] >> c[i];
    r[i]--;
    c[i]--;
    dust[r[i]][c[i]] = true;
  }
  UnionFind uf(H * W);
  for (i64 i = 0; i < H; i++)
    for (i64 j = 0; j < W; j++)
      if (!dust[i][j])
        for (i64 k = 0; k < 4; k++)
        {
          i64 ddr = i + dr[k], ddc = j + dc[k];
          if (0 <= ddr && ddr < H && 0 <= ddc && ddc < W && !dust[ddr][ddc])
            uf.merge(i * W + j, ddr * W + ddc);
        }
  i64 ans = 0;
  i64 nowR = 0, nowC = 0;
  for (i64 i = 0; i < K; i++)
  {
    bool con = false;
    for (i64 k = 0; k < 4; k++)
    {
      i64 tr = r[i] + dr[k], tc = c[i] + dc[k];
      if (0 <= tr && tr < H && 0 <= tc && tc < W && uf.check(nowR * W + nowC, tr * W + tc))
      {
        ans++;
        dust[r[i]][c[i]] = false;
        nowR = r[i];
        nowC = c[i];
        for (i64 l = 0; l < 4; l++)
        {
          i64 ddr = r[i] + dr[l], ddc = c[i] + dc[l];
          if (0 <= ddr && ddr < H && 0 <= ddc && ddc < W && !dust[ddr][ddc])
            uf.merge(r[i] * W + c[i], ddr * W + ddc);
        }
        con = true;
      }
      if (con)
        break;
    }
  }
  cout << ans << endl;
  return 0;
}
```

</details>

### 10問目 ほぼ単調増加数列 (難易度8)

全く分かりません。何をすれば良いんでしょうか...

## 競技後

今回も15位で10位以内になれませんでした。
特別賞が当たることを祈ることしか出来ません...
最終日の20時半から解き始めたので、途中で詰まって時間を溶かしたら後半数問を見ずに終わるかもしれないと思いましたが、案外時間は余裕でした。

## おわりに

前からですが、上位勢に暖色コーダーが多くて10位以内は厳しいですね...
