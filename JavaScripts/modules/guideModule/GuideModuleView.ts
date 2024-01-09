
import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import GuideModuleUI_Generate from '../../ui-generate/guideModule/GuideModuleUI_generate';
import { GuideContent } from './GuideContent';
import { GuideModuleC } from './GuideModuleC';
/**
 * 新手引导UI
 */
export class GuideModuleView extends GuideModuleUI_Generate {
    /**
     * 接收空间坐标
     */
    private _outPixelPos: mw.Vector2 = new mw.Vector2(0, 0);
    /**
     * 用于接收视口坐标
     */
    private _outViewPos: mw.Vector2 = new mw.Vector2(0, 0);

    /**
     * 当前引导绑定Target
     */
    private _bindTarget: mw.Widget = null;

    /**
     * 按钮触发后的通知
     */
    private _btnClickToGuide: () => void = null;

    /**
     * 按钮触发后的事件传递
     */
    private _btnClickToTarget: () => void = null;

    /**
     * 引导箭头
     */
    private _guideArrow: mw.GameObject;

    /**
     * 目标点粒子特效
     */
    private _targetPosEff: mw.Effect;

    /**
     * 到达目标点后的回调
     */
    private _toTargetPosCallback: () => boolean = null;

    /**
     * 目标点
     */
    private _targetPos: mw.Vector;

    /**
     * 上一次的位置
     */
    private _lastPos: mw.Vector;
    private _cachePointerGo: mw.GameObject[] = [];
    private _drawType: number = 0;
    private _lastUpdateTime: number = 0;


    private async showPointers(pos: mw.Vector[]) {

        let guideModuleC = ModuleService.getModule(GuideModuleC);
        let intervalDis = guideModuleC.getGuideArrowIntervalDis();

        let newPos = [];
        for (let i = pos.length - 1; i >= 0; i--) {

            let curPos = pos[i];
            if (i - 1 < 0) {
                break;
            }
            newPos.push(curPos);
            let nextPos = pos[i - 1];
            let dirInfo = nextPos.clone().subtract(curPos);
            let length = dirInfo.length;
            let dirNormal = dirInfo.normalized;
            let count = 1;
            while (length > intervalDis) {
                newPos.push(curPos.clone().add(dirNormal.clone().multiply(intervalDis * count)));
                length -= intervalDis;
                count++
            }

        }

        pos = newPos;
        let lastDir: mw.Vector;

        let cacheLength = this._cachePointerGo.length;
        let useCount = 0;
        for (let i = Math.max(0, pos.length - guideModuleC.getGuideArrorShowMaxPointer()); i < pos.length; i++) {

            let go: mw.GameObject = null;

            const index = i;
            if (useCount >= cacheLength) {
                let trans = new Transform(pos[index], Rotation.zero, Vector.negOne.multiply(-1));
                if (guideModuleC.getGuideArrowPointerIsEffect()) {
                    go = await SpawnManager.asyncSpawn<mw.Effect>({ guid: guideModuleC.getGuideArrowPointerGuid(), replicates: false, transform: trans })
                    let eff = go as mw.Effect;
                    eff.loop = true;
                    eff.play();
                } else {
                    go = await SpawnManager.asyncSpawn({ guid: guideModuleC.getGuideArrowPointerGuid(), replicates: false, transform: trans });
                }
                go.setCollision(mw.PropertyStatus.Off);
                go.worldTransform.scale = guideModuleC.getGuideArrowPointerScale();
                this._cachePointerGo.push(go);
                useCount++;
            } else {
                go = this._cachePointerGo[useCount];
                useCount++;
                if (guideModuleC.getGuideArrowPointerIsEffect()) {
                    let eff = go as mw.Effect;
                    eff.loop = true;
                    eff.play();
                }
                go.worldTransform.position = pos[index];
            }

            if (pos.length > index + 1) {
                lastDir = (pos[index].subtract(pos[index + 1]))
                let dir = lastDir.toRotation()
                dir.x = 0;
                dir.y = 0;
                lastDir = dir.getForce();
                go.worldTransform.rotation = dir;
            } else {
                if (lastDir) {
                    go.worldTransform.rotation = lastDir.toRotation();
                }
            }

            go.setVisibility(mw.PropertyStatus.On);
        }

        for (let i = useCount; i < cacheLength; i++) {
            if (guideModuleC.getGuideArrowPointerIsEffect()) {
                let eff = this._cachePointerGo[i] as mw.Effect;
                eff.loop = false;
                eff.stop();
            }
            this._cachePointerGo[i].setVisibility(mw.PropertyStatus.Off);
        }

    }

