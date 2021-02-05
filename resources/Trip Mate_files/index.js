//import { helper } from './helper.js';
//foursquare request requirements
const furl = 'https://api.foursquare.com/v2/venues/explore?near=';
const clientid = '&client_id=YKHX3XZAA5AZAHOAC4NVZJBBQXQI2W5TBE1DJRQZHSKOIGDF';
const clientsec = '&client_secret=ET0UUT0TSBBOZL2YIFRJL1ZHF4BGMROM3FBEBPC3QQKBLKJW';
const rad = '&rad=100000';
const lim = '&limit=3';

//weather api reqs
const apikey = 'd0b6fc795d0b2835c350e9c9fc80a309';
const url = 'https://api.openweathermap.org/data/2.5/onecall?';
let lat = '';
let lng = '';

//input components
let btn = document.getElementById('btn');
let inp = document.getElementById('search-query');

//response holders
let foursqobj = '';
let weathobj = '';

async function helper(resp) {
    lat = resp.response.geocode.center.lat;
    lng = resp.response.geocode.center.lng;

    try {
        const response = await fetch(`${url}lat=${lat}&lon=${lng}&appid=${apikey}&units=metric`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('OpenWeather error/network');
        }
    } catch (error) {
        console.log(error.message);
    }
}

btn.onclick = async() => {
    let query = inp.value;
    try {
        if (query == '') {
            alert('Please input an Area');
            throw new Error('Null input');
        }
        const response = await fetch(`${furl}${query}${clientid}${clientsec}${rad}${lim}&v=20180323`);
        if (response.ok) {
            const jsonresp = await response.json();
            // console.log(jsonresp);
            const weathjson = await helper(jsonresp);
            foursqobj = jsonresp;
            weathobj = weathjson;
            ///////////data_refining///////////
        } else {
            throw new Error('FourSquare response null/Check Network');
        }
    } catch (error) {
        console.log(error.message);
    }
}