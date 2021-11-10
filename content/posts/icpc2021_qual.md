---
title: "ICPC Yokohama Regional 2021 国内予選 参加記"
date: 2021-11-05T23:03:59+09:00
tags: ["ICPC","Qual"]
---
## はじめに

ICPC Yokohama Regional 2021 国内予選に参加しました．  
はんだごてさん([@8nd5t](https://twitter.com/8nd5t))とこるぼーさん([@zero_kpr](https://twitter.com/zero_kpr))と`corbeau`というチーム名で参加しました．

## 競技前

Practiceを前日22:30からやり始め，提出方法を確認したり，解く問題を決めたりして，その後過去問を眺めたりをしました．  
Aを私，Bがはんだごてさんが解いて，C以降をこるぼーさんが見て考察をするという感じに決まりました．  
当日は集まらずにそれぞれ別の場所で出る事も決めました．

## 競技中

![Score board](scoreboard.jpg)

### 1問目 ビー玉占い

3分ぐらいで解けると思っていたら思ったより時間がかかってしまいました．

<details><summary>解法</summary>
制約が小さいので指示通りにシミュレーションをします．
</details>

<details><summary>コード(00:07:45)</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
    while (true)
    {
        vector<i64> a(4);
        cin >> a[0] >> a[1] >> a[2] >> a[3];
        if (*max_element(a.begin(), a.end()) == 0)
        {
            break;
        }
        while (accumulate(a.begin(), a.end(), 0) - *max_element(a.begin(), a.end()) != 0)
        {
            sort(a.begin(), a.end(), [](auto const &l, auto const &r)
                 { return (l == 0 ? 1e9 : l) < (r == 0 ? 1e9 : r); });
            for (i64 i = 1; i < 4; i++)
            {
                if (a[i] != 0)
                {
                    a[i] -= a[0];
                }
            }
        }
        cout << *max_element(a.begin(), a.end()) << endl;
    }
    return 0;
}
```

</details>


### 2問目 百ます計算パズル

はんだごてさんが通してくれました．

### 4問目 風船配り

貪欲や最後の2本とその2本に残る個数とかを判定出来るかどうかとかを考えていましたが，こるぼーさんが3分割する事を考えれば良さそうという結論に辿り着いてくれたのでそれを実装するだけで通すことが出来ました．

<details><summary>解法</summary>

dp[i][j][k]:=i番目の柱を見ているとき，グループ1にj個の風船，グループ2にk個の風船が有る時のグループ3の風船の数(有り得ない場合-1)でdpをします．  
j,kは高々2500個の風船を3つに分けて最小のグループを最大化するため，最大でも900程度になります．  
(当日はこれに気がついておらず最大2500程度でループを回したため実行時間が若干かかりました．)
</details>

<details><summary>コード(02:00:55 1WA)</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main()
{
    while (true)
    {
        i64 n;
        cin >> n;
        if (n == 0)
        {
            break;
        }
        vector<i64> b(n);
        for (i64 i = 0; i < n; i++)
        {
            cin >> b[i];
        }
        vector<vector<vector<i64>>> dp(n + 1, vector<vector<i64>>(2551, vector<i64>(2551, -1)));
        dp[0][0][0] = 0;
        for (i64 i = 0; i < n; i++)
        {
            for (i64 j = 0; j <= 2500; j++)
            {
                for (i64 k = 0; k <= 2500; k++)
                {
                    if (dp[i][j][k] == -1)
                    {
                        continue;
                    }
                    dp[i + 1][j + b[i]][k] = dp[i][j][k];
                    dp[i + 1][j][k + b[i]] = dp[i][j][k];
                    dp[i + 1][j][k] = dp[i][j][k] + b[i];
                }
            }
        }
        i64 ans = 0;
        for (i64 j = 0; j <= 2550; j++)
        {
            for (i64 k = 0; k <= 2550; k++)
            {
                ans = max(ans, min({j, k, dp[n][j][k]}));
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```

</details>

## 5問目 時は金なり

頂点倍にしてdijkstraなどを考えましたが，MODを取ると何処が未確定の最短頂点であるか分からないななどと考えていたら時間切れで終わってしまいました．

## 競技後

68位で手順1よる選抜順が42番目で39番以内で無いことが分かり惜しくも予選落ちがほぼ確定しました．  
思ったより順位が上で惜しい順位だったのでとても悔しい気持ちになりました．

## 結果

正式順位が発表され，競技終了直後と変わりなく予選落ちが確定しました．  
来年は横浜に行けるようにもっと強くなりたい．
