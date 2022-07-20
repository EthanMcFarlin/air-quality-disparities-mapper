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
                field: "ec_predict",
                legendOptions: {
                    title: "elemental carbon prediction"
                },
                stops: [
                    {
                        value: 0.24,
                        size: 10,
                        label: "<0.24 (𝜇 - 2𝜎)"
                    },
                    {
                        value: 0.87,
                        size: 25000,
                        label: ">0.87 (𝜇 + 3𝜎)"
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
            "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/MA_16/FeatureServer",
        renderer: renderer,
        title: "Air pollution exposure by demographics",
        popupTemplate: {
            title: "GEOID: {GEOID10}",
            content: "{pct_black} represents the percentage of people identifying as African American in 2010 as a decimal.<br><br> " +
                "{ec_predict} is the elemental carbon prediction, also for the year 2010.",
            fieldInfos: [
                {
                    fieldName: "ec_predict",
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


        }
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
                latitude: 41.3601,
                longitude: -71.389,
                z: 25560
            },
            tilt: 80,
            heading: 10
        }
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "bottom-right");

});