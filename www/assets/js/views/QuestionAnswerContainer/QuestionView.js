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
            this.render()
            _.bindAll(this, 'give_answer')
        },
        render: function(){
            $(this.el).html(Mustache.render(template, this.model.attributes));
            // TODO: This doesn't seem to attach the event handler correctly
            // Start here.
            this.listenTo(this.$('#true'), 'click', this.give_answer)
            this.listenTo(this.$('#false'), 'click', this.give_answer)
        },
        give_answer:function(event){
            // TODO: Display scripture answers
            this.$('.answer').show()
            // TODO: Play sound and provide overlay for whether they got it right or not.
            //  E.g., thunder and lightning, or a glow and the sound of angels singing.
            //  A variety of such good and bad sounds/overlays would be fun.
        }
    });

});
