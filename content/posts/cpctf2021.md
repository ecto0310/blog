---
title: "CPCTF2021 参加記"
date: 2021-05-01T13:53:39+09:00
tags: ["CTF"]
---
## はじめに

CPCTF2021に参加しました。最終的に5,902.41点で正の得点を取った107人の中で6位でした。CTFは苦手だったので、とても嬉しいです。

![Scorebord](scoreboard.jpg)

割と解けたのが嬉しいのれ記念にwriteupをNewbie以外の解けた問題全てについて書こうと思います。

### [Binary 1] assembly1

レジスタにespやecxが使われているのでx86のアセンブリっぽいで`gcc -m32 assembly1.s`でコンパイルすると実際に実行出来て、`FLAG{bf3c749c}`を得ることが出来ます。

### [Binary 1] easystrings

取り敢えず`file easystrings`で見てみると実行ファイルなので実行してみると、`do you know 'strings' command?`と言われたので、`strings easystrings`を実行してみると、`FLAG{strings_for_the_first_step}`が得られます。

### [Binary 2] Do You Know Flag?

実行ファイルなので実行してみると、`Input Correct Flag!`と言われるので適当な文字列を入力すると当然`Invalid!`と言われるので、取り敢えず逆アセンブルしてみると、`cmp 0x--,%al`と1字ずつ比較してそうな所が沢山有るので、それを列挙して16進数を文字列に変換みると、`FLAG{R4W_FL46_1N_I31N4RY}`が得られます。

### [Binary 3] Treasure Box

実行ファイルなので実行してみると、`We never show the FLAG!`と言われるので、取り敢えず逆アセンブルすると、flag関数がjne命令によってジャンプされて実行されなくなっているので、gdbで`start`させた後、`disas flag`でflag関数のアドレスを調べた後`set $rip=flag関数のアドレス`で次に実行する命令を変更して、`continue`で最後まで実行すると、`FLAG{WHY_4R3_Y0U_4BL3_T0_S3E_TH1S}`が得られます。また、jne命令でジャンプしないようにjneの実行直前にブレイクポイントを貼って`set $eflags |= (1 << 6)`でZFフラグに1を立てることでflag関数が実行されてフラグを得ることも出来ます。

### [Binary 2] youlose

実行ファイルなので実行してみると、`You LOSE! Can you call function 'win'?`と言われるので、gcbでTreasure Box同様にwin関数のアドレスを調べて`set $rip=win関数のアドレス`をして`continue`をすると、`FLAG{WiN_w1n_win1i11}`が得られます。

### [Binary 3] Entrance Ticket

ghidraでデコンパイルすると、`srand(0x11651)`で乱数初期化をしてシャッフルしている事が分かるので、fisheryates関数を手元で実装してあげて、1,2,3が配列の何番目にあるのか全探索すると、`FLAG{Y0UI2_D15H0N357Y_1S_0I3V10U5}`が得られます。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

void fisheryates(i64 list[], i64 size) {
    for (i64 i = size - 1; 0 < i; i--) {
        i64 j = rand() % (i + 1);
        swap(list[i], list[j]);
    }
    return;
}

int main() {
    srand(0x11651);
    i64 len = 1000000;
    i64 *list = (i64 *) malloc(len * sizeof(i64));
    for (i64 i = 0; i < len; i++) {
        list[i] = i + 1;
    }

    fisheryates(list, len);

    for (i64 i = 0; i < len; i++) {
        if (list[i] <= 3) {
            cout << list[i] << " " << i << endl;
        }
    }
    return 0;
}
```

</details>

### [Crypto 2] Encrypt code

pythonのコードを見てそれを逆に操作する関数を書いてあげて、復元をすると、`FLAG{RanDoM_ROt_is_DifF1cU1t_TO_rEAd}`が得られます。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

char enc(char c, i64 p) {
    if ('A' <= c && c <= 'Z') {
        return ((c - 'A' + p) % 26) + 'A';
    }
    if ('a' <= c && c <= 'z') {
        return ((c - 'a' + p) % 26) + 'a';
    }
    return c;
}

int main() {
    i64 p, q;
    for (i64 i = 1; i < 26; i++) {
        for (i64 j = 1; j < 11; j++) {
            if (enc('F', i) == 'D' && enc('L', i + j) == 'R') {
                p = i;
                q = j;
            }
        }
    }
    cerr << p << " " << q << endl;
    string con = "DROC{DupNgM_HMz_ew_XkpX1kK1z_PS_lGKv}";
    for (i64 i = 0; i < con.size(); i++) {
        char t = enc(con[i], -p + 26 * 100);
        p += q;
        cout << t;
    }
    cout << endl;
    return 0;
}
```

