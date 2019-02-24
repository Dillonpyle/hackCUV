import React from 'react'
import RepItem from '../RepContainer/RepItem'

const RepList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const repList = props.info.map((rep,i) => {
        return <li key={i}> <RepItem info={rep} /> </li>
    })
  
    return (
    <ul style={{"listStyleType":"none", "padding":"0"}}>
        {repList}
    </ul>
    )
}

export default RepList