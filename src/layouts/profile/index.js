// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function Overview() {
  const [profileData, setProfileData] = useState("");

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://nutrigym.onrender.com/api/v1/users/getMyData",
        {
          headers: headers,
        }
      );
      setProfileData(response.data.data);
    } catch (error) {
      console.error("Error while fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
              {profileData && (
                <ProfileInfoCard
                  title="profile information"
                  description="you will find all your information here"
                  info={{
                    fullName: profileData.name,
                    gender: profileData.gender,
                    email: profileData.email,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              )}
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
