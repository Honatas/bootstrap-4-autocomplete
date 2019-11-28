interface AutocompleteItem {
    value: string,
    label: string,
}

interface AutocompleteOptions {
    dropdownOptions?: Bootstrap.DropdownOption,
    highlightClass?: string,
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

    function createItem(lookup: string, item: AutocompleteItem, opts: AutocompleteOptions):string {
        let label = item.label;

        if (opts.highlightTyped) {
            let terms = lookup.trim().replace(/[^A-Za-z0-9]/gi, ' ').split(' ');

            terms.filter((term) => {
                return term.length > 0;
            }).map((term) => {
                let regex = new RegExp(`${term}(?![^>]*>)`, 'gi');

                label = label.replace(regex, `<span class="${opts.highlightClass}">${term}</span>`);
            });
        }

        return '<button type="button" class="dropdown-item" data-value="' + item.value + '">' + label + '</button>';
    }

    function createItems(field: JQuery<HTMLElement>, opts: AutocompleteOptions) {
        const lookup = field.val() as string;
        if (lookup.length < opts.treshold) {
            field.dropdown('hide');
            return 0;
        }

        let items = field.next();

        items.html('');

        const keys = Object.keys(opts.source);

        let pattern = new RegExp(lookup.replace(/[^A-Za-z0-9]/g, ' ').replace(/\s/g, '(.*)'), 'gi');

        keys.filter((key) => {
            return key.match(pattern);
        })
            .slice(0, opts.maximumItems)
            .map((key) => {
                const object = opts.source[key];

                const item = {
                    label: opts.label ? object[opts.label] : key,
                    value: opts.value ? object[opts.value] : object,
                };

                items.append(createItem(lookup, item, opts));
            });

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
        _field.after('<div class="dropdown-menu"></div>');
        _field.dropdown(opts.dropdownOptions);
        
        this.off('click').click(function(e) {
            if (createItems(_field, opts) == 0) {
                // prevent show empty
                e.stopPropagation();
                _field.dropdown('hide');
            };
        });

        // show options
        this.off('keyup').keyup(function() {
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
