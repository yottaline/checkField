function checkField(elem, option)
{
	if($(elem).length === 0)
	{
		console.err("Field element is not exist.");
		return false;
	}else if(typeOf(option.url) === "undefined")
	{
		console.err("URL option is not defined. You have to define the url.");
		return false;
	}
	
	
    this.url = option.url;
    this.name = option.name;
    this.msg = option.msg;

    this.elem = $(elem);
    this.input = this.elem.find('input');
    this.check_error = this.elem.find('i.check-error');

    this.reset = () => {
        this.elem.removeClass('check-true');
        this.elem.removeClass('check-false');
        this.check_error.hide();
    };

    this.check = () => {
        var elem = this.elem;
        var checkError = this.check_error;
        var field = this.name;
        var input = this.input;
        var value = $.trim(this.input.val());
        var msg = this.msg;

        if(value === "") return;

        $.post(this.url, 
        { field: field, value: value, uid: $("#record-modal").find('[name="user_id"]').val() }, 
        function(response){
            if(response.status)
            {
                if(response.result)
                {
                    var error = {};
                    error[input.attr('name')] = msg;
                    elem.addClass('check-false');
                    checkError.attr('title', msg);
                    checkError.fadeIn(250).fadeOut(250).fadeIn(250)
                        .fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
                    recordFormValidator.showErrors(error);
                }
                else elem.addClass('check-true');
            }
            else
            {

            }
        }, 'json');
    };

    this.input.on('focus', this.reset);
    this.input.on('blur', this.check);
}
