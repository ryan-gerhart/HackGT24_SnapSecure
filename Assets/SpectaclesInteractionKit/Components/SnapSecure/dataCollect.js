// dataCollect.js
const { Scene, Object3D, Timer, ScriptComponent } = require('lens-studio');
// Head and Hands Tracking Objects
//@input SceneObject head
//@input SceneObject leftWrist
//@input SceneObject rightWrist
//
//@input SceneObject leftThumb0
//@input SceneObject leftThumb1
//@input SceneObject leftThumb2
//@input SceneObject leftThumb3

//@input SceneObject leftIndex1
//@input SceneObject leftIndex2
//@input SceneObject leftIndex3

//@input SceneObject leftMiddle1
//@input SceneObject leftMiddle2
//@input SceneObject leftMiddle3

//@input SceneObject leftRing1
//@input SceneObject leftRing2
//@input SceneObject leftRing3

//@input SceneObject leftPinky0
//@input SceneObject leftPinky1
//@input SceneObject leftPinky2
//@input SceneObject leftPinky3

//@input SceneObject rightThumb0
//@input SceneObject rightThumb1
//@input SceneObject rightThumb2
//@input SceneObject rightThumb3

//@input SceneObject rightIndex1
//@input SceneObject rightIndex2
//@input SceneObject rightIndex3

//@input SceneObject rightMiddle1
//@input SceneObject rightMiddle2
//@input SceneObject rightMiddle3

//@input SceneObject rightRing1
//@input SceneObject rightRing2
//@input SceneObject rightRing3

//@input SceneObject rightPinky0
//@input SceneObject rightPinky1
//@input SceneObject rightPinky2
//@input SceneObject rightPinky3

//@input float sampleRateHz = 60.0 
export class HeadHandsMotionRecorder extends ScriptComponent {
    @Header("File Settings")
    mainFileName: string = "mainFileName";
    headsetUsed: string = "headsetUsed";
    dataCollectionType: string = "HeadAndHands";
    recordingType: string = "recordingType";
    testType: string = "testType";
    participantIdTracker: any; // Assuming this is defined elsewhere

    @Header("Motion Tracking Objects")
    head: Object3D;
    leftWrist: Object3D;
    rightWrist: Object3D;
    leftThumb0: Object3D;
    leftThumb1: Object3D;
    leftThumb2: Object3D;
    leftThumb3: Object3D;
    leftThumbTip: Object3D;
    leftIndex1: Object3D;
    leftIndex2: Object3D;
    leftIndex3: Object3D;
    leftIndexTip: Object3D;
    leftPinky0: Object3D;
    leftPinky1: Object3D;
    leftPinky2: Object3D;
    leftPinky3: Object3D;
    leftPinkyTip: Object3D;
    leftMiddle1: Object3D;
    leftMiddle2: Object3D;
    leftMiddle3: Object3D;
    leftMiddleTip: Object3D;
    leftRing1: Object3D;
    leftRing2: Object3D;
    leftRing3: Object3D;
    leftRingTip: Object3D;
    rightThumb0: Object3D;
    rightThumb1: Object3D;
    rightThumb2: Object3D;
    rightThumb3: Object3D;
    rightThumbTip: Object3D;
    rightIndex1: Object3D;
    rightIndex2: Object3D;
    rightIndex3: Object3D;
    rightIndexTip: Object3D;
    rightPinky0: Object3D;
    rightPinky1: Object3D;
    rightPinky2: Object3D;
    rightPinky3: Object3D;
    rightPinkyTip: Object3D;
    rightMiddle1: Object3D;
    rightMiddle2: Object3D;
    rightMiddle3: Object3D;
    rightMiddleTip: Object3D;
    rightRing1: Object3D;
    rightRing2: Object3D;
    rightRing3: Object3D;
    rightRingTip: Object3D;

    private motionData: HeadHandsMotionData = new HeadHandsMotionData();

    @Header("Recording Settings")
    startTime: number;
    sampleRateHz: number = 90;

    @Header("Debug")
    isRecording: boolean = false;
    toggleRecording: boolean = false;
    dataToText: string;

    public toggleButton(): void {
        if (this.toggleRecording) {
            this.stopRecordingAndSave();
        } else {
            this.startRecording();
        }
        this.toggleRecording = !this.toggleRecording;
    }

