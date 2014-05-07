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
            // TODO: Disable appropriate nav link if at the first or last question
            this.listenTo(this.$('.previous_question'), 'click', this.previous_question)
        },
        previous_question:function(){
            // TODO: Render the previous question
        }
    });

});
