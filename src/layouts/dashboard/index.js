import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import axios from "axios";

import Button from "@mui/material/Button";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Dashboard() {
  const [clubCount, setClubCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [clinicCount, setClinicCount] = useState(0);
  const [physioClinicCount, setPhysioClinicCount] = useState(0);
  const [Options, setOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [phyClinicOptions, setPhyClinicOptions] = useState([]);

  const [newClinic, setNewClinic] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });
  const [newPhyClinic, setNewPhyClinic] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });
  const [newOffer, setNewOffer] = useState({
    name: "",
    description: "",
    price: "",
    ratings: "",
  });
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    ratings: "",
  });
  const [newPhyclinicService, setNewPhyclinicService] = useState({
    name: "",
    description: "",
    price: "",
    ratings: "",
  });

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    image: "",
  });
  useEffect(() => {
    axios
      .get("https://nutrigym.onrender.com/api/v1/club")
      .then((response) => {
        const clubCount = response.data.result;
        const options = response.data.data;

        if (!response.data.result) {
          setClubCount(0);
        } else {
          setClubCount(clubCount);
          setOptions(options);
        }
      })
      .catch((error) => {
        console.error("Error fetching club count:", error);
      });

    // Fetch product count
    fetch("https://nutrigym.onrender.com/api/v1/prod")
      .then((response) => response.json())
      .then((data) => {
        const productCount = data.result;
        if (!data.result) {
          setProductCount(0);
        } else {
          setProductCount(productCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching product count:", error);
      });

    // Fetch clinic count
    axios
      .get("https://nutrigym.onrender.com/api/v1/clinc")
      .then((response) => {
        const kkkkk = response.data.data;
        const clinicCount = response.data.result;

        if (!response.data.result) {
          setClinicCount(0);
        } else {
          setClinicCount(clinicCount);
          setServiceOptions(kkkkk);
        }
      })
      .catch((error) => {
        console.error("Error fetching clinic count:", error);
      });

    // Fetch physiotherapy clinic count
    axios
      .get("https://nutrigym.onrender.com/api/v1/phyclinic")
      .then((response) => {
        const hhhhh = response.data.data;
        const phyclinicCount = response.data.result;

        if (!response.data.result) {
          setPhysioClinicCount(0);
        } else {
          setPhysioClinicCount(phyclinicCount);
          setPhyClinicOptions(hhhhh);
        }
      })
      .catch((error) => {
        console.error("Error fetching phyclinic count:", error);
      });
  }, []);

  const handleAddProduct = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Create the headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the API request to add a new clinic
    fetch("https://nutrigym.onrender.com/api/v1/prod", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New product added:", data);
        setNewProduct({
          description,
          image,
          price,
          quantity,
          title,
        });
      })
      .catch((error) => {
        console.error("Error adding new product:", error);
      });
  };

  useEffect(() => {
    if (Options.length > 0) {
    }
  }, [Options]);
  useEffect(() => {
    if (serviceOptions.length > 0) {
    }
  }, [serviceOptions]);

  const handleAddClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Create the headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the API request to add a new clinic
    fetch("https://nutrigym.onrender.com/api/v1/clinc", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newClinic),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New clinic added:", data);
        setNewClinic({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new clinic:", error);
      });
  };

  const handleAddOfferInClub = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set the headers with the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Send a POST request to add the new club
    fetch(
      "https://nutrigym.onrender.com/api/v1/club/offers/" + selectedOption,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newOffer),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("New offer added:", data);
        // Reset the form and update the club count
        setNewOffer({
          name: "",
          description: "",
          price: "",
          ratings: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new offer:", error);
      });
    console.log(setNewOffer);
  };

  const handleAddServiceInClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set the headers with the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Send a POST request to add the new clinic
    fetch(
      "https://nutrigym.onrender.com/api/v1/clinc/services/" + selectedOption,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newService),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("New service added:", data);
        // Reset the form and update the club count
        setNewService({
          name: "",
          description: "",
          price: "",
          ratings: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new service:", error);
      });
    console.log(setNewService);
  };

  const handleAddServiceInPhyClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set the headers with the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Send a POST request to add the new clinic
    fetch(
      "https://nutrigym.onrender.com/api/v1/phyclinic/services/" +
        selectedOption,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newPhyclinicService),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("New service added:", data);
        // Reset the form and update the club count
        setNewPhyclinicService({
          name: "",
          description: "",
          price: "",
          ratings: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new service:", error);
      });
    console.log(setNewPhyclinicService);
  };

  const handleAddPhyClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Create the headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the API request to add a new physiotherapy clinic
    fetch("https://nutrigym.onrender.com/api/v1/phyclinic", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newPhyClinic),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New physiotherapy clinic added:", data);
        setNewPhyClinic({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new physiotherapy clinic:", error);
      });
  };

  const handleClinicInputChange = (event) => {
    const { name, value } = event.target;
    setNewClinic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePhyClinicInputChange = (event) => {
    const { name, value } = event.target;
    setNewPhyClinic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOfferChange = (event) => {
    const { name, value } = event.target;
    setNewOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlephyclinicChange = (event) => {
    const { name, value } = event.target;
    setNewPhyclinicService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  const Ooptions = () => {
    return Options.map((opt) => (
      <MenuItem key={opt.name} value={opt._id}>
        {opt.name}
      </MenuItem>
    ));
  };
  const clinicOptions = () => {
    return serviceOptions.map((opt) => (
      <MenuItem key={opt.name} value={opt._id}>
        {opt.name}
      </MenuItem>
    ));
  };
  const phyclinicOptions = () => {
    return phyClinicOptions.map((opt) => (
      <MenuItem key={opt.name} value={opt._id}>
        {opt.name}
      </MenuItem>
    ));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Clubs"
                count={clubCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Clinics"
                count={clinicCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Physiotherapy clinic"
                count={physioClinicCount}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Clinic Name"
                        name="name"
                        value={newClinic.name}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newClinic.description}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newClinic.governorate}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newClinic.street}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add Clinic
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddPhyClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Physiotherapy clinic Name"
                        name="name"
                        value={newPhyClinic.name}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newPhyClinic.description}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newPhyClinic.governorate}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newPhyClinic.street}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add PhyClinic
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddOfferInClub}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      add offer
                      <FormControl fullWidth spacing={1}>
                        select a club
                        <InputLabel id="dropdown-label" mb={1}></InputLabel>
                        <Select
                          labelId="dropdown-label"
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          <MenuItem value="" disabled>
                            Select Offer
                          </MenuItem>
                          {Ooptions()}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="name"
                        name="name"
                        value={newOffer.name}
                        onChange={handleOfferChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newOffer.description}
                        onChange={handleOfferChange}
                        fullWidth
                      />
                    </MDBox>

                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="price"
                        name="price"
                        value={newOffer.price}
                        onChange={handleOfferChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="ratings"
                        name="ratings"
                        value={newOffer.ratings}
                        onChange={handleOfferChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add Offer
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddServiceInClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      add service
                      <FormControl fullWidth spacing={1}>
                        select a clinic
                        <InputLabel id="dropdown-label" mb={1}></InputLabel>
                        <Select
                          labelId="dropdown-label"
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          <MenuItem value="" disabled>
                            Select service
                          </MenuItem>
                          {clinicOptions()}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="name"
                        name="name"
                        value={newService.name}
                        onChange={handleServiceChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newService.description}
                        onChange={handleServiceChange}
                        fullWidth
                      />
                    </MDBox>

                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="price"
                        name="price"
                        value={newService.price}
                        onChange={handleServiceChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="ratings"
                        name="ratings"
                        value={newService.ratings}
                        onChange={handleServiceChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add Clinic Service
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddServiceInPhyClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      add service
                      <FormControl fullWidth spacing={1}>
                        select a phyclinic
                        <InputLabel id="dropdown-label" mb={1}></InputLabel>
                        <Select
                          labelId="dropdown-label"
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          <MenuItem value="" disabled>
                            Select service
                          </MenuItem>
                          {phyclinicOptions()}
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="name"
                        name="name"
                        value={newPhyclinicService.name}
                        onChange={handlephyclinicChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newPhyclinicService.description}
                        onChange={handlephyclinicChange}
                        fullWidth
                      />
                    </MDBox>

                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="price"
                        name="price"
                        value={newPhyclinicService.price}
                        onChange={handlephyclinicChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="ratings"
                        name="ratings"
                        value={newPhyclinicService.ratings}
                        onChange={handlephyclinicChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add PhyClinic
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4} marginTop={20}>
                  <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                      color="primary"
                      icon="person_add"
                      title="Products"
                      count={productCount}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <MDBox mb={1.5}>
                    <form onSubmit={handleAddProduct}>
                      <MDBox
                        color="white"
                        bgColor="white"
                        variant="gradient"
                        borderRadius="lg"
                        shadow="lg"
                        p={2}
                      >
                        <MDBox mt={2.5}>
                          <TextField
                            label="title"
                            name="title"
                            value={newProduct.title}
                            onChange={handleProductChange}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mt={2.5}>
                          <TextField
                            label="description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleProductChange}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mt={2.5}>
                          <TextField
                            label="quantity"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleProductChange}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mt={2.5} mb={2.5}>
                          <TextField
                            label="price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleProductChange}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mt={2.5} mb={2.5}>
                          <MDInput
                            type="file"
                            name="image"
                            value={newProduct.image}
                            onChange={handleProductChange}
                            fullWidth
                          />
                        </MDBox>
                        <MDButton
                          type="submit"
                          variant="contained"
                          color="info"
                          fullWidth
                        >
                          Add Product
                        </MDButton>
                      </MDBox>
                    </form>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
