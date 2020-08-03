(function () {
  function flashCopyMessage(el, msg, def) {
    el.textContent = msg;
    setTimeout(function () {
      el.textContent = def;
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    var lang = containerEl.firstElementChild.firstElementChild.getAttribute("data-lang");
    copyBtn.textContent = "Copy (" + lang + ")";

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function () {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        flashCopyMessage(copyBtn, 'Copied!',copyBtn.textContent)
      } catch (e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed...',copyBtn.textContent)
      }
    });

    containerEl.prepend(copyBtn);
  }

  var highlightBlocks = document.getElementsByClassName('highlight');
  for (var i = 0; i < highlightBlocks.length; i++) {
    addCopyButton(highlightBlocks[i]);
  }
})();
