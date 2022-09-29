import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Loader from "../../../components/shared/Loader";
import { handleLabelsInTodoList } from "../../../redux/actions/todoList.actions";
import { useAppDispatch } from "../../../redux/hooks";
import { Label } from "../../../redux/models/labels.model";
import { TodosList } from "../../../redux/models/todos.model";

type Props = {
  handleClose: () => void;
  open: boolean;
  item?: TodosList;
  updateData: (e: any, action: string) => void;
  labels?: Label[];
};
const AddLabelDialog = ({
  handleClose,
  open,
  item,
  updateData,
  labels,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [labelSelected, setLabelSelected] = useState<Label[]>([]);

  function handleSelect(x: Label) {
    if (labelSelected.includes(x)) {
      return setLabelSelected(labelSelected.filter((f) => f.id !== x.id));
    }
    return setLabelSelected(labelSelected.concat(x));
  }

  // ADD label INTO LIST
  async function handleAdd(labs: Label[]) {
    setIsProcessing(true);
    if (item) {
      await dispatch(handleLabelsInTodoList(item, labs))
        .then((response) => updateData(response, "upd"))
        .catch((er) => console.log(er));
    }
    handleClose();
    setIsProcessing(false);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Manage lables</DialogTitle>
      {isProcessing ? (
        <DialogContent>
          <Loader />
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            {labels?.map((x) => (
              <Chip
                onClick={() => handleSelect(x)}
                sx={{ color: x.color }}
                label={x.name}
                variant={labelSelected.includes(x) ? "filled" : "outlined"}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => handleAdd(labelSelected)}
            >
              Add
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AddLabelDialog;
