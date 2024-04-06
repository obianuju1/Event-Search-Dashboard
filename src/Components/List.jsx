// List.jsx
// function List({ label, items, itemKey }) {
//     return (
//       <ul>
//         <label>{label}</label>
//         {items.map((item, i) => (
//           <li key={i}>{itemKey(item)}</li>
//         ))}
//       </ul>
//     );
//   }

//   export default List;
import React from 'react'
import { Link, useParams} from 'react-router-dom';
import Info from './Info'

const List = ({ items }) => {
  let params  = useParams();


  return (
    <div>
   <br></br>
      <table >
        <thead>

          <tr>
            <th>Type</th>
            <th>Event</th>
            <th>Venue</th>
            <th>State</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        {Array.isArray(items)&&items.map(item => {

          return(


          <tbody key={item.id}>

            <tr >

              <td>{item.classifications[0].genre.name}


             </td>
              <td> {item.name}</td>
              <td> {item._embedded.venues[0].name}
                  </td>
               <td> {item._embedded.venues[0].state.name}
               </td>
              <td> {item.dates.start.localDate}</td>
              <td> <Link to={`/Info/${item.id}`}>link:</Link></td>


            </tr>
          </tbody>
          )

        })}
      </table>

    </div>
  )
}

export default List