</details>

### [Crypto 2] RSA Power

nをfactordbで素因数分解してあげると、644196399152471815086923576946215907199と645826092809716702659282796645507399973の積と分かるので、あとは復号するコードを書いてあげると、`FLAG{RSA_1s_1ns4nElY_FUnnY}`が得られます。

<details><summary>コード</summary>

PyCryptoを使っているので、python3.8で削除された`time.clock()`が有る`Crypto/Random/_UserFriendlyRNG.py`の77行目をコメントアウトする必要があります。

```python
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Util.number import *
import Crypto.PublicKey.RSA as RSA

N = 416038843466729568664457170884180706836080953065458775761738081921119943105627
E = 65537
C = 400943206787041167284604370265227007369239924055247154969854212400508983364915
p = 644196399152471815086923576946215907199
q = 645826092809716702659282796645507399973

d = inverse(E,(p-1)*(q-1))
rsa_key = RSA.construct((p*q, E, d))
dec = rsa_key.decrypt(C)
print(long_to_bytes(dec))
```

</details>

### [Crypto 2] xor cipher

ciphertext_bytes = ciphertext.to_bytes(24, byteorder='little')
xorは`a ^ b = c`の時、`a ^ c = b`であるため、keyを復元する事が出来ます。なのでkeyを復元して問題文中のxor_cipher関数に復元がしたkeyと共にcipher textを入れる事で、 `FLAG{bE91n_with_f1Ag_h3}`が得られます。

<details><summary>コード</summary>

```python
ciphertext = 1126232347988259661140438596069784174475075983407155269130
ciphertext_bytes = ciphertext.to_bytes(24, byteorder='little')
key = int.from_bytes(b"FLAG", byteorder='little')^int.from_bytes(ciphertext_bytes[:4], byteorder='little')
print(xor_cipher(ciphertext_bytes, key).to_bytes(24, byteorder='little'))
```

</details>

### [Forensics 1] Ramen

画像のプロパティを見るとGPS情報が書いてあるので、googleで`35°48'05.9 139°54'49.9`と検索すると、雷 本店という店が出てくるので、問題文の指示通りに電話番号を用いると、`FLAG{0473665455}`が得られます。

### [Forensics 1] Spaceship

zipファイルを解凍して、`file spaceship`を実行するとXMLファイルである事が分かるのでエディタで開くとKMLファイルである事が分かります。なのでGoogleEarthで開いてあげると、太平洋上にflagが書かれているので、`FLAG{7H3_E4I2TH_W4S_BLU15H}`が得られます。Bと8、Sと5を最初間違えて不正解になってビビりました。

![Spaceship](spaceship.jpg)

### [Forensics 2] Game Addiction

Pika Zipでパスワードを探索すると、`dlam`と分かるので解凍して`file memo`を実行すると、Wordファイルである事が分かるので開くと、フッターを見ると白文字で文字が書かれているので、`FLAG{TR4P_C0NN3C7_R3D1VE}`が得られます。

### [Forensics 3] Animation

gifアニメーションが細長すぎて何も見えないので、`convert flag.gif +append flag.png`で1フレームずつ横に並べると、`FLAG{Th1s_1S_VeeEry_tH1n_4n1m4Ti0n}`が得られます。

### [Misc 1] Can You Sort

ファイルをリダイレクトで標準入力としてC++でソート関数を書いたプログラムに渡して、`md5sum asort.txt`でMD5を取ると、`FLAG{0135ec6a8a917a6265c5901a02d005b0}`が得られます。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main() {
    i64 size = 1000000;
    vector<i64> num(size);
    for (i64 i = 0; i < size; i++) {
        cin >> num[i];
    }
    sort(num.begin(), num.end());
    for (i64 i = 0; i < size; i++) {
        cout << num[i];
        if (i + 1 != size) {
            cout << " ";
        }
    }
    return 0;
}
```

</details>

### [Misc 1] Cpctf3301

特に画像上に3301以外の数字が見つからないのでプロパティを見てみると、画像サイズの1231x1213が縦横両方が素数になっているので、その積を求めると、`FLAG{4929063103}`が得られます。

### [Misc 1] Please wear a mask

問題名からして元画像にモザイクが掛けられていそうですが、種類が全く分からずGMaskで試していくと、CPマスクがコードをMaskCodePatternを要求して来るので、ここで問題文に書いてあった`CPCTF`を入力して処理をすると、`FLAG{MASK_1s_m0SAic_P4t7Ern}`が得られます。

![Please wear a mask](please_wear_a_mask.jpg)

### [Misc 1] Shortest Letter

63を見てなんとなく`?`の事かなと思ったのでそれっぽい`!`のアスキーコードを用いて、`FLAG{33}`が得られます。

### [Misc 2] Mental Calculation Exercise

問題文通りにコマンドを実行すると、計算問題20個をそれぞれ5秒で計算しなければいけないので、暗算で無理やりやろうと思いましたが、厳しそうなので、大人しくプログラムを書いて自動化すると、`FLAG{Wh4t_4n_345y_3x3rc153}`が得られます。

<details><summary>コード</summary>

```python
import socket

