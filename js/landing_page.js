function pageRedirect () {
    var selectField = document.getElementById("visualization_controller");
    var selectField_value = selectField.value;

    if (selectField_value == 'surface-map') {
        window.location.replace("visualizations/surface_map.html");
    } else if (selectField_value == "bivariate-choropleth") {
        window.location.replace("visualizations/bivariate_choropleth.html");
    } else if (selectField_value == "bubble-map") {
        window.location.replace("visualizations/bubble_map.html");
    }

}

function modalPopup() {
    let sideBar = document.getElementById("sidebar-popup");
    sideBar.style.display = "block";

    let body = document.body;
    body.style.overflow = "hidden";
    body.style.position = "fixed";

    let darken = document.getElementById("darken");
    darken.style.display = "block";
}

function closeModal() {
    let sideBar = document.getElementById("sidebar-popup");
    sideBar.style.display = "none";

    let body = document.body;
    body.style.overflow = "auto";
    body.style.position = "absolute";

    let darken = document.getElementById("darken");
    darken.style.display = "none";


}