import { useState,useEffect } from 'react'
import { useParams, Link} from 'react-router-dom';

import List from './List'
const URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=0sRtJA7WghwWb0SUfpN9F3lLVll5LLoS`
const Info = ({info})=>{
let params = useParams();
console.log(params.id);
const [event, setEvent]= useState([])
useEffect(()=>{
    const allEvents = async()=>{
      const response = await fetch(URL)
      const data = await response.json();
      setEvent(data._embedded.events);

    }
    allEvents().catch(console.error);
  },[])
console.log(event)

const isMatch= event.filter(item=>{
    return params.id===item.id
})
console.log(isMatch);





return(
    <>

    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>

    <h1 >Event Dashboard</h1>



        {isMatch.map((item,i)=>(
            <div key={i}>
           <p>Type: {item.classifications.map(item=>{
                return(
                  <>
                  {item.genre.name}
                  </>
                )
              })}</p>
    <p>Name: {item.name}</p>
    <p>Date: {item.dates.start.localDate}</p>
    <p>Venue:  {item._embedded.venues.map(item=>{
                return(
                  <>
                  {item.name}
                  </>
                )
              })}</p>
    <p>State:  {item._embedded.venues.map(item=>{
                return(
                  <>
                  {item.state.name}
                  </>
                )
              })}</p>
    <p>Description: {item.url}</p>
        </div>
        ))}


    </>
)
}
export default Info;