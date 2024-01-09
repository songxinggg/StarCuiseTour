

import { Camp, SettleInfo } from "../../../const/GameEnum";
import Settle_generate from "../../../ui-generate/uiTemplate/gameModule/Settle_generate";
import SettleItem from "./SettleItem";


export default class Settle extends Settle_generate {

    private hideItmeList: SettleItem[] = [];

    private seekItmeList: SettleItem[] = [];

    protected onStart(): void {
        for (let i = 0; i < 10; i++){
            this.createItem(this.mConent,this.hideItmeList);

            if (i < 5) {
               this.createItem(this.mConent2,this.seekItmeList);
            }
    
        }

        this.okBtn.onClicked.add(() => {
            UIManager.hideUI(this)
            clearTimeout(this.tid)
        })
       
        
        
    }

    private createItem(Canvas:mw.Canvas,itemlist: SettleItem[]):SettleItem { 
        const item = UIManager.create(SettleItem)
        Canvas.addChild(item.uiObject);
        item.uiObject.size = new mw.Vector2(647, 60);
        itemlist.push(item);
        return item
    }

    private tid

    protected onShow(settleInfo: SettleInfo[]): void {
        this.tid = setTimeout(() => { 
            UIManager.hideUI(this)
        }, 8000)
        this.hideAllItem();

        let hideIndex = 0;
        let seekIndex = 0;
        
        for(let i = 0; i < settleInfo.length; i++) {
            let info = settleInfo[i];
            if (info.camp == Camp.Hide) { 
                let hideItme = this.hideItmeList[hideIndex];
                if (!hideItme) { 
                    hideItme=this.createItem(this.mConent,this.hideItmeList)
                }
                hideItme.uiObject.visibility = mw.SlateVisibility.Visible;
                hideItme.setData(info.nickName, info.hideTime, info.isCathced);
                hideIndex++;

            } else {
                let seekItme = this.seekItmeList[seekIndex];
                if (!seekItme) {
                    seekItme = this.createItem(this.mConent2,this.seekItmeList)
                }
                seekItme.uiObject.visibility = mw.SlateVisibility.Visible;
                seekItme.setData(info.nickName, null, info.catchNum);
                seekIndex++;
            }
        }


        

        
    }


    private hideAllItem() {
        for (let index = 0; index < this.hideItmeList.length; index++) {
            const element = this.hideItmeList[index];

            element.uiObject.visibility = mw.SlateVisibility.Collapsed;

            if (index < this.seekItmeList.length) {
                const seekItem = this.seekItmeList[index];
                seekItem.uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
            
        }
    }




}