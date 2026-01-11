import { LightningElement,api } from 'lwc';

export default class ChildComp extends LightningElement {
     message='';
     @api
      updatedMessage(valueentered){
         this.message=valueentered;
     }
     

}