import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function AlertDialogById(props) {
    
 
  const handleOpen = () => props.setState(!props.state);
  const deleteAction = ()=>{props.actionHandler(props.id).then(()=>props.setState(false))}
 
  return (
    <>

      <Dialog
        open={props.state}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{props.heading}</DialogHeader>
        <DialogBody divider>
          {props.message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteAction}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}