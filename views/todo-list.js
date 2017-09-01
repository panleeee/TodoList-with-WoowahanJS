import Woowahan from 'woowahan';
import TodoListTemplate from '../templates/todo-list.hbs';
import ListItemView from './list-item';
import AddListPopupView from './add-list-popup';

export default Woowahan.CollectionView.create('TodoListView', {
    template: TodoListTemplate,
    rowView: ListItemView,
    rowContainer: '.container',
    events: {
        'change #all-checkbox': 'checkAllCheckbox',
        'click #open-add-popup': 'openPopup',
        'click #delete-btn': 'clickDeleteBtn'
    },
    initialize() {
        this.setModel({
            isDisplayCheckbox: true,
            isAllCheckboxChecked: false
        });
        this.super();
    },
    viewDidMount() {
        if(!!this.getModel('collectionData')) {
            this.reload(this.getModel('collectionData'));
        }
    },

    // change checkboxes checked state
    checkAllCheckbox() {
        this.setModel({
            isAllCheckboxChecked: !this.getModel('isAllCheckboxChecked')
        });

        // collectionData가 비어있지 않을 경우
        if (!!this.getModel('collectionData')) {

            //this 스코프를 익명 함수에서도 사용하기 위해서 _this 생성
            let _this = this;

            //collectionData의 각 요소의 isCheckboxChecked 값을 모두 같게해줌
            this.getModel('collectionData')
                .map(function (value, index) {
                    value['isCheckboxChecked'] = _this.getModel('isAllCheckboxChecked');
                });
        }

        // View를 다시 보여줌
        this.updateView();
    },

    openPopup() {
        this.addPopup(AddListPopupView, this.addTask);
    },

    addTask(data) {
        let collection = this.getCollection();

        if (!!data) {
            if (data.length > 0) {
                collection.push(new task(data.toString()));
                this.reload(collection);
            }
        }
        this.changeCheckboxDisplay(false);
    },

    clickDeleteBtn() {
        if (!!this.getModel('isDisplayCheckbox')) {
            this.changeCheckboxDisplay(this.getModel('isDisplayCheckbox'));
        } else {
            this.deleteTask();
        }
    },

    deleteTask() {
        if (!!this.getCollection()) {
            let collection = this.getCollection();
            let index;
            for(index = collection.length-1; index >= 0; index--){
                if(collection[index].isCheckboxChecked === true){
                    collection.splice(index,1);
                }
            }
            this.reload(collection);
        }
        this.setModel({
            isAllCheckboxChecked: false
        });
        this.changeCheckboxDisplay(this.getModel('isDisplayCheckbox'));
    },

    changeCheckboxDisplay(displayState) {
        let collection = this.getCollection();

        if (!!collection) {
            collection.map(function (props, index) {
                props['isDisplayCheckbox'] = !displayState
            });
        }

        this.setModel({
            'collectionData': collection,
            'isDisplayCheckbox': !displayState
        });
        this.updateView();
    }
});

function task(taskName) {
  var now = new Date();
  this.taskName = taskName;
  this.isCheckboxChecked = false;
  this.publishDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}