import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import TitleHeader from "../../components/shared/TitleHeader";
import BoardView from "./BoardView";
import ListView from "./ListView";
import { ViewModule, ListAlt } from "@mui/icons-material";
import Filters from "./components/Filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TodoReducer } from "../../redux/models";
import {
  addTodoList,
  fetchTodoLists,
} from "../../redux/actions/todoList.actions";
import Loader from "../../components/shared/Loader";
import { TodosList } from "../../redux/models/todos.model";
import { fetchLabels } from "../../redux/actions/label.action";

const Todo = () => {
  const todoSelector = useAppSelector((state) => state.todo);
  const labelOptions = useAppSelector((state) => state.label);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<TodoReducer>(todoSelector);
  const [view, setView] = useState(0);
  const [search, setSearch] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [dialog, setDialog] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState("");

  const handleDialogOpen = useCallback(() => {
    setDialog(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialog(false);
  }, []);

  const handleView = useCallback((e: any) => {
    setView(+e.target.value);
  }, []);
  const handleTabChange = useCallback((e: any) => {
    setTab(+e.target.value);
  }, []);
  const handleFilterChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSearch(e.target.value);
    },
    []
  );
  const handleLabel = (event: SelectChangeEvent<typeof labels>) => {
    const {
      target: { value },
    } = event;
    setLabels(typeof value === "string" ? value.split(",") : value);
  };
  const handleTitle = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setTitle(e.target.value);
    },
    []
  );
  function filterData() {
    let result = data.data;
    if (tab !== 2)
      result = result.filter((item) => {
        return (item.isActive && tab === 0) || (!item.isActive && tab === 1);
      });
    if (search !== "")
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    for (const label of labels) {
      result = result.filter((item) => {
        let array = item?.labels?.map((m) => m.name.toLowerCase());
        return array?.includes(label.toLowerCase());
      });
    }
    return result;
  }

  useEffect(() => {
    if (data.isLoading) {
      dispatch(fetchTodoLists());
      dispatch(fetchLabels());
      setData(todoSelector);
    }
  }, [todoSelector]);

  function handleCancel() {
    setTitle("");
    setDialog(false);
  }
  //ADD NEW TODO LIST
  async function handleAdd() {
    setIsProcessing(true);
    await dispatch(addTodoList(title))
      .then((response) => updateData(response, "add"))
      .catch((er) => console.log(er));
    setIsProcessing(false);
    setTitle("");
    setDialog(false);
  }

  function updateData(todo: TodosList, action: string) {
    switch (action) {
      case "add":
        return setData({
          ...data,
          data: data.data.concat(todo) as TodosList[],
        });
      case "del":
        return setData({
          ...data,
          data: data.data.filter((x) => x.id === todo.id) as TodosList[],
        });
      case "upd":
        let array = data.data.map((x) => {
          if (x.id === todo.id) x = todo;
          return x;
        });
        setData({
          ...data,
          data: array as TodosList[],
        });
      default:
        console.log(todo);
    }
  }

  return (
    <Grid container spacing={2}>
      <Dialog onClose={handleDialogClose} open={dialog}>
        <DialogTitle>Add ToDo list</DialogTitle>
        {isProcessing ? (
          <DialogContent>
            <Loader />
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <TextField
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                value={title}
                label="Title"
                onChange={handleTitle}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCancel()}>Cancel</Button>
              <Button
                variant="contained"
                disabled={!title.length}
                onClick={() => handleAdd()}
              >
                Create
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <TitleHeader
        title="ToDos"
        buttonText="Add ToDo list"
        search
        searchText="Filter"
        handleSearch={handleFilterChange}
        buttonEvent={handleDialogOpen}
      />
      <Grid item xs={12}>
        <Filters
          onTabChange={handleTabChange}
          onLabelChange={handleLabel}
          tab={tab}
          labels={labels}
          labelOptions={labelOptions.data}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup onClick={handleView}>
          <Button
            value={0}
            startIcon={<ListAlt />}
            variant={view === 0 ? "contained" : "outlined"}
          >
            List view
          </Button>
          <Button
            value={1}
            startIcon={<ViewModule />}
            variant={view === 1 ? "contained" : "outlined"}
          >
            Board view
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
        {data.isLoading ? (
          <Loader />
        ) : (
          <>
            {view === 0 && (
              <ListView
                data={filterData()}
                updateData={updateData}
                labelOptions={labelOptions.data}
              />
            )}
            {view === 1 && (
              <BoardView
                data={filterData()}
                updateData={updateData}
                labelOptions={labelOptions.data}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Todo;