    public toggleButton(toggle: boolean): void {
        if (toggle) {
            this.startRecording();
        } else {
            this.stopRecordingAndSave();
        }
    }

    public startRecording(): void {
        if (!this.isRecording) {
            this.isRecording = true;
            this.motionData.headHandsMotionRecordList = []; // Clear previous session data
            this.startTime = getCurrentTime();
            this.recordMotionData();
        }
    }

    public startRecordingWithDuration(duration: number): void {
        if (!this.isRecording) {
            this.isRecording = true;
            this.motionData.headHandsMotionRecordList = []; // Clear previous session data
            this.startTime = getCurrentTime();
            this.recordMotionDataWithDuration(duration);
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
            this.motionData.headHandsMotionRecordList = [];
        }
    }

    private async recordMotionData(): Promise<void> {
        while (this.isRecording) {
            this.motionData.headHandsMotionRecordList.push(new HeadHandsMotionRecord({
                id: this.participantIdTracker.getParticipantID(),
                timeStamp: getCurrentTime() - this.startTime,
                headPosition: this.head.getPosition(),
                headRotation: this.head.getRotation(),

                leftWristPosition: this.leftWrist.getPosition(),
                leftWristRotation: this.leftWrist.getRotation(),

                leftThumb0Position: this.leftThumb0.getPosition(),
                leftThumb0Rotation: this.leftThumb0.getRotation(),
                leftThumb1Position: this.leftThumb1.getPosition(),
                leftThumb1Rotation: this.leftThumb1.getRotation(),
                leftThumb2Position: this.leftThumb2.getPosition(),
                leftThumb2Rotation: this.leftThumb2.getRotation(),
                leftThumb3Position: this.leftThumb3.getPosition(),
                leftThumb3Rotation: this.leftThumb3.getRotation(),
                leftThumbTipPosition: this.leftThumbTip.getPosition(),
                leftThumbTipRotation: this.leftThumbTip.getRotation(),

                leftIndex1Position: this.leftIndex1.getPosition(),
                leftIndex1Rotation: this.leftIndex1.getRotation(),
                leftIndex2Position: this.leftIndex2.getPosition(),
                leftIndex2Rotation: this.leftIndex2.getRotation(),
                leftIndex3Position: this.leftIndex3.getPosition(),
                leftIndex3Rotation: this.leftIndex3.getRotation(),
                leftIndexTipPosition: this.leftIndexTip.getPosition(),
                leftIndexTipRotation: this.leftIndexTip.getRotation(),

                leftPinky0Position: this.leftPinky0.getPosition(),
                leftPinky0Rotation: this.leftPinky0.getRotation(),
                leftPinky1Position: this.leftPinky1.getPosition(),
                leftPinky1Rotation: this.leftPinky1.getRotation(),
                leftPinky2Position: this.leftPinky2.getPosition(),
                leftPinky2Rotation: this.leftPinky2.getRotation(),
                leftPinky3Position: this.leftPinky3.getPosition(),
                leftPinky3Rotation: this.leftPinky3.getRotation(),
                leftPinkyTipPosition: this.leftPinkyTip.getPosition(),
                leftPinkyTipRotation: this.leftPinkyTip.getRotation(),

                leftMiddle1Position: this.leftMiddle1.getPosition(),
                leftMiddle1Rotation: this.leftMiddle1.getRotation(),
                leftMiddle2Position: this.leftMiddle2.getPosition(),
                leftMiddle2Rotation: this.leftMiddle2.getRotation(),
                leftMiddle3Position: this.leftMiddle3.getPosition(),
                leftMiddle3Rotation: this.leftMiddle3.getRotation(),
                leftMiddleTipPosition: this.leftMiddleTip.getPosition(),
                leftMiddleTipRotation: this.leftMiddleTip.getRotation(),

                leftRing1Position: this.leftRing1.getPosition(),
                leftRing1Rotation: this.leftRing1.getRotation(),
                leftRing2Position: this.leftRing2.getPosition(),
                leftRing2Rotation: this.leftRing2.getRotation(),
                leftRing3Position: this.leftRing3.getPosition(),
                leftRing3Rotation: this.leftRing3.getRotation(),
                leftRingTipPosition: this.leftRingTip.getPosition(),
                leftRingTipRotation: this.leftRingTip.getRotation(),

                rightWristPosition: this.rightWrist.getPosition(),
                rightWristRotation: this.rightWrist.getRotation(),

                rightThumb0Position: this.rightThumb0.getPosition(),
                rightThumb0Rotation: this.rightThumb0.getRotation(),
                rightThumb1Position: this.rightThumb1.getPosition(),
                rightThumb1Rotation: this.rightThumb1.getRotation(),
                rightThumb2Position: this.rightThumb2.getPosition(),
                rightThumb2Rotation: this.rightThumb2.getRotation(),
                rightThumb3Position: this.rightThumb3.getPosition(),
                rightThumb3Rotation: this.rightThumb3.getRotation(),
                rightThumbTipPosition: this.rightThumbTip.getPosition(),
                rightThumbTipRotation: this.rightThumbTip.getRotation(),

                rightIndex1Position: this.rightIndex1.getPosition(),
                rightIndex1Rotation: this.rightIndex1.getRotation(),
                rightIndex2Position: this.rightIndex2.getPosition(),
                rightIndex2Rotation: this.rightIndex2.getRotation(),
                rightIndex3Position: this.rightIndex3.getPosition(),
                rightIndex3Rotation: this.rightIndex3.getRotation(),
                rightIndexTipPosition: this.rightIndexTip.getPosition(),
                rightIndexTipRotation: this.rightIndexTip.getRotation(),

                rightPinky0Position: this.rightPinky0.getPosition(),
                rightPinky0Rotation: this.rightPinky0.getRotation(),
                rightPinky1Position: this.rightPinky1.getPosition(),
                rightPinky1Rotation: this.rightPinky1.getRotation(),
                rightPinky2Position: this.rightPinky2.getPosition(),
                rightPinky2Rotation: this.rightPinky2.getRotation(),
                rightPinky3Position: this.rightPinky3.getPosition(),
                rightPinky3Rotation: this.rightPinky3.getRotation(),
                rightPinkyTipPosition: this.rightPinkyTip.getPosition(),
                rightPinkyTipRotation: this.rightPinkyTip.getRotation(),

                rightMiddle1Position: this.rightMiddle1.getPosition(),
                rightMiddle1Rotation: this.rightMiddle1.getRotation(),
                rightMiddle2Position: this.rightMiddle2.getPosition(),
                rightMiddle2Rotation: this.rightMiddle2.getRotation(),
                rightMiddle3Position: this.rightMiddle3.getPosition(),
                rightMiddle3Rotation: this.rightMiddle3.getRotation(),
                rightMiddleTipPosition: this.rightMiddleTip.getPosition(),
                rightMiddleTipRotation: this.rightMiddleTip.getRotation(),

                rightRing1Position: this.rightRing1.getPosition(),
                rightRing1Rotation: this.rightRing1.getRotation(),
                rightRing2Position: this.rightRing2.getPosition(),
                rightRing2Rotation: this.rightRing2.getRotation(),
                rightRing3Position: this.rightRing3.getPosition(),
                rightRing3Rotation: this.rightRing3.getRotation(),
                rightRingTipPosition: this.rightRingTip.getPosition(),
                rightRingTipRotation: this.rightRingTip.getRotation(),
            }));
            await wait(this.sampleRateHz);
        }
    }

