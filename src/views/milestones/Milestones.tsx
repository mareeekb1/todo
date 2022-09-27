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
import ListMilestones from "./ListMilestones";
import TitleHeader from "../../components/shared/TitleHeader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MilestoneReducer } from "../../redux/models";
import {
  addMilestone,
  fetchMilestones,
} from "../../redux/actions/milestones.action";
import { Milestone } from "../../redux/models/milestones.model";
import { dateTimeRegex } from "../../utils/appUtils";

const Milestones = () => {
  const milestoneSelector = useAppSelector((state) => state.milestone);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<MilestoneReducer>(milestoneSelector);
  const [filter, setFilter] = useState("");
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<Milestone>({
    title: "",
    description: "",
    from: "",
    to: "",
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
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }
  useEffect(() => {
    if (data.isLoading) {
      dispatch(fetchMilestones());
      setData(milestoneSelector);
    }
  }, [milestoneSelector]);

  function handleCancel() {
    setForm({ title: "", description: "", from: "", to: "" });
    setDialog(false);
  }
  async function handleAdd() {
    await dispatch(addMilestone(form));
    setForm({ title: "", description: "", from: "", to: "" });
    setDialog(false);
  }
  function load(id: string | undefined | number) {
    setData((prev) => ({
      ...prev,
      data: prev.data.filter((x) => x.id !== id),
    }));
  }

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
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={form.description}
            label="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={form.from}
            error={!dateTimeRegex.test(form.from)}
            placeholder="DD-MM-YYYY hh:mm"
            label="From"
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={form.to}
            label="To"
            error={!dateTimeRegex.test(form.to)}
            placeholder="DD-MM-YYYY hh:mm"
            onChange={(e) => setForm({ ...form, to: e.target.value })}
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
        search
        title="Milestones management"
        handleSearch={handleFilterChange}
        searchText="Filter milestones by title"
        buttonText="Add milestone"
        buttonEvent={handleDialogOpen}
      />
      <Grid item xs={12}>
        <ListMilestones data={filteredData()} load={load} />
      </Grid>
    </Grid>
  );
};

export default Milestones;
