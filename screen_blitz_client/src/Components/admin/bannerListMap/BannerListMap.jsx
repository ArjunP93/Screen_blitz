import React from "react";
import { useState } from "react";
import {
  Typography,
  Chip,
  Switch,
  Button,
  ButtonGroup,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";


import { activateBanner } from "../../../api/adminApi";
import { AlertDialog } from "../../alertDialogue/AlertDialog";
import { AlertDialogById } from "../../alertDialogue/AlertDialogById";


function BannerListMap(props) {
  const [deleteAlert,setDeleteAlert] = useState(false)

  const [isSwitchOn, setIsSwitchOn] = useState(props.status);
  const toggleHandle = async()=>{

   await activateBanner({id:props.id,state:!isSwitchOn}).then((response)=>{
      setIsSwitchOn(response.bannerState)

   })

  }

  
  

  

  return (
    <tr key={props.id}>
      <td className={props.classes}>
      
          <div className="flex gap-6 items-center  ">
            <div >
            <img src={props.banner} className="w-16 h-10 rounded-md"   ></img>

            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold "
            >
              {props.title}
            </Typography>
          
          </div>

      </td>
    

      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.description}
        </Typography>
      </td>
      <td className={props.classes}>
      <Switch color="deep-purple" checked={isSwitchOn} onChange={toggleHandle}></Switch>
      </td>


      <td className={props.classes}>
  <div className="w-max">
    <Chip
      variant="ghost"
      size="sm"
      value={ isSwitchOn? "Active":"Blocked" }
      color={ isSwitchOn? "green":"red" }
    />
  </div>
</td>
    
      <td className={props.classes}>
      <Tooltip content="Delete banner">
                <IconButton variant="text">
                  <TrashIcon
                    onClick={() => {
                    setDeleteAlert(true);
                    }}
                    // onClick={()=>props.handleDeleteBanner(props._id)}
                    className="h-6 w-6 text-gray-800"
                  />
                  

                  <AlertDialogById
                    state={deleteAlert}
                    id = {props.id}
                    setState={setDeleteAlert}
                    actionHandler={props.handleDeleteBanner}
                    heading={"Delete Confirmation"}
                    message={"Are you sure you want to delete"}
                  />
                </IconButton>
              </Tooltip>
      </td>

 
     
    </tr>
  );
}

export default BannerListMap;
