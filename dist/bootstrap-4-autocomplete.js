(function ($) {
    var defaults = {
        treshold: 4,
        maximumItems: 5,
        highlightTyped: true,
        highlightClass: 'text-primary'
    };
    function createItem(lookup, item, opts) {
        var label;
        if (opts.highlightTyped) {
			var xarr = lookup.split(' ');
			label = item.label;
			for (var jj = 0; jj < xarr.length; jj++) {
			 if (xarr[jj] == ''){continue;}
             var idx = label.toLowerCase().indexOf(xarr[jj].toLowerCase());
			 var xkey = ('000'+idx);
			 xkey = xkey.substr(xkey.length-4)
			 xarr[jj] = xkey+xarr[jj];
			}
			xarr.sort();
			for (var jj = xarr.length-1; jj >= 0; jj--) {
             var idx = label.toLowerCase().indexOf(xarr[jj].substr(4,999).toLowerCase());
             label = label.substring(0, idx)
                + '<span class="' + expandClassArray(opts.highlightClass) + '">' + label.substring(idx, idx + xarr[jj].length - 4) + '</span>'
                + label.substring(idx + xarr[jj].length -4, label.length);
			}
        }
        else {
            label = item.label;
        }
        return '<button type="button" class="dropdown-item" data-value="' + item.value + '">' + label + '</button>';
    }
    function expandClassArray(classes) {
        if (typeof classes == "string") {
            return classes;
        }
        if (classes.length == 0) {
            return '';
        }
        var ret = '';
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var clas = classes_1[_i];
            ret += clas + ' ';
        }
        return ret.substring(0, ret.length - 1);
    }
    function createItems(field, opts) {
        var lookup = field.val();
        if (lookup.length < opts.treshold) {
            field.dropdown('hide');
            return 0;
        }
        var items = field.next();
        items.html('');
        var count = 0;
		var larr = lookup.split(' ');
        var keys = Object.keys(opts.source);
       for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var object = opts.source[key];
            var item = {
                label: opts.label ? object[opts.label] : key,
                value: opts.value ? object[opts.value] : object
            };
			found = 1;
			for (var j = 0; j < larr.length; j++) {
             if (item.label.toLowerCase().indexOf(larr[j].toLowerCase()) == -1) {found = 0;break;}
			}
			if (!found){continue;}
            items.append(createItem(lookup, item, opts));
            if (opts.maximumItems > 0 && ++count >= opts.maximumItems) {break;}
        }
        // option action
        field.next().find('.dropdown-item').click(function () {
            field.val($(this).text());
            if (opts.onSelectItem) {
                opts.onSelectItem({
                    value: $(this).data('value'),
                    label: $(this).text()
                }, field[0]);
            }
        });
        return items.children().length;
    }
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
        var dropdown = $('<div class="dropdown-menu" ></div>');
        // attach dropdown class
        if (opts.dropdownClass)
            dropdown.addClass(opts.dropdownClass);
        _field.after(dropdown);
        _field.dropdown(opts.dropdownOptions);
        this.off('click.autocomplete').click('click.autocomplete', function (e) {
            if (createItems(_field, opts) == 0) {
                // prevent show empty
                e.stopPropagation();
                _field.dropdown('hide');
            }
            ;
        });
        // show options
        this.off('keyup.autocomplete').keyup('keyup.autocomplete', function () {
            if (createItems(_field, opts) > 0) {
                _field.dropdown('show');
            }
            else {
                // sets up positioning
                _field.click();
            }
        });
        return this;
    };
}(jQuery));
