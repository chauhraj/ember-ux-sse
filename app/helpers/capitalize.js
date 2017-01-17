import Ember from 'ember';
import { capitalize as _capitalize } from 'ember-string';

export function capitalize([string]/*, hash*/) {
  let value = string || '';
  return _capitalize(value);
}

export default Ember.Helper.helper(capitalize);
