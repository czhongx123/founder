<template>
    <div class="page-wrapper">
        <Card style="height:100%;">
            <div v-show="current=='main'">
                <Form :model="formItem1" :label-width="80">
                    <Row :gutter="10">
                        <Col span="5">
                        <FormItem label="创建时间">
                            <Select v-model="formItem1.createTime">
                                <Option value="1">最近7天</Option>
                                <Option value="2">最近15天</Option>
                                <Option value="3">最近30天</Option>
                                <Option value="4">所有历史任务</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="5">
                        <Select v-model="formItem1.state">
                            <Option value="1">全部状态</Option>
                            <Option value="2">进行中</Option>
                            <Option value="3">暂停</Option>
                            <Option value="4">已过期</Option>
                            <Option value="5">已完成</Option>
                        </Select>
                        </Col>
                        <Col span="6">
                        <Input v-model="formItem1.search" placeholder="请输入任务名称客户名称或电话号码"></Input>
                        </Col>
                        <Col span="2">
                        <Button type="primary" icon="ios-search" :loading="searchLoading" @click="search">搜索任务</Button>
                        </Col>
                        <Col span="3">
                        <Button type="primary" icon="md-add" @click="createTask">创建外呼任务</Button>
                        </Col>
                    </Row>

                </Form>
                <Table height="600" :columns="columnsHome" :data="tableDataHome"></Table>
                <div style="margin: 10px;">
                    <div style="float: right;">
                        <Page :total="page1.total" show-total show-elevator show-sizer :current="1"
                              @on-change="changePage1"></Page>
                    </div>
                </div>
            </div>
            <div v-show="current=='detail'">
                <Row>
                    <Col :span="18">
                    <Row>
                        <Col>
                        <p style="margin-bottom: 10px"><a @click="goMain">外呼任务管理</a> > 新产品销售推广<span
                                style="color: #f11;margin-left: 20px">{{detailPage.Outbound}}</span>
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        创建时间：<span>11</span>
                        </Col>
                        <Col :span="12">
                        任务状态：<span>进行中</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        任务电电话数：<span>11</span>
                        </Col>
                        <Col :span="12">
                        任务速率：<span>进行中</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        已拨电话数：<span>11</span>
                        </Col>
                        <Col :span="12">
                        有效期：<span>进行中</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        呼损数：<span>11</span>
                        </Col>
                        <Col :span="12">
                        创建人：<span>进行中</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        <Row>
                            <Col span="3">
                            任务描述：
                            </Col>
                            <Col span="1">
                            <i class="ivu-icon ivu-icon-ios-create-outline"
                            style="font-size: 20px;color: blue;cursor: pointer" @click="edit"></i>
                            <!--<Button type="text"  icon="ios-create-outline" ></Button>-->
                            </Col>
                            <Col span="20">
                                 <p style="overflow: hidden;width: 100%; text-overflow: ellipsis;">1111111111111111asdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa111111111111111111111111111111111111111111111111111111111111111111111111</p>
                            </Col>
                        </Row>
                        </Col>
                        <Col :span="12">
                        坐席数量：<span>进行中</span>
                        </Col>
                    </Row>
                    <Row style="margin-top:15px;">
                        <Col>
                        <Form :model="formItem2" :label-width="100">
                            <FormItem label="任务分配数据">
                                <Row :gutter="10">
                                    <Col span="5">
                                    <Select v-model="formItem2.telState">
                                        <Option value="1">全部数据</Option>
                                        <Option value="2">未拨打</Option>
                                        <Option value="3">未接听</Option>
                                        <Option value="4">已接听</Option>
                                    </Select>
                                    </Col>
                                    <Col span="5">
                                    <Select v-model="formItem2.state">
                                        <Option value="1">全部数据</Option>
                                        <Option value="2">无</Option>
                                        <Option value="3">无效电话</Option>
                                        <Option value="4">无意向</Option>
                                        <Option value="5">意向</Option>
                                        <Option value="5">已成交</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6">
                                    <Input v-model="formItem2.search" placeholder="搜索客户名、手机号"></Input>
                                    </Col>
                                    <Col span="6">
                                    <Button type="primary" icon="ios-search" :loading="searchClientLoading" @click="searchDetail">搜索
                                    </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                        </Col>
                    </Row>
                    </Col>
                    <Col :span="6">
                    <Button type="error" style="margin: 5px 0;" long icon="md-trash" @click="delCurTask">删除当前任务
                    </Button>
                    <Button type="warning" style="margin: 5px 0;" long icon="ios-pause" v-show="!detailPage.tasking"
                            @click="pauseCurTask">暂停任务
                    </Button>
                    <Button type="primary" style="margin: 5px 0;" long icon="ios-play" v-show="detailPage.tasking"
                            @click="goOnCurTask">继续任务
                    </Button>
                    <Button type="info" style="margin: 5px 0;" long icon="md-settings" @click="setAutoRate">自动外呼速率
                    </Button>
                    <Button type="primary" style="margin: 5px 0;" long icon="md-settings" @click="setCurTask">整理时长调整
                    </Button>
                    <Button type="success" style="margin: 5px 0;" long icon="md-archive" :loading="exportDataLoading" @click="outPutCurTask">
                        导出任务数据
                    </Button>
                    </Col>
                </Row>
                <Table height="500" :columns="columnsDetail" :data="tableDataDetail" class="detailTable"></Table>
                <div style="margin: 10px 0;">
                    <div style="float: right;">
                        <Page :total="page2.total" show-total show-elevator show-sizer :current="1"
                              @on-change="changePage2"></Page>
                    </div>
                </div>
            </div>
            <Modal
                    v-model="detailPage.autoRateModal"
                    title=""
                    width="400"
                    :closable="false"
                    :mask-closable="false"
                    :footer-hide=detailPage.isFooterHide
            >
                <h3>系统自动外呼数=倍率值*当前可以坐席数。</h3>
                <Form :model="formItemAutoRate" :label-width="120">
                    <Row style="margin-top: 20px">
                        <FormItem label="请输入外呼倍率值">
                            <Input v-model="formItemAutoRate.autoRate" placeholder="请输入倍率"></Input>
                        </FormItem>
                    </Row>
                    <Row style="margin-top:40px;text-align: center">
                        <Col :span="12">
                        <Button type="error" :loading="confirmLoading" @click="confirm('rate',formItemAutoRate.autoRate)">确认修改
                        </Button>
                        </Col>
                        <Col :span="5">
                        <Button type="default" @click="cancel('rate')">取消
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                    v-model="detailPage.setTimeModal"
                    title=""
                    :closable="false"
                    width="400"
                    :mask-closable="false"
                    :footer-hide=detailPage.isFooterHide
            >
                <Form :model="formItemSetTime" :label-width="100">
                    <Row style="margin-top: 20px" :gutter="10">
                        <Col :span="22">
                        <FormItem label="修改整理时长">
                            <Input v-model="formItemSetTime.setTime" placeholder="请输入时长"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="2">
                        秒
                        </Col>
                    </Row>
                    <Row style="margin-top:40px;text-align: center">
                        <Col :span="12">
                        <Button type="error" :loading="confirmLoading" @click="confirm('time',formItemSetTime.setTime)">确认修改
                        </Button>
                        </Col>
                        <Col :span="5">
                        <Button type="default" @click="cancel('time')">取消
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                    v-model="detailPage.descriptionModal"
                    title=""
                    :closable="false"
                    width="400"
                    :mask-closable="false"
                    :footer-hide=detailPage.isFooterHide
            >
                <Form :model="formItemDescription" :label-width="100">
                    <Row style="margin-top: 20px" :gutter="10">
                        <FormItem label="任务描述">
                            <Input v-model="formItemDescription.description" type="textarea" :rows="4"
                                   placeholder="请输入任务描述"></Input>
                        </FormItem>
                    </Row>
                    <Row style="margin-top:40px;text-align: center">
                        <Col :span="12">
                        <Button type="error" :loading="confirmLoading" @click="confirm('description',formItemDescription.description)">确认修改
                        </Button>
                        </Col>
                        <Col :span="5">
                        <Button type="default" @click="cancel('description')">取消
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Card>
    </div>
