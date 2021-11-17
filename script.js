 // enter your api_key here: 
const API_key = 'e2c2aca1ab71c45f6e198d5fcedc6dac';
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
let date = new Date();
let newdate = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();

const search = document.querySelector("#search");
const inputCity = document.querySelector('#inputCity');

inputCity.addEventListener('keydown', searchFunc1);
search.addEventListener("click", searchFunc2);
function searchFunc1(event) {
    const { key } = event;
    if(key !== 'Enter') {
        return false;
    }
    else {
        const city = document.querySelector("#inputCity").value;
    fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_key}`)
    .then((resp) => resp.json())
    .then((data) => { 
        console.log(data);
        const ul = document.querySelector('#cities');
        if(data.count == 0) {
            const li = document.createElement('li');
            li.textContent = "City not found, please try to change your search query";
            ul.append(li);
            document.querySelector("#inputCity").value = '';
        }
        else {
            ul.textContent = '';
            for(let i = 0; i < data.count; i++) {
                const li = document.createElement('li');
                li.classList.add(`${i}`);
                li.addEventListener("click", weatherInfo);
                li.textContent = data.list[i].name +' ' +data.list[i].sys.country;
                ul.append(li);
            }
            function weatherInfo(e) {
                let a = e.target.className;
                const stateCod = data.list[a].sys.country;
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${stateCod.toLowerCase()}&appid=${API_key}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    document.querySelector('.table__celcium').textContent = Math.round(data.main.temp - 273) + '°C';
                    document.querySelector('.table__indication').textContent = data.weather[0].main;
                    document.querySelector('.table__descr').textContent = data.weather[0].description;
                    document.querySelector('.table__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
                    document.querySelector('.table__date').textContent = newdate;
                    document.querySelector('.table__city').textContent = `${data.name}, ${data.sys.country}`;
                    document.querySelector('.table__valueMin').textContent = Math.round(data.main.temp_min - 273) + '°C';
                    document.querySelector('.table__valueMax').textContent = Math.round(data.main.temp_max - 273) + '°C';             

                    document.querySelector("#inputCity").value = '';
                    while (ul.firstChild) {
                        ul.removeChild(ul.firstChild);
                    }
                })
            }
        }
    })
    .catch((error) => error );
    }
    
};
function searchFunc2(event) {
    
    const city = document.querySelector("#inputCity").value;

    fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_key}`)
    .then((resp) => resp.json())
    .then((data) => { 
        console.log(data);
        const ul = document.querySelector('#cities');
        if(data.count == 0) {
            const li = document.createElement('li');
            li.textContent = "City not found, please try to change your search query";
            ul.append(li);
            document.querySelector("#inputCity").value = '';
        }
        else {
            ul.textContent = '';
            for(let i = 0; i < data.count; i++) {
                const li = document.createElement('li');
                li.classList.add(`${i}`);
                li.addEventListener("click", weatherInfo);
                li.textContent = data.list[i].name +' ' +data.list[i].sys.country;
                ul.append(li);
            }
            function weatherInfo(e) {
                let a = e.target.className;
                const stateCod = data.list[a].sys.country;
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${stateCod.toLowerCase()}&appid=${API_key}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    document.querySelector('.table__celcium').textContent = Math.round(data.main.temp - 273) + '°C';
                    document.querySelector('.table__indication').textContent = data.weather[0].main;
                    document.querySelector('.table__descr').textContent = data.weather[0].description;
                    document.querySelector('.table__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
                    document.querySelector('.table__date').textContent = newdate;
                    document.querySelector('.table__city').textContent = `${data.name}, ${data.sys.country}`;
                    document.querySelector('.table__valueMin').textContent = Math.round(data.main.temp_min - 273) + '°C';
                    document.querySelector('.table__valueMax').textContent = Math.round(data.main.temp_max - 273) + '°C';             

                    document.querySelector("#inputCity").value = '';
                    while (ul.firstChild) {
                        ul.removeChild(ul.firstChild);
                    }
                })
            }
        }
    })
    .catch((error) => error );
};


let images = document.querySelectorAll('.images');
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", pictureFunc);
}
function pictureFunc(e) {
    let url = '';
    let cls = this.classList;
    switch(true) {
        case cls.contains('check__NewYork'):
            url=`http://api.openweathermap.org/data/2.5/weather?q=New York,us&appid=${API_key}`;
            break;
        case cls.contains('check__London'):
            url = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`;
            break;
        case cls.contains('check__Dubai'):
            url = `http://api.openweathermap.org/data/2.5/weather?q=Dubai,ae&appid=${API_key}`;
            break;
        case cls.contains('check__Paris'):
            url = `http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=${API_key}`;
            break;
    }
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        document.querySelector('.table__celcium').textContent = Math.round(data.main.temp - 273) + '°C';
        document.querySelector('.table__indication').textContent = data.weather[0].main;
        document.querySelector('.table__descr').textContent = data.weather[0].description;
        document.querySelector('.table__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        document.querySelector('.table__date').textContent = newdate;
        document.querySelector('.table__city').textContent = `${data.name}, ${data.sys.country}`;
        document.querySelector('.table__valueMin').textContent = Math.round(data.main.temp_min - 273) + '°C';
        document.querySelector('.table__valueMax').textContent = Math.round(data.main.temp_max - 273) + '°C';
    })
}

const section = document.querySelectorAll('.question__section');
const content = document.querySelectorAll('.question__content');
const quest_image = document.querySelectorAll('.question__arrow');
for(let i = 0; i < section.length; i++) {
    section[i].addEventListener('click', (e) => {
        content[i].classList.toggle("question__content_clicked");
        quest_image[i].classList.toggle("question__arrow_reverse");  
    });
}

const foot = document.querySelector('.footer').textContent = 'Your Name - ' + date.getFullYear();


