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
    httpRequest: HttpRequest;
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
            this.stopRecordingAndSave();
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

    public stopRecordingAndSave(): void {
        if (this.isRecording) {
            this.isRecording = false;
            this.saveMotionDataToJson();
            //this.motionData.headHandsMotionRecordList = [];
        }
    }
 
//    private recordMotionData() {
//        print('creating json');
//        while (this.isRecording) {
//            this.motionData.headHandsMotionRecordList.push(new HeadHandsMotionRecord({
//                id: this.participantId,
//                timeStamp: getCurrentTime() - this.startTime,
//                headPosition: this.head.getTransform().getLocalPosition(),
//                headRotation: this.head.getTransform().getLocalRotation(),
//
//                leftWristPosition: this.leftWrist.getTransform().getLocalPosition(),
//                leftWristRotation: this.leftWrist.getTransform().getLocalRotation(),
//
//                leftThumb0Position: this.leftThumb0.getTransform().getLocalPosition(),
//                leftThumb0Rotation: this.leftThumb0.getTransform().getLocalRotation(),
//                leftThumb1Position: this.leftThumb1.getTransform().getLocalPosition(),
//                leftThumb1Rotation: this.leftThumb1.getTransform().getLocalRotation(),
//                leftThumb2Position: this.leftThumb2.getTransform().getLocalPosition(),
//                leftThumb2Rotation: this.leftThumb2.getTransform().getLocalRotation(),
//                leftThumb3Position: this.leftThumb3.getTransform().getLocalPosition(),
//                leftThumb3Rotation: this.leftThumb3.getTransform().getLocalRotation(),
//                leftThumbTipPosition: this.leftThumbTip.getTransform().getLocalPosition(),
//                leftThumbTipRotation: this.leftThumbTip.getTransform().getLocalRotation(),
//
//                leftIndex1Position: this.leftIndex1.getTransform().getLocalPosition(),
//                leftIndex1Rotation: this.leftIndex1.getTransform().getLocalRotation(),
//                leftIndex2Position: this.leftIndex2.getTransform().getLocalPosition(),
//                leftIndex2Rotation: this.leftIndex2.getTransform().getLocalRotation(),
//                leftIndex3Position: this.leftIndex3.getTransform().getLocalPosition(),
//                leftIndex3Rotation: this.leftIndex3.getTransform().getLocalRotation(),
//                leftIndexTipPosition: this.leftIndexTip.getTransform().getLocalPosition(),
//                leftIndexTipRotation: this.leftIndexTip.getTransform().getLocalRotation(),
//
//                leftPinky0Position: this.leftPinky0.getTransform().getLocalPosition(),
//                leftPinky0Rotation: this.leftPinky0.getTransform().getLocalRotation(),
//                leftPinky1Position: this.leftPinky1.getTransform().getLocalPosition(),
//                leftPinky1Rotation: this.leftPinky1.getTransform().getLocalRotation(),
//                leftPinky2Position: this.leftPinky2.getTransform().getLocalPosition(),
//                leftPinky2Rotation: this.leftPinky2.getTransform().getLocalRotation(),
//                leftPinky3Position: this.leftPinky3.getTransform().getLocalPosition(),
//                leftPinky3Rotation: this.leftPinky3.getTransform().getLocalRotation(),
//                leftPinkyTipPosition: this.leftPinkyTip.getTransform().getLocalPosition(),
//                leftPinkyTipRotation: this.leftPinkyTip.getTransform().getLocalRotation(),
//
//                leftMiddle1Position: this.leftMiddle1.getTransform().getLocalPosition(),
//                leftMiddle1Rotation: this.leftMiddle1.getTransform().getLocalRotation(),
//                leftMiddle2Position: this.leftMiddle2.getTransform().getLocalPosition(),
//                leftMiddle2Rotation: this.leftMiddle2.getTransform().getLocalRotation(),
//                leftMiddle3Position: this.leftMiddle3.getTransform().getLocalPosition(),
//                leftMiddle3Rotation: this.leftMiddle3.getTransform().getLocalRotation(),
//                leftMiddleTipPosition: this.leftMiddleTip.getTransform().getLocalPosition(),
//                leftMiddleTipRotation: this.leftMiddleTip.getTransform().getLocalRotation(),
//
//                leftRing1Position: this.leftRing1.getTransform().getLocalPosition(),
//                leftRing1Rotation: this.leftRing1.getTransform().getLocalRotation(),
//                leftRing2Position: this.leftRing2.getTransform().getLocalPosition(),
//                leftRing2Rotation: this.leftRing2.getTransform().getLocalRotation(),
//                leftRing3Position: this.leftRing3.getTransform().getLocalPosition(),
//                leftRing3Rotation: this.leftRing3.getTransform().getLocalRotation(),
//                leftRingTipPosition: this.leftRingTip.getTransform().getLocalPosition(),
//                leftRingTipRotation: this.leftRingTip.getTransform().getLocalRotation(),
//
//                rightWristPosition: this.rightWrist.getTransform().getLocalPosition(),
//                rightWristRotation: this.rightWrist.getTransform().getLocalRotation(),
//
//                rightThumb0Position: this.rightThumb0.getTransform().getLocalPosition(),
//                rightThumb0Rotation: this.rightThumb0.getTransform().getLocalRotation(),
//                rightThumb1Position: this.rightThumb1.getTransform().getLocalPosition(),
//                rightThumb1Rotation: this.rightThumb1.getTransform().getLocalRotation(),
//                rightThumb2Position: this.rightThumb2.getTransform().getLocalPosition(),
//                rightThumb2Rotation: this.rightThumb2.getTransform().getLocalRotation(),
//                rightThumb3Position: this.rightThumb3.getTransform().getLocalPosition(),
//                rightThumb3Rotation: this.rightThumb3.getTransform().getLocalRotation(),
//                rightThumbTipPosition: this.rightThumbTip.getTransform().getLocalPosition(),
//                rightThumbTipRotation: this.rightThumbTip.getTransform().getLocalRotation(),
//
//                rightIndex1Position: this.rightIndex1.getTransform().getLocalPosition(),
//                rightIndex1Rotation: this.rightIndex1.getTransform().getLocalRotation(),
//                rightIndex2Position: this.rightIndex2.getTransform().getLocalPosition(),
//                rightIndex2Rotation: this.rightIndex2.getTransform().getLocalRotation(),
//                rightIndex3Position: this.rightIndex3.getTransform().getLocalPosition(),
//                rightIndex3Rotation: this.rightIndex3.getTransform().getLocalRotation(),
//                rightIndexTipPosition: this.rightIndexTip.getTransform().getLocalPosition(),
//                rightIndexTipRotation: this.rightIndexTip.getTransform().getLocalRotation(),
//
//                rightPinky0Position: this.rightPinky0.getTransform().getLocalPosition(),
//                rightPinky0Rotation: this.rightPinky0.getTransform().getLocalRotation(),
//                rightPinky1Position: this.rightPinky1.getTransform().getLocalPosition(),
//                rightPinky1Rotation: this.rightPinky1.getTransform().getLocalRotation(),
//                rightPinky2Position: this.rightPinky2.getTransform().getLocalPosition(),
//                rightPinky2Rotation: this.rightPinky2.getTransform().getLocalRotation(),
//                rightPinky3Position: this.rightPinky3.getTransform().getLocalPosition(),
//                rightPinky3Rotation: this.rightPinky3.getTransform().getLocalRotation(),
//                rightPinkyTipPosition: this.rightPinkyTip.getTransform().getLocalPosition(),
//                rightPinkyTipRotation: this.rightPinkyTip.getTransform().getLocalRotation(),
//
//                rightMiddle1Position: this.rightMiddle1.getTransform().getLocalPosition(),
//                rightMiddle1Rotation: this.rightMiddle1.getTransform().getLocalRotation(),
//                rightMiddle2Position: this.rightMiddle2.getTransform().getLocalPosition(),
//                rightMiddle2Rotation: this.rightMiddle2.getTransform().getLocalRotation(),
//                rightMiddle3Position: this.rightMiddle3.getTransform().getLocalPosition(),
//                rightMiddle3Rotation: this.rightMiddle3.getTransform().getLocalRotation(),
//                rightMiddleTipPosition: this.rightMiddleTip.getTransform().getLocalPosition(),
//                rightMiddleTipRotation: this.rightMiddleTip.getTransform().getLocalRotation(),
//
//                rightRing1Position: this.rightRing1.getTransform().getLocalPosition(),
//                rightRing1Rotation: this.rightRing1.getTransform().getLocalRotation(),
//                rightRing2Position: this.rightRing2.getTransform().getLocalPosition(),
//                rightRing2Rotation: this.rightRing2.getTransform().getLocalRotation(),
//                rightRing3Position: this.rightRing3.getTransform().getLocalPosition(),
//                rightRing3Rotation: this.rightRing3.getTransform().getLocalRotation(),
//                rightRingTipPosition: this.rightRingTip.getTransform().getLocalPosition(),
//                rightRingTipRotation: this.rightRingTip.getTransform().getLocalRotation(),
//            }));
//        }
//    }

        private recordMotionData() {
        print('creating json');
            this.motionData.headHandsMotionRecordList.push(new HeadHandsMotionRecord({
                id: this.participantId,
                timeStamp: getCurrentTime() - this.startTime,
                headPosition: this.head.getTransform().getLocalPosition(),
                headRotation: this.head.getTransform().getLocalRotation(),
            }));
    }
    private saveMotionDataToJson(): void {
        const json = JSON.stringify(this.motionData);
        sendFile(json);
    }
}
// hella
// HeadHandsMotionData.ts
export class HeadHandsMotionData {
    headHandsMotionRecordList: HeadHandsMotionRecord[] = [];
}
//
// HeadHandsMotionRecord.ts
export class HeadHandsMotionRecord {
    id: string;
    timeStamp: number;
    headPosition: vec3;
    headRotation: quat;

