Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    preferenceModel:null,
    getPreferencesBySubstring:function(substring,callback,scope){
        Rally.data.PreferenceManager.load({
            additionalFilters :[
                {
                    property: 'Name',
                    operator: 'contains',
                    value: substring
                }
            ],
            scope:scope,
            success:callback
        });
    },

    //adds one saves the preferences
    savePreferenceData:function(data,callback,scope){
        Rally.data.PreferenceManager.update({
            settings:data,
            scope:scope,
            success:callback,
            filterByUser:true
        });
    },

    launch: function() {

        this.savePreferenceData(
            {
                MySuperPref:true,
                MySuperPref2:9
            },
            function(){
                this.getPreferencesBySubstring("MySuperPref",function(preferences){
                    console.log(preferences);
                });
            },
            this
        );
    }
});
