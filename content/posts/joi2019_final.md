---
title: "JOI2019 本選 参加記"
date: 2020-02-09T23:59:44+09:00
tags: ["JOI2019","Final"]
---
## はじめに

JOIの本選に参加しました．  
[予選参加記](../joi2019_qual)

## 1日目 (12/8)

学校が終わり，去年同様につくばに向かいました．  
15:20に会場に到着し，プラクティスの時間では去年は420点だったので，今年は満点をちゃんと取るぞと意気込んで望み，1時間弱で満点を取れました．  
夕食会では若干の人と話て独房に行きました．  
独房の鍵の配布が名前の順なので最後の方になるため待ち時間が厳しいです．  
部屋に行き特にすることも無く部屋で暇だったので22:00頃に風呂に行き，0:00頃から2:30頃までうぐいすさんと通話をしました．  
一応6:00にアラームをかけてから寝ました．  

## 2日目 (12/9)

6:00にアラームをかけましたが，起きたのは4:30でした．  
寒くて全くねれず，2時間睡眠です．  
去年とほぼ同じ朝食を食べ，集合時間まで暇を潰して会場にバスで行きました．  
高校最後のJOIになるかもしれないと思い緊張しました．

## 競技中

1問目  
![Submit list 1](/images/joi2019_final_submitlist_1.jpg)  
2問目  
![Submit list 2](/images/joi2019_final_submitlist_2.jpg)  
3問目  
![Submit list 3](/images/joi2019_final_submitlist_3.jpg)  
4問目  
![Submit list 4](/images/joi2019_final_submitlist_4.jpg)  
5問目  
![Submit list 5](/images/joi2019_final_submitlist_5.jpg)  

### 1問目 長いだけのネクタイ

問題を読むのに若干苦戦し，理解したら直ぐ解法が生えたので実装しました．  

<details><summary>解法</summary>
前計算で左合わせと右合わせで差の累積maxを取ってから計算をします．  
</details>

<details><summary>コード(00:31:59)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n;
  cin >> n;
  vector<pair<i64, i64>> a(n + 1);
  vector<i64> b(n);
  for (i64 i = 0; i < n + 1; i++)
  {
    cin >> a[i].first;
    a[i].second = i;
  }
  for (i64 i = 0; i < n; i++)
    cin >> b[i];
  sort(a.begin(), a.end());
  sort(b.begin(), b.end());
  vector<i64> left(n + 1), right(n + 1);
  for (i64 i = 0; i < n; i++)
  {
    left[i] = max(left[i], a[i].first - b[i]);
    left[i + 1] = left[i];
  }
  for (i64 i = n; 0 < i; i--)
  {
    right[i] = max(right[i], a[i].first - b[i - 1]);
    right[i - 1] = right[i];
  }
  vector<i64> ans(n + 1);
  ans[a[0].second] = right[1];
  ans[a[n].second] = left[n - 1];
  for (i64 i = 1; i < n; i++)
    ans[a[i].second] = max(left[i - 1], right[i + 1]);
  for (i64 i = 0; i < n + 1; i++)
    cout << ans[i] << " \n"[i == n];
}
```

</details>

### 2問目 JJOOII 2

バグらせてバグらせてなかなかAC出来なくてしんどかったです．  

<details><summary>解法</summary>
尺取りで特定の位置より左のJを使う時と特定のOをより右を使う時の最小の手順3の回数を求めておき，OをK個含む長さを決め打ち全部試します．  
</details>

<details><summary>コード(01:41:47)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

int main()
{
  i64 n, k;
  string s;
  cin >> n >> k >> s;
  vector<i64> cntj(n, 1e9), poso(n + 1, -1), cnti(n, 1e9);
  i64 right = 0, cnt = 0, rm = 0;
  for (i64 left = 0; left < n; left++)
  {
    while (right <= n && cnt < k)
    {
      if (s[right] == 'J')
        cnt++;
      else
        rm++;
      right++;
    }
    if (s[left] == 'J')
    {
      if (cnt == k)
        cntj[right - 1] = rm;
      cnt--;
    }
    else
      rm--;
  }
  right = 0, cnt = 0, rm = 0;
  for (i64 left = 0; left < n; left++)
  {
    while (right <= n && cnt < k)
    {
      if (s[right] == 'I')
        cnt++;
      else
        rm++;
      right++;
    }
    if (s[left] == 'I')
    {
      if (cnt == k)
        cnti[left] = rm;
      cnt--;
    }
    else
      rm--;
  }
  cnt = 0;
  for (i64 i = 0; i < n; i++)
    if (s[i] == 'O')
    {
      poso[cnt] = i;
      cnt++;
    }
  for (i64 i = 1; i < n; i++)
    cntj[i] = min(cntj[i], cntj[i - 1] + 1);
  for (i64 i = n - 2; 0 <= i; i--)
    cnti[i] = min(cnti[i], cnti[i + 1] + 1);
  i64 ans = 1e9;
  for (i64 i = 0; i < cnt - k + 1; i++)
    if (0 < poso[i] && poso[i + k - 1] < n - 1)
      ans = min(ans, poso[i + k - 1] - poso[i] - k + 1 + cntj[poso[i] - 1] + cnti[poso[i + k - 1] + 1]);
  if (ans == 1e9)
    cout << -1 << endl;
  else
    cout << ans << endl;
  return 0;
}
```

</details>

### 3問目 スタンプラリー 3

取り合えず部分点回収をしてから満点解法を目指しましたが若干方針がずれてました．  

