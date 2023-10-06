import { Button,Dialog,DialogBody,DialogFooter,DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TheaterProfileComponent() {
    const theaterId = useSelector((store)=>store.theater.theaterRedux.theaterId)
    const [theaterProfileInfo,setTheaterProfileInfo] = useState({})
    const [addpicDialog,setAddPicDialog]  = useState(false)
    const [picURL,setPicURL] = useState('')
    const [fileData,setFileData]= useState(null)
    const handlePicDialog = ()=>setAddPicDialog(!addpicDialog)


    const createURL=(e)=>{
        const file = e.target.files[0];
        setFileData(e.target.files[0]);
        if (file) {
          const imageURL = URL.createObjectURL(file);
          setPicURL(imageURL);
        }


    }

    const handleAddPic = async () => {
        const response = await addProfilePic(theaterId, fileData);
        if (response.status === "success") {
            setTheaterProfileInfo(response.user);
          toast.success(`profile photo added !!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handlePicDialog();
        } else {
          toast.error(`something went wrong couldn't upload photo !!`, {
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
<div className='w-full h-full'>
    <div className='mx-auto h-3/4 w-8/12 flex flex-col  rounded-lg shadow-lg'>
        <div className='mx-auto'>
            <button onClick={handlePicDialog}><img
                  className="h-60 w-60 p-1 rounded-full object-cover object-center"
                  src={
                    
                "https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg"
                  }
                  alt="profile image"
                /></button>
        </div>
        <div className='mx-auto'>
            <table>
                <td className='p-4'>
                <tr className='p-4 text-lg'>Name </tr>
                <tr className='p-4 text-lg'>Email </tr>
                <tr className='p-4 text-lg'>Mobile </tr>
                <tr className='p-4 text-lg'>Screens </tr>
                <tr className='p-4 text-lg'>Location </tr>
                <tr className='p-4 text-lg'>Description </tr>


                </td>
                <td className='p-4'>
                    <tr className='p-4 text-lg font-bold'>{}</tr>
                    <tr className='p-4 text-lg font-bold'>{}</tr>
                    <tr className='p-4 text-lg font-bold'>{}</tr>
                    <tr className='p-4 text-lg font-bold'>{}</tr>
                    <tr className='p-4 text-lg font-bold'>{}</tr>
                    <tr className='p-4 text-lg font-bold'>{}</tr>

                </td>
            </table>
        </div>

        {/* add pic dialog */}
        <Dialog
                open={addpicDialog}
                handler={handlePicDialog}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <DialogHeader>Add picture</DialogHeader>
                <DialogBody divider>
                  <div className="flex items-center flex-wrap justify-center gap-5">
                    <div className="">
                      {picURL ? (
                        <img
                          className="h-96 w-96 p-8 rounded-full object-cover object-center"
                          src={picURL}
                          alt="theater profile image"
                        />
                      ) : (
                        <img
                          // className="h-96 w-96 p-8 rounded-full object-cover object-center"
                          src="https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg"
                          alt="theater pic dummy"
                        />
                      )}
                    </div>
                    <label htmlFor="dropzone-file">
                      <div className="bg-deep-purple-500 p-2 rounded-xl">
                        <p className="text-white">select pic</p>
                      </div>

                      <input
                        type="file"
                        name="theaterProfileImage"
                        id="dropzone-file"
                        className="hidden"
                        onChange={createURL}
                      ></input>
                    </label>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handlePicDialog}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>

                  {picURL !== "" ? (
                    <Button
                      variant="gradient"
                      color="deep-purple"
                      onClick={handleAddPic}
                    >
                      <span>upload</span>
                    </Button>
                  ) : null}
                </DialogFooter>
              </Dialog>





    </div>
    </div>
  )
}

export default TheaterProfileComponent