import SkillBase from "../logic/SkillBase";
import { BulletTrrigerBase } from "./BulletTrrigerBase";
import { registerBulletTrriger } from "./BulletTrrigerMgr";

@registerBulletTrriger()
export class CircularBulletTrriger extends BulletTrrigerBase {
    private _movex: number = 0
    private _movey: number = 0
    private _movez: number = 0
    private _r: number = 1
    private _interval: number = 0

    public init(obj: mw.GameObject, bulletID: string, life: number, host: string, skill: SkillBase, damage: number, trrigerConfig?: string) {
        super.init(obj, bulletID, life, host, skill, damage, trrigerConfig)
        trrigerConfig = trrigerConfig.split("movex=")[1]
        this._movex = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("movey=")[1]
        this._movey = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("movez=")[1]
        this._movez = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("r=")[1]
        this._r = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("type=")[1]
        this._type = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("interval=")[1]
        this._interval = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        trrigerConfig = trrigerConfig.split("effect=")[1]
        this._effect = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")))
        this._music = Number(trrigerConfig.split("music=")[1]) || 50
    }

    private _time = 0
    public update(dt: number) {
        if (this._type == 3) {
            this._time += dt
            if (this._time > this._interval) {
                this._time = 0
                this._hitObj = []
            }
        }
        this._start = this._obj.worldTransform.position.clone()
        this._start.x += this._movex; this._start.y += this._movey; this._start.z += this._movez
        const res = QueryUtil.sphereOverlap(this._start, this._r * 100, false, ["6D9ADCED,28B609E6"], true, null)
        this.hitAnything(res)
    }
}