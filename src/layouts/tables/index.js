import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const { columns, rows, showOffers } = authorsTableData();

  const [showAddForm, setShowAddForm] = useState(0);
  const [newClub, setNewClub] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });

  const [render, setRender] = useState(showOffers);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddClub = (event) => {
    event.preventDefault();

    // Check if any input field is empty
    if (
      !newClub.name ||
      !newClub.description ||
      !newClub.governorate ||
      !newClub.street
    ) {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set the headers with the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Send a POST request to add the new club
    axios
      .post("https://nutrigym.onrender.com/api/v1/club", newClub, { headers })
      .then((response) => {
        // Handle the response from the server
        console.log("New club added:", response.data);
        // Reset the form and update the club count
        setNewClub({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
        setErrorMessage(""); // Clear the error message
        setShowAddForm(0); // Hide the add form and trigger useEffect
        navigate("/dashboard"); // Navigate to the dashboard
      })
      .catch((error) => {
        console.error("Error adding new club:", error);
        setErrorMessage("Error adding new club. Please try again."); // Set the error message
      });
  };

  useEffect(() => {
    if (showAddForm === 0) {
      // Only perform the update if showAddForm is 0 (to avoid infinite loop)

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Set the headers with the token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Send a GET request to fetch the updated club data
      axios
        .get("https://nutrigym.onrender.com/api/v1/club", { headers })
        .then((response) => {
          // Handle the response from the server
          console.log("Updated club data:", response.data);
          // Update the rows state with the updated club data
          setRows(response.data);
        })
        .catch((error) => {
          console.error("Error fetching club data:", error);
        });
    }
  }, [showAddForm]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showAddForm === 1 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <MDBox mb={1.5}>
              <form onSubmit={handleAddClub}>
                <Card>
                  <MDBox p={2}>
                    <Typography variant="h6" color="#839A4C" align="center">
                      Add Club
                    </Typography>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Club Name"
                        name="name"
                        value={newClub.name}
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newClub.description}
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newClub.governorate}
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newClub.street}
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center">
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#839A4C", color: "white" }}
                      >
                        Add Club
                      </Button>
                    </MDBox>
                    {errorMessage && (
                      <Typography variant="body2" color="error" align="center">
                        {errorMessage}
                      </Typography>
                    )}
                  </MDBox>
                </Card>
              </form>
            </MDBox>
          </Grid>
        </Grid>
      ) : null}

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                display="flex"
                justifyContent="space-between"
                variant="#839A4C"
                bgColor="#839A4C"
                borderRadius="lg"
                coloredShadow="#839A4C"
              >
                <MDTypography variant="h6" color="white">
                  Clubs Table
                </MDTypography>
                <div
                  style={{
                    background: "white",
                    width: 110,
                    borderRadius: 10,
                  }}
                >
                  <Button
                    style={{ color: "#839A4C" }}
                    onClick={() => {
                      setShowAddForm(1);
                    }}
                  >
                    Add Club
                  </Button>
                </div>
              </MDBox>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {showOffers === 1 ? (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  display="flex"
                  justifyContent="space-between"
                  variant="#839A4C"
                  bgColor="#839A4C"
                  borderRadius="lg"
                  coloredShadow="#839A4C"
                >
                  <MDTypography variant="h6" color="white">
                    Clubs Table
                  </MDTypography>
                  <div
                    style={{
                      background: "white",
                      width: 85,
                      borderRadius: 10,
                    }}
                  >
                    <Button
                      style={{ color: "red" }}
                      onClick={() => {
                        showOffers === 0;
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </MDBox>

                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : null}
    </DashboardLayout>
  );
}

export default Tables;
