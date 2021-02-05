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
let info_section = document.getElementById('info');

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

//structures to old refined data
finalwobj = {};
finalfarr = [];

//to edit the html
function EditHtml() {
    document.getElementById('temp').innerHTML = finalwobj.Temp;
    document.getElementById('feels-like').innerHTML = `Real-Feel: ${finalwobj.Feels}`;
    document.getElementById('humidity').innerHTML = `Humidity: ${finalwobj.Humid}`;

    document.getElementById('nm0').innerHTML = finalfarr[0].Name;
    document.getElementById('cat0').innerHTML = `Description: ${finalfarr[0].Desc}`;
    document.getElementById('add0').innerHTML = `Address: ${finalfarr[0].Add}`;

    document.getElementById('nm1').innerHTML = finalfarr[1].Name;
    document.getElementById('cat1').innerHTML = `Description: ${finalfarr[1].Desc}`;
    document.getElementById('add1').innerHTML = `Address: ${finalfarr[1].Add}`;

    document.getElementById('nm2').innerHTML = finalfarr[2].Name;
    document.getElementById('cat2').innerHTML = `Description: ${finalfarr[2].Desc}`;
    document.getElementById('add2').innerHTML = `Address: ${finalfarr[2].Add}`;

    info_section.style.display = 'block';
}

//factory function for fourways objects
function MakeArr(foursqobj) {
    for (i = 0; i < 3; i++) {
        //foursqobj.response.groups[0].items[i]
        let tmpobj = {
            Name: foursqobj.response.groups[0].items[i].venue.name,
            Desc: foursqobj.response.groups[0].items[i].venue.categories[0].name,
            Add: foursqobj.response.groups[0].items[i].venue.location.address
        }
        finalfarr.push(tmpobj);
    }
}

async function RefineData(wjson, fjson) {
    finalwobj.Temp = wjson.current.temp;
    finalwobj.Humid = wjson.current.humidity;
    finalwobj.Feels = wjson.current.feels_like;

    await MakeArr(fjson);

    console.log(finalwobj);
    console.log(finalfarr);
}

btn.onclick = async() => {
    let query = inp.value;
    try {
        if (query == '') {
            alert('Please input an Area Name');
            throw new Error('Null input');
        }
        const response = await fetch(`${furl}${query}${clientid}${clientsec}${rad}${lim}&v=20180323`);
        if (response.ok) {
            const jsonresp = await response.json();
            // console.log(jsonresp);
            const weathjson = await helper(jsonresp);
            ///////////data_refining///////////
            await RefineData(weathjson, jsonresp);
            ///////////////clear array///////////////////
            await EditHtml();
        } else {
            throw new Error('FourSquare response null/Check Network');
        }
    } catch (error) {
        console.log(error.message);
    }
}