    leftWristPosition: vec3;
    leftWristRotation: quat;
    leftThumb0Position: vec3;
    leftThumb0Rotation: quat;
    leftThumb1Position: vec3;
    leftThumb1Rotation: quat;
    leftThumb2Position: vec3;
    leftThumb2Rotation: quat;
    leftThumb3Position: vec3;
    leftThumb3Rotation: quat;
    leftThumbTipPosition: vec3;
    leftThumbTipRotation: quat;

    leftIndex1Position: vec3;
    leftIndex1Rotation: quat;
    leftIndex2Position: vec3;
    leftIndex2Rotation: quat;
    leftIndex3Position: vec3;
    leftIndex3Rotation: quat;
    leftIndexTipPosition: vec3;
    leftIndexTipRotation: quat;

    leftPinky0Position: vec3;
    leftPinky0Rotation: quat;
    leftPinky1Position: vec3;
    leftPinky1Rotation: quat;
    leftPinky2Position: vec3;
    leftPinky2Rotation: quat;
    leftPinky3Position: vec3;
    leftPinky3Rotation: quat;
    leftPinkyTipPosition: vec3;
    leftPinkyTipRotation: quat;

    leftMiddle1Position: vec3;
    leftMiddle1Rotation: quat;
    leftMiddle2Position: vec3;
    leftMiddle2Rotation: quat;
    leftMiddle3Position: vec3;
    leftMiddle3Rotation: quat;
    leftMiddleTipPosition: vec3;
    leftMiddleTipRotation: quat;

