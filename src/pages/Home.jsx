import React from "react";
import { Box, Grid } from "@mui/material";
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
import withNotAuth from "@components/common/withNotAuth";
import {Helmet, HelmetProvider} from 'react-helmet-async';

function Home(props) {
  return (
      <HelmetProvider>
        <Helmet>
          <title>Home page</title>
        </Helmet>
        <Box>
          <Grid container>
            <Grid item lg={3}>
              <ChatBar />
            </Grid>
            <Grid item lg={9}>
              <ChatDesktop />
            </Grid>
          </Grid>
        </Box>
      </HelmetProvider>
  );
}

export default withNotAuth(Home);
