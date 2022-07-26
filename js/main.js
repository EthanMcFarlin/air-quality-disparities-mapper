let defaultColorField = "pct_black";
let defaultLegend = "% population identifying as black (color) ";
let defaultLowerStop = 0.0;
let defaultUpperStop = 1.0;
let defaultLowerLabel = "0%";
let defaultUpperLabel = "100%";

require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand"
], function(esriConfig, Map, SceneView, FeatureLayer, Legend, Expand) {

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
                    title: "predicted element carbon (height)"
                },
                stops: [
                    {
                        value: 0.22,
                        size: 4000,
                        label: "<0.22 (10th percentile)"
                    },
                    {
                        value: 0.66,
                        size: 200000,
                        label: ">0.66 (95th percentile)"
                    }
                ]
            },
            {
                type: "color",
                field: defaultColorField,
                legendOptions: {
                    title: defaultLegend
                },
                stops: [
                    {
                        value: defaultLowerStop,
                        color: "#d1e1ff",
                        label: defaultLowerLabel
                    },
                    {
                        value: defaultUpperStop,
                        color: "#144db8",
                        label: defaultUpperLabel
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

    const selectionMenu = document.getElementById("variable-selector");
    contentInsidePopup = new Expand({
        expandIconClass: "esri-icon-sliders-horizontal",
        expanded: true,
        view: view,
        content: selectionMenu
    });
    view.ui.add(contentInsidePopup, {
        position: "top-left",
        index: 1
    });

    const demographicHolder = document.getElementById("demographic-holder");
    demographicHolder.addEventListener('change', function (e) {
        let changedField = e.target;

        switch (changedField.id) {
            case 'population':
                setDemographicVariable("population", "population", 0.0, 500000, "0 people", "500,000 people")
                break;
            case 'pct_female':
                console.log('pct_female 2');
                setDemographicVariable("pct_female", "% population identifying as female (color)", 0.4, 0.7, "40%", "70%")
                break;
            case 'pct_age_under_5':
                setDemographicVariable("pct_age_un", "% population under the age of 5 (color)", 0.00, 0.2, "0%", "20%")
                break;
            case 'pct_age_over_85':
                setDemographicVariable("pct_age_ov", "% population over the age of 85 (color)", 0.0, 0.2, "0%", "20%")
                break;
            case 'pct_white':
                setDemographicVariable("pct_white", "% population identifying as white (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'pct_black':
                setDemographicVariable("pct_black", "% population identifying as black (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'pct_native':
                setDemographicVariable("pct_native", "% population identifying as native (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'pct_asian':
                setDemographicVariable("pct_asian", "% population identifying as asian (color)", 0.0, 0.4, "0%", "40%")
                break;
            case 'pct_two_or_more_races':
                setDemographicVariable("pct_two_or", "% population identifying as two or more races (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'pct_hispanic':
                setDemographicVariable("pct_hispan", "% population identifying as hispanic (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'n_households':
                setDemographicVariable("n_househol", "number of households (color)", 0.0, 100000.0, "0 households", "100,000 households")
                break;
            case 'pct_households_single_father':
                setDemographicVariable("pct_househ", "% households with a single father (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'pct_households_single_mother':
                setDemographicVariable("pct_hous_1", "% households with a single mother (color)", 0.0, 1.0, "0%", "100%")
                break;
            case 'n_housing_units':
                setDemographicVariable("n_housing_", "number of housing units (color)", 0.0, 100000.0, "0 housing units", "100,000 housing unnits")
                break;
            case 'n_occupied_housing_units':
                setDemographicVariable("n_occupied", "number of occupied housing units (color)", 0.0, 100000.0, "0 housing units", "100,000 housing units")
                break;
            case 'pct_renting':
                setDemographicVariable("pct_rentin", "% renting (color)", 0.0, 1.0, "0%", "100%")
                break;
        }

    });

    function setDemographicVariable
    (field, legend, lower_stop, upper_stop, lower_label, upper_label) {
        console.log("check: setDemographicVariable");
        defaultColorField = field;
        defaultLegend = legend;
        defaultLowerStop = lower_stop;
        defaultUpperStop = upper_stop;
        defaultLowerLabel = lower_label;
        defaultUpperLabel = upper_label;

        refreshRenderer(field, legend, lower_stop, upper_stop, lower_label, upper_label);
    }

    function refreshRenderer(field, legend, lower_stop, upper_stop, lower_label, upper_label) {
        console.log("check: refresh rendererer");
        new_renderer = customLayer.renderer.clone();
        const colorVariable = new_renderer.visualVariables[1];
        colorVariable.field = field;
        colorVariable. legendOptions =
            {
                title: legend
            }
        colorVariable.stops =
         [
            {
                value: lower_stop,
                color: "#d1e1ff",
                label: lower_label
            },
            {
                value: upper_stop,
                color: "#144db8",
                label: upper_label
            }
        ]
        customLayer.renderer = new_renderer;
    }



});


