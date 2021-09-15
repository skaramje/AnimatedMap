var country = [];
var id = [];
var lat = [];
var lon = [];
var temperature = [];
data.forEach(element => {
    country.push(element["country"]);
    id.push(element["id"]);
    lat.push(element["coord"]["lat"]);
    lon.push(element["coord"]["lon"]);
});    

const makeRequest = async function(url){
const response = await fetch(url);
const data = await response.json();
return data;
}
var arr = [];
id.forEach((element, counter) => {
    arr.push([country[counter], element, lat[counter], lon[counter]]);
});

function filterByCountry(item){
    if(item['0'] == "SG"){
        return true;
    }
    return false;
}
const filterResult = arr.filter(filterByCountry);

var weatherTemperature = [];
var Temperature = [];
var weatherId = [];
var arrAll = [];
var weatherLat = [];
var weatherLon = [];

filterResult.forEach((element) => {
var urlid = element['1'];

var url = `https://api.openweathermap.org/data/2.5/weather?id=${urlid}&appid={APIkey}`;
makeRequest(url).then((value)=>{
    weatherTemperature.push(value);
    weatherId.push(value["id"]);
    Temperature.push(value["main"]["temp"]);
    weatherLat.push(value["coord"]["lat"]);
    weatherLon.push(value["coord"]["lon"]); 
    
})

});
mapboxgl.accessToken = '';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [filterResult[0][3], filterResult[0][2]],
    zoom: 10
});


var marker = new mapboxgl.Marker()
 .setLngLat([filterResult[0][3], filterResult[0][2]])
 .addTo(map)

var counter = 0;
function display(){
    setTimeout(() =>{
        if(counter >= filterResult.length) return;
        var marker = new mapboxgl.Marker()
         .setLngLat([filterResult[counter][3], filterResult[counter][2]])
         .addTo(map)
        counter++;
        display();
    }, 1*1000);
}
