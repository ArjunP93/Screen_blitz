import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setMovieData,setChoosenLocation, setLocationData } from "../../../redux/userSlice";

import { movieSearch,getLocations } from "../../../api/userApi";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Input,
  Select,Option
} from "@material-tailwind/react";
import { guestMovieSearch } from "../../../api/guestApi";
import { setGuestMovieSearch } from "../../../redux/guestSlice";

export function HomeNavbar(props) {
  const location = useLocation()
  
  const [openNav, setOpenNav] = React.useState(false);
  const [seachText, setSearchText] = useState("");
  const availableLoc = useSelector((store)=>store.user.locationData) 
  const defaultloc = useSelector((store)=>store.user.choosenLocation)
  

  


  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  useEffect(()=>{
    async function locationFetch(){
      const response =await getLocations()
      return response

    }
    if(props?.user){

      locationFetch().then((data)=>{
      
        dispatch(setLocationData(data.locData))
      }) 
    }
  },[])

  const userHandleMovieSearch = async () => {
    const response = await movieSearch({ searchKey: seachText });
    if (response.status === "success") {
      dispatch(setMovieData(response.results));
      navigate('/userhome')
    }
  };
  const guestHandleMovieSearch = async () => {
    const response = await guestMovieSearch({ searchKey: seachText });
    console.log("search results guest navbar", response);
    if (response.status === "success") {
      dispatch(setGuestMovieSearch(response.results));
    
    }
  };
  async function locationSelectClickHandle(locName) {
    localStorage.setItem('location',locName)
    dispatch(setChoosenLocation(locName))
  }

  const signOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem('userOperationsData')
    localStorage.removeItem('stripeId')
    localStorage.removeItem('location')
    dispatch(logOut());
    toast.success("Signout success");
    navigate("/user");
  };

  const signIn =()=>{
    navigate('/user')
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      

      <div className="relative flex w-full gap-2 md:w-max">
        <Input
          type="search"
          color="deep-purple"
          label="search movie..."
          value={seachText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button
          onClick={props?.user ? userHandleMovieSearch:guestHandleMovieSearch}
          size="sm"
          color="deep-purple"
          className="!absolute right-1 top-1 rounded"
        >
          Search
        </Button>
      </div>

      {(location.pathname === "/userhome" ||location.pathname === "/user") && (
        <div className="">
        <Select
        color="orange"
          label="choose location"
          value={defaultloc}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {availableLoc?.length ? (availableLoc.map((obj) => (
            <Option
              key={obj._id}
              onClick={() => locationSelectClickHandle(obj.location)}
            >
              {obj?.location}
            </Option>
          ))):<p>no locattions</p>}
        </Select>
      </div>
      ) }
      
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        {/* <a href="#" className="flex items-center">
          
        </a> */}
        <button className="flex items-center" onClick={()=>navigate('/profile')}>
        Account
        </button>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography> */}
      {props.user===true ? (<Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <button onClick={signOut} className="flex items-center">
          logout
        </button>
      </Typography>)
      :
      (<Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <button onClick={signIn} className="flex items-center">
          login/signup
        </button>
      </Typography>)
      }
    </ul>
  );

  return (
    // <div className=" max-h-[768px] ">
      <Navbar className="bg-black fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 border-none">
        <div className="flex items-center justify-between text-white">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-bold text-2xl"
          >
            Screen Blitz
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              color="deep-purple"
              onClick={()=>navigate('/userhome')}
            >
              <span>Book Now</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </MobileNav>
      </Navbar>

      /* <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          What is Material Tailwind
        </Typography>
        <Typography color="gray" className="font-normal">
          Can you help me out? you will get a lot of free exposure doing this
          can my website be in english?. There is too much white space do less
          with more, so that will be a conversation piece can you rework to make
          the pizza look more delicious other agencies charge much lesser can
          you make the blue bluer?. I think we need to start from scratch can my
          website be in english?, yet make it sexy i&apos;ll pay you in a week
          we don&apos;t need to pay upfront i hope you understand can you make
          it stand out more?. Make the font bigger can you help me out? you will
          get a lot of free exposure doing this that&apos;s going to be a chunk
          of change other agencies charge much lesser. Are you busy this
          weekend? I have a new project with a tight deadline that&apos;s going
          to be a chunk of change. There are more projects lined up charge extra
          the next time.
        </Typography>
      </div>  */
    // </div>
  )
}
