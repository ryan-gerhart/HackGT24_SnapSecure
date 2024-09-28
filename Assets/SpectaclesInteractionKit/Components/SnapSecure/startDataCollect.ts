import { Interactable } from '../Interaction/Interactable/Interactable';
import { SIK } from '../../SIK';
import { DataCollector } from './dataCollect';


@component
export class StartDataCollect extends BaseScriptComponent {
    @input
    dataCollector : DataCollector
    //
    private interactable: Interactable
    private timer: number
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
      this.timer = 0;
      this.setupInteractableCallbacks(this.interactable);
  }
  setupInteractableCallbacks(interactable: Interactable) {
      interactable.onTriggerEnd.add(() => {
          this.recordData();
      });
  }
  private recordData() {
        print('recording data');
        
        
        while (this.timer < 2) {
            this.dataCollector.startRecording();
            this.timer += getDeltaTime()
            print(this.timer);
            this.dataCollector.stopRecording();
        }
        this.dataCollector.save();

        this.timer = 0;
  }
}
