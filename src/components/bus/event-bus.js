import Vue from 'vue'
export const bus = new Vue({
        data () {
        return {
	
}
  },
  created () {
	 
	  this.$on('changeFold',current=>{
			 return current;
		});

  }
  
})