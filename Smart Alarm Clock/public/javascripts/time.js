    function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('Time').innerHTML =
    h + ":" + m +":"+s;
    var t = setTimeout(startTime, 500);
    var Days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var Months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    document.getElementById('Day').innerHTML = Days[today.getDay()] + " " + today.getDate()+ " " + Months[today.getMonth()] + " " + today.getFullYear();
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}