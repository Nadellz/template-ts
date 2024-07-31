import "./index.css"
import TimeController from "./controller/TimeController"
import TimeModel from "./model/TimeModel"
import TimeView from "./view/TimeView"


document.addEventListener("DOMContentLoaded", () =>{
  const model = new TimeModel(new Date(),"none","Europe/Paris","24H");
  const view = new TimeView();
  new TimeController(model, view)
})