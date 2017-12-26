
function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('Time').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 6000);

    var Days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var Months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    document.getElementById('Day').innerHTML = Days[today.getDay()] + " " + today.getDate() + " " + Months[today.getMonth()] + " " + today.getFullYear();

    var checkBox = document.getElementById("Alarm1");

    if (checkBox.checked == true)
    {
        if ((document.getElementById('Time1').value).split(":")[0] == h && (document.getElementById('Time1').value).split(":")[1] == m)
        {
              // Get Json data from config file
              $.getJSON("./settings/config.json", function (data) {
                console.log("JSON Data: " + data);
                $.each(data, function (key, val) {
                    console.log(key + "value:: " + val);
                    
                });
                 // Make IFTTT post
                $.post(data.AL_1ifttt,
                {
                    value1: data.AL_1value1,
                    value2: data.AL_1value2,
                    value3: data.AL_1value3
                },
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
            });
           
            //post('https://maker.ifttt.com/trigger/test/with/key/40eJ5t_88R2EXZCYHeAUcIZkCnuGZJTIC16dXQGGys', { "value1": "1", "value2": "2", "value3": "3" });
        };
        //prompt(jsonInput.alarm1.ifttt);
    };
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
    }
