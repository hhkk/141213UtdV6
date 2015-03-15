'use strict';

// Commands controller
angular.module('commands').controller('CommandsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Commands',
    function($scope, $stateParams, $location, Authentication, Commands) {
        $scope.authentication = Authentication;

        $scope.commandData = [
            ['Domain(LeanDomain)','dm','http://www.leandomainsearch.com/search?q=%s'],
            ['Google>Search','g','https://www.google.com/search?q=%s'],
            ['Amazon','a','http://www.amazon.com/s?field-keywords=%s'],
            ['Amazon Instant Video','av','http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=%s'],
            ['Bing','b','http://www.bing.com/?q=%s'],
            ['CraigsBoston','cr','http://boston.craigslist.org/search/?areaID=4&subAreaID=&query=%s&catAbb=sss'],
            ['Wikipedia','k','http://en.wikipedia.org/wiki/%s'],
            ['Google>Contacts','cn','https://mail.google.com/mail/#contacts/search/%s'],
            ['Ebay','eb','http://www.ebay.com/sch/i.html?_nkw=%s'],
            ['Google>Mail','e','https://mail.google.com/mail/#search/%s'],
            ['Google>Docs','d','https://drive.google.com/?tab=po&authuser=0#search/%s'],
            ['Google>Calendar','c','https://www.google.com/calendar/render?tab=oc&q=%s'],
            ['Google>Images','i','https://www.google.com/search?q=%s&view=0&tbm=isch&source=og'],
            ['Google>Maps','m','http://maps.google.com/maps?q=%s&view=0&hidden=1'],
            ['Google>Plus','gp','https://plus.google.com/s/%s'],
            ['Google>Reader','gr','http://www.google.com/reader/view/#search/%s'],
            ['Google>Scholar','gs','http://scholar.google.com/scholar?q=%s'],
            ['Google>Tasks','t','https://mail.google.com/tasks/m?pli=1?SAVE_WHATS_TO_THE_RIGHT_HERE_(YOUR_NAME_HERE)=%s'],
            ['Google>Youtube','y','http://www.youtube.com/results?search_query=%s&view=0&hidden=1'],
            ['Google>News','n','http://news.google.com/?q=%s&view=0&hidden=1'],
            ['Google>Books','gb','https://www.google.com/search?q=%s&btnG=Search+Books&tbm=bks&tbo=1'],
            ['NewEgg','ne','http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=%s=0&y=0'],
            ['NYT','ny','http://query.nytimes.com/gst/sitesearch_selector.html?query=%s&type=nyt&x=0&y=0'],
            ['Reddit','r','http://www.reddit.com/search?q=%s'],
            ['SamAshMusic','sa','http://www.samash.com/webapp/wcs/stores/servlet/CatalogSearchResultView?storeId=10052&catalogId=10002&langId=-1&pageSize=12&beginIndex=0&sType=SimpleSearch&resultCatEntryType=2&ipstate=&iptext=%s&ip_requestUri=TopCategoriesDisplay&ip_categoryId=&ip_mode=&x=0&y=0&wcsiptext=&iscached=)'],
            ['Google>Shopping','s','https://www.google.com/search?q=%s&tbm=shop'],
            ['Facebook','f','https://www.facebook.com/search/results.php?q=%s'],
            ['Twitter','tw','https://twitter.com/search?q=%s'],
            ['Weather','wt','http://weather.com'],
            ['Thesaurus','th','http://www.merriam-webster.com/dictionary/%s']
        ];




        // Create new Command
        $scope.hkAddNewCommandData = function() {
            // Create new Command object
            try {
                //alert ('in hkAddNewCommandData');
                for (var i = 0; i < $scope.commandData.length; i++)
                {
                    //alert ('in hkAddNewCommandData in for');
                    var command = new Commands ({
                        commandDescription: $scope.commandData[i][0],
                        commandCode: $scope.commandData[i][1],
                        commandUrl: $scope.commandData[i][2]
                    });
                    //alert ('in hkAddNewCommandData in for data commandDescription: '+ command.commandDescription);
                    // Redirect after save
                    command.$save(function(response) {
                    //$location.path('commands/' + response._id);
                    // Clear form fields
                    //$scope.name = '';
                    console.log ('success:');
                }, function(errorResponse) {
                    alert ('era:' + errorResponse.data.message);
                });

                }
                //alert ('in hkAddNewCommandData2');

            } catch (err) {
                alert('err in hkAddNewCommandData ' + err);
            }
        };

        // Create new Command
        $scope.create = function() {
            // Create new Command object
            var command = new Commands ({
                commandCode: this.commandCode,
                commandUrl: this.commandUrl,
                commandDescription: this.commandDescription
            });

            // Redirect after save
            command.$save(function(response) {
                alert ('in create2a');
                $location.path('commands/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                alert ('in create2b');
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Command
        $scope.remove = function(command) {
            if ( command ) {
                command.$remove();

                for (var i in $scope.commands) {
                    if ($scope.commands [i] === command) {
                        $scope.commands.splice(i, 1);
                    }
                }
            } else {
                $scope.command.$remove(function() {
                    $location.path('commands');
                });
            }
        };

        // Update existing Command
        $scope.update = function() {
            var command = $scope.command;

            command.$update(function() {
                $location.path('commands/' + command._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Commands
        $scope.find = function() {
            //alert ('in here mom');
            $scope.commands = Commands.query({commandDescription:/ia/});
            $scope.counthk = 1;
        };

        // Find existing Command
        $scope.findOne = function() {
            $scope.command = Commands.get({
                commandId: $stateParams.commandId
            });
        };
    }
]);
