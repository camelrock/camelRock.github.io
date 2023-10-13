
function displayOnOff(id) {
    if (document.getElementById(id).style.display == 'block') {
        document.getElementById(id).style.display = 'none';
        return;
    }
    document.getElementById(id).style.display = "block";
}
function unhide(idd) {
    document.getElementById(idd).style.display = "block"
}