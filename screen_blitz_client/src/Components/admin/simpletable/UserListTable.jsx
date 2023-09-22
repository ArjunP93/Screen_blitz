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
import ListRowComponent from "../../user/userlistMap/ListRowComponent";
   
  
   
  const TABLE_HEAD = ["Member","Status", "Action"];
   
  // const TABLE_ROWS = [
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  //     name: "John Michael",
  //     email: "john@creative-tim.com",
  //     job: "Manager",
  //     org: "Organization",
  //     online: true,
  //     date: "23/04/18",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  //     name: "Alexa Liras",
  //     email: "alexa@creative-tim.com",
  //     job: "Programator",
  //     org: "Developer",
  //     online: false,
  //     date: "23/04/18",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  //     name: "Laurent Perrier",
  //     email: "laurent@creative-tim.com",
  //     job: "Executive",
  //     org: "Projects",
  //     online: false,
  //     date: "19/09/17",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
  //     name: "Michael Levi",
  //     email: "michael@creative-tim.com",
  //     job: "Programator",
  //     org: "Developer",
  //     online: true,
  //     date: "24/12/08",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
  //     name: "Richard Gran",
  //     email: "richard@creative-tim.com",
  //     job: "Manager",
  //     org: "Executive",
  //     online: false,
  //     date: "04/10/21",
  //   },
  // ];
   
  export function UserListTable(props) {
    return (
      <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                User list
              </Typography>
             
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div> */}
          
          </div>
          
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            
              {props.data?.map(
                ({ _id, name, email, blockedStatus, profilePic}, index) => {
                  const isLast = index === props.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                   <ListRowComponent classes={classes} key={_id} id={_id} name ={name} email={email} blockedStatus={blockedStatus} profilePic = {profilePic} />
                  );
                },
              )}
            </tbody>
          </table>
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