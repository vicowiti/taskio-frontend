import { ImSpinner8 } from "react-icons/im";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/store/store";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { storeData } from "../config/localStorage";
import Taskio from "../assets/taskio.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!username || !password) return toast.error("Please fill all fields");

      setLoading(true);

      const response = await dispatch(loginUser({ username, password }));
      console.log("loginError", response.payload);

      if (response.type === "auth/loginUser/fulfilled") {
        navigate("/dashboard");
        await storeData("user", response.payload);
      }

      setLoading(false);
      return;
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Login Failed");
    }

    toast.success("Attempting Login...");
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-12 w-auto" src={Logo} alt="Taskio" />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  onSubmit={(e) => handleLogin(e)}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value.toLowerCase())
                        }
                        name="username"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent items-center gap-2 bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {loading && <ImSpinner8 className="animate-spin" />}
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={Taskio}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
