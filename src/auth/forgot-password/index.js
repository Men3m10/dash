import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";

function ForgotPassword() {
  const [notification, setNotification] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    err: false,
    textError: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const changeHandler = (e) => {
    setEmail(e.target.value);
    setError({ err: false, textError: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.trim().length === 0 || !email.trim().match(mailFormat)) {
      setError({ err: true, textError: "The email must be valid" });
      return;
    }

    try {
      const response = await axios.post(
        "https://nutrigym.onrender.com/api/v1/auth/forgetPassword",
        { email }
      );
      alert(JSON.stringify(response.data.message));
      setResponseMessage(response.data.message);
      setError({ err: false, textError: "" });
      setNotification(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        setError({ err: true, textError: err.response.data.errors.email[0] });
      } else {
        setError({ err: true, textError: "An error occurred" });
      }
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                name="email"
                onChange={changeHandler}
                error={error.err}
              />
            </MDBox>
            {error.err && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {error.textError}
              </MDTypography>
            )}
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                reset
              </MDButton>
            </MDBox>
          </form>
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
      </Card>
      {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
            Please check your email to reset your password.
          </MDTypography>
        </MDAlert>
      )}
    </CoverLayout>
  );
}

export default ForgotPassword;
