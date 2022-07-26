let defaultColorField = "pct_black";
let defaultLegend = "% population identifying as black (color) ";
let defaultLowerStop = 0.0;
let defaultUpperStop = 1.0;
let defaultLowerLabel = "0%";
let defaultUpperLabel = "100%";

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/smartMapping/symbology/relationship",
    "esri/smartMapping/renderers/relationship",
], function(esriConfig, Map, MapView, FeatureLayer, Legend, Expand, relationshipSchemes, relationshipRendererCreator) {

    esriConfig.apiKey = "AAPKdfcc4a7dcc7e4176a137c38b87516e64P2haNjbiyKdPRWUk4feYG-Es6ebTY3T8bYJRXrSN-2gUKssSU5kF4T6brCoTDrEq";

    const customLayer = new FeatureLayer({
        url:
        // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/MA_16/FeatureServer",
        // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/us_counties_4/FeatureServer",
        // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/test33/FeatureServer",
        // "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/test38/FeatureServer",
            "https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/us_counties_19/FeatureServer",
        title: "Air pollution exposure by demographics (2010)",
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

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.1, 40.4],
        zoom: 3
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "bottom-right");

    customLayer.when()
        .then(buildRelationship)
        .then(executeRender);

    function buildRelationship() {
        const schemes = relationshipSchemes.getSchemes({
            basemap: map.basemap,
            geometryType: customLayer.geometryType
        });

        const params = {
            layer: customLayer,
            view: view,
            relationshipScheme: schemes.secondarySchemes[1],
            field1: {
                field: "predicted"
            },
            field2: {
                field: "pct_black"
            },
            numClasses: 3,
            scheme: "secondary2",
            focus: "HH",
            edgesType: "solid"
        };

        return relationshipRendererCreator.createRenderer(params);
    }

    function executeRender(endOutput) {
        const render = endOutput.renderer;

        customLayer.renderer = render;
    }

    // const selectionMenu = document.getElementById("variable-selector");
    // contentInsidePopup = new Expand({
    //     expandIconClass: "esri-icon-sliders-horizontal",
    //     expanded: true,
    //     view: view,
    //     content: selectionMenu
    // });
    // view.ui.add(contentInsidePopup, {
    //     position: "top-left",
    //     index: 1
    // });



});


