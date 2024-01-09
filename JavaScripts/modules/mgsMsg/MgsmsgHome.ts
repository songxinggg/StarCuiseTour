import { EventsName} from "../../const/GameEnum";

@Decorator.autoExecute("init")
export abstract class MGSMsgHome {
	private static msgMap: Map<string, MsgClass> = new Map();
	/** 初始化*/
	public static init() {
		if (SystemUtil.isClient()) {
			Event.addServerListener(EventsName.NetMsg_MGSMsg_Send, (eventName: string, eventDesc: string, jsonData: string) => {
				console.warn("统计", eventName, eventDesc, jsonData);
				mw.RoomService.reportLogInfo(eventName, eventDesc, jsonData);
			});
		}
	}

	public static get(eventName: string): MsgClass {
		if (this.msgMap == null) {
			this.msgMap = new Map();
		}
		if (!this.msgMap.has(eventName)) {
			this.msgMap.set(eventName, new MsgClass(eventName));
		}
		return this.msgMap.get(eventName);
	}

	/////////////////////////////////////下面写法比较方便，但每次都会传个新的data体////////////////////////////
	/**
	 * @description: 上传埋点数据
	 * @param {string} key: 事件名
	 * @param {string} des: 事件描述
	 * @param {any} data: 参数域（包含参数名及取值）
	 * @player 在服务端调用时，指定埋点的玩家，如果不写则全房间玩家一起埋
	 * @return {*}
	 */
	public static uploadMGS(key: string, des: string, data: any, player?: mw.Player) {
		const msg = MGSMsgHome.get(key);
		msg.data = data;
		msg.send(des, player);
	}

	/////////////////////////////////////下面写法能稍微省内存/////////////////////////////////////////////////

}

class MsgClass {
	/**数据体 */
	public data: any;
	public key: string;
	constructor(key: string) {
		this.key = key;
		this.data = {};
	}
	public send(des: string, player?: mw.Player) {
		let jsonData: any = {};
		for (const key in this.data) {
			//潘多拉要求key都要是小写的，value不做要求
			jsonData[key.toLowerCase()] = this.data[key];
		}
		let jsonStr: string = JSON.stringify(jsonData);
		console.warn("统计", this.key, des, jsonStr);
		if (SystemUtil.isClient()) {
			mw.RoomService.reportLogInfo(this.key, des, jsonStr);
		} else {
			if (player == null) {
				Event.dispatchToAllClient(EventsName.NetMsg_MGSMsg_Send, this.key, des, jsonStr);
			} else {
				Event.dispatchToClient(player, EventsName.NetMsg_MGSMsg_Send, this.key, des, jsonStr);
			}
		}
	}
}
