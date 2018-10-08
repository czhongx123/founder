<template>
<div>
    <Modal
            v-model="addModal"
            title="添加联系计划"
            :closable="false"
            :mask-closable="false"
            :footer-hide=true
    >
        <Form :model="formItemAdd" ref="formItemAdd" :rules="ruleformItemAdd" :label-width="100">
            <Row>
                <FormItem label="计划名称" prop="title">
                    <Input v-model="formItemAdd.title" placeholder="请输入计划标题"></Input>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="客户电话" prop="tel">
                    <Input v-model="formItemAdd.tel" placeholder="请输入客户电话"></Input>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="预约时间">
                    <DatePicker type="datetime" v-model="formItemAdd.visitTime" placeholder="选择预约时间"></DatePicker>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="提醒时间">
                    <Select v-model="formItemAdd.remindTime">
                        <Option value="1">5分钟</Option>
                        <Option value="2">10分钟</Option>
                        <Option value="3">15分钟</Option>
                    </Select>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="备注" prop="remarks">
                    <Input v-model="formItemAdd.remarks" type="textarea" :rows="4" placeholder="备注最多输入200个字符"></Input>
                </FormItem>
            </Row>
            <Row style="margin-top:40px;text-align: center">
                <Col :span="14">
                <Button type="primary" :loading="confirmLoading" @click="confirm('formItemAdd')">确认修改
                </Button>
                </Col>
                <Col :span="5">
                <Button type="default" @click="cancel()">取消
                </Button>
                </Col>
            </Row>
        </Form>
    </Modal>
 </div>
</template>
<script>
    import {name} from '@/config'
    export default {
        name: 'AddPlan',
        data() {
            var validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('计划名不能为空'))
                }
                if (value.length > 20) {
                    callback(new Error('计划名任务名不能超过二十个字符'))
                }
                let len = this.Trim(value, 'is_global').length
                if (len < 1) {
                    callback(new Error('计划名不能为空'))
                }
                callback()
            };//验证计划名
            var validateTel = (rule, value, callback) => {
                if (value !== '') {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        return callback(new Error("请输入正确的手机号"));
                    } else {
                        callback();
                    };
                } else {
                    callback(new Error("手机号不能为空"));
                }
            };//验证计划名
            var validatetextarea = (rule, value, callback) => {
                let len = this.Trim(value, 'is_global').length
                if (len > 200) {
                    callback(new Error('备注应在200字符内'))
                }
                callback()
            };//验证文本域描述
            return {
                name:name,
                confirmLoading: false,//编辑弹窗确定按钮的状态
                addModal: true,//编辑弹窗是否显示
                ruleformItemAdd: {
                    title: [{validator: validateTitle, trigger: 'blur', required: true}],
                    tel: [{validator: validateTel, trigger: 'blur', required: true}],
                    // remindTime:[{ validator: validateTitle, trigger: 'blur',required:true }],
                    // autoRate:[{ validator: validateautoRate, trigger: 'blur',type:'string'}],
                    remarks: [{validator: validatetextarea, trigger: 'blur', type: 'string'}]
                },
                formItemAdd: {
                    title: '',//计划的标题
                    tel: '',//客户的电话
                    visitTime: '',//预约的时间
                    remindTime: '',//提醒的标题
                    remarks: '',//备注
                },//编辑弹窗信息

            }
        },
        methods: {
            InitData(){
                this.formItemAdd={
                    title: '',//计划的标题
                    tel: '',//客户的电话
                    visitTime: '',//预约的时间
                    remindTime: '',//提醒的标题
                    remarks: '',//备注
                }
            },
            Trim(str, is_global) {
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g, "");
                if (is_global.toLowerCase() == "g") {
                    result = result.replace(/\s/g, "");
                }
                return result
            },
            confirm(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.confirmLoading = true
                        setTimeout(() => {
                            this.confirmLoading = false
                            // this.$emit('childByValue',false)
                            // this.$store.state.clkm.isPlanShow=false
                            // this.$store.commit('clkm/changePlanShow',false)
                            this.$store.commit(this.name+'/changePlanShow',false)
                            this.InitData()

                        }, 3000)

                    } else {
                        this.$Message.error('请完成合法配置!');
                    }
                })
            },//编辑弹窗的确定按钮
            cancel() {
                // this.$emit('childByValue',false)
                this.InitData()
                // this.$store.commit('clkm/changePlanShow',false)
                this.$store.commit(this.name+'/changePlanShow',false)
            },//编辑弹窗的确定按钮
        },
        computed: {
            // list () {
            //   return this.$store.state.clkm.list
            // }
        }
    }
</script>
<style lang="stylus">


</style>