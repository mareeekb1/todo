import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircleOutlineOutlined as CheckCircleEmptyIcon,
  CheckCircle as CheckCircleFilledIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Label from "./components/Label";
import Milestone from "./components/Milestone";
import { TodoDataList } from "../../redux/models/todos.model";

const ListView = ({ data }: TodoDataList) => {
  const [selected, setSelected] = useState<number[]>([]);

  function handleSelect(idx: number) {
    if (selected.find((x) => x === idx)) {
      return setSelected(selected.filter((x) => x !== idx));
    }
    return setSelected(selected.concat(idx));
  }
  function checkOpen(idx: number) {
    if (selected.find((x) => x === idx)) {
      return true;
    }
    return false;
  }

  return (
    <List>
      {data.map((todo, idx) => (
        <ListItem
          component={Paper}
          key={idx}
          sx={{
            display: "flex",
            flexGrow: 1,
            flexWrap: "wrap",
            background: todo.isActive ? "#ACECC7" : "#EDF5FC",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemText sx={{ display: "flex", width: "100%" }}>
                {todo.title}
              </ListItemText>
              <Box sx={{ ml: 1, display: "flex" }}>
                {todo.labels.map(({ name, color }, key) => (
                  <Label name={name} color={color} key={key} />
                ))}
              </Box>
            </Box>
            <Box>
              {checkOpen(idx + 1) && (
                <IconButton>
                  <AddIcon />
                </IconButton>
              )}
              <IconButton>
                {checkOpen(idx + 1) ? (
                  <ExpandLessIcon onClick={() => handleSelect(idx + 1)} />
                ) : (
                  <ExpandMoreIcon onClick={() => handleSelect(idx + 1)} />
                )}
              </IconButton>
            </Box>
          </Box>
          <List sx={{ width: "100%" }}>
            <Collapse in={checkOpen(idx + 1)} timeout="auto" unmountOnExit>
              <Milestone {...todo.milestone} />
              {todo.items.map((item, key) => (
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  key={key}
                >
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton>
                        {item.isDone ? (
                          <CheckCircleFilledIcon color="primary" />
                        ) : (
                          <CheckCircleEmptyIcon color="primary" />
                        )}
                      </IconButton>
                      <ListItemText
                        primary={item.title}
                        secondary={item?.deadline.toString()}
                      />
                      <Box mb={2.75} ml={2}>
                        {item.description}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton>
                      <EditIcon color="info" />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </Collapse>
          </List>
        </ListItem>
      ))}
    </List>
  );
};

export default ListView;
