// dataCollect.ts
import { SIK } from '../../SIK';
import { HttpRequest } from './httpRequest';
// this.head and Hands Tracking Objects

@component
export class DataCollector extends BaseScriptComponent {
    @input
    id: number;
    @input
    participantId: string;
    @input
    head: SceneObject;
    @input
    leftWrist: SceneObject;
    @input
    rightWrist: SceneObject;
    @input
    leftThumb0: SceneObject;
    @input
    leftThumb1: SceneObject;
    @input
    leftThumb2: SceneObject;
    @input
    leftThumb3: SceneObject;
    @input
    leftThumbTip: SceneObject;
    @input
    leftIndex1: SceneObject;
    @input
    leftIndex2: SceneObject;
    @input
    leftIndex3: SceneObject;
    @input
    leftIndexTip: SceneObject;
    @input
    leftPinky0: SceneObject;
    @input
    leftPinky1: SceneObject;
    @input
    leftPinky2: SceneObject;
    @input
    leftPinky3: SceneObject;
    @input
    leftPinkyTip: SceneObject;
    @input
    leftMiddle1: SceneObject;
    @input
    leftMiddle2: SceneObject;
    @input
    leftMiddle3: SceneObject;
    @input
    leftMiddleTip: SceneObject;
    @input
    leftRing1: SceneObject;
    @input
    leftRing2: SceneObject;
    @input
    leftRing3: SceneObject;
    @input
    leftRingTip: SceneObject;
    @input
    rightThumb0: SceneObject;
    @input
    rightThumb1: SceneObject;
    @input
    rightThumb2: SceneObject;
    @input
    rightThumb3: SceneObject;
    @input
    rightThumbTip: SceneObject;
    @input
    rightIndex1: SceneObject;
    @input
    rightIndex2: SceneObject;
    @input
    rightIndex3: SceneObject;
    @input
    rightIndexTip: SceneObject;
    @input
    rightPinky0: SceneObject;
    @input
    rightPinky1: SceneObject;
    @input
    rightPinky2: SceneObject;
    @input
    rightPinky3: SceneObject;
    @input
    rightPinkyTip: SceneObject;
    @input
    rightMiddle1: SceneObject;
    @input
    rightMiddle2: SceneObject;
    @input
    rightMiddle3: SceneObject;
    @input
    rightMiddleTip: SceneObject;
    @input
    rightRing1: SceneObject;
    @input
    rightRing2: SceneObject;
    @input
    rightRing3: SceneObject;
    @input
    rightRingTip: SceneObject;
    @input
    http: HttpRequest;
    private headHandsMotionData : headHandsMotionRecord;
    private json: JSON;
    private startTime: number;
    private mainJSON = {
        "headControllersMotionRecordList": []
    };
    sampleRateHz: number = 90;

    isRecording: boolean = false;
    timeReference: number = 0;
    toggleRecording: boolean = false;
    dataToText: string;
    
    onAwake() {
        this.headHandsMotionData = new headHandsMotionRecord();
        this.timeReference = 0;
    }
    public toggleButton(): void {
        if (this.toggleRecording) {
            this.stopRecording();
            this.save();
        } else {
            this.startRecording();
        }
        this.toggleRecording = !this.toggleRecording;
    }
    //
    public startRecording(): void {
        if (!this.isRecording) {
            this.isRecording = true;
            }
            //this.motionData.headHandsMotionRecordList = []; // Clear previous session data
            print('start recording invoked');
            this.recordMotionData();
        
    }
    
    public resetTimeReference(): void {
        this.timeReference = 0;
    }
    public stopRecording(): void {
        if (this.isRecording) {
            this.isRecording = false;
        }
    }

    public saveRecording(): void {
        this.saveMotionDataToJson();
        
    }

    public save(): void {
           this.saveMotionDataToJson();
    }

//
   private recordMotionData() {
        //
        print('creating json');
            this.headHandsMotionData.addMotionRecord(
                this.id, 
                this.timeReference += getDeltaTime(),
                { x: this.head.getTransform().getLocalPosition().x, y: this.head.getTransform().getLocalPosition().y, z: this.head.getTransform().getLocalPosition().z},
                { x: this.head.getTransform().getLocalRotation().x, y: this.head.getTransform().getLocalRotation().y, z: this.head.getTransform().getLocalRotation().z, w: this.head.getTransform().getLocalRotation().w},
                );
    }
    private saveMotionDataToJson(): void {
        print(this.headHandsMotionData.getRecordList().length);
        this.mainJSON.headControllersMotionRecordList.push(this.headHandsMotionData.getRecordList());
        this.sendFile(JSON.stringify(this.mainJSON));
    }
    private sendFile(content: string) {
        print('JSON CONTENT: ' + content);
        print('file sending');
        print(this.http.name);
        this.http.sendJSON(content);
        this.headHandsMotionData.clear();
    }
//    private getQuatObject(quaternion: quat): {x: number, y: number, z: number, w: number} {
//        return {x: vector.x, y: vector.y, z: vector.z };
//    }
}
// hella
//
// this.headHandsMotionData.ts

// d
// this.headHandsMotionRecord.ts
export class headHandsMotionRecord {
    
    protected headControllersMotionRecordList = [];
    public getRecordList() {
        
        return this.headControllersMotionRecordList;
    }
    public clear() {
        this.headControllersMotionRecordList = [];
    }
    // Method to add a new motion record
    addMotionRecord(id, timeStamp, headPosition, headRotation) {
        //
        const motionRecord = {
            id: id,
            timeStamp: timeStamp,
            headPosition: {
                x: headPosition.x,
                y: headPosition.y,
                z: headPosition.z
            },//
            headRotation: {
                x: headRotation.x,
                y: headRotation.y,
                z: headRotation.z,
                w: headRotation.w
            },
        };

        this.headControllersMotionRecordList.push(motionRecord);
    }
}


// Utility functions
function getCurrentTime(): number {
    return Date.now();
}
// the
function wait(seconds: number): void {
    var delayedEvent = this.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function(eventData)
    {
        print("Delay is over");
    });
    
    delayedEvent.reset(seconds);
    print("delay has started");   
}