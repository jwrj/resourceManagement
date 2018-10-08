
let defaultBtnProps = {
    type: 'primary',
    size: 'small',
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

export const buttonItem = (vm, h, params, btnParams={}, btnProps={}) => {
    return h('Button',{
    	props: Object.assign({}, defaultBtnProps, btnProps),
    	style: {
    		margin: '0 2px',
    	},
    	on: {
    		click: () => {
    			vm.$emit('on-btn-click', Object.assign({}, btnParams, {index: params.index}));
				vm.modalShow = true;
    		}
    	},
    },btnParams.name || '按钮');
}
