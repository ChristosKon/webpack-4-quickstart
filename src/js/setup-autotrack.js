import $ from 'jquery';
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/social-widget-tracker';

function setUpAutotrack(pageName) {
    if (pageName === 'app') {
        $('a, input, .btn, button').attr({
            'ga-on': 'click',
            'ga-event-category': pageName
        });

        $('#now-filter').attr('ga-event-action', 'now-option');
        $('#today-filter').attr('ga-event-action', 'today-option');
        $('#tomorrow-filter').attr('ga-event-action', 'tomorrow-option');
        $('#other-day-filter').attr('ga-event-action', 'other-day-option');

        $('#type1').attr('ga-event-action', 'all-option');
        $('#party-filter').attr('ga-event-action', 'parties-option');
        $('#food-filter').attr('ga-event-action', 'food-option');
        $('#standup-filter').attr('ga-event-action', 'standup-option');
        $('#traditional-filter').attr('ga-event-action', 'traditional-option');
        $('#live-filter').attr('ga-event-action', 'live-option');
        $('#student-filter').attr('ga-event-action', 'student-option');
        $('#theater-filter').attr('ga-event-action', 'theater-option');
        $('#movie-filter').attr('ga-event-action', 'movie-option');
        $('#latin-filter').attr('ga-event-action', 'latin-option');
        $('#other-filter').attr('ga-event-action', 'other-option');
        $('#christmas-filter').attr('ga-event-action', 'xmas-option');
        $('#carnival-filter').attr('ga-event-action', 'carnival-option');

        $('#close-sub-prompt').attr('ga-event-action', 'dismissed-sub-prompt');
        $('#subscription-confirm').attr('ga-event-action', 'clicked-subscribe-button');
        $('#subscription-email').attr('ga-event-action', 'clicked-email-field');

        $('#switch-mode-button').attr('ga-event-action', 'switched-view-mode');

        $('#feedback_button').attr('ga-event-action', 'feedback-button');
        $('#help_button').attr('ga-event-action', 'help-button');
        $('#organizer_button').attr('ga-event-action', 'organizer-button');
        $('#submitBtn').attr('ga-event-action', 'submit-feedback');
        $('[data-dismiss="modal"]').attr('ga-event-action', 'cancel-feedback');
    } else {
        $('#mainNav a, footer a, .btn, button').attr({
            'ga-on': 'click',
            'ga-event-category': pageName
        });

        $('#organiserLoginButton').attr('ga-event-action', 'organiser-login');
        $('#formClose').attr('ga-event-action', 'organiser-login-close');
        $('#formSubmit').attr('ga-event-action', 'organiser-login-submit');
        $('.modal-content .close').attr('ga-event-action', 'organiser-login-close');

        $('#nav_about_link').attr('ga-event-action', 'header-about');
        $('#nav_cover_link').attr('ga-event-action', 'header-cover');
        $('#nav_services_link').attr('ga-event-action', 'header-stay-tuned');
        $('#nav_contact_link').attr('ga-event-action', 'header-contact');

        $('#footer_fb_link').attr('ga-event-action', 'footer-fb');
        $('#footer_g+_link').attr('ga-event-action', 'footer-g+');
        $('#footer_home_link').attr('ga-event-action', 'footer-home');
        $('#footer_app_link').attr('ga-event-action', 'footer-app');
        $('#footer_venues_link').attr('ga-event-action', 'footer-venues');
        $('#footer_contact_link').attr('ga-event-action', 'footer-contact');
        $('#footer_tos_link').attr('ga-event-action', 'footer-tos');
        $('#footer_privacy_link').attr('ga-event-action', 'footer-privacy');
        $('#footer_sitemap_link').attr('ga-event-action', 'footer-sitemap');

        switch (pageName) {
            case 'home':
                $('#see_events_top').attr('ga-event-action', 'see-events-top');
                $('#see_events_cover').attr('ga-event-action', 'see-events-cover');
                $('#subscribe_button').attr('ga-event-action', 'subscribe');
                $('#send_mail_button').attr('ga-event-action', 'send-email');
                break;
            case 'venues':
                $('#see_events').attr('ga-event-action', 'see-events');
                break;
            case 'eventpage':
                $('#url-field').attr({
                    'ga-event-action': 'copy-event-url'
                });
                $('#go-to-fb-page').attr({
                    'ga-event-action': 'visit-event-fb-page'
                });
                break;
            default:
                break;
        }
    }

    ga('require', 'eventTracker');
    ga('require', 'socialWidgetTracker');
}

export default setUpAutotrack;
