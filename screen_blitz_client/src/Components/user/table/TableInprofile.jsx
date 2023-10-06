import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserBookings } from "../../../api/userApi";
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
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Movie", "Booked Date", "Booking Id", "Amount", ""];

// const TABLE_HEAD = ["Movie", "Show Date", "Booking Id", "Amount"];

export function TableInprofile() {
  const [bookings, setBookings] = useState([]);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [details, setDetails] = useState({});
  const userId = useSelector((store) => store.user.userRedux.userId);
  useEffect(() => {
    async function fetchBookings() {
      const response = await fetchUserBookings(userId);
      return response;
    }
    fetchBookings().then((data) => {
      setBookings(data?.bookings);
    });
  }, []);

  function handleDetails(id) {
    const result = bookings.filter((doc) => {
      return doc._id === id;
    });

    setDetails(result[0]);
    handleDetailsDialog();
  }

  // console.log('details',details)
  const handleDetailsDialog = () => setDetailsDialog(!detailsDialog);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div>
          <Typography
            className="text-lg font-bold  p-2 uppercase"
            variant="h5"
            color="blue-gray"
          >
            bookings
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
            {bookings?.length > 0 ? (
              bookings.map((data, index) => {
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
                        {data.movieName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.showDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data._id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.totalAmount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}{" "}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Tooltip content="details">
                        <IconButton
                          onClick={() => handleDetails(data._id)}
                          variant="text"
                        >
                          <EllipsisHorizontalCircleIcon className="h-6 w-6 text-deep-purple-800" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>no bookings yet</p>
            )}
          </tbody>
        </table>
        {/* dialog for details */}
        <Dialog
          open={detailsDialog}
          handler={handleDetailsDialog}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Booking Details</DialogHeader>
          <DialogBody divider>
            <div>
              {/* <div h-20 w-15>
                    image
                  </div> */}
              <div className="mx-20">
                <table>
                  <td className="p-2">
                    <tr className="p-4 text-lg">Movie</tr>
                    <tr className="p-4 text-lg">Show Date</tr>
                    <tr className="p-4 text-lg">Theater</tr>
                    <tr className="p-4 text-lg">Screen</tr>
                    <tr className="p-4 text-lg">Show Time</tr>

                    <tr className="p-4 text-lg">Seats</tr>
                    <tr className="p-4 text-lg">Booking Id</tr>
                    <tr className="p-4 text-lg">Amount</tr>
                  </td>
                  <td className="p-2">
                    <tr className="p-4 font-bold text-lg">
                      {details?.movieName}
                    </tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.showDate}
                    </tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.theaterName}
                    </tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.screenName}
                    </tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.showTime}
                    </tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.bookedSeats?.toString()}
                    </tr>
                    <tr className="p-4 font-bold text-lg">{details?._id}</tr>
                    <tr className="p-4 font-bold text-lg">
                      {details?.totalAmount?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </tr>
                  </td>
                </table>
              </div>
            </div>
            <div className="">
              <Button
                className=""
                color="deep-purple"
                onClick={handleDetailsDialog}
              >
                Back
              </Button>
            </div>
          </DialogBody>
        </Dialog>
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
