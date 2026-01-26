// Const Maps
const map_inputTypeInputAreas = new Map();
const map_inputTypePropertyAreas = new Map();

// Const String values
const className_disabled = 'disabled';
const className_inputTypeSelection = 'input-type-selection';
const className_inputArea = 'input-area';

const className_inputTextArea = 'template-input-text-area';
const className_inputNumberArea = 'template-input-number-area';
const className_inputRangeArea = 'template-input-range-area';
const className_inputDatetimeArea = 'template-input-datetime-area';
const className_inputEmailArea = 'template-input-email-area';
const className_inputTelArea = 'template-input-telephone-area';
const className_inputURLArea = 'template-input-url-area';

const className_propsTextArea = 'template-properties-text-area';
const className_propsNumberArea = 'template-properties-number-area';
const className_propsRangeArea = 'template-properties-range-area';
const className_propsDatetimeArea = 'template-properties-datetime-area';
const className_propsEmailArea = 'template-properties-email-area';
const className_propsTelArea = 'template-properties-telephone-area';
const className_propsURLArea = 'template-properties-url-area';

const inputType_inputAreas = [
    ['Text', className_inputTextArea],
    ['Number', className_inputNumberArea],
    ['Range', className_inputRangeArea],
    ['Date/Time', className_inputDatetimeArea],
    ['Email', className_inputEmailArea],
    ['Telephone', className_inputTelArea],
    ['URL', className_inputURLArea]
];

const inputType_propsAreas = [
    ['Text', className_propsTextArea],
    ['Number', className_propsNumberArea],
    ['Range', className_propsRangeArea],
    ['Date/Time', className_propsDatetimeArea],
    ['Email', className_propsEmailArea],
    ['Telephone', className_propsTelArea],
    ['URL', className_propsURLArea]
];

// Const Element Reference
const inputFieldRoot = document.getElementById('input-field-container');

// Const Template References
const template_inputFieldset = document.getElementById('template-main-input-fieldset');



// Toggle whether a fieldset is enabled
function ToggleFieldset(invoker) {
    let rootFieldset = invoker.closest('fieldset');
    rootFieldset.classList.toggle(className_disabled);
    rootFieldset.disabled = !invoker.checked;
}

// Remove a fieldset by reference
function RemoveFieldset(invoker) {
    let rootFieldset = invoker.closest('fieldset');
    rootFieldset.parentNode.removeChild(rootFieldset);
}

// Add a new fieldset
function AddInputField(){
    const newNode = template_inputFieldset.content.cloneNode(true);
    inputFieldRoot.appendChild(newNode);
    SetFieldsetInputType(inputFieldRoot.lastElementChild, "Text");
}

// Update the fieldset from a child element invoke
function UpdateFieldsetInputType(invoker, type){
    console.log(invoker, type);
    SetFieldsetInputType(invoker.closest('fieldset'), type);
}

// Update the fieldset from the root element
function SetFieldsetInputType(root, type) {
    let element_inputArea = root.querySelector(`.${className_inputArea}`);
    element_inputArea.innerHTML = "";
    element_inputArea.appendChild(map_inputTypeInputAreas.get(type).content.cloneNode(true));
}

// Remove every fieldset
function RemoveAllFields() {
    if (window.confirm("Warning!  You are about to remove every input field, this cannot be undone.  Are you sure you would like to continue?")) {
        inputFieldRoot.innerHTML = "";
    }
}

// Query all the data from a fieldset including its value, properties, and input type
function QueryFieldsetData(root) {

}


// Initialization after the website is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    element_inputTypeSelection = template_inputFieldset.content.querySelector(`.${className_inputTypeSelection}`);
    console.log(element_inputTypeSelection);

    for (const [inputType, templateName] of inputType_inputAreas) {
        if (inputType === '' || templateName === '') continue;

        // Create name association between input type name and element template
        map_inputTypeInputAreas.set(inputType, document.getElementById(templateName));

        let element_option = document.createElement('option');
        element_inputTypeSelection.append(element_option);
        element_option.innerHTML = inputType;
    }

    for (const [inputType, templateName] of inputType_propsAreas) {
        if (inputType === '' || templateName === '') continue;

        // Create name association between input type name and element template
        map_inputTypePropertyAreas.set(inputType, document.getElementById(templateName));
    }
});