    private async recordMotionDataWithDuration(duration: number): Promise<void> {
        const start = getCurrentTime();
        while (this.isRecording && (getCurrentTime() - start) < duration) {
            this.motionData.headHandsMotionRecordList.push(new HeadHandsMotionRecord({
                // Similar to recordMotionData method
            }));
            await wait(this.sampleRateHz);
        }
    }

    private saveMotionDataToJson(): void {
        const json = JSON.stringify(this.motionData);
        const fileName = `${this.mainFileName}.json`;
        saveFile(fileName, json);
    }
}

// HeadHandsMotionData.ts
export class HeadHandsMotionData {
    headHandsMotionRecordList: HeadHandsMotionRecord[] = [];
}

// HeadHandsMotionRecord.ts
export class HeadHandsMotionRecord {
    id: string;
    timeStamp: number;
    headPosition: Vector3;
    headRotation: Quaternion;

    leftWristPosition: Vector3;
    leftWristRotation: Quaternion;
    leftThumb0Position: Vector3;
    leftThumb0Rotation: Quaternion;
    leftThumb1Position: Vector3;
    leftThumb1Rotation: Quaternion;
    leftThumb2Position: Vector3;
    leftThumb2Rotation: Quaternion;
    leftThumb3Position: Vector3;
    leftThumb3Rotation: Quaternion;
    leftThumbTipPosition: Vector3;
    leftThumbTipRotation: Quaternion;

