import { Vector3 } from "three";

export default class VoronoiLoader {
  constructor(parameters) {}
  static async loadVoronoiData() {
    /*
        // return
        const response = await fetch('random_points_p.gnu')
        const dataPoints = await response.text()
        const points = this.#parsePoints(dataPoints).filter(x => x.length > 0);
        this.#drawPoints(points, 0.05)
        const edgesVerticesResponse = await fetch('random_points_v.gnu')
        const edgesVertices = await edgesVerticesResponse.text();
        const lines = this.#parseEdgesVertices(edgesVertices).filter(x => x.length > 0)
        // this.#drawLines(lines, 'red');
        */

    const responseVerticesCells = await fetch("data/vertices.txt");
    const verticesCellsRaw = await responseVerticesCells.text();
    const verticesCells = VoronoiLoader.numberParser(verticesCellsRaw);
    const vectors = verticesCells.map((face) =>
      face.map((vertex) => new Vector3(...vertex))
    );

    const responseIndicesCells = await fetch("data/indices.txt");
    const indicesCellsRaw = await responseIndicesCells.text();
    const indicesCells = VoronoiLoader.numberParser(
      indicesCellsRaw,
      "parseInt"
    );
    console.log("indicesCells: ", indicesCells);
    /*

    const trianglesIndicesFromPolygonsIndices = (poyhedronFaces) => {
      const triangles = [];
      for (let i = 0; i < poyhedronFaces.length; i++) {
        const face = poyhedronFaces[i];
        const faceLength = face.length;
        for (let j = 0; j < faceLength - 2; j++) {
          const triangle = [face[0], face[j + 1], face[j + 2]];
          triangles.push(triangle);
        }
      }
      return triangles;
    };
    */
    const trianglesIndices = indicesCells.map(
      VoronoiLoader.trianglesIndicesFromPolygonsIndices
    );

    // const cells3d = this.#drawCellPolyhedra(verticesCells, trianglesIndices)

    const responseCentroids = await fetch("data/centroids.txt");
    const centroidsRaw = await responseCentroids.text();
    const centroids = VoronoiLoader.numberParserColumn(centroidsRaw);
    console.log("centroids: ", centroids);
    return { vertex: vectors, index: trianglesIndices, centroids };
    /*
    this.#drawPoints(centroids, 0.03, "red");

    this.#voronoiModel = this.#makePolyhedronModel({
      indices: trianglesIndices,
      vertices: verticesCells,
      centroids,
    });

    const scaleAmount = 0.1;

    this.#scaleAroundCentroid(this.#voronoiModel, scaleAmount);
    const verticesCellsScaled = this.#scaleAroundCentroids(
      verticesCells,
      centroids,
      scaleAmount
    );

    // const cellsScaled3d = this.#drawCellPolyhedra(verticesCellsScaled, trianglesIndices);

    this.#drawLinesPerFace(indicesCells, verticesCellsScaled);

    this.#drawVoronoiConvexGeometry(this.#voronoiModel);
    */
  }
  static numberParser(rawData, parser = "parseFloat") {
    const perLine = rawData.split("\n");
    return perLine
      .map((x) => {
        const y = x.split(" ").map((stringPoint) =>
          stringPoint
            .slice(1, -1)
            .split(",")
            .map((stringNumber) => window[parser](stringNumber))
        );
        return y;
      })
      .filter((list) => list.length > 3);
  }
  static trianglesIndicesFromPolygonsIndices(poyhedronFacesIndices) {
    const triangles = [];
    for (let i = 0; i < poyhedronFacesIndices.length; i++) {
      const faceIndices = poyhedronFacesIndices[i].reverse();
      // console.log("face: ", faceIndices);
      const faceLength = faceIndices.length;
      for (let j = 0; j < faceLength - 2; j++) {
        const triangle = [
          faceIndices[0],
          faceIndices[j + 1],
          faceIndices[j + 2],
        ];
        //@ts-ignore
        triangles.push(triangle);
      }
    }
    return triangles;
  }
  static numberParserColumn(rawData, parser = "parseFloat") {
    const perLine = rawData.split("\n").filter((list) => list.length > 3);
    return perLine.map((x) => {
      const y = x
        .split(" ")
        .map((stringNumber) => window[parser](stringNumber));
      return y;
    });
  }
}
