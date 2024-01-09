import { EventsName } from "../../../../const/GameEnum";
import InteractObject, { InteractLogic_C, InteractLogic_S } from "../InteractObject";
@Component
export default class NightVisible extends InteractObject {
    onStart() {
        this.init(NightVisible_S, NightVisible_C);
    }
}
//客户端
class NightVisible_C extends InteractLogic_C<NightVisible> {
    onStart(): void {
        this.gameObject.setVisibility(mw.PropertyStatus.Off)
        Event.addLocalListener(EventsName.StartParty, (isStart: boolean) => {
            isStart ? this.gameObject.setVisibility(mw.PropertyStatus.On) : this.gameObject.setVisibility(mw.PropertyStatus.Off)
        })
    }
    public onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
}
//服务端
class NightVisible_S extends InteractLogic_S<NightVisible> {
    onStart(): void {

    }
    public onPlayerAction(playerId: number, active: boolean) {

    }
}

