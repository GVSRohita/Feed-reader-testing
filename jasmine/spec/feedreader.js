/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {

        /* This test tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object to ensure that it has
         * a URL defined and is not empty.
         */
        it('have urls', function () {
            for (var i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
        });

        /* loops through each feed in the allFeeds object and ensures it has 
         * a name defined and that the name is not empty.
         */
        it('have names', function () {
            for (var i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });
    });


    /* This test-suite is for "The menu" */
    describe('The menu', function () {
        //menu is hidden with toggle class
        var hideMenu = $('body').hasClass('menu-hidden');

        /* This is for testing whether menu element is hidden by default. It 
         * also analyzes the HTML and the CSS to determine how the
         * hiding/showing of the menu element performed.
         */
        it('menu is hidden by default', function () {
            expect(hideMenu).toEqual(true);
        });

        /* This checks the menu changes visibility aspect.
         * It check body has and does not have .menu-hidden on 
         * every other click of menu-icon
         */
        var menuIcon = $('.menu-icon-link');
        it('visibility changes when icon is clicked', function () {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    /* Test suite "Initial Entries" */
    describe('Initial Entries', function () {

        /* It tests whether loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        //checks to see if at least 1 feed entry has been added
        it('feed container has minimum of 1 entry', function () {
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });

    /* Test suite: "New Feed Selection" */
    describe('New Feed Selection', function () {
        //initially loaded feed setup
        var initialFeedSelection;
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                initialFeedSelection = $('.feed').html();
                loadFeed(1, function () {
                    done();
                });
            });
        });

        //It checks whether the content changes when the new feed is loaded
        it('changes the content loaded', function () {
            //the changed feed setup
            var newFeedSelection;
            newFeedSelection = $('.feed').html();
            expect(newFeedSelection).toBeDefined();
            expect(initialFeedSelection).not.toEqual(newFeedSelection);
        });
    });
}());
