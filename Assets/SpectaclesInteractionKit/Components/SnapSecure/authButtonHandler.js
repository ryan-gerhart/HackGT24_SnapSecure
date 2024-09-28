// authButtonHandler.js
import { InteractorEvent } from '../../../Core/Interactor/InteractorEvent';
import Event from '../../../Utils/Event';
import { createCallback } from '../../../Utils/InspectorCallbacks';
import NativeLogger from '../../../Utils/NativeLogger';
import { Interactable } from '../../Interaction/Interactable/Interactable';

//@input Component dataCollector;
//@input int recordTimeMs;

var interactable;

    onAwake() {
      this.defineScriptEvents();
  }
    private defineScriptEvents() {
        this.createEvent('OnStartEvent').bind(() => {
      this.init();
  });
}
init() {
      this.interactable = this
          .getSceneObject()
          .getComponent(Interactable.getTypeName());
      if (this.interactable === null || this.interactable === undefined) {
          throw new Error('AuthButtonHandler script requires an Interactable on the same SceneObject');
      }
      this.setupInteractableCallbacks(this.interactable);
  }
setupInteractableCallbacks(interactable) {
    interactable.onTriggerEnd.add(() => {
        this.recordForSecs(2000); // records in ms
    });
}
recordForSecs(duration) {
    this.dataCollector.startRecording();
    setTimeout(() => {
        dataCollector.stopRecording();
    }, duration);
    
}