class Netcat:

    def __init__(self, ip, port):

        self.buff = ""
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((ip, port))

    def read(self, data):
        while not data in self.buff:
            self.buff += self.socket.recv(1024).decode('utf-8')

        pos = self.buff.find(data)
        rval = self.buff[:pos + len(data)]
        self.buff = self.buff[pos + len(data):]

        return rval

    def write(self, data):
        self.socket.send(data.encode('utf-8'))

nc = Netcat('024076610607', 10013)

for _ in range(8):
    print(nc.read('\n'),end='')

nc.write(str('y\n'))

for i in range(20):
    print(nc.read('\n'),end='')
    print(nc.read('\n'),end='')

    q = nc.read('\n')
    print(q)

    l, op, r, _, _ = q.split()
    if op == '+':
        ans = int(l) + int(r)
    elif op == '-':
        ans = int(l) - int(r)
    elif op == '*':
        ans = int(l) * int(r)
    elif op == '/':
        ans = int(l) / int(r)

    nc.write((str(ans) + '\n'))
    print(nc.read('\n'),end='')


print(nc.read('\n'),end='')
print(nc.read('\n'),end='')
```

</details>

### [Misc 2] Pair

ただただペア毎にgoogle検索していくと、お店の名前が列挙出来るので並べて、それぞれ1字目に注目すると、`FLAG{FLAG_IN_THE_WORLD}`が得られます。

### [OSINT 1] Boundless Internet Ocean

ページ内をざっと探しても何も見つからなかったので、xxpoxxさんのホームページかTwitterの中にありそうだなと思い、Twitterで`@cskd8 FLAG`で検索すると、`FLAG{TW1T7ER_L0V3}`が得られます。

### [OSINT 1] Secret Account

鍵と本垢がきっと相互で有ることに期待してフォローより数が少ないフォロワーを上から見ていくと、bioに書いてある本名と同じユーザー名の人が居るのでその人のIDを用いると、`FLAG{eHYdG0Y5PFVXDmH}`が得られます。

### [OSINT 2] Dig The Account

Twitterで`@_____noel____ FLAG`と検索すると、`FLAG{I2EPLY_I5_OP3NIN6}`が得られます。

### [OSINT 2] Student ID Card

Twitterで`東都工業大学 学籍番号`と一般的に工業大学を工大と略す事が多いので、`東都工大 学籍番号`で検索すると、学籍番号の規則が書いてあるので、それに従うと学籍番号が分かるので、`FLAG{21b30675}`が得られます。

### [OSINT 2] Where Is That Celebrity

これは記憶で殴ると横須賀の公園かつ三笠公園では無い気がするので適当にgoogleマップで横須賀本港近辺の公園を見ていくとヴェルニー公園と分かるので、`FLAG{0468246291}`が得られます。

### [OSINT 2] Where is the Museum

Twitterのアカウントのいいね欄に有る博物館を上から順に電話番号を調べて試していくと、`FLAG{0452111923}`が得られます。

### [OSINT 2] Where was I

googleで`trap　なんばつ`で調べるとTwitterのアカウントが特定できるので、`from:na_x_ni until:2020-08-14`と検索するとSOUND VOLTEXのリザルト画像があるので左下に書いてある都道府県とゲームセンター名から、場所を特定すると、最寄りの地下鉄駅は東京メトロ日比谷線 恵比寿駅と分かるので、`FLAG{0334616750}`が得られます。

### [PPC 1] Elementary School [^1]

問題文通りに、BとC、AとDそれぞれが等しいか確認します。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main() {
    i64 A, B, C, D;
    cin >> A >> B >> C >> D;
    if (B == C && A == D) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}
```

</details>

### [PPC 1] Not "trap", but "traP" [^1]

