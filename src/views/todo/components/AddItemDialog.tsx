import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Loader from "../../../components/shared/Loader";
import { addTodoItemToList } from "../../../redux/actions/todoList.actions";
import { useAppDispatch } from "../../../redux/hooks";
import { Todos, TodosList } from "../../../redux/models/todos.model";
import { dateTimeRegex } from "../../../utils/appUtils";

type Props = {
  handleClose: () => void;
  open: boolean;
  item?: TodosList;
  updateData: (e: any, action: string) => void;
};
const AddItemDialog = ({ handleClose, open, item, updateData }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<Todos>({
    isDone: false,
    title: "",
    description: "",
    deadline: "",
  });

  // ADD TODO ITEM INTO LIST
  async function handleAdd() {
    setIsProcessing(true);
    if (item) {
      await dispatch(addTodoItemToList(form, item))
        .then((response) => updateData(response, "upd"))
        .catch((er) => console.log(er));
    }
    setForm({
      isDone: false,
      title: "",
      description: "",
      deadline: "",
    });
    handleClose();
    setIsProcessing(false);
  }
  function handleTitle(e: { target: { value: any } }) {
    setForm({ ...form, title: e.target.value });
  }
  function handleDescription(e: { target: { value: any } }) {
    setForm({ ...form, description: e.target.value });
  }
  function handleDeadline(e: { target: { value: any } }) {
    setForm({ ...form, deadline: e.target.value });
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add ToDo item to {item?.title}</DialogTitle>
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
              value={form.title}
              label="Title"
              onChange={(e) => handleTitle(e)}
            />
            <TextField
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              value={form.description}
              label="Description"
              onChange={(e) => handleDescription(e)}
            />
            <TextField
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              value={form.deadline}
              error={!dateTimeRegex.test(form.deadline)}
              placeholder="DD-MM-YYYY HH:MM"
              label="Deadline"
              onChange={(e) => handleDeadline(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => handleAdd()}
              disabled={
                !dateTimeRegex.test(form.deadline) ||
                form.description.length === 0 ||
                form.title.length === 0
              }
            >
              Create
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AddItemDialog;
