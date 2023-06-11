import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container className="mb-5">
      <Row>
        {/* left column */}
        <Col md={8} className="d-none d-md-block">
          <div className="loginLogo rounded-3xl shadow-xl d-flex flex-column align-items-center justify-content-center">
            <div className="text-center pt-5 font-bold">
              <h1 className="pt-10">No account?</h1>
              <h2 className="pt-4">Click below to Sign Up!</h2>
              <div className="mt-10 px-4">
                <p className="text-center text-xl">
                  <span className="mx-auto">
                    Want to enter PaletteTown? Catch and create decks to explore
                    color hexcode palettes you're proud of.
                  </span>
                  <span className="mx-auto">
                    Gotta catch 'em all and unlock the vibrant world of colors!
                  </span>
                </p>
              </div>
              <button className="btn-block bg-[#0B3C49] hover:bg-[#4B957E] text-white py-3 px-6 rounded-lg text-xl">
                <Link to="/signup" className="text-white text-decoration-none">
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </Col>

        {/* right column */}
        <Col md={4} className="bg-[#0B3C49] rounded-3xl shadow-xl text-white">
          <h1 className="pt-10 text-center">Palette Town</h1>
          <h2 className="pt-10 text-center">Where Hexcodes Choose YOU!</h2>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleFormSubmit} className="px-4">
                <div className="mb-3">
                  <p className="text-xs mt-4">User Email</p>
                  <input
                    className="form-input bg-transparent border-b-2 w-full border-[#376D5B] text-white focus:outline-none resize-none"
                    placeholder="example@example.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <p className="text-xs">Password</p>
                  <div className="input-icon">
                    <input
                      className="form-input bg-transparent border-b-2 border-[#376D5B] w-80 text-white focus:outline-none resize-none"
                      placeholder="******"
                      name="password"
                      type={showPassword ? "text" : "password"} // Dynamically set the input type based on showPassword state
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={toggleShowPassword}
                      className="hidden"
                    />
                    <label
                      htmlFor="showPassword"
                      className="ml-2 icon-label text-xl text-white"
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="mt-2 mb-4 btn-block bg-[#FFEC99] hover:bg-[#4B957E] font-bold py-3 px-6 rounded-lg text-xl"
                    style={{ cursor: "pointer", minWidth: "120px" }}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>

              {error && (
                <div className="my-3 p-3 bg-danger text-white rounded-xl text-center">
                  {error.message}
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
