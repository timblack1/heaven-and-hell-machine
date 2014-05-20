// Standard AMD RequireJS define
define([
        'config',
        'backbone_hoodie',
        'text!views/image_filenames.html',
        ], function(config, Backbone, image_filenames){
    // Fill this with your database information.
    
    Backbone.connect() // creates a new hoodie at Backbone.hoodie
    var hoodie = Backbone.hoodie
    // Reload the page when the design doc changes
    // TODO: This doesn't work with Hoodie, since there isn't a design doc in the database.
//     hoodie.store.on('change', function(eventName, data){
//         for (var i=0; i<data.results.length; i++){
//             if (data.results[i].id == '_design/rcl'){
//                 window.location.reload()
//             }
//         }
//     })
    // Provide a model scope for backbone-relational to use to relate models
    modelStore = {}
    Backbone.Relational.store.addModelScope(modelStore)
    
    // Define model objects & collections for querying the database
    
    // Define link objects for many-to-many relations

    // Define main model objects
    
    // TODO: Get the images listed in image_filenames.html for backgrounds
    //  Use the wikimedia imageinfo API per instructions at:
    //      http://www.mediawiki.org/wiki/Extension:CommonsMetadata
    //  like this:
    //      https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&format=json&iiprop=extmetadata&iilimit=10&titles=File%3ACommon%20Kingfisher%20Alcedo%20atthis.jpg
    //  Parse Pinterest HTML pages for:
    //      head meta property="og:image" content="[image url here]"
    //      head meta property="og:url" content="[page url here]"
    //      head meta property="description" content="[description here]"
    //      head title.text()
    //  Flickr:  Use API at https://www.flickr.com/services/api/, especially:
    //      https://www.flickr.com/services/api/flickr.photos.getInfo.html
    //  http://www.geograph.org.uk/photo/3467510
    //  http://pixabay.com
    //  http://www.fotopedia.com
    //  deviantart.com
    // Parse image_filenames into lists of URLs
    var sections = image_filenames.split('Hell:')
    var regex = /(^\n+|\n+$)/g
    modelStore.hell = sections[1].replace(regex, '').split('\n')
    // This is necessary because pixabay doesn't permit hotlinking.
    modelStore.hell = _.map(modelStore.hell, function(item){
        if (item.indexOf('http') !== 0){
            return 'assets/img/hell/' + item
        }else{
            return item
        }
    })
    var hh = sections[0].split('Heaven:')
    modelStore.heaven = hh[1].replace(regex, '').split('\n')
    // This is necessary because pixabay doesn't permit hotlinking.
    modelStore.heaven = _.map(modelStore.heaven, function(item){
        if (item.indexOf('http') !== 0){
            return 'assets/img/heaven/' + item
        }else{
            return item
        }
    })
    modelStore.heaven_and_hell = hh[0].replace('Both heaven and hell:\n','').replace(regex, '').split('\n')

    modelStore.Question = Backbone.RelationalModel.extend({
        type:'question',
        collection:'Questions'
    })
    modelStore.Questions = Backbone.Collection.extend({
        model:modelStore.Question,
        url:'/question'
    })
    // Bootstrap the questions into Backbone here
    // Load the questions into a collection
    // Create two orders of questions as listed below:
    //  old:    1,2,3,4,5,6,7
    //  new:    4,2b,3,2,1,7,6,8
    modelStore.questions = new modelStore.Questions;
    modelStore.questions.add([
        {
            original_number:1,
            new_number:5,
            text:"There are many ways to get to heaven, so it really doesn&rsquo;t matter what religion you follow as long as you are sincere.",
            answer:false,
            scripture:[{
                text:'Jesus said to him, &lsquo;I am the way, the truth, and the life; no one comes to the Father, but through Me.&rsquo;',
                reference:'John 14:6'
            }]
        },
        {
            original_number:2,
            new_number:4,
            text:"God cares about right and wrong.",
            answer:true,
            scripture:[{
                text:'For rulers hold no terror for those who do right, but for those who do wrong.  Do you want to be free from fear of the one in authority? Then do what is right and he will commend you.',
                reference:'Romans 13:3'
            }]
        },
        {
            original_number:3,
            new_number:3,
            text:"God will punish sin.",
            answer:true,
            scripture:[
                {
                    text:'I will punish the world for its evil, the wicked for their sins.',
                    reference:'Isaiah 13:11'
                },
                {
                    text:'He will punish those who do not know God and do not obey the gospel of our Lord Jesus.',
                    reference:'2 Thessalonians 1:8'
                },
                {
                    text:'This is what the LORD says about this people:  &lsquo;They greatly love to wander; they do not restrain their feet.  So the LORD does not accept them; he will now remember their wickedness and punish them for their sins.&rsquo;',
                    reference:'Jeremiah 14:10'
                },
            ]
        },
        {
            original_number:4,
            new_number:1,
            text:"Hell is not real.  God would never send anyone to such a terrible place.",
            answer:false,
            scripture:[
                {
                    text:'And in Hades he lifted up his eyes, being in torment and saw Abraham far away, and Lazarus in his bosom.',
                    reference:'Luke 16:23'
                },
                {
                    text:'His winnowing fork is in his hand, and he will clear his threshing floor, gathering his wheat into the barn and burning up the chaff with unquenchable fire.',
                    reference:'Matthew 3:12'
                },
                {
                    text:'If anyone&rsquo;s name was not found written in the book of life, he was thrown into the lake of fire.',
                    reference:'Revelation 20:15'
                },
            ]
        },
        {
            original_number:5,
            text:"Everyone who has ever lived will have to one day stand before God to be judged.",
            answer:true,
            scripture:[
                {
                    text:'...it is appointed for men to die once and after this comes the judgment.',
                    reference:'Hebrews 9:27'
                },
                {
                    text:'For we must all appear before the judgment seat of Christ, that each one may receive what is due him for the things done while in the body, whether good or bad.',
                    reference:'2 Corinthians 5:10'
                }
            ]
        },
        {
            original_number:6,
            text:"All humans are born with a sin nature, and because of sin, are headed for Hell.",
            answer:true,
            scripture:[
                {
                    text:'If we say that we have no sin, we are deceiving ourselves, and the truth is not in us.',
                    reference:'1 John 1:8'
                },
                {
                    text:'Surely I was sinful at birth, sinful from the time my mother conceived me.',
                    reference:'Psalm 51:5'
                },
                {
                    text:'There is none righteous, not even one; there is none who understands, there is none who seeks for God; all have turned aside, together they have become useless; there is none who does good, there is not even one.',
                    reference:'Romans 3:10-12'
                }
            ]
        },
        {
            original_number:7,
            new_number:6,
            text:"If a person tries his best to live by the Ten Commandments, and he does more good deeds than bad deeds, he will go to heaven.",
            answer:false,
            scripture:[
                {
                    text:'...by the works of the Law no flesh will be justified in His sight.',
                    reference:'Romans 3:20'
                },
                {
                    text:'For all of us have become like one who is unclean, and all of our righteous deeds are like a filthy garment...',
                    reference:'Isaiah 64:6'
                },
                {
                    text:'For whoever keeps the whole law and yet stumbles at just one point is guilty of breaking all of it.',
                    reference:'James 2:10'
                }
            ]
        },
        {
            new_number:2,
            text:"If you hurt with your words or show hate toward others you are breaking the commandment on murder.",
            answer:true,
            scripture:[
                {
                    text:'We know that we have passed from death to life, because we love our brothers.  Anyone who does not love remains in death.  Anyone who hates his brother is a murderer, and you know that no murderer has eternal life in him.',
                    reference:'1 John 3:14-15'
                }
            ]
        },
        {
            new_number:8,
            text:"The bad news -- no one is good enough to get to heaven.<br />The Good News -- Jesus&rsquo; perfect life and death on the cross paid for our acts of disobedience.<br />You must believe on him and repent of your sins.",
            answer:true,
            scripture:[
                {
                    text:'A trustworthy saying that deserves full acceptance:  Christ Jesus came into the world to save sinners--of whom I am the worst. (The apostle Paul)',
                    reference:'1 Timothy 1:15'
                }
            ]
        }
    ])

    modelStore.Score = Backbone.RelationalModel.extend({
        type:'score',
        collection:'Scores',
        defaults:function(){
            return {
                'answers':[],
                'destination':''
            }
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
    modelStore.Scores = Backbone.Collection.extend({
        model:modelStore.Score,
        url:'/score'
    })


    return modelStore
})
