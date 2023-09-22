import React from 'react'
import ScreenMapComponent from './ScreenMapComponent'

function TheaterMapComponent(props) {
  return (
    <div key={props.theater._id} className="border px-4 py-4 rounded-md">
                      <h1 className="font-bold text-lg">
                        {props.theater.theaterName}
                      </h1>
                      
                      {props.theater?.screen?.length > 0
                        ? props.theater?.screen?.map((screen) => (
                          <ScreenMapComponent screen={screen}/>  
                          ))
                        : null}
                    </div>
  )
}

export default TheaterMapComponent