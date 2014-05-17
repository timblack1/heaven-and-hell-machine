define(
   [
    'config',
    'backbone_hoodie',
    'mustache',
    'model',
    'text!views/QuestionAnswerContainer/Score.html',
    'text!views/QuestionAnswerContainer/EmailQuestionAnswer.html'
    ], 
    function(config, Backbone, Mustache, model, template, EmailQuestionAnswer){

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
            
            // TODO: Make the button send an email to a local pastor
            // TODO: Make different forms of the email for the two main cases:
            //  - I want to join a biblical church.
            //  - What must I do to be saved?
            this.answers = this.model.get('answers')
            this.all_questions = model.questions
            if (config.use_new_numbers === false){
                this.questions = this.all_questions.filter(function(q){
                    return typeof q.get('original_number') !== 'undefined'
                })
            }else{
                this.questions = this.all_questions.filter(function(q){
                    return typeof q.get('new_number') !== 'undefined'
                })
            }
            var body = "<p>Dear pastor,</p>"
            body += "<p>I answered the following questions in the Heaven and Hell Machine at "
            body += window.location.toString()
            body += " and got some of them wrong."
            body += " My answers are below. What must I do to be saved?</p>\n\n"
            body += "<p>Sincerely,</p>\n\n"
            body += "<p>[Enter your name here]</p>\n\n"
            body += "<hr />"
            // TODO: Convert answers from an array to an object, and put my_answer into answers
            if (config.use_new_numbers === false){
                var num_type = 'original_number'
            }else{
                var num_type = 'new_number'
            }
            _.each(this.questions, function(q){
                var grade = thiz.model.get('answers')[q[num_type]]
                if ((grade == 'right' && q.get('answer') == true) ||
                    (grade == 'wrong' && q.get('answer') == false)){
                    var my_answer = 'true'
                }else{
                    var my_answer = 'false'
                }
                body += Mustache.render(EmailQuestionAnswer, {
                    number:q.get('number'),
                    text:q.get('text'),
                    my_answer:my_answer,
                    grade:grade,
                    scripture:q.get('scripture')
                })
            })
            var to = 'pastor@caneyopc.org'
            var subject = 'What must I do to be saved?'
            // Compile email here
            //this.$('.score ask_pastor_container').on('click', window.location = 'mailto:' + to + '?subject=' + subject + '&body=' + body)
            this.$('.score .ask_pastor_container').on('click', function(){
                debugger;
                thiz.$('.email_body').html(body)
                thiz.$('.email_body').removeClass('hidden').show()
            })
            debugger;
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
            // Create new div with new background-image inside .background and fade it in
            var new_url = urls[_.random(urls.length-1)]
            var $div = $('<div class="background" style="background: #000 url(\'' + new_url + 
                '\') no-repeat center center fixed; display:none; background-size:cover"></div>')
            $('.background').append($div)
            $div.fadeIn({
                duration:3000,
                queue:false,
                complete:function(){
                    // Set new background-image on .background
                    $('.background').css({
                        'background':" #000 url('" + new_url + "') no-repeat center center fixed",
                        'background-size':'cover'
                    })
                    // Remove new div since it's not needed anymore
                    $('.background div').remove()
                }
            })
        }
    });
});
;
