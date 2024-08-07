import React, { useState } from "react";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import { toast } from "react-toastify";
import { toastOptions } from "../util/toastOptions";
import { loginUser, signupUser } from "../service/userService";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../store/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        if (response) {
          toast.success("Login successfull", toastOptions);
          setCookie("token", response.token);
          dispatch(authenticateUser(response));
          window.sessionStorage.setItem(
            "user",
            JSON.stringify({
              email: response.email,
              id: response.userId,
            })
          );
        }
      } else {
        const response = await signupUser({ email, password });
        if (response) {
          toast.success("Signup successfull, please login!", toastOptions);
          setIsLogin(true);
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      toast.error("Failed to login", toastOptions);
    }
  };

  return (
    <div className="h-full">
      {isLogin ? (
        <div className="flex flex-col justify-center items-center h-full">
          <h1>Login</h1>
          <TextInput
            className={"border w-80 my-2"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            className={"border w-80 my-2"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col my-2">
            <Button
              className={"mx-1"}
              text="Login"
              onClick={() => onSubmit()}
            />
            <p
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                setIsLogin(false);
                setEmail("");
                setPassword("");
              }}
            >
              don't have an account? sign up!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1>Signup</h1>
          <TextInput
            className={"border w-80 my-2"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            className={"border w-80 my-2"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            type="password"
            className={"border w-80 my-2"}
            placeholder={"Confirm Password"}
          />
          <div className="flex flex-col my-2">
            <Button
              className={"mx-1"}
              text="Signup"
              onClick={() => onSubmit()}
            />
            <p
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                setIsLogin(true);
                setEmail("");
                setPassword("");
              }}
            >
              Have an account? login in!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
