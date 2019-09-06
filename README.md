# Bootstrap 4 Autocomplete

![Travis (.com)](https://img.shields.io/travis/com/honatas/bootstrap-4-autocomplete?style=plastic)
![GitHub](https://img.shields.io/github/license/honatas/bootstrap-4-autocomplete?style=plastic)
[![npm](https://img.shields.io/npm/v/bootstrap-4-autocomplete?style=plastic)](https://npmjs.org/package/bootstrap-4-autocomplete "View this project on npm")
[![typescript](https://img.shields.io/badge/made%20with-Typescript-blue?style=plastic)](https://www.typescriptlang.org/ "Try Typescript")
[![coffee](https://img.shields.io/badge/buy%20me%20a-coffee-orange?style=plastic)](https://www.buymeacoffee.com/honatas "Buy me a coffee")

A very small (less than 2Kb) autocomplete/typeahead for Bootstrap 4 and jQuery.  

It uses the default [Dropdown](https://getbootstrap.com/docs/4.3/components/dropdowns/) component from Bootstrap 4 to create the list of autocomplete items.



## Install

You can get it from npm:

    npm install bootstrap-4-autocomplete

Or you can get it from a CDN. Just be careful to add it to your HTML **AFTER** Jquery, Popperjs and Bootstrap:

```html
<!-- Dependencies -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
<!-- Bootstrap 4 Autocomplete -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete.min.js" crossorigin="anonymous"></script>
```



## Typescript

Bootstrap 4 Autocomplete has bundled types definitions for your Typescript project. If for some reason your IDE/Compiler can't find the definitions, you can add them manually on your tsconfig.json file in the "includes" section:

    includes: ["node_modules/bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete.d.ts"]



## Usage

Given you have a textfield with id "myAutocomplete", you can:

```javascript
$("#myAutocomplete").autocomplete(options);
```

Options is a JSON object with the following attributes (in alphabetical order):

**dropdownOptions**:  
It's the same options from Bootstrap's Dropdown, documented [here](https://getbootstrap.com/docs/4.3/components/dropdowns/#options).  

**label**:  
Where to find the label on your source. The label is what will be shown on each item in the autocomplete list.  

**maximumItems**:  
How many items you want to show when the autocomplete is displayed. Default is 5.  

**onSelectItem**:  
A callback that is fired every time an item is selected. The selected item is passed as a parameter, in the format:
    
    { value: value, label: label }  

Note that you don't have to use this callback to set the text in the textfield, this is done automatically.

**source**:  
The data from where autocomplete will lookup items to show. This data has to be a JSON object. The default format for this object is:

    { "label1": 1, "label2": 2, ...}

If your JSON has this format, you don't need to set the label and value options, as they will be retrieved automatically. Otherwise, you can pass any format as you want, given you set the value and label options.  

**treshold**:  
The number of characters that need to be typed on the input to trigger the autocomplete. Default is 4.

**value**:  
Where to find the value on your source.



## How it works

When you call autocomplete on a texfield (also known as input type="text"), this lib builds a Dropdown around the textfield, having it's parent as the container. The textfield is then injected an **onkeyup** event that triggers the Dropdown when the length of the text typed is equal or greater than the treshold. When this happens, the data is then filtered to get only the items that contain the text typed. When you activate one of the items, the textfield's value is set to that item's label.  

Warning: setting autocomplete on a texfield removes any previously set 'click' and 'keyup' events, so if you need to set any of those, set them after autocomplete.


## Contributions

Feel free to open an issue or add a pull request. Anytime. Really, I mean it.  

Also, if you like my work, consider 
<style>.bmc-button img{width: 27px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#000000 !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 0px 9px !important;font-size: 17px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Lato', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/honatas"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buying me a coffee</span></a>
