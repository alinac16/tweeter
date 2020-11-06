// 1. target msg container
// 2. create click handler on text
// 3. create msg content
// 4. append msg content into msg container

// 1.

$(document).ready(function () {
  console.log("Ready!!!!!");
  const $input = $(".write-tweet");
  console.log($input);

  $input.click(function () {
    console.log("IM CLICKED");
    // prepend
    $(".new-tweet").append(`
        <h2>Compose Tweet</h2>
        <form method="POST" action="/tweets">
          <div class="input-wrapper">
            <input
              name="text"
              id="tweet-text"
              class="form-control"
              placeholder="What are you humming about?"
            ></input>
            <label for="tweet-text" class="control-label">
              What are you humming about?
            </label>
          </div>
        </form>
        <div class="submit-wrapper">
          <button type="submit" action="post">
            Tweet
          </button>
          <output name="counter" class="counter" for="tweet-text">
            140
          </output>
        </div>`);

    $input.off("click");

    $("#tweet-text").on("keyup", function () {
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
});
