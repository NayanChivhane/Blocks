import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title,setTitle] =useState("");
    const [description, setDescription]= useState("")
    const navigate=useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <label
            htmlFor="helper-text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Title
          </label>
          <input
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Title"
          />
        <TextEditor onChange={(e)=>{
            setDescription(e.target.value)
        }}/>
        <button onClick={async()=>{
        const response =await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content:description
        },{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        navigate(`/blog/${response.data.id}`)
       }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
           Publish post
       </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}){
    return <form>
           <div className="w-full mb-4 border mt-4 rounded">
           <div className="flex items-center justify-between px-3  ">      
           </div>
           <div className="  bg-white rounded-b-lg ">
               <label htmlFor="editor" className="sr-only">Publish post</label>
               <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 " placeholder="Write an article..." required ></textarea>
           </div>
       </div>
       
    </form>
    
} 