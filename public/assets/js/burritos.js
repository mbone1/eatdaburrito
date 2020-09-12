// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var isDevoured = $(this).data("isdevoured");

        var newDevouredState = {
            devoured: isDevoured
        };

        // Send the PUT request.
        $.ajax("/api/burritos/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
                console.log("changed devoured state to", isDevoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurrito = {
            burrito_name: $("#bu").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burritos", {
            type: "POST",
            data: newBurrito
        }).then(
            function() {
                console.log("created new burrito");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});