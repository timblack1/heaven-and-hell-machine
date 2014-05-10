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
            $(this.el).html(Mustache.render(template, {
                destination:destination
            }));
            this.color_score(destination)
            $(this.el).removeClass('hidden')
        },
        color_score:function(destination){
            if (destination == 'Hell'){
                this.$el.css({'color':'red'})
            }else if (destination == 'Heaven'){
                this.$el.css({'color':'green'})
            }
        }
    });
});
