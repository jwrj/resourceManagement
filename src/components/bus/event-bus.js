import Vue from 'vue'
export const bus = new Vue({
        data () {
        return {
                unitlist:[{
                			title: '深圳宝安时尚创意云谷',
							name:'中山市石头信息科技有限公司',
                			num: '198',
							assure:'1100',
							help:'',
							circle:'4',
							place:'北京',
							price:'12345',
							need:'化工',
                			person: '颜真卿',
                			cham:[ { "id": 2, "name": "aa商会", "date": "2016-10-01", "_checked": true }, { "id": 3, "name": "bb商会", "date": "2016-10-02" } ],
                			work: '名誉会长',
                			time:["2018-11-01","2019-12-18"]
                		},
                		{
                			title: '桂林大富翁科技云谷',
							name:'桂林市大富翁科技有限公司',
                			num: '3524',
							assure:'2580',
							help:'',
							circle:'9',
							place:'桂林',
							price:'12345',
							need:'智能科技',
                			person: '马杀鸡',
                			cham:[ { "id": 4, "name": "cc商会", "date": "2016-10-01", "_checked": true }, { "id": 2, "name": "aa商会", "date": "2016-10-02" } ],
                			work: '经理',
                			time:["2017-11-11","2019-11-11"]
                		},{
                			title: '健康食品展销会',
							name:'北京豆浆油条食品公司',
                			num: '338',
							assure:'800',
							help:'',
							circle:'2',
							place:'北京',
							price:'125',
							need:'食品安全',
                			person: '周大大',
                			cham:[ { "id": 2, "name": "aa商会", "date": "2016-10-01", "_checked": true }, { "id": 3, "name": "bb商会", "date": "2016-10-02" } ],
                			work: '名誉会长',
                			time:["2018-01-01","2019-04-18"]
                		}
                	],
					govlist:[
						{ title:'政府资源1',
						  cham:['商会1'],
						  person:'政府会计1',
						  work:'会计',
						  time:["2018-01-01","2019-04-18"],
						  money:'300',
						  invest:'30',
						  year:2,
						  need:'土木建工',
						  personList:[
							  {
								  name:'陆拾',
								  phone:'18892589712'
							  },
							   {
							   	name:'陆拾八',
							   	phone:'18892589312'
							   }
						  ]
							
						 },
						 { title:'政府资源2',
						 cham:['商会2'],
						 person:'政府秘书2',
						 work:'秘书',
						 time:["2018-01-01","2019-04-18"],
						 money:'400',
						 invest:'10',
						 year:6,
						 need:'土木建工',
						 personList:[
						 	{
						 		name:'陆拾',
						 		phone:'18892589712'
						 	},
						 	{
						 		name:'陆拾八',
						 		phone:'18892589312'
						 	}
						 ]
						 	
						 }
						],
					currentResource:{},
					scopeRes:[]
                
    }
  },
  created () {
	 this.scopeRes=this.unitlist;//初始化
	 
	 //监听
     this.$on('getUnit', unitList => {
			this.unitlist = unitList;
	 }); 
	 
	 this.$on('unitDetail',  current => {
		var name=current;
		this.unitlist.filter( item => {
			if(item.name===name){
				this.currentResource=item;
			}
		})
	 });
	 
     this.$on('govDetail',  current => {
     var name=current;
     this.govlist.filter( item => {
     	if(item.name===name){
     		this.currentResource=item;
     	}
     })
     });
  }
  
})