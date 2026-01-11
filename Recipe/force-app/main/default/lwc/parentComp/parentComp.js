import { api, LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    enteredValue='';
    
    handleInput(event){
        this.enteredValue = event.target.value;
    }
    handleClick(){
       
        const childCom=this.template.querySelector('c-child-comp');
        childCom.updatedMessage(this.enteredValue);

    }
}