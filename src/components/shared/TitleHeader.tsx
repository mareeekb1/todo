import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";

interface ITitleHeader {
  title: string;
  buttonText?: string;
  handleSearch?: (e: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  searchText?: string;
  search?: boolean;
  buttonEvent?: () => void;
}

const TitleHeader = ({
  title,
  buttonText,
  handleSearch,
  searchText,
  search,
  buttonEvent,
}: ITitleHeader) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        {buttonText && (
          <Button sx={{ ml: 2 }} startIcon={<AddIcon />} onClick={buttonEvent}>
            {buttonText}
          </Button>
        )}
      </Grid>
      {search && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}
    </>
  );
};

export default TitleHeader;
