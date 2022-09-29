import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { pickTextColorBasedOnBgColorSimple } from "../../utils/appUtils";
import { Label as LabelIcon, Close as CloseIcon } from "@mui/icons-material";
import { LabelList } from "../../redux/models/labels.model";
import { deleteLabel } from "../../redux/actions/label.action";
import { useAppDispatch } from "../../redux/hooks";

type Props = LabelList & {
  load: (id: string | undefined | number) => void;
};

const ListView = ({ data, load }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleDeleteLabel(id: string | undefined | number) {
    setIsProcessing(true);
    await dispatch(deleteLabel(id))
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setIsProcessing(false);
    load(id);
  }

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 12 }}>
      {data.map((item, key) => (
        <Grid item key={key} xs={3}>
          <Paper
            sx={{
              p: 1,
              background: item.color,
              color: pickTextColorBasedOnBgColorSimple(item.color),
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <LabelIcon sx={{ mr: 1 }} />
              <Typography>{item.name}</Typography>
            </Box>
            <Typography>{item.color}</Typography>
            {!isProcessing && (
              <IconButton onClick={() => handleDeleteLabel(item.id)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListView;
