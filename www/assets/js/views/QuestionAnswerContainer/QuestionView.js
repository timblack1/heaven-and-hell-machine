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
        },
        render: function(){
            $(this.el).html(Mustache.render(template, this.model.attributes));
            this.listenTo(this.$('#true, #false'), 'click', this.give_answer)
        },
        give_answer:function(event){
            // TODO: Display scripture answers
            // TODO: Play sound and provide overlay for whether they got it right or not.
            //  E.g., thunder and lightning, or a glow and the sound of angels singing.
            //  A variety of such good and bad sounds/overlays would be fun.
        }
    });

});
