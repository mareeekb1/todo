import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../components/shared/Loader";
import TitleHeader from "../../components/shared/TitleHeader";
import { fetchTodoLists } from "../../redux/actions/todoList.actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TodoReducer } from "../../redux/models";

const Dashboard = () => {
  const todoSelector = useAppSelector<TodoReducer>((state) => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoSelector.isLoading) {
      dispatch(fetchTodoLists());
    }
  }, [todoSelector]);

  function convertDataToChart() {
    return todoSelector.data.map((item) => ({
      name: item.title,
      finished: item?.items ? item.items.filter((x) => x.isDone).length : 0,
      active: item?.items ? item.items.filter((x) => !x.isDone).length : 0,
    }));
  }

  return (
    <Grid container>
      <TitleHeader title="Dashboard" />
      {todoSelector.isLoading ? (
        <Loader />
      ) : (
        <Grid item xs={12}>
          <ResponsiveContainer width={"95%"} height={300}>
            <BarChart width={500} height={300} data={convertDataToChart()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" stackId="a" fill="#8884d8" />
              <Bar dataKey="finished" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
