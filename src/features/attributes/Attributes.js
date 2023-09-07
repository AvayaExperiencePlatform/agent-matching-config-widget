/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import {
  Select,
  SelectOption,
} from "@avaya/neo-react";
import "./Attributes.module.css";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#e53935",
    },
  },
});


export function Attributes(props) {
  const allAttributes = useSelector(({ attributes }) => attributes.attributes);

  let currentUser = props.user;
  useEffect(() => {
  }, [props.user, allAttributes]);

  const handleSetAttributes = (event, attributes) => {
    props.setAttributes(attributes);
  };

  return (
    currentUser &&
    currentUser.features &&
    currentUser.features.matching &&
    currentUser.features.matching.attributes &&
    allAttributes && (
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
              {"Attributes"}
            </Typography>
            <div
              style={{
                width: "100%",
                backgroundColor: "rgb(241, 241, 241)",
                padding: "15px",
              }}
            >
              <Select
                label={"Attributes"}
                aria-label={"attributes"}
                value={currentUser.features.matching.attributes}
                id="select-att"
                multiple
                searchable
                onChange={(value) => {
                  if (value != currentUser.features.matching.attributes)
                    handleSetAttributes(null, value);
                }}
                style={{ width: "100%" }}
              >
                {allAttributes.map((att) => (
                  <SelectOption
                    key={att.name}
                    style={{ width: "100%" }}
                    value={att.name}
                  >
                    {att.name}
                  </SelectOption>
                ))}
              </Select>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
}
