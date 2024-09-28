// dataCollect.ts
import { SIK } from '../../SIK';
import { HttpRequest } from './httpRequest';
// Head and Hands Tracking Objects

@component
export class DataCollector extends BaseScriptComponent {
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
    private motionData: HeadHandsMotionData = new HeadHandsMotionData();

//
    startTime: number;
    sampleRateHz: number = 90;

    isRecording: boolean = false;
    toggleRecording: boolean = false;
    dataToText: string;
//
    public toggleButton(): void {
        if (this.toggleRecording) {
            this.stopRecording();
            this.save();
        } else {
            this.startRecording();
        }
        this.toggleRecording = !this.toggleRecording;
    }
    
    public startRecording(): void {
        if (!this.isRecording) {
            this.isRecording = true;
            this.motionData.headHandsMotionRecordList = []; // Clear previous session data
            this.startTime = getCurrentTime();
            print('start recording invoked');
            this.recordMotionData();
        }
    }

    public stopRecording(): void {
        if (this.isRecording) {
            this.isRecording = false;
        }
    }

    public saveRecording(): void {
        this.saveMotionDataToJson();
        this.motionData.headHandsMotionRecordList = [];
    }

    public save(): void {
           this.saveMotionDataToJson();
    }


        private recordMotionData() {
        print('creating json');
            this.motionData.headHandsMotionRecordList.push(new HeadHandsMotionRecord({
                id: this.participantId,
                timeStamp: getCurrentTime() - this.startTime,
                headPosition: this.head.getTransform().getLocalPosition().toString().toString(),
                headRotation: this.head.getTransform().getLocalPosition().toString().toString(),

                leftWristPosition: this.leftWrist.getTransform().getLocalPosition().toString().toString(),
                leftWristRotation: this.leftWrist.getTransform().getLocalPosition().toString().toString(),

                leftThumb0Position: this.leftThumb0.getTransform().getLocalPosition().toString(),
                leftThumb0Rotation: this.leftThumb0.getTransform().getLocalPosition().toString(),
                leftThumb1Position: this.leftThumb1.getTransform().getLocalPosition().toString(),
                leftThumb1Rotation: this.leftThumb1.getTransform().getLocalPosition().toString(),
                leftThumb2Position: this.leftThumb2.getTransform().getLocalPosition().toString(),
                leftThumb2Rotation: this.leftThumb2.getTransform().getLocalPosition().toString(),
                leftThumb3Position: this.leftThumb3.getTransform().getLocalPosition().toString(),
                leftThumb3Rotation: this.leftThumb3.getTransform().getLocalPosition().toString(),
                leftThumbTipPosition: this.leftThumbTip.getTransform().getLocalPosition().toString(),
                leftThumbTipRotation: this.leftThumbTip.getTransform().getLocalPosition().toString(),

                leftIndex1Position: this.leftIndex1.getTransform().getLocalPosition().toString(),
                leftIndex1Rotation: this.leftIndex1.getTransform().getLocalPosition().toString(),
                leftIndex2Position: this.leftIndex2.getTransform().getLocalPosition().toString(),
                leftIndex2Rotation: this.leftIndex2.getTransform().getLocalPosition().toString(),
                leftIndex3Position: this.leftIndex3.getTransform().getLocalPosition().toString(),
                leftIndex3Rotation: this.leftIndex3.getTransform().getLocalPosition().toString(),
                leftIndexTipPosition: this.leftIndexTip.getTransform().getLocalPosition().toString(),
                leftIndexTipRotation: this.leftIndexTip.getTransform().getLocalPosition().toString(),

                leftPinky0Position: this.leftPinky0.getTransform().getLocalPosition().toString(),
                leftPinky0Rotation: this.leftPinky0.getTransform().getLocalPosition().toString(),
                leftPinky1Position: this.leftPinky1.getTransform().getLocalPosition().toString(),
                leftPinky1Rotation: this.leftPinky1.getTransform().getLocalPosition().toString(),
                leftPinky2Position: this.leftPinky2.getTransform().getLocalPosition().toString(),
                leftPinky2Rotation: this.leftPinky2.getTransform().getLocalPosition().toString(),
                leftPinky3Position: this.leftPinky3.getTransform().getLocalPosition().toString(),
                leftPinky3Rotation: this.leftPinky3.getTransform().getLocalPosition().toString(),
                leftPinkyTipPosition: this.leftPinkyTip.getTransform().getLocalPosition().toString(),
                leftPinkyTipRotation: this.leftPinkyTip.getTransform().getLocalPosition().toString(),

                leftMiddle1Position: this.leftMiddle1.getTransform().getLocalPosition().toString(),
                leftMiddle1Rotation: this.leftMiddle1.getTransform().getLocalPosition().toString(),
                leftMiddle2Position: this.leftMiddle2.getTransform().getLocalPosition().toString(),
                leftMiddle2Rotation: this.leftMiddle2.getTransform().getLocalPosition().toString(),
                leftMiddle3Position: this.leftMiddle3.getTransform().getLocalPosition().toString(),
                leftMiddle3Rotation: this.leftMiddle3.getTransform().getLocalPosition().toString(),
                leftMiddleTipPosition: this.leftMiddleTip.getTransform().getLocalPosition().toString(),
                leftMiddleTipRotation: this.leftMiddleTip.getTransform().getLocalPosition().toString(),

                leftRing1Position: this.leftRing1.getTransform().getLocalPosition().toString(),
                leftRing1Rotation: this.leftRing1.getTransform().getLocalPosition().toString(),
                leftRing2Position: this.leftRing2.getTransform().getLocalPosition().toString(),
                leftRing2Rotation: this.leftRing2.getTransform().getLocalPosition().toString(),
                leftRing3Position: this.leftRing3.getTransform().getLocalPosition().toString(),
                leftRing3Rotation: this.leftRing3.getTransform().getLocalPosition().toString(),
                leftRingTipPosition: this.leftRingTip.getTransform().getLocalPosition().toString(),
                leftRingTipRotation: this.leftRingTip.getTransform().getLocalPosition().toString(),

                rightWristPosition: this.rightWrist.getTransform().getLocalPosition().toString(),
                rightWristRotation: this.rightWrist.getTransform().getLocalPosition().toString(),

                rightThumb0Position: this.rightThumb0.getTransform().getLocalPosition().toString(),
                rightThumb0Rotation: this.rightThumb0.getTransform().getLocalPosition().toString(),
                rightThumb1Position: this.rightThumb1.getTransform().getLocalPosition().toString(),
                rightThumb1Rotation: this.rightThumb1.getTransform().getLocalPosition().toString(),
                rightThumb2Position: this.rightThumb2.getTransform().getLocalPosition().toString(),
                rightThumb2Rotation: this.rightThumb2.getTransform().getLocalPosition().toString(),
                rightThumb3Position: this.rightThumb3.getTransform().getLocalPosition().toString(),
                rightThumb3Rotation: this.rightThumb3.getTransform().getLocalPosition().toString(),
                rightThumbTipPosition: this.rightThumbTip.getTransform().getLocalPosition().toString(),
                rightThumbTipRotation: this.rightThumbTip.getTransform().getLocalPosition().toString(),

                rightIndex1Position: this.rightIndex1.getTransform().getLocalPosition().toString(),
                rightIndex1Rotation: this.rightIndex1.getTransform().getLocalPosition().toString(),
                rightIndex2Position: this.rightIndex2.getTransform().getLocalPosition().toString(),
                rightIndex2Rotation: this.rightIndex2.getTransform().getLocalPosition().toString(),
                rightIndex3Position: this.rightIndex3.getTransform().getLocalPosition().toString(),
                rightIndex3Rotation: this.rightIndex3.getTransform().getLocalPosition().toString(),
                rightIndexTipPosition: this.rightIndexTip.getTransform().getLocalPosition().toString(),
                rightIndexTipRotation: this.rightIndexTip.getTransform().getLocalPosition().toString(),

                rightPinky0Position: this.rightPinky0.getTransform().getLocalPosition().toString(),
                rightPinky0Rotation: this.rightPinky0.getTransform().getLocalPosition().toString(),
                rightPinky1Position: this.rightPinky1.getTransform().getLocalPosition().toString(),
                rightPinky1Rotation: this.rightPinky1.getTransform().getLocalPosition().toString(),
                rightPinky2Position: this.rightPinky2.getTransform().getLocalPosition().toString(),
                rightPinky2Rotation: this.rightPinky2.getTransform().getLocalPosition().toString(),
                rightPinky3Position: this.rightPinky3.getTransform().getLocalPosition().toString(),
                rightPinky3Rotation: this.rightPinky3.getTransform().getLocalPosition().toString(),
                rightPinkyTipPosition: this.rightPinkyTip.getTransform().getLocalPosition().toString(),
                rightPinkyTipRotation: this.rightPinkyTip.getTransform().getLocalPosition().toString(),

                rightMiddle1Position: this.rightMiddle1.getTransform().getLocalPosition().toString(),
                rightMiddle1Rotation: this.rightMiddle1.getTransform().getLocalPosition().toString(),
                rightMiddle2Position: this.rightMiddle2.getTransform().getLocalPosition().toString(),
                rightMiddle2Rotation: this.rightMiddle2.getTransform().getLocalPosition().toString(),
                rightMiddle3Position: this.rightMiddle3.getTransform().getLocalPosition().toString(),
                rightMiddle3Rotation: this.rightMiddle3.getTransform().getLocalPosition().toString(),
                rightMiddleTipPosition: this.rightMiddleTip.getTransform().getLocalPosition().toString(),
                rightMiddleTipRotation: this.rightMiddleTip.getTransform().getLocalPosition().toString(),

                rightRing1Position: this.rightRing1.getTransform().getLocalPosition().toString(),
                rightRing1Rotation: this.rightRing1.getTransform().getLocalPosition().toString(),
                rightRing2Position: this.rightRing2.getTransform().getLocalPosition().toString(),
                rightRing2Rotation: this.rightRing2.getTransform().getLocalPosition().toString(),
                rightRing3Position: this.rightRing3.getTransform().getLocalPosition().toString(),
                rightRing3Rotation: this.rightRing3.getTransform().getLocalPosition().toString(),
                rightRingTipPosition: this.rightRingTip.getTransform().getLocalPosition().toString(),
                rightRingTipRotation: this.rightRingTip.getTransform().getLocalPosition().toString(),
            }));
    }
    private saveMotionDataToJson(): void {
        const json = JSON.stringify(this.motionData);
        this.sendFile(json);
    }
    private sendFile(content: string) {
    print('JSON CONTENT: ' + content);
    print('file sending');
    print(this.http.name);
    this.http.sendJSON(content);
}
}
// hella
// HeadHandsMotionData.ts
export class HeadHandsMotionData {
    headHandsMotionRecordList: HeadHandsMotionRecord[] = [];
}
// d
// HeadHandsMotionRecord.ts
export class HeadHandsMotionRecord {
    id: string;
    timeStamp: number;
    headPosition: string;
    headRotation: string;

