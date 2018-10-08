<template>
    <div class="page-wrapper">
        <Card style="height:100%;">
            <div>
                <Form :model="formItem1" :label-width="80">

                    <Row :gutter="10">
                        <Col span="6">
                        <FormItem label="呼叫时间">
                            <DatePicker type="datetimerange" :value="formItem1.ringTime" format="yyyy-MM-dd HH:mm"
                                        placeholder="选择呼叫时间范围" style="width: 259px"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="4">
                        <Select v-model="formItem1.lossState">
                            <Option value="1">全部呼损状态</Option>
                            <Option value="2">TVR中放弃</Option>
                            <Option value="3">队列中放弃</Option>
                            <Option value="4">客服未接听</Option>
                            <Option value="5">呼出客户未接听数</Option>
                            <Option value="6">呼出客户拒听数</Option>
                            <Option value="7">呼出客户空号数</Option>
                            <Option value="8">呼出客户关机数</Option>
                            <Option value="9">呼出客户停机数</Option>
                            <Option value="10">呼出暂时无法接听数</Option>
                            <Option value="11">呼出正在通话数</Option>
                        </Select>
                        </Col>
                        <Col span="4">
                        <Input v-model="formItem1.search" placeholder="请输入任务名称"></Input>
                        </Col>
                        <Col span="2">
                        <Button type="primary" icon="ios-search" :loading="searchLoading" @click="search">搜索</Button>
                        </Col>
                        <Col span="3">
                        <Button type="primary" icon="md-add" @click="createTask">创建外呼任务</Button>
                        </Col>
                        <Col span="3">
                        <Button type="success" icon="md-archive" :loading="exportDataLoading"   @click="outPutCurTask">导出当前数据</Button>
                        </Col>
                    </Row>
                </Form>
                <Table height="600" :columns="columns1" :data="tableData1"></Table>
                <div>
                    <div style="margin: 10px 0;float: right;">
                        <Page :total="page1.total"
                              :page-size="40"
                              show-total
                              show-elevator
                              show-sizer
                              :current="1"
                              @on-change="changePage1"></Page>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import Clipboard from 'clipboard'

    export default {
        name: 'CheckList',
        data() {
            return {
                searchLoading:false,//搜索任务按钮的状态
                exportDataLoading:false,//导出任务数据按钮的状态
                formItem1: {
                    ringTime: '',//呼叫时间
                    lossState: '1',//呼损状态
                    search: '',//搜索内容
                },
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '呼叫号码',
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
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        icon: 'md-copy'
                                    },
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
                        title: '客户名称',
                        key: 'clientName'
                    },
                    {
                        title: '呼叫时间',
                        key: 'ringTime'
                    },
                    {
                        title: '接待客服',
                        key: 'customService'
                    },
                    {
                        title: '呼损状态',
                        key: 'lossState'
                    },
                    {
                        title: '数据来源',
                        key: 'dataIncome'
                    },
                ],//table渲染信息
                tableData1: [
                    {
                        telNumber: '13273710082',
                        clientName: '王铁柱',
                        ringTime: '2016-10-03 13:24',
                        customService: '2018-王铁锤',
                        lossState: '呼入队列中放弃',
                        dataIncome: '用户呼入',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '王铁柱',
                        ringTime: '2016-10-03 13:24',
                        customService: '2018-王铁锤',
                        lossState: '呼入队列中放弃',
                        dataIncome: '用户呼入',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '王铁柱',
                        ringTime: '2016-10-03 13:24',
                        customService: '2018-王铁锤',
                        lossState: '呼入队列中放弃',
                        dataIncome: '用户呼入',
                    },
                    {
                        telNumber: '13273710082',
                        clientName: '王铁柱',
                        ringTime: '2016-10-03 13:24',
                        customService: '2018-王铁锤',
                        lossState: '呼入队列中放弃',
                        dataIncome: '用户呼入',
                    }
                ],//table信息
                page1: {
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
            search() {
                this.searchLoading=true

                setTimeout(()=>{
                    this.searchLoading=false
                },1000)
            },//去搜索(主体页)
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
            createTask() {
                this.$router.push('/clkm/createTask')
            },//创建外呼任务
            changePage1() {

            },//改变内容主体区页码
            outPutCurTask() {
                this.exportDataLoading=true

                setTimeout(()=>{
                    this.$Message.info('数据导出成功')
                    this.exportDataLoading=false
                },1000)
            }//导出数据
        },
        computed: {
            // list () {
            //   return this.$store.state.clkm.list
            // }
        }
    }
</script>
