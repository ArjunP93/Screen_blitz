import { Select, Option } from "@material-tailwind/react";
 
export function SelectScreen(props) {
  return (
    <div className="w-72">
      <Select
        label='select screen'
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        
{
    props.data?.length>0 ? (props.data?.map((obj)=>(
        <Option key={obj._key} onClick={()=>props.screenSelectClickHandle(obj._id)} >{obj.screenName}</Option>

    ))):(<h1>no screens</h1>)
}
        
       
      </Select>
    </div>
  );
}