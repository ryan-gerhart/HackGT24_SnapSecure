import { Interactable } from '../Interaction/Interactable/Interactable';
import { SIK } from '../../SIK';
import { DataCollector } from './dataCollect';


@component
export class StartDataCollect extends BaseScriptComponent {
    @input
    dataCollector : DataCollector
    //
    private interactable: Interactable
    private startTime: number
    private isRunning: Boolean
    private firstFalse: Boolean
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
      this.startTime = 0;
      this.setupInteractableCallbacks(this.interactable);
      
  }
  setupInteractableCallbacks(interactable: Interactable) {
      interactable.onTriggerEnd.add(() => {
          this.startTime = new Date().getTime();
          var event = this.createEvent("UpdateEvent");
          this.isRunning = true;
          this.firstFalse = true;
          event.bind(() => this.recordData());
    });
   }
    
    private recordData(): void {
        var delta = new Date().getTime() - this.startTime;
        if (delta > 2000) {
            this.isRunning = false;
            if (this.firstFalse) {
                this.dataCollector.save();
                this.firstFalse = false;
            }
        }
        if (this.isRunning) {
            
            this.dataCollector.setDelta(delta);
            this.dataCollector.startRecording();
            delta = new Date().getTime() - this.startTime;
            this.dataCollector.setDelta(delta);
            this.dataCollector.stopRecording();
        }
        
            
        }
}
