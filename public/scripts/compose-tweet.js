/* eslint-disable no-undef */
// fix styling

// 1.
const maxChar = 140;

$(document).ready(function () {
  console.log("Ready!!!!!");
  $(".write-tweet").click(function () {
    $("#tweet-text").focus();
  });

  $("#topBtn").click(function () {
    $("html").animate({ scrollTop: 0 }, "slow");
  });

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#topBtn:hidden").stop(true, true).fadeIn();
    } else {
      $("#topBtn").stop(true, true).fadeOut();
    }
  });

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

  const form = $("#post-tweet");

  form.submit(event => {
    event.preventDefault();
    const formData = form.serialize();

    const tweetLength = formData.split("=")[1].length;
    console.log(tweetLength);
    if (tweetLength > 140) {
      $(".error-message").html(
        `<span class="error-text">You're humming too long</span>`
      );
      // hide error message after 3 sec
      setTimeout(function () {
        $(".error-message").html(``);
      }, 2500);
    } else if (tweetLength < 1) {
      $(".error-message").html(
        `<span class="error-text">Please write your hummmm</span>`
      );
      setTimeout(function () {
        $(".error-message").html(``);
      }, 2500);
    } else {
      submitTweet(formData).then(res => {
        loadTweets().then(res => {
          renderTweets(res);
        });
      });
    }
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
              <p>${escape(tweetData.content.text)}</p>
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

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
  return $.post("/tweets", newTweet, function (newTweet) {
    return newTweet;
  });
};
