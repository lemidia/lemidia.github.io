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
            const api = `${proxy}https://api.darksky.net/forecast/0b4a39b98b9129fdc454d3116ee13ad9/${lat},${long}`;

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