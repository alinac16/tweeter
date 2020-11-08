/* eslint-disable no-undef */
// fix styling

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
        />
        <label for="tweet-text" class="control-label">
          What are you humming about?
        </label>
      </div>
      <div class="submit-wrapper">
        <button type="submit" action="post">
        Tweet
        </button>
        <output name="counter" class="counter" for="tweet-text">
        ${maxChar}
        </output>
      </div>
      </form>`);

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

    const form = $("#post-tweet");

    form.submit(event => {
      event.preventDefault();
      const formData = form.serialize();

      const tweetLength = formData.split("=")[1].length;
      if (tweetLength > maxChar) {
        alert("Message too long!");
      } else if (tweetLength < 1) {
        alert("Please write your hummmm!");
      } else {
        submitTweet(formData);
        loadTweets().then(res => {
          renderTweets(res);
        });
      }
    });
  });
});

const loadTweets = function () {
  return $.get("/tweets", function (data) {
    return data;
  });
};

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  console.log("RENDER");
  const $html = $("<div></div>");
  // calls createTweetElement for each tweet
  tweets.forEach(tweet => {
    $html.prepend(createTweetElement(tweet));
  });
  // takes return value and appens it to the tweets container
  $(".tweet_container").append($html);
};

const getCurrentTime = function (date) {
  const currentDate = Date.now();
  const howLongInMinute = (currentDate - date) / 1000 / 60;
  const howLongInHour = (currentDate - date) / 1000 / 60 / 60;

  if (howLongInMinute < 60) {
    return `${Math.floor(howLongInMinute)} minutes ago`;
  }
  if (howLongInMinute < 1) {
    return `${Math.floor(howLongInMinute)} second ago`;
  }
  if (howLongInHour < 24) {
    return `${Math.floor(howLongInHour)} hours ago`;
  }
  return `${Math.floor(howLongInHour / 24)} days ago`;
};

// POSTs a serialized tweet to the /tweets route
const submitTweet = function (newTweet) {
  return $.post("/tweets", function (newTweet) {
    console.log(newTweet);
    return newTweet;
  });
};
