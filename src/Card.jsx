import React, { useState,useEffect } from "react";
const URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=0sRtJA7WghwWb0SUfpN9F3lLVll5LLoS`
const Card = ({info})=>{
    const[card,setCard]=useState(0);
    useEffect(() => {
        const getInfo = async ()=>{
            const response = await fetch(URL);
            const data = await response.json();
            setCard(data);

        }

    }, [length]);
    return(
        <>
      <h1>{card.length}</h1>
      <h3>Events</h3>

        </>
    )

}
export default Card;