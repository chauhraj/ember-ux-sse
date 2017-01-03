import Ember from 'ember';
export default Ember.Object.extend({
    columnName: null,
    displayName: null,
    dataType: null,
    isSortable: false,
    isFilterable: false
});