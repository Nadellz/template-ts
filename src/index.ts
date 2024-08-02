import ClockListController from "./controller/ClockListController";
import "./index.css"

import TimeListModel from "./model/ClockListModel"
import ClockListView from "./view/ClockListView"


document.addEventListener("DOMContentLoaded", () =>{

  const model = new TimeListModel();
  const view = new ClockListView();
  new ClockListController(model, view)
})