    Chart.register(
        Chart.BarController,
        Chart.BarElement,
        Chart.CategoryScale,
        Chart.LinearScale,
        Chart.Title,
        Chart.Tooltip,
        Chart.Legend
    );
    

const api_key ='fd9b78826d5313869de0f7d26ed00cf5'

let city_name = document.getElementById("city_name");
let search_button = document.getElementById("search_button");

//This is to see what unit is being used
let unit_temp = "K"
let unit = null
let kelvin_radio = document.getElementById("kelvin")

//These are the card details:
let cityName = document.getElementById("cityName")
let temperature = document.getElementById("temp")
let humidity = document.getElementById("humidity")
let windSpeed = document.getElementById("windspeed")
let weather = document.getElementById("weather")
let weather_icon = document.getElementById("weather-icon")


//All charts
let barChart = null;
let lineChart = null;
let donutChart = null;

//Buttons for dashboard and table
let dashboardBT = document.getElementById("select-1");
let tableBT = document.getElementById("select-2");



let city_data = null;


let defaultData = null
async function updateWeather(){
        if(kelvin_radio.checked)
        {
            unit_temp = "K"
            unit="standard"
        }
        else{
            unit_temp = "C"
            unit="metric"
        }
        let city = city_name.value
        if(city === '')
        {
            return;
        }
        let weather_api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
        
        
            //Get the cities lats and lons with this
            city_data = await fetch(weather_api).then(data=>data.json()).catch((err)=>{
                alert("An error occured!")
                return;
            })
        
            if(city_data.length ===0)
            {
                alert("Error occured! Please try searching again")
                return;
            }


        if(city_data[0] == undefined)
            return;
        let city_lat = city_data[0].lat
        let city_lon = city_data[0].lon 
        //Now that we have the lats and lon of the city we just need to get the weather data now
        weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${city_lat}&lon=${city_lon}&appid=${api_key}&units=${unit}`
        city_data = await fetch(weather_api).then(data=>data.json()).catch((err)=>{
            alert("An error occured!")
        })
    
    
        //We have the city data and now we edit the elements using DOM manipulation
        cityName.innerText = city_data.name;
        temperature.innerHTML = `${city_data.main.temp} °${unit_temp}`;
        weather.innerText = city_data.weather[0].description
        weather.innerText = weather.innerText.charAt(0).toUpperCase() + weather.innerText.slice(1)
        windSpeed.innerText = city_data.wind.speed +' m/s'
        humidity.innerText = city_data.main.humidity + ' %'
        weather_icon.src = `https://openweathermap.org/img/wn/${city_data.weather[0].icon}@2x.png`

        //Now here we will change the background image according to the weather condition
        let backgroundImg = document.getElementsByTagName("html")[0];
        if(city_data.weather[0].icon === '01d')//When sky is sunny and clear
        {
            backgroundImg.style.backgroundImage = "url('./daysky.jpg')";
        }
        else if(city_data.weather[0].icon === '01n')//when sky is clear and night
        {
            backgroundImg.style.backgroundImage = "url('./nightsky.jpg')";
        }
        else if(city_data.weather[0].icon === '02d')//when flew clouds and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./daysky.jpg')";
        }
        else if(city_data.weather[0].icon === '02n')//when few clouds and night
        {
            backgroundImg.style.backgroundImage = "url('./nightsky.jpg')";
        }
        else if(city_data.weather[0].icon === '03d')//when scattered clouds and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./cloudyday.jpg')";
        }
        else if(city_data.weather[0].icon === '03n')//when scatterd clouds and night
        {
            backgroundImg.style.backgroundImage = "url('./cloudyNight.jpg')";
        }
        else if(city_data.weather[0].icon === '04d')//when broken clouds and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./cloudyday.jpg')";
        }
        else if(city_data.weather[0].icon === '04n')//when broken clouds and night
        {
            backgroundImg.style.backgroundImage = "url('./cloudyNight.jpg')";
        }
        else if(city_data.weather[0].icon === '09d')//when shower rain and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./rain.jpg')";
        }
        else if(city_data.weather[0].icon === '09n')//when shower rain and night
        {
            backgroundImg.style.backgroundImage = "url('./rain.jpg')";
        }
        else if(city_data.weather[0].icon === '10d')//when rain and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./rain.jpg')";
        }
        else if(city_data.weather[0].icon === '10n')//when rain and night
        {
            backgroundImg.style.backgroundImage = "url('./rain.jpg')";
        }
        else if(city_data.weather[0].icon === '11d')//when thunderstorm and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./thunderstorm.jpg')";
        }
        else if(city_data.weather[0].icon === '11n')//when thunderstorm and night
        {
            backgroundImg.style.backgroundImage = "url('./thunderstorm.jpg')";
        }
        else if(city_data.weather[0].icon === '13d')//when snow and day 
        {
            backgroundImg.style.backgroundImage = "url('./snowDay.jpg')";
        }
        else if(city_data.weather[0].icon === '13n')//when snow and night
        {
            backgroundImg.style.backgroundImage = "url('./snowNight.jpg')";
        }
        else if(city_data.weather[0].icon === '50d')//when scattered clouds and sunny 
        {
            backgroundImg.style.backgroundImage = "url('./smoke.jpg')";
        }
        else if(city_data.weather[0].icon === '50n')//when scatterd clouds and night
        {
            backgroundImg.style.backgroundImage = "url('./smokeNight.jpg')";
        }



        let fiveDaysData = null;
        fiveDaysData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city_lat}&lon=${city_lon}&appid=${api_key}&units=${unit}`).then(data=>data.json()).catch((err)=>{
            alert("An error occured")
        })
        
        city_data = fiveDaysData
        //Now we create All the charts
        displayBarChart(fiveDaysData.list);
        displayLineChart(fiveDaysData.list);
        displayDonutChart(fiveDaysData.list);
        document.getElementsByClassName("charts")[0].style.display = 'block'
        document.getElementsByClassName("charts")[1].style.display = 'block'
        document.getElementsByClassName("charts")[2].style.display = 'block'
        defaultData = fiveDaysData.list
        populateTable(fiveDaysData.list)
    }


search_button.addEventListener("click",updateWeather);
city_name.addEventListener("keypress",(e)=>{
    if(e.key=="Enter")
    {
        updateWeather();
    }
});


async function displayBarChart(data){
    const labels = ['Today','2nd Day','3rd Day','4th Day','5th Day'];

    const d = {
    labels: labels,
    datasets: [{
        label: 'Temperatures for the next 5 days',
        data: [data[0].main.temp,data[8].main.temp,data[16].main.temp,data[24].main.temp,data[32].main.temp],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
    };

    const ctx = document.getElementById('barChart').getContext('2d');
    if(barChart)
    {
        barChart.data = d;
        barChart.update();
    }
    else{
        barChart = new Chart(ctx, {
            type:'bar',
            data: d,    
            options: {
                animation: {
                    duration: 1000, 
                    delay: (context) => context.dataIndex * 300, 
                },
                scales: {
                    y: {
                        beginAtZero: true 
                    }
                }
                ,responsive: true, // Make the chart responsive
                maintainAspectRatio: false
            }
        });
    }
    
}


async function displayLineChart(data){
    const labels = ['Today','2nd Day','3rd Day','4th Day','5th Day'];
    //console.log([data[0].dt_txt,data[8].dt_txt,data[16].dt_txt,data[24].dt_txt,data[32].dt_txt])
    const d = {
    labels: labels,
    datasets: [{
        label: 'Temperatures for the next 5 days',
        data: [data[0].main.temp,data[8].main.temp,data[16].main.temp,data[24].main.temp,data[32].main.temp],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
    };

    const ctx = document.getElementById('lineChart').getContext('2d');
    if(lineChart)
    {
        lineChart.data = d;
        lineChart.update();
    }
    else{
        lineChart = new Chart(ctx, {
            type:'line',
            data: d,    
            options: {
                animation: {
                    duration: 1000, 
                    easing: 'easeOutBounce', 
                    
                    animations: {
                        y: {
                            from: -2000 
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true 
                    }
                },
                
                responsive: true, // Make the chart responsive
                maintainAspectRatio: false
            }
        });
    }
    
}



async function displayDonutChart(data){//This is to display the donutchart
    const labels = ['Today','2nd Day','3rd Day','4th Day','5th Day'];

    const d = {
    labels: labels,
    datasets: [{
        label: 'Temperatures for the next 5 days',
        data: [data[0].main.temp,data[8].main.temp,data[16].main.temp,data[24].main.temp,data[32].main.temp],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
    };

    const ctx = document.getElementById('doughnutChart').getContext('2d');
    if(donutChart)
    {
        donutChart.data = d;
        donutChart.update();
    }
    else{
        donutChart = new Chart(ctx, {
            type:'doughnut',
            data: d,    
            options: {
                animation: {
                    duration: 1000, 
                    delay: (context) => context.dataIndex * 300,
                    animations: {
                        y: {
                            from: -2000 
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true 
                    }
                
                }
                ,responsive: true, // Make the chart responsive
                maintainAspectRatio: false
            }
        });
    }
    
}


dashboardBT.addEventListener("click",()=>{
    
    if(city_data !=null)
    {
        document.getElementById("tables").style.display = 'none'
        document.getElementById("dashboard").style.display = 'flex'
    }
    
})

tableBT.addEventListener("click",()=>{
    if(city_data !=null)
        {
    document.getElementById("dashboard").style.display = 'none'
    document.getElementById("tables").style.display = 'flex'
        }
        else{
            alert("Please search a city first!")
        }
    
})

//This is the code for the chatbot
let querySearch = document.getElementById("sendQuestion");

let geminiAPI = 'AIzaSyD9qqA4kCeoC9px7HYw2qIVar5nhqM9e6o';

async function chatResponse(){//Used to append the chat bot response to the chatbot Text area
    if(city_data == null)
    {
        alert("Please search a city first!")
        return;
    }
    let prompt = document.getElementById('question').value

    let modifiedPrompt = 'You are a weather assitant chat bot for my website and you will only answer to weather related queries for the user.You will answer the users queries using this following Data = ' + JSON.stringify(city_data) + 'User prompt = ' + prompt
    
    let loading = document.createElement('div')
    loading.classList.add('loader')
    document.getElementById('chatarea').appendChild(loading)
    let answer = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiAPI}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
            {
                parts: [
                {
                    text: modifiedPrompt
                }
                ]
            }
            ]
        })
    })
    .then(response => response.json()).catch((err)=>{
        alert("An error occured in the chatbot!")
        loading.remove()
        return null
    })
    if(answer == null)
    {
        loading.remove()
        return;
    }
    
    loading.remove()
    let text = document.createElement('div');
    text.classList.add('chatBotText')
    let textToAdd = answer.candidates[0].content.parts[0].text
    document.getElementById('chatarea').appendChild(text)
    
    let i =0;
    let speed = 15
    function typeWriter() {
        if (i < textToAdd.length) {
         text.textContent += textToAdd.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
          
        }
      }
      typeWriter()
    //text.textContent = answer.candidates[0].content.parts[0].text
    //document.getElementById('chatarea').appendChild(text)
}



//These are event listeners for the button and when the enter key is pressed then give prompt to chat bot
querySearch.addEventListener("click",chatResponse);

document.getElementById("question").addEventListener("keypress",(e)=>{
    
    if(e.key=="Enter")
    {
        chatResponse();
    }
});

//These are variables used for helping in the pagination and populating the table
let current_page = 0;
let actualTable = document.getElementById("forecastBody")
let tableData = null
async function populateTable(data){//This function will be used for populating the table intially
    if(data.length === 0)
    {
        return 0
    }
    actualTable.innerHTML = ''
    current_page = 0;
    tableData = data
    let limit = current_page+8
    for(let i=current_page;i<limit && data[i];i++)
    {
        let newRow = document.createElement("tr")
        actualTable.appendChild(newRow);

        //Creating elements for date,temp and weatherCondition
        let date = document.createElement("td")
        date.innerText = data[i].dt_txt
        
        let temp = document.createElement("td")
        temp.innerText = data[i].main.temp + ' °'+unit_temp

        let weatherCondition = document.createElement("td")
        weatherCondition.innerText = captallizeSentence(data[i].weather[0].description)

        newRow.appendChild(date)
        newRow.appendChild(temp)
        newRow.appendChild(weatherCondition)


        current_page++;

    }
    
}




function captallizeSentence(str)//This function is used to captialize the first character of each word
{
    let result = ''
    let cap = false
    for(let i =0;i<str.length;i++)
    {
        if(i==0 || cap)
        {
            result+= str[i].toUpperCase()
            cap = false
        }
        else if(str[i]>='a' && str[i]<='z')
        {
            result+= str[i]
        }
        else if(str[i] == ' ')
        {
            result += str[i]
            cap = true;
        }

    }
    
    return result
}



//This is for the buttons for previous and next in the table below
let prevBT = document.getElementById('prev')
let nextBT = document.getElementById('next')

nextBT.addEventListener('click',()=>{
    if(tableData.length === 0)
        {return}
    if(city_data == null)
    {
        return
    }
    if(current_page == tableData.length || !(tableData[current_page]))
    {
        return;
    }
    let data = tableData
    actualTable.innerHTML = ''
    let start = current_page
    let end = tableData.length
    let limit = end/5
    for(let i=current_page;i<start+limit && data[i];i++)
    {
        let newRow = document.createElement("tr")
        actualTable.appendChild(newRow);

        //Creating elements for date,temp and weatherCondition
        let date = document.createElement("td")
        date.innerText = data[i].dt_txt
        
        let temp = document.createElement("td")
        temp.innerText = data[i].main.temp + ' °'+unit_temp

        let weatherCondition = document.createElement("td")
        weatherCondition.innerText = captallizeSentence(data[i].weather[0].description)

        newRow.appendChild(date)
        newRow.appendChild(temp)
        newRow.appendChild(weatherCondition)


        current_page++;

    }


})


    
prevBT.addEventListener('click',()=>{
    if(tableData.length === 0)
        {return}
    if(tableData.length === 1)
    {
        return
    }
    if(city_data == null)
        {
            return
        }
        if(current_page <= Math.floor(tableData.length/5))
        {
            return;
        }
        let data = tableData
        actualTable.innerHTML = ''
        let start = current_page
        let end = tableData.length
        let limit = Math.floor(end/5)
        
        start = start - limit*2
        current_page = start
        if(start === 1)
        {
            current_page = 0
            start = 0
        }
       
        for(let i=start;i<start+limit && data[i];i++)
        {
            let newRow = document.createElement("tr")
            actualTable.appendChild(newRow);
    
            //Creating elements for date,temp and weatherCondition
            let date = document.createElement("td")
            date.innerText = data[i].dt_txt
            
            let temp = document.createElement("td")
            temp.innerText = data[i].main.temp + ' °'+unit_temp
    
            let weatherCondition = document.createElement("td")
            weatherCondition.innerText = captallizeSentence(data[i].weather[0].description)
    
            newRow.appendChild(date)
            newRow.appendChild(temp)
            newRow.appendChild(weatherCondition)
    
    
            current_page++;
    
        }
    

})


//Now we have to add the functionality for filter options
let filterOption = document.getElementById("filterOptions")

//Call the function in accordance with the sorting required by the user
filterOption.addEventListener("change",()=>{
    let selectedOption = filterOption.value
    current_page = 0
    if(selectedOption === 'default')
    {
        populateTable(defaultData)
    }
    else if(selectedOption === 'ascending')
    {
        ascendingOrder()
    }
    else if(selectedOption === 'descending')
    {
        descendingOrder()
    }
    else if(selectedOption === 'withoutRain')
    {
        withoutRain()
    }
    else if(selectedOption === 'hightestT')
    {
        highestTemp()
    }
})


function ascendingOrder(){
    actualTable.innerHTML = ''
    current_page = 0;
    tableData = defaultData //Getting default value and sorting on it
    tableData.sort((a,b)=>{
        if(a.main.temp<b.main.temp)
        {
            return -1;
        }
        else if (a.main.temp>b.main.temp)
        {
            return 1;
        }
        else 
            return 0
    })

    populateTable(tableData )

}



function descendingOrder(){
    actualTable.innerHTML = ''
    current_page = 0;
    tableData = defaultData //Getting default value and sorting on it
    tableData.sort((a,b)=>{
        if(a.main.temp>b.main.temp)
        {
            return -1;
        }
        else if (a.main.temp<b.main.temp)
        {
            return 1;
        }
        else 
            return 0
    })

    populateTable(tableData )

}

function withoutRain(){
    actualTable.innerHTML = ''
    current_page = 0;
    tableData = defaultData //Getting default value and sorting on it
    tableData = tableData.filter((a)=>
        {  
            return (a.weather[0].description.includes('rain')  ) 
        })

    populateTable(tableData)

}

function highestTemp()
{
    actualTable.innerHTML = ''
    current_page = 0;
    tableData = defaultData //Getting default value and finding highest temp from it
    let highestT = tableData.reduce(function(max,current){
        return current.main.temp>max.main.temp?current:max;
    },tableData[0])

    tableData = tableData.filter((a)=>
        {  
            return a ===highestT  
        })
        
        populateTable(tableData)
}