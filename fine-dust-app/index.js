window.addEventListener('load', () =>{
    let long;
    let lat;
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    // 사용자의 현재 위치: 경도, 위도 값을 TM 좌표계로 변환
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude; // 경도 x
            lat = position.coords.latitude;   // 위도 y

            const input_coord = 'WGS84'
            const output_coord = 'TM'

            // KaKao REST API: 죄표계 변환, WGS84 to TM 
            // params : x: longitude
            //          y: latitude
            //          input_coord: transition from
            //          output_coord: transition to
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
                        setElement(stationName, dataTime, pm10Value, pm25Value, o3Value, no2Value, coValue)
                    })
                })
            })
        }, () => {
            alert("You have denied the location information or please confirm the location");
        });
    } else{
        alert("Geolocation is not supported by your browser");
    }

    function setElement(stationName, dataTime, pm10Value, pm25Value, o3Value, no2Value, coValue){
        let currentLocation = document.querySelector('.current-location')
        let currentTime = document.querySelector('.current-time')
        currentLocation.textContent = '현재 측정 장소: ' + stationName
        currentTime.textContent = '현재 시간: ' + dataTime

        const WTO_Standard = {
            1:{
                condition: '아주 좋음',
                description: '현재 공기가 매우 좋습니다 ^o^! ',
                background: 'linear-gradient(rgb(51, 133, 255), rgb(0, 82, 204))',
                emoji: 'far fa-laugh-beam'
            },
            2:{
                condition: '좋음',
                description: '현재 공기가 좋습니다 ^o^ ',
                background: 'linear-gradient(rgb(77, 210, 255), rgb(0, 172, 230))',
                emoji: 'far fa-grin-alt'
            },
            3:{
                condition: '양호',
                description: '현재 공기가 양호합니다.',
                background: 'linear-gradient(rgb(46, 143, 156), rgb(48, 62, 143))',
                emoji: 'far fa-grin-wink'
            },
            4:{
                condition: '보통',
                description: '밖에 나갈 때 마스크를 착용해주세요.',
                background: 'linear-gradient(rgb(0, 179, 60), rgb(0, 77, 26))',
                emoji: 'far fa-meh'
            },
            5:{
                condition: '나쁨',
                description: '되도록 외출을 자제해 주세요.',
                background: 'linear-gradient(rgb(255, 179, 102), rgb(230, 115, 0))',
                emoji: 'far fa-frown'
            },
            6:{
                condition: '상당히 나쁨',
                description: '되도록 외출을 자제해 주세요.',
                background: 'linear-gradient(rgb(230, 115, 0), rgb(230, 92, 0))',
                emoji: 'far fa-angry'
            },
            7:{
                condition: '매우 나쁨',
                description: '외출하지 마시길 권유드립니다.',
                background: 'linear-gradient(rgb(255, 92, 51), rgb(255, 51, 0))',
                emoji: 'far fa-tired'
            },
            8:{
                condition: '최악',
                description: '미세먼지 최악입니다. 나가지 마세요.',
                background: 'linear-gradient(rgb(71, 107, 107), rgb(31, 46, 46))',
                emoji: 'far fa-dizzy'
            }
        }

        function getGrade(value){
            if (value < 16) {
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
        
        // highestGrade among all values, base value is 1
        let highestGrade = 1
        
        // pm10
        let currentGrade = getGrade(pm10Value)
        // if currentGrade is greater than the highestGrade then update
        highestGrade = currentGrade > highestGrade ? currentGrade : highestGrade
    
        let pm10ValueElement = document.querySelector('.pm10-value')
        let pm10ConditionElement = document.getElementById('pm10-condition')
        let pm10DescriptionElement = document.getElementById('pm10-description')

        // Set value
        pm10ValueElement.textContent = pm10Value
        pm10ConditionElement.textContent = WTO_Standard[currentGrade].condition
        pm10DescriptionElement.textContent = WTO_Standard[currentGrade].description

        // Set emoji
        let icon = document.getElementById('pm10-icon')
        icon.className = WTO_Standard[currentGrade].emoji

        // pm 2.5
        currentGrade = getGrade(pm25Value)
        highestGrade = currentGrade > highestGrade ? currentGrade : highestGrade
    
        let pm25ValueElement = document.querySelector('.pm25-value')
        let pm25ConditionElement = document.getElementById('pm25-condition')
        let pm25DescriptionElement = document.getElementById('pm25-description')

        pm25ValueElement.textContent = pm25Value
        pm25ConditionElement.textContent = WTO_Standard[currentGrade].condition
        pm25DescriptionElement.textContent = WTO_Standard[currentGrade].description

        icon = document.getElementById('pm25-icon')
        icon.className = WTO_Standard[currentGrade].emoji

        // Set background color based on highestGrade 
        let background = document.querySelector('.container')
        background.style.background = WTO_Standard[highestGrade].background

    }

});