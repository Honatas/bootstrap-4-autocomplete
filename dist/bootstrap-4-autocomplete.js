(function ($) {
    var defaults = {
        treshold: 4,
        maximumItems: 5
    };
    $.fn.autocomplete = function (options) {
        // merge options with default
        var opts = {};
        $.extend(opts, defaults, options);
        var _field = $(this);
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
        // setup positioning and prevent show empty
        this.off('click').click(function () {
            var lookup = _field.val();
            if (lookup.length < opts.treshold) {
                _field.dropdown('hide');
                return;
            }
        });
        // show options
        this.off('keyup').keyup(function () {
            console.log(opts.source);
            _field.click();
            var lookup = _field.val();
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
            if (items.children().length == 0) {
                return;
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
