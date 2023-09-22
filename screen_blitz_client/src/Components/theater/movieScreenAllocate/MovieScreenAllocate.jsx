import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { SelectMovie } from "../../select/SelectMovie";
import { SelectScreen } from "../../select/SelectScreen";
import { movieScreenAllocate } from "../../../api/theaterApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MovieScreenAllocate(props) {
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState("");
  const [screenId, setScreenId] = useState("");

  function movieSelectClickHandle(id) {
    setMovieId(id);
  }
  function screenSelectClickHandle(id) {
    setScreenId(id);
  }

  const handleSubmit = async () => {
    if (movieId !== "" && screenId !== "") {
      const data = { movie: movieId, screen: screenId };

      const response = await movieScreenAllocate(data);
      if (response?.status === "success") {
        toast.success(`screen allocated for Movie !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/screenlist");
      }
      setMovieId("");
      setScreenId("");
    } else {
      toast.error(`select screen and movie to continue !!`, {
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
    <div className="m-10">
      <Card className="w- h-11/12 px-40 py-40">
        {/* <CardHeader>
                <Typography>
                    Show Management
                </Typography>
            </CardHeader> */}
        <CardBody>
          <div>
            <h1 className="font-bold pb-10">Show Management</h1>
          </div>

          <div className="">
            <div className="grid grid-cols-2">
              <div>
                <SelectMovie
                  data={props.movie}
                  movieSelectClickHandle={movieSelectClickHandle}
                />
              </div>
              <div>
                <SelectScreen
                  data={props.screen}
                  screenSelectClickHandle={screenSelectClickHandle}
                />
              </div>
            </div>
            <div className="pt-10">
              <Button onClick={handleSubmit} color={"purple"}>
                submit
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default MovieScreenAllocate;
