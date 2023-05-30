import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchCity, setSearchCity] = useState("Delhi");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;
  const url =`https://yahoo-weather5.p.rapidapi.com/weather?location=${searchCity}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7ce92506efmsh7fffd7ca6839db7p1a737djsna8324a7523b9",
      "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
    },
  };
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(url, options);

      console.log(response);
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [searchCity]);
  let emoji=null;
  
  // let temp,temp_min,temp_max;
  // let text;
let temp=(data.current_observation.condition.temperature );
temp=(((temp-32)*5)/9).toFixed(2);
let temp_min=(data.forecasts[0].low);
temp_min=(((temp_min-32)*5)/9).toFixed(2);
let temp_max=(data.forecasts[0].high);
temp_max=(((temp_max-32)*5)/9).toFixed(2);
let text=data.current_observation.condition.text;

let d=new Date();
let date=d.getDate();
let year=d.getFullYear();
let month=d.toLocaleString("default",{month:'long'});
let day=d.toLocaleString("default",{weekday:'long'});

let time=d.toLocaleString([],{
  hour:'2-digit',
  minute:'2-digit',
  second:'2-digit'
});

if(typeof data.current_observation !="undefined"){
  if(text=="Clouds") emoji="fa-cloud"
  else if(text=="Thunderstorms") emoji="fa-bolt"
  else if(text=="Drizzle") emoji="fa-cloud-rain"
  else if(text=="Rain") emoji="fa-cloud-shower-heavy"
  else if(text=="Snow") emoji="fa-snow-flake"
  else  emoji="fa-smog"
}
else{
  return (
    <div>...Loading </div>
  )
}
const handleSubmit=(event)=>{
  event.preventDefault();
  setSearchCity(input);
}
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${text}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search "></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.location.city}</h2>
                  <p className="card-text lead">{day},{month} {date}, {year}
                  <br />
                  {time}</p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">
                    {temp} &deg;c
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {text}
                  </p>
                  <p className="lead">{temp_min}&deg;c | {temp_max}&deg;c</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
