import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
﻿import { Camp } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";


export class BattleActorBase  {

    private _character: mw.Character;

    public get character(): mw.Character{
        if (this._character)
            return this._character
        else
            return null;
    }
    
    private _qid: number = 0;

    public get qid(): number { 
        return this._qid;
    }

    protected _camp: Camp;

    private orginSpeed: number = 0;
    
    public get camp(): Camp { 
        return this._camp;
    }

    constructor(character: mw.Character, qid: number) {
        this._character = character;
        this.orginSpeed = character.maxWalkSpeed;
        this._qid = qid;
    }

    public init(camp: Camp) {
        this._camp = camp;
        if (this._camp == Camp.Seek) {
           
            this.weapon = SpawnManager.modifyPoolSpawn("158362", GameObjPoolSourceType.Asset)
            this.weapon.setVisibility(mw.PropertyStatus.On)
            this.weapon.setCollision(mw.PropertyStatus.Off)
            this.character.attachToSlot(this.weapon, mw.HumanoidSlotType.RightHand)
            this.weapon.localTransform.position = (new mw.Vector(0, 0, 0))
            this.weapon.localTransform.rotation = (new mw.Rotation(0, 0, 0))
            this.weapon.localTransform.scale = (new mw.Vector(3))
        }
    }

    public stratHide() {
        if (this.character) {
            if(this._camp == Camp.Hide){
                this.character.maxWalkSpeed = this.orginSpeed * GlobalData.speedUp;
            } else {
                this.character.maxWalkSpeed = this.orginSpeed;
            }
        }
       
    }


    private weapon: mw.GameObject;

    public stratSeek() { 
        if (this.character) {
            if (this._camp == Camp.Hide) {
                this.character.maxWalkSpeed = this.orginSpeed;
            } else {
                this.character.maxWalkSpeed = this.orginSpeed * GlobalData.speedUp;
            }
        }
      
    }

    public destroy() {
        if (this.character) { 
            this.character.maxWalkSpeed = this.orginSpeed;
        }
        if (this.weapon) { 
            this.weapon.parent = null;
            GameObjPool.despawn(this.weapon)
            this.weapon = undefined;

        }
        
    }


    public onPlayerLeft() {
        this._character = null;
    }
        
    
}


export class SeekActor extends BattleActorBase { 
    public static seekNum: number = 0;

    /**抓人数 */
    private _cathcNum: number = 0;

    get catchNum(): number { 
        return this._cathcNum;
    }

    constructor(character: mw.Character, qid: number) { 
        super(character, qid);
    }

    public init(camp: Camp) { 
        super.init(camp);
    }

    cathcPlayer() { 
        this._cathcNum++;
    }

   

}

export class HideActor extends BattleActorBase { 
    public static hideNum: number = 0;
    /**是否被抓 */
    private _hasCatch: boolean = false;

    public get hasCatch() : boolean {
        return this._hasCatch;
    }

    /**躲藏时间 */
    private _lifeTime: number = 0;

    public get lifeTime(): number{
        return this._lifeTime;
    }

    /**是否躲避检测 */
    private _isHide: boolean = false;

    

    public set isHide(value: boolean) {
        this._isHide = value;
    }

    public get isHide(): boolean { 
        return this._isHide;
    }




    

    constructor(character: mw.Character, qid: number) { 
        super(character, qid);
    }

    public init(camp: Camp) { 
        super.init(camp);
        this._hasCatch = false;
        this._lifeTime = TimeUtil.elapsedTime();
    }

    onGameOver() {
        if (!this._hasCatch) {
            this._lifeTime = TimeUtil.elapsedTime() - this._lifeTime;
        } 
    }

    public beCatch() {
        this._hasCatch = true;
        this._lifeTime = TimeUtil.elapsedTime() - this._lifeTime;      
    }

}