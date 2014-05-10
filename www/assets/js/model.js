// Standard AMD RequireJS define
define([
        'config',
        'backbone_hoodie'
        ], function(config, Backbone){
    // Fill this with your database information.
    
    Backbone.connect() // creates a new hoodie at Backbone.hoodie
    var hoodie = Backbone.hoodie
    // Reload the page when the design doc changes
    // TODO: This doesn't work with Hoodie, since there isn't a design doc in the database.
    hoodie.store.on('change', function(eventName, data){
        for (var i=0; i<data.results.length; i++){
            if (data.results[i].id == '_design/rcl'){
                window.location.reload()
            }
        }
    })
    // Provide a model scope for backbone-relational to use to relate models
    modelStore = {}
    Backbone.Relational.store.addModelScope(modelStore)
    
    // Define model objects & collections for querying the database
    
    // Define link objects for many-to-many relations

    // Define main model objects
    modelStore.Question = Backbone.RelationalModel.extend({
        type:'question',
        collection:'Questions'
    })
    modelStore.Questions = Backbone.Collection.extend({
        model:modelStore.Question,
        url:'/question'
    })
    modelStore.Score = Backbone.RelationalModel.extend({
        type:'score',
        defaults:{
            'answers':[],
            'destination':''
        },
        get_destination:function(){
            if (_.contains(this.get('answers'), 'wrong') || this.get('answers').length == 0){
                var destination = 'Hell'
                this.set('destination', 'Hell')
            }else{
                var destination = 'Heaven'
                this.set('destination', 'Heaven')
            }
            return destination
        }
    })

    return modelStore
})
