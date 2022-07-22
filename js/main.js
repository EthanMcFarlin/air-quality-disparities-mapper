require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"

], function(esriConfig, Map, SceneView, FeatureLayer, Legend) {

    esriConfig.apiKey = "AAPKdfcc4a7dcc7e4176a137c38b87516e64P2haNjbiyKdPRWUk4feYG-Es6ebTY3T8bYJRXrSN-2gUKssSU5kF4T6brCoTDrEq";

    const renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude"
                }
            ]
        },
        visualVariables: [
            {
                type: "size",
                field: "predicted",
                legendOptions: {
                    title: "predicted element carbon measure"
                },
                stops: [
                    {
                        value: 0.39,
                        size: 10000,
                        label: "<0.39 (𝜇)"
                    },
                    {
                        value: 0.91,
                        size: 500000,
                        label: ">0.91 (𝜇 + 3.5𝜎)"
                    }
                ]
            },
            {
                type: "color",
                field: "pct_black",
                legendOptions: {
                    title: "% population who identifies as black"
                },
                stops: [
                    {
                        value: 0.0,
                        color: "#d1e1ff",
                        label: "0%"
                    },
                    {
                        value: 1.0,
                        color: "#144db8",
                        label: "100%"
                    }
                ]
            }
        ]
    };

    const customLayer = new FeatureLayer({
        url:
            // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/MA_16/FeatureServer",
            // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/us_counties_4/FeatureServer",
            // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/test33/FeatureServer",
            // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/test38/FeatureServer",
            "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/us_counties_19/FeatureServer",
        renderer: renderer,
        title: "Air pollution exposure by demographics",
        outFields: ["*"],
        popupTemplate: {
            title: "{NAMELSAD10}",
            content: "{pct_black} represents the percentage of people identifying as African American in 2010 as a decimal" +
                "<br><br>{predicted} is the predicted measure of element carbon, also in 2010.",
            fieldInfos: [
                {
                    fieldName: "predicted",
                    format: {
                        digitSeparator: false,
                        places: 3
                    }
                },
                {
                    fieldName: "pct_black",
                    format: {
                        digitSeparator: false,
                        places: 3
                    }
                }
            ]


        },
    });

    const map = new Map({
        basemap: "gray-vector",
        layers: [customLayer]
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                latitude: 20.8282,
                longitude: -98.5795,
                z: 5000101
            },
            tilt: 20,
            heading: 10
        }
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "bottom-right");

});