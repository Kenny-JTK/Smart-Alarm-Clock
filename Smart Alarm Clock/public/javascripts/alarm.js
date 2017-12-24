function myAlarm(Alarm)
{
    var checkBox = document.getElementById("Alarm1");
    console.log(Alarm);

    if (checkBox.checked == true) {
        prompt("checked");
    } else {
        prompt("Unchecked");
    }
}
