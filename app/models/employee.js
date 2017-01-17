import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr("string"),
    position: DS.attr("string"),
    office: DS.attr("string"),
    age: DS.attr("number"),
    startDate: DS.attr("string"),
    salary: DS.attr("string")
});