<details><summary>解法(小課題1,2)</summary>
DFSで左右を何処まで使ったときに何個回収できてるか試します．  
</details>

<details><summary>コード(02:22:55[15点])</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

i64 n, l;
vector<i64> x, t;

i64 dfs(i64 left, i64 right, i64 pos, i64 time)
{
  if (right < left)
    return (time <= t[pos]);
  i64 ret = 0;
  if (pos == -1)
  {
    ret = max(ret, dfs(left + 1, right, left, time + x[left]));
    ret = max(ret, dfs(left, right - 1, right, time + min(x[right], l - x[right])));
  }
  else
  {
    ret = max(ret, dfs(left + 1, right, left, time + min(abs(x[left] - x[pos]), l - abs(x[left] - x[pos]))) + (time <= t[pos]));
    ret = max(ret, dfs(left, right - 1, right, time + min(abs(x[pos] - x[right]), l - abs(x[pos] - x[right]))) + (time <= t[pos]));
  }
  return ret;
}

int main()
{
  cin >> n >> l;
  x.resize(n);
  t.resize(n);
  for (i64 i = 0; i < n; i++)
    cin >> x[i];
  for (i64 i = 0; i < n; i++)
    cin >> t[i];
  cout << dfs(0, n - 1, -1, 0) << endl;
  ;
  return 0;
}
```

</details>

### 4問目 オリンピックバス

取り合えず脳死で全通り試して部分点を回収しました．  

<details><summary>解法(小課題1)</summary>
脳死でダイクストラをします．  
</details>

<details><summary>コード(02:50:12[5点])</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

struct Edge
{
  i64 to, cost;
  bool able;
};

struct Able
{
  i64 u, uit;
  i64 v, vit;
  i64 rev;
};

int main()
{
  i64 n, m;
  cin >> n >> m;
  vector<Edge> edge[n];
  vector<Able> it(m);
  for (i64 i = 0; i < m; i++)
  {
    i64 u, v, c, d;
    cin >> u >> v >> c >> d;
    u--;
    v--;
    it[i] = {u, (i64)edge[u].size(), v, (i64)edge[v].size(), d};
    edge[u].push_back({v, c, true});
    edge[v].push_back({u, c, false});
  }
  i64 ans = 1e18;
  for (i64 i = -1; i < m; i++)
  {
    if (i != -1)
    {
      edge[it[i].u][it[i].uit].able = false;
      edge[it[i].v][it[i].vit].able = true;
    }
    i64 tmp = (i == -1 ? 0 : it[i].rev);
    vector<i64> far(n, 1e18);
    priority_queue<pair<i64, i64>, vector<pair<i64, i64>>, greater<pair<i64, i64>>> que;
    far[0] = 0;
    que.push({0, 0});
    while (que.size())
    {
      pair<i64, i64> p = que.top();
      que.pop();
      for (Edge j : edge[p.second])
        if (j.able && far[p.second] + j.cost < far[j.to])
        {
          far[j.to] = far[p.second] + j.cost;
          que.push({far[j.to], j.to});
        }
    }
    tmp += far[n - 1];
    far = vector<i64>(n, 1e18);
    far[n - 1] = 0;
    que.push({0, n - 1});
    while (que.size())
    {
      pair<i64, i64> p = que.top();
      que.pop();
      for (Edge j : edge[p.second])
        if (j.able && far[p.second] + j.cost < far[j.to])
        {
          far[j.to] = far[p.second] + j.cost;
          que.push({far[j.to], j.to});
        }
    }
    tmp += far[0];
    ans = min(ans, tmp);
    if (i != -1)
    {
      edge[it[i].u][it[i].uit].able = true;
      edge[it[i].v][it[i].vit].able = false;
    }
  }
  if (ans == 1e18)
    cout << -1 << endl;
  else
    cout << ans << endl;
  return 0;
}
```

</details>

### 5問目 火事

セグ木が書けなくて辛かったです．  

<details><summary>解法(小課題1)</summary>
脳死でシミュレーションします．  
</details>

<details><summary>コード(03:10:44[1点])</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

struct Plan
{
  i64 t, l, r;
  i64 it;
};

int main()
{
  i64 n, q;
  cin >> n >> q;
  vector<i64> s(n);
  for (i64 i = 0; i < n; i++)
    cin >> s[i];
  vector<Plan> plan(q);
  for (i64 i = 0; i < q; i++)
  {
    i64 t, l, r;
    cin >> t >> l >> r;
    plan[i] = {t, l, r, i};
  }
  sort(plan.begin(), plan.end(), [](const Plan &i, const Plan &j) { return i.t < j.t; });
  vector<i64> ans(q);
  i64 nowq = 0;
  for (i64 i = 1; i <= n; i++)
  {
    for (i64 j = n - 1; 0 < j; j--)
      s[j] = max(s[j], s[j - 1]);
    while (plan[nowq].t == i)
    {
      i64 tmp = 0;
      for (i64 k = plan[nowq].l - 1; k < plan[nowq].r; k++)
        tmp += s[k];
      ans[plan[nowq].it] = tmp;
      nowq++;
    }
  }
  for (i64 i = 0; i < q; i++)
    cout << ans[i] << endl;
  return 0;
}
```

</details>

## 競技後

明らかに問題が簡単だったので落ちたのを確信しました．  
今年こそは春に行くのが目標だったのでとても辛いです．  
帰りにたんちゃんさんとつくばのゲーセンでチュウニズムを数クレしました．  
今年でJOIは最後でしたが，全力を出せてよかったと思います．  

## 結果

予想通りボーダーが高くBランクで本選落ちでした．  
