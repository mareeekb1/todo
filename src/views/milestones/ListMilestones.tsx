import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { deleteMilestone } from "../../redux/actions/milestones.action";
import { useAppDispatch } from "../../redux/hooks";
import { MilestoneList } from "../../redux/models/milestones.model";

type Props = MilestoneList & {
  load: (id: string | undefined | number) => void;
};

const ListMilestones = ({ data, load }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleDeleteLabel(id: string | undefined | number) {
    setIsProcessing(true);
    await dispatch(deleteMilestone(id));
    setIsProcessing(false);
    load(id);
  }
  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 12 }}>
      {data.map(({ title, from, to, description, id }, key) => (
        <Grid item xs={3} key={key}>
          <Card
            sx={{
              background: "#EDF5FC",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h5" component="div">
                from : {from.toString()}
              </Typography>
              <Typography variant="h5" component="div">
                to : {to.toString()}
              </Typography>
              <Typography color="text.secondary">{description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleDeleteLabel(id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListMilestones;
