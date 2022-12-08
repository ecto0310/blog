---
title: "第28回TCB 参加記"
date: 2020-08-24T16:04:16+09:00
tags: ["競プロ"]
---
## はじめに

第28回TechFUL Coding Battleに参加しました。
榊さんが宣伝してたので出るかとなり、10位以内でAmazonギフト券が貰えるらしいのでやる気が出ました。

## 競技中

![Scorebord](scoreboard.jpg)

各問$難易度\*22$点が最大点でノーペナで$難易度\*3$分以内にAC出来れば満点が付きます。

### 1問目 隣に (難易度1)

序盤は簡単なのでさっと解いていきます。

<details><summary>解法</summary>

2つの入力を指示通りに判定します。

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
  string left, right;
  cin >> left >> right;
  if (left == "Tech" || right == "Tech")
    cout << "HAPPY" << endl;
  else
    cout << "NOHAPPY" << endl;
  return 0;
}
```

</details>

### 2問目 ケーキパーティ (難易度1)

<details><summary>解法</summary>

分け合うケーキが人数より多いか確認します。

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
  for (i64 _ = 0; _ < 5; _++)
  {
    i64 K, A;
    cin >> K >> A;
    if (K <= A)
      cout << "Yes" << endl;
    else
      cout << "No" << endl;
  }
  return 0;
}
```

</details>

### 3問目 レビュー (難易度2)

<details><summary>解法</summary>

Rが3以上であればSを出力し、最後にまだ何も出力していなければ"None"を出力します。

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
  bool ok = false;
  for (i64 i = 0; i < N; i++)
  {
    i64 R;
    string S;
    cin >> R >> S;
    if (3 <= R)
    {
      cout << S << endl;
      ok = true;
    }
  }
  if (!ok)
    cout << "None" << endl;
  return 0;
}
```

</details>

### 4問目 お昼ごはん (難易度2)

<details><summary>解法</summary>

ABC順に購入出来るか試します。

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
  i64 N, A, B, C;
  cin >> N >> A >> B >> C;
  i64 ans = 0;
  if (ans + A <= N)
    ans += A;
  if (ans + B <= N)
    ans += B;
  if (ans + C <= N)
    ans += C;
  cout << ans << endl;
  return 0;
}
```

</details>

### 5問目 余らせない (難易度3)

forの継続条件でイコールをつけ忘れて1WA食らったのが地味に悔しいです。

<details><summary>解法</summary>

1,2番目の人が何個食べるか決めて3人目がその余りを3人目が食べ切れるか確認します。

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
  i64 X, a[3];
  cin >> X >> a[0] >> a[1] >> a[2];
  i64 ans = X;
  for (i64 i = 0; i <= X / a[0]; i++)
    for (i64 j = 0; j <= X / a[1]; j++)
      if (a[0] * i + a[1] * j <= X)
        ans = min(ans, (X - (a[0] * i + a[1] * j)) % a[2]);
  cout << ans << endl;
  return 0;
}
```

</details>

### 6問目 Student alignment (難易度4)

<details><summary>解法</summary>

現在の並び順とそれぞれ誰が何処に居るかの2つの配列を持ってクエリを処理します。

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
  vector<i64> A(N);
  for (i64 i = 0; i < N; i++)
    cin >> A[i];
  vector<i64> pos(N);
  for (i64 i = 0; i < N; i++)
    pos[A[i] - 1] = i;
  for (i64 _ = 0; _ < Q; _++)
  {
    string q;
    cin >> q;
    if (q == "L")
    {
      i64 X;
      cin >> X;
      cout << A[X - 1] << endl;
    }
    else if (q == "R")
    {
      i64 X;
      cin >> X;
      cout << A[N - X] << endl;
    }
    else
    {
      i64 X, Y;
      cin >> X >> Y;
      swap(A[pos[X - 1]], A[pos[Y - 1]]);
      swap(pos[X - 1], pos[Y - 1]);
    }
  }
  return 0;
}
```

</details>

### 7問目 Money To Make Money (難易度5)

ここから少し難易度が上がった気がします。
最初64bit整数型で持とうとして流石に$10^5$桁は無理と数秒思考して気が付きました。

<details><summary>解法</summary>

dp[i]:=残りi円持ってる状態で作れる偽札の最大金額でDPをします。
64bit整数型では桁数が足りないのでstringで持って比較関数を書きます。

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

bool comp(string &L, string &R)
{
  if (L.size() < R.size())
    return true;
  if (R.size() < L.size())
    return false;
  i64 size = L.size();
  for (i64 i = 0; i < size; i++)
    if (L[i] < R[i])
      return true;
    else if (R[i] < L[i])
      return false;
  return false;
}

