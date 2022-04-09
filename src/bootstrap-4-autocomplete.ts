interface AutocompleteItem {
    value: string,
    label: string,
}

interface AutocompleteOptions {
    dropdownOptions?: Bootstrap.DropdownOption,
    dropdownClass?: string | string[],
    highlightClass?: string | string[],
    highlightTyped?: boolean,
    label?: string,
    maximumItems?: number,
    onSelectItem?: (item: AutocompleteItem, element: HTMLElement) => void,
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
        highlightTyped: true,
        highlightClass: 'text-primary',
    };

    function createItem(lookup: string, item: AutocompleteItem, opts: AutocompleteOptions):JQuery {
        let label: string;
        if (opts.highlightTyped) {
            const idx = item.label.toLowerCase().indexOf(lookup.toLowerCase());
            label = item.label.substring(0, idx)
                    + '<span class="' + expandClassArray(opts.highlightClass) + '">' + item.label.substring(idx, idx + lookup.length) + '</span>'
                    + item.label.substring(idx + lookup.length, item.label.length);
        } else {
            label = item.label;
        }
        const itemEl = $('<button type="button" class="dropdown-item">' + label + '</button>')
        itemEl.data('value', item.value)
        return itemEl;
    }

    function expandClassArray(classes: string | string[]): string {
        if (typeof classes == "string") {
            return classes;
        }
        if (classes.length == 0) {
            return '';
        }
        let ret = '';
        for (const clas of classes) {
            ret += clas + ' ';
        }
        return ret.substring(0, ret.length - 1);
    }

    function createItems(field: JQuery<HTMLElement>, opts: AutocompleteOptions) {
        const lookup = field.val() as string;
        if (lookup.length < opts.treshold) {
            field.dropdown('hide');
            return 0;
        }

        const items = field.next();
        items.html('');

        let count = 0;
        const keys = Object.keys(opts.source);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const object = opts.source[key];
            const item = {
                label: opts.label ? object[opts.label] : key,
                value: opts.value ? object[opts.value]: object,
            };
            if (item.label.toLowerCase().indexOf(lookup.toLowerCase()) >= 0) {
                items.append(createItem(lookup, item, opts));
                if (opts.maximumItems > 0 &&  ++count >= opts.maximumItems) {
                    break;
                }
            }
        }

        // option action
        field.next().find('.dropdown-item').click(function() {
            field.val($(this).text());
            if (opts.onSelectItem) {
                opts.onSelectItem({
                    value: $(this).data('value'),
                    label: $(this).text(),
                }, field[0]);
            }
        });

        return items.children().length;
    }

    $.fn.autocomplete = function(options) {
        // merge options with default
        let opts: AutocompleteOptions = {};
        $.extend(opts, defaults, options);

        let _field = $(this);

        // clear previously set autocomplete
        _field.parent().removeClass('dropdown');
        _field.removeAttr('data-toggle');
        _field.removeClass('dropdown-toggle');
        _field.parent().find('.dropdown-menu').remove();
        _field.dropdown('dispose');
        
        // attach dropdown
        _field.parent().addClass('dropdown');
        _field.attr('data-toggle', 'dropdown');
        _field.addClass('dropdown-toggle');
        const dropdown = $('<div class="dropdown-menu" ></div>');
        // attach dropdown class
        if (opts.dropdownClass) dropdown.addClass(opts.dropdownClass);
        _field.after(dropdown);

        _field.dropdown(opts.dropdownOptions);
        
        this.off('click.autocomplete').click('click.autocomplete', function(e) {
            if (createItems(_field, opts) == 0) {
                // prevent show empty
                e.stopPropagation();
                _field.dropdown('hide');
            };
        });

        // show options
        this.off('keyup.autocomplete').keyup('keyup.autocomplete', function() {
            if (createItems(_field, opts) > 0) {
                _field.dropdown('show');
            } else {
                // sets up positioning
                _field.click();
            }
        });

        return this;
    };
}( jQuery ));
