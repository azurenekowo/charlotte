<p align="center">
    <img src="./assets/img/Charlotte_Icon.png" style="width: 20%">
</p>    

# <p align="center">Charlotte</p>   

Other languages: [日本語](./README.ja-JP.md) | [汉语](./README.zh-CN.md) | [Tiếng Việt](./README.vi-VN.md)

## About
An alternative frontend for HentaiVN, using the [piehtvn](https://github.com/4pii4/piehtvn) API.

## Features
- Easy to use, responsive web page
- Simple design, without the bloats / advertisements
- Stable: Just get it up and running

## Installation
**Note**: This requires you to have an instance of piehtvn already running.
```bash
git clone https://github.com/azurenekowo/charlotte
cd charlotte
npm i
node server.js
```

## Configuration
- `http.port` - The port that Charlotte will listen to
- `backend.host` - IP of the piehtvn instance

## Routes
- `/status`
- `/search?q=query`
- `/doujin/:doujinURL`
- `/read/:chapterURL`