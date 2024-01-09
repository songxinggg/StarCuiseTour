import { Class } from "../../../const/GlobalData";
import SkillBase from "../logic/SkillBase";
import { BulletTrrigerBase } from "./BulletTrrigerBase";

export default class BulletTrrigerMgr {
    private _bulletMap: Map<string, BulletTrrigerBase> = new Map()
    private static _instance: BulletTrrigerMgr;

    public static get instance() {
        if (!this._instance) {
            this._instance = new BulletTrrigerMgr();
        }
        return this._instance;
    }

    public createBullet(obj: mw.GameObject, bulletID: string, life: number, host: string, skill: SkillBase, damage: number, trrigerConfig: string) {
        let newBulletTrriger: BulletTrrigerBase
        const config = trrigerConfig.split(":")
        if (!this._bulletMap.has(obj.gameObjectId)) {
            newBulletTrriger = new (bulletClass.get(config[0]))()
            this._bulletMap.set(obj.gameObjectId, newBulletTrriger)
        } else {
            newBulletTrriger = this._bulletMap.get(obj.gameObjectId)
        }
        newBulletTrriger.init(obj, bulletID, life, host, skill, damage, config[1])
    }

    private _updateTime: number = 0
    private _dt: number = 0
    public update(dt: number) {
        //TODO：如有性能问题就改为每5帧检测
        if (++this._updateTime % 3 != 0) {
            this._dt += dt
            return
        }
        for (const key of this._bulletMap) {
            if (key[1].isActive) key[1].update(this._dt)
        }
        this._dt = 0
    }
}
export function registerBulletTrriger() {
    return function <T extends BulletTrrigerBase>(constructor: Class<T>) {
        bulletClass.set(constructor.name, constructor)
    };
}

BulletTrrigerMgr.instance
export const bulletClass: Map<string, Class<BulletTrrigerBase>> = new Map()