import { Box, Button, ButtonGroup, SelectChangeEvent } from "@mui/material";
import React from "react";
import LabelSelector from "./LabelSelector";

interface IFilters {
  onTabChange: (e: any) => void;
  onLabelChange: (
    event: SelectChangeEvent<string[]>,
    child: React.ReactNode
  ) => void;
  tab: number;
  labels: string[];
}

const Filters = ({ tab, onTabChange, onLabelChange, labels }: IFilters) => {
  //Active-0,NotActive-1,ALL-2
  return (
    <Box>
      <ButtonGroup onClick={onTabChange}>
        <Button value={0} variant={tab === 0 ? "contained" : "outlined"}>
          Active
        </Button>
        <Button value={1} variant={tab === 1 ? "contained" : "outlined"}>
          Not active
        </Button>
        <Button value={2} variant={tab === 2 ? "contained" : "outlined"}>
          All
        </Button>
      </ButtonGroup>
      <LabelSelector onChange={onLabelChange} labels={labels} />
    </Box>
  );
};

export default Filters;
