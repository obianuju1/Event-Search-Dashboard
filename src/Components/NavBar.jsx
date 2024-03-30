import React from 'react'

const NavBar = ({})=>{
    return(
        <div className="NavBar">
            <div className = "logo">
                <img src="/src/img/logo.svg"alt="logo" width="100px"/>         
                 </div>
                 <div className="list">
                    <div className="listItem">
                        <span>Dashboard</span>
                        <span>Search</span>
                        <span>About</span>
                    </div>
                 </div>
          
          

        </div>
    )
}
export default NavBar;