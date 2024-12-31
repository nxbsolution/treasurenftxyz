"use client"
import {postData} from "./post"

export default function Page(){

 

  return(
    <div className="bg-yellow-500 p-48">
      <button
       className="bg-red-500" 
       onClick={()=>postData()}
      >Submit</button>
    </div>
  )
}