---
title: "ICPC Asia Yokohama Regional Contest 2022 参加記"
date: 2022-12-28T23:09:27+09:00
tags: ["競プロ"]
---
## はじめに

ICPC Asia Yokohama Regional Contest 2022に参加しました。
きょさん([@Kyo_s_s](https://twitter.com/Kyo_s_s))と(匿名希望)さんと`corbeau`というチーム名で参加しました。

## 前日

オリエンテーションなどの英語が聞き取れなくてだいぶ辛かったです。大事な箇所は日本語で説明してくれてとても助かりました。
チーム紹介がしんどかったです。
休憩時間に塚本さんが来てくれて話したりしました。
お昼はきょさんと夜糸さんとスパゲティを食べました。
夜は山梨大学のhauntingの皆さんとチームメイトと天ぷらを食べました。

## リハーサル

私が環境構築をして(匿名希望)さんときょさんがAから順に解いていき、構築が終わり次第私も混ざるという感じでした。
競技時間の後半にきょさんがトイレに行く方法が何も言わずに後ろに言っていいのかスタッフに声をかけてから後ろに行くべきなのか分からずにトイレに行けずに困っていました。

### A Sum Them Up!

(匿名希望)さんが解いていました。

### B Online Assignment

きょさんが解いていました。

### C Fast Forwarding

限界までx3してよしなにx1/3出来るだけ遅く押せば良さそうだなとなり、実装をしてバグらせて暫く捏ねてACしました。

<details><summary>解法</summary>
x1/3を押し続けてt秒までに等倍に戻ってこれるか判定をしながらx3を押し続け、x1/3を押す必要が無ければ極力押さないようにしてシミュレーションします。
</details>

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = int64_t;
using ll = int64_t;

int main() {
  int n, k;
  cin >> n >> k;
  vector<pair<pair<i64, i64>, i64>> d(n);
  for (i64 i = 0; i < n; i++) {
    cin >> d[i].first.second >> d[i].first.first;
    d[i].second = i;
  }
  sort(d.begin(), d.end());
  vector<i64> ans(n, -1);
  for (i64 i = 1; i <= 31; i++) {
    i64 cnt = 0;
    for (auto [d, ind] : d) {
      if (ans[ind] == -1 && cnt < k && d.second <= i) {
        cnt++;
        ans[ind] = i;
      }
    }
  }
  for (i64 i : ans) {
    cout << i << endl;
  }
}
```

</details>

## 当日

6:30に起きて7:00少し前にロビーに行くと白米が無かったのできょさんと近くの松屋で朝ごはんを食べました。
8:00頃にホテルをチェックアウトしてコンビニで飲み物を買って会場入りしました。

## 競技中

![Score board](scoreboard.jpg)

リハーサル同様環境構築を私がして、(匿名希望)さんときょさんがAから順に解いていき、構築が終わり次第私も混ざるという感じでした。

### A Hasty Santa Claus

環境構築をしている間に問題文の読解が終わり、解法も明らかだったので、問題概要を伝えられて私がそのまま実装しました。

<details><summary>解法</summary>
1日から順に配れる人に期間末尾が早い順に貪欲に配っていきます。
</details>

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = int64_t;
using ll = int64_t;

int main() {
  int n, k;
  cin >> n >> k;
  vector<pair<pair<i64, i64>, i64>> d(n);
  for (i64 i = 0; i < n; i++) {
    cin >> d[i].first.second >> d[i].first.first;
    d[i].second = i;
  }
  sort(d.begin(), d.end());
  vector<i64> ans(n, -1);
  for (i64 i = 1; i <= 31; i++) {
    i64 cnt = 0;
    for (auto [d, ind] : d) {
      if (ans[ind] == -1 && cnt < k && d.second <= i) {
        cnt++;
        ans[ind] = i;
      }
    }
  }
  for (i64 i : ans) {
    cout << i << endl;
  }
}
```

</details>

### B Interactive Number Guessing

きょさんに解いてもらいました。

### D Move One Coin

どこか固定になる物があればいいねって話をして、最初にそれぞれの方向の端を基準にすれば良いのではと話していてそれだとそれが動くと辛いよねって話をして。
中盤に左上の3,4個を試したり中心とかで駄目なのかねってなりましたが、Gの方針が決まったのでそれを実装するかとなり放置されました。

### E Incredibly Cute Penguin Chicks

それぞれのカウントを累積和で持っておけば$O(|S|^2)$でなら解けるね、けどこれだと駄目だねときょさんと話をして、きょさんがDP遷移を睨んで考えていました。

### F Make a Loop

問題文と図を見てこれは、無理だねって言ってスルーしました。

### G Remodeling the Dungeon

壁を壊して最短経路を塞げば良いので壁挟んでそれぞれの距離が大きければそこ壊すと嬉しいよね、ということを(匿名希望)さんが言っていて、たしかにとなり実装しました。
提出をして、TLEになり、なんでだろうねって言って経路重複を1手ずつ戻って判定してるの不味いねって言ってLCAを使って最小共通祖先を求めるようにしてもTLEしてなんでだろうと言ってサブミットデバッグを始めました。
結局vector\<string\>に入れたcを$HW$回コピーしている事が判明してそれを修正して提出してWAになり何で...と言っていたら時間が来てしまいました。

### H Cake Decoration

問題文を読んで$10^14$で大きいしな、どうしようかと思ってGの実装をしている間(匿名希望)さんが考えていました。

## 競技後

凍結前34位で35位以下に結構凍結してる提出があってまあそれでもあまり通って無いだろと思い、36位ぐらいかなと思っていたら皆通していて41位まで一気に下がってびっくりしました。
競技後の懇親会では、niuezさんやHideさんphocomさんなどと話をして、交流をしました。

## 終わりに

一度は落選して追加選抜で選ばれて参加出来た今回ですが、来年はちゃんと国内予選を通りたいと思いました。
久しぶりのオンサイトでとても楽しかったです。
