import React from 'react'
import { useState } from 'react'
import {
    Typography,
    Chip,
    Switch,
    Avatar
  } from "@material-tailwind/react";

  import {userApprove} from '../../../api/adminApi'

function ListRowComponent(props) {
    const [isSwitchOn, setIsSwitchOn] = useState(props.blockedStatus);
    const toggleHandle = async()=>{

     await userApprove({id:props.id,state:!isSwitchOn}).then((response)=>{
        console.log('response inside userlistmapppp',response);
        setIsSwitchOn(response.approvalState)

     })



    }
  return (
    
    <tr key={props._id}>
    <td className={props.classes}>
      <div className="flex items-center gap-3">
     { props.profilePic.length!==0 ?<Avatar src={props.profilePic[props.profilePic.length - 1]} alt={name} size="sm" /> :null}
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            {props.name}
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
    
   <td className={props.classes}>
  <div className="w-max">
    <Chip
      variant="ghost"
      size="sm"
      value={ isSwitchOn? "Blocked" : "Active"}
      color={ isSwitchOn? "red" : "green"}
    />
  </div>
</td>
   
    <td className={props.classes}>
      <Switch color='deep-purple' checked={isSwitchOn} onChange={toggleHandle}></Switch>
      
    </td>
  </tr> 
  )
    }



export default ListRowComponent