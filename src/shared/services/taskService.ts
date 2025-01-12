import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/task/taskSlice.ts";
import { setFilter } from "../../features/filter/filterSlice.ts";
import { setSortBy } from "../../features/sortBy/sortBySlice.ts";

export const useTaskService = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters);
  const sortBy = useSelector((state: RootState) => state.sortBy);

  const handleFilterChange = (name: string, value: string) => {
    dispatch(setFilter({ name, value }));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const handleCreateTask = (taskData: any) => {
    dispatch(addTask(taskData));
  };

  return {
    filters,
    sortBy,
    handleFilterChange,
    handleSortChange,
    handleCreateTask,
  };
};
