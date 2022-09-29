import React, { useCallback, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircleOutlineOutlined as CheckCircleEmptyIcon,
  CheckCircle as CheckCircleFilledIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Label as LabelIcon,
  Done as DoneIcon,
  Autorenew as ReactivateIcon,
  PlaylistAddCheck as ActiveIcon,
  PlaylistRemove as FinishedIcon,
  FilterList as FullListIcon,
} from "@mui/icons-material";
import CompLabel from "./components/Label";
import Milestone from "./components/Milestone";
import { TodoDataList, Todos, TodosList } from "../../redux/models/todos.model";
import AddItemDialog from "./components/AddItemDialog";
import { useAppDispatch } from "../../redux/hooks";
import {
  deleteTodoItemFromList,
  handleActiveTodoList,
  handleTodoItemActivity,
} from "../../redux/actions/todoList.actions";
import { TodoReducer } from "../../redux/models";
import AddLabelDialog from "./components/AddLabelDialog";
import { Label } from "../../redux/models/labels.model";

interface Props extends TodoDataList {
  updateData: (e: any, action: string) => void;
  labelOptions: Label[];
}

const ListView = ({ data, updateData, labelOptions }: Props) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodosList>();
  const [dialog, setDialog] = useState(false);
  const [labelsDialog, setLabelsDialog] = useState(false);

  const handleDialogItemOpen = useCallback((item: TodosList) => {
    setSelectedItem(item);
    setDialog(true);
  }, []);
  const handleDialogItemClose = useCallback(() => {
    setDialog(false);
  }, []);
  const handleLabelsDialogOpen = useCallback((item: TodosList) => {
    setSelectedItem(item);
    setLabelsDialog(true);
  }, []);
  const handleLabelsDialogClose = useCallback(() => {
    setLabelsDialog(false);
  }, []);

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

  const [isProcessing, setIsProcessing] = useState(false);

  async function handleDelete(
    id: string | number | undefined,
    list: TodosList
  ) {
    if (id) {
      setIsProcessing(true);
      await dispatch(deleteTodoItemFromList(id, list))
        .then((response) => updateData(response, "upd"))
        .catch((er) => console.log(er));
      setIsProcessing(false);
    }
  }
  async function handleCheck(item: Todos, list: TodosList) {
    setIsProcessing(true);
    await dispatch(handleTodoItemActivity(item, list))
      .then((response) => updateData(response, "upd"))
      .catch((er) => console.log(er));
    setIsProcessing(false);
  }
  async function handleListActivity(list: TodosList) {
    setIsProcessing(true);
    await dispatch(handleActiveTodoList(list))
      .then((response) => updateData(response, "upd"))
      .catch((er) => console.log(er));
    setIsProcessing(false);
  }
  const [filterList, setFilterList] = useState(0);

  function filterItems(list: Todos[]): Todos[] {
    if (filterList === 0) return list;
    if (filterList === 1) return list.filter((x) => !x.isDone);
    if (filterList === 2) return list.filter((x) => x.isDone);
    return list;
  }

  return (
    <List>
      <AddItemDialog
        handleClose={handleDialogItemClose}
        open={dialog}
        item={selectedItem}
        updateData={updateData}
      />
      <AddLabelDialog
        handleClose={handleLabelsDialogClose}
        open={labelsDialog}
        item={selectedItem}
        updateData={updateData}
        labels={labelOptions}
      />

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
                {todo?.labels?.map(({ name, color }, key) => (
                  <CompLabel name={name} color={color} key={key} />
                ))}
              </Box>
            </Box>
            <Box>
              {checkOpen(idx + 1) && (
                <>
                  {filterList === 1 ||
                    (filterList === 0 && (
                      <Tooltip title="Active items">
                        <IconButton onClick={() => setFilterList(1)}>
                          <FinishedIcon />
                        </IconButton>
                      </Tooltip>
                    ))}
                  {filterList === 2 ||
                    (filterList === 0 && (
                      <Tooltip title="Finished items">
                        <IconButton onClick={() => setFilterList(2)}>
                          <ActiveIcon />
                        </IconButton>
                      </Tooltip>
                    ))}
                  {filterList > 0 && (
                    <Tooltip title="Full list">
                      <IconButton onClick={() => setFilterList(0)}>
                        <FullListIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {todo.isActive ? (
                    <Tooltip title="Set finished">
                      <IconButton onClick={() => handleListActivity(todo)}>
                        <DoneIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Reactivate list">
                      <IconButton onClick={() => handleListActivity(todo)}>
                        <ReactivateIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Labels">
                    <IconButton onClick={() => handleLabelsDialogOpen(todo)}>
                      <LabelIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add item">
                    <IconButton onClick={() => handleDialogItemOpen(todo)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </>
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
              {todo?.milestone && <Milestone {...todo.milestone} />}
              {todo?.items &&
                filterItems(todo.items).map((item, key) => (
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      bottomBorder: "1px solid",
                    }}
                    key={key}
                  >
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => handleCheck(item, todo)}>
                          {!isProcessing && (
                            <>
                              {item.isDone ? (
                                <CheckCircleFilledIcon color="primary" />
                              ) : (
                                <CheckCircleEmptyIcon color="primary" />
                              )}
                            </>
                          )}
                        </IconButton>
                        <ListItemText
                          primary={item.title}
                          secondary={item?.deadline}
                        />
                        <Box mb={2.75} ml={2}>
                          {item.description}
                        </Box>
                      </Box>
                    </Box>
                    {item.id && !isProcessing && (
                      <>
                        <Box>
                          <IconButton
                            onClick={() => handleDelete(item.id, todo)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Box>
                      </>
                    )}
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
