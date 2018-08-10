import $ from 'jquery';

/**** Submit Feedback ****/
$(document).ready(function() {
    $("#submitBtn").click(function() {

        var url = "/feedback";

        $.ajax({
            url: url,
            method: "POST",
            data: {
                score: $('input:radio[name=score]:checked').val(),
                score_reason: $('textarea[name=score_reason]').val(),
                email: $('[name=email]').val()
            },
            success: function() {
                // $this.toggleClass('btn btn-success');
                // $this.html(html);
                clear_form_elements("clearForm");
                $("#myModal").modal('toggle');
            },
            error: function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            }
        });

    });
});

function clear_form_elements(class_name) {
    $("." + class_name).find(':input').each(function() {
        switch (this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
                break;
        }
    });
}
