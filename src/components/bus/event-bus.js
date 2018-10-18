import Vue from 'vue'
export const bus = new Vue({
        data () {
        return {
                datalist:[{
                			title: '深圳宝安时尚创意云谷',
                			num: '132万',
                			person: '颜真卿',
                			cham:'广西湖北商会',
                			work: '名誉会长',
                			start: '2018-01-15',
                			end: '2018-09-18'
                		},
                		{
                			title: '广东宝安时尚创意云谷',
                			num: '132万',
                			person: '颜真卿2',
                			cham:'广西湖北商会1',
                			work: '名誉会长',
                			start: '2018-01-15',
                			end: '2018-09-18'
                		},
                		{
                			title:'中国(武汉·新洲)厨卫基地发展战略规划与招商策划案例',
                			num: '132万',
                			person: '张三丰',
                			cham:'广西湖北商会2',
                			work: '联系专员',
                			start: '2018-01-15',
                			end: '2018-09-18'
                		}
                	]
                
    }
  },
  created () {
        this.$on('getUnit', unitList => {
        this.datalist = unitList;
    })
  }
  
})