// TODO:  https://www.nodejitsu.com/forward/#/terms says:
//  "You must provide legally adequate privacy notice and protection for End Users. 
//  If End Users provide you with user names, passwords, or other login information
//  or personal information, you must make the users aware that the information will
//  be available to your application and to Nodejitsu."
// TODO: Try running the following after iriscouch replies:
//  jitsu database create couch hhm
//  Then follow https://github.com/timblack1/heaven-and-hell-machine
require.config({
  waitSeconds: 15000,
  paths: {
      "async": "vendor/requirejs-plugins/src/async",
      "backbone": "vendor/backbone/backbone",
      "backbone_hoodie": "vendor/backbone-hoodie/src/backbone-hoodie",
      "backbone_relational": "vendor/backbone-relational/backbone-relational",
      "bootstrap": "vendor/bootstrap/dist/js/bootstrap.min",
      "buzz": "vendor/buzz/dist/buzz",
      "config": "config",
      "hoodie": "/_api/_files/hoodie", // needs to be made available here for backbone-hoodie to require
      "jquery": "vendor/jquery/dist/jquery.min",
      // Commented out because it uses $.browser, which is deprecated
      // But this may break msie compatibility!
      //"jquery_couch": "/_utils/script/jquery.couch",
      // TODO:  Is this still needed?
      "jquery_couch": "jquery.couch",
      "jquery_migrate": "vendor/jquery-migrate/jquery-migrate",
      "model": "model",
      "mustache": "vendor/mustache/mustache",
      "text": "vendor/requirejs-text/text",
      "underscore": "vendor/underscore/underscore"
  },
  shim: {
      backbone: {
          deps: ["jquery", "underscore"],
          exports: "Backbone"
      },
      backbone_relational: {
          deps: ["backbone"]
      },
      backbone_hoodie: {
          deps: ["backbone_relational"],
          init: function(){
              // TODO: Handle injecting Backbone.RelationalModel into backbone_hoodie here
              // return this.
          },
          exports: 'Backbone'
      },
      // TODO: Use require-css to inject the CSS as needed
      "bootstrap": {
          deps: ["jquery"]
      },
      "bootstrap_modalform":{
          deps: ["bootstrap"]
      },
      jquery_couch: {
          deps: ["jquery", "jquery_migrate"]
      },
      jquery_migrate: {
          deps: ["jquery"]
      },
      model: {
          deps: ["jquery", "config", "backbone_hoodie"]
      },
      mustache: {
          exports: ["Mustache"]
      },
      underscore: {
          exports: '_'
      }
  }
});
// Define require() from require.js using the standard AMD define