    leftWristPosition: string;
    leftWristRotation: string;
    leftThumb0Position: string;
    leftThumb0Rotation: string;
    leftThumb1Position: string;
    leftThumb1Rotation: string;
    leftThumb2Position: string;
    leftThumb2Rotation: string;
    leftThumb3Position: string;
    leftThumb3Rotation: string;
    leftThumbTipPosition: string;
    leftThumbTipRotation: string;

    leftIndex1Position: string;
    leftIndex1Rotation: string;
    leftIndex2Position: string;
    leftIndex2Rotation: string;
    leftIndex3Position: string;
    leftIndex3Rotation: string;
    leftIndexTipPosition: string;
    leftIndexTipRotation: string;

    leftPinky0Position: string;
    leftPinky0Rotation: string;
    leftPinky1Position: string;
    leftPinky1Rotation: string;
    leftPinky2Position: string;
    leftPinky2Rotation: string;
    leftPinky3Position: string;
    leftPinky3Rotation: string;
    leftPinkyTipPosition: string;
    leftPinkyTipRotation: string;

    leftMiddle1Position: string;
    leftMiddle1Rotation: string;
    leftMiddle2Position: string;
    leftMiddle2Rotation: string;
    leftMiddle3Position: string;
    leftMiddle3Rotation: string;
    leftMiddleTipPosition: string;
    leftMiddleTipRotation: string;

