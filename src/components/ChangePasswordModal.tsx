import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { clearStorage } from "../config/localStorage";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/store/store";
import { loginUser } from "../redux/slices/authSlice";
import { toast } from "sonner";

export default function ChangePasswordModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const cancelButtonRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await dispatch(
        loginUser({
          username: formData.username,
          password: formData.oldPassword,
          new_password: formData.newPassword,
        })
      );

      if (response.type === "auth/loginUser/fulfilled") {
        toast.success("Password changed. Please login.");
        await clearStorage();
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error changing password");
      setLoading(false);
    }

    setOpen(false);
  };

  const handleLogout = async () => {
    await clearStorage();
    navigate("/");
  };
  return (
    <>
      <button
        className="text-white px-3 py-1.5 bg-blue-600 mt-2 rounded cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Change Password
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Update Account Password to Continue
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 text-left"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                placeholder="Enter your username"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="oldPassword"
                                className="block text-sm font-medium text-gray-700 text-left"
                              >
                                Old Password
                              </label>
                              <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                placeholder="Enter old password"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700 text-left"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        disabled={loading}
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border disabled:bg-indigo-400 border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={handleLogout}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
