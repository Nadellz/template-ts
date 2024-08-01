import "./index.css"
/*import TimeController from "./controller/TimeController"
import TimeModel from "./model/TimeModel"
import TimeView from "./view/TimeView"*/

import TimeListController from "./controller/TimeListController"
import TimeListModel from "./model/TimeListModel"
import TimeListView from "./view/TimeListView"


document.addEventListener("DOMContentLoaded", () =>{
  /*const model = new TimeModel(new Date(),"none","Europe/Paris","24H");
  const view = new TimeView();
  new TimeController(model, view)*/

  const model = new TimeListModel();
  const view = new TimeListView();
  new TimeListController(model, view)
})