    leftRing1Position: string;
    leftRing1Rotation: string;
    leftRing2Position: string;
    leftRing2Rotation: string;
    leftRing3Position: string;
    leftRing3Rotation: string;
    leftRingTipPosition: string;
    leftRingTipRotation: string;

    rightWristPosition: string;
    rightWristRotation: string;
    rightThumb0Position: string;
    rightThumb0Rotation: string;
    rightThumb1Position: string;
    rightThumb1Rotation: string;
    rightThumb2Position: string;
    rightThumb2Rotation: string;
    rightThumb3Position: string;
    rightThumb3Rotation: string;
    rightThumbTipPosition: string;
    rightThumbTipRotation: string;

    rightIndex1Position: string;
    rightIndex1Rotation: string;
    rightIndex2Position: string;
    rightIndex2Rotation: string;
    rightIndex3Position: string;
    rightIndex3Rotation: string;
    rightIndexTipPosition: string;
    rightIndexTipRotation: string;

    rightPinky0Position: string;
    rightPinky0Rotation: string;
    rightPinky1Position: string;
    rightPinky1Rotation: string;
    rightPinky2Position: string;
    rightPinky2Rotation: string;
    rightPinky3Position: string;
    rightPinky3Rotation: string;
    rightPinkyTipPosition: string;
    rightPinkyTipRotation: string;

    rightMiddle1Position: string;
    rightMiddle1Rotation: string;
    rightMiddle2Position: string;
    rightMiddle2Rotation: string;
    rightMiddle3Position: string;
    rightMiddle3Rotation: string;
    rightMiddleTipPosition: string;
    rightMiddleTipRotation: string;

    rightRing1Position: string;
    rightRing1Rotation: string;
    rightRing2Position: string;
    rightRing2Rotation: string;
    rightRing3Position: string;
    rightRing3Rotation: string;
    rightRingTipPosition: string;
    rightRingTipRotation: string;

    constructor(data: Partial<HeadHandsMotionRecord>) {
        Object.assign(this, data);
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


