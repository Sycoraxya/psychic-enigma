/**
 * Created by Stefan on 20/05/2016.
 */
pushOptionInputs: function () {
    this.optionInputs = {};
    var options = $('.options');

    // Select
    webshop.optionInputs.selects = [];
    options.find('select').each(function () {
        webshop.optionInputs.selects.push($(this));
    });

    // Radio
    webshop.optionInputs.radios = {};
    options.find('input[type="radio"]').each(function () {
        var name = $(this).attr('name');
        if (webshop.optionInputs.radios[name] === undefined) {
            var option = webshop.optionInputs.radios[name] = [];
            option.push($(this));
        } else {
            webshop.optionInputs.radios[name].push($(this));
        }
    });

    // Checkbox
    webshop.optionInputs.checkboxes = {};
    options.find('input[type="checkbox"').each(function () {
        var name = $(this).attr('name');
        if(webshop.optionInputs.checkboxes[name] === undefined) {
            var option = webshop.optionInputs.checkboxes[name] = [];
            option.push($(this));
        } else {
            webshop.optionInputs.checkboxes[name].push($(this));
        }
    })
},

/**
 * pushes all inputs to the inputs array
 */
pushInputs: function () {
    this.form.find('input[type="text"]').each(function () {
        book.inputs.push($(this));
    });
    this.form.find('textarea').each(function () {
        book.inputs.push($(this));
    });
},