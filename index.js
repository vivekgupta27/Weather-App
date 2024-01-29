const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchinput=document.querySelector(".searchinput");
const form=document.querySelector("form");


let target="New Delhi";

const fetchData=async(target)=>{
try {
    const url=`https://api.weatherapi.com/v1/current.json?key=66412aac85834f5b859143538242901&q=${target}`

const response=await fetch(url);
const data= await response.json();
const{
    current :{
        temp_c,
        condition:{text,icon},
    },
    location:{name, localtime },
}=data;
updateDom(temp_c,name, localtime ,icon, text);
} catch (error) {
    alert("Location Not Found");
}

};
function updateDom(temperature,city,time,emoji,text){
    temperatureField.innerText=temperature+"°";
      cityField.innerHTML = city;
      const exactTime=time.split(" ")[1];
      const exactDate=time.split(" ")[0];
      const exactDay=getDayFullName(new Date(exactDate).getDay());
      dateField.innerText=`${exactTime} - ${exactDay}  ${exactDate}`;
    emojiField.src=emoji;
    weatherField.innerHTML=text;
};
fetchData(target);


function getDayFullName(num)
{
    switch(num){
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";    
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target=searchinput.value;
    fetchData(target);

})