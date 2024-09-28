import { Interactable } from '../Interaction/Interactable/Interactable';
import { SIK } from '../../SIK';
import { DataCollector } from './dataCollect';


@component
export class StartDataCollect extends BaseScriptComponent {
    @input
    VideoChosen: SceneObject;
    @input
    Video2: SceneObject;
    @input
    Video3: SceneObject;
    
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
          this.video();
      });
  }
  private video() {
        // Disable all the videos
        this.VideoChosen.enabled = false;
        this.Video2.enabled = false;
        this.Video3.enabled = false;
        //
        // Re-enable the selected video (VideoChosen)
        this.VideoChosen.enabled = true; 
  }
}
