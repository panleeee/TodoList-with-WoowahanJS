import Woowahan from 'woowahan';
import popupTemplate from '../templates/add-list-popup.hbs';

export default Woowahan.PopupView.create('AddListPopupView',{
    template: popupTemplate,
    events: {
        'overlayClicked': 'onOverlayClick',
        'click #add-task-btn': 'addTask',
    },

    onOverlayClick() {
        this.closePopup();
    },

    addTask() {
        this.closePopup(this.$el.find('#task-desc').val());
    }
});