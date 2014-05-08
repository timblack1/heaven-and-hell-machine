define(
   [
    'underscore',
    'jquery',
    'jquery_couch'
    ],
    function(_, $){
       // Dynamically get the database name
       // TODO: This won't work anymore if we use vhosts
       // TODO: Run unit tests on test copy of the database
        var db_name = window.location.pathname.split('/')[1],
            db = $.couch.db(db_name),
            run_jasmine_tests = false,
            // Select view to load at root URL
            //default_view = 'find_a_church_view',
            //default_view = 'import_directory_view',
            // After running tests,
            //   Display this in the address bar: (to facilitate manually refreshing the page by
            //   hitting F5)
            test_home_address = 'index.html',
            // Run locally
            port = '5984',
            domain = 'localhost',
            // Or run remotely
//            port = '80',
//            domain = 'arwd.iriscouch.com';
            // Whether to use the questions in the "original_number" or "new_number" set
            use_new_numbers = false;

       return {
           db_name:db_name,
           db:db,
           port:port,
           domain:domain,
           run_jasmine_tests:run_jasmine_tests,
           test_home_address:test_home_address,
           //default_view:default_view,
           use_new_numbers:use_new_numbers
       }
    }
)
