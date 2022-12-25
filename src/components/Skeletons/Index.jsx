import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Skeletons() {
  return (
    <Box sx={{ width: "100%", height: 200 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton />
    </Box>
  );
}
