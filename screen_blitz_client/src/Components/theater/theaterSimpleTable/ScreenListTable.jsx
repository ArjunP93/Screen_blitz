import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Switch,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { useState } from "react";

import Loading from "../../loading/Loading";
import ScreenListMap from "../screenListMap/ScreenListMap";

const TABLE_HEAD = ["Screen", "Movie", "Shows", "Action "];

export function ScreenListTable(props) {

  return (
    <Card className="h-full w-full rounded-none">
      <CardHeader floated={false} shadow={false} className="rounded-none h-16 overflow-visible">
        <div className="mb-20 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Screens Available
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-2 p-0">
        {props.loading ? (
          <Loading />
        ) : (
          <table className="mt-1 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data?.length>0? ( props.data?.map(
                ({ _id, screenName,movieName,shows}, index) => {
                  const isLast = index === props.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <ScreenListMap
                      key={_id}
                      classes={classes}
                      id={_id}
                      movieName={movieName}
                      screenName={screenName}
                      shows={shows}
                    
                    />
                  );
                }
              )):null}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
