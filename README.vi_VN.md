<p align="center">
    <img src="./assets/img/Charlotte_Icon.png" style="width: 20%">
</p>    

# <p align="center">Charlotte</p>   

Ngôn ngữ khác: [日本語](./README.ja-JP.md) | [汉语](./README.zh-CN.md) | [Tiếng Anh](./README.md)

## Giới thiệu
Một giao diện khác cho HentaiVN, sử dụng back end [piehtvn](https://github.com/4pii4/piehtvn) (không chính thức).

## Ưu điểm
- Dễ sử dụng, web responsive trên mọi thiết bị
- Thiết kế đơn giản, không quảng cáo

## Cài đặt
**Lưu ý**: Bạn cần phải có một instance piehtvn chạy sẵn.
```bash
git clone https://github.com/azurenekowo/charlotte
cd charlotte
npm i
node server.js
```

## Config
- `http.port` - Cổng của front end
- `backend.host` - IP của back end

## Routes
- `/status`
- `/search?q=query`
- `/doujin/:doujinURL`
- `/read/:chapterURL`
