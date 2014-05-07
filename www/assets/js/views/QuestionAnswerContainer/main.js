define(
   [
    'config',
    'backbone',
    'mustache',
    'views/QuestionAnswerContainer/QuestionView',
    'text!views/QuestionAnswerContainer/mainTemplate.html'
    ], 
    function(config, Backbone, Mustache, QuestionView, mainTemplate){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'previous_question', 'next_question', 
                'rerender_question')
        },
        render: function(){
            $(this.el).html(Mustache.render(mainTemplate));
            // Disable previous_question nav link since we're on question 1
            this.$('.previous_question').css({color:'lightgray'})
            
            // TODO: Clicking this link returns "Uncaught TypeError: undefined is not a function"
            this.listenTo(this.$('.previous_question'), 'click', this.previous_question)
            this.listenTo(this.$('.next_question'), 'click', this.next_question)

            // TODO: Convert to use backbone-hoodie
            // TODO: Bootstrap the questions into the database
            // TODO: Load the questions into a collection
            // TODO: Create two orders of questions as listed below:
            //  old:    1,2,3,4,5,6,7
            //  new:    4,2b,3,2,1,7,6,8
            // TODO: Do this for the first question in the questions collection
            // TODO: Make a list that contains more than one scripture and reference per question
            var Question = Backbone.RelationalModel.extend({})
            var Questions = Backbone.Collection.extend({
                model:Question
            })
            var questions = new Questions;
            questions.add([
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
            // TODO: Move this setting into the config.
            var use_new_numbers = false
            if (use_new_numbers === false){
                var question = questions.findWhere({original_number:1})
            }else{
                var question = questions.findWhere({new_number:1})
            }
            question.set('number', 1)
            this.question_view = new QuestionView({
                el:this.$('.question'),
                model:question
            })
            this.question_view.render()
        },
        previous_question:function(){
            // Render the previous question
            var number = question_view.model.number-1;
        },
        next_question:function(){
            // Render the next question
            var number = question_view.model.number+1;
        },
        rerender_question:function(number){
            if (use_new_numbers === false){
                this.question_view.model = questions.findWhere({original_number:number})
            }else{
                this.question_view.model = questions.findWhere({new_number:number})
            }
            this.question_view.model.set('number', number)
            this.question_view.render()
            // TODO: Disable appropriate nav link if at the first or last question
        }
    });

});