// VERSION 2: Map with layers
//
// require([
//     "esri/config",
// /*    "esri/WebMap",*/
//     "esri/Map",
//     "esri/views/MapView",
//     // "esri/widgets/ScaleBar",
//     // "esri/widgets/Expand",
//     // "esri/views/SceneView",
//     // "esri/widgets/Search",
//     // "esri/Basemap",
//     "esri/layers/FeatureLayer",
//     "esri/smartMapping/renderers/relationship",
//
//     // "esri/layers/support/TileInfo",
//     // "esri/widgets/Legend"
//
// ], function(esriConfig, Map, MapView, FeatureLayer, relationshipRendererCreator) {
//
//     esriConfig.apiKey = "AAPKdfcc4a7dcc7e4176a137c38b87516e64P2haNjbiyKdPRWUk4feYG-Es6ebTY3T8bYJRXrSN-2gUKssSU5kF4T6brCoTDrEq";
//
//     var map = new Map({
//         basemap: "topo-vector"
//     });
//
//     const view = new MapView({
//         map: map,  // References a Map instance
//         container: "viewDiv",  // References the ID of a DOM element
//         center: [-71.50543,42.52700],
//         zoom: 9
//     });
//
//     var customLayer = new FeatureLayer({
//         url: "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/MA_13/FeatureServer"
//     });
//
//     map.add(customLayer);
//



// VERSION 1: BUBBLE MAP +

// const webmapids = [
//     "1a65f87408994046a27bd5a6b8bd3003",
//     "af7a507314074b9e857b2ca0bdc3e040"
//
// ];
//
// const webmaps = webmapids.map((webmapid) => {
//     return new WebMap({
//         portalItem: {
//             id: webmapid
//         }
//     });
// });
//
//
// const view = new MapView({
//     container: "viewDiv",
//     map: webmaps[0]
//
// });
//
// const scalebar = new ScaleBar({
//     view: view
// });
// view.ui.add(scalebar, "bottom-left");
//
// const legend = new Legend ({
//     view: view
// });
// view.ui.add(legend, "top-right");
//
//
// const searchWidget = new Search({
//      view: view
//  });
//  view.ui.add(searchWidget, {
//      position: "bottom-right",
//      index: 2
//  });
//
// document.querySelector("#nav-checkbox").addEventListener("click", (event) => {
//
//     var toggleButton = document.getElementById("nav-checkbox");
//
//     if (toggleButton.checked == true) {
//         const webmap = webmaps[1];
//         view.map = webmap;
//     } else {
//         const webmap = webmaps[0];
//         view.map = webmap;
//     }
// });



// });
