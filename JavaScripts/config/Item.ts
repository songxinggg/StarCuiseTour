import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Name_C","description","description_C","Quality","Faction","MaxCount","DefaultCount","Icon","iconByAsset","Resource","Action","TagType","ItemType","isShowInBar","isCanGive","ItemScale","permanent"],["","MainLanguage","ChildLanguage","MainLanguage","ChildLanguage","","","","","","","","","","","","","",""],[1,"Baby Boy","男婴","The sleeping baby, it's a boy","睡着的宝宝，是男孩子",2,0,1,1,"77086",null,10001,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[2,"Baby Girl","女婴","The sleeping baby, it's a girl","睡着的宝宝，是女孩子",2,0,1,1,"77121",null,10002,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[3,"Book","书","The House of gold is in the book","书中自有黄金屋",2,0,1,0,"77084",null,10003,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[4,"Camera","相机","Leave precious images on campus!","在校园留下珍贵影像吧！",2,0,1,0,"77120",null,10004,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[5,"Lightning Stick","荧光棒","Lightsaber Youth Editionヾ(•ω•`)o","光剑青春版ヾ(•ω•`)o",2,0,1,0,"77100",null,10005,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[6,"Guitar","吉他","Time to shine","展现音乐才能的时候到了",2,0,1,0,"64594",null,10006,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[7,"Pistol","手枪","Boom, boom, boom, boom, boom. One shot","砰砰砰，一枪定胜负",2,0,1,0,"77118",null,10007,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[8,"Scattergun","霰弹枪","This gun has a bigger, bigger range!","这把枪的范围更更更大！",2,0,1,0,"77127",null,10008,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[9,"Gun","冲锋枪","Roses of War and Fire","经典永不褪色，冲锋在前的好伙伴",2,0,1,0,"77104",null,10009,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[10,"Sprinkling Can","喷水壶","Maybe you can do more with it","或许不止可以用来浇花",2,0,1,1,"77109",null,10010,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[11,"Laptop","笔记本电脑","Tools of life and office","日常生活的好伙伴，效率办公的好助手",2,0,1,1,"77113",null,10011,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[12,"Cash","钱","Money can, but it can't solve everything","钞能力，但不能解决所有事情",2,0,1,0,"77111",null,10012,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[13,"Mop","拖把","Tools for cleaning","打扫干净，搞好卫生，共创整洁校园",2,0,1,0,"77108",null,10013,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[14,"Phone","手机","To discover and record the beauty of the world","用来发现与记录世界的美丽",2,0,1,0,"77101",null,10014,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[15,"Roit Shield","防爆盾","Say no to all violence!","向一切暴力说不！",2,0,1,0,"77114",null,10015,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[16,"Flowers","花束","It's a bunch of flowers, about death or love","这是一束花，关乎于死亡或是爱情",2,0,1,0,"77090",null,10016,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[17,"Cart","购物车","The shopping king's feast","我爱购物，我爱购物，这就是我的战车！",2,0,1,1,"77115",null,10017,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[18,"Board","牌子","Pledge your dreams","宣誓着你的梦想",2,0,1,1,"77126",null,10018,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[19,"Stroller","婴儿车","Haven as a baby","稳稳当当，四平八稳，小孩子也有远行的梦",2,0,1,1,"77082",null,10019,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[20,"Suitcase","行李箱","Pack in all your expectations for the future","装下对未来所有的期待",2,0,1,1,"77076",null,10020,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[21,"Umbrella","雨伞","Find someone to walk with in the rain","找一个能与你漫步雨中的人吧",2,0,1,0,"77078",null,10021,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[22,"Burger","汉堡","A burger to fill up on (Consumables)","一个汉堡，吃的饱饱（消耗品）",1,0,99,0,"108597",null,10022,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[23,"Milk","牛奶","Sweet milk (consumable)","上学时候睡前家里准备的牛奶（消耗品）",1,0,99,0,"108570",null,10023,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[24,"Bread","面包","Essential food for home travel (Consumables)","居家旅行的必备食粮（消耗品）",1,0,99,0,"108588",null,10024,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[25,"Bread","面包","Convenient commuting food (Consumables)","上学通勤的必备早餐（消耗品）",1,0,99,0,"108591",null,10025,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[26,"Beverage","饮料","Cool summer! Hey! (Consumables)","清凉一夏！欸嘿！（消耗品）",1,0,99,0,"108587",null,10026,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[27,"Beverage","饮料","Cool summer! Yeah! (Consumables)","清凉一夏！好耶！（消耗品）",1,0,99,0,"108582",null,10027,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[28,"Beverage","饮料","Cool summer! Whoop! (Consumables)","清凉一夏！呜呼！（消耗品）",1,0,99,0,"108585",null,10028,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[29,"Beverage","饮料","Cool summer! Ho! (Consumables)","清凉一夏！嚯呀！（消耗品）",1,0,99,0,"108581",null,10029,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[30,"Seasoning","调料","The soul of food (consumables)","好吃的美味千古流传，好用的调料传香万里（消耗品）",1,0,99,0,"108577",null,10030,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[31,"Alcohol","酒","In wine is the Story of the Ages (Consumable)","酒里是岁月的故事（消耗品）",1,0,99,0,"108595",null,10031,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[32,"Cola","可乐","Burp softly (Consumable)","轻轻打出一个响嗝（消耗品）",1,0,99,0,"108571",null,10032,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[33,"Milkshake","奶昔","The fruit of summer (Consumables)","和最爱的人分享甜甜的盛夏（消耗品）",1,0,99,0,"108569",null,10033,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[34,"Ice cream","冰淇淋","A good helper for cooling this summer (Consumable)","冰冰凉凉的解暑好助手（消耗品）",1,0,99,0,"108574",null,10034,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[35,"Donut","甜甜圈","Crispy and deep-fried (Consumable)","你是我双手合拢的一个圈（消耗品）",1,0,99,0,"108598",null,10035,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[36,"Pizza","披萨","Heard some places don't like pineapple on top? ! (Consumables)","听说有些地方不喜欢在上面加菠萝？！（消耗品）",1,0,99,0,"108596",null,10036,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[37,"Sasuage","香肠","The representative of air dried food (Consumables)","风干美味，好吃不贵，香醇品质，先到先得！（消耗品）",1,0,99,0,"108593",null,10037,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[38,"Skewers","烤串","Magic Campus barbecue are here! (Consumables)","魔法校园的烧烤申请出战！（消耗品）",1,0,99,0,"108579",null,10038,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[39,"Skewers","烤串","Crackling, steaming to meet you (Consumable)","劈里啪啦，冒着热气与你相见（消耗品）",1,0,99,0,"108578",null,10039,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[40,"Steak","牛排","Feel free to eat (Consumable)","没有什么必须的礼仪，吃的开心就行（消耗品）",1,0,99,0,"108589",null,10040,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[41,"Milktea","奶茶","The warm days of summer (Consumables)","回忆起了夏日午后的温暖时光（消耗品）",1,0,99,0,"108576",null,10041,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[42,"Milktea","奶茶","The fighting days of summer (consumables)","回忆起了旧日操场的拼搏岁月（消耗品）",1,0,99,0,"108573",null,10042,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[43,"Snack","零食","Don't steal food in class! (Consumables)","上课的时候可不要偷吃哦！（消耗品）",1,0,99,0,"108586",null,10043,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[44,"Snack","零食","Share the delicacy of the pieces (Consumable)","和最好的朋友分享这一份美味（消耗品）",1,0,99,0,"108572",null,10044,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[45,"Canned Food","罐头","For years, years, years! (Consumables)","可以放很多年，很多年，很多年！（消耗品）",1,0,99,0,"108580",null,10045,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[46,"Balloon","气球","Use balloons to release once childlike innocence","用气球放飞曾经的童真",2,0,1,0,"108590",null,10046,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[47,"Rubber Chicken","尖叫鸡","Cluck! Let out a scream","咯咯哒！发出来尖叫声",2,0,1,1,"108584",null,10047,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[48,"Stuffed Bunny","小白兔玩偶","Embrace in bed white flawless guardian","怀抱在被窝里洁白无暇的守护者",2,0,1,0,"108575",null,10048,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[49,"Stuffed kitty","橘猫玩偶","A diabolical cat cradled in bed","怀抱在被窝里狡黠暗黑的恶魔猫",2,0,1,0,"108592",null,10049,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[50,"Torch","火把","At night, watch out for candles","夜晚时分，小心火烛",2,0,1,0,"108594",null,10050,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[51,"Spotlight","射灯","Stage spotlight","不知道在哪拿到的舞台道具，听说派对咖在找它",2,0,1,0,"108583",null,10051,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[52,"Flamethrower","喷火器","Set the world on fire and fight back the darkness","点燃这个世界，击退无尽的黑暗",2,0,1,0,"110156",null,10052,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[53,"Cookie","曲奇","Freshly baked Crispy Cookies (Consumables)","刚刚烤好的香脆曲奇（消耗品）",1,0,99,0,"110182",null,10053,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[54,"Cake","蛋糕","A small cake to share with friends (Consumable)","下一次就和朋友分享友谊的蛋糕（消耗品）",1,0,99,0,"110104",null,10054,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[55,"Dessert","糕点","A small cake to share with friends(Consumables)","走亲访友必备佳品（消耗品）",1,0,99,0,"109974",null,10055,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[56,"Ice cream","冰淇淋","Cool for a summer! (Consumables)","冰凉一夏！（消耗品）",1,0,99,0,"110081",null,10056,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[57,"Pudding","布丁","QQ bounce, to eat slowly oh! (Consumables)","QQ弹弹，要慢点吃哦！（消耗品）",1,0,99,0,"109984",null,10057,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[58,"Crepes","可丽饼","Crispy and delicious (consumables)","自由搭配出属于自己的薄脆美味（消耗品）",1,0,99,0,"109987",null,10058,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[59,"Coffee","咖啡","No longer tired, Coffee back (Consumable)","不再疲惫，咖啡回来（消耗品）",1,0,99,0,"109969",null,10059,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[60,"Beverage","饮料","Would you like it cold or hot? (Consumables)","你是要冰的，还是热的呢？（消耗品）",1,0,99,0,"110348",null,10060,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[61,"Cake","蛋糕","A small cake to share with friends (Consumable)","这一次就和朋友分享友谊的蛋糕（消耗品）",1,0,99,0,"109959",null,10061,0,4,3,true,true,new mw.Vector2(0.8,0.8),0],[62,"Alcohol","酒","In wine is the Story of the Ages (Consumable)","酒里是岁月的故事（消耗品）",1,0,99,0,"110066",null,10062,0,4,3,true,true,new mw.Vector2(0.7,0.7),0],[63,"Alcohol","酒","In Wine is the Story of Youth (Consumable)","酒里是青春的故事（消耗品）",1,0,99,0,"110022",null,10063,0,4,3,true,true,new mw.Vector2(0.6,0.6),0],[64,"Barbell","哑铃","We go gym","锻炼~锻炼~",2,0,1,1,"110122",null,10064,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[65,"Curl Bar","杠铃","Champion reward","举重比赛第一名的奖品",2,0,1,1,"109978",null,10065,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[66,"Stuffed  Kitty","白猫玩偶","Holding it will make you look more cute","拿着会让自己显得更加可爱",2,0,1,1,"110173",null,10066,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[67,"Stuffed  Kitty","黑猫玩偶","Holding it will make you more lovable","拿着会让自己变得更加可爱",2,0,1,1,"110242",null,10067,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[68,"Stuffed  Kitty","灰猫玩偶","Holding it will make you feel cuter","拿着会让自己感觉更加可爱",2,0,1,1,"110098",null,10068,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[69,"Trophy","奖杯","The prize of admission, a trophy of mystical power","入学的奖品，蕴含着神秘力量的奖杯",2,0,1,0,"110197",null,10069,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[70,"Pad","橘猫靠垫","Take a break. Take a break","休息，休息一下",2,0,1,1,"110006",null,10070,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[71,"Pad","灰猫靠垫","Lean on, lean on","靠着，靠着一下",2,0,1,1,"110322",null,10071,0,1,1,true,true,new mw.Vector2(0.7,0.7),0],[72,"Classic Portable","游戏机","The game world in the palm of your hand","掌心中的游戏世界，玩会了就教家里人玩吧",2,0,1,1,"109998",null,10072,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[73,"Portable","掌机","The game world in the palm of your hand","掌心中的游戏世界，玩累了就休息休息",2,0,1,1,"110317",null,10073,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[74,"Wand","法杖","Wielding the light of fire with divine power","以神圣力量，挥舞出火焰的光芒",2,0,1,0,"112320",null,10074,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[75,"躁动之音","躁动之音","造型拉风的超级电音吉他，据说只有在音乐课上表现出众的学生才能获得","造型拉风的超级电音吉他，据说只有在音乐课上表现出众的学生才能获得",3,0,1,0,"77091",null,18007,29,1,1,true,false,new mw.Vector2(0.8,0.8),0],[101,"Jetpack","喷气背包","God sent the winner's backpack, fly fast","上帝送给胜利者的背包，快翱翔天际吧",3,0,1,0,"96594",null,20001,0,3,1,true,false,new mw.Vector2(0.9,0.9),0],[102,"Dark Wings","暗之翼","The darkness will consume you","黑暗会将你吞噬",1,0,1,1,"112142",null,10075,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[103,"Wings of Light","光之翼","The Illuminati grant freedom","光明会赋予自由",1,0,1,1,"112134",null,10076,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[104,"Sea Wings","海之翼","The ocean will protect all beings","海洋会保护众生",1,0,1,1,"112146",null,10077,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[105,"Wings of Flame","焰之翼","Flames inspire courage","烈焰会激发勇气",1,0,1,1,"112132",null,10078,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[106,"Black Bone","宿命凯瑞甘","Buried in the wings of the curse of fate","埋藏着宿命诅咒的翅膀",3,0,1,0,"112140",null,20006,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[107,"Bright Bone","光明骨","The wings that shelter the light","庇护圣光的翅膀",3,0,1,0,"112141",null,20007,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[108,"Blue Bone","海之契约","Dive into the ocean and give wings to breathe","潜入海洋赐予呼吸的翅膀",3,0,1,0,"112145",null,20008,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[109,"Fire Bone","盛夏烟火","Summer night sky","与最爱的人飞翔在夏日的夜空吧",3,0,1,0,"112150",null,20009,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[110,"Dark Night","黑夜","The night hidden in my heart","能够飞越黑暗的羽翼",2,0,1,0,"112139",null,20010,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[111,"Oracle","神谕","God said you can fly","神说，你能飞",2,0,1,0,"112143",null,20011,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[112,"Sea Dream","海梦","A dream hidden in the eyes","让你像鸟儿一样飞向天空",2,0,1,0,"112144",null,20012,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[113,"Friendship","友谊","The heart is beating, friendship is like fire","心在跳，友谊如烈火",2,0,1,0,"112138",null,20013,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[114,"Angel Wings","天使之翼","The wings of the power of the stars","星辰之力凝聚而成的圣洁羽翼",4,0,1,0,"164433",null,20014,0,1,1,true,false,new mw.Vector2(0.8,0.8),0],[115,"Underworld","冥国之声","Whoo ~~~~","呜~~~~",4,0,1,0,"178600",null,12001,0,3,1,true,true,new mw.Vector2(0.8,0.8),0],[116,"Disco flower","迪斯科花","If I were a DJ","如果我是DJ",2,0,1,0,"178606",null,12002,0,3,1,true,true,new mw.Vector2(0.8,0.8),0],[117,"Tambourine","摇摇铃鼓","Crowd only","围观群众专属",1,0,1,0,"178590",null,12003,0,3,1,true,true,new mw.Vector2(1,1),0],[118,"Scream","惊声尖笑","Looks like something smuggled out of a witch's house","像是从女巫的房子里”偷渡“出来的东西",2,0,1,0,"48799",null,12004,0,3,1,true,true,new mw.Vector2(1,1),0],[119,"RocknRoll","粉黑摇滚","PINKBLACK is on your area","粉黑在你的地盘",5,0,1,0,"178599",null,12005,0,3,1,true,true,new mw.Vector2(1,1),0],[201,"Firework","烟花","Festival only, Put away from crowd","庆典专用，远离人群放置",2,0,1,0,"96590",null,30001,0,1,1,true,true,new mw.Vector2(1,1),0],[202,"Bomb","炸弹","Bomb!","bomb~",2,0,1,0,"96611",null,30002,0,1,1,true,true,new mw.Vector2(0.8,0.8),0],[301,"Paraglider","滑翔伞","It helps you glide through the air","能帮助你在空中滑翔",3,0,1,0,"162667",null,13101,0,3,1,true,false,new mw.Vector2(0.7,0.7),0],[302,"Skateboard","滑板","Little skateboard, big wings","小小的滑板，大大的翅膀",4,0,1,0,"164196",null,18004,0,3,1,true,false,new mw.Vector2(1,1),0],[304,"Balance car","平衡车","Balance of speed and power","速度与力量的平衡",3,0,1,0,"178604",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[305,"A single plane","单人飞机","~ ~ ~ ~","~~~~",5,0,1,0,"178607",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[306,"Shark","鲨鲨","A souvenir from the shark","魔鲨留下的纪念品",4,0,1,0,"178595",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[307,"Spaceship","外星飞船","Goodbye Earthlings","再见地球人",5,0,1,0,"178596",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[308,"Twilight","暮光之城","300 years of night","300年的夜晚之约",4,0,1,0,"178598",null,18008,0,3,1,true,false,new mw.Vector2(1,1),0],[309,"Cool summer","清凉怡夏","On the use of watermelon","论西瓜的用处",3,0,1,0,"178591",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[310,"The Flying Book","飞天之书","An accidental product of making a magic blanket","制作神毯的意外产出物",5,0,1,0,"178594",null,0,0,3,1,true,false,new mw.Vector2(1,1),0],[90006,"Cash","钞票","Common currency for people on earth","去到地球后的可以使用的钞票",5,0,99999,0,"159402",null,0,0,3,5,false,false,new mw.Vector2(0.5,0.5),0],[100001,"6666","鼓掌","为喜欢的人欢呼吧！","为喜欢的人欢呼吧！",2,0,1,1,"34419",null,0,1,5,4,false,false,new mw.Vector2(1,1),0],[100002,"6667","鞠躬","1","纸上得来终觉浅，绝知此事要躬行",2,0,1,1,"35629",null,0,2,5,4,false,false,new mw.Vector2(1,1),0],[100003,"6668","打招呼","2","你好！",2,0,1,1,"35628",null,0,3,5,4,false,false,new mw.Vector2(1,1),0],[100004,"6669","点赞","3","对别人对一点鼓励哦！对自己也多一点",2,0,1,1,"35630",null,0,4,5,4,false,false,new mw.Vector2(1,1),0],[100005,"6670","飞吻","4","Mua~",2,0,1,1,"34431",null,0,5,5,4,false,false,new mw.Vector2(1,1),0],[100006,"6671","生气","5","惹啊啊啊啊啊啊啊啊啊！",2,0,1,1,"35632",null,0,6,5,4,false,false,new mw.Vector2(1,1),0],[100007,"6672","比心","6","记得要给喜欢的人用呀！",2,0,1,1,"34426",null,0,7,5,4,false,false,new mw.Vector2(1,1),0],[100008,"6673","摇头","7","摇头不仅可以表达否定，还可以活动波脖子!",2,0,1,1,"34417",null,0,8,5,4,false,false,new mw.Vector2(1,1),0],[100009,"6674","难过","8","呜呜呜呜呜呜呜呜~",2,0,1,1,"34430",null,0,9,5,4,false,false,new mw.Vector2(1,1),0],[100010,"6675","盘腿坐","9","据说盘腿坐可以进入新的境界",2,0,1,0,"34421",null,0,10,5,4,false,false,new mw.Vector2(1,1),0],[100011,"6676","躺下","10","我躺平了，你呢？",2,0,1,1,"34428",null,0,11,5,4,false,false,new mw.Vector2(1,1),0],[100012,"6677","翻跟头","11","孙悟空的独门绝技",2,0,1,0,"34427",null,0,12,5,4,false,false,new mw.Vector2(1,1),0],[100013,"6678","结印","12","想成为忍者需要结999次印哦！",3,0,1,0,"34423",null,0,13,5,4,false,false,new mw.Vector2(1,1),0],[100014,"6679","向后仰","13","是什么让你为之倾倒？",2,0,1,0,"34424",null,0,14,5,4,false,false,new mw.Vector2(1,1),0],[100015,"6680","抖腰","14","和朋友抖起来!",2,0,1,0,"34425",null,0,15,5,4,false,false,new mw.Vector2(1,1),0],[100016,"6681","举高","15","举高高咯~",4,0,1,0,"98699",null,0,16,5,4,false,false,new mw.Vector2(1,1),0],[100017,"6682","抗肩","16","哪有什么岁月静好，只是有人在负重前行！",5,0,1,0,"98700",null,0,17,5,4,false,false,new mw.Vector2(1,1),0],[100018,"6683","拖行","17","快带上朋友跑啊！",3,0,1,0,"98701",null,0,18,5,4,false,false,new mw.Vector2(1,1),0],[100019,"6684","怀抱","18","拥抱永远是必杀技",2,0,1,0,"34420",null,0,19,5,4,false,false,new mw.Vector2(1,1),0],[100020,"6685","公主抱","19","不是只有抱公主才是公主抱，是被公主抱过的人会变成公主",2,0,1,0,"34435",null,0,20,5,4,false,false,new mw.Vector2(1,1),0],[100021,"6686","肩抱","20","一位举重冠军的诞生",2,0,1,0,"98708",null,0,21,5,4,false,false,new mw.Vector2(1,1),0],[100022,"6687","怀旧慢舞","21","让我们一起跳舞！",2,0,1,1,"98674",null,0,22,5,4,false,false,new mw.Vector2(1,1),0],[100023,"6688","热情节拍","22","让我们一起跳舞！",2,0,1,0,"98714",null,0,23,5,4,false,false,new mw.Vector2(1,1),0],[100024,"6689","激情热舞","23","让我们一起跳舞！",2,0,1,1,"98673",null,0,24,5,4,false,false,new mw.Vector2(1,1),0],[100025,"6690","柔情似水","24","让我们一起跳舞！",2,0,1,0,"98682",null,0,25,5,4,false,false,new mw.Vector2(1,1),0],[100026,"6691","爱如潮水","25","让我们一起跳舞！",2,0,1,0,"98672",null,0,26,5,4,false,false,new mw.Vector2(1,1),0],[100027,"6692","Nobody","26","让我们一起跳舞！",2,0,1,0,"98713",null,0,27,5,4,false,false,new mw.Vector2(1,1),0],[100028,"6693","拳戏","27","让我们一起跳舞！",2,0,1,0,"108519",null,0,28,5,4,false,false,new mw.Vector2(1,1),0],[100029,"轻舞飞扬","轻舞飞扬","传说中的神秘舞步，需要在舞蹈课上表现优异才有机会获得","传说中的神秘舞步，需要在舞蹈课上表现优异才有机会获得",2,0,1,0,"34418",null,0,29,5,4,false,false,new mw.Vector2(1,1),0],[100031,"6695","扮鬼脸","29","略略略略略略略略略~",2,0,1,0,"168271",null,0,35,5,4,false,false,new mw.Vector2(1,1),0],[100032,"6696","转圈圈","30","别转太多次，会头晕",3,0,1,0,"174703",null,0,36,5,4,false,false,new mw.Vector2(1,1),0],[100033,"6697","后空翻","31","后空翻有一瞬间可以让世界颠倒",3,0,1,0,"120634",null,0,37,5,4,false,false,new mw.Vector2(1,1),0],[100034,"6698","膝盖舞","32","让我们一起跳舞！",4,0,1,0,"128699",null,0,38,5,4,false,false,new mw.Vector2(1,1),0],[100035,"6699","倒立行走","33","倒立行走相当于把世界抬起来行走",4,0,1,0,"146460",null,0,39,5,4,false,false,new mw.Vector2(1,1),0],[100036,"6700","过肩摔","34","摔跤中的经典姿势",5,0,1,0,"146525",null,0,40,5,4,false,false,new mw.Vector2(1,1),0],[100037,"6701","依靠","35","和喜欢的人在板凳上相互依靠吧",5,0,1,0,"120678",null,0,41,5,4,false,false,new mw.Vector2(1,1),0],[100038,"6702","牵手","36","牵手的时候能感受到对方的心意吗？",2,0,1,0,"174704",null,0,42,5,4,false,false,new mw.Vector2(1,1),0],[100039,"6703","跪拜","37","感恩！",2,0,1,0,"174702",null,0,43,5,4,false,false,new mw.Vector2(1,1),0],[100041,"6704","超人旋转飞","39","原来超人也会钻地",3,0,1,0,"174703",null,0,45,5,4,false,false,new mw.Vector2(1,1),0],[100042,"6705","旋转劈叉","40","挖掘身体的极限才能完成的动作",4,0,1,0,"120641",null,0,46,5,4,false,false,new mw.Vector2(1,1),0],[100043,"6706","Dab手势","41","skr~~~~~~",4,0,1,0,"146463",null,0,47,5,4,false,false,new mw.Vector2(1,1),0],[100044,"6707","双人比心","42","爱的证明",5,0,1,0,"146815",null,0,48,5,4,false,false,new mw.Vector2(1,1),0],[100045,"6708","倒立陀螺转","43","挖掘身体的极限才能完成的动作",5,0,1,0,"174703",null,0,49,5,4,false,false,new mw.Vector2(1,1),0],[100046,"6709","爱心舞","44","让我们一起跳舞！",2,0,1,0,"128719",null,0,50,5,4,false,false,new mw.Vector2(1,1),0],[100047,"6710","街舞","45","让我们一起跳舞！",2,0,1,0,"128719",null,0,52,5,4,false,false,new mw.Vector2(1,1),0],[100048,"6711","海草舞","46","让我们一起跳舞！",3,0,1,0,"128719",null,0,51,5,4,false,false,new mw.Vector2(1,1),0],[100049,"6712","天鹅舞","47","让我们一起跳舞！",3,0,1,0,"128719",null,0,53,5,4,false,false,new mw.Vector2(1,1),0],[100050,"6713","怦然心动","48","让我们一起跳舞！",4,0,1,0,"128719",null,0,54,5,4,false,false,new mw.Vector2(1,1),0],[100051,"6714","和我交往吧","49","让我们一起跳舞！",4,0,1,0,"128719",null,0,55,5,4,false,false,new mw.Vector2(1,1),0],[100052,"6715","两只老虎爱跳舞","50","让我们一起跳舞！",5,0,1,0,"128719",null,0,56,5,4,false,false,new mw.Vector2(1,1),0],[100053,"6716","爱杀宝贝","51","让我们一起跳舞！",5,0,1,0,"128719",null,0,57,5,4,false,false,new mw.Vector2(1,1),0],[100054,"6717","德式背摔","52","摔跤手的比杀技！爱Ta就Ta！",5,0,1,0,"120677",null,0,58,5,4,false,false,new mw.Vector2(1,1),0],[140016,"Magic Box ","派对魔盒","Could be a hit at parties. ","发起派对邀请",5,0,1,0,"192863",null,0,0,3,1,true,false,new mw.Vector2(1,1),1],[150001,"Swim Ring ","黄鸭子泳圈","Swim Ring ","变身道具",3,0,9,1,null,"84071",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150002,"Swim Ring ","绿鸭子泳圈","Swim Ring ","变身道具",3,0,9,1,null,"84079",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150003,"Swim Ring ","紫鸭子泳圈","Swim Ring ","变身道具",3,0,9,1,null,"23536",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150004,"Swim Ring ","粉鸭子泳圈","Swim Ring ","变身道具",3,0,9,1,null,"136176",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150005,"Swim Ring ","小黄鸭泳圈","Swim Ring ","变身道具",3,0,9,1,null,"136167",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150006,"Beach Lounger ","海滩躺椅","Beach Lounger ","变身道具",3,0,9,1,null,"135413",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150007,"Chair ","椅子","Chair ","变身道具",3,0,9,1,null,"109793",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150008,"Roast Pig ","烤乳猪","Roast Pig ","变身道具",3,0,9,1,null,"120270",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150009,"Vase ","花瓶","Vase ","变身道具",3,0,9,1,null,"29661",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150010,"Ice cream ","冰淇淋","Ice cream ","变身道具",3,0,9,1,null,"23109",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150011,"Chocolate ","巧克力","Chocolate ","变身道具",3,0,9,1,null,"23129",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150012,"Pudding ","布丁","Pudding ","变身道具",3,0,9,1,null,"23116",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150013,"Gingerbread","姜饼小屋","Gingerbread","变身道具",3,0,9,1,null,"124522",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150014,"XO Juice ","XO果汁","XO Juice ","变身道具",3,0,9,1,null,"147548",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150015,"Wheat Juice ","小麦果汁","Wheat Juice ","变身道具",3,0,9,1,null,"129301",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150016,"Grape Juice ","葡萄果汁","Grape Juice ","变身道具",3,0,9,1,null,"129295",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150017,"Stereo ","音响","Stereo ","变身道具",3,0,9,1,null,"174385",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150018,"Trash Can ","垃圾桶","Trash Can ","变身道具",3,0,9,1,null,"107958",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150019,"Toilet ","马桶","Toilet ","变身道具",3,0,9,1,null,"170101",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150020,"Flower Column ","花柱","Flower Column ","变身道具",3,0,9,1,null,"171925",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150021,"Lamp","灯","Lamp","变身道具",3,0,9,1,null,"170482",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150022,"Sakura Tree ","樱花树","Sakura Tree ","变身道具",3,0,9,1,null,"166485",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150023,"Statue ","雕像","Statue ","变身道具",3,0,9,1,null,"82523",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150024,"Sofa ","沙发","Sofa ","变身道具",3,0,9,0,null,"171354",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150025,"Bar ","吧台","Bar ","变身道具",3,0,9,0,null,"134104",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150026,"Refrigerator ","冰箱","Refrigerator ","变身道具",3,0,9,0,null,"170100",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150027,"Soccer Ball ","足球","Soccer ball ","变身道具",4,0,9,0,null,"93273",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150028,"Eggplant ","茄子","Eggplant ","变身道具",4,0,9,0,null,"34513",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150029,"Black-faced Cat ","黑脸猫","Black-faced cat ","变身道具",4,0,9,0,null,"195261",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150030,"Bicolor Cat ","奶牛猫","Bicolor Cat ","变身道具",4,0,9,0,null,"195260",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150031,"Calico Cat ","小花猫","Little Flowery Cat ","变身道具",4,0,9,0,null,"194960",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150032,"Dotty Puppy ","黑白狗","Black and white dog ","变身道具",4,0,9,0,null,"195090",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150033,"Cute Puppy ","小花狗","Cute Puppy ","变身道具",4,0,9,0,null,"195014",0,0,4,3,true,false,new mw.Vector2(1,1),0],[150034,"Brown Puppy ","小棕狗","Brown Puppy ","变身道具",4,0,9,0,null,"195088",0,0,4,3,true,false,new mw.Vector2(1,1),0]];
export interface IItemElement extends IElementBase{
 	/**道具ID*/
	ID:number
	/**英文名称*/
	Name:string
	/**英文描述*/
	description:string
	/**品质*/
	Quality:number
	/**派系：飞行=1 造物=2 战斗=3*/
	Faction:number
	/**最大道具数量*/
	MaxCount:number
	/**初始值*/
	DefaultCount:number
	/**图标(GUID)*/
	Icon:string
	/**图标（资源ID）*/
	iconByAsset:string
	/**装备表ID
（PropAction表）*/
	Resource:number
	/**动作表ID*/
	Action:number
	/**标签页：普通类=1 魔法类=2 圣物=3 消耗类=4 动作类=5 碎片=6*/
	TagType:number
	/**道具类别：不可消耗类=1  消耗耐久类=2  消耗数量类=3  动作类=4  货币类=5*/
	ItemType:number
	/**添加道具时是否在快捷栏显示*/
	isShowInBar:boolean
	/**是否可给予*/
	isCanGive:boolean
	/**在背包里的缩放*/
	ItemScale:mw.Vector2
	/**是否为常驻（无法被删除）*/
	permanent:number
 } 
export class ItemConfig extends ConfigBase<IItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}