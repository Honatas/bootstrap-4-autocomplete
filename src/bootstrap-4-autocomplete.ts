interface AutocompleteOptions {
    source?: object,
    treshold?: number,
    maximumItems?: number,
    value?: string,
    label?: string,
    dropdownOptions?: Bootstrap.DropdownOption,
}

interface JQuery {
    autocomplete(options: AutocompleteOptions): JQuery<HTMLElement>;
}

(function ( $ ) {

    let defaults: AutocompleteOptions = {
        treshold: 4,
        maximumItems: 5,
    };

    $.fn.autocomplete = function(options) {
        // merge options with default
        let opts = $.extend(defaults, options);

        // attach dropdown
        $(this).parent().addClass('dropdown');
        $(this).attr('data-toggle', 'dropdown');
        $(this).addClass('dropdown-toggle');
        $(this).after('<div class="dropdown-menu"></div>');
        $(this).dropdown(opts.dropdownOptions);
        
        // show options
        return this.keyup(function() {
            const lookup = $(this).val() as string;
            if (lookup.length < opts.treshold) {
                $(this).dropdown('hide');
                return;
            }
            const items = $(this).next();
            items.html('');

            let count = 0;
            const keys = Object.keys(opts.source);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const object = opts.source[key];
                const label: string = opts.label ? object[opts.label] : key;
                const value = opts.value ? object[opts.value]: object;
                if (label.toLowerCase().indexOf(lookup.toLowerCase()) >= 0) {
                    items.append('<button type="button" class="dropdown-item" data-value="' + value + '">' + label + '</button>');
                    if (++count > opts.maximumItems) {
                        break;
                    }
                }
            }
            $(this).dropdown('show');
        });
    };
}( jQuery ));
