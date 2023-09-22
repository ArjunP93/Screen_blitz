import { Button } from '@material-tailwind/react'
import React from 'react'

function ShowMapComponent(props) {
  return (
    <Button
    size="sm"
    color={""}
    className="me-1 bg-black"
    key={props.index}
    variant="outlined"
  >
    {props.time}
  </Button>
  )
}

export default ShowMapComponent