define(
   [
    'config',
    'backbone_hoodie',
    'mustache',
    'model',
    'text!views/QuestionAnswerContainer/Score.html'
    ], 
    function(config, Backbone, Mustache, model, template){

    return Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'rerender', 'color_score', 'fadein_background')
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
                this.fadein_background(model.hell)
            }else if (destination == 'Heaven'){
                this.$el.css({'color':'green'})
                this.$('.ask_pastor_container').addClass('hidden')
                this.$('.join_church_container').fadeIn(1000).removeClass('hidden')
                this.fadein_background(model.heaven)
            }
        },
        fadein_background:function(urls){
            // Fade to a new background image
            $('.background').css({
                'background':" #000 url(" + urls[_.random(urls.length-1)] + ") no-repeat center center fixed",
                'background-size':'cover'
            }).animate({ opacity: 1 }, { duration: 3000 });
        }
    });
});
