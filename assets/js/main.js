/*
    Prologue by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
import jQuery from './jquery.min.js';

import breakpoints from "./breakpoints.min.js";
(function($, breakpoints) {

    const $window = $(window);
    const $body = $('body');
    const $blog = $('blog');
    const $nav = $('#nav');

    // Breakpoints.
        breakpoints({
            wide:      [ '1447px',  '1880px' ],
            normal:    [ '1280px',  '1446px' ],
            narrow:    [ '800px',  '1279px' ],
            narrower:  [ '401px',  '799px'  ],
            mobile:    [ null,     '399px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    $.ajax('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=jacobmparis', {
        headers: {
            Origin: 'localhost:5000'
        },
        success: result => {
            console.log(result);
        }
    });

    // Nav.
        const $nav_a = $nav.find('a');

        $nav_a
            .addClass('scrolly')
            .on('click', function(e) {

                const $this = $(this);

                // External link? Bail.
                    if ($this.attr('href').charAt(0) != '#')
                        return;

                // Prevent default.
                    e.preventDefault();

                // Deactivate all links.
                    $nav_a.removeClass('active');

                // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                    $this
                        .addClass('active')
                        .addClass('active-locked');

            })
            .each(function() {

                const $this = $(this);
                const id = $this.attr('href');
                const $section = $(id);

                // No section for this link? Bail.
                    if ($section.length < 1)
                        return;

                // Scrollex.
                    $section.scrollex({
                        mode: 'middle',
                        top: '-10vh',
                        bottom: '-10vh',
                        initialize: function() {

                            // Deactivate section.
                                $section.addClass('inactive');

                        },
                        enter: function() {

                            // Activate section.
                                $section.removeClass('inactive');

                            // No locked links? Deactivate all links and activate this section's one.
                                if ($nav_a.filter('.active-locked').length == 0) {

                                    $nav_a.removeClass('active');
                                    $this.addClass('active');

                                }

                            // Otherwise, if this section's link is the one that's locked, unlock it.
                                else if ($this.hasClass('active-locked'))
                                    $this.removeClass('active-locked');

                        }
                    });

            });

    // Scrolly.
        $('.scrolly').scrolly();

    // Header (narrower + mobile).

        // Toggle.
            $(
                '<div id="headerToggle">' +
                    '<a href="#header" class="toggle"></a>' +
                '</div>'
            )
                .appendTo($body);

        // Header.
            $('#header')
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'header-visible'
                });

})(jQuery, breakpoints);