import React, { useCallback, useState } from "react";
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
  Paper,
  Tooltip,
} from "@mui/material";
import CompLabel from "./components/Label";
import {
  CheckCircleOutlineOutlined as CheckCircleEmptyIcon,
  CheckCircle as CheckCircleFilledIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Label as LabelIcon,
  Done as DoneIcon,
  Autorenew as ReactivateIcon,
  PlaylistAddCheck as ActiveIcon,
  PlaylistRemove as FinishedIcon,
  FilterList as FullListIcon,
} from "@mui/icons-material";
import Milestone from "./components/Milestone";
import { TodoDataList, Todos, TodosList } from "../../redux/models/todos.model";
import AddItemDialog from "./components/AddItemDialog";
import {
  deleteTodoItemFromList,
  handleActiveTodoList,
  handleTodoItemActivity,
} from "../../redux/actions/todoList.actions";
import { useAppDispatch } from "../../redux/hooks";
import { Label } from "../../redux/models/labels.model";
import AddLabelDialog from "./components/AddLabelDialog";

interface Props extends TodoDataList {
  updateData: (e: any, action: string) => void;
  labelOptions: Label[];
}

const BoardView = ({ data, updateData, labelOptions }: Props) => {
  const [selected, setSelected] = useState<TodosList>();
  const [dialog, setDialog] = useState(false);
  const [filterList, setFilterList] = useState(0);

  const handleDialogItemOpen = useCallback((item: TodosList) => {
    setSelected(item);
    setDialog(true);
  }, []);

  const handleDialogItemClose = useCallback(() => {
    setDialog(false);
  }, []);

  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TodosList>();
  const [labelsDialog, setLabelsDialog] = useState(false);

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
  const handleLabelsDialogOpen = useCallback((item: TodosList) => {
    setSelectedItem(item);
    setLabelsDialog(true);
  }, []);
  const handleLabelsDialogClose = useCallback(() => {
    setLabelsDialog(false);
  }, []);
  async function handleListActivity(list: TodosList) {
    setIsProcessing(true);
    await dispatch(handleActiveTodoList(list))
      .then((response) => updateData(response, "upd"))
      .catch((er) => console.log(er));
    setIsProcessing(false);
  }

  function filterItems(list: Todos[]): Todos[] {
    if (filterList === 0) return list;
    if (filterList === 1) return list.filter((x) => !x.isDone);
    if (filterList === 2) return list.filter((x) => x.isDone);
    return list;
  }

  return (
    <Container disableGutters sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", overflowX: "auto" }}>
        <AddItemDialog
          handleClose={handleDialogItemClose}
          open={dialog}
          item={selected}
          updateData={updateData}
        />
        <AddLabelDialog
          handleClose={handleLabelsDialogClose}
          open={labelsDialog}
          item={selectedItem}
          updateData={updateData}
          labels={labelOptions}
        />
        {data.map((todo, key) => (
          <Box sx={{ minWidth: "25%", mr: 2 }} key={key}>
            <Card sx={{ background: todo.isActive ? "#ACECC7" : "#EDF5FC" }}>
              <CardHeader
                title={todo.title}
                subheader={todo?.labels?.map((label, idx) => (
                  <CompLabel {...label} key={idx} />
                ))}
                action={
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
                            <FinishedIcon />
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
                }
              />
              <CardContent>
                {todo?.items &&
                  filterItems(todo.items).map((x, idx) => (
                    <Paper
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                      key={idx}
                    >
                      <Box sx={{ display: "flex" }}>
                        <IconButton onClick={() => handleCheck(x, todo)}>
                          {!isProcessing && (
                            <>
                              {x.isDone ? (
                                <CheckCircleFilledIcon color="primary" />
                              ) : (
                                <CheckCircleEmptyIcon color="primary" />
                              )}
                            </>
                          )}
                        </IconButton>
                        <Box>
                          <ListItemText
                            secondary={x.deadline}
                            primary={x.title}
                          />
                          <Box>{x.description}</Box>
                        </Box>
                      </Box>
                      <IconButton onClick={() => handleDelete(x.id, todo)}>
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
              </CardContent>
              {todo.milestone && (
                <CardMedia>
                  <Milestone {...todo.milestone} />
                </CardMedia>
              )}
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BoardView;
