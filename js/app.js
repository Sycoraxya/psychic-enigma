/**
 * Created by Stefan on 20/05/2016.
 */
/**
 * Handles input validation and success/error message displaying.
 */
var validate = {
    errors: false,
    /**
     * Takes an array of text inputs ("text", "email", etc.) and validates the values. Sets the errors
     * variable to true and returns false if an error is found.
     *
     * Usage:
     * validate.check([$('#share-popup input[type="email"]')]);
     *
     * @param {array} elements
     */
    check: function (elements) {
        this.errors = false;
        for (i=0; i < elements.length; i++) {
            var self = elements[i],
                required = $(self).prop('required');
            // Add conditions here
            if (required && self.val() === '') { // Required check
                this.displayMessage(self.parent(), 'error', 'Dit veld is verplicht.');
                this.errors = true;
            } else if (required && $(self).hasClass('email') && !this.email(self)) { // Email check
                this.displayMessage(self.parent(), 'error', 'Dit is geen geldig e-mailadres.');
                this.errors = true;
            }
        }
        if(this.errors) {
            return false;
        } else {
            return true;
        };
    },
    /**
     * Takes an object and loops through all the selects, radios and checkboxes in that object. Sets the errors variable
     * to true and returns false if an error is found.
     *
     * See validate.select, validate.radio or validate.checkbox for instructions on how to use them
     *
     * @param {object} elements
     * @returns {boolean}
     */
    checkOptions: function (elements) {
        this.errors = false;
        if(elements.hasOwnProperty("selects")) {
            // Loop through all select properties
            for (i = 0; i < elements.selects.length; i++) {
                var self = elements.selects[i];
                if (!this.select(self)) {
                    this.displayMessage(self.parent(), 'error', 'Deze optie is verplicht.');
                    this.errors = true;
                }
            }
        }

        if(elements.hasOwnProperty("radios")) {
            // Loop through all radio properties
            Object.keys(elements.radios).forEach(function (key, index) {
                if (!validate.radio(elements.radios[key])) {
                    var key = key.replace('[', '-').replace(']', '');
                    validate.displayMessage($('#' + key), 'error', 'Deze optie is verplicht.');
                    validate.errors = true;
                }
            });
        }

        if(elements.hasOwnProperty("checkboxes")) {
            // Loop through all checkbox properties
            Object.keys(elements.checkboxes).forEach(function (key, index) {
                if (!validate.checkbox(elements.checkboxes[key])) {
                    var key = key.replace('[', '-').replace(/[^a-zA-Z0-9-]+/g, '')
                    validate.displayMessage($('#' + key), 'error', 'Deze optie is verplicht.');
                    validate.errors = true;
                }
            });
        }

        if(this.errors) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Returns true if the specified required select element's selected option is not
     * the first one.
     *
     * To check one element:
     * var element = $('#option-438 select');
     * console.log(validate.select(element));
     *
     * To check an array of elements:
     * var elements = [$('#option-448 select'), $('#option-445 select')];
     * validate.checkOptions({selects: elements});
     *
     * @param {element} element
     * @returns {Boolean}
     */
    select: function (element) {
        var required = element.prop('required');
        if (required && element[0].selectedIndex === 0) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Returns true if the radio elements of the specified group are :
     * 1: required & one of them is checked
     * 2. not required
     *
     * To check a radio name group:
     * var elements = {'option[447]': [$('#option-447 input')]};
     * validate.checkOptions({radios: elements});
     *
     * @param {array} elements
     * @returns {boolean}
     */
    radio: function (elements) {
        var elementChecks = [];
        for (i=0; i < elements.length; i++) {
            var required = elements[i].prop('required');
            if(required && elements[i].is(':checked')) {
                elementChecks.push(true)
            } else if (required && !elements[i].is(':checked')) {
                elementChecks.push(false)
            } else {
                elementChecks.push(true);
            }
        }
        if (elementChecks.indexOf(true) !== -1) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Returns true if the checkbox elements of the specified group are :
     * 1: required & one of them is checked
     * 2. not required
     *
     * To check a checkbox name group:
     * var elements = {'option[446]': [$('#option-446 input')]};
     * validate.checkOptions({checkboxes: elements});
     *
     * @param {array} elements
     * @returns {boolean}
     */
    checkbox: function(elements) {
        var elementChecks = [];
        for (i=0; i < elements.length; i++) {
            var required = elements[i].prop('required');
            if(required && elements[i].is(':checked')) {
                elementChecks.push(true)
            } else if (required && !elements[i].is(':checked')) {
                elementChecks.push(false)
            } else {
                elementChecks.push(true);
            }
        }
        if (elementChecks.indexOf(true) !== -1) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Returns true if the specified input element's value is a valid email address
     * @param {element} element
     * @returns {Boolean}
     */
    email: function (element) {
        var email = element.val(),
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    /**
     * Appends the element of the provided type with the provided message to
     * the given element.
     * @param {element} element
     * @param {string} type     e.g. : "book_succes", "book_error", "success", "error"
     * @param {string} message
     */
    displayMessage: function (element, type, message) {
        element.append('<span class="' + type + ' message">' + message + '</span>');
    },
    /**
     * Clears all success and error messages currently displayed.
     */
    clearMessages: function () {
        $('.message').remove();
    }
};