define(
   [
    'config',
    'backbone_couchdb',
    'mustache',
    'text!views/QuestionAnswerContainer/Status.html'
    ], 
    function(config, Backbone, Mustache, template){

    return Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.model, 'change:answers', this.rerender)
        },
        render: function(){
            $(this.el).html(Mustache.render(template, {
                status:this.model.get_status()
            }));
            this.delegateEvents()
        },
        rerender:function(){
            $(this.el).html(Mustache.render(template, {
                status:this.model.get_status()
            }));
            $(this.el).removeClass('hidden').show()
        }
    });
});
