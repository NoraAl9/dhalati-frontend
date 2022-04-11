import React from "react";
// material
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// components
import Header from "../components/Header";
import lostImage from "../assets/lost.jpg";

// -------------------------------------------------------------------------

function HomePage() {
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} sx={{ pt: 8 }} alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" color="red">
                  Welcome to Dhalati Bot.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6" color="text.secondary">
                  Oh Allah, <br /> Almighty of what is lost, Hold of <br />
                  what is lost, You conduct from <br /> the lost.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button variant="contained" sx={{ backgroundColor: "red" }}>
                  View BOT
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          >
            <Box
              component="img"
              alt="lost"
              src={lostImage}
              sx={{ maxWidth: "600px", maxHeight: "600px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
