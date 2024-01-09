import { ModuleBase } from "./ModuleBase"
export default interface IPlayerModuleBase {
     moduleMap: Map<string, ModuleBase>
     getDataByPlayer(player: mw.Player | number)
}