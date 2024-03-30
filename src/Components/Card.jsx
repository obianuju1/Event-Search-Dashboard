const Card = ({data, text})=>{
    return(
        <div style={{border:"2px solid", borderRadius:"10%", width:"225px", height:"150px",margin:"20px",boxShadow:"10%" }}>
    <h3>{data}</h3>
    <h4>{text}</h4>
    </div>
    )
}
export default Card;