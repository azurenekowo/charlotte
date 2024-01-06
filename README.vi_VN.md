<p align="center">
    <img src="./assets/img/Charlotte_Icon.png" style="width: 20%">
</p>    

# <p align="center">Charlotte</p>   

Other languages: [日本語](./README.ja-JP.md) | [汉语](./README.zh-CN.md) | [Tiếng Việt](./README.vi-VN.md)

## Giới thiệu
Một alternative frontend cho HentaiVN, sử dụng API không chính thức (scraper) [piehtvn](https://github.com/4pii4/piehtvn).

## Tính năng
- Dễ sử dụng, web responsive trên mọi thiết bị
- Thiết kế đơn giản, đã lược bỏ quảng cáo / những thứ gây phân tâm
- Tính ổn định cao

## Cài đặt
**Lưu ý**: Bạn cần phải có một instance piehtvn chạy sẵn.
```bash
git clone https://github.com/azurenekowo/charlotte
cd charlotte
npm i
node server.js
```

## Cấu hình
- `http.port` - Charlotte sẽ bind http port trên cổng này
- `backend.host` - IP instance piehtvn

## Routes
- `/status`
- `/search?q=query`
- `/doujin/:doujinURL`
- `/read/:chapterURL`