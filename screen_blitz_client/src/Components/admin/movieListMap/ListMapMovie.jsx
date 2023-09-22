import React from "react";
import { useState } from "react";
import {
  Typography,
  Chip,
  Switch,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";


function ListMapMovie(props) {
  

  

  return (
    <tr key={props.key}>
      <td className={props.classes}>
      
          <div className="flex gap-6 items-center  ">
            <div >
            <img src={props.poster} className="w-12 h-15 rounded-md"   ></img>

            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold "
            >
              {props.movieName}
            </Typography>
          
          </div>

      </td>
    

      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.releaseDate}
        </Typography>
      </td>
      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className=" uppercase font-normal">
          {props.theaterName}
        </Typography>
      </td>

      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className=" uppercase font-normal">
          {props.language}
        </Typography>
      </td>
     
    </tr>
  );
}

export default ListMapMovie;