int main()
{
  i64 N;
  string S;
  cin >> N >> S;
  vector<i64> C(N);
  for (i64 i = 0; i < N; i++)
    cin >> C[i];
  i64 X;
  cin >> X;
  vector<string> dp(X + 1, "");
  for (i64 i = 0; i < N; i++)
  {
    for (i64 j = C[i]; j <= X; j++)
    {
      string now = dp[j] + S[i];
      if (comp(dp[j - C[i]], now))
        dp[j - C[i]] = now;
    }
  }
  string ans = "";
  for (i64 i = 0; i <= X; i++)
    if (comp(ans, dp[i]))
      ans = dp[i];
  if (ans == "")
    cout << -1 << endl;
  else
    cout << ans << endl;
  return 0;
}
```

</details>

### 8問目 Techちゃんはデュエリスト (難易度6)

0の時のコーナーケースに気がつけず、1WA出したのが悔しいです。

<details><summary>解法</summary>

UnionFindでコストが小さい順に橋を追加して始点が含まれる集合のサイズを先に求め、累積maxを取っておき、クエリに答えます。
デュエ資格が0の時に注意します。

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
  i64 size(i64 x)
  {
    return -data[root(x)];
  }
};

int main()
{
  i64 N, M;
  cin >> N >> M;
  vector<pair<i64, pair<i64, i64>>> e(M);
  for (i64 i = 0; i < M; i++)
  {
    cin >> e[i].second.first >> e[i].second.second >> e[i].first;
    e[i].second.first--;
    e[i].second.second--;
  }
  vector<i64> ans(100010);
  UnionFind uf(N);
  sort(e.begin(), e.end());
  ans[0] = 1;
  for (pair<i64, pair<i64, i64>> i : e)
  {
    uf.merge(i.second.first, i.second.second);
    ans[i.first] = uf.size(0);
  }
  for (i64 i = 1; i <= 100009; i++)
    ans[i] = max(ans[i], ans[i - 1]);
  i64 Q;
  cin >> Q;
  for (i64 _ = 0; _ < Q; _++)
  {
    i64 k;
    cin >> k;
    cout << ans[k] << endl;
  }
  return 0;
}
```

</details>

### 9問目 黒の伝搬 (難易度7)

ここから一気に難易度が上がって厳しくなりました。
$O(Qlog^2N)$の解法が思い浮かび実装しましたが、TLEとWAに阻まれAC出来ませんでした...
TLEは分かるけどWAは実装ミス...?

<details><summary>解法[2/10]</summary>

区間maxを返すセグ木で黒の間の間隔を持ち、$時間/2$以下であればその時間の時その2つの間は全部黒であるためどこまで移動できるかを左右それぞれ2分探索し、最後に端の点から時間経過で伸びた分を加算して解ける気がしましたが、AC出来ませんでした。

</details>

<details><summary>コード[2/10]</summary>

|  ID  |  Verdict  |
| ---- | --------- |
| 1-5  | WA        |
| 6    | AC        |
| 7    | TLE       |
| 8-9  | WA        |
| 6    | AC        |

``` cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
#define endl "\n"

template <typename Monoid>
struct SegmentTree
{
  using F = function<Monoid(Monoid, Monoid)>;

  int sz;
  vector<Monoid> seg;

  const F f;
  const Monoid M1;

  SegmentTree(int n, const F f, const Monoid &M1) : f(f), M1(M1)
  {
    sz = 1;
    while (sz < n)
      sz <<= 1;
    seg.assign(2 * sz, M1);
  }

  void set(int k, const Monoid &x)
  {
    seg[k + sz] = x;
  }

  void build()
  {
    for (int k = sz - 1; k > 0; k--)
    {
      seg[k] = f(seg[2 * k + 0], seg[2 * k + 1]);
    }
  }

  void update(int k, const Monoid &x)
  {
    k += sz;
    seg[k] = x;
    while (k >>= 1)
    {
      seg[k] = f(seg[2 * k + 0], seg[2 * k + 1]);
    }
  }

  Monoid query(int a, int b)
  {
    Monoid L = M1, R = M1;
    for (a += sz, b += sz; a < b; a >>= 1, b >>= 1)
    {
      if (a & 1)
        L = f(L, seg[a++]);
      if (b & 1)
        R = f(seg[--b], R);
    }
    return f(L, R);
  }
};

int main()
{
  i64 N, Q;
  cin >> N >> Q;
  vector<i64> x(N);
  for (i64 i = 0; i < N; i++)
    cin >> x[i];
  vector<i64> diff(N - 1);
  SegmentTree<i64> seg(
      N, [](i64 a, i64 b) { return max(a, b); }, 0);
  for (i64 i = 0; i < N - 1; i++)
  {
    diff[i] = x[i + 1] - x[i] - 1;
    seg.set(i, diff[i]);
  }
  seg.build();
  for (i64 _ = 0; _ < Q; _++)
  {
    i64 t, p;
    cin >> t >> p;
    if (upper_bound(x.begin(), x.end(), p + t) - lower_bound(x.begin(), x.end(), p - t) == 0)
    {
      cout << 0 << endl;
      continue;
    }
    i64 it = lower_bound(x.begin(), x.end(), p) - x.begin();
    i64 left = p, right = p;
    if (x[it] == p)
    {
      i64 ng = -1, ok = it;
      while (1 < ok - ng)
      {
        i64 mid = (ok + ng) / 2;
        if (2 * t < seg.query(mid, it))
          ng = mid;
        else
          ok = mid;
      }
      left = x[ok] - t;
      ng = N, ok = it;
      while (1 < ng - ok)
      {
        i64 mid = (ok + ng) / 2;
        if (2 * t < seg.query(it, mid))
          ng = mid;
        else
          ok = mid;
      }
      right = x[ok] + t;
    }
    else
    {
      if (it != N && x[it] - (it != 0 ? max(p, x[it - 1] + t) : p) - 1 <= t)
      {
        left = min(left, x[it] - t);
        i64 ng = N, ok = it;
        while (1 < ng - ok)
        {
          i64 mid = (ok + ng) / 2;
          if (2 * t < seg.query(it, mid))
            ng = mid;
          else
            ok = mid;
        }
        right = x[ok] + t;
      }
      if (it != 0 && min(p, x[it] - t) - x[it - 1] - 1 <= t)
      {
        right = max(right, x[it - 1] + t);
        i64 ng = -1, ok = it - 1;
        while (1 < ok - ng)
        {
          i64 mid = (ok + ng) / 2;
          if (2 * t < seg.query(mid, it))
            ng = mid;
          else
            ok = mid;
        }
        left = x[ok] - t;
      }
    }
    cout << right - left + 1 << endl;
  }
  return 0;
}
```

