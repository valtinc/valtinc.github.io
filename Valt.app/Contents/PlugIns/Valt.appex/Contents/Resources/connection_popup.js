// FIXME: Make this work cross-browser.
var browser = chrome;

function submit() {
    browser.tabs.query({active: true}, function(tab) {
        browser.tabs.update(tab.id, {url: "valt-dev://launch-worker"});
    });
    window.close();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('valt-connection-failure-form')
        .addEventListener('submit', submit);
});
