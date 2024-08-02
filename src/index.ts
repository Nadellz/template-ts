import ClockListController from "./controller/ClockListController";
import "./index.css"

import TimeListModel from "./model/ClockListModel"
import ClockListView from "./view/ClockListView"


document.addEventListener("DOMContentLoaded", () =>{
  const model = new TimeListModel(); //1. create watch list's model
  const view = new ClockListView(); //2. create watch list's view
  new ClockListController(model, view) //3. create watch list's controller
})