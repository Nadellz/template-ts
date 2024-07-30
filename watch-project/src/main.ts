import "./style.css"
import TimeController from "./controller/TimeController"
import TimeModel from "./model/TimeModel"
import TimeView from "./view/TimeView"


document.addEventListener("DOMContentLoaded", () =>{
  const model = new TimeModel();
  const view = new TimeView();
  new TimeController(model, view)
})