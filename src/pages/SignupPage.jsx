import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../Urls/auth";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(30, "Name should be at most 30 character"),
  password: z.string().min(5, "Password Must be minimum 6 length"),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signup,
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  if (mutation.isSuccess) {
    navigate("/auth/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const checkError = () => {
    if (errors) {
      if (errors.email?.message) {
        toast.error(errors.email.message);
        clearErrors();
      } else if (errors.name?.message) {
        toast.error(errors.name.message);
        clearErrors();
      } else if (errors.password?.message) {
        toast.error(errors.password.message);
        clearErrors();
      }
      // clearErrors();
    }
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto w-3/4 p-4">
      <Logo />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  type="email"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.email && (
                  <p className=" text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  {...register("name")}
                  type="name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.name && (
                  <p className=" text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.password && (
                  <p className=" text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={checkError}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already signed up?{" "}
            <Link to="/auth/login">
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Go to login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
