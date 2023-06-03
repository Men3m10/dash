import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #999",
  borderRadius: 10,
  p: 4,
};

export default function useClubData() {
  const [clubData, setClubData] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clubId, setClubId] = useState(false);

  const [editClub, setEditClub] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });

  const [addOffer, setAddOffer] = useState({
    name: "",
    description: "",
    price: "",
    ratings: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = (clubId) => {
    setOpen(true);
    setClubId(clubId);
  };

  const [openoffer, setOpenoffer] = React.useState(false);
  const handleOpenoffer = (clubId) => {
    setOpenoffer(true);
    setClubId(clubId);
  };
  const handleCloseOffer = () => setOpenoffer(false);

  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  let isMounted = true;

  async function fetchclinicData() {
    try {
      const response = await axios.get(
        "https://nutrigym.onrender.com/api/v1/clinc"
      );

      if (isMounted) {
        setClubData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  }

  useEffect(() => {
    fetchclinicData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditClub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setAddOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const DeleteClinic = async (clubID) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `https://nutrigym.onrender.com/api/v1/clinc/` + clubID,
        {
          headers: headers,
        }
      );
      fetchclinicData();
    } catch (error) {
      console.error("Error fetching clinc data:", error);
    }
  };

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={0} lineHeight={0}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Governorate = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );

  const Action = ({ clubId }) => {
    return (
      <div>
        <Button
          onClick={() => {
            handleOpen(clubId);
          }}
        >
          Edit
        </Button>
        <Modal
          disableEnforceFocus
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit this club
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter the new data
            </Typography>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={1.5}>
                <form>
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
                        label="Club Name"
                        name="name"
                        value={editClub.name}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={editClub.description}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={editClub.governorate}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={editClub.street}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Update Club
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  };

  const Action2 = ({ clubId }) => {
    return (
      <div>
        <Button
          onClick={() => {
            handleOpenoffer(clubId);
          }}
        >
          Add
        </Button>
        <Modal
          disablePortal
          open={openoffer}
          onClose={handleCloseOffer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add an Offer
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter the offer data
            </Typography>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={1.5}>
                <form>
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
                        label="offer name"
                        name="name"
                        value={addOffer.name}
                        onChange={handleInputChange2}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={addOffer.description}
                        onChange={handleInputChange2}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Price"
                        name="price"
                        value={addOffer.price}
                        onChange={handleInputChange2}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Ratings"
                        name="ratings"
                        value={addOffer.ratings}
                        onChange={handleInputChange2}
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
          </Box>
        </Modal>
      </div>
    );
  };

  const GetServices = ({ clubId }) => {
    return (
      <div>
        <Button
          onClick={() => {
            handleOpen2(clubId);
          }}
          style={{ color: "green" }}
        >
          Get Services
        </Button>
      </div>
    );
  };

  const Delete = ({ clubId }) => {
    return (
      <div>
        <Button
          onClick={() => {
            DeleteClinic(clubId);
          }}
          style={{ color: "red" }}
        >
          Delete
        </Button>
      </div>
    );
  };

  const columns = [
    { Header: "Clinic", accessor: "clinic", width: "30%", align: "left" },
    { Header: "Governorate", accessor: "governorate", align: "left" },
    { Header: "Street", accessor: "street", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
    { Header: "Services", accessor: "services", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ];

  const rows = clubData.map((club) => ({
    clinic: <Author name={club.name} />,
    governorate: <Governorate title={club.location.governorate} />,
    street: club.location.street,
    action: <Action clubId={club._id} />,
    services: <GetServices clubId={club._id} />,
    delete: <Delete clubId={club._id} />,
  }));

  return {
    columns,
    rows,
  };
}
