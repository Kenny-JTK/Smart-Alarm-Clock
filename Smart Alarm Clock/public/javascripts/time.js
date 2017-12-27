function start() {
    $.getJSON("./settings/config.json", function (data) {
        document.getElementById('Button_left').innerHTML = data.button_left_caption;
        document.getElementById('Button_center').innerHTML = data.button_center_caption;
        document.getElementById('Button4').innerHTML = "Play Radio";
        document.getElementById('Button_right').innerHTML = data.button_right_caption;
    }); 
    startTime();
}


function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('Time').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);

    var Days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    var Months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    document.getElementById('Day').innerHTML = Days[today.getDay()] + " " + today.getDate() + " " + Months[today.getMonth()] + " " + today.getFullYear();

    var checkBox1 = document.getElementById("Alarm1");
    var checkBox2 = document.getElementById("Alarm2");

    //Alarm 1
    if (checkBox1.checked == true)
    {
        if ((document.getElementById('Time1').value).split(":")[0] == h && (document.getElementById('Time1').value).split(":")[1] == m && s == "00")
        {
              // Get Json data from config file
              $.getJSON("./settings/config.json", function (data) {
                $.each(data, function (key, val) {
                    console.log(key + "value:: " + val);
                    
                });
                 // Make IFTTT webhook post
                $.post(data.AL_1ifttt,
                {
                    value1: data.AL_1value1,
                    value2: data.AL_1value2,
                    value3: data.AL_1value3
                },
                //???
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                
                });
                // Start Music
                document.getElementById('webradio').volume=0.2;
                document.getElementById('webradio').play();
                document.getElementById('Button1').innerHTML = "Stop Radio";
                fade(data.fadeTime);
            });
         };
    };

    //Alarm 2
    if (checkBox2.checked == true) {
        if ((document.getElementById('Time2').value).split(":")[0] == h && (document.getElementById('Time2').value).split(":")[1] == m && s == "00") {
            // Get Json data from config file
            $.getJSON("./settings/config.json", function (data) {
                $.each(data, function (key, val) {
                    console.log(key + "value:: " + val);

                });
                // Make IFTTT webhook post
                $.post(data.AL_2ifttt,
                    {
                        value1: data.AL_2value1,
                        value2: data.AL_2value2,
                        value3: data.AL_2value3
                    },
                    //???
                    function (data, status) {
                        alert("Data: " + data + "\nStatus: " + status);

                    });
                // Start Music
                document.getElementById('webradio').volume = 0.2;
                document.getElementById('webradio').play();
                document.getElementById('Button4').innerHTML = "Stop Radio";
                fade(data.fadeTime);
            });
        };
    };
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

function button_left() {
    $.getJSON("./settings/config.json", function (data) {
        $.post(data.button_left, {})
    });    
}

function button_center() {
    $.getJSON("./settings/config.json", function (data) {
        $.post(data.button_center, {})
    });   
}

function button_right() {
    $.getJSON("./settings/config.json", function (data) {
        $.post(data.button_right, {})
    });   
}

