$(document).ready(function () {
  const $input = $("#tweet-text");

  $input.on("keyup", function {
    const remainingChar = 140 - $(this).val().length;
    const counter = $("output.counter");
    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.css("color", "red");
    }
    if (remainingChar >= 0) {
      counter.css("color", "black");
    }
  });
});
