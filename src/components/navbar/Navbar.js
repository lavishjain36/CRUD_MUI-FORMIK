import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography>Edu Temple</Typography>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src="https://picsum.photos/50/50"
            sx={{ width: "2rem", height: "2rem" }}
          />
          <Typography>Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;