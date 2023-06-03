import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import axios from "axios";

function Register() {
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
    gender: "",
    role: "admin",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    agreeError: false,
    genderError: false,
    error: false,
    errorText: "",
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (
      inputs.email.trim().length === 0 ||
      !inputs.email.trim().match(mailFormat)
    ) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 8) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    if (inputs.gender.trim().length === 0) {
      setErrors({ ...errors, genderError: true });
      return;
    }

    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      gender: inputs.gender,
      role: inputs.role,
    };

    try {
      const response = await axios.post(
        "https://nutrigym.onrender.com/api/v1/auth/signup",
        newUser
      );
      const { token } = response.data;

      localStorage.setItem("token", token); // Store the token in localStorage

      authContext.login(response.data.token, response.data.refresh_token);
    } catch (error) {
      setResponseMessage(error.response.data.msg[0].msg);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || error.response.data.errors[0].detail;
        setErrors({ ...errors, error: true, errorText: errorMessage });
      } else {
        setErrors({
          ...errors,
          error: true,
          errorText: "An error occurred while signing up. Please try again.",
        });
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setInputs({
      name: "",
      email: "",
      password: "",
      agree: false,
      gender: "",
      role: "admin",
    });

    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      agreeError: false,
      genderError: false,
      error: false,
      errorText: "",
    });
  };

  return (
    <div>
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add New Admin
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox
              component="form"
              role="form"
              method="POST"
              onSubmit={submitHandler}
            >
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={inputs.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                  inputProps={{
                    autoComplete: "name",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                {errors.nameError && (
                  <MDTypography
                    variant="caption"
                    color="error"
                    fontWeight="light"
                  >
                    The name cannot be empty
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={inputs.email}
                  name="email"
                  onChange={changeHandler}
                  error={errors.emailError}
                  inputProps={{
                    autoComplete: "email",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                {errors.emailError && (
                  <MDTypography
                    variant="caption"
                    color="error"
                    fontWeight="light"
                  >
                    The email must be valid
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  name="password"
                  value={inputs.password}
                  onChange={changeHandler}
                  error={errors.passwordError}
                />
                {errors.passwordError && (
                  <MDTypography
                    variant="caption"
                    color="error"
                    fontWeight="light"
                  >
                    The password must be at least 8 characters long
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <Select
                  value={inputs.gender}
                  onChange={changeHandler}
                  name="gender"
                  fullWidth
                  error={errors.genderError}
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.genderError && (
                  <MDTypography
                    variant="caption"
                    color="error"
                    fontWeight="light"
                  >
                    Please select a gender
                  </MDTypography>
                )}
              </MDBox>
              {errors.error && (
                <MDTypography
                  variant="caption"
                  color="error"
                  fontWeight="light"
                >
                  {errors.errorText}
                </MDTypography>
              )}
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                >
                  Sign Up
                </MDButton>
              </MDBox>
              {responseMessage && (
                <MDTypography
                  variant="body2"
                  color="info"
                  mt={2}
                  textAlign="center"
                >
                  {responseMessage}
                </MDTypography>
              )}
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </div>
  );
}

export default Register;
