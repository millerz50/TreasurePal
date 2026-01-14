// types/leaflet.d.ts
declare module "leaflet" {
  import * as Leaflet from "leaflet";
  const L: typeof Leaflet;
  export = Leaflet;
  export default L;
}
declare module "leaflet/dist/leaflet.css";
