import React from "react";
import { Chip } from "@mui/material";
import { Label as LabelIcon } from "@mui/icons-material";
import { pickTextColorBasedOnBgColorSimple } from "../../../utils/appUtils";
import { Label as ILabel } from "../../../redux/models/labels.model";

const Label = ({ name, color }: ILabel) => {
  return (
    <Chip
      size="small"
      icon={
        <LabelIcon sx={{ color: pickTextColorBasedOnBgColorSimple(color) }} />
      }
      label={name}
      sx={{
        color: pickTextColorBasedOnBgColorSimple(color),
        background: color,
        mr: "2px",
      }}
    />
  );
};

export default Label;
