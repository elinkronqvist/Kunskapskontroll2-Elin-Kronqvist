const apiKey = '069fe69d06fd69affcdb7b7e11bfad19';
let cityName = 'Helsingborg';

//ändra metric till celsius




let formElement = document.querySelector('#form');

formElement.addEventListener('submit', 
    function(event){
        event.preventDefault();

        let cityInput = document.querySelector('#city');

        let city = cityInput.value;
        cityInput.value = '';
        if (city == ''){
            alert('Välj en stad');
        }


        /* //skapar ett element för h3 där den aktuella staden visas
        h3Element = document.querySelector('.city-header');
        //ger elementet värdet av city från input value
        h3Element.innerText = city;
        //ändrar första bokstaven till versal
        h3Element.style.textTransform = 'capitalize'; */
        /* resetInput();
        function resetInput(){
            h3Element = document.querySelector('.city-header').reset();
        } */

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=069fe69d06fd69affcdb7b7e11bfad19&lang`;


        fetch(url).then(
            function(response){
                //responset innehåller en header med info om hur det har gått 
            console.log(response);

            //let h3Element = document.querySelector('.city-header');
            //h3Element.innerHTML = 'Staden kunde inte hittas';

        
            //statuskod 200 - 299 betyder att allt har gått bra
            if(response.status >= 200 && response.status <300){
                return response.json();
                //statuskod 404 "not found" kommer vi hantera som ett error
            // i vårat fall betyder det att staden inte kunde hittas
            }else if(response.status === 404){
                alert('Staden kunde inte hittas');
                throw 'Staden kunde inte hittas';

                //statuskod 401 "unauthorized" kommer att hanters som ett error
                //i detta fall betyder det att api nyckeln är fel
            }else if(response.status === 401){
                alert ('Fel API-nyckel');
                throw response.statusText, 'Fel API-nyckel';
            }
            
            }
        ).then(
            function(data){
                //skapar variabler för de olika data vi vill få fram
                let iconImg = data.weather[0].icon;
                let description = data.weather[0].description;
                let temperature = data.main.temp;
                let temperatureFeelsLike = data.main.feels_like;
                let wind = data.wind.speed;
                let humidity = data.main.humidity;

                //kallar på funktionen som vi skapar nedan, samt lägger in argumenten vi vill presentera
                presentData(iconImg, description, temperature, temperatureFeelsLike, wind, humidity);

                //skapar ett element för h3 där den aktuella staden visas
                h3Element = document.querySelector('.city-header');
                //ger elementet värdet av city från input value
                h3Element.innerText = city;
                //ändrar första bokstaven till versal
                h3Element.style.textTransform = 'capitalize';

                //ändra bakgrund på middle beroende på väder:
                function weatherBackground(){
                    let middleElement = document.querySelector('#middle');
                    middleElement.style.backgroundImage = `url(/img/${iconImg}.jpg)`;
                    middleElement.style.backgroundRepeat = 'no-repeat';
                }

                weatherBackground();
                
                //behövs dessa två nedan?? ligger dubbelt?
                /* let cityInput = document.querySelector('#city');
                let city = cityInput.value;
                cityInput.value = ''; */
                
                //om det raderas i sökfältet ska även värdena raderas??
                /* if(city === null){
                } */

                //skapar en eventlistener på input-fältet som gör att datan raderas när man klickar för att söka efter en ny stad.
                cityInput.addEventListener('click', resetData);
                
                //behövs denna?
                /* setTimeout(
                    function(){ //denna funkar??
                        console.log('heeeelloo');
                        
                        resetData();
                        //cityInput.reset();
                        //reset(description, temperature, temperatureFeelsLike, wind, humidity);
                    }, 1000 // millisekunder
                ) */   
                }
        ).catch(
            function(error){
                console.log(error);
                //skapar element för h3 för att kunna skriva ut ett meddelande i webbläsaren 

                //funkar ej längre när jag kallar på function? varför?
                //let h3Element = document.querySelector('.city-header');
                //h3Element.innerHTML = 'Staden kunde inte hittas';

                
                //skickar ett meddelande till användaren  
                
                //alert funkar ej om man kör h3.innerText ??

                //kallar på funktionen som gör restet på all data som vi fått fram efter sökning. denna ska inte ligga här??
                resetData(); 
            }
        )
    }
);

//skapar en funktion som presenterar datan vi får ut ur url:en
function presentData(i, d, t, tTwo, w, h){

    //skapar ett element för ikonen
    let iconWeatherElement = document.querySelector('#icon');
    //hämtar informationen 
    let iconUrl = `http://openweathermap.org/img/wn/${i}@2x.png`;

    //tilldelar elementet en src från url:en
    iconWeatherElement.src = iconUrl;



    /* -------------- Ändra bakgrund på main beroende på väder: ------------*/

    /* function weatherBackground(){
        let weatherImg = 
        mainElement.style.backgroundImage = `url('/img/${weatherImg}.jpg)`;
    } */
/* 
    let middleElement = document.querySelector('#middle');
    if (i == '01d'){
        middleElement.style.backgroundImage = "url('/img/clear-sky.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '02d'){
        middleElement.style.backgroundImage = "url('/img/few-clouds.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '03d'){
        middleElement.style.backgroundImage = "url('/img/scattered-clouds.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '04d'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')"; 
        middleElement.style.backgroundRepeat = 'no-repeat';

    }else if (i == '09d'){
        middleElement.style.backgroundImage = "url('/img/shower-rain.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '10d'){
        middleElement.style.backgroundImage = "url('/img/rain.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '11d'){
        middleElement.style.backgroundImage = "url('/img/thunderstorm.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '13d'){
        middleElement.style.backgroundImage = "url('/img/snow.jpg')";
        middleElement.style.backgroundRepeat = 'no-repeat';
    }else if (i == '50d'){
        middleElement.style.backgroundImage = "url('/img/mist4.jpg')";
    }else if (i == '01n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '02n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '03n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '04n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '09n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '10n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '11n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '13n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '50n'){
        middleElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }
    //funkar ej??  */

    
   /*  let mainElement = document.querySelector('.main');
    if (i == '01d'){
        mainElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '02d'){
        mainElement.style.backgroundColor = 'blue';
    }else if (i == '03d'){
        mainElement.style.backgroundColor = 'green';
    }else if (i == '04d'){
        mainElement.style.backgroundImage = "url('/img/broken-clouds.jpg')"; 
    }else if (i == '09d'){
        mainElement.style.backgroundColor = 'hotpink';
    }else if (i == '10d'){
        mainElement.style.backgroundImage = "url('rain.jpg')"; 
    }else if (i == '11d'){
        mainElement.style.backgroundColor = 'white';
    }else if (i == '13d'){
        mainElement.style.backgroundColor = 'black';
    }else if (i == '50d'){
        mainElement.style.backgroundColor = 'orange';
    }else if (i == '01n'){
        mainElement.style.backgroundColor = 'violet';
    }else if (i == '02n'){
        mainElement.style.backgroundColor = 'blue';
    }else if (i == '03n'){
        mainElement.style.backgroundColor = 'green';
    }else if (i == '04n'){
        mainElement.style.backgroundImage = "url('/img/broken-clouds.jpg')";
    }else if (i == '09n'){
        mainElement.style.backgroundColor = 'hotpink';
    }else if (i == '10n'){
        mainElement.src = '/img/rain.jpg';
    }else if (i == '11n'){
        mainElement.style.backgroundColor = 'white';
    }else if (i == '13n'){
        mainElement.style.backgroundColor = 'black';
    }else if (i == '50n'){
        mainElement.style.backgroundColor = 'orange';
    }
    //funkar ej??  */



    //skapar ett element för description
    let descriptionElement = document.querySelector('#description');

/*     //lägger in en funktion som gör om första bokstaven till en versal
    function capitalizeFirstLetter(d){
        return d.charAt(0).toUpperCase() + d.slice(1);
    }
    descriptionElement.innerText = capitalizeFirstLetter(d); */
    descriptionElement.innerText = d;
    descriptionElement.style.textTransform = 'capitalize';

    //lägger till bakgrundsfärg
    descriptionElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';
    
    //skapar ett element för temperature + feels_like
    let temperatureElement = document.querySelector('#temperature');
    let temperatureFeelsLikeElement = document.querySelector('#temperature');

    function mathRound(x) {
        return Math.round(x);
    };

    temperatureElement.innerText = `Temperature: ${mathRound(t)} \u00B0 \n Feels like: ${mathRound(tTwo)} \u00B0`;
    if (t >= -20 && t <= 5){
        temperatureElement.style.color = 'rgb(223, 228, 240)';     
    } else if (t >= 5 && t <= 15){
        temperatureElement.style.color = 'blue';
    } 
    else if (t >= 15 && t <= 20) {
        temperatureElement.style.color = 'green'; 
    } 
    else if(t >= 20 && t <= 25){
        temperatureElement.style.color = 'orange';
    } else if (t >= 25){
        temperatureElement.style.color = 'red';
    } 

    //lägger till bakgrundsfärg
    temperatureElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';

    //skapar ett element för wind
    let windElement = document.querySelector('#wind');
    windElement.innerText = `Wind: ${w} m/s`;

    //lägger till bakgrundsfärg
    windElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';

    //skapar ett element för humidity
    let humidityElement = document.querySelector('#humidity');
    humidityElement.innerText = `Humidity: ${h} %`;

    //lägger till bakgrundsfärg
    humidityElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';
}


function resetData(){
    //skapar ett element för ikonen
    let iconWeatherElement = document.querySelector('#icon');
    //ändrar värdet till '' för att inget ska visas
    iconWeatherElement.src = '';

    //skapar ett element för description
    let descriptionElement = document.querySelector('#description');
    //ändrar värdet till null för att inget ska visas
    descriptionElement.innerText = null;
    //tar bort bakgrundsfärgen
    descriptionElement.style.backgroundColor = '';

    let temperatureElement = document.querySelector('#temperature');
    let temperatureFeelsLikeElement = document.querySelector('#temperature');
    //ändrar värdet till null för att inget ska visas
    temperatureElement.innerText = null;
    //tar bort bakgrundsfärgen
    temperatureElement.style.backgroundColor = '';

    //skapar ett element för wind
    let windElement = document.querySelector('#wind');
    //ändrar värdet till null för att inget ska visas
    windElement.innerText = null;
    //tar bort bakgrundsfärgen
    windElement.style.backgroundColor = '';
    
    //skapar ett element för humidity
    let humidityElement = document.querySelector('#humidity');
    //ändrar värdet till null för att inget ska visas
    humidityElement.innerText = null;
    //tar bort bakgrundsfärgen  
    humidityElement.style.backgroundColor = '';

    //skapar ett element för h3 där den aktuella staden visas
    h3Element = document.querySelector('.city-header');
    //ändrar värdet till null för att inget ska visas
    h3Element.innerText = null;

    //skapar ett element för main
    let mainElement = document.querySelector('.main');
    //ändrar bakgrunden till inget värde
    mainElement.style.backgroundImage = '';

    //skapar ett element för #middle
    let middleElement = document.querySelector('#middle');
    //ändrar bakgrunden till inget värde
    middleElement.style.backgroundImage = '';


    
}

