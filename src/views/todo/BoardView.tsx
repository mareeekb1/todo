import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  List,
  ListItemText,
} from "@mui/material";
import Label from "./components/Label";
import {
  MoreVert as MoreVertIcon,
  CheckCircleOutlineOutlined as CheckCircleEmptyIcon,
  CheckCircle as CheckCircleFilledIcon,
} from "@mui/icons-material";
import Milestone from "./components/Milestone";
import { TodoDataList } from "../../redux/models/todos.model";

const BoardView = ({ data }: TodoDataList) => {
  return (
    <Container disableGutters sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", overflowX: "auto" }}>
        {data.map((todo, key) => (
          <Box sx={{ minWidth: "25%", mr: 2 }} key={key}>
            <Card sx={{ background: todo.isActive ? "#ACECC7" : "#EDF5FC" }}>
              <CardHeader
                title={todo.title}
                subheader={todo.labels.map((label, idx) => (
                  <Label {...label} key={idx} />
                ))}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                {todo.items.map((x, idx) => (
                  <List
                    sx={{ display: "flex", alignItems: "center" }}
                    key={idx}
                  >
                    <IconButton>
                      {x.isDone ? (
                        <CheckCircleFilledIcon color="primary" />
                      ) : (
                        <CheckCircleEmptyIcon color="primary" />
                      )}
                    </IconButton>
                    <Box>
                      <ListItemText
                        secondary={x.deadline?.toString()}
                        primary={x.title}
                      />
                      <Box>{x.description}</Box>
                    </Box>
                  </List>
                ))}
              </CardContent>
              <CardMedia>
                <Milestone {...todo.milestone} />
              </CardMedia>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BoardView;
