import SkillBase from "../logic/SkillBase";

export abstract class BulletTrrigerBase {
	protected _obj: mw.GameObject;
	protected _bulletID: string;
	protected _host: string;
	protected _skill: SkillBase;
	protected _damage: number;
	protected _trrigerConfig: string;
	protected _effect: number = 0;
	protected _music: number = 0;
	protected _isOwn: boolean = true;
	protected _type: number;
	protected _hitObj: string[] = [];
	protected _character: mw.Character;
	protected _start: mw.Vector = mw.Vector.zero
	private _timeout: number;
	public isActive: boolean = false;

	public init(obj: mw.GameObject, bulletID: string, life: number, host: string, skill: SkillBase, damage: number, trrigerConfig?: string) {
		this._obj = obj;
		this._obj.setVisibility(mw.PropertyStatus.On, true);
		this._bulletID = bulletID;
		this._host = host;
		this._isOwn = (this._host == skill.host)
		this._damage = damage;
		this._trrigerConfig = trrigerConfig;
		this._hitObj.length = 0;
		this.isActive = true;
		this._character = Player.localPlayer.character;
		this._skill = skill
		if (this._timeout) clearTimeout(this._timeout);
		this._timeout = setTimeout(() => {
			this.deActive();
		}, life * 1000);
	}

	protected deActive() {
		this._hitObj.length = 0;
		this.isActive = false;
		this._obj.setVisibility(mw.PropertyStatus.Off, true);
		this._start.set(mw.Vector.zero)
		if (this._timeout) clearTimeout(this._timeout);
	}

	protected hitAnything(res: mw.GameObject[]) {
		let hitObj = null;
		for (let index = 0; index < res.length; index++) {
			hitObj = res[index];
			if (hitObj instanceof mw.Trigger || this._hitObj.includes(hitObj.guid)) {
				continue;
			}
			if (this._host == hitObj.guid) {
				continue;
			}
			this._hitObj.push(hitObj.guid);
			if (this._type == 1) {
				break;
			} else {
				if (this._isOwn) this._skill.onHit(hitObj, this._obj.worldTransform.position, this._damage, this._effect, this._music);
			}
		}
		if (this._type == 1 && this._hitObj.length > 0) {
			if (this._isOwn) this._skill.onHit(hitObj, this._obj.worldTransform.position, this._damage, this._effect, this._music)
			this.deActive();
		}
	}
	public abstract update(dt: number);
}
