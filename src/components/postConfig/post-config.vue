<template>
	
	<div>
		
		<Tree :data="treeData" :render="renderContent"></Tree>
		
		<Modal v-model="modalShow" width="360">
	        <p slot="header">{{type === 'add'?'添加岗位':'编辑岗位'}}</p>
	        <div>
	        	<Input v-model="name" clearable placeholder="请输入岗位名称" />
	        </div>
	        <div slot="footer">
	            <Button type="primary" size="large" long @click="submit">确定</Button>
	        </div>
	    </Modal>
		
	</div>
	
</template>

<script>

export default {
	name: 'postConfig',
	components:{//组件模板
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
    data () {//数据
        return {
        	
        	modalShow: false,
        	
        	currentData: {},
        	
        	name: '',
        	
        	type: 'add',
        	
        	treeData: [
        		{
        			title: '未配置',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('div',{
                        	style: {
	                    		display: 'inline-block',
            					width: '100%',
            					paddingRight: '16px',
	                        },
                        },[
	                        h('span', {
	                            style: {
	                            },
	                            class: 'ivu-tree-title my-tree-node'
	                        }, [
	                            h('span', {
	                            	class: 'my-tree-title'
	                            }, [
	                                h('Icon', {
	                                    props: {
	                                        type: 'md-cube'
	                                    },
	                                    style: {
	                                        marginRight: '8px'
										
	                                    }
	                                }),
	                                h('span', data.title)
	                            ]),
	                            h('span', {
	                                style: {
	                                	marginLeft: 'auto'
	                                }
	                            }, [
		                            h('Button', {
				                        props: Object.assign({}, this.buttonProps, {
				                            icon: 'md-create',
				                            type: 'success',
				                        }),
				                        style: {
				                            marginRight: '8px'
				                        },
				                        on: {
				                            click: () => {
				                            	this.type = 'edit';
				                            	this.name = data.title;
				                            	this.modalShow = true;
				                                this.currentData = data;
				                            }
				                        }
				                    }),
	                                h('Button', {
	                                    props: Object.assign({}, this.buttonProps, {
	                                        icon: 'md-add',
	                                        type: 'primary',
	                                    }),
	                                    style: {
	                                    	
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.type = 'add';
	                                        	this.modalShow = true;
	                                        	this.currentData = data;
	                                        }
	                                    }
	                                })
	                            ])
	                        ])
                        ]);
        			}
                }
        	],
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        	
        }
    },
    methods: {//方法
    	
    	renderContent (h, { root, node, data }) {
            return h('div',{
            	style: {
            		display: 'inline-block',
            		width: '100%',
            		paddingRight: '16px',
                },
            },
			[ 			
            	h('span', {
	                style: {
	                    
	                },
                	class: 'ivu-tree-title my-tree-node'
	            }, 
				[ 
	                h('span', {
	                	class: 'my-tree-title'
	                }, [
	                    h('Icon', {
	                        props: {
	                            type: 'md-people',
	                        },
	                        style: {
	                            marginRight: '8px'
	                        }
	                    }),
	                    h('span', data.title)
	                ]),
	                h('span', {
	                    style: {
	                        marginLeft: 'auto',
	                    }
	                }, [
	                	h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-create',
	                            type: 'success',
	                        }),
	                        style: {
	                            marginRight: '8px'
	                        },
	                        on: {
	                            click: () => {
	                            	this.type = 'edit';
	                            	this.name = data.title;
	                            	this.modalShow = true;
	                                this.currentData = data;
	                            }
	                        }
	                    }),
	                    h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-add',
	                            type: 'primary',
	                        }),
	                        style: {
	                            marginRight: '8px'
	                        },
	                        on: {
	                            click: () => {
	                            	this.type = 'add';
	                            	this.modalShow = true;
	                                this.currentData = data;
	                            }
	                        }
	                    }),
	                    h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-remove',
	                            type: 'error',
	                        }),
	                        on: {
	                            click: () => { this.remove(root, node, data) }
	                        }
	                    })
	                ])
	            ])
            ]);
        },
        edit(data, title){
        	data.title = title;
        },
        append (data,title) {
            const children = data.children || [];
            children.push({
                title: title,
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        submit(){
        	if(this.type === 'add'){
        		this.append(this.currentData, this.name);
        	}else if(this.type === 'edit'){
        		this.edit(this.currentData, this.name);
        	}
        	this.name = '';
        	this.modalShow = false;
        },
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				/*
				 * 
				 * ------串行执行---------
				 * console.log(await getAjaxData());
				 * ...
				 * 
				 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
				 * let abc = getAjaxData();//先执行promise函数
				 * ...
				 * console.log(await abc);
				 * ...
				*/
				next(vm => {
					
				});
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>

<style lang="less">
	.my-tree-node{
		width: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.my-tree-title{
		display: flex;
		align-items: center;
	}
</style>