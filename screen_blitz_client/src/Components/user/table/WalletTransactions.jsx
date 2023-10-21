import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Type", "Amount"];

export function WalletTransactions(props) {
  const userId = useSelector((store) => store.user.userRedux.userId);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div>
          <Typography
            className="text-lg font-bold justify-center  p-2 uppercase"
            variant="h4"
            color="blue-gray"
          >
        transactions
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-2">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props?.transactions?.length > 0 ? (
              props.transactions.map((data, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={data._id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.date}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.transactionType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.amount?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}{" "}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="p-4">no transactions yet</p>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="deep-purple" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="deep-purple" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
