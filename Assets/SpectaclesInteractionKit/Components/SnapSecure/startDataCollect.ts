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
          this.recordData();
      });
  }

  private recordData() {
        print('get time: ' + getTime());
        print('recording data');
        this.startTime = new Date().getTime();
        var delta = new Date().getTime() - this.startTime;
        this.dataCollector.setDelta(delta);
        print(delta);
        while (delta < 2) {
            this.dataCollector.startRecording();
            delta = new Date().getTime() - this.startTime;
            print(getTime());
            print('delta: ' + delta)
            this.dataCollector.setDelta(delta);
            print(this.startTime);
            this.dataCollector.stopRecording();
        }
        this.dataCollector.save();

        this.startTime = 0;
  }
}
