import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {addMovie} from '../../api/theaterApi'
   
  export function MovieTMDBCard(props) {
    const navigate =useNavigate()
    const addMovieData=props.data
    
{console.log('addMovieData',addMovieData)}
   async function handleAddMovie (MovieData){
      const response = await addMovie(MovieData)
     
      if(response.status==='success'){
        toast.success(`movie added sucessfully !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/theaterlistmovies');
      }else{
        toast.error(`${response?.message}`, {
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

    }


    const movieURLTmdb=`https://image.tmdb.org/t/p/w500${props.data.poster_path}`


    return (

      <Card className="bg-blue-gray-50 w-60 h-80 m-1">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={movieURLTmdb}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="mt-0">
          <div >
            <Typography color="blue-gray" className="font-medium">
            {props.data.title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {props.data.releaseDate}
            </Typography>
          </div>
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={()=>handleAddMovie(addMovieData,movieURLTmdb)}
            className="bg-deep-purple-600 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add Movie
          </Button>
        </CardFooter>
      </Card>
    );
  }