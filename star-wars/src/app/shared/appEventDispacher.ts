import { EventEmitter } from 'events';

export class AppEventDispatcher {

  static myEvent = new EventEmitter();

  /**
	 * Dispara o evento
	 * @param myEventName string de identificação do evento
   * @param data dados para transportar no evento 
  */
  static dispatch(myEventName: string, data: any) {
    AppEventDispatcher.myEvent.emit(myEventName, data);
  }


  /**
	 * Ouve o evento
	 * @param myEventName string de identificação do evento
   * @param handler dados para transportar no evento
  */
  static listen(myEventName: string, handler: any) {
    AppEventDispatcher.myEvent.addListener(myEventName, handler);
  }

  
  /**
	 * Remove o evento
	 * @param myEventName string de identificação do evento
  */
  static removeListener(myEventName: string) {
    AppEventDispatcher.myEvent.removeAllListeners(myEventName);
  }

  constructor() {

  }

}