    leftIndex1Position: Vector3;
    leftIndex1Rotation: Quaternion;
    leftIndex2Position: Vector3;
    leftIndex2Rotation: Quaternion;
    leftIndex3Position: Vector3;
    leftIndex3Rotation: Quaternion;
    leftIndexTipPosition: Vector3;
    leftIndexTipRotation: Quaternion;

    leftPinky0Position: Vector3;
    leftPinky0Rotation: Quaternion;
    leftPinky1Position: Vector3;
    leftPinky1Rotation: Quaternion;
    leftPinky2Position: Vector3;
    leftPinky2Rotation: Quaternion;
    leftPinky3Position: Vector3;
    leftPinky3Rotation: Quaternion;
    leftPinkyTipPosition: Vector3;
    leftPinkyTipRotation: Quaternion;

    leftMiddle1Position: Vector3;
    leftMiddle1Rotation: Quaternion;
    leftMiddle2Position: Vector3;
    leftMiddle2Rotation: Quaternion;
    leftMiddle3Position: Vector3;
    leftMiddle3Rotation: Quaternion;
    leftMiddleTipPosition: Vector3;
    leftMiddleTipRotation: Quaternion;

    leftRing1Position: Vector3;
    leftRing1Rotation: Quaternion;
    leftRing2Position: Vector3;
    leftRing2Rotation: Quaternion;
    leftRing3Position: Vector3;
    leftRing3Rotation: Quaternion;
    leftRingTipPosition: Vector3;
    leftRingTipRotation: Quaternion;

    rightWristPosition: Vector3;
    rightWristRotation: Quaternion;
    rightThumb0Position: Vector3;
    rightThumb0Rotation: Quaternion;
    rightThumb1Position: Vector3;
    rightThumb1Rotation: Quaternion;
    rightThumb2Position: Vector3;
    rightThumb2Rotation: Quaternion;
    rightThumb3Position: Vector3;
    rightThumb3Rotation: Quaternion;
    rightThumbTipPosition: Vector3;
    rightThumbTipRotation: Quaternion;

    rightIndex1Position: Vector3;
    rightIndex1Rotation: Quaternion;
    rightIndex2Position: Vector3;
    rightIndex2Rotation: Quaternion;
    rightIndex3Position: Vector3;
    rightIndex3Rotation: Quaternion;
    rightIndexTipPosition: Vector3;
    rightIndexTipRotation: Quaternion;

    rightPinky0Position: Vector3;
    rightPinky0Rotation: Quaternion;
    rightPinky1Position: Vector3;
    rightPinky1Rotation: Quaternion;
    rightPinky2Position: Vector3;
    rightPinky2Rotation: Quaternion;
    rightPinky3Position: Vector3;
    rightPinky3Rotation: Quaternion;
    rightPinkyTipPosition: Vector3;
    rightPinkyTipRotation: Quaternion;

    rightMiddle1Position: Vector3;
    rightMiddle1Rotation: Quaternion;
    rightMiddle2Position: Vector3;
    rightMiddle2Rotation: Quaternion;
    rightMiddle3Position: Vector3;
    rightMiddle3Rotation: Quaternion;
    rightMiddleTipPosition: Vector3;
    rightMiddleTipRotation: Quaternion;

    rightRing1Position: Vector3;
    rightRing1Rotation: Quaternion;
    rightRing2Position: Vector3;
    rightRing2Rotation: Quaternion;
    rightRing3Position: Vector3;
    rightRing3Rotation: Quaternion;
    rightRingTipPosition: Vector3;
    rightRingTipRotation: Quaternion;

    constructor(data: Partial<HeadHandsMotionRecord>) {
        Object.assign(this, data);
    }
}

// Utility functions
function getCurrentTime(): number {
    return Date.now();
}

function wait(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function saveFile(fileName: string, content: string): void {
    // Implement file saving logic for Lens Studio
}