    /**
     * 模块初始化
     */
    public onStart() {

        this.layer = mw.UILayerSystem;
        this.canUpdate = true;

        this.mLeftMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
        });
        this.mTopMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mTopMask");
        });
        this.mButtomMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
        });
        this.mRightMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mRightMask");
        });
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });

        this.mBtn.onClicked.add(() => {
            this.buttonClick();
        })

        // 初始化引导线

        if (this._guideArrow == null) {
            if (GuideContent.GuideArrowGuid != "") {
                SpawnManager.wornAsyncSpawn(GuideContent.GuideArrowGuid).then((go: mw.GameObject) => {
                    this._guideArrow = go;
                    this._guideArrow.setVisibility(mw.PropertyStatus.Off);
                    this._guideArrow.setCollision(mw.PropertyStatus.Off)
                    AssetUtil.asyncDownloadAsset(GuideContent.GuideArrowMartialGuid).then(() => {
                        let mesh = this._guideArrow as mw.Model;
                        mesh?.setMaterial(GuideContent.GuideArrowMartialGuid)
                    })
                })
            }
        }

        // 初始化目标点特效

        if (this._targetPosEff == null) {
            if (GuideContent.GuideWorldTargetEffectGuid) {
                SpawnManager.wornAsyncSpawn<mw.Effect>(GuideContent.GuideWorldTargetEffectGuid).then((go: mw.Effect) => {
                    this._targetPosEff = go;
                    this._targetPosEff.setVisibility(mw.PropertyStatus.Off);
                })
            }
        }

        // 设置隐藏mask
        this.showMask(false);

        // 隐藏按钮
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);
        this.mTextHand.visibility = (mw.SlateVisibility.Hidden);


    }

    /**
     * 隐藏所有的组件
     */
    public hideAllItem() {
        // 设置隐藏mask
        this.showMask(false);
        // 隐藏按钮
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);
        this.mTextHand.visibility = (mw.SlateVisibility.Hidden);

        if (this._targetPosEff)
            this._targetPosEff.setVisibility(mw.PropertyStatus.Off);
        if (this._guideArrow)
            this._guideArrow.setVisibility(mw.PropertyStatus.Off);

        for (let i = 0; i < this._cachePointerGo.length; i++) {
            if (ModuleService.getModule(GuideModuleC).getGuideArrowPointerIsEffect()) {
                let eff = this._cachePointerGo[i] as mw.Effect;
                eff.loop = false;
                eff.stop();
            }
            this._cachePointerGo[i].setVisibility(mw.PropertyStatus.Off);
        }

        this._targetPos = null;
        this._targetObj = undefined;
    }

    protected onShow(...params: any[]) {
        //super.onShow();

        //oTrace("guide module view show")
        //oTrace(GuideContent.GuideArrowGuid);
        //oTrace(GuideContent.GuideWorldTargetEffectGuid);
        // 初始化引导线

        if (this._guideArrow && GuideContent.GuideArrowGuid == "") {
            this._guideArrow.destroy();
            this._guideArrow = null;
        }

        // 初始化目标点特效

        if (this._targetPosEff && GuideContent.GuideWorldTargetEffectGuid == "") {
            this._targetPosEff.destroy();
            this._targetPosEff = null;
        }

    }

    /**
     * mask显隐
     * @param isShow 
     */
    public showMask(isShow: boolean) {
        // 隐藏引导组件

        let state = mw.SlateVisibility.Visible;
        if (!isShow) state = mw.SlateVisibility.Hidden;

        this.mTopMask.visibility = (state);
        this.mButtomMask.visibility = (state);
        this.mLeftMask.visibility = (state);
        this.mRightMask.visibility = (state);

        if (isShow)
            UIManager.show(GuideModuleView);
        else
            UIManager.hide(GuideModuleView);
    }

    /**
     * 引导button点击后的回调
     */
    private buttonClick() {

        // 完成当前引导
        if (this._btnClickToGuide) {
            this._btnClickToGuide();
            this._btnClickToGuide = null;
        }

        // 触发对应点击按钮事件
        if (this._btnClickToTarget) {
            this._btnClickToTarget();
            this._btnClickToTarget = null;
            this._bindTarget = null;
        }

        // 隐藏按钮组件
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);
        this.mTextHand.visibility = (mw.SlateVisibility.Hidden);

    }

    private _targetObj: mw.GameObject;

    /**
     * 设置引导到目标点
     * @param targetPos 目标点 
     * @param callback 回调
     */


    public async setGuideArrowTargetPos(targetPos: mw.Vector | mw.GameObject, callback: () => boolean, drawType: number, bUpdateArrow: boolean) {
        // 检查玩家是否到达目标点
        let char = await ModuleService.getModule(GuideModuleC).getCharGo();
        let guideModuleC = ModuleService.getModule(GuideModuleC);
        if (!bUpdateArrow) {

            //oTrace("设置到达目标点");

            // 设置到达目标点后的回调

            this._drawType = drawType;
            this._toTargetPosCallback = callback;
            // 设置目标点特效
            if (targetPos instanceof mw.Vector) {
                if (this._targetPosEff) {
                    if (this._targetPos != null && mw.Vector.equals(this._targetPos, targetPos)) return;
                    this._targetPosEff.worldTransform.position = targetPos.clone();//(new mw.Vector(0, 0, 0));
                    this._targetPosEff.setVisibility(mw.PropertyStatus.On);
                    this._targetPosEff.loop = true
                    this._targetPosEff.play();
                }
                // 设置目标点
    
                this._targetPos = targetPos.clone();
            } else {
                this._targetObj = targetPos;
            }
            

        }
        if (char.worldTransform.position.clone().subtract(this._targetPos).length <= guideModuleC.getToTargetPosDistance()) {
            let pos: mw.Vector
            if (this._targetPos) {
                pos = this._targetPos;
            }
            if (this._targetObj) {
                pos = this._targetObj.worldTransform.position

            }

            if (char.worldTransform.position.clone().subtract(pos).length <= guideModuleC.getToTargetPosDistance()) {


                // 回调到达目标点

                if (this._toTargetPosCallback) {
                    let res = this._toTargetPosCallback();
                    if (!res) return;
                }

                this._toTargetPosCallback = null;

                // 关闭寻路显示
                if (this._guideArrow)
                    this._guideArrow.setVisibility(mw.PropertyStatus.Off);
                if (this._targetPosEff)
                    this._targetPosEff.setVisibility(mw.PropertyStatus.Off);

                this._cachePointerGo.forEach(e => {
                    e.setVisibility(mw.PropertyStatus.Off, true);
                })

                return;
            }


            // 设置箭头到达目标点

            if (this._drawType == 0) {
                if (this._guideArrow) {
                    let pos2: mw.Vector
                    if (this._targetPos) {
                        pos2 = this._targetPos;
                    }
                    if (this._targetObj) {
                        pos2 = this._targetObj.worldTransform.position
                    }
                    let dirOffset = guideModuleC.getGuideArrowDirOffsetDis();
                    let chrLocal = new mw.Vector(char.worldTransform.position.x, char.worldTransform.position.y, char.worldTransform.position.z + guideModuleC.getGuideArrowStartPosOffsetZ());
                    let subdir = pos2.clone().subtract(chrLocal);
                    let scale = (subdir.length - dirOffset) / 100;
                    let offsetPos = subdir.multiply(0.5).add(subdir.normalized.multiply(dirOffset));
                    this._guideArrow.worldTransform.position = chrLocal.clone().add(offsetPos);
                    this._guideArrow.worldTransform.rotation = offsetPos.toRotation().rotateVector(new Vector(90, 0, 0)).toRotation();
                    this._guideArrow.setVisibility(mw.PropertyStatus.On);
                    this._guideArrow.worldTransform.scale = new mw.Vector(scale, guideModuleC.getGuideArrowScaleY(), 1);
                }
            } else if (this._drawType == 1) {
                if (this._lastUpdateTime == 0 || Date.now() - this._lastUpdateTime >= guideModuleC.getGuideArrowPointerUpdateInterval()) {
                    let paths = [char.worldTransform.position, this._targetPos.clone()]//await Navigation.findPath(char.worldTransform.position, targetPos)
                    // let paths: mw.Vector[];

                    // for (let index = 1; index <=10; index++) {
                    //     paths.push(mw.Vector.lerp(char.worldTransform.position,targetPos,index*0.1))

                    // }
                    this.showPointers(paths);
                    this._lastUpdateTime = Date.now();
                }

            }

        }
    }

    /**
     * 锁定一个对象
     * @param target 
     */
    public lockMWUIWidget(target: mw.Widget, callback: () => void, tips: string = "", isShowBtn: boolean = true) {

        // 获取target的slot信息
        let target_slot = target;

        if (target.tickSpaceGeometry == null) {
            return;
        }

        mw.localToViewport(target.tickSpaceGeometry, mw.Vector2.zero, this._outPixelPos, this._outViewPos);


        // 如果对象是一个按钮，则同时添加一个监听消息，点击覆盖区域后触发对应按钮事件


        if (this._bindTarget != target) {
            this._btnClickToGuide = callback;
            this._bindTarget = target;
            this._btnClickToTarget = null;
            //Input
            if (target instanceof mw.Button || target instanceof mw.StaleButton || target instanceof mw.MaskButton) {
                this._btnClickToTarget = () => {

                    if (target["clickedDelegate"]) {
                        target["clickedDelegate"].broadcast();
                    } else if (target["onClicked"]) {
                        target["onClicked"].broadcast();
                    }

                }
            }
        }

        if (!this._outViewPos || this._outViewPos.equals(mw.Vector2.zero)) {
            return;
        }


        // 设置mask区域


        const viewportSize = mw.WindowUtil.getViewportSize();
        //const viewportSize = new mw.Vector2(5000, 5000);

        let targetSlotSize = target_slot.size;

        // 设置Top

        this.mTopMask.size = new mw.Vector2(viewportSize.x, this._outViewPos.y);

        // 设置Buttom

        this.mButtomMask.position = new mw.Vector2(0,
            this._outViewPos.y + targetSlotSize.y);
        this.mButtomMask.size = new mw.Vector2(viewportSize.x,
            viewportSize.y - this.mButtomMask.position.y);

        // 设置Left

        this.mLeftMask.position = new mw.Vector2(0,
            this.mTopMask.size.y);

        this.mLeftMask.size = new mw.Vector2(this._outViewPos.x,
            viewportSize.y - this.mTopMask.size.y - this.mButtomMask.size.y);

        // 设置Right
        this.mRightMask.position = new mw.Vector2(this._outViewPos.x + targetSlotSize.x,
            this.mTopMask.size.y);
        this.mRightMask.size = new mw.Vector2(viewportSize.x - this.mButtomMask.position.x,
            viewportSize.y - this.mTopMask.size.y - this.mButtomMask.size.y);


        //设置手指
        this.mBtnHand.position =
            new mw.Vector2(
                this._outViewPos.x + targetSlotSize.x / 2 - this.mBtnHand.size.x / 2,
                this._outViewPos.y + targetSlotSize.y / 2
            );
        this.mTextHand.text = (tips);
        let size = this.mTextHand.desiredSize;
        let btnHandPos = this.mBtnHand.position.clone();//.addition(mw.Vector2.zero);
        let btnHandSize = this.mBtnHand.size.clone();//.addition(mw.Vector2.zero);
        if (this._outViewPos.y < viewportSize.y / 2) {
            //在屏幕上方

            if (this._outViewPos.x < viewportSize.x / 2) {

                this.mTextHand.position =
                    new mw.Vector2(btnHandPos.x, btnHandPos.y + btnHandSize.y)

            } else {

                this.mTextHand.position =
                    new mw.Vector2(btnHandPos.x + (btnHandSize.x - size.x), btnHandPos.y + btnHandSize.y)

            }

        } else {
            //在屏幕下方

            if (this._outViewPos.x < viewportSize.x / 2) {

                this.mTextHand.position =
                    new mw.Vector2(btnHandPos.x, btnHandPos.y - btnHandSize.y)

            } else {

                this.mTextHand.position =
                    new mw.Vector2(btnHandPos.x + (btnHandSize.x - size.x), btnHandPos.y - btnHandSize.y)

            }

        }



        // 设置button区域

        this.mBtn.position = new mw.Vector2(this._outViewPos.x, this._outViewPos.y);
        this.mBtn.size = new mw.Vector2(target_slot.size.x, target_slot.size.y);

        this.showMask(true);


        if (isShowBtn)
            this.mBtn.visibility = (mw.SlateVisibility.Visible);
        else
            this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        if (tips != "")
            this.mTextHand.visibility = (mw.SlateVisibility.SelfHitTestInvisible);

    }


}