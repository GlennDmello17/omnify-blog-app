import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert("Login successful but token missing. Please try again.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Invalid credentials. Please check your email or password.");
      } else {
        alert("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          
          <InputBox 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="johndoe@gmail.com" 
            label={"Email"} 
          />

          <InputBox 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="123456" 
            label={"Password"} 
          />

          <div className="pt-4">
            <Button onClick={handleSignin} label={"Sign in"} />
          </div>

          <BottomWarning 
            label={"Don't have an account?"} 
            buttonText={"Sign up"} 
            to={"/signup"} 
          />
        </div>
      </div>
    </div>
  );
}
