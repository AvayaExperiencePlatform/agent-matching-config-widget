import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, CssBaseline } from "@mui/material";
import { getGroupsThunk, setSelectedGroup } from "./groupsSlice";
import { Select, SelectOption } from "@avaya/neo-react";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});


export function Groups() {
  const dispatch = useDispatch();
  const user = useSelector(({ admin }) => admin.user);
  const groups = useSelector(({ groups }) => groups.groups);
  const selectedGroup = useSelector(({ groups }) => groups.selectedGroup);

  useEffect(() => {
    if (user) {
      dispatch(getGroupsThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    groups && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              aria-label={"groups"}
              // defaultValue={}
              placeholder={"Select a group..."}
              searchable
              value={selectedGroup}
              id="select-group"
              onChange={(value) => {
                dispatch(setSelectedGroup(value));
              }}
            >
              {groups.map((group) => (
                <SelectOption key={group} value={group}>
                  {group}
                </SelectOption>
              ))}
            </Select>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
