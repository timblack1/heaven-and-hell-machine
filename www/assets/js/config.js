define(
   [
    'underscore',
    'jquery',
    'jquery_couch'
    ],
    function(_, $){
        // TODO: Run unit tests on test copy of the database
        var run_jasmine_tests = false,
            // Select view to load at root URL
            //default_view = 'find_a_church_view',
            //default_view = 'import_directory_view',
            // After running tests,
            //   Display this in the address bar: (to facilitate manually refreshing the page by
            //   hitting F5)
            test_home_address = 'index.html',
            // Whether to use the questions in the "original_number" or "new_number" set
            use_new_numbers = false;

       return {
           run_jasmine_tests:run_jasmine_tests,
           test_home_address:test_home_address,
           //default_view:default_view,
           use_new_numbers:use_new_numbers
       }
    }
)
