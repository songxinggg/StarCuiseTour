import { IFSMState } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";


export class HideWaitState implements IFSMState{
    endTime: number = GlobalData.hideReadyTime;
    onEnter(): void {
        
    }
    onExit(): void {
        
    }

}

export class HideState implements IFSMState{
    endTime: number= GlobalData.hideTime;
    onEnter(): void {
        
    }
    onExit(): void {
        
    }

}

export class SeekWaitState implements IFSMState{
    endTime: number = GlobalData.seekReadyTime;
    onEnter(): void {
        
    }
    onExit(): void {
        
    }

}


export class SeekState implements IFSMState { 
    endTime: number = GlobalData.seekTime;
    onEnter(): void {
        
    }
    onExit(): void {
        //时间到了，没找完
       
    }
}