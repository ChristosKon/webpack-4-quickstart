/*eslint semi: ["off"]*/
var analyticsURL;

if (process.env.NODE_ENV === 'production') {
    analyticsURL = 'https://www.google-analytics.com/analytics.js';
} else {
    analyticsURL = 'https://www.google-analytics.com/analytics_debug.js';
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script',analyticsURL,'ga');

// window.ga_debug = {trace: true};
ga('create', 'UA-82875362-1', 'auto');

//Stub the send method (https://en.wikipedia.org/wiki/Method_stub)
//https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging#testing_your_implementation_without_sending_hits
if (process.env.NODE_ENV !== 'production') {
    ga('set', 'sendHitTask', function(model) {
        // console.log(model);
        var log = {
            devId: model.get('&did'),
            hitType: model.get('&t'),
            eventCategory: model.get('eventCategory'),
            eventAction: model.get('eventAction'),
            eventLabel: model.get('eventLabel'),
            eventValue: model.get('eventValue')
        };
        console.debug('Hit info: ', log);
    });
}

ga('send', 'pageview');

// ga(function(tracker) {
//     // Logs the tracker created above to the console.
//     console.debug('Created tracker: ', tracker);
// });
