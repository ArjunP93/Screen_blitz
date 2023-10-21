import React from "react";
import { useState } from "react";
import {
  Typography,
  Chip,
  Switch,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";

import { theaterApprove, theaterBlock } from "../../../api/adminApi";

function ListMap(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(props.approvalStatus);

  const [blockState, setBlockState] = useState(props.blockedstatus);

  const toggleHandle = async () => {
    await theaterApprove({ id: props.id, state: !isSwitchOn }).then(
      (response) => {
        console.log("response inside listmapppp", response);
        setIsSwitchOn(response.approvalState);
      }
    );
  };

  async function blockHandle(value) {
    setBlockState(value);

    const response = await theaterBlock({ id: props.id, state: value });
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
            value={isSwitchOn ? "Approved" : "Pending"}
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

        <Switch color='deep-purple' checked={isSwitchOn} onChange={toggleHandle}></Switch>
        {/* <Tooltip content="Edit User">
        <IconButton variant="text">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip> */}
      </td>
      <td className={props.classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={blockState ? "Blocked" : "Active"}
            color={blockState ? "red" : "green"}
          />
        </div>
      </td>
      <td className={props.classes}>
        <div className=" flex flex-wrap gap-2">
          <Button color="green" onClick={() => blockHandle(false)}>
            UNBLOCK
          </Button>
          <Button color="red" onClick={() => blockHandle(true)}>
            BLOCK
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ListMap;
