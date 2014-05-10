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
    function(config, model, Backbone, Mustache, QuestionView, mainTemplate, buzz, audio_filenames, ScoreView){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'previous_question', 'next_question', 
                'rerender_question', 'get_last_number')
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
            // TODO: Offer help to get to heaven or to avoid going to hell (ask a local pastor, 
            //      or link to gospel presentations).
            //  Create a new section in this container which reports to the user where they will go:  Heaven or Hell
            //  and offers help to get there or to avoid going there (ask a local pastor, or link to gospel presentations).
            var thiz = this;
            this.score = new model.Score()
            this.score_view = new ScoreView({
                el:this.$('.score'),
                model:this.score
            })
            this.score_view.render()
            
            // TODO: Get the following images for backgrounds:
            /*
            Both heaven and hell:
            http://en.wikipedia.org/wiki/File:Broad_and_Narrow_Road.jpg
            http://en.wikipedia.org/wiki/File:Der_breite_und_der_schmale_Weg_2008.jpg
            http://www.pinterest.com/pin/37225134393392960/
            http://en.wikipedia.org/wiki/File:The_Ladder_of_Divine_Ascent.jpg
            http://en.wikipedia.org/wiki/File:Vank_Cathedral_-_Heaven-Earth-Hell_fresco.jpg
            Heaven:
            https://www.flickr.com/photos/torley/1589654736/
            http://commons.wikimedia.org/wiki/File:We'll_Meet_in_the_Heaven.jpg
            http://en.wikipedia.org/wiki/File:Paradiso_Canto_31.jpg
            http://commons.wikimedia.org/wiki/File:St._Benedict's_triumphal_ascent_to_heaven_by_Johann_Michael_Rottmayr_-_Melk_Abbey_Austria.jpg
            http://commons.wikimedia.org/wiki/File:White_Heaven_Beach_coast_IMG_2862.JPG
            http://commons.wikimedia.org/wiki/File:Stairway_to_heaven_(156690123).jpg
            http://www.geograph.org.uk/photo/3467510
            http://pixabay.com/en/heaven-clouds-cloud-sky-horizon-2327/
            http://pixabay.com/en/sunset-sky-red-heaven-at-dusk-85359/
            http://pixabay.com/en/sky-cloud-blue-heaven-heavenly-314475/
            https://www.flickr.com/photos/waitingfortheword/5852336158/
            https://www.flickr.com/photos/waitingfortheword/5852336142/in/photostream/
            https://www.flickr.com/photos/waitingfortheword/5852336166/in/photostream/
            https://www.flickr.com/photos/waitingfortheword/5732559941/in/set-72157626748025432/
            https://www.flickr.com/photos/waitingfortheword/5732559953/in/set-72157626748025432/
            http://pixabay.com/en/heaven-heavenly-ambiance-clouds-22116/
            http://www.flickr.com/photos/seriykotik/6621135403/
            https://www.flickr.com/photos/neychurluvr/3305754907/
            Hell:
            http://en.wikipedia.org/wiki/File:Paradise_Lost_10.jpg
            http://en.wikipedia.org/wiki/File:MedinaPL3.jpg
            http://en.wikipedia.org/wiki/File:Sin-Death-and-the-Devil-Gillray.jpeg
            http://en.wikipedia.org/wiki/File:GustaveDoreParadiseLostSatanProfile.jpg
            http://en.wikipedia.org/wiki/File:Milton_paradise.jpg
            http://commons.wikimedia.org/wiki/File:Paradise_Lost_5.jpg
            http://commons.wikimedia.org/wiki/File:Henry_Fuseli_-_The_Peasant's_Dream,_Paradise_Lost,_Book_1,_781-8_-_Google_Art_Project.jpg
            http://commons.wikimedia.org/wiki/File:Bartolomeo_Di_Fruosino_-_Inferno,_from_the_Divine_Comedy_by_Dante_(Folio_1v)_-_WGA01339.jpg
            http://commons.wikimedia.org/wiki/File:Stradano_Inferno_Canto_09.jpg
            http://www.fotopedia.com/items/flickr-9615891552
            http://commons.wikimedia.org/wiki/File:Jheronimus_Bosch_Hell_(detail).jpg
            http://en.wikipedia.org/wiki/File:Darvasa_gas_crater_panorama.jpg
            http://en.wikipedia.org/wiki/File:The_Door_to_Hell.jpg
            http://en.wikipedia.org/wiki/File:Hortus_Deliciarum_-_Hell.jpg
            http://en.wikipedia.org/wiki/File:Hell-fresco-from-Raduil.jpg
            http://en.wikipedia.org/wiki/File:Hel_(1889)_by_Johannes_Gehrts.jpg
            http://en.wikipedia.org/wiki/File:Dore_woodcut_Divine_Comedy_01.jpg
            http://en.wikipedia.org/wiki/File:Folio_108r_-_Hell.jpg
            http://en.wikipedia.org/wiki/File:Church_of_Debra_Berhan_Selassie_-_Paintings_05.jpg
            http://en.wikipedia.org/wiki/File:Brooklyn_Museum_-_The_Bad_Rich_Man_in_Hell_(Le_mauvais_riche_dans_l%27Enfer)_-_James_Tissot_-_overall.jpg
            http://en.wikipedia.org/wiki/File:Fra_Angelico_010.jpg
            http://en.wikipedia.org/wiki/File:William-Adolphe_Bouguereau_(1825-1905)_-_Dante_And_Virgil_In_Hell_(1850).jpg
            http://en.wikipedia.org/wiki/File:019Visita_al_infierno.jpg
            http://commons.wikimedia.org/wiki/File:Hell_LavaPit.JPG
            http://commons.wikimedia.org/wiki/File:Harrowing_of_Hell_Medium_Res.jpg
            http://commons.wikimedia.org/wiki/File:Bosch_painting_of_Hell_(582x800).jpg
            http://valerianastock.deviantart.com/art/Gates-of-Hell-Texture-199047602
            http://mechanicalmichael.deviantart.com/art/The-stairway-to-hell-84001007?q=gallery%3AMechanicalMichael%2F9634204&qo=5
            http://www.fotopedia.com/items/flickr-8031717781
            http://pixabay.com/en/fire-burn-hell-warm-heat-flame-298105/
            http://pixabay.com/en/fire-wood-fire-flame-burn-brand-171229/
            http://pixabay.com/en/fire-flame-burn-chair-wood-fire-175966/
            http://pixabay.com/en/fire-the-flames-wood-burning-184885/
            https://www.flickr.com/photos/rapidtravelchai/8031716278/
            */
            
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
            // Convert sounds that are in file formats which won't play
            var sounds = _.map(audio_filenames.split('\n'), function(name){
                var filename_parts = name.slice(name.lastIndexOf('/')+1, name.length).split('.')
                var dir_matches = name.match(/\/(.+)\//)
                if (dir_matches !== null){
                    var dir = dir_matches[1]
                }else{
                    var dir = ''
                }
                return {
                    dir: dir,
                    filename: filename_parts[0],
                    filename_extension: filename_parts[1]
                }
            })
            this.sounds_attributes = {
                play:function(dir){
                    if (typeof this.buzz_sound !== 'undefined'){
                        this.buzz_sound.fadeOut(1000)
                    }
                    var dir_sounds = _.where(sounds, {dir:dir})
                    var sound = dir_sounds[_.random(dir_sounds.length-1)]
                    this.buzz_sound = new buzz.sound('assets/audio/' + ( sound.dir !== '' ? sound.dir + '/' : '' ) + sound.filename, {
                        formats: [ sound.filename_extension ]
                    });
                    this.buzz_sound.play()
                },
                sounds:sounds
            }
            
            // TODO: Bootstrap the questions into the database
            // TODO: Load the questions into a collection
            // TODO: Create two orders of questions as listed below:
            //  old:    1,2,3,4,5,6,7
            //  new:    4,2b,3,2,1,7,6,8
            // TODO: Do this for the first question in the questions collection
            // TODO: Make a list that contains more than one scripture and reference per question
            this.questions = new model.Questions;
            this.questions.add([
                {
                    original_number:1,
                    new_number:5,
                    text:"There are many ways to get to heaven, so it really doesn&rsquo;t matter what religion you follow as long as you are sincere.",
                    answer:false,
                    scripture:[{
                        text:'Jesus said to him, &lsquo;I am the way, the truth, and the life; no one comes to the Father, but through Me.&rsquo;',
                        reference:'John 14:6'
                    }]
                },
                {
                    original_number:2,
                    new_number:4,
                    text:"God cares about right and wrong.",
                    answer:true,
                    scripture:[{
                        text:'For rulers hold no terror for those who do right, but for those who do wrong.  Do you want to be free from fear of the one in authority? Then do what is right and he will commend you.',
                        reference:'Romans 13:3'
                    }]
                },
                {
                    original_number:3,
                    new_number:3,
                    text:"God will punish sin.",
                    answer:true,
                    scripture:[
                        {
                            text:'I will punish the world for its evil, the wicked for their sins.',
                            reference:'Isaiah 13:11'
                        },
                        {
                            text:'He will punish those who do not know God and do not obey the gospel of our Lord Jesus.',
                            reference:'2 Thessalonians 1:8'
                        },
                        {
                            text:'This is what the LORD says about this people:  &lsquo;They greatly love to wander; they do not restrain their feet.  So the LORD does not accept them; he will now remember their wickedness and punish them for their sins.&rsquo;',
                            reference:'Jeremiah 14:10'
                        },
                    ]
                },
                {
                    original_number:4,
                    new_number:1,
                    text:"Hell is not real.  God would never send anyone to such a terrible place.",
                    answer:false,
                    scripture:[
                        {
                            text:'And in Hades he lifted up his eyes, being in torment and saw Abraham far away, and Lazarus in his bosom.',
                            reference:'Luke 16:23'
                        },
                        {
                            text:'His winnowing fork is in his hand, and he will clear his threshing floor, gathering his wheat into the barn and burning up the chaff with unquenchable fire.',
                            reference:'Matthew 3:12'
                        },
                        {
                            text:'If anyone&rsquo;s name was not found written in the book of life, he was thrown into the lake of fire.',
                            reference:'Revelation 20:15'
                        },
                    ]
                },
                {
                    original_number:5,
                    text:"Everyone who has ever lived will have to one day stand before God to be judged.",
                    answer:true,
                    scripture:[
                        {
                            text:'...it is appointed for men to die once and after this comes the judgment.',
                            reference:'Hebrews 9:27'
                        },
                        {
                            text:'For we must all appear before the judgment seat of Christ, that each one may receive what is due him for the things done while in the body, whether good or bad.',
                            reference:'2 Corinthians 5:10'
                        }
                    ]
                },
                {
                    original_number:6,
                    text:"All humans are born with a sin nature, and because of sin, are headed for Hell.",
                    answer:true,
                    scripture:[
                        {
                            text:'If we say that we have no sin, we are deceiving ourselves, and the truth is not in us.',
                            reference:'1 John 1:8'
                        },
                        {
                            text:'Surely I was sinful at birth, sinful from the time my mother conceived me.',
                            reference:'Psalm 51:5'
                        },
                        {
                            text:'There is none righteous, not even one; there is none who understands, there is none who seeks for God; all have turned aside, together they have become useless; there is none who does good, there is not even one.',
                            reference:'Romans 3:10-12'
                        }
                    ]
                },
                {
                    original_number:7,
                    new_number:6,
                    text:"If a person tries his best to live by the Ten Commandments, and he does more good deeds than bad deeds, he will go to heaven.",
                    answer:false,
                    scripture:[
                        {
                            text:'...by the works of the Law no flesh will be justified in His sight.',
                            reference:'Romans 3:20'
                        },
                        {
                            text:'For all of us have become like one who is unclean, and all of our righteous deeds are like a filthy garment...',
                            reference:'Isaiah 64:6'
                        },
                        {
                            text:'For whoever keeps the whole law and yet stumbles at just one point is guilty of breaking all of it.',
                            reference:'James 2:10'
                        }
                    ]
                },
                {
                    new_number:2,
                    text:"If you hurt with your words or show hate toward others you are breaking the commandment on murder.",
                    answer:true,
                    scripture:[
                        {
                            text:'We know that we have passed from death to life, because we love our brothers.  Anyone who does not love remains in death.  Anyone who hates his brother is a murderer, and you know that no murderer has eternal life in him.',
                            reference:'1 John 3:14-15'
                        }
                    ]
                },
                {
                    new_number:8,
                    text:"The bad news -- no one is good enough to get to heaven.<br />The Good News -- Jesus&rsquo; perfect life and death on the cross paid for our acts of disobedience.<br />You must believe on him and repent of your sins.",
                    answer:true,
                    scripture:[
                        {
                            text:'A trustworthy saying that deserves full acceptance:  Christ Jesus came into the world to save sinners--of whom I am the worst. (The apostle Paul)',
                            reference:'1 Timothy 1:15'
                        }
                    ]
                }
            ])
            config.use_new_numbers = false
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
        }
    });

});