</details>

### 10問目 文字列検索の達人 (難易度8)

実行時間2.1[s]で無理やり通してしまったのもっと良い解法がありそうだなと思いました。
試行錯誤をして20回も提出してしまいました。。。

<details><summary>解法</summary>

RolingHashで文字列一致を$O(1)$で見れるようにして後は素直に1つずつ見ていくだけです。
クエリ毎にHashを求めていたらTLEしたので予め前からと後ろからのHashを持っておいてそれと比較するようにするとギリギリで通ります。

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

#pragma GCC optimize("Ofast")

template< unsigned mod >
struct RollingHash {
  vector< unsigned > hashed, power;

  inline unsigned mul(unsigned a, unsigned b) const {
    unsigned long long x = (unsigned long long) a * b;
    unsigned xh = (unsigned) (x >> 32), xl = (unsigned) x, d, m;
    asm("divl %4; \n\t" : "=a" (d), "=d" (m) : "d" (xh), "a" (xl), "r" (mod));
    return m;
  }

  void build(const string &s, unsigned base = 10007) {
    int sz = (int) s.size();
    hashed.assign(sz + 1, 0);
    power.assign(sz + 1, 0);
    power[0] = 1;
    for(int i = 0; i < sz; i++) {
      power[i + 1] = mul(power[i], base);
      hashed[i + 1] = mul(hashed[i], base) + s[i];
      if(hashed[i + 1] >= mod) hashed[i + 1] -= mod;
    }
  }

  unsigned get(int l, int r) const {
    unsigned ret = hashed[r] + mod - mul(hashed[l], power[r - l]);
    if(ret >= mod) ret -= mod;
    return ret;
  }

  unsigned connect(unsigned h1, int h2, int h2len) const {
    unsigned ret = mul(h1, power[h2len]) + h2;
    if(ret >= mod) ret -= mod;
    return ret;
  }
};

using RH = RollingHash< 1000000007 >;

int main()
{
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int N, Q;
  cin >> N >> Q;
  vector<string> W(N);
  vector<RH> rh(N);
  vector<vector<i64>> hashRhFront(N), hashRhBack(N);
  for (int i = 0; i < N; i++)
  {
    cin >> W[i];
    rh[i].build(W[i]);
    int wSize = W[i].size();
    hashRhFront[i].reserve(wSize+1);
    hashRhBack[i].reserve(wSize+1);
    for (i64 j = 0; j <= wSize; j++)
    {
      hashRhFront[i][j] = rh[i].get(0, j);
      hashRhBack[i][wSize - j] = rh[i].get(wSize - j, wSize);
    }
  }
  RH rhp, rhs;
  for (int _ = 0; _ < Q; _++)
  {
    int l, r;
    string p, s;
    cin >> l >> r >> p >> s;
    int ans = 0;
    rhp.build(p);
    rhs.build(s);
    int pSize = p.size(), sSize = s.size();
    uint64_t hashRhp = rhp.get(0, pSize), hashRhs = rhs.get(0, sSize);
    for (int i = l - 1; i < r; i++)
    {
      int wSize = W[i].size();
      if (wSize < pSize || wSize < sSize)
        continue;
      if (hashRhFront[i][pSize] == hashRhp && hashRhBack[i][wSize - sSize] == hashRhs)
        ans++;
    }
    cout << ans << endl;
  }
  return 0;
}
```

</details>

## 競技後

5,8,10問目が勿体ないですね、5,8,10問目がもう少し得点出来てればもしかしたら10位以内に入れていました。
9問目が解けなくてとても悔しいです。
結果は158人中13位でした。

## おわりに

Amazonギフト券が手に入らなくて悔しいですが、来月のテーマがグラフアルゴリズムということなのでとても楽しみです。
来月もAmazonギフト券目指して頑張ります。
