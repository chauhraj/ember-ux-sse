import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        myClickHandler() {
            console.log("Name column clicked");            
        },
    }    
});
