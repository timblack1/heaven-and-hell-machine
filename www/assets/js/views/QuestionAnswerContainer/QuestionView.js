define(
   [
    'config',
    'backbone',
    'mustache',
    'text!views/QuestionAnswerContainer/Question.html'
    ], 
    function(config, Backbone, Mustache, template){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'give_answer')
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
            // TODO: Display scripture answers
            this.$('.answer').show()
            // TODO: Play sound and provide overlay for whether they got it right or not.
            //  E.g., thunder and lightning, or a glow and the sound of angels singing.
            //  A variety of such good and bad sounds/overlays would be fun.
            if (($(event.target).hasClass('true') && this.model.get('answer') === true) ||
                ($(event.target).hasClass('false') && this.model.get('answer') === false)
            ){
                // The user got the answer right
                this.$('.answer').css({'color':'green'})
            }else{
                // The user got the answer wrong
                this.$('.answer').css({'color':'red'})
            }
        }
    });

});
