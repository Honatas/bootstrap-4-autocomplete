# Bootstrap 4 Autocomplete

[![Travis](https://img.shields.io/travis/honatas/bootstrap-4-autocomplete?style=plastic)](https://travis-ci.org/Honatas/bootstrap-4-autocomplete "View the build on Travis")
[![David](https://img.shields.io/david/honatas/bootstrap-4-autocomplete?style=plastic)](https://david-dm.org/honatas/bootstrap-4-autocomplete "View the dependencies status on David")
[![GitHub](https://img.shields.io/github/license/honatas/bootstrap-4-autocomplete?style=plastic)](https://github.com/Honatas/bootstrap-4-autocomplete "View this project on GitHub")
[![npm](https://img.shields.io/npm/v/bootstrap-4-autocomplete?style=plastic)](https://npmjs.org/package/bootstrap-4-autocomplete "View this project on npm")
[![typescript](https://img.shields.io/badge/made%20with-Typescript-blue?style=plastic)](https://www.typescriptlang.org/ "Try Typescript")
[![coffee](https://img.shields.io/badge/buy%20me%20a-coffee-orange?style=plastic)](https://ko-fi.com/honatas "Buy me a coffee")

A very small (less than 2Kb) autocomplete/typeahead for Bootstrap 4 and jQuery.  

It uses the default [Dropdown](https://getbootstrap.com/docs/4.3/components/dropdowns/) component from Bootstrap 4 to create the list of autocomplete items.



## Install

You can get it from npm:

    npm install bootstrap-4-autocomplete

Or you can get it from a CDN. Just be careful to add it to your HTML **AFTER** Jquery, Popperjs and Bootstrap:

```html
<!-- Dependencies -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
<!-- Bootstrap 4 Autocomplete -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete.min.js" crossorigin="anonymous"></script>
```



## Typescript

If your project uses Typescript, Bootstrap 4 Autocomplete has type definitions. If for some reason your IDE/Compiler can't find the definitions automatically, you can add them manually on your tsconfig.json file in the "includes" section:

    includes: ["node_modules/bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete.d.ts"]



## Usage

Take a look at the bundled example/example.html to get an overview of a simple usage.  

Given you have a textfield with id "myAutocomplete", you can:

```javascript
$("#myAutocomplete").autocomplete(options);
```

Options is a JSON object with the following attributes (in alphabetical order):

**dropdownOptions**:  
It's the same options from Bootstrap's Dropdown, documented [here](https://getbootstrap.com/docs/4.3/components/dropdowns/#options).  

**dropdownClass**:  
The class of the dropdown-menu element, which is the box that is displayed. Can take a string or an array of strings.  

**highlightClass**:  
The class to use when highlighting typed text on items. Only used when highlightTyped is true. Default is text-primary. Can take a string or an array of strings.  

**highlightTyped**:  
Wether to highlight (style) typed text on items. Default is true.  

**label**:  
Where to find the label on your source. The label is what will be shown on each item in the autocomplete list.  

**maximumItems**:  
How many items you want to show when the autocomplete is displayed. Default is 5. Set to 0 to display all available items.  

**onSelectItem**:  
A callback that is fired every time an item is selected. It receives two parameters: the first is the selected item, the second is the textfield element. The selected item has the format:
    
    { value: value, label: label }  

Note that you don't have to use this callback to set the text in the textfield, this is done automatically.

**source**:  
The data from where autocomplete will lookup items to show. This data has to be a JSON object. The default format for this object is:

    { "label1": 1, "label2": 2, ...}

If your JSON has this format, you don't need to set the label and value options, as they will be retrieved automatically. Otherwise, you can pass any format as you want, given you set the value and label options.  

**treshold**:  
The number of characters that need to be typed on the input in order to trigger the autocomplete. Default is 4.

**value**:  
Where to find the value on your source.



## How it works

When you call autocomplete on a texfield (also known as input type="text"), this lib builds a Dropdown around the textfield, having it's parent as the container. The textfield is then injected an **onkeyup** event that triggers the Dropdown when the length of the text typed is equal to or greater than the treshold. When this happens, the data is then filtered to get only the items that contain the text typed. When you activate one of the items, the textfield's value is set to that item's label.  



## Contributions

Feel free to open an issue or add a pull request. Anytime. Really, I mean it.  

Also, if you like my work, I'll let you know that I love [coffee](https://ko-fi.com/honatas). \*wink wink nudge nudge\*
