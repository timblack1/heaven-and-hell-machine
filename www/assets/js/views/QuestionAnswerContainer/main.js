define(
   [
    'config',
    'backbone',
    'mustache',
    'views/QuestionAnswerContainer/QuestionView'
    ], 
    function(config, Backbone, Mustache, QuestionView, QuestionViewTemplate){

    return Backbone.View.extend({
        initialize: function(){
            this.render()
        },
        render: function(){
            // TODO: Convert to use backbone-hoodie
            // TODO: Bootstrap the questions into the database
            // TODO: Load the questions into a collection
            // TODO: Do this for the first question in the questions collection
            var QuestionModel = Backbone.RelationalModel.extend({})
            var q1 = new QuestionModel({
                number:1,
                text:"There are many ways to get to heaven, so it really doesn&rsquo;t matter what religion you follow as long as you are sincere.",
                answer:false,
                scripture:'&ldquo;Jesus said to him, &lsquo;I am the way, the truth, and the life; no one comes to the Father, but through Me.&rsquo;&rdquo;',
                reference:'John 14:6'
            })
            var question = new QuestionView({
                el:this.el,
                model:q1
            })
            question.render()
            /* Other questions:
            2
            God cares about right and wrong.
            true
            For rulers hold no terror for those who do right, but for those who do wrong.  Do you want to be free
            from fear of the one in authority? Then do what is right and he will commend you.
            Romans 13:3
            3
            God will punish sin.
            true
            "I will punish the world for its evil, the wicked for their sins."
            Isaiah 13:11
            He will punish those who do not know God and do not obey the gospel of our Lord Jesus.
            2 Thessalonians 1:8
            This is what the LORD says about this people:  "They greatly love to wander; they do 
            not restrain their feet.  So the LORD does not accept them; he will now remember their wickedness and punish
            them for their sins."
            Jeremiah 14:10
            4
            Hell is not real.  God would never send anyone to such a terrible place.
            False
            "And in Hades he lifted up his eyes, being in torment and saw Abraham far away, and Laarus in his bosom."
            Luke 16:23
            "His winnowing fork is in his hand, and he will clear his threshing floor, gathering his wheat
            into the barn and burning up the chaff with unquenchable fire."
            Matthew 3:12
            "If anyone's name was not found written in the book of life, he wsa thrown into the lake of fire."
            Revelation 20:15
            5
            Everyone who has ever lived will have to one day stand before God to be judged.
            true
            "...it is appointed for men to die once and after this comes the judgment."
            Hebrews 9:27
            "For we must all appear before the judgment seat of Christ, that each one may receive what is due him
            for the things done while in the body, whether good or bad."
            2 Corinthians 5:10
            6
            All humans are born with a sin nature, and because of sin, are headed for Hell.
            true
            "If we say that we have no sin, we are deceiving ourselves, and the truth is not in us."
            1 John 1:8
            "Surely I was sinful at birth, sinful from the time my mother conceived me."
            Psalm 51:5
            "There is none righteous, not even one; there is none who understands, there is none who seeks for God;
            all have turned aside, together they have become useless; there is none who does good, there is not even one."
            Romans 3:10-12
            7
            If a person tries his best to live by the Ten Commandments, and he does more good deeds than bad deeds, he will go 
            to heaven.
            false
            "...by the works of the Law no flesh will be justified in His sight."
            Romans 3:20
            "For all of us have become like one who is unclean, and all of our righteous deeds are like a filthy garment..."
            Isaiah 64:6
            "For whoever keeps the whole law and yet stumbles at just one point is guilty of breaking all of it."
            James 2:10
            
            1 (4 above)
            2
            If you hurt with your words or show hate toward others you are breaking the commandment on murder.
            true
            "We know that we have passed from death to life, because we love our brothers.  Anyone who does not
            love remains in death.  Anyone who hates his brother is a murderer, and you know that no murderer
            has eternal life in him."
            1 John 3:14-15
            3 (3 above)
            4 (2 above)
            5 (1 above)
            6 (7 above)
            7 (6 above)
            8
            The bad news -- no one is good enough to get to heaven.
            The Good News -- Jesus&rsquo; perfect life and death on the cross paid for our acts of disobedience.
            You must believe on him and repent of your sins.
            true
            "A trustworthy saying that deserves full acceptance:  Christ Jesus came into the world to save sinners--of
            whom I am the worst." (The apostle Paul)
            1 Timothy 1:15
            
            */
        }     
    });

});