import React, { useState, useRef, useEffect } from "react";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Crop54Icon from "@material-ui/icons/Crop54";
import "./controls.css";

export default function Controls() {
  return (
    <div>
      <div className="controlBar">
        <IconButton>
          <CreateIcon />
        </IconButton>
        <IconButton>
          <Crop54Icon />
        </IconButton>
        <IconButton>
          <LayersClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
