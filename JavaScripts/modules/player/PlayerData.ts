

export class PlayerData extends Subdata {
    @Decorator.persistence()
    private equipIds: number[] = []
    @Decorator.persistence()
    //所有拥有的
    private allSuits: number[] = []

    public onExpChange: mw.Action1<number> = new mw.Action1()
    public onLevelChange: mw.Action1<number> = new mw.Action1()

    protected initDefaultData(): void {
        this.equipIds = []
        this.allSuits = []
    }

    protected onDataInit(): void {
        super.onDataInit();
    }

    public get dataName(): string {
        return "MyBaseData";
    }

    // ------------------------------------------------------------------------------
    private _newArr: number[] = []
    public get equipID(): number[] {
        this._newArr = []
        this._newArr.push(...this.equipIds)
        return this._newArr
    }

    public get allSuit(): number[] {
        this._newArr = []
        this._newArr.push(...this.allSuits)
        return this._newArr
    }


    public saveSuits(list) {
        if (SystemUtil.isClient()) return;
        for (const id of list) {
            if (!this.allSuits.includes(id)) {
                this.allSuits.push(id)
            }
        }
        this.save(true)
    }

    public saveEquips(equipIds: number[]) {
        this.equipIds = equipIds
        this.save(true)
    }

    public buySuit(suitId: number) {
        this.allSuits.push(suitId)
        this.save(true)
    }

}