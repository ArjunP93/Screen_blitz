import React from 'react'
import { useState } from 'react'
import {
    Typography,
    Chip,
    Switch,
  } from "@material-tailwind/react";

  import {theaterApprove} from '../../../api/adminApi'





function ListMap(props) {
    
    const [isSwitchOn, setIsSwitchOn] = useState(props.approvalStatus);
    const toggleHandle = async()=>{

     await theaterApprove({id:props.id,state:!isSwitchOn}).then((response)=>{
        console.log('response inside listmapppp',response);
        setIsSwitchOn(response.approvalState)

     })



    }


  return (
    <tr key={props.key}>
    <td className={props.classes}>
      <div className="flex items-center gap-3">
     
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.theatername}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.email}
          </Typography>
        </div>
      </div>
    </td>
    {/* <td className={props.classes}>
      <div className="flex flex-col">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {job}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {org}
        </Typography>
      </div>
    </td> */}
   <td className={props.classes}>
  <div className="w-max">
    <Chip
      variant="ghost"
      size="sm"
      value={isSwitchOn ? "Active" : "Inactive"}
      color={isSwitchOn ? "green" : "red"}
    />
  </div>
</td>
    {/* <td className={props.classes}>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        {date}
      </Typography>
    </td> */}
    <td className={props.classes}>
      {/* <div className="flex space-x-1">
      <Button />
      <Button />
      </div> */}
      
      
      <Switch checked={isSwitchOn} onChange={toggleHandle}></Switch>
      {/* <Tooltip content="Edit User">
        <IconButton variant="text">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip> */}
    </td>
  </tr>  )
}

export default ListMap