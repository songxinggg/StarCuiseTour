import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
export class PrefabObject {
    public obj: mw.GameObject
    public script: mw.Script
    public life: number
    public isActive: boolean = false
    public guid: string;

    constructor(guid: string) {
        this.guid = guid;
    }

    public async spawn(life: number, isClient: boolean, ...param) {
        if (!this.obj) {
            this.obj = await SpawnManager.asyncSpawn({ guid: this.guid, replicates: !isClient })
            if (this.obj) {
                this.script = this.obj.getScripts()[0]
            } else {
                return;
            }
           
        }
        this.obj.setCollision(mw.PropertyStatus.On)
        this.obj.setVisibility(mw.PropertyStatus.On)
        if (this.script) this.script["spawn"](...param);
        this.life = life;
        this.isActive = true
    }

    public despawn() {
        this.obj.setCollision(mw.PropertyStatus.Off)
        this.obj.setVisibility(mw.PropertyStatus.Off)

        TimeUtil.delayExecute(() => {
            this.obj.worldTransform.position = despawnLocation;
        }, 3)
        if (this.script) this.script["despawn"]();
        this.isActive = false;
    }

    public destory() {
        this.isActive = false;
        this.obj.destroy()
        this.obj = null;
        if (this.script) {
            this.script["despawn"]();
            this.script.destroy()
            this.script = null;
        }
    }
}
const despawnLocation = new mw.Vector(9999, 9999, 9999)