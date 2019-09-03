interface AutocompleteItem {
    value: string,
    label: string,
}

interface AutocompleteOptions {
    dropdownOptions?: Bootstrap.DropdownOption,
    label?: string,
    maximumItems?: number,
    onSelectItem?: (item: AutocompleteItem) => void,
    source?: object,
    treshold?: number,
    value?: string,
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

        let _field = $(this);

        // attach dropdown
        _field.parent().addClass('dropdown');
        _field.attr('data-toggle', 'dropdown');
        _field.addClass('dropdown-toggle');
        _field.after('<div class="dropdown-menu"></div>');
        _field.dropdown(opts.dropdownOptions);
        
        // show options
        this.keyup(function() {
            const lookup = _field.val() as string;
            if (lookup.length < opts.treshold) {
                _field.dropdown('hide');
                return;
            }
            const items = _field.next();
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

            // option action
            _field.next().find('.dropdown-item').click(function() {
                _field.val($(this).html());
                if (opts.onSelectItem) {
                    opts.onSelectItem({
                        value: $(this).data('value'),
                        label: $(this).html(),
                    })
                }
            });

            _field.dropdown('show');
        });

        return this;
    };
}( jQuery ));
