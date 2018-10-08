<template>
    <div class="page-wrapper">
        <Card style="height:100%;">
            <div v-show="current=='main'">
                <Form :model="formItem1" :label-width="80">
                    <FormItem label="">
                        <Row :gutter="10">
                            <Col span="5">
                            <Select v-model="formItem1.showPeriod">
                                <Option value="1">最近7天</Option>
                                <Option value="2">最近15天</Option>
                                <Option value="3">最近30天</Option>
                                <Option value="4">所有历史任务</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <Select v-model="formItem1.showState">
                                <Option value="1">全部状态</Option>
                                <Option value="2">已完成</Option>
                                <Option value="3">暂停</Option>
                                <Option value="4">终止</Option>
                                <Option value="5">滞后完成</Option>
                            </Select>
                            </Col>
                            <Col span="7">
                            <Row>
                                <Col :span="5">
                                任务名称：
                                </Col>
                                <Col :span="19">
                                <Input v-model="formItem1.search" placeholder="请输入任务名称"></Input>

                                </Col>
                            </Row>

                            </Col>
                            <Col span="2">
                            <Button type="primary" icon="ios-search" @click="search">搜索任务</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                <Table height="600" :columns="columns1" :data="tableData1"></Table>
                <div style="margin: 10px;">
                    <div style="float:right">
                        <Page :total="page1.total"
                              :page-size="15"
                              :page-size-opts=[15,20,30,40]
                              show-total
                              show-elevator
                              show-sizer
                              :current="1"
                              @on-change="changePage1"></Page>
                    </div>
                </div>
            </div>
            <div v-show="current=='detail'">
                <Row>
                    <Col>
                    <p style="margin-bottom: 10px"><a @click="goMain">我的任务</a> > 新产品销售推广</p>
                    </Col>
                </Row>
                <Row>
                    <Col :span="2">
                    <p>任务信息：</p>
                    </Col>
                    <Col :span="22">
                    <Row>
                        <Col :span="6">
                        任务名称：<span>{{step2.title}}</span>
                        </Col>
                        <Col :span="16">
                            <p style="color: red">{{step2.ringType}}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        接通数：<span>{{step2.connectNum}}</span>
                        </Col>
                        <Col :span="12">
                        有效期：<span>{{step2.periodValidity}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        任务状态：<span>{{step2.state}}</span>
                        </Col>
                        <Col :span="12">
                        创建时间：<span>{{step2.createTime}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="12">
                        任务电话数：<span>{{step2.telNum}}</span>
                        </Col>
                        <Col :span="12">
                        呼损数：<span>{{step2.lossNum}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="24">
                        已拨电话数：<span>{{step2.title}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="24">
                        任务描述：<span>{{step2.description}}</span>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Form :model="formItem2" :label-width="80">
                    <FormItem label="">
                        <Row :gutter="10">
                            <Col span="5">
                            <Select v-model="formItem2.ringState">
                                <Option value="1">全部数据</Option>
                                <Option value="2">未拨打</Option>
                                <Option value="3">未接听</Option>
                                <Option value="4">已接听</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <Select v-model="formItem2.followState">
                                <Option value="1">全部数据</Option>
                                <Option value="2">无</Option>
                                <Option value="3">无效电话</Option>
                                <Option value="4">无意向</Option>
                                <Option value="5">意向</Option>
                                <Option value="6">成交</Option>
                            </Select>
                            </Col>
                            <Col span="7">
                            <Row>
                                <Col :span="5">
                                任务名称：
                                </Col>
                                <Col :span="19">
                                <Input v-model="formItem2.search" placeholder="搜索客户名、手机号"></Input>
                                </Col>
                            </Row>
                            </Col>
                            <Col span="2">
                            <Button type="primary" icon="ios-search" :loading="searchClientLoading" @click="search">搜索</Button>
                            </Col>
                            <Col span="4">
                            <Button :type="ringDateAuto.ringState" v-if="step2.ringType=='自动外呼'" long @click="ring('auto',ringDateAuto.ringState)">
                                {{ringDateAuto.ringMsg}}
                            </Button>
                            <Button :type="ringDateManual.ringState" v-if="step2.ringType!='自动外呼'" long
                                    @click="ring('manual',ringDateManual.ringState)">{{ringDateManual.ringMsg}}
                            </Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                <Table height="500" :columns="columns2" :data="tableData2"></Table>
                <div style="margin: 10px;">
                    <div style="float:right">
                        <Page :total="page2.total"
                              :page-size="20"
                              :page-size-opts=[15,20,30,40]
                              show-total
                              show-elevator
                              show-sizer
                              :current="1"
                              @on-change="changePage1"></Page>
                    </div>
                </div>
            </div>
            <Modal
                    v-model="step2.taskStyleModal"
                    title=""
                    :closable="false"
                    :mask-closable="false"
                    :footer-hide="true"
            >
                <Form :model="formItemTaskStyle" :label-width="100">
                    <Row style="margin-top: 20px" :gutter="10">
                        <Col :span="15">
                        <FormItem label="修改整理时长">
                            <Select v-model="formItemTaskStyle.time" style="width:200px">
                                <Option v-for="item in step2.setTimeList" :value="item" :key="item">{{ item
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col :span="2">
                        秒
                        </Col>
                        <Col :span="7">
                        被分配任务量1
                        </Col>
                    </Row>
                    <Row style="margin-top:40px;text-align: center">
                        <Col :span="12">
                        <Button type="error" @click="confirm('time',formItemTaskStyle.time)">确认修改
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
                    title="查看详情"
                    v-model="modal1"
                    class-name="vertical-right-modal">
                <Row>
                    <Col :span=8>
                    电话号码</Col>
                    <Col :span=8>
                    拨打次数</Col>
                    <Col :span=8>
                    接听次数</Col>
                </Row>
                <Row>
                    <Col :span=8>
                    13273710082</Col>
                    <Col :span=8>
                    3</Col>
                    <Col :span=8>
                    5</Col>
                </Row>
                <Row>
                    <Col :span=6>
                    号码归属地</Col>
                    <Col :span=16>
                    浙江杭州</Col>
                </Row>
                <Row>
                    <Col :span=6>
                    通话总结</Col>
                </Row>
                <Form :model="formItem3" :label-width="100">
                    <Row :gutter="5">
                        <Col :span="6" style="margin-left: 60px">
                        当前跟进结果</Col>
                        <Col :span="15">
                        <RadioGroup v-model="formItem3.fllowResult">
                            <Radio label="无"></Radio>
                            <Radio label="有意向"></Radio>
                            <Radio label="无意向"></Radio>
                            <Radio label="高意向"></Radio>
                            <Radio label="已成交"></Radio>
                        </RadioGroup>
                        </Col>
                    </Row>
                    <Row style="margin-top: 10px">
                        <Col :span="6" style="margin-left: 60px">
                        备注
                        </Col>
                        <Col :span="15">
                        <Input v-model="formItem3.remarks" placeholder=""></Input>
                        </Col>
                    </Row>
                    <Row :gutter="10">
                        <Col span="24">
                        <Tabs value="0">
                            <TabPane label="更多资料" name="0">
                                <Row style="margin-top: 10px">
                                    <Col :span="6">
                                    客户姓名</Col>
                                    <Col :span="18">
                                    <Input v-model="formItem3.clientName" placeholder=""></Input>
                                    </Col>
                                </Row>
                                <Row style="margin-top: 10px">
                                    <Col :span="6">
                                    公司</Col>
                                    <Col :span="18">
                                    <Input v-model="formItem3.company" placeholder=""></Input>
                                    </Col>
                                </Row>
                                <Row style="margin-top: 10px">
                                    <Col :span="6">
                                    邮箱</Col>
                                    <Col :span="18">
                                    <Input v-model="formItem3.email" placeholder=""></Input>
                                    </Col>
                                </Row>
                                <Row style="margin-top: 10px">
                                    <Col :span="6">
                                    行业</Col>
                                    <Col :span="18">
                                    <Input v-model="formItem3.trade" placeholder=""></Input>
                                    </Col>
                                </Row>
                                <Row style="margin-top: 10px">
                                    <Col :span="6">
                                    职务</Col>
                                    <Col :span="18">
                                    <Input v-model="formItem3.position" placeholder=""></Input>
                                    </Col>
                                </Row>
                                <Row style="margin-top: 10px;text-align: center">
                                    <Col :span="3" :push="6">
                                    <Button type="primary" @click="newTask">新建工单</Button>
                                    </Col>
                                    <Col :span="3" :push="9">
                                    <Button type="success" @click=newPlan>新建计划</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane label="CRM" name="1">
                                <Row style="margin-top: 10px;text-align: center">
                                    <Col :span="3" :push="6">
                                    <Button type="primary" @click="newTask">新建工单</Button>
                                    </Col>
                                    <Col :span="3" :push="9">
                                    <Button type="success" icon="ios-telephone" @click=newPlan>呼叫转移</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                        </Col>
                    </Row>
                    <Row :gutter="10">
                        <Col span="24">
                        <Tabs value="0">
                            <TabPane label="通话记录" name="0">
                                <Table :columns="columnsRecord" :data="tableDataRecord"></Table>
                            </TabPane>
                            <TabPane label="历史工单" name="1">
                                <Table :columns="columnsHistory" :data="tableDataHistory"></Table>

                            </TabPane>
                            <TabPane label="联系计划" name="2">
                                <Row style="margin-bottom: 15px">
                                    <Col>
                                    <Button type="success" icon="plus" @click=newPlan>添加联系计划</Button>
                                    </Col>
                                </Row>
                                <Table :columns="columnsPlan" :data="tableDataPlan"></Table>
                            </TabPane>
                        </Tabs>
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
        name: 'MyList',
        data() {
            return {
                current: 'detail',//当前页
                modal1: false,//详情页
                searchClientLoading:false,//搜索客户按钮的状态
                ringDateAuto: {
                    ringState: 'success',
                    ringMsg: '开始自动外呼'
                },
                ringDateManual: {
                    ringState: 'success',
                    ringMsg: '开始自助外呼'
                },
                formItem1: {
                    showPeriod: '1',//显示周期
                    showState: '1',//呼损状态
                    search: '',//搜索内容
                },
                formItem2: {
                    ringState: '1',//拨打电话情况
                    followState: '1',//跟进情况
                    search: '',//搜索内容
                },
                formItem3: {
                    fllowResult: '1',//当前跟进结果
                    remarks: '',//备注
                    clientName: '',//客户姓名
                    company: '',//公司
                    email: '',//邮箱
                    trade: '',//行业
                    position: '',//职务
                },
                formItemTaskStyle: {
                    time: 1
                },
                step2: {
                    title: '1',//任务名称
                    ringType:'手动外呼',//呼叫方式
                    connectNum: '1',//接通数
                    periodValidity: '1',//有效期
                    state: '1',//任务状态
                    createTime: '1',//创建时间
                    telNum: '1',//任务电话数
                    ringNum: '1',//已拨电话数
                    lossNum: '1',//呼损数
                    description: '1',//任务描述
                    taskStyleModal: false,//自动任务的弹窗
                    setTimeList: [1, 2, 3, 4, 5, 6]

                },
                columns1: [
                    {
                        title: '任务名称',
                        key: 'title'
                    },
                    {
                        title: '任务描述',
                        key: 'description'
                    },
                    {
                        title: '任务状态',
                        key: 'state'
                    },
                    {
                        title: '完成百分比',
                        key: 'percent'
                    },
                    {
                        title: '任务开始执行时间',
                        key: 'startTime'
                    },
                    {
                        title: '据结束天数',
                        key: 'remainTime'
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
                                            this.intoTask(params.index)
                                        }
                                    }
                                }, '进入任务')
                            ]);
                        }
                    }
                ],//table渲染信息
                columns2: [
                    {
                        title: '客户电话号码',
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
                        title: '客户名',
                        key: 'clientName'
                    },
                    {
                        title: '拨打数',
                        key: 'ringNum'
                    },
                    {
                        title: '接通数',
                        key: 'connectNum'
                    },
                    {
                        title: '跟进结果',
                        key: 'followResult'
                    },
                    {
                        title: '上次通话时间',
                        key: 'lastCalls'
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        // width: '200',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        icon: 'md-call'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'green',
                                        display: (params.index == '1') ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.intoTask(params.index)
                                        }
                                    }
                                }, '拨打电话'),
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
                                            this.intoTask(params.index)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],//table渲染信息
                columnsRecord: [
                    {
                        title: '方式',
                        key: 'style'
                    },
                    {
                        title: '状态',
                        key: 'state'
                    },
                    {
                        title: '时长',
                        key: 'callDuration'
                    },
                    {
                        title: '时间',
                        key: 'callTime'
                    },
                    {
                        title: '姓名',
                        key: 'Name'
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    }
                ],//table渲染信息
                columnsHistory: [
                    {
                        title: '工单标题',
                        key: 'title'
                    },
                    {
                        title: '工单时间',
                        key: 'time'
                    },
                    {
                        title: '工单类型',
                        key: 'style'
                    },
                    {
                        title: '当前处理人',
                        key: 'operator'
                    },
                    {
                        title: '工单描述',
                        key: 'description'
                    }
                ],//table渲染信息
                columnsPlan: [
                    {
                        title: '计划名称',
                        key: 'planTitle'
                    },
                    {
                        title: '计划时间',
                        key: 'planTime'
                    },
                    {
                        title: '回访时间',
                        key: 'returnTime'
                    },
                    {
                        title: '回访结果',
                        key: 'returnResult'
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],//table渲染信息
                tableData1: [
                    {
                        title: '东部回访',
                        description: '首次东部回访客户营销',
                        state: '自动-进行中',
                        percent: '78%',
                        startTime: '2016-10-03 13:24',
                        remainTime: '20天',
                    },
                    {
                        title: '东部回访',
                        description: '首次东部回访客户营销',
                        state: '自动-进行中',
                        percent: '78%',
                        startTime: '2016-10-03 13:24',
                        remainTime: '20天',
                    },
                    {
                        title: '东部回访',
                        description: '首次东部回访客户营销',
                        state: '自动-进行中',
                        percent: '78%',
                        startTime: '2016-10-03 13:24',
                        remainTime: '20天',
                    },
                    {
                        title: '东部回访',
                        description: '首次东部回访客户营销',
                        state: '自动-进行中',
                        percent: '78%',
                        startTime: '2016-10-03 13:24',
                        remainTime: '20天',
                    }
                ],//table信息
                tableData2: [
                    {
                        telNumber: '13273710082',
                        clientName: '华为',
                        ringNum: '3000',
                        connectNum: '232',
                        followResult: '无',
                        lastCalls: '2016-10-03 13:24',
                        remarks: '20天',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '华为',
                        ringNum: '3000',
                        connectNum: '232',
                        followResult: '无',
                        lastCalls: '2016-10-03 13:24',
                        remarks: '20天',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '华为',
                        ringNum: '3000',
                        connectNum: '232',
                        followResult: '无',
                        lastCalls: '2016-10-03 13:24',
                        remarks: '20天',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '华为',
                        ringNum: '3000',
                        connectNum: '232',
                        followResult: '无',
                        lastCalls: '2016-10-03 13:24',
                        remarks: '20天20天20天20天20天20天20天20天20天20天20天20天',
                    }
                ],//table信息
                tableDataRecord: [
                    {
                        style: '呼出',
                        state: '接通',
                        callDuration: '00:01:23 ',
                        callTime: '2016-10-03 13:24',
                        Name: '王铁锤',
                        remarks: '20天',
                    },
                    {
                        style: '呼出',
                        state: '接通',
                        callDuration: '00:01:23 ',
                        callTime: '2016-10-03 13:24',
                        Name: '王铁锤',
                        remarks: '20天',
                    },
                    {
                        style: '呼出',
                        state: '接通',
                        callDuration: '00:01:23 ',
                        callTime: '2016-10-03 13:24',
                        Name: '王铁锤',
                        remarks: '20天',
                    },
                    {
                        style: '呼出',
                        state: '接通',
                        callDuration: '00:01:23 ',
                        callTime: '2016-10-03 13:24',
                        Name: '王铁锤',
                        remarks: '20天',
                    }
                ],//table信息
                tableDataHistory: [
                    {
                        title: '呼出',
                        time: '接通',
                        style: '00:01:23 ',
                        operator: '2016-10-03 13:24',
                        description: '王铁锤',
                    },
                    {
                        title: '呼出',
                        time: '接通',
                        style: '00:01:23 ',
                        operator: '2016-10-03 13:24',
                        description: '王铁锤',
                    },
                    {
                        title: '呼出',
                        time: '接通',
                        style: '00:01:23 ',
                        operator: '2016-10-03 13:24',
                        description: '王铁锤',
                    },
                    {
                        title: '呼出',
                        time: '接通',
                        style: '00:01:23 ',
                        operator: '2016-10-03 13:24',
                        description: '王铁锤',
                    }
                ],//table信息
                tableDataPlan: [
                    {
                        planTitle: '呼出',
                        planTime: '接通',
                        returnTime: '00:01:23 ',
                        returnResult: '2016-10-03 13:24',
                        remarks: '王铁锤',
                        action: '动作',
                    },
                    {
                        planTitle: '呼出',
                        planTime: '接通',
                        returnTime: '00:01:23 ',
                        returnResult: '2016-10-03 13:24',
                        remarks: '王铁锤',
                        action: '动作',
                    },
                    {
                        planTitle: '呼出',
                        planTime: '接通',
                        returnTime: '00:01:23 ',
                        returnResult: '2016-10-03 13:24',
                        remarks: '王铁锤',
                        action: '动作',
                    },
                    {
                        planTitle: '呼出',
                        planTime: '接通',
                        returnTime: '00:01:23 ',
                        returnResult: '2016-10-03 13:24',
                        remarks: '王铁锤',
                        action: '动作',
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
            getInitData(){
                console.log("初始化数据")
            },//获取初始化数据
            goMain() {
                this.current = "main"
            },//回到主体
            search() {
                this.searchClientLoading=true

                setTimeout(()=>{
                    this.searchClientLoading=false
                },1000)
            },//去搜索(主体页)
            confirm(item, value) {
                this.step2.taskStyleModal = false
                this.ringDateManual.ringState='warning'
                this.ringDateManual.ringMsg='暂停自助外呼'
            },//确认
            cancel(item) {
                this.step2.taskStyleModal = false
            },//取消
            intoTask(index) {
                this.current = 'detail'
            },//进入任务
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
            newTask() {

            },//新建工单
            newPlan() {

            },//新建计划
            ring(item,type) {
                if(item=='manual' && type=='success'){
                    this.step2.taskStyleModal=true
                }
                if(item=='manual' && type=='warning'){
                    this.$Modal.confirm({
                        title: "要暂停自助外呼吗",
                        align: 'center',
                        okText:'确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.ringDateManual.ringState='success'
                            this.ringDateManual.ringMsg='开始自助外呼'
                        },
                        onCancel: () => {

                        }
                    });

                }

                if(item=='auto' && type=='success'){
                    this.$Modal.confirm({
                        title: "要暂停自动外呼吗",
                        align: 'center',
                        okText:'确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.ringDateAuto.ringState='warning'
                            this.ringDateAuto.ringMsg='暂停自动外呼'
                        },
                        onCancel: () => {

                        }
                    });


                }
                if(item=='auto' && type=='warning'){
                    this.$Modal.confirm({
                        title: "要开启自动外呼吗",
                        align: 'center',
                        okText:'确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.ringDateAuto.ringState='success'
                            this.ringDateAuto.ringMsg='开始自动外呼'
                        },
                        onCancel: () => {

                        }
                    });

                }


                // if (this.ringDate.ringState == 'success') {
                //     this.ringDate.ringState = 'warning'
                //     this.ringDate.ringMsg = '暂停自动外呼'
                // } else {
                //     this.ringDate.ringState = 'success'
                //     this.ringDate.ringMsg = '开始自动外呼'
                // }

            },//外呼电话
            createTask() {
                this.$router.push('/clkm/createTask')
            },//创建外呼任务
            changePage1() {

            },//改变内容主体区页码
            outPutCurTask() {

            }//导出数据
        },
        computed: {
            // list () {
            //   return this.$store.state.clkm.list
            // }
        }
    }
</script>
<style lang="stylus">
    /*.vertical-right-modal*/
    /*.ivu-modal*/
    /*position absolute*/
    /*right 20px*/
    /*top   20px*/

</style>