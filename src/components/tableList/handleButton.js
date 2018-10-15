
let defaultBtnProps = {
    type: 'primary',
    size: 'small',
}

let defaultPoptip = {
	confirm: true,
    title: "标题",
    transfer: true
}

export const edit = (vm, h, params) => {
    return h('Button',{
    	props: {
    		type: 'primary',
    		size: 'small',
    	},
    	style: {
    		margin: '0 2px',
    	},
    	on: {
    		click: () => {
    			vm.modalShow = true;
    		}
    	},
    },'编辑');
}

export const details = (vm, h, params) => {
    return h('Button',{
    	props: {
    		type: 'success',
    		size: 'small',
    	},
    	style: {
    		margin: '0 2px',
    	},
    	on: {
    		click: () => {
    			vm.modalShow = true;
    		}
    	},
    },'详情');
}

export const buttonItem = (vm, h, params, btnParams={}) => {
	
	if(!btnParams.poptipOpen){
		
		return h('Button',{
    	
	    	props: Object.assign({}, defaultBtnProps, (btnParams.button_props || {})),
	    	
	    	style: {
	    		
	    		margin: '2px 2px',
	    		
	    	},
	    	
	    	on: {
	    		
	    		click: () => {
	    			
	    			vm.$emit('on-btn-click', Object.assign({}, btnParams, {params: params}));
	    			
	    			if(btnParams.modalShow){
	    				vm.modalShow = btnParams.modalShow;
	    			}
	    			
	    		}
	    		
	    	},
	    	
	    },btnParams.name || '按钮');
		
	}else if(btnParams.poptipOpen){//二次确认
		
		return h('Poptip',{
			
			props: Object.assign({}, defaultPoptip, (btnParams.poptip_props || {})),
			
			on: {
		    		
	    		'on-ok': () => {
	    			
	    			vm.$emit('on-poptip-ok', Object.assign({}, btnParams, {params: params}));
	    			
	    		},
	    		
	    		'on-cancel': () => {
	    			
	    			vm.$emit('on-poptip-cancel', Object.assign({}, btnParams, {params: params}));
	    			
	    		}
	    		
	    	},
			
		},[
			
			h('Button',{
	    	
		    	props: Object.assign({}, defaultBtnProps, (btnParams.button_props || {})),
		    	
		    	style: {
		    		
		    		margin: '2px 2px',
		    		
		    	},
		    	
		    	on: {
	    		
		    		click: () => {
		    			
		    			vm.$emit('on-btn-click', Object.assign({}, btnParams, {params: params}));
		    			
		    		}
		    		
		    	},
		    	
		    },btnParams.name || '按钮')
			
		]);
		
	}
	
}
