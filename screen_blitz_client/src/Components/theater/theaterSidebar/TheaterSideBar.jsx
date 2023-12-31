import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button


} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  FilmIcon,
  ViewColumnsIcon,
  VideoCameraIcon,
  
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AddMovieForm } from "../addMovieForm/AddMovieForm";
import { AddScreenForm } from "../addScreenForm/AddScreenForm";
 
export function TheaterSideBar() {
  const [open, setOpen] = React.useState(0);

  const navigate = useNavigate()
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  const [addMovieOpen, setaddMovieOpen] = React.useState(false);
  const [addScreenOpen, setaddScreenOpen] = React.useState(false);
 
  const handleMovieAddOpen = () => setaddMovieOpen(!addMovieOpen);
 
  const handleScreenAddOpen = () => setaddScreenOpen(!addScreenOpen);
 

  
 
  return (
    <Card className=" bg-brown-900 rounded-none fixed h-[calc(100vh-2rem)] w-[20rem] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div> */}
      <List>
      <ListItem className="text-white" onClick={()=>navigate('/theater')}>
                <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5  text-gray-500" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
        {/* <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5  text-gray-500" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
              <FilmIcon class="h-6 w-6  text-gray-500" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Movie
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-white" onClick={handleMovieAddOpen}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Movie
              </ListItem>
              <ListItem className="text-white" onClick={()=>navigate('/theaterlistmovies')}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Movie List
              </ListItem>
              {/* <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem> */}
            </List>
          </AccordionBody>
        </Accordion>


        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
              <ViewColumnsIcon class="h-6 w-6 text-gray-500" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Screens
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-white" onClick={handleScreenAddOpen}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Screen
              </ListItem>
              <ListItem className="text-white" onClick={()=>navigate('/screenlist')}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Screens
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>




        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
              <VideoCameraIcon class="h-6 w-6 text-gray-500" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Show Management
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-white" onClick={()=>navigate('/allocatemovies')}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Allocate movies
              </ListItem>
              
            </List>
          </AccordionBody>
        </Accordion>



        

        





        {/* <hr className="my-2 border-blue-gray-50" /> */}
        {/* <ListItem >
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        
        {/* <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>



      {/* dialog - ----AddMovie */}

      <Dialog
        open={addMovieOpen}
        size="xl"
        handler={handleMovieAddOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      
      >
        <DialogHeader >Add Movie</DialogHeader>
        
        <DialogBody>
          <AddMovieForm handleMovieAddOpen={handleMovieAddOpen} />
          

        </DialogBody>
        
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleMovieAddOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleMovieAddOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>




      {/* dialog - ----AddScreen */}

      <Dialog
        open={addScreenOpen}
        size="xl"
        handler={handleScreenAddOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      
      >
        <DialogHeader >Add Screen</DialogHeader>
        
        <DialogBody>
          <AddScreenForm handleScreenAddOpen={handleScreenAddOpen} />
          

        </DialogBody>
        
        
      </Dialog>










    </Card>
  );
}