import React from 'react'
import { Container } from 'react-bootstrap'

export default function DropdownSelection(props) {
    const list = props.data
    const handleClick = props.handleClick
    const [currValue, setCurrValue] = React.useState(props.default);

    const handleChange = (e) => {
        setCurrValue(e.target.value)
        handleClick(e.target.value)
    }

    return (
    <Container>
        <select value={currValue} onChange={handleChange} style={{width:"500px"}}>
            <option value={props.default}>{props.default}</option>
            {list.map(listItem => {return(<option value={listItem} style={{width:"500px"}}>{listItem}</option>)})}
        </select>

      </Container>

  )
}
