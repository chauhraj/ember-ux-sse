import Ember from 'ember';
import ENV from '../config/environment';
import Column from './column';

const APP = ENV.APP;
const {
    Logger
} = Ember;
export default Ember.Component.extend({

    tableName: Ember.computed.alias('name'),
    columns: Ember.A(),

    init() {
        this._super(...arguments);
        let thisTableConfig = APP['dataTables'][this.get('tableName')];
        if(thisTableConfig === undefined) {
            Logger.log(`Failed to find any configuration information for table '${this.get('table')}'`);
        } else {
            let array = this.get('columns');
            thisTableConfig.forEach(obj => {
                let column = Column.create({
                    displayName: Ember.get(obj, 'displayName'),
                    columnName: Ember.get(obj, 'columnName'),
                    dataType: Ember.get(obj, 'type'),
                    isSortable: Ember.get(obj, 'sortable'),
                    isFilterable: Ember.get(obj, 'filterEnabled'),
                });
                array.pushObject(column);
            });
        }
    },
    actions: {
        myClickHandler() {
            console.log("Name column clicked");            
        },
    }    
});
