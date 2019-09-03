interface AutocompleteItem {
    value: string;
    label: string;
}
interface AutocompleteOptions {
    source?: object;
    treshold?: number;
    maximumItems?: number;
    value?: string;
    label?: string;
    dropdownOptions?: Bootstrap.DropdownOption;
    onSelectItem?: (item: AutocompleteItem) => void;
}
interface JQuery {
    autocomplete(options: AutocompleteOptions): JQuery<HTMLElement>;
}
