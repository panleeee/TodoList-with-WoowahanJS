import Woowahan from 'woowahan';
import MainTemplate from '../templates/main.hbs';
import TodoListView from './todo-list';

export default Woowahan.View.create('MainView', {
    template: MainTemplate,
    container: 'body',
    initialize() {
        this.super();
    },

    viewDidMount() {
        this.todoListView = this.addView('#todo-list', TodoListView, {collectionData: []});
    },
});