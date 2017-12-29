var config ="";

function start()
{
    $.getJSON("./settings/config.json", function (data) {
        config = data;
    console.log(config);
    document.getElementById('Button_left').innerHTML = config.button_left_caption;
    document.getElementById('Button_center').innerHTML = config.button_center_caption;
    document.getElementById('Button4').innerHTML = "Play Radio";
    document.getElementById('Button_right').innerHTML = config.button_right_caption;
    startTime(); 
    });
}


function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('Time').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);

    //var Days = config.Days;
    //var Months = config.Months;
    var Days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var Months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    //console.log(Days);
    document.getElementById('Day').innerHTML = Days[today.getDay()] + " " + today.getDate() + " " + Months[today.getMonth()] + " " + today.getFullYear();

    var checkBox1 = document.getElementById("Alarm1");
    var checkBox2 = document.getElementById("Alarm2");

    //Alarm 1
    if (checkBox1.checked == true)
    {
        if ((document.getElementById('Time1').value).split(":")[0] == h && (document.getElementById('Time1').value).split(":")[1] == m && s == "00")
        {
            // Make IFTTT webhook post
            $.post(config.AL_1ifttt,
                {
                    value1: config.AL_1value1,
                    value2: config.AL_1value2,
                    value3: config.AL_1value3
                });
                
            // Start Music
            document.getElementById('webradio').volume=0.2;
            document.getElementById('webradio').play();
            document.getElementById('Button1').innerHTML = "Stop Radio";
            fade(config.fadeTime);
            
         };
    };

    //Alarm 2
    if (checkBox2.checked == true) {
        if ((document.getElementById('Time2').value).split(":")[0] == h && (document.getElementById('Time2').value).split(":")[1] == m && s == "00")
        {
            // Make IFTTT webhook post
            $.post(config.AL_2ifttt,
                {
                    value1: config.AL_2value1,
                    value2: config.AL_2value2,
                    value3: config.AL_2value3
                });
                   
            // Start Music
            document.getElementById('webradio').volume = 0.2;
            document.getElementById('webradio').play();
            document.getElementById('Button4').innerHTML = "Stop Radio";
            fade(config.fadeTime);
        };
    };

    //early trigger
    if (config.early_trigger != "" && checkBox1.checked == true || config.early_trigger != "" && checkBox2.checked == true) {
        var offset = [];
        offset[0] = math.floor(config.early_offset / 60);
        offset[1] = config.early_offset - (offset[0] * 60);
        var alarmTime1 = (document.getElementById('Time1').value).split(":");
        var alarmTime2 = (document.getElementById('Time2').value).split(":");
        var earlyAlarm1 = [];
        var earlyAlarm2 = [];
        //calculate early alarm 1
        if (offset[1] <= alarmTime1[1]) {
            earlyAlarm1[0] = alarmTime1[0] - offset[0];
            earlyAlarm1[1] = alarmTime1[1] - offset[1];
        } else {
            earlyAlarm1[0] = alarmTime1[0] - offset[0]-1;
            earlyAlarm1[1] = (60 + alarmTime1[1]) - offset[1];
        };
        //calculate early alarm 2
        if (offset[1] <= alarmTime2[1]) {
            earlyAlarm2[0] = alarmTime2[0] - offset[0];
            earlyAlarm2[1] = alarmTime2[1] - offset[1];
        } else {
            earlyAlarm2[0] = alarmTime2[0] - offset[0] - 1;
            earlyAlarm2[1] = (60 + alarmTime2[1]) - offset[1];
        };
        //trigger alarm
        if (earlyAlarm1[0] == h && earlyAlarm1[1] == m && "00" == s || earlyAlarm2[0] == h && earlyAlarm2[1] == m && "00" == s) {
            $.post(config.early_trigger,
                {
                    value1: config.early_value1,
                    value2: config.early_value2,
                    value3: config.early_value3
                });
            console.log("early");
        };
    }
}

// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
    }

// increase volume over time 
function fade(time) {
    if (time == "0" || time=="") { document.getElementById('webradio').volume = 1; return false };
    if (document.getElementById('webradio').volume == 1) {
        return false
    }
    else {
        document.getElementById('webradio').volume = document.getElementById('webradio').volume + 0.1;
        var t = setTimeout(function () { fade(time) }, time);
    }
}

//toggle on/off function for webradio
function toggleRadio() {
    var Audio = document.getElementById('webradio');

    if (Audio.duration > 0 && !Audio.paused) {
        //is playing
        document.getElementById('webradio').pause();
        document.getElementById('Button4').innerHTML = "Play Radio";
    } else {
        //is paused
        document.getElementById('webradio').play();
        document.getElementById('Button4').innerHTML = "Stop Radio";
    }
}

function button_left()
{
    $.post(config.button_left, {})   
}

function button_center()
{
    $.post(config.button_center, {})
}

function button_right()
{
    $.post(config.button_right, {})
}
