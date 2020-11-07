// 1. target msg container
// 2. create click handler on text
// 3. create msg content
// 4. append msg content into msg container

// 1.
const maxChar = 140;

$(document).ready(function () {
  console.log("Ready!!!!!");
  const $input = $(".write-tweet");
  console.log($input);

  $input.click(function () {
    console.log("IM CLICKED");
    // prepend
    $(".new-tweet").append(`
        <h2>Compose Tweet</h2>
        <form id="post-tweet" method="POST" action="/tweets">
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
            ${maxChar};
          </output>
        </div>`);

    $input.off("click");

    $("#tweet-text").on("keyup", function () {
      const remainingChar = maxChar - $(this).val().length;
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

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

// function that create tweet element
const createTweetElement = function (tweetData) {
  $tweet = $("<article>").addClass("tweet");
  const html = `<header>
            <div class="tweet-user">
              <img
                src=${tweetData.user.avatars}
              />
              <h1>${tweetData.user.name}</h1>
            </div>
            <h2>${tweetData.user.handle}</h2>
          </header>
          <div class="tweet-body">
            <p>${tweetData.content.text}</p>
          </div>
          <footer>
            <p>${getCurrentTime(tweetData.created_at)}</p>
            <span>
              <i class="material-icons"> favorite </i>
            </span>
          </footer>`;
  $tweet = $tweet.append(html);
  return $tweet;
};

const renderTweets = function (tweets) {
  //loops through tweets
  const $html = $("<div></div>");
  // calls createTweetElement for each tweet
  tweets.forEach(tweet => {
    $html.prepend(createTweetElement(tweet));
  });
  // takes return value and appens it to the tweets container
  $("#tweets-container").append($html);
};

const getCurrentTime = function (date) {
  const currentDate = Date.now();
  const howLongInMinute = (currentDate - date) / 1000 / 60;
  const howLongInHour = (currentDate - date) / 1000 / 60 / 60;
  if (howLongInMinute < 1) {
    return `${Math.floor(howLongInMinute)} second ago`;
  } else if (howLongInMinute < 60) {
    return `${Math.floor(howLongInMinute)} minutes ago`;
  } else if (howLongInHour < 24) {
    return `${Math.floor(howLongInHour)} hours ago`;
  } else {
    `${Math.floor(howLongInHour / 24)} days ago`;
  }
};

// POSTs a serialized tweet to the /tweets route
const submitTweet = function (newTweet) {
  $.post("/tweets", newTweet)
    .done(res => {
      $("#new-tweet form").trigger("reset");
      $("#new-tweet .counter").text(MAXCHARS);
      loadTweets();
    })
    .fail(err => {
      console.error(err);
    });
};
