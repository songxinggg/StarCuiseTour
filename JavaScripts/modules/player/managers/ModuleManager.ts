import { RunState } from "../../../const/GameEnum";
import { single } from "../../../utils/GameUtils";
import { ModuleBase } from "../base/ModuleBase";

@single()
export class PlayerModuleManager {
    public static readonly instance: PlayerModuleManager = null;
    public moduleMap: Map<RunState, TypeName<ModuleBase>[]> = new Map()
}
export function registerModule(runState: RunState) {
    return function <T extends ModuleBase>(constructor: TypeName<T>): any {
        if (!PlayerModuleManager.instance.moduleMap.has(runState)) {
            PlayerModuleManager.instance.moduleMap.set(runState, [])
        }
        let moduleArr = PlayerModuleManager.instance.moduleMap.get(runState)
        moduleArr.push(constructor)
    };
}