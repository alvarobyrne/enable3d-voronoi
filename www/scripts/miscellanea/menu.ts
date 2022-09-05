import * as dat from "dat.gui";
import clickable from "../utils/clickable";
const gui = new dat.GUI();
const addItem = (url: string, name: string) => {
  gui
    .add(
      {
        f: () => clickable(url),
      },
      "f"
    )
    .name(name);
};
export default function () {
  addItem("https://github.com/enable3d", "enable3d at github");
  addItem("https://math.lbl.gov/voro++/", "voro++ homepage");
  addItem("https://github.com/chr1shr/voro", "voro++ at github");
  addItem(
    "https://math.lbl.gov/voro++/doc/custom.html",
    "Voro++ customized output reference"
  );
  addItem(
    "https://github.com/alvarobyrne/enable3d-voronoi",
    "this demo's repo at github"
  );
}
