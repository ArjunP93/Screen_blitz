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
import BannerListMap from "../bannerListMap/BannerListMap";
import { deleteBanner } from "../../../api/adminApi";
import { toast } from "react-toastify";




  
   
  
   
  const TABLE_HEAD = ["Title",'Description',"Action",'State',"" ];
   
   
  export function BannerListTable(props) {

    async function handleDeleteBanner (id) {
      console.log('delete abnner',id)
      const updatedBannerList = props.data.filter((data) => {
        return data._id !== id;
      });
      console.log("updatedlocList", updatedBannerList);
  
      const response = await deleteBanner(id);
      if (response?.status === "success") {

        toast.success(` ${response?.message} !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.setBannerDetails(updatedBannerList)

      } else {
        toast.error(`${response?.error} !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    
    return (
      <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Banners
              </Typography>
             
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-2 md:flex-row"> */}
            
            {/* <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div> */}
          {/* </div> */}
          
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
            
              {props.data.length ? (props.data?.map(
                (data, index) => {
                  const isLast = index === props.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                   <BannerListMap key={index} classes={classes} id={data._id} title={data.title} description={data.description} banner={data.bannerImage} status={data.bannerState}  handleDeleteBanner={handleDeleteBanner}  />
                  );
                },
              )) :(<div className="p-6">no banners yet</div>)}
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