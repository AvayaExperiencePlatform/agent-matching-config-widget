/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import {
  List,
  TextInput,
  Select,
  SelectOption,
  Tooltip,
  IconButton,
  Button,
} from "@avaya/neo-react";
import "./Queues.module.css";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});


export function Queues(props) {
  const allQueues = useSelector(({ queues }) => queues.queues);
  let currentUser = props.user;
  useEffect(() => {
  }, [props.user, allQueues]);


  const handleAddNewQueue = () => {
    props.addNewQueue();
  };

  const handleRemoveQueue = (event, queueIndex) => {
    props.removeQueue(queueIndex);
  };

  const handleUpdateQueue = (event, queueIndex, queueId, proficiency) => {
    props.updateQueue(queueIndex, queueId, proficiency);
  };

  const validProficiency = (prof) => {
    try {
      return parseInt(prof) > 0 && parseInt(prof) < 17;
    } catch (error) {
      return false;
    }
  };

  return (
    currentUser &&
    currentUser.features &&
    currentUser.features.matching &&
    currentUser.features.matching.queues &&
    allQueues && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              component="div"
              variant="h6"
              sx={{ fontFamily: "noto-sans,sans-serif", marginBottom: "10px" }}
            >
              {"Queues"}
            </Typography>
            <div
              style={{
                width: "100%",
                backgroundColor: "rgb(241, 241, 241)",
                padding: "15px",
              }}
            >
              <List itemType="ListSection" id="q-list">
                {currentUser.features.matching.queues.map((queue, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 0.1fr 1fr 0.1fr 0.1fr",
                      padding: "1%",
                      width: "100%",
                    }}
                  >
                    <Select
                      label={i == 0 ? "Queue Name" : ""}
                      aria-label={"queue"}
                      // defaultValue={}
                      value={queue.queueId}
                      id="select-q"
                      onChange={(value) => {
                        if (value != queue.queueId)
                          handleUpdateQueue(null, i, value, queue.proficiency);
                      }}
                      style={{ width: "100%" }}
                    >
                      {allQueues
                        .filter(
                          (q) =>
                            q.queueId == queue.queueId ||
                            !currentUser.features.matching.queues
                              .map((q) => q.queueId)
                              .includes(q.queueId)
                        )
                        .map((q) => (
                          <SelectOption
                            key={q.queueId}
                            style={{ width: "100%" }}
                            value={q.queueId}
                          >
                            {q.name}
                          </SelectOption>
                        ))}
                    </Select>
                    <div />
                    <TextInput
                      label={i == 0 ? "Proficiency" : ""}
                      aria-label={"prof"}
                      style={{ width: "100%" }}
                      placeholder={"Enter a proficienty"}
                      type="number"
                      min={1}
                      max={16}
                      helperText={
                        !validProficiency(queue.proficiency)
                          ? "Value should be between 1 - 16"
                          : ""
                      }
                      required
                      error={!validProficiency(queue.proficiency)}
                      clearable={false}
                      onChange={(event) =>
                        handleUpdateQueue(
                          null,
                          i,
                          queue.queueId,
                          event.target.value
                        )
                      }
                      value={queue.proficiency}
                    />
                    <div />
                    <Tooltip
                      key={i}
                      label="Delete Queue"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <IconButton
                        key={i}
                        onClick={(ev) => handleRemoveQueue(ev, i)}
                        aria-label="del q"
                        icon="trash"
                        id="btn-del-q"
                        variant="tertiary"
                        status="alert"
                      />
                    </Tooltip>
                  </div>
                  // </ListSection>
                ))}
              </List>
            </div>
            <Button
              aria-label="Add Queue"
              label="Add Queue"
              onClick={handleAddNewQueue}
              id="add-q"
              variant="secondary"
              style={{ marginTop: "10px" }}
            >
              Add Queue
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
