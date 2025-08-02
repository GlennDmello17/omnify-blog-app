import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />

        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="john doe" label={"Username"} />

         <InputBox onChange={e => {
          setEmail(e.target.value);
        }} placeholder="johndoe@gmail.com" label={"Email"} />

        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
          try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
           username,
         email,
         password
           });

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      alert("Signup successful but no token received.");
    }
  } catch (err) {
    console.error(err);
    alert("Signup failed. Please try again.");
  }
}} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}