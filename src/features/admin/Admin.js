/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Shimmer,
} from "@avaya/neo-react";
import initAuth from "../../services/Auth";
import {
  getUserThunk,
  setUserQueues,
  setUserAttributes,
  updateUserThunk,
} from "./adminSlice";
import { AgentAdmin } from "../agent-admin/AgentAdmin";
import { SupervisorAdmin } from "../supervisor-admin/SupervisorAdmin";
import { listQueuesThunk } from "../queues/queuesSlice";
import { listAttributesThunk } from "../attributes/attributesSlice";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});



export function Admin() {
  const dispatch = useDispatch();
  const agent = useSelector(({ state }) => state.agent);
  const user = useSelector(({ admin }) => admin.user);
  const userLoading = useSelector(({ admin }) => admin.userLoading);
  const isSupervisor = useSelector(
    ({ state }) => state.agent && state.agent.roleId === "SUPERVISOR"
  );
  const [reload, setReload] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(1);

  const onTabChange = (newIndex) => {
    setActiveTabIndex(newIndex);
  };

  const loadData = () => {
    initAuth({ dispatch }).then((response) => {
      if (response) {
        dispatch(getUserThunk({ userId: agent.id }));
        dispatch(listQueuesThunk());
        dispatch(listAttributesThunk());
        setReload(false);
      } else {
        setReload(true);
      }
    });
  };

  useEffect(() => {
    if (agent && agent.id) loadData();
  }, [agent]);

  const updateUserAttributes = (attributes) => {
    dispatch(setUserAttributes(attributes));
  };

  const addNewQueueUser = () => {
    dispatch(
      setUserQueues([
        ...user.features.matching.queues,
        { queueId: null, proficiency: 8 },
      ])
    );
  };

  const removeQueueUser = (index) => {
    let queues = JSON.parse(JSON.stringify(user.features.matching.queues));
    queues.splice(index, 1);
    dispatch(setUserQueues(queues));
  };

  const updateQueueUser = (index, queueId, proficiency) => {
    let queues = JSON.parse(JSON.stringify(user.features.matching.queues));
    queues[index] = { queueId, proficiency };
    dispatch(setUserQueues(queues));
  };

  const refreshUser = () => {
    dispatch(getUserThunk({ userId: user.userId }));
  };
  const saveUser = () => {
    dispatch(updateUserThunk({ userId: user.userId, updatedUser: user }));
  };

  return agent && user ? (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="full"
        sx={{ padding: 0 }}
        style={{ padding: 0 }}
      >
        {/* <CssBaseline  /> */}
        <Box sx={{ width: "100%", height: "100%" }}>
          <Tabs
            id="main-tabs"
            onTabChange={onTabChange}
            carouselDropdown={
              <Button
                label="Reload"
                icon={"refresh"}
                aria-label="Reload"
                status="alert"
                onClick={(ev) => {
                  loadData();
                }}
              ></Button>
            }
          >
            <TabList>
              <Tab id="agents" icon="agents" style={{ padding: 0 }}>
                {"Your Settings"}
              </Tab>
              <Tab id="tab2" icon="user-group" style={{ padding: 0 }}>
                {"Team Settings"}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AgentAdmin
                  user={user}
                  addNewQueue={addNewQueueUser}
                  removeQueue={removeQueueUser}
                  updateQueue={updateQueueUser}
                  setAttributes={updateUserAttributes}
                  resetUser={refreshUser}
                  saveUser={saveUser}
                  userLoading={userLoading}
                />
              </TabPanel>
              <TabPanel>
                {isSupervisor ? (
                  <SupervisorAdmin />
                ) : (
                  <div style={{ padding: "8%" }}>
                    You do not have access to this as you are logged in as an
                    agent.
                  </div>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </ThemeProvider>
  ) : userLoading ? (
    <Shimmer style={{ width: "100%", height: "100%" }}></Shimmer>
  ) : (
    <div>
      <div style={{ padding: "8%" }}>
        An error has occured, please re-load this widget.
      </div>
      <Button
        label="Reload"
        icon={"refresh"}
        aria-label="Reload"
        status="alert"
        onClick={(ev) => {
          loadData();
        }}
      >
        Reload
      </Button>
    </div>
  );
}