require(
   [
    'config',
    'model',
    'views/main',
    'text!views/Credits.html',
    'text!views/image_pages.html',
    'text!views/QuestionAnswerContainer/audio_pages.html',
    'mustache',
    'underscore',
    'backbone_hoodie',
    'jquery_couch'
    ], 
    function(
             config,
             model,
             views,
             CreditsTemplate,
             image_pages,
             audio_pages,
             Mustache
        ){

       // Create main application
        var App = Backbone.Router.extend({
            initialize : function(){
                // Make it easy to reference this object in event handlers
                //_.bindAll(this, 'find_a_church', 'import_directory')
                // This is needed to get hoodie.accountbar.bootstrap.js to work.
                hoodie = new Hoodie()
            },
            // Set up URLs here
            // TODO: Set CouchDB routing for URLs it doesn't understand.  Is there a way to do this
            //    without duplicating what is written here?
            //    http://blog.couchbase.com/what%E2%80%99s-new-apache-couchdb-011-%E2%80%94-part-one-nice-urls-rewrite-rules-and-virtual-hosts
            //    Maybe in this.initialize we can dynamically get ddoc.rewrites, iterate through it, 
            //    and dynamically create this.routes in the correct data format, 
            //    which is {'url':'function_name',...}.
            //    (misunderstood_url)
            routes: {
                "index.html":                    "index.html"
            },
            render:function(){
//                 this.menu_view = new views.MenuView({ el: $(".navbar") });
//                 this.menu_view.render()
//                 this.find_a_church_view = new views.FindAChurchView({ el: $("#content") });
//                 this.import_directory_view = new views.ImportDirectoryView({ el: $("#content") });
                // This renders the default view for the app
                // TODO:  If the page loaded from a different view's URL, load that view instead
                //    Maybe we can handle that in the router below.
                //  load-correct-view-from-url-on-first-load
//                 this.default_view = this[config.default_view]
//                 this.default_view.render()
                
                // TODO: Outline structure of main views & templates
                //  QuestionAnswerContainer
                //      Nav
                //      Question
                //          Heading: Number
                //          Text
                //          Buttons
                //          Answer
                //              Heading
                //              AnswerList
                //                  Scripture
                //                      Text
                //                      Reference
                //  Score
                //      You are going to: destination
                //      Help
                //          What must I do to be saved?
                //          Ask a local pastor
                //           - or -
                //          I want to join a biblical church!
                //          Find a local church.
                
                // Render the background image
                $('.background').css('opacity','0').css({
                    'background':" #000 url(" + model.heaven_and_hell[_.random(model.heaven_and_hell.length-1)] + ") no-repeat center center fixed",
                    'background-size':'cover'
                }).animate({ opacity: 1 }, { duration: 1000 });
                
                // TODO: Make footer stick to the bottom of the page.
                
                // Render the QuestionAnswerContainerView
                this.question_answer_container_view = new views.QuestionAnswerContainerView({ el: $('.content') })
                this.question_answer_container_view.render()
                // TODO: Move this out into a view
                // TODO: Give a way to return to the main page
                // Get credits
                var images = _.map(image_pages.split('\n'), function(image){
                    // TODO: Make this not display "Both heaven and hell:" (and similar strings) as a link.
                    return {url:image}
                })
                var sounds = _.chain(audio_pages.split('\n'))
                    .map(function(sound){
                        // Remove directory prefixes
                        sound = sound.replace(/^\.\//, '').replace('good/', '').replace('bad/', '')
                        // Create URL
                        var sound_parts = sound.split('__')
                        var user = sound_parts[1]
                        var id = sound_parts[0]
                        var url = 'http://www.freesound.org/people/' + user + '/sounds/' + id
                        return {url:url}
                    })
                    .uniq()
                    .value()
                var credits = {
                    images:images,
                    sounds:sounds
                }
                $('.credits').on('click', function(){
                    $('.content').html(Mustache.render(CreditsTemplate, credits))
                })

                // Run tests only if configured to do so
                var thiz = this
                if (config.run_jasmine_tests === true) {
                    $('head').append('<link rel="stylesheet" href="js/vendor/jasmine/lib/jasmine-core/jasmine.css" type="text/css" />')
                    // TODO: Is the setTimeout call necessary?  Its purpose is to fix the problem where the tests
                    //  don't run on page load, maybe because they are loaded too early.  But loading them late
                    //  doesn't fix the problem either.  They just sometimes run, and sometimes don't.
                    setTimeout(function(){
                        thiz.run_tests_view = new views.RunTestsView({ el: $("#tests") });
                    }, 3000)
                }
            }
        });
        // Instantiate & initialize App
        window.app = new App
        // Render after initializing, so window.app can be accessed by the views this app renders
        window.app.render()
        // Make model, config available in tests
        window.app.model = model
        window.app.config = config
       
        // Create SEF URLs and handle clicks
//         Backbone.history.start({pushState: true, root: "/" + config.db_name + "/_design/rcl/"})
        // Globally capture clicks. If they are internal and not in the pass 
        // through list, route them through Backbone's navigate method.
        // TODO: Create vhosts entry to allow pages to load from direct access to the URL, like
        //  to http://localhost:5984/rcl/_design/rcl/import_directory.  Currently that URL returns:
        //  {"error":"not_found","reason":"Document is missing attachment"}
        // TODO: When I create a vhosts entry for /rcl2 and rewrites.json, then go to 
        //  http://localhost:5984/rcl2/find_a_church, it returns:
        //  {"error":"not_found","reason":"Document is missing attachment"}
        //  https://blueprints.launchpad.net/reformedchurcheslocator/+spec/example-of-vhosts-not-working-yet
        $(document).on("click", "a[href^='/']", function(event){
            var href = $(event.currentTarget).attr('href')
            // chain 'or's for other black list routes
            var passThrough = href.indexOf('sign_out') >= 0 || href.indexOf('delete') >= 0
            // Allow shift+click for new tabs, etc.
            if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){
                event.preventDefault()
                // Instruct Backbone to trigger routing events
                app.navigate(href, { trigger: true })
                return false
            }
        })
        
        return {
            app:app
        }
});