import React from "react";
import { Box, Grid } from "@mui/material";
import Message from "@components/message/Message";

function Home(props) {
  return (
    <Box>
      <Grid container>
        <Grid item lg={3}>
          <Message />
        </Grid>
        <Grid item lg={6}>
          b
        </Grid>
        <Grid item lg={3}>
          c
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
