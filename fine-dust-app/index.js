window.addEventListener('load', () =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    // 사용자의 현재 위치: 경도, 위도 값을 TM 좌표계로 변환
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {

            // KaKao REST API: 죄표계 변환, WGS84 to TM 
            // params : x: longitude
            //          y: latitude
            //          input_coord: transition from
            //          output_coord: transition to
            
            let long = position.coords.longitude; // 경도 x
            let lat = position.coords.latitude;   // 위도 y

            const input_coord = 'WGS84'
            const output_coord = 'TM'

            const kakaoRESTApi = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=
            ${long}&y=${lat}&input_coord=${input_coord}&output_coord=${output_coord}`;

            fetch( kakaoRESTApi ,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'KakaoAK 06034a40145bbf76839d147aa0b49abb' // Insert your own APP KEY (Kakao)
                }
            })
            .then(res => res.json())
            .then(data => {
                const coords = data.documents[0]
                let tmX = coords.x;
                let tmY = coords.y;
                //console.log(long, lat)
                //console.log(tmX, tmY)

                // Insert your own APP KEY (Air Korea)
                const authKeyForLocation = 'hisbJ45Rnh7T2Un40Cg5F1%2FKP6Xgn4%2FCMOZW%2BD7YzCbM3X2qNqJ3fBbnLB6f9WnpXKrTuv0NYmQrg1b15BjYnQ%3D%3D';

                // 한국환경공단 REST API: TM 좌표 기반 근접 측정소 목록 조회 
                // params : tmX: tm coord x
                //          tmY: tm coord y
                //          ServiceKey: authorization API key (personal)
                const airKoreaRESTAPIForLocation = `${proxy}http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=
                ${tmX}&tmY=${tmY}&ServiceKey=${authKeyForLocation}&_returnType=json`

                fetch(airKoreaRESTAPIForLocation)
                .then(res => res.json())
                .then(data => {
                    const addr = data.list[0].addr;
                    const stationName = data.list[0].stationName;


                    const authKeyForRealTimeInfo = 'hisbJ45Rnh7T2Un40Cg5F1%2FKP6Xgn4%2FCMOZW%2BD7YzCbM3X2qNqJ3fBbnLB6f9WnpXKrTuv0NYmQrg1b15BjYnQ%3D%3D';
                
                    // 한국환경공단 REST API: 측정소별 실시간 측정정보 조회
                    // params : stationName: Station name on current location
                    //          ServiceKey: authorization API key (personal)
                    const airKoreaRESTAPIForRealTimeInfo = `${proxy}http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${authKeyForRealTimeInfo}&ver=1.3&_returnType=json`

                    fetch(airKoreaRESTAPIForRealTimeInfo)
                    .then(res => res.json())
                    .then(data => {

                        const {dataTime, pm10Value, pm25Value, o3Value, no2Value, coValue} = data.list[0];
                        setFineDust(stationName, dataTime, pm10Value, pm25Value, o3Value, no2Value, coValue)
                    })
                })
            }) // End of fine dust information fetch

            // WeatherMap REST API: 현재 날씨 정보
            // params : lon: longitude
            //          lat: latitude
            //          authKeyForWeatherMap: authorization API key (personal)

            const authKeyForWeatherMap = '3f7ea16ba4a91cf586fdfbafbf4fa9db'

            const weatherMapRESTAPIforCurrentWeather = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${authKeyForWeatherMap}`
            fetch(weatherMapRESTAPIforCurrentWeather)
            .then(res => res.json())
            .then(data => {
                setCurrentWeather(data)
            }).catch(err => {
                alert('invalid data' + err)
            })

            // WeatherMap REST API:  예보 날씨 정보
            // params : lon: longitude
            //          lat: latitude
            //          authKeyForWeatherMap: authorization API key (personal)
            //          cnt: 불어올 리스트 개수 (3시간 마다)

            const cnt = 8
            const weatherMapRESTAPIforForecast = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${authKeyForWeatherMap}&cnt=${cnt}`
            fetch(weatherMapRESTAPIforForecast)
            .then(res => res.json())
            .then(data => {
                setForecast(data)
            }).catch(err => {
                alert('invalid data' + err)
            })
        }, () => {
            alert("데이터를 가져오기 위해 위치정보를 수락해주세요!");
        });
    } else{
        alert("해당 브라우저에서는 위치정보 지원이 되지 않습니다.");
    }


    function convert(stamp, type){
        // Months array
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // Convert timestamp to milliseconds
        var date = new Date(stamp*1000);
        // Year
        var year = date.getFullYear();
        // Month
        var month = months_arr[date.getMonth()];
        // Day
        var day = date.getDate();
        // Hours
        var hours = date.getHours();
        // Minutes
        var minutes = "0" + date.getMinutes();
        // Seconds
        var seconds = "0" + date.getSeconds();
        // Display date time in yyyy-mm-dd h:m:s format
        var convdataTime = year+'-'+month+'-'+ day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        if (type === 'all') {
            return convdataTime
        }else if (type === 'hours'){
            return hours
        }
    }

    function setCurrentWeather(data){
        const{main, description, icon} = data.weather[0]
        const{temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main
        const{speed} = data.wind 
        const{all} = data.clouds 
        const dateTime = data.dt
        const{sunrise, sunset} = data.sys
        const location = data.name

        // .current-weather
        let currentLocation = document.querySelector('.location')
        let currentTime = document.querySelector('.time')
        let currentCondition = document.querySelector('.condition')
        currentLocation.textContent = location
        currentTime.textContent = '업데이트 시간 : ' + convert(dateTime, 'all')
        currentCondition.textContent = main

        // .temp-information
        let currentImgIcon = document.querySelector('.current-img')
        let currentTemp = document.querySelector('.temp')
        let currentCloud = document.querySelector('.cloudiness')
        let currentHumidity = document.querySelector('.humidity')
        let currentWind = document.querySelector('.wind')
        currentImgIcon.setAttribute('src', `./img/${icon}.png`)
        currentTemp.textContent = Math.round(temp - 273.15)  + '°C' // Kelvin to Celsius
        currentCloud.textContent = '구름 : ' + all + '%'
        currentHumidity.textContent = '습도 : ' + humidity + '%'
        currentWind.textContent = '바람 : ' + speed + ' m/s'
    }

    function setForecast(data){
        const foreCastLists = document.querySelector('.forecast-lists')
        for (let i = 0; i < 8; i++) {
            let listData = data.list[i]
            let hours = listData.dt
            let icon = listData.weather[0].icon
            let temp = listData.main.temp

            let list = document.createElement('li')
            list.className = 'listItem'

            let convertedHours = convert(hours, 'hours')
            if (convertedHours < 10) {
                convertedHours = '0' + convertedHours
            }
            list.appendChild(document.createTextNode(convertedHours + ':00'))
            
            let iconImg = document.createElement('img')
            iconImg.setAttribute('src', `./img/${icon}.png`)
            list.appendChild(iconImg)

            list.appendChild(document.createTextNode(Math.round(temp - 273.15)  + '°C'))

            foreCastLists.appendChild(list)
        }

    }

    function setFineDust(stationName, dataTime, pm10Value, pm25Value, o3Value, no2Value, coValue){
        let currentLocation = document.querySelector('.current-location')
        let currentTime = document.querySelector('.current-time')
        currentLocation.textContent = '현재 측정 장소: ' + stationName
        currentTime.textContent = '업데이트 시간: ' + dataTime

        const WTO_Standard = {
            '-':{
                condition: '데이터 없음',
                description: '현재 측정소에서 수집된 데이터가 없습니다 ',
                color: 'rgb(51, 133, 255)',
                background: 'linear-gradient(rgb(51, 133, 255), rgb(45, 97, 175))',
                emoji: 'fas fa-times',
                circle: 'light-blue'
            },
            1:{
                condition: '아주 좋음',
                description: '현재 공기가 매우 좋습니다 ^o^! ',
                color: 'rgb(51, 133, 255)',
                background: 'linear-gradient(rgb(51, 133, 255), rgb(45, 97, 175))',
                emoji: 'far fa-laugh-beam',
                circle: 'light-blue'
            },
            2:{
                condition: '좋음',
                description: '현재 공기가 좋습니다 ^o^ ',
                color: 'rgb(79,153, 202)',
                background: 'linear-gradient(rgb(79, 163, 202), rgb(31, 115, 163))',
                emoji: 'far fa-grin-alt',
                circle: 'sky-blue'
            },
            3:{
                condition: '양호',
                description: '현재 공기가 양호합니다.',
                color: 'rgb(46, 143, 156)',
                background: 'linear-gradient(rgb(46, 143, 156), rgb(48, 62, 143))',
                emoji: 'far fa-grin-wink',
                circle: 'cobalt'
            },
            4:{
                condition: '보통',
                description: '밖에 나갈 때 마스크를 착용해주세요.',
                color: 'rgb(62, 182, 140)',
                background: 'linear-gradient(rgb(62, 182, 126), rgb(33, 107, 62))',
                emoji: 'far fa-meh',
                circle: 'green'
            },
            5:{
                condition: '나쁨',
                description: '되도록 외출을 자제해 주세요.',
                color: 'rgb(255, 179, 102)',
                background: 'linear-gradient(rgb(255, 179, 102), rgb(230, 115, 0))',
                emoji: 'far fa-frown',
                circle: 'light blue',
                circle: 'orange'
            },
            6:{
                condition: '상당히 나쁨',
                description: '되도록 외출을 자제해 주세요.',
                color: 'rgb(230, 92, 0)',
                background: 'linear-gradient(rgb(230, 115, 0), rgb(230, 92, 0))',
                emoji: 'far fa-angry',
                circle: 'orange'
            },
            7:{
                condition: '매우 나쁨',
                description: '외출하지 마시길 권유드립니다.',
                color: 'rgb(255, 51, 0)',
                background: 'linear-gradient(rgb(255, 92, 51), rgb(255, 51, 0))',
                emoji: 'far fa-tired',
                circle: 'red'
            },
            8:{
                condition: '최악',
                description: '미세먼지 최악입니다. 나가지 마세요.',
                color: 'rgb(31, 46, 46)',
                background: 'linear-gradient(rgb(58, 61, 66), rgb(31, 46, 46))',
                emoji: 'far fa-dizzy',
                circle: 'black'
            }
        }


        function getPm10Grade(value){
            if (value === '-'){
                return '-'
            }else if (value < 16) {
                return 1
            }else if (value < 31) {
                return 2
            }else if (value < 41) {
                return 3
            }else if (value < 51) {
                return 4
            }else if (value < 76) {
                return 5
            }else if (value < 101) {
                return 6
            }else if (value < 151) {
                return 7
            }else {
                return 8
            }
        }

        function getPm25Grade(value){
            if (value === '-'){
                return '-'
            }else if (value < 9) {
                return 1
            }else if (value < 16) {
                return 2
            }else if (value < 21) {
                return 3
            }else if (value < 25) {
                return 4
            }else if (value < 38) {
                return 5
            }else if (value < 51) {
                return 6
            }else if (value < 76) {
                return 7
            }else {
                return 8
            }
        }

        function getO3Grade(value){
            if (value === '-'){
                return '-'
            }else if (value <= 0.02) {
                return 1
            }else if (value <= 0.03) {
                return 2
            }else if (value <= 0.06) {
                return 3
            }else if (value <= 0.09) {
                return 4
            }else if (value <= 0.12) {
                return 5
            }else if (value <= 0.15) {
                return 6
            }else if (value <= 0.38) {
                return 7
            }else {
                return 8
            }
        }

        function getCoGrade(value){
            if (value === '-'){
                return '-'
            }else if (value <= 1) {
                return 1
            }else if (value <= 2) {
                return 2
            }else if (value <= 5.5) {
                return 3
            }else if (value <= 9) {
                return 4
            }else if (value <= 12) {
                return 5
            }else if (value <= 15) {
                return 6
            }else if (value <= 32) {
                return 7
            }else {
                return 8
            }
        }

        function getNo2Grade(value){
            if (value === '-'){
                return '-'
            }else if (value <= 0.02) {
                return 1
            }else if (value <= 0.03) {
                return 2
            }else if (value <= 0.05) {
                return 3
            }else if (value <= 0.06) {
                return 4
            }else if (value <= 0.13) {
                return 5
            }else if (value <= 0.2) {
                return 6
            }else if (value <= 1.1) {
                return 7
            }else {
                return 8
            }
        }
        
        // highestGrade among all values, base value is 1
        let highestGrade = -1
        
        // pm10
        let currentGrade = getPm10Grade(pm10Value)
        // if currentGrade is greater than the highestGrade then update

        if (currentGrade !== '-'){
            highestGrade = currentGrade > highestGrade ? currentGrade : highestGrade
        }
    
        let pm10ConditionElement = document.getElementById('pm10-condition')

        // Set value & color
        pm10ConditionElement.textContent = WTO_Standard[currentGrade].condition
        pm10ConditionElement.style.color = WTO_Standard[currentGrade].color

        // Set emoji & its color
        let icon = document.getElementById('pm10-icon')
        icon.className = WTO_Standard[currentGrade].emoji
        icon.style.color = WTO_Standard[currentGrade].color

        let pm10Circle = document.querySelector('.pm10-circle')
        if (pm10Value !== '-') {
            let pm10Percent = Math.round((pm10Value/151) * 100)
            pm10Circle.className = `pm10-circle c100 p${pm10Percent} small ${WTO_Standard[currentGrade].circle}`
        }else{
            pm10Circle.className = `pm10-circle c100 p${0} small`
        }
        let = pm10CircleValue = document.querySelector('.pm10-circle-Value')
        pm10CircleValue.textContent = pm10Value + '㎍/㎥'
        pm10CircleValue.style.color = WTO_Standard[currentGrade].color

        // pm 2.5
        currentGrade = getPm25Grade(pm25Value)
        if (currentGrade !== '-'){
            highestGrade = currentGrade > highestGrade ? currentGrade : highestGrade
        }
    
        let pm25ConditionElement = document.getElementById('pm25-condition')

        pm25ConditionElement.textContent = WTO_Standard[currentGrade].condition
        pm25ConditionElement.style.color = WTO_Standard[currentGrade].color

        icon = document.getElementById('pm25-icon')
        icon.className = WTO_Standard[currentGrade].emoji
        icon.style.color = WTO_Standard[currentGrade].color

        let pm25Circle = document.querySelector('.pm25-circle')
        if (pm25Value !== '-') {
            let pm25Percent = Math.round((pm25Value/71) * 100)
            pm25Circle.className = `pm25-circle c100 p${pm25Percent} small ${WTO_Standard[currentGrade].circle}`
        }else{
            pm25Circle.className = `pm25-circle c100 p${0} small`
        }
        let = pm25CircleValue = document.querySelector('.pm25-circle-Value')
        pm25CircleValue.textContent = pm25Value + '㎍/㎥'
        pm25CircleValue.style.color = WTO_Standard[currentGrade].color

        // Set background color based on highestGrade 
        if (highestGrade === -1) {
            highestGrade = '-'
        }

        let background = document.querySelector('.container')
        //background.style.background = WTO_Standard[highestGrade].background
        
        // Set worst case pm based on highestGrade
        let pmConditionElement = document.getElementById('pm-condition')
        let pmDescriptionElement = document.getElementById('pm-description')

        //pmConditionElement.textContent = WTO_Standard[highestGrade].condition
        //pmDescriptionElement.textContent = WTO_Standard[highestGrade].description

        icon = document.getElementById('pm-icon')
        //icon.className = WTO_Standard[highestGrade].emoji

        // etc container

        currentGrade = getO3Grade(o3Value)
        document.querySelector('.o3-value').textContent = o3Value + 'ppm'
        const o3IconElement = document.getElementById('03-icon')
        o3IconElement.className = WTO_Standard[currentGrade].emoji
        o3IconElement.style.color = WTO_Standard[currentGrade].color
        const o3ConditionElement = document.querySelector('.o3-condition')
        o3ConditionElement.textContent = WTO_Standard[currentGrade].condition
        o3ConditionElement.style.color = WTO_Standard[currentGrade].color

        let o3Percent = Math.round((o3Value/0.09)*100)
        const o3Progress = document.querySelector('.o3-progress-done');
        o3Progress.setAttribute('data-done', o3Percent)
        o3Progress.style.width = o3Progress.getAttribute('data-done') + '%';
        o3Progress.style.background = WTO_Standard[currentGrade].background
        o3Progress.style.opacity = 1;

        currentGrade = getCoGrade(coValue)
        document.querySelector('.co-value').textContent = coValue + 'ppm'
        const coIconElement = document.getElementById('co-icon')
        coIconElement.className = WTO_Standard[currentGrade].emoji
        coIconElement.style.color = WTO_Standard[currentGrade].color
        const coConditionElement = document.querySelector('.co-condition')
        coConditionElement.textContent = WTO_Standard[currentGrade].condition
        coConditionElement.style.color = WTO_Standard[currentGrade].color
        
        let coPercent = Math.round((coValue/5.5)*100)
        const coProgress = document.querySelector('.co-progress-done');
        coProgress.setAttribute('data-done', coPercent)
        coProgress.style.width = coProgress.getAttribute('data-done') + '%';
        coProgress.style.background = WTO_Standard[currentGrade].background
        coProgress.style.opacity = 1;

        currentGrade = getNo2Grade(no2Value)
        document.querySelector('.no2-value').textContent = no2Value + 'ppm'
        const no2IconElement = document.getElementById('no2-icon')
        no2IconElement.className = WTO_Standard[currentGrade].emoji
        no2IconElement.style.color = WTO_Standard[currentGrade].color
        const no2ConditionElement = document.querySelector('.no2-condition')
        no2ConditionElement.textContent = WTO_Standard[currentGrade].condition
        no2ConditionElement.style.color = WTO_Standard[currentGrade].color

        
        let no2Percent = Math.round((no2Value/0.06)*100)
        const no2Progress = document.querySelector('.no2-progress-done');
        no2Progress.setAttribute('data-done', no2Percent)
        no2Progress.style.width = no2Progress.getAttribute('data-done') + '%';
        no2Progress.style.background = WTO_Standard[currentGrade].background
        no2Progress.style.opacity = 1;
        

    }
});