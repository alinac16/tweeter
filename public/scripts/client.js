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
            <p>${tweetData.created_at}</p>
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

renderTweets(data);
