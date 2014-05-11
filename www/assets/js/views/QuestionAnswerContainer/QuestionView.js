define(
   [
    'config',
    'backbone_hoodie',
    'mustache',
    'text!views/QuestionAnswerContainer/Question.html'
    ], 
    function(config, Backbone, Mustache, template){

    return Backbone.View.extend({
        initialize: function(options){
            _.bindAll(this, 'give_answer', 'apply_settings')
            this.sounds = options.sounds
            this.parent = options.parent
        },
        events:{
            "click .true":  'give_answer',
            "click .false": 'give_answer'
        },
        render: function(){
            $(this.el).html(Mustache.render(template, this.model.attributes));
            this.delegateEvents()
        },
        give_answer:function(event){
            // Display scripture answers
            this.$('.answer').fadeIn()
            // Create settings to use in this.apply_settings()
            var settings = {
                right:{
                    color:'green',
                    dir:'good',
                    answer:'right',
                    correct:'Correct'
                },
                wrong:{
                    color:'red',
                    dir:'bad',
                    answer:'wrong',
                    correct:'Incorrect'
                }
            }
            if (($(event.target).hasClass('true') && this.model.get('answer') === true) ||
                ($(event.target).hasClass('false') && this.model.get('answer') === false)
            ){
                // The user got the answer right
                this.apply_settings(settings['right'])
            }else{
                // The user got the answer wrong
                this.apply_settings(settings['wrong'])
            }
        },
        apply_settings:function(settings){
            // Play sound and 
            // TODO: provide overlay (or other visual notification) for whether they got it right or not.
            //  E.g., thunder and lightning, a glow with the sound of angels singing,
            //      shake page, flash question or page outline red or green, etc.
            //  A variety of such good and bad sounds/overlays would be fun.
            this.$('.answer p').css({'color':settings.color})
            this.sounds.play(settings.dir)
            this.$('.correct').text(settings.correct)
            var answers = _.clone(this.parent.score_view.model.get('answers'))
            answers[this.model.get('number')] = settings.answer
            // TODO: Save the answers in a correct format, so they all get saved in one model, rather than in many.
            // Start here.
            this.parent.score_view.model.set('answers', answers)
            console.log(score.attributes.answers)
        }
    });

});