for文で1字ずつ確認していきます。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main() {
    string S;
    cin >> S;
    for (i64 i = 0; i < 4; i++) {
        if (S[i] != "traP"[i]) {
            cout << i + 1 << endl;
            return 0;
        }
    }
    cout << "correct" << endl;
    return 0;
}
```

</details>

### [PPC 1] XXB [^1]

100で割った余りで下2桁が得られるので後ろにBを付けます。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main() {
    i64 N;
    cin >> N;
    cout << N % 100 << "B" << endl;
    return 0;
}
```

</details>

### [PPC 2] OCH-i [^1]

全ての日を配列で持って累積和をするのは厳しいのでmapで増減が行われる日だけを持つことで累積和をして$M$より大きくなる日が有るかを確認します。

<details><summary>コード</summary>

```cpp
#include <bits/stdc++.h>

using namespace std;
using i64 = long long;
#define endl "\n"

int main() {
    i64 N, M;
    cin >> N >> M;
    map<i64, i64> c;
    for (i64 i = 0; i < N; i++) {
        i64 a, b;
        cin >> a >> b;
        c[a]++;
        c[b]--;
    }
    i64 now = 0;
    for (pair<i64, i64> i:c) {
        now += i.second;
        if (M < now) {
            cout << "Yes" << endl;
            return 0;
        }
    }
    cout << "No" << endl;
    return 0;
}
```

</details>

### [Pwn 1] Big or Small

ソースコードを読むと掛け金に関して負の制限が存在していない事がわかるので-1000000枚を賭けて失敗するとコインが増えるため、用意に1000000枚に到達出来て、`FLAG{y0u_4re_deb6ger_6fd8662e63}`が得られます。

### [Pwn 2] overrun1

問題文通りにコマンドを実行すると、名前を聞かれるので、これはワンちゃん長い名前を入力すればsegmentation faultを起こせる系の問題かなと思ったので、長い名前を入力すると、`FLAG{HeI10_PwN_35796B319E332E47}`が得られます。

### [Shell 1] veeeeeeery long text

sshで接続して`cat flag.txt`で見てみると、とても長くて目で探すのはしんどそうなので、`scp -P 10017 user@veeeeeeery-long-text.cpctf.space:flag.txt flag.txt`でローカルにファイルをコピーしてFLAGで検索すると、1000001行目が引っかかるので、`FLAG{p1pe_15_u53fu1}`が得られます。

### [Shell 3] exited

オーナーユーザーで接続しようとすると一瞬で切断されてしまったので、通常ユーザーでログインして接続時にシャルが実行するスクリプトを見ていくと、`/etc/profile.d/init.sh`にownerの時、moreでテキストを出力した後にシェルが終了するシェルが存在するのを確認したので、これまでにどうにか中断して操作をする方法を考えると、moreには、vキーでエディタが起動できるので何回か試してvimを起動すると、`:!cat /home/owner/flag.txt`を実行すると、`FLAG{v1m_15_perf3ct}`が得られます。

### [Web 2] Are you still using IE 8

IE 8を強調してくるので、開発者ツールを用いてUAをIE8に偽造すると、メニューに力を得るというページが出現するので、それを開くと、`FLAG{Everl4st1ng_IE8}`が得られます。

### [Web 2] Auto Increment

ページを見ると、メッセージが投稿されているのを確認して、それぞれをクリックすると`/messages/:id`に飛ぶことが分かるのですぐ消したから大丈夫だよねという投稿のIDが3であることからIDが2の投稿を確認すると、`FLAG{i_ann_fh3_ru1ev_0f_tra9}`が得られます。

### [Web 2] Line to line

ソースコードが何処かから見ようと考えると、ソースマップが存在したら楽だなと思い、`main.js.map`にアクセスすると存在するので見ると、`パスワードは 1l0D7zXYG9v9`というのを見つけられるのでそれでログインすると、`FLAG{f1nd_the_s0rce_m4p}`が得られます。

### [Web 3] Offline compatible

開発者ツールのネットワークで確認すると、ServiceWorkerが動いているので、アカウントを作成し、ログインした状態で設定のキャッシュを無効化してリロードすると、`FLAG{dr1ve_4w4y}`が得られます。

## おわりに

久しぶりにCTFをして思ったより解けてとても嬉しくなりました。競プロerなのにPPCの問題が殆ど解けなくてとても悲しかったです。どうせなら5位以内に入りたかったなと思いました。

[^1]: PPCの問題は記事を書くときにジャッジが終了してしまったのでコードを書き直した後にAC確認していません
