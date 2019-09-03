(function ($) {
    var defaults = {
        treshold: 4,
        maximumItems: 5
    };
    $.fn.autocomplete = function (options) {
        // merge options with default
        var opts = $.extend(defaults, options);
        var _field = $(this);
        // attach dropdown
        _field.parent().addClass('dropdown');
        _field.attr('data-toggle', 'dropdown');
        _field.addClass('dropdown-toggle');
        _field.after('<div class="dropdown-menu"></div>');
        _field.dropdown(opts.dropdownOptions);
        // show options
        this.keyup(function () {
            var lookup = _field.val();
            if (lookup.length < opts.treshold) {
                _field.dropdown('hide');
                return;
            }
            var items = _field.next();
            items.html('');
            var count = 0;
            var keys = Object.keys(opts.source);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var object = opts.source[key];
                var label = opts.label ? object[opts.label] : key;
                var value = opts.value ? object[opts.value] : object;
                if (label.toLowerCase().indexOf(lookup.toLowerCase()) >= 0) {
                    items.append('<button type="button" class="dropdown-item" data-value="' + value + '">' + label + '</button>');
                    if (++count > opts.maximumItems) {
                        break;
                    }
                }
            }
            // option action
            _field.next().find('.dropdown-item').click(function () {
                _field.val($(this).html());
                if (opts.onSelectItem) {
                    opts.onSelectItem({
                        value: $(this).data('value'),
                        label: $(this).html()
                    });
                }
            });
            _field.dropdown('show');
        });
        return this;
    };
}(jQuery));
