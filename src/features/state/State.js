import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAgentState,
  readyThunk,
  notReadyThunk,
  getCapabilitiesThunk,
  getReasonCodesThunk,
  getAgentDetailsThunk,
} from "./stateSlice";
import { subscribeToAgentState } from "./stateAPI";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import { Button, Menu, MenuItem } from "@avaya/neo-react";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});

export function State() {
  const dispatch = useDispatch();
  const agent = useSelector(({ state }) => state.agent);
  const reasonCodes = useSelector(({ state }) => state.reasonCodes);
  const agentState = useSelector(({ state }) => state.agentState);
  const capabilities = useSelector(({ state }) => state.capabilities);

  useEffect(() => {
    dispatch(getReasonCodesThunk());
    dispatch(getCapabilitiesThunk());
    dispatch(getAgentDetailsThunk());
    subscribeToAgentState((data) => {
      dispatch(setCurrentAgentState(data));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getReasonCodesThunk());
    dispatch(getCapabilitiesThunk());
    dispatch(getAgentDetailsThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentState]);


  const handleSetReady = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    dispatch(readyThunk());
  };
  const handleSetNotReady = (event, reasonCode) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    dispatch(notReadyThunk({ reasonCode }));
  };

  return (
    agent &&
    capabilities &&
    reasonCodes && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              sx={{ fontFamily: "noto-sans,sans-serif" }}
            >
              {agentState
                ? `${
                    agent?.displayName || "User"
                  }, your current state is: ${agentState.currentState?.replace(
                    "_",
                    " "
                  )}`
                : `${
                    agent?.displayName || "User"
                  }, your current state is: UNKNOWN`}
            </Typography>
            {reasonCodes &&
              agentState &&
              agentState.currentState == "NOT_READY" && (
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ fontFamily: "noto-sans,sans-serif" }}
                >
                  {`Reason: ${
                    reasonCodes.find((rc) => rc.code == agentState.reasonCode)
                      ?.friendlyName
                  }`}
                </Typography>
              )}
            {agentState && agentState.currentState == "LOGGED_OUT" && (
              <Typography
                component="h1"
                variant="h6"
                sx={{ fontFamily: "noto-sans,sans-serif", marginTop: 2 }}
              >
                {`Connect to the contact center to update your state.`}
              </Typography>
            )}
            <Button
              onClick={handleSetReady}
              type="submit"
              // fullWidth
              label="Set Ready"
              disabled={!capabilities?.canSetReady}
              status="alert"
              variant="primary"
              style={{
                marginTop: "5%",
                marginBottom: "2%",
                width: "70%",
              }}
            >
              Go Ready
            </Button>

            <div style={{ width: "70%" }}>
              <Menu
                id="notReadyMenu"
                itemAlignment="right"
                style={{ widht: "100%" }}
                menuRootElement={
                  <Button
                    type="submit"
                    // fullWidth
                    label="Set Ready"
                    disabled={!capabilities?.canSetReady}
                    status="alert"
                    aria-expanded="true"
                    variant="primary"
                    className="neo-dropdown__link-header"
                    style={{
                      marginTop: "5%",
                      marginBottom: "2%",
                      width: "100%",
                    }}
                  >
                    Go Not Ready
                  </Button>
                }
                onMenuClose={function fl() {}}
              >
                {reasonCodes &&
                  reasonCodes.map((reasonCode) => (
                    <MenuItem
                      key={reasonCode.code}
                      onClick={(event) =>
                        handleSetNotReady(event, reasonCode.code)
                      }
                    >
                      {`${reasonCode.code} - ${reasonCode.friendlyName}`}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
