import { useState,useEffect } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'
import List  from './Components/List'
import NavBar from './Components/NavBar'

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=0sRtJA7WghwWb0SUfpN9F3lLVll5LLoS`
function App() {
  const [event, setEvent] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [originalEvent, setOriginalEvent]=useState([]);
  const[lowPrice,setLowPrice]= useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  

  useEffect(()=>{
    const allEvents = async()=>{
      const response = await fetch(URL)
      const data = await response.json();
      setEvent(data._embedded.events);
      setOriginalEvent(data._embedded.events);
      console.log(data);
      console.log(data._embedded.events[0].name)
      console.log(data._embedded.events)
     
     
    }
    allEvents().catch(console.error);
  },[])
  const searchItems = searchValue =>{
    console.log(event);

    console.log(searchValue)
    setSearchInput(searchValue);
    if(searchValue ){
      console.log(searchValue)
      const filtteredData = event.filter((item)=>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
       
    
 
    )
    setEvent({});

    console.log(filtteredData);
  setEvent(filtteredData)
    }else{
      // setFilteredResults(Object.key(event.name));
    }
  }
  const searchState = searchValue =>{
    console.log(event);

    console.log(searchValue)
    setSearchInput(searchValue);
    if(searchValue !=="") {
      console.log(searchValue)
      const filtteredData = event.filter((item)=>
      item._embedded.venues[0].state.name.toLowerCase().includes(searchValue.toLowerCase())
       
    
 
    )
    setEvent({});

    console.log(filtteredData);
  setEvent(filtteredData)
    }else{
      // setFilteredResults(Object.key(event.name));
    }
  }
  const searchEvent = searchValue =>{
    console.log(event);

    console.log(searchValue)
    setSearchInput(searchValue);
    if(searchValue !=="") {
      console.log(searchValue)
      const filtteredData = event.filter((item)=>
      item.classifications[0].genre.name.toLowerCase().includes(searchValue.toLowerCase())
       
    
 
    )
    setEvent({});

    console.log(filtteredData);
  setEvent(filtteredData)
    }else {
     setEvent(event);
    }
  }
  const setOrginal =()=>{
    setEvent(originalEvent)
  }
  function getMostFrequentEvent(events) {
    const counts = events.reduce((acc, event) => {
      acc[event.name] = (acc[event.name] || 0) + 1;
      return acc;
    }, {});
  
    let mostFrequentEvent = null;
    let maxCount = 0;
  
    for (const [event, count] of Object.entries(counts)) {
      if (count > maxCount) {
        mostFrequentEvent = event;
        maxCount = count;
      }
    }
  
    return mostFrequentEvent;
  } 
  const mostFrequent = getMostFrequentEvent(event);

  function mode(events) {
    const counts = events.reduce((acc, event) => {
      acc[event._embedded.venues[0].state.name] = (acc[event._embedded.venues[0].state.name] || 0) + 1;
      return acc;
    }, {});
  
    let mostFrequentEvent = null;
    let maxCount = 0;
  
    for (const [event, count] of Object.entries(counts)) {
      if (count > maxCount) {
        mostFrequentEvent = event;
        maxCount = count;
      }
    }
  
    return mostFrequentEvent;
  } 
  const mostCommon = mode(event);

  

  return (
    <>
    <h1 >Event Dashboard</h1>
    <button onClick ={setOrginal}>Return Home</button>
   <div className="App">
   
    <div style={{display:"flex",justifyContent: 'space-between'}}>
   <Card 
   data={50}
   text="Number of Events"/>
   <Card data={getMostFrequentEvent(event)}
   text="Most Frequent Event"/>
   <Card 
   data={mode(event)}
   text="Most Common State"/>
   </div>
  
   
    <input
    type="text"
    placeholder="Search by Event Type"
    onChange={(inputString)=>searchEvent(inputString.target.value)}
    
    />
 
       <input
    type="text"
    placeholder="Search by Name "
    onChange={(inputString)=>searchItems(inputString.target.value)}
    
    />
      <input
    type="text"
    placeholder="Search by State "
    onChange={(inputString)=>searchState(inputString.target.value)}
    
    />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <List
label="Type"
items={event}
itemKey={item=>item.classifications[0].genre.name}/>
   
    <List
    label="Name"
    items={event}
    itemKey={item=>item.name}/>
    <List 
    label="Date"
    items={event}
    itemKey={item=>item.dates.start.localDate}/>
    <List
    label="Venue"
    items={event}
    itemKey={item=>item._embedded.venues[0].name}/>
    <List
    label="State"
    items={event}
    itemKey={item=>item._embedded.venues[0].state.name}/>
   
    </div>
    </div>
    </>

  )
}

export default App
