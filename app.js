
const apiKey = '069fe69d06fd69affcdb7b7e11bfad19';
let cityName = 'Helsingborg';



//skapar ett element för #form
let formElement = document.querySelector('#form');

//lägger till en eventlistener
formElement.addEventListener('submit', 
    function(event){
        event.preventDefault();

        //skapar ett element för city
        let cityInput = document.querySelector('#city');

        //skapar en variabel som sparar det inmatade värdet i input
        let city = cityInput.value;
        //efter en inmatning i input ändras rutan till tom
        cityInput.value = '';
        // en if-sats som skickar ett meddelande om användaren gör en sökning utan att ha skrivit in något i input-fältet 
        if (city == ''){
            alert('Välj en stad');
        }

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=069fe69d06fd69affcdb7b7e11bfad19&lang`;


        fetch(url).then(
            function(response){
                //responset innehåller en header med info om hur det har gått 
            console.log(response);

            //statuskod 200 - 299 betyder att allt har gått bra
            if(response.status >= 200 && response.status <300){
                return response.json();
                //statuskod 404 "not found" kommer vi hantera som ett error
            // i vårat fall betyder det att staden inte kunde hittas
            }else if(response.status === 404){
                //skickar ett meddelande till användaren
                alert('Staden kunde inte hittas');
                //meddelande i consolen
                throw 'Staden kunde inte hittas';

                //statuskod 401 "unauthorized" kommer att hanters som ett error
                //i detta fall betyder det att api nyckeln är fel
            }else if(response.status === 401){
                //skickar ett meddelande till användaren
                alert ('Fel API-nyckel');
                //meddelande i consolen
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

                //skapar en funktion som ändrar bakgrund på #middle beroende på väder:
                function weatherBackground(){
                    //skapar ett element för #middle
                    let middleElement = document.querySelector('#middle');
                    //ger elementet en bakgrundsbild beroende av vilket väder ikonen från url:en visar
                    middleElement.style.backgroundImage = `url(/img/${iconImg}.jpg)`;
                    middleElement.style.backgroundRepeat = 'no-repeat';
                }

                //kallar på funktionen som ändrar bakgrunden
                weatherBackground();
                
                //skapar en eventlistener på input-fältet som gör att datan raderas när man klickar för att söka efter en ny stad.
                cityInput.addEventListener('click', resetData);
                  
                }
        ).catch(
            function(error){
                console.log(error);

                //kallar på funktionen som gör restet på all data som vi fått fram efter sökning.
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

    //skapar ett element för description
    let descriptionElement = document.querySelector('#description');
    // ger elementet ett värde
    descriptionElement.innerText = d;
    //gör om första bokstaven till Versal
    descriptionElement.style.textTransform = 'capitalize';

    //lägger till bakgrundsfärg
    descriptionElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';
    
    //skapar ett element för temperature + feels_like
    let temperatureElement = document.querySelector('#temperature');
    let temperatureFeelsLikeElement = document.querySelector('#temperature');

    //skapar en funktion som avrundar till ett heltal
    function mathRound(x) {
        return Math.round(x);
    };

    // ger elementet ett värde samt med hjälp av en if-sats ändras färgen på texten som visar temperatur
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
    //ger elementet ett värde
    windElement.innerText = `Wind: ${w} m/s`;

    //lägger till bakgrundsfärg
    windElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';

    //skapar ett element för humidity
    let humidityElement = document.querySelector('#humidity');
    //ger elementet ett värde
    humidityElement.innerText = `Humidity: ${h} %`;

    //lägger till bakgrundsfärg
    humidityElement.style.backgroundColor = 'rgba(61, 60, 60, 0.322)';
}

//skapar en funktion som rensar bort datan när användaren klickar i inputfältet
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

    //skapar ett element för #middle
    let middleElement = document.querySelector('#middle');
    //ändrar bakgrunden till inget värde
    middleElement.style.backgroundImage = '';  
}

