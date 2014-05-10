define(
   [
    'config',
    'backbone_hoodie',
    'mustache',
    'text!views/QuestionAnswerContainer/Score.html'
    ], 
    function(config, Backbone, Mustache, template){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'rerender', 'color_score')
            this.listenTo(this.model, 'change:answers', this.rerender)
        },
        render: function(){
            $(this.el).html(Mustache.render(template, {
                destination:this.model.get_destination()
            }));
            this.delegateEvents()
        },
        rerender:function(){
            var destination = this.model.get_destination()
            // Tell the user which answers they got wrong
            var thiz = this
            var wrong_answers = _.chain(this.model.get('answers'))
                .map(function(ans, index){
                    if (ans=='wrong'){
                        return index
                    }
                })
                .filter(function(ans){
                    return typeof ans !== 'undefined'
                })
                .value()
            if (wrong_answers.length > 1){
                var s = 's'
                if (wrong_answers.length == 2){
                    wrong_answers = wrong_answers.join(' and ')
                }else{
                    wrong_answers[wrong_answers.length-1] = 'and ' + wrong_answers[wrong_answers.length-1]
                    wrong_answers = wrong_answers.join(', ')
                }
            }else{
                var s = ''
            }
            // Render the score template
            $(this.el).html(Mustache.render(template, {
                destination:destination,
                numbers:wrong_answers,
                s:s
            }));
            // Color the output to reflect their destination
            this.color_score(destination)
            // Show the score template
            $(this.el).hide().delay(5000).fadeIn(1000).removeClass('hidden')
            // Tell the user why they are going to hell if they are.
            if (wrong_answers.length > 0){
                this.$('.why').removeClass('hidden')
            }else{
                this.$('.why').addClass('hidden')
            }
        },
        color_score:function(destination){
            if (destination == 'Hell'){
                this.$el.css({'color':'red'})
                this.$('.join_church_container').addClass('hidden')
                this.$('.ask_pastor_container').fadeIn(1000).removeClass('hidden')
            }else if (destination == 'Heaven'){
                this.$el.css({'color':'green'})
                this.$('.ask_pastor_container').addClass('hidden')
                this.$('.join_church_container').fadeIn(1000).removeClass('hidden')
            }
        }
    });
});
