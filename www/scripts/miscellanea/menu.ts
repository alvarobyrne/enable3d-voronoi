import * as dat from "dat.gui";
import clickable from "../utils/clickable";
const gui = new dat.GUI();
const menu = gui.addFolder("menu");
menu.open();
const folder = gui.addFolder("External links");
const addItem = (url: string, name: string, gui = folder) => {
  gui
    .add(
      {
        f: () => clickable(url),
      },
      "f"
    )
    .name(name);
};
export default { gui };
(function () {
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
  const host = location.host;
  if (host.includes("127"))
    addItem(
      "https://alvarobyrne.github.io/enable3d-voronoi/",
      "this demo hosted at github"
    );
})();
export { menu };
