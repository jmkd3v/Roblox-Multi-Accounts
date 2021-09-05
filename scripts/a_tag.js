document.addEventListener("DOMContentLoaded", () => {
  // alternate handler for "a" elements that works in Chrome extensions.
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    (function () {
      var ln = links[i];
      var loc = ln.href;
      ln.onclick = function () {
        chrome.tabs.create({ active: true, url: loc });
      };
    })();
  }
});
