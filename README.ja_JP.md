<p align="center">
    <img src="./assets/img/Charlotte_Icon.png" style="width: 20%">
</p>    

# <p align="center">Charlotte</p>   

Other languages: [日本語](./README.ja-JP.md) | [Tiếng Việt](./README.vi-VN.md)

## について
非公式 [piehtvn](https://github.com/4pii4/piehtvn) API を使用する、HentaiVN の代替フロントエンド。

## 特徴
- 使いやすいレスポンシブ・ウェブ・ページ
- シンプルなデザイン、広告なし
- 安定： すぐに使える

## インストール
**備考**: そのためには、piehtvnのインスタンスがすでに起動している必要がある。
```bash
git clone https://github.com/azurenekowo/charlotte
cd charlotte
npm i
node server.js
```

## 構成
- `http.port` - Charlotteがリッスンするポート
- `backend.host` - APIインスタンスのIP

## ルート
- `/status`
- `/search?q=query`
- `/doujin/:doujinURL`
- `/read/:chapterURL`