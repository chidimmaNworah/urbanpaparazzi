import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import Router from "next/router";
import DotLoader from "@/components/loaders/dotLoader";
import News from "@/models/News";
import Category from "@/models/Category";
const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function signin({ providers, callbackUrl, csrfToken, news }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name?")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "Email needed to log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required("Must be at least six numbers,letters and symbols.")
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);

        Router.push("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
      // setUser({ ...user, success: "", error: "there was an error" });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "Login Successful", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl);
    }
  };
  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className="flex justify-between">
        <div className={styles.login}>
          <div className={styles.login__container}>
            <div className={styles.login__header}>
              <div className={styles.back__svg}>
                <BiLeftArrowAlt />
              </div>
              <span>
                We'd be happy to join us! <Link href="/">Go to Home</Link>
              </span>
            </div>
            <div className={styles.login__form}>
              <h1>Sign in</h1>
              <p>Get access to the best Urban News Magazine.</p>
              <Formik
                enableReinitialize
                initialValues={{
                  login_email,
                  login_password,
                }}
                validationSchema={loginValidation}
                onSubmit={() => {
                  signInHandler();
                }}
              >
                {(form) => (
                  <Form method="post" action="/api/auth/signin/email">
                    <input
                      type="hidden"
                      name="csrfToken"
                      defaultValue={csrfToken}
                    />
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      icon="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign in" />
                    {login_error && (
                      <span className={styles.error}>{login_error}</span>
                    )}
                    <div className={styles.forgot}>
                      <Link href="/auth/forgot">Forgot Password ?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className={styles.login__socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login__socials_wrap}>
                  {providers.map((provider) => {
                    if (provider.name == "Credentials") {
                      return;
                    }

                    return (
                      <div key={provider.name}>
                        {/* <Form
                        method="post"
                        action={`/api/auth/signin/${provider.name}`}
                      >
                         <input
                          type="hidden"
                          name="csrfToken"
                          defaultValue={csrfToken}
                        /> */}
                        <button
                          className={`${styles.social_btn} flex`}
                          onClick={() => signIn(provider.id)}
                        >
                          {/* <img src={`/icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name} */}
                          {/* Sign in with{" "} */}
                          <img src="/icons/google.png" alt="" />{" "}
                          <img src="/icons/facebook.png" alt="" />
                          {/* <img src="/icons/github.png" alt="" /> */}
                          <img src="/icons/twitter (legacy).png" alt="" />
                          <img src="/icons/apple.png" alt="" />
                          {/* <img src="/icons/microsoft.png" alt="" /> */}
                        </button>
                        {/* </Form> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login__container} id="signup">
            <div className={styles.login__form}>
              <h1>Sign up</h1>
              <p>Sign up to get access</p>
              <Formik
                enableReinitialize
                initialValues={{
                  name,
                  email,
                  password,
                  conf_password,
                }}
                validationSchema={registerValidation}
                onSubmit={() => {
                  signUpHandler();
                }}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="name"
                      icon="user"
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="text"
                      name="email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      icon="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="conf_password"
                      icon="password"
                      placeholder="Re-Type Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign up" />
                  </Form>
                )}
              </Formik>
              <div>
                {error && <span className={styles.error}>{error}</span>}
              </div>
              <div>
                {success && <span className={styles.success}>{success}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer news={news} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl || "/";
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  let news = await News.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
      news: JSON.parse(JSON.stringify(news)),
    },
  };
}
