import React from "react";
import { Box, Grid } from "@mui/material";
<<<<<<< HEAD
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
=======
import Message from "@components/message/Message";
>>>>>>> 7b77673 (create base ui homepage)

function Home(props) {
  return (
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
  );
}

export default Home;
