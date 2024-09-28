import { Interactable } from '../Interaction/Interactable/Interactable';
import { SIK } from '../../SIK';
import { DataCollector } from './dataCollect'

@component
export class StartDataCollect extends BaseScriptComponent {
    @input
    dataCollector : DataCollector
    //
    private interactable: Interactable
    private timeElapsed: number
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
          throw new Error('PointerColorVisual script requires an Interactable on the same SceneObject');
      }

      this.setupInteractableCallbacks(this.interactable);
  }
  setupInteractableCallbacks(interactable: Interactable) {
      interactable.onTriggerEnd.add(() => {
          this.recordData();
          this.timeElapsed = 0;
      });
  }
  private recordData() {
        while (this.timeElapsed < 2) {
            this.dataCollector.startRecording();
            this.timeElapsed += getDeltaTime();
        }
        this.dataCollector.stopRecording();
        
  }
}
