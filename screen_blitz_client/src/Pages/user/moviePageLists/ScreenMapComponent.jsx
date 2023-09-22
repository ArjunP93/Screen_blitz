import React from "react";
import ShowMapComponent from "./ShowMapComponent";

function ScreenMapComponent(props) {
  return (
    <div key={props.screen._id} className="border px-4 py-4 rounded-md ">
      <h1 className="font-semibold text-sm">{props.screen.screenName}</h1>
      {props?.screen?.shows?.length > 0
        ? props?.screen?.shows?.map((time, index) => (
           <ShowMapComponent time={time} index={index}/>
          ))
        : null}
    </div>
  );
}

export default ScreenMapComponent;