</template>
<script>
    import Clipboard from 'clipboard'

    export default {
        name: 'TaskManage',
        data() {
            return {
                current: 'main',
                searchLoading:false,//搜索任务按钮的状态
                searchClientLoading:false,//搜索客户按钮的状态
                confirmLoading:false,//弹窗(可编辑)确定按钮的状态
                exportDataLoading:false,//导出任务数据按钮的状态
                detailPage: {
                    Outbound: '自动外呼',//外呼状态
                    tasking: false,//任务是否正在进行
                    autoRateModal: false,//显示自动倍率弹窗
                    isFooterHide: true,//隐藏弹窗页脚
                    setTimeModal: false,//显示调整时长弹窗
                    descriptionModal: false,//显示任务描述弹窗
                },//详情页的信息
                formItemAutoRate: {
                    autoRate: ''
                },//设置自动倍率调整的弹窗中的数据
                formItemSetTime: {
                    setTime: ''
                },//设置调整时长弹窗中的数据
                formItemDescription: {
                    description: ''
                },//设置任务描述弹窗中的数据

                formItem1: {
                    createTime: '1',//创建时间
                    state: '',//状态
                    search: '',//搜索内容
                },
                formItem2: {
                    telState: '1',//接听情况
                    state: '1',//跟进情况
                    search: '',//搜索内容
                },
                columnsHome: [
                    {
                        title: '任务名称',
                        key: 'title'
                    },
                    {
                        title: '开始时间',
                        key: 'startTime'
                    },
                    {
                        title: '有效期',
                        key: 'validity'
                    },
                    {
                        title: '任务数据量',
                        key: 'taskNum'
                    },
                    {
                        title: '完成百分比',
                        key: 'hadPercent'
                    },
                    {
                        title: '坐席数量',
                        key: 'memberNum'
                    },
                    {
                        title: '模式-状态',
                        key: 'moduleState'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        size: 'small',
                                        // value: params.row.currentState
                                        value: this.tableDataHome[params.index].currentState
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {

                                            // alert(params.row.currentState)
                                            this.changeState(params.index, params)
                                        }
                                    }
                                }, 'View'),
                                h('i', {
                                    props: {},
                                    style: {
                                        marginRight: '5px',
                                        color: 'green',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    },
                                    class: 'ivu-icon ivu-icon-ios-settings ',
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, ''),
                                h('i', {
                                    props: {},
                                    style: {
                                        color: '#ed4014',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    },
                                    class: 'ivu-icon ivu-icon-md-trash ',
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '')
                            ]);
                        }
                    }
                ],//table渲染信息
                columnsDetail: [
                    {
                        title: '电话号码',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    props: {},
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, params.row.telNumber),
                                h('i', {
                                    props: {},
                                    class: 'ivu-icon ivu-icon-md-copy ' + 'tel' + params.index,
                                    attrs: {
                                        'data-clipboard-text': params.row.telNumber,
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'blue',
                                        fontSize: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.copy(params.index)
                                        }
                                    }
                                }, '')
                            ]);
                        }
                    },
                    {
                        title: '拨打数',
                        key: 'ringNum',
                        sortable: true
                    },
                    {
                        title: '接通数',
                        key: 'connectNum',
                        sortable: true
                    },
                    {
                        title: '分配坐席',
                        key: 'position'
                    },
                    {
                        title: '跟进结果',
                        key: 'fllowResult'
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        // icon:'ios-gear-outline'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'blue',
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetail(params.index)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],//table渲染信息
                tableDataHome: [
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: true
                    },
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: false
                    },
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: true
                    },
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: false
                    }
                    ,
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: false
                    }
                    ,
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: false
                    }
                    ,
                    {
                        title: '河南客户回访',
                        startTime: '2016-10-03 13:24',
                        validity: '永久',
                        taskNum: '1213',
                        hadPercent: '23%',
                        memberNum: '33',
                        moduleState: '自动-进行中',
                        currentState: false
                    }


                ],//table信息
                tableDataDetail: [
                    {
                        telNumber: '13273121282',
                        ringNum: 818,
                        connectNum: 2,
                        position: '1001-王铁柱',
                        fllowResult: '有意向',
                        remarks: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息',
                    },
                    {
                        telNumber: '13210082',
                        ringNum: 88,
                        connectNum: 34,
                        position: '1001-王铁柱',
                        fllowResult: '有意向',
                        remarks: '备注信息',
                    },
                    {
                        telNumber: '132710082',
                        ringNum: 188,
                        connectNum: 2,
                        position: '1001-王铁柱',
                        fllowResult: '有意向',
                        remarks: '备注信息',
                    },
                    {
                        telNumber: '13272',
                        ringNum: 32,
                        connectNum: 12,
                        position: '1001-王铁柱',
                        fllowResult: '有意向',
                        remarks: '备注信息',
                    }
                ],//table信息
                page1: {
                    total: 100,//总页数
                },//分页信息
                page2: {
                    total: 100,//总页数
                },//分页信息

            }
        },
        mounted(){
            this.getInitData()
        },
        methods: {
            Trim(str, is_global) {
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g, "");
                if (is_global.toLowerCase() == "g") {
                    result = result.replace(/\s/g, "");
                }
                return result
            },
            getInitData(){
                console.log("初始化数据")
            },//获取初始化数据
            search() {

                this.searchLoading=true

                setTimeout(()=>{
                    this.searchLoading=false
                },1000)

            },//去搜索(主体页)
            searchDetail() {
                this.searchClientLoading=true

                setTimeout(()=>{
                    this.searchClientLoading=false
                },1000)

            },//详情页搜索
            edit() {
                this.detailPage.descriptionModal = true
            },//去编辑
            confirm(item, value) {
                this.confirmLoading=true
                if (item == 'rate') {
                    let len = this.Trim(value, 'is_global').length
                    if (len != 3) {
                        this.$Message.error('倍率应设置为3个字符')
                        return false
                    }
                    if (value > 2 || value < 0.01) {
                        this.$Message.error('倍率应在0.01至2之间')
                        return false
                    }

                    setTimeout(()=>{
                        this.confirmLoading=false
                        this.detailPage.autoRateModal = false
                    },1000)


                }
                if (item == 'time') {
                    if (value > 0) {
                        setTimeout(()=>{
                            this.confirmLoading=false
                            this.detailPage.setTimeModal = false
                        },1000)

                    } else {
                        this.$Message.error('时间设置应大于零')
                    }
                }
                if (item == 'description') {
                    let len = this.Trim(value, 'is_global').length
                    if (len < 1 || len > 200) {
                        this.$Message.error('任务描述应在1~200字符之间')
                        return false
                    }
                    setTimeout(()=>{
                        this.confirmLoading=false
                        this.detailPage.descriptionModal = false
                    },1000)

                }
            },//确认
            cancel(item) {
                if (item == 'rate') {
                    this.detailPage.autoRateModal = false
                }
                if (item == 'time') {
                    this.detailPage.setTimeModal = false
                }
                if (item == 'description') {
                    this.detailPage.descriptionModal = false
                }
            },//取消
            copy(index) {
                var a = '.tel' + index
                var clipboard = new Clipboard(a)
                clipboard.on('success', e => {
                    this.$Message.success('复制成功');
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },//点击复制手机号
            goMain() {
                this.current = "main"
            },//回到主体
            showDetail(index) {
                this.$Message.info('详情状态' + index)
            },//详情页的查看详情
            changeState(index, params) {
                var _this = this
                var cur = params.row.currentState
                _this.tableDataHome[index].currentState = !cur
                var MsgData = {
                    tit1: cur ? '是否要暂停任务' : '是否要继续任务',
                    tit2: params.row.title,
                    btnInfo: cur ? '确定暂停' : '确定继续'
                }
                this.$Modal.confirm({
                    title: MsgData.tit1 + '<span style="color:blue;margin-left: 10px">' + MsgData.tit2 + '</span>',
                    align: 'center',
                    okText: MsgData.btnInfo,
                    cancelText: '取消',
                    onOk: () => {
                        this.$Message.info('成功删除');
                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                        this.$set(_this.tableDataHome[index], "currentState", cur)
                    }
                });


            },//改变状态
            show(index) {
                this.current = 'detail'
            },//显示详情
            remove(index) {
                // this.modal.isModal=true;
                this.$Modal.confirm({
                    title: '是否确认删除任务，删除之后任务将被收回且不可恢复',
                    align: 'center',
                    okText: '确认删除',
                    cancelText: '取消',
                    onOk: () => {
                        this.$Message.info('成功删除');
                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                    }
                });


                // this.tableData.splice(index, 1)
            },//移除
            createTask() {
                this.$router.push('/clkm/createTask')
            },//创建外呼任务
            changePage1() {

            },//改变内容主体区页码
            changePage2() {

            },//改变详情区页码
            delCurTask() {
                this.$Modal.confirm({
                    title: '是否确认删除任务，删除之后任务将被收回且不可恢复',
                    align: 'center',
                    okText: '确认删除',
                    cancelText: '取消',
                    loading:true,
                    onOk: () => {
                        setTimeout(()=>{
                            this.$Modal.remove()
                            this.$Message.info('成功删除');
                        },2000)

                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                    },

                });

            },//删除任务
            pauseCurTask() {
                var a = '任务1'
                this.$Modal.confirm({
                    title: '是否暂停任务<span style="margin-left: 20px;color:blue">' + a + '</span>',
                    align: 'center',
                    okText: '确认暂停',
                    cancelText: '取消',
                    loading:true,
                    onOk: () => {

                        setTimeout(()=>{
                            this.$Modal.remove()
                            this.detailPage.tasking = true
                            this.$Message.info('修改成功')
                        },2000)
                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                    }
                });

            },//暂停任务
            goOnCurTask() {
                var a = '任务1'
                this.$Modal.confirm({
                    title: '是否继续任务<span style="margin-left: 20px;color:blue">' + a + '</span>',
                    align: 'center',
                    okText: '确认继续',
                    cancelText: '取消',
                    onOk: () => {
                        this.$Message.info('修改成功')
                        this.detailPage.tasking = false
                    },
                    onCancel: () => {
                        this.$Message.info('已取消')

                    }
                });

            },//继续任务
            setAutoRate() {
                this.detailPage.autoRateModal = true
            },//自动外呼速率
            setCurTask() {
                this.detailPage.setTimeModal = true

            },//整理时间调整
            outPutCurTask() {
                this.exportDataLoading=true

                setTimeout(()=>{
                    this.$Message.info('数据导出成功')
                    this.exportDataLoading=false
                },1000)


            },//导出任务数据
        },
        computed: {
            // list () {
            //   return this.$store.state.clkm.list
            // }
        }
    }
</script>
<style lang="stylus">
table
    .ivu-table-cell
        span

            overflow hidden
            white-space nowrap
            text-overflow ellipsis

</style>
