
/*
    Static class of methods relating to discord's timestamp syntax
*/
class DiscordTimestamp {
    #datetime;
    #unixtime;
    #unixtime_discord;

    constructor(datetime) {
        this.#datetime = new Date(datetime);
        this.#unixtime = this.#datetime.getTime();
        this.#unixtime_discord = this.#unixtime / 1000;
    }

    toString(){
        return `<t:${this.#unixtime_discord}>`
    }

    toString(style){
        return `<t:${this.#unixtime_discord}:${style}>`
    }


    static StyleShortTime = 't';
    static StyleMediumTime = 'T';
    static StyleShortDate = 'd';
    static StyleLongDate = 'D';
    static StyleLongDateShortTime = 'f';
    static StyleFullDateShortTime = 'F';
    static StyleShortDateTime = 's';
    static StyleShortDateMediumTime = 'S';
    static StyleRelativeTime = 'R';

    static TimeValue(datetime) { return new Date(datetime).getTime()/1000; }
    static DefaultDateTime(datetime) { return `<t:${TimeValue(datetime)}>`; }
    static ShortTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleShortTime}>`; }
    static MediumTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleMediumTime}>`; }
    static ShortDate(datetime) { return `<t:${TimeValue(datetime)}}:${StyleShortDate}>`; }
    static LongDate(datetime) { return `<t:${TimeValue(datetime)}:${StyleLongDate}>`; }
    static LongDateShortTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleLongDateShortTime}>`; }
    static FullDateShortTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleFullDateShortTime}>`; }
    static ShortDateTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleShortDateTime}>`; }
    static ShortDateMediumTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleShortDateMediumTime}>`; }
    static RelativeTime(datetime) { return `<t:${TimeValue(datetime)}:${StyleRelativeTime}>`; }
}



var debug_enabled = true;

var e_input_form = document.getElementById("input-form").addEventListener('submit', function(event) {
    event.preventDefault();
    generateText();
});

var e_text_label = document.getElementById("label");
var e_text_link = document.getElementById("label-link");
var e_prefix = document.getElementById("prefix");
var e_postfix = document.getElementById("postfix");
var e_date_time = document.getElementById("local-time");
var e_show_date = document.getElementById("date-enabled");
var e_show_time = document.getElementById("time-enabled");

var e_output = document.getElementById("output");
document.getElementById('myForm')

debugLog(`
    ${e_text_label}\n
    ${e_text_link}\n
    ${e_prefix}\n
    ${e_postfix}\n
    ${e_date_time}\n
    ${e_show_date}\n
    ${e_show_time}\n
    ${e_output}
`);


function generateText(){
    debugLog("Generating Text!");
    debugLog(`
        Label: ${e_text_label.value}\n
        Link: ${e_text_link.value}\n
        Prefix: ${e_prefix.value}\n
        Postfix: ${e_postfix.value}\n
        Date Time: ${e_date_time.value}\n
        Show Date: ${e_show_date.checked}\n
        Show Time: ${e_show_time.checked}
    `);

    //const unixTimestamp = getUnixTimestamp(e_date_time.value);
    const timestamp = new DiscordTimestamp(e_date_time.value);

    e_output.value = "";
    if (e_prefix.value != "") e_output.value += e_prefix.value;
    e_output.value += `[${e_text_label.value}](${e_text_link.value})`
    if (e_postfix.value != "") e_output.value += e_postfix.value;
    if (e_show_date.checked) e_output.value += ` ${timestamp.toString(DiscordTimestamp.StyleShortDateTime)}`;
    if (e_show_time.checked) e_output.value += ` ${timestamp.toString(DiscordTimestamp.StyleRelativeTime)}`;
}

function clearInput(){
    e_text_label.value = "";
    e_text_link.value = "";
    e_prefix.value = "";
    e_date_time.value = "";
    generateText();
}

function copyToClipboard(){
    navigator.clipboard.writeText(e_output.value);
}

function debugLog(text){
    if (!debug_enabled) return;
    console.log(text);
}

function getUnixTimestamp(userInput){
    return new Date(userInput).getTime() / 1000;
}

function setTextThreeDays(){
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 3);
    e_date_time.value = dateToString(date);

    generateText();
}

function dateToString(date){
    return  `${date.getFullYear()}-` +
            `${(date.getMonth() + 1).toString().padStart(2,"0")}-` +
            `${date.getDate().toString().padStart(2,"0")}T` +
            `${date.getHours().toString().padStart(2,"0")}:` +
            `${date.getMinutes().toString().padStart(2,"0")}`;
}


document.addEventListener('DOMContentLoaded', (event) => {
    generateText();
})