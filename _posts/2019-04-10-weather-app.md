---
title:  "자바스크립트를 이용한 날씨 웹 앱"
excerpt: "자바스크립트를 이용하여 날씨 웹 앱을 만들어보자."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
 - Development

tags:
  - JavaScript
  - Web
  - API
  
last_modified_at: 2019-07-15T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

## 앱 개요

웹 화면 상으로 사용자의 지역 날씨 상태를 보여주는 웹 어플리케이션.

## Look

![Alt](/assets/images/weather.png ){: width="500px" height="500px"}

## 설명

사용자가 웹 앱에 접속하면 사용자로부터 위치정보 엑세스에 대한 허용 여부를 묻는다.  
허용이 되면 자바스크립트의 navigator.geolocation으로 부터 사용자의 위도와 경도 값을 읽어낸다.  
DarkSky API로 부터 받은 사용자 키 값에 위도와 경도값을 넣어준다.  
API로 부터 읽어낸 JSON 데이터를 자바스크립트 객체로 변환하여 앱에서 필요한 데이터를 얻는다.

## 사용되는 것들
- HTML - 웹 엘리먼트 구조
- CSS - 스타일 꾸미기 및 레이아웃
- Pure JavaScript - 사용자 위치정보, Dom Tree 조작, 온도 계산
- DarkSky Api - 날씨 정보를 받아오기 위해 사용 (월 1000건 까지의 쿼리는 무료)
- SkyCons - DarkSky Api에서 제공하는 날씨 아이콘

## 실행 방법

하나의 폴더에 밑의 index.html, style.css, app.js파일을 넣어준다.  
그리고, [날씨 데이터](https://darksky.net/dev/) 사이트에 가서 **Try For Free**를 눌러 가입하여 API키 값을 얻어낸 다음  
app.js 파일의 **"자신의 키"** 부분에 API 키 값을 넣어준다.
```js
// app.js파일의 <자신의 키> 부분에 API 키 값을 넣어준다.
const api = `${proxy}https://api.darksky.net/forecast/<자신의 키>/${lat}, ${long}`;
```


## Source Code

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <title>Weather</title>
</head>
<body>

    <div class="location">
        <h1 class="location-timezone">Loading Location Data ...</h1>
        <canvas id="icon1" width="128" height="128"></canvas>
    </div>
    <div class="temperature">
        <div class="degree-section">
            <h2 class="temperature-degree">?</h2>
            <span class="transition">C</span>
        </div>
        <div class="temperature-description">Loading Data ... </div>
    </div>
    <script src="./app.js"></script>
    <script src="skycons.js"></script>
</body>
</html>
```
### style.css
```css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(rgb(47,150,163), rgb(48, 62, 143));
    font-family: sans-serif;
    color: white;
}

.location, .temperature{
    height: 20vh;
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.temperature{
    flex-direction: row;
    align-items: baseline;
}

.temperature-description{
    font-size: 2rem;
    transform: translateX(20%);
}

.degree-section{
    display: flex;
    align-items: center;
    cursor: pointer;
    transform: translateX(30%);
}

.degree-section span{
    margin: 7px;
    font-size: 35px;
}

.degree-section h2{
    font-size: 40px;
}

@media screen and (max-width:550px){
    .location-timezone{
        margin-right: 3rem;
    }

    .degree-section{
        margin-right: 6rem;
        font-size: 30px;
    }

    .temperature-description{
        transform: translateX(-20%);
    }
}
```
### app.js
```js
window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/<자신의 키>/${lat}, ${long}`;

            fetch(api)
                .then(response => {
                 return response.json();
                })
                 .then(data => {
                   console.log(data);
                   const {dewPoint, summary, icon} = data.currently;
                   // Set DOM Elements from the API
                   temperatureDegree.textContent = Math.round((dewPoint - 32) / 1.8);
                   temperatureDescription.textContent = summary;
                   locationTimezone.textContent = data.timezone.replace("/", " / ");
                   setIcons(icon, "icon1");
                  });
        }, () => {
            alert("You have denied or please confirm location");
        });
    } else{
        alert("Geolocation is not supported by your browser");
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color : "white"});
        const weatherCondition = icon.replace(/-/g, "_").toUpperCase();
        skycons.set(iconID, Skycons[weatherCondition]);
        skycons.play();
    }

    let degreeSection = document.querySelector('.degree-section');
    let transition = document.querySelector('.transition');
    let isCelsius = true;
    degreeSection.addEventListener('click', () => {
        if (isCelsius) {
            temperatureDegree.textContent
             = Math.round(parseInt(temperatureDegree.textContent) * 1.8 + 32);
            transition.textContent = 'F';
            isCelsius = false;
        }else{
            temperatureDegree.textContent
             = Math.round((parseInt(temperatureDegree.textContent) - 32) / 1.8);
            transition.textContent = 'C';
            isCelsius = true;
        }
    })
});
```
## References

[Dev Ed - Youtube]