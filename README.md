# Bootstrap 4 Autocomplete

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
