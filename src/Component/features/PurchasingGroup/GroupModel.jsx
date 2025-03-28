import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupById } from "./PurchasingGroupSlice";

export default function GroupModel(){
  const { productId } = useParams(); // קבלת ה-ID מהנתיב
  const purchasingGroup=useSelector(state=>state.purchasingGroups.purchasingGroup)
  const dispatch=useDispatch()
  console.log(productId)
  useEffect(()=>{
   dispatch(getGroupById(productId))
  },[])

  return (
      <>
    {purchasingGroup && (
      <div>
        <h3>Purchasing Group Details</h3>
        <p><strong>ID:</strong> {purchasingGroup.id}</p>
        <p><strong>Name:</strong> {purchasingGroup.name}</p>
        <p><strong>Description:</strong> {purchasingGroup.description}</p>
      </div>
    )}

 
      </>
  );
};
