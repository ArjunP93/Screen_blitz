import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function MovieCard() {
    return (
      <Card className="w-72">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="mt-0">
          <div className=" flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
            Oppenheimer
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              Biography
            </Typography>
          </div>
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-deep-purple-600 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    );
  }