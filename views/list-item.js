import Woowahan from 'woowahan';
import ItemTemplate from '../templates/list-item.hbs';

export default Woowahan.ItemView.create('ListItemView',{
    template: ItemTemplate,
    events:{
        'change input[type="checkbox"]': 'changeCheckState',
        'dblclick': 'completeTask'
    },

    changeCheckState() {
        this.setModel({
            'isCheckboxChecked': !this.getModel('isCheckboxChecked')
        });
    },

    completeTask() {
        console.log('complete task!!');
    }
});