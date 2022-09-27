export const drawerWidth = 240;

export const routes: { [name: string]: { name: string; path: string } } = {
  dashboard: { path: "/", name: "Dashboard" },
  todo: { path: "/todo", name: "ToDo" },
  labels: { path: "/labels", name: "Labels" },
  milestones: { path: "/milestones", name: "Milestones" },
  settings: { path: "/settings", name: "Settings" },
  error: { path: "*", name: "Error" },
};

export function pickTextColorBasedOnBgColorSimple(bgColor: string) {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#272D2D" : "#EDF5FC";
}

export const url = "https://63326157a54a0e83d24fef0b.mockapi.io";
export const api = {
  labels: url + "/labels",
  milestones: url + "/milestones",
  todoItem: url + "/todoItem",
  todoList: url + "/todoList",
};
export function getDateTimeString(date: Date): string {
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getTime()}`;
}
export const dateTimeRegex =
  /^([1-9]|([012][0-9])|(3[01]))\-([0]{0,1}[1-9]|1[012])\-\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/;
