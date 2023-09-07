/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  Backdrop,
} from "@mui/material";
import {
  Button,
  Shimmer,
  Spinner,
} from "@avaya/neo-react";
import { Queues } from "../queues/Queues";
import { Attributes } from "../attributes/Attributes";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});


export function AgentAdmin(props) {
  let user = props.user;

  useEffect(() => {
    user = props.user;
  }, [props.user, props.userLoading]);

  const handleResetUser = (event, userId) => {
    props.resetUser(userId);
  };
  const handleSaveUser = (event, userId) => {
    props.saveUser(userId);
  };
  return !user ? (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xl"
        style={{
          gridTemplateColumns: "1fr 1fr",
          display: "grid",
          gridTemplateRows: "0.5fr 10fr",
        }}
      >
        <Shimmer />
      </Container>
    </ThemeProvider>
  ) : (
    user && (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xl"
          style={{
            gridTemplateColumns: "1fr 1fr",
            display: "grid",
            gridTemplateRows: "0.5fr 10fr",
            position: "relative"
          }}
        >
          <Backdrop
            open={props.userLoading}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
            }}
          >
            <Spinner id="wiloader" size="xl" style={{ color: "whitesmoke" }} />
          </Backdrop>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "flex-end",
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
          >
            <Button
              aria-label="Reset"
              label="Reset"
              onClick={handleResetUser}
              id="Reset"
              variant="secondary"
              style={{ margin: "5px" }}
            >
              Reset
            </Button>
            <Button
              aria-label="Save"
              label="Save"
              onClick={handleSaveUser}
              id="Save"
              variant="primary"
              style={{ margin: "5px" }}
            >
              Save
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Queues {...props} user={user} />
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Attributes {...props} user={user} />
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
