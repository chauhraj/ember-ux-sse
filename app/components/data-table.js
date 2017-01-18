import Ember from 'ember';
import ENV from '../config/environment';
import Column from './column';

const APP = ENV.APP;
const {
    Logger
} = Ember;

export default Ember.Component.extend({ 

    tableName: Ember.computed.alias('name'),

    sortedData: Ember.computed.sort('data', 'sortBy'),

    filteredResults: Ember.computed('data', 'sortedData', 'filterValue', 'filterBy', 'currentPage', function() {
        let data = this.get('sortedData');
        if(data === undefined) {
            data = this.get('data');
        }

        let currentPage = this.get('currentPage');
        let pageSize = this.get('pageSize');

        let filterValue = this.get('filterValue');
        let filterBy = this.get('filterBy');
        if(typeof filterValue === 'undefined' && typeof filterValue === 'undefined') {
            return data.slice((currentPage - 1) *pageSize, currentPage*pageSize);
        } else {
            return data.filter((item) => {
                let itemValue = Ember.get(item, filterBy);
                if(typeof itemValue === 'undefined') {
                    return false;
                } else {
                    return itemValue.match(filterValue);
                }
            }).slice((currentPage - 1) * pageSize, currentPage*pageSize);
        }
    }),

    ascending: false,

    pageSize: 10,

    currentPage: 1,

    pagesToDisplayFrom: 1,

    noOfPagesToDisplay: 5,

    pageDisplaySize: Ember.computed('noOfPagesToDisplay', 'totalPages', function(){
        let pageItemSize = this.get('noOfPagesToDisplay');
        let totalPages = this.get('totalPages');
        let array = new Array(parseInt(Math.min(totalPages, pageItemSize)));
        return array;
    }),

    endPageToDisplay: Ember.computed('pagesToDisplayFrom', 'noOfPagesToDisplay', 'totalPages', function(){
        return Math.min(this.get('totalPages'), this.get('pagesToDisplayFrom') + this.get('noOfPagesToDisplay') - 1);
    }),    

    totalPages: Ember.computed('filteredResults', 'filterValue', 'pageSize', function() {
        let dataSet = this.get('filteredValue') === undefined ? 'data.length' :  'filteredResults.length';
        let dataLength = this.get(dataSet);
        let pageSize = this.get('pageSize');
        return Math.ceil(dataLength / pageSize);
    }),

    isFirstPage: Ember.computed('currentPage', function(){
        return this.get('currentPage') === 1;
    }),

    isLastPage: Ember.computed('currentPage', 'totalPages', function(){
        let currentPage = this.get('currentPage');
        let totalPage = this.get('totalPages');
        return currentPage === totalPage;
    }),


    sortBy: Ember.computed('sortingKey', 'ascending', function(){
        const sortKey = this.get('sortingKey');
        const isAscending = this.get('ascending');
        if(isAscending === null || Ember.isEmpty(sortKey)) {
            return [];
        } else {
            return [isAscending ? `${sortKey}:asc` : `${sortKey}:desc`];
        }
    }),

    init() {
        this._super(...arguments);
        let thisTableConfig = APP['dataTables'][this.get('tableName')];
        if(thisTableConfig === undefined) {
            Logger.log(`Failed to find any configuration information for table '${this.get('table')}'`);
        } else {
            let map = Ember.Map.create();
            this.set('columns', map);

            thisTableConfig.forEach(obj => {
                let column = Column.create({
                    displayName: Ember.get(obj, 'displayName'),
                    columnName: Ember.get(obj, 'columnName'),
                    dataType: Ember.get(obj, 'type'),
                    isSortable: Ember.get(obj, 'sortable'),
                    isFilterable: Ember.get(obj, 'filterEnabled'),
                    sortBy: Ember.getWithDefault(obj, 'sortBy', false),
                });
                map.set(column.columnName, column);
            });
            this.set('sortingKey', "");
            this.set('ascending', null);
        }
    },
    actions: {
        gotoPage(pageIndex) {
            Logger.info(`Going to page ${pageIndex}`);
            let currentPage = this.get('currentPage');
            let endPageToDisplay = this.get('endPageToDisplay');
            let pagesToDisplayFrom = this.get('pagesToDisplayFrom');
            if(currentPage === endPageToDisplay && pageIndex > currentPage) {
                let totalPages = this.get('totalPages');
                let noOfPagesToDisplay = this.get('noOfPagesToDisplay');
                if(endPageToDisplay + noOfPagesToDisplay >= totalPages) {
                    this.set('pagesToDisplayFrom', totalPages - noOfPagesToDisplay + 1);
                } else {
                    this.set('pagesToDisplayFrom', pageIndex);
                }
            } else if(currentPage === pagesToDisplayFrom && pageIndex < currentPage) {
                this.set('pagesToDisplayFrom', pageIndex);
            }
            this.set('currentPage', pageIndex);
        },
        filterData(filterValue, columnName) {
            this.set('filterBy', columnName);
        },
        enableMenu(columnName) {
            event.stopImmediatePropagation();
            let parent = this.$(`.data-${columnName}`).parent();
            let dropdownMenu = parent.children('.dropdown-menu');
                dropdownMenu.parent().toggleClass("open");
            if(!dropdownMenu.is(':visible')) {
            }
        },
        sortByColumn(name) {
            console.log(`Sorting by column '${name}'`);
            let currentSortingKey = this.get('sortingKey');
            if(currentSortingKey !== name) {
                this.set('sortingKey', name);
                this.set('ascending', true);
            } else {
                this.toggleProperty('ascending');
            }            
        },
        myClickHandler(name) {
            console.log(`'${name}' column clicked`);            
        },
    }    
});
