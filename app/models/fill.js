import DS from 'ember-data';

export default DS.Model.extend({
    symbol: DS.attr('string'),
    side: DS.attr("string"), 
    quantity: DS.attr('number'), 
    price: DS.attr('number'), 
    ts: DS.attr('date')
});
