define(
   [
    'config',
    'model',
    'backbone_hoodie',
    'mustache',
    'views/QuestionAnswerContainer/QuestionView',
    'text!views/QuestionAnswerContainer/mainTemplate.html',
    'buzz',
    'text!views/QuestionAnswerContainer/audio_filenames.html',
    'views/QuestionAnswerContainer/ScoreView'
    ], 
    function(config, model, Backbone, Mustache, QuestionView, mainTemplate, buzz, audio_filenames, 
        ScoreView){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'previous_question', 'next_question', 
                'rerender_question', 'get_last_number', 'create_score_view',
                'create_question_view')
        },
        events:{
            "click .previous_question": 'previous_question',
            "click .next_question":     'next_question'
        },
        render: function(){
            $(this.el).html(Mustache.render(mainTemplate));
            this.delegateEvents()
            // Disable previous_question nav link since we're on question 1
            this.$('.previous_question').css({color:'lightgray'})
            
            // Create a section in this container which reports to the user where they will go:  Heaven or Hell.
            // Offer help to get to heaven or to avoid going to hell (ask a local pastor, 
            //      or link to gospel presentations).
            //  Create a new section in this container which reports to the user where they will go:  Heaven or Hell
            //  and offers help to get there or to avoid going there (ask a local pastor, or link to gospel presentations).
            var thiz = this;
            this.scores = new model.Scores()
            // Get scores from hoodie.
            this.scores.fetch({success:function(){
//                 thiz.score = model.Score.findOrCreate({
//                     type:'score'
//                 })
                // Make sure we always get only the first score, in case there is more than one in the
                //  database.  There never should be more than one, but how else can we be sure to get
                //  the right one?  model.Score.findOrCreate() doesn't seem to work here.
                if (thiz.scores.length == 0){
                    thiz.scores.create({success:function(score){
                        thiz.score = score
                        thiz.create_score_view()
                    }})
                }else{
                    thiz.score = thiz.scores.at(0)
                    thiz.create_score_view()
                }
            }})
        },
        previous_question:function(){
            // Render the previous question
            var number = this.question_view.model.get('number')-1;
            this.rerender_question(number)
            this.$('.next_question').css({color:''})
            // Set .previous_question link to lightgray if there are no more questions
            if (number === 1){
                this.$('.previous_question').css({color:'lightgray'})
            }
        },
        next_question:function(){
            // Render the next question
            var number = this.question_view.model.get('number')+1;
            this.rerender_question(number)
            this.$('.previous_question').css({color:''})
            // Set .next_question link to lightgray if there are no more questions
            var last_number = this.get_last_number()
            if (number === last_number){
                this.$('.next_question').css({color:'lightgray'})
            }
        },
        rerender_question:function(number){
            if (number !== 0 && number !== this.get_last_number()+1){
                this.question_view.undelegateEvents()
                if (config.use_new_numbers === false){
                    var question = this.questions.findWhere({original_number:number})
                }else{
                    var question = this.questions.findWhere({new_number:number})
                }
                question.set('number', number)
                this.question_view = new QuestionView({
                    el:this.$('.question'),
                    model:question,
                    parent:this,
                    sounds:this.sounds_attributes
                })
                this.question_view.render()
            }
        },
        get_last_number:function(){
            if (config.use_new_numbers === false){
                var last_number = _.max(_.filter(this.questions.pluck('original_number'),function(item){ return typeof item !== 'undefined'; }))
            }else{
                var last_number = _.max(this.questions.pluck('new_number'))
            }
            return last_number
        },
        create_score_view:function(){
            this.score_view = new ScoreView({
                el:this.$('.score'),
                model:this.score
            })
            // TODO: Why is this render needed here, instead of later when we need to display the score?
            this.score_view.render()
            this.create_question_view()
        },
        create_question_view:function(){
            // Note:  Sounds are from freesound.org
            // -- Good sounds --
            // Ding, angels singing, applause, hymns with edifying, understandable words (sung with an organ?)
            //  Try http://www.freesound.org/search/?q=hymn
            //      http://gospelriver.com/music/
            // -- Bad sounds --
            // Scary dog barking, growling, thunderclap, whispers of judgment, screams of hell
            // We put all the sounds into an object (to avoid duplicating code)
            //      and maybe choose a limited set randomly.
            //  The audio_filenames template contains filenames created by the following command:
            //      "find . -type f"
            // Start here.
            // TODO:
            //  Store attribution info in the object so it's at least accessible.
            //  Some sounds would work better for certain questions.
            //  Reduce the file size so they don't take forever to download onto a mobile device.
            // Convert sounds that are in file formats which won't play.  Formats which work:
            //  OGG	MP3	WAV	AAC
            //  Converting AIF failed.
            var sounds = _.map(audio_filenames.split('\n'), function(name){
                var filename_parts = name.slice(name.lastIndexOf('/')+1, name.length).split('.')
                var dir_matches = name.match(/\/(.+)\//)
                if (dir_matches !== null){
                    var dir = dir_matches[1]
                }else{
                    var dir = ''
                }
                var filename = filename_parts[0]
                var filename_extension = filename_parts[1]
                return {
                    dir: dir,
                    filename: filename,
                    filename_extension: filename_extension
                }
            })
            this.sounds_attributes = {
                play:function(dir){
                    if (typeof this.buzz_sound !== 'undefined'){
                        this.buzz_sound.fadeOut(1000)
                    }
                    if (buzz.isOGGSupported()){
                        filename_extension = 'ogg'
                    }else if (buzz.isMP3Supported()){
                        filename_extension = 'mp3'
                    }
                    var dir_sounds = _.where(sounds, {dir:dir, filename_extension:filename_extension})
                    var sound = dir_sounds[_.random(dir_sounds.length-1)]
                    this.buzz_sound = new buzz.sound('http://cdn.caneyopc.org/hhm/audio/' + ( sound.dir !== '' ? sound.dir + '/' : '' ) + sound.filename, {
                        formats: [ sound.filename_extension ]
                    });
                    this.buzz_sound.play()
                },
                sounds:sounds
            }
            
            // Get question
            this.questions = model.questions
            if (config.use_new_numbers === false){
                var question = this.questions.findWhere({original_number:1})
            }else{
                var question = this.questions.findWhere({new_number:1})
            }
            question.set('number', 1)
            this.question_view = new QuestionView({
                el:this.$('.question'),
                model:question,
                parent:this,
                sounds:this.sounds_attributes
            })
            this.question_view.render()
        }
    });
});;