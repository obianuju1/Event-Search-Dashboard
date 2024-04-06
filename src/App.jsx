import { useState,useEffect, } from 'react'
import { Link } from "react-router-dom";
import{Route, Routes, useParams} from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'
import List  from './Components/List'

import Info from './Components/Info'
import Chart from './Components/Chart'
import allOptions from './states';
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=0sRtJA7WghwWb0SUfpN9F3lLVll5LLoS`
function App() {
  const [event, setEvent] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState(new Date());
 const[isHome,setHome]=useState(false)
  const[lowPrice,setLowPrice]= useState(0);
const[selected,setSelected] = useState(null)
let p

  useEffect(()=>{
    const allEvents = async()=>{
      const response = await fetch(URL)
      const data = await response.json();
      p=data._embedded.events

      setEvent(p);

      console.log(p);
      console.log(data._embedded.events[0].priceRanges[0].min)
      console.log(data._embedded.events)
      console.log()

     
     
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

  const handleHome =()=>{
    setHome(true);
  }

  return (
    <>

<nav>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>

    <h1 >Event Dashboard</h1>


   <div className="App">
   
    <div style={{display:"flex",justifyContent: 'space-between'}}>
   <Card 
   data={event.length}
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
    <select
      onChange={(e)=>{


        const c = event?.filter((x)=> x._embedded.venues[0].state.name.includes( e.target.value))
        console.log
        setSelected(c);
      }}>
        <option onClick={() => setSelected(null)}>Choose an option</option>
     {allOptions ? allOptions.map((item,i)=>{
      return(
      <option key={i} value={item}>{item}</option>
      )
     })
:null
     }
   </select>
   <Chart />

    


    </div>


{selected ? <List items={selected}/> : <List items={event}/>}
   </>

  )
}

export default App

{/*
  <List
label="Type"
items={event}
itemKey={item=>item.classifications[0].genre.name}/>
   
   <Link to="/Info" onClick={setlinks}> <List
    label="Name"
    items={event}
    itemKey={item=>item.name}/>
    </Link>
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
       <List
    label="min"
    items={event}
    itemKey={item => item.priceRanges && item.priceRanges.length > 0 ? item.priceRanges[0].min : 'N/A'}/>
     */}