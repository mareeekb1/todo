import { Paper, Typography } from "@mui/material";
import React from "react";
import { Milestone as IMilestone } from "../../../redux/models/milestones.model";

const Milestone = ({ title, from, to, description }: IMilestone) => {
  return (
    <Paper sx={{ p: 1 }}>
      <Typography>Milestone</Typography>
      <Typography variant="h6">{title}</Typography>
      <Typography>
        from: <b>{from}</b> to: <b>{to}</b>
      </Typography>
      <Typography>{description}</Typography>
    </Paper>
  );
};

export default Milestone;
