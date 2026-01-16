var debug_enabled = true;

var e_text_label = document.getElementById("label");
var e_text_link = document.getElementById("label-link");
var e_date_time = document.getElementById("local-time");
var e_show_date = document.getElementById("date-enabled");
var e_show_time = document.getElementById("time-enabled");

var e_output = document.getElementById("output");

debugLog(`
    ${e_text_label}\n
    ${e_text_link}\n
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
        Date Time: ${e_date_time.value}\n
        Show Date: ${e_show_date.value}\n
        Show Time: ${e_show_time.value}
    `);

    const unixTimestamp = getUnixTimestamp(e_date_time.value);

    e_output.value = `[${e_text_label.value}](${e_text_link.value})`
    if (e_show_date) e_output.value += ` <t:${unixTimestamp}:s>`;
    if (e_show_time) e_output.value += ` <t:${unixTimestamp}:R>`;
}

function debugLog(text){
    if (!debug_enabled) return;
    console.log(text);
}

function getUnixTimestamp(userInput){
    return new Date(userInput).getTime() / 1000;
}