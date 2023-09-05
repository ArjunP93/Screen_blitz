import React from 'react'
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




function AddMovieForm() {
    

    


 


  return (
    <Card className="h-full w-full rounded-none">
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Add Movie
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
    <CardBody className="overflow-scroll px-0">
        <div className='m-4'>

        <form>
    <Typography>
        Movie Title
    </Typography>
        <Input 
        
        label='enter movie name'
        />

<Typography>
        Language
    </Typography>
        <Input 
        label='enter movie name'
        />

<Typography>
        Genere
    </Typography>
        <Input 
        label='enter movie name'
        />

<Typography>
        Director
    </Typography>
        <Input 
        label='director name'
        />

<Typography>
        Cast
    </Typography>
        <Input 
        label='leading Cast names'
        />

<Typography>
        Release Date
    </Typography>
        <Input 
        label='Release date'
        />
        <Typography>
        Genere
    </Typography>
        <Input 
        label='enter movie name'
        />

     
      </form>
      </div>

      
    </CardBody>
    {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
    </CardFooter> */}
  </Card>
   
  )
}

export default AddMovieForm