"use client";

import React from "react";
import LoginBackground from "@/public/login-page-background.jpg";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function AuthPage({}: Props) {
  const [selected, setSelected] = React.useState<string | number>("login");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema:
      selected === "login"
        ? validationSchema.pick(["email", "password"])
        : validationSchema,
    onSubmit: (values) => {
      if (selected === "login") {
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(data.message);
            router.push("/dashboard");
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
          });
      } else if (selected === "sign-up") {
        fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(data.message);
            router.push("/dashboard");
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
          });
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="basis-1/3 bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <Card className="max-w-full w-[340px] h-fit">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="lg"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={(key) => {
                  formik.resetForm();
                  setSelected(key);
                }}
              >
                <Tab key="login" title="Login">
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <Input
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Input
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={
                        formik.touched.password && formik.errors.password
                      }
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <p className="text-center text-small">
                      Need to create an account?{" "}
                      <Link size="sm" onPress={() => setSelected("sign-up")}>
                        Sign up
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form
                    className="flex flex-col gap-4 h-full"
                    onSubmit={formik.handleSubmit}
                  >
                    <Input
                      isRequired
                      label="Name"
                      placeholder="Enter your name"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.touched.name && formik.errors.name}
                    />
                    <Input
                      isRequired
                      label="Username"
                      placeholder="Enter your username"
                      type="text"
                      name="username"
                      id="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={
                        formik.touched.username && formik.errors.username
                      }
                    />
                    <Input
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <p className="text-center text-small">
                      Already have an account?{" "}
                      <Link size="sm" onPress={() => setSelected("login")}>
                        Login
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary" type="submit">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="hidden md:flex flex-1 bg-gray-200 bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={LoginBackground}
            alt="Login Background"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
