import { SignupInput } from "@nayanchivhane/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate= useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  async function sendRequest(){
    try{

      const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
      const jwt=response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs")
    }catch(e){
      
      
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-2xl font-extrabold ">Create an account</div>
            <div className="text-slate-400">
                
             {type ==="signin"? "Don't have an accout? ":"Already have an account?"}
              <Link className="pl-2 underline" to={type ==="signin"?"/signup": "/signin"}>
                {type==="signin"? "Sign Up": "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type=== "signup" ?<LabelledInput
              label="Name"
              placeholder="typer your name here"
              onChange={(e) => {
                setPostInputs(postInputs => ({
                  ...postInputs,
                  name: e.target.value,
                }));
              }}
            />: null}
            <LabelledInput
              label="Username"
              placeholder="typer your username here"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  username: e.target.value,
                }));
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="typer your password here"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"? "Sign Up": "Sign In"}</button>

          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div className="mb-6">
        <label className="block mb-2 text-sm text-black font-bold pb-1 pt-4">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
