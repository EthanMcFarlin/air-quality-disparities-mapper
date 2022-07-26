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
                setDemographicVariable("population", "population", 0.0, 500000, "0 people", "500,000 people", "represents the population in 2010.")
                break;
            case 'pct_female':
                console.log('pct_female 2');
                setDemographicVariable("pct_female", "% population identifying as female (color)", 0.4, 0.7, "40%", "70%", "represents the percentage (as a decimal) of the population in this county identifying as female in 2010.")
                break;
            case 'pct_age_under_5':
                setDemographicVariable("pct_age_un", "% population under the age of 5 (color)", 0.00, 0.2, "0%", "20%", "represents the percentage (as a decimal) of the population in this county under the age of 5 in 2010.")
                break;
            case 'pct_age_over_85':
                setDemographicVariable("pct_age_ov", "% population over the age of 85 (color)", 0.0, 0.1, "0%", "10%", "represents the percentage (as a decimal) of the population in this county over the age of 85 in 2010.")
                break;
            case 'pct_white':
                setDemographicVariable("pct_white", "% population identifying as white (color)", 0.0, 1.0, "0%", "100%", "represents the percentage (as a decimal) of the population in this county identifying as white in 2010.")
                break;
            case 'pct_black':
                setDemographicVariable("pct_black", "% population identifying as black (color)", 0.0, 1.0, "0%", "100%", "represents the percentage (as a decimal) of the population in this county identifying as black in 2010.")
                break;
            case 'pct_native':
                setDemographicVariable("pct_native", "% population identifying as native (color)", 0.0, 1.0, "0%", "100%", "represents the percentage (as a decimal) of the population in this county identifying as native in 2010.")
                break;
            case 'pct_asian':
                setDemographicVariable("pct_asian", "% population identifying as asian (color)", 0.0, 0.4, "0%", "40%", "represents the percentage (as a decimal) of the population in this county identifying as asian in 2010.")
                break;
            case 'pct_two_or_more_races':
                setDemographicVariable("pct_two_or", "% population identifying as two or more races (color)", 0.0, 0.1, "0%", "10%", "represents the percentage (as a decimal) of the population in this county identifying as two or more races in 2010.")
                break;
            case 'pct_hispanic':
                setDemographicVariable("pct_hispan", "% population identifying as hispanic (color)", 0.0, 1.0, "0%", "100%", "represents the percentage (as a decimal) of the population in this county identifying as hispanic in 2010.")
                break;
            case 'n_households':
                setDemographicVariable("n_househol", "number of households (color)", 0.0, 100000.0, "0 households", "100,000 households", "represents the number of households in this county in 2010.")
                break;
            case 'pct_households_single_father':
                setDemographicVariable("pct_househ", "% households with a single father (color)", 0.01, 0.15, "5%", "15%", "represents the percentage (as a decimal) of households in this county with a single father in 2010.")
                break;
            case 'pct_households_single_mother':
                setDemographicVariable("pct_hous_1", "% households with a single mother (color)", 0.1, 0.5, "10%", "50%", "represents the percentage (as a decimal) of households in this county with a single mother in 2010.")
                break;
            case 'n_housing_units':
                setDemographicVariable("n_housing_", "number of housing units (color)", 0.0, 100000.0, "0 housing units", "100,000 housing unnits", "represents the number of housing units in this county in 2010.")
                break;
            case 'n_occupied_housing_units':
                setDemographicVariable("n_occupied", "number of occupied housing units (color)", 0.0, 100000.0, "0 housing units", "100,000 housing units", "represents the number of occupied housing units in this county in 2010.")
                break;
            case 'pct_renting':
                setDemographicVariable("pct_rentin", "% renting (color)", 0.0, 1.0, "0%", "100%", "represents the percentage (as a decimal) renting in this county in 2010.")
                break;
        }

    });

    function setDemographicVariable
    (field, legend, lower_stop, upper_stop, lower_label, upper_label, popup_text) {
        console.log("check: setDemographicVariable");
        defaultColorField = field;
        defaultLegend = legend;
        defaultLowerStop = lower_stop;
        defaultUpperStop = upper_stop;
        defaultLowerLabel = lower_label;
        defaultUpperLabel = upper_label;

        refreshRenderer(field, legend, lower_stop, upper_stop, lower_label, upper_label, popup_text);
    }

    function refreshRenderer(field, legend, lower_stop, upper_stop, lower_label, upper_label, popup_text) {
        console.log("check: refresh rendererer");

        customLayer.popupTemplate = {
            title: "{NAMELSAD10}",
            content: "{" + field + "}" + " " + popup_text +
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
                    fieldName: field,
                    format: {
                        digitSeparator: false,
                        places: 3
                    }
                }
            ]


        };

        const new_schemes = relationshipSchemes.getSchemes({
            basemap: map.basemap,
            geometryType: customLayer.geometryType
        });

        const new_params = {
            layer: customLayer,
            view: view,
            relationshipScheme: new_schemes.secondarySchemes[1],
            field1: {
                field: "predicted"
            },
            field2: {
                field: field
            },
            numClasses: 3,
            scheme: "secondary2",
            focus: "HH",
            edgesType: "solid"
        };

        relationshipRendererCreator.createRenderer(new_params)
            .then(executeRender);

    }



});



