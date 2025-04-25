import { Module } from "asab_webui_components";

import { TableScreen } from "./Table/TableScreen.jsx";
import { Detail } from "./Detail/Detail.jsx";

export default class TableApplicationModule extends Module {
  constructor(app, name) {
    super(app, "TableApplicationModule");

    app.Router.addRoute({
      path: "/",
      end: false,
      name: "Table",
      component: TableScreen,
    });

    app.Router.addRoute({
      path: "/detail/:id",
      end: false,
      name: "Detail",
      component: Detail,
    });

    app.Navigation.addItem({
      name: "Table",
      icon: "bi bi-table",
      url: "/",
    });
  }
}
