import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, CssBaseline } from "@mui/material";
import { AccordionGroup, Accordion } from "@avaya/neo-react";
import { Groups } from "../groups/Groups";
import { AgentAdmin } from "../agent-admin/AgentAdmin";
import {
  getUserThunk,
  setMemberQueues,
  setMemberAttributes,
  updateUserThunk
} from "../groups/groupsSlice";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});


export function SupervisorAdmin() {
  const dispatch = useDispatch();
  const user = useSelector(({ admin }) => admin.user);
  const selectedGroup = useSelector(({ groups }) => groups.selectedGroup);
  const teams = useSelector(({ groups }) => groups.teams);

  useEffect(() => {}, [user]);

  const handleLoadUser = (userId) => {
    dispatch(getUserThunk({ userId }));
  };

  const updateUserAttributes = (user, attributes) => {
    dispatch(setMemberAttributes({ userId: user.userId, attributes }));
  };

  const addNewQueueUser = (user) => {
    dispatch(
      setMemberQueues({
        userId: user.userId,
        queues: [
          ...user.features.matching.queues,
          { queueId: null, proficiency: 8 },
        ],
      })
    );
  };

  const removeQueueUser = (user, index) => {
    let queues = JSON.parse(JSON.stringify(user.features.matching.queues));
    queues.splice(index, 1);
    dispatch(
      setMemberQueues({
        userId: user.userId,
        queues: queues,
      })
    );
  };

  const updateQueueUser = (user, index, queueId, proficiency) => {
    let queues = JSON.parse(JSON.stringify(user.features.matching.queues));
    queues[index] = { queueId, proficiency };
    dispatch(
      setMemberQueues({
        userId: user.userId,
        queues: queues,
      })
    );
  };

  const refreshUser = (user) => {
    dispatch(getUserThunk({ userId: user.userId }));
  };

  const saveUser = (user) => {
    dispatch(updateUserThunk({ userId: user.userId, updatedUser: user }));
  };

  return (
    user && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="full">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Groups />
            <div style={{ marginTop: 2, width: "100%" }}>
              <AccordionGroup>
                {selectedGroup &&
                  teams &&
                  teams[selectedGroup] &&
                  teams[selectedGroup] &&
                  Object.values(teams[selectedGroup]).map((member) => (
                    <Accordion
                      key={member.user.userId}
                      header={member.user.displayName}
                      onClick={() =>
                        !member.isLoaded && handleLoadUser(member.user.userId)
                      }
                    >
                      <AgentAdmin
                        user={member.user}
                        addNewQueue={() => addNewQueueUser(member.user)}
                        removeQueue={(index) =>
                          removeQueueUser(member.user, index)
                        }
                        updateQueue={(index, queueId, proficiency) =>
                          updateQueueUser(
                            member.user,
                            index,
                            queueId,
                            proficiency
                          )
                        }
                        setAttributes={(attributes) =>
                          updateUserAttributes(member.user, attributes)
                        }
                        resetUser={() => refreshUser(member.user)}
                        saveUser={() => saveUser(member.user)}
                        userLoading={member.userLoading}
                      />
                    </Accordion>
                  ))}
              </AccordionGroup>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
