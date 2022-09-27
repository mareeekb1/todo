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
import { todos } from "../../utils/dummy";
// import { TodosList } from "../../redux/models/todos.model";

const Todo = () => {
  const todoSelector = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(todos);
  // const [data, setData] = useState<TodoReducer>(todoSelector);
  const [view, setView] = useState(0);
  const [search, setSearch] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({
    title: "",
    items: [],
    isActive: true,
    labels: [],
    milestone: null,
  });

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
  function filterData() {
    // let result = data.data;
    let result = data;
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
        let array = item.labels.map((m) => m.name.toLowerCase());
        return array.includes(label.toLowerCase());
      });
    }
    return result;
  }

  // useEffect(() => {
  //   if (data.isLoading) {
  //     dispatch(fetchTodoLists());
  //     setData(todoSelector);
  //   }
  // }, [todoSelector]);

  function handleCancel() {
    setForm({
      title: "",
      items: [],
      isActive: true,
      labels: [],
      milestone: null,
    });
    setDialog(false);
  }
  async function handleAdd() {
    // await dispatch(addTodoList(form));
    // setForm({
    //   title: "",
    //   items: [],
    //   isActive: true,
    //   labels: [],
    //   milestone: null,
    // });
    // setDialog(false);
    console.log("add");
  }
  // function load(id: string | undefined | number) {
  //   setData((prev) => ({
  //     ...prev,
  //     data: prev.data.filter((x) => x.id !== id),
  //   }));
  // }

  return (
    <Grid container spacing={2}>
      <Dialog onClose={handleDialogClose} open={dialog}>
        <DialogTitle>Add milestone</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={form.title}
            label="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!form.title.length}
            onClick={() => handleAdd()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <TitleHeader
        title="ToDos"
        buttonText="Add ToDo"
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
        {view === 0 && <ListView data={filterData()} />}
        {view === 1 && <BoardView data={filterData()} />}
      </Grid>
    </Grid>
  );
};

export default Todo;