    leftRing1Position: vec3;
    leftRing1Rotation: quat;
    leftRing2Position: vec3;
    leftRing2Rotation: quat;
    leftRing3Position: vec3;
    leftRing3Rotation: quat;
    leftRingTipPosition: vec3;
    leftRingTipRotation: quat;

    rightWristPosition: vec3;
    rightWristRotation: quat;
    rightThumb0Position: vec3;
    rightThumb0Rotation: quat;
    rightThumb1Position: vec3;
    rightThumb1Rotation: quat;
    rightThumb2Position: vec3;
    rightThumb2Rotation: quat;
    rightThumb3Position: vec3;
    rightThumb3Rotation: quat;
    rightThumbTipPosition: vec3;
    rightThumbTipRotation: quat;

    rightIndex1Position: vec3;
    rightIndex1Rotation: quat;
    rightIndex2Position: vec3;
    rightIndex2Rotation: quat;
    rightIndex3Position: vec3;
    rightIndex3Rotation: quat;
    rightIndexTipPosition: vec3;
    rightIndexTipRotation: quat;

    rightPinky0Position: vec3;
    rightPinky0Rotation: quat;
    rightPinky1Position: vec3;
    rightPinky1Rotation: quat;
    rightPinky2Position: vec3;
    rightPinky2Rotation: quat;
    rightPinky3Position: vec3;
    rightPinky3Rotation: quat;
    rightPinkyTipPosition: vec3;
    rightPinkyTipRotation: quat;

    rightMiddle1Position: vec3;
    rightMiddle1Rotation: quat;
    rightMiddle2Position: vec3;
    rightMiddle2Rotation: quat;
    rightMiddle3Position: vec3;
    rightMiddle3Rotation: quat;
    rightMiddleTipPosition: vec3;
    rightMiddleTipRotation: quat;

    rightRing1Position: vec3;
    rightRing1Rotation: quat;
    rightRing2Position: vec3;
    rightRing2Rotation: quat;
    rightRing3Position: vec3;
    rightRing3Rotation: quat;
    rightRingTipPosition: vec3;
    rightRingTipRotation: quat;

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

function sendFile(content: string): void {
    print('file sending');
    this.httpRequest.sendJSON(this.content);
}
