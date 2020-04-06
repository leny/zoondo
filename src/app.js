/* leny/zoondo
 *
 * /src/app.js - Client main entry point
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import ReactDOM from "react-dom";

import "@pwops/mixins";

import RootContainer from "containers/root";

ReactDOM.render(<RootContainer />, document.querySelector("#app"));
