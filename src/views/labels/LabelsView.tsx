import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { CirclePicker } from "react-color";
import ListView from "./ListView";
import TitleHeader from "../../components/shared/TitleHeader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addLabel, fetchLabels } from "../../redux/actions/label.action";
import { LabelReducer } from "../../redux/models";
import Loader from "../../components/shared/Loader";

const Labels = () => {
  const labelsSelector = useAppSelector((state) => state.label);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<LabelReducer>(labelsSelector);
  const [filter, setFilter] = useState("");
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    color: "",
  });

  const handleDialogOpen = useCallback(() => {
    setDialog(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialog(false);
  }, []);

  const handleFilterChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setFilter(e.target.value);
    },
    []
  );

  function filteredData() {
    if (filter === "") return data.data;
    return data.data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  useEffect(() => {
    if (data.isLoading) {
      dispatch(fetchLabels());
      setData(labelsSelector);
    }
  }, [labelsSelector.data]);

  function load(id: string | undefined | number) {
    setData((prev) => ({
      ...prev,
      data: prev.data.filter((x) => x.id !== id),
    }));
  }
  function handleChange(color: { hex: any }, event: any) {
    setForm({ ...form, color: color.hex });
  }
  function handleCancel() {
    setForm({ name: "", color: "" });
    setDialog(false);
  }
  async function handleAdd() {
    await dispatch(addLabel(form));
    setForm({ name: "", color: "" });
    setDialog(false);
  }

  return (
    <Grid container spacing={2}>
      <Dialog onClose={handleDialogClose} open={dialog}>
        <DialogTitle>Add label</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={form.name}
            label="Label name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <CirclePicker onChangeComplete={(e, c) => handleChange(e, c)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!form.name.length || !form.color.length}
            onClick={() => handleAdd()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <TitleHeader
        search
        title="Labels management"
        handleSearch={handleFilterChange}
        searchText="Filter labels"
        buttonText="Add label"
        buttonEvent={handleDialogOpen}
      />
      <Grid item xs={12}>
        {data.isLoading ? (
          <Loader />
        ) : (
          <ListView load={load} data={filteredData()} />
        )}
      </Grid>
    </Grid>
  );
};

export default Labels;
