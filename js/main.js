require([
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "esri/widgets/Legend"

], function(esriConfig, WebMap, MapView, Expand, ScaleBar, Search, Legend) {

    esriConfig.apiKey = "AAPKdfcc4a7dcc7e4176a137c38b87516e64P2haNjbiyKdPRWUk4feYG-Es6ebTY3T8bYJRXrSN-2gUKssSU5kF4T6brCoTDrEq";

    const webmap = new WebMap({
        portalItem: {
            // id: "7c4d00681b274b229916b8577d90910c"
            // Option 1 — Choropleth

            id: "af7a507314074b9e857b2ca0bdc3e040"
            // Option 2 — Size and Color

            // id: "3c232db9e4e84414a51149aecc49317e"
            // Option 3 — Color Ramp

        }
    });

    const view = new MapView({
        container: "viewDiv",
        map: webmap

    });

    const scalebar = new ScaleBar({
        view: view
    });
    view.ui.add(scalebar, "bottom-left");

    const legend = new Legend ({
        view: view
    });
    view.ui.add(legend, "top-right");


    const searchWidget = new Search({
         view: view
     });
     view.ui.add(searchWidget, {
         position: "bottom-right",
         index: 2
     });

    // view.ui.add(
    //     new Expand([{
    //         view: view,
    //         content: new Search({ view: view }),
    //         group: "top-left",
    //         expanded: true,
    //         expandIconClass: "esri-icon-layer-list"
    //     }]), "top-left");

    // const searchWidget = new Search({
    //     view: view
    // });
    //
    // let expand = new Expand({
    //     view: view,
    //     content: searchWidget,
    //     group: "top-right",
    //     expanded: true,
    //     closeOnEsc: false
    // });
    // view.ui.add(expand);


});