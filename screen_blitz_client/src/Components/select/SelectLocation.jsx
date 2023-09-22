import { Select, Option } from "@material-tailwind/react";
 
export function SelectMovie(props) {
  return (
    <div className="w-60">
      <Select
        label='choose location'
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        
{
    props.data?.map((obj)=>(
        <Option key={obj._id} onClick={()=>props.movieSelectClickHandle(obj._id)}  >{obj.location}</Option>

    ))
}
        
       
      </Select>
    </div>
  );
}