import { ISkillEntity, ISkillItemParam, ISkillLine, ISkillTimer } from "../../define/SkillDefine";
import { SkillBaseItem } from "./BaseItem";
import { SkillItemType } from "../../define/SkillDefine";


export class MoveItem extends SkillBaseItem {

   

    protected onParse(data: ISkillItemParam) {
       
    }

    public get type(): SkillItemType {
        return SkillItemType.Move;
    }

}