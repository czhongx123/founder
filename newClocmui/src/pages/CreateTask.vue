<template>
    <div class="page-wrapper">
        <Card style="height:100%;">
            <div style="padding:0 200px">
                <div style="margin: 30px 0">
                    <Steps :current="current">
                        <Step title="任务设置"></Step>
                        <Step title="数据导入"></Step>
                        <Step title="任务分配"></Step>
                    </Steps>
                </div>
                <Form :model="formItemStep1" ref="formItemStep1" :label-width="80" v-show="current==0" :rules="ruleFormItemStep1">
                    <FormItem label="任务名称" prop="Name">
                        <Row>
                            <Col span="10" >
                                <Input v-model="formItemStep1.Name"  placeholder="请输入任务名称"></Input>
                            </Col>
                            <!--<Col span="11">-->
                                <!--<span style="padding-left: 20px">任务名不得为空</span>-->
                            <!--</Col>-->
                        </Row>
                    </FormItem>
                        <FormItem label="外呼模式">
                        <Row>
                            <Col span="10">
                                <RadioGroup v-model="formItemStep1.moduleType" type="button" size="small">
                                    <Radio label="手动"></Radio>
                                    <Radio label="自动"></Radio>
                                </RadioGroup>
                            </Col>
                            <Col span="14">
                                <span style="padding-left: 20px">开启自动后系统自动外呼，客户接通后转接到坐席</span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="自动倍率" v-show="formItemStep1.moduleType=='自动'" prop="autoRate">
                        <Row>
                            <Col span="10">
                                <!--<Input v-model="formItemStep1.autoRate" placeholder="请输入0.01~2.00之间的数值"></Input>-->
                            <Slider v-model="formItemStep1.autoRate" :min="0.1" :max="2.0" :step="0.1"></Slider>
                            </Col>
                            <Col span="14">
                                <span style="padding-left: 20px">系统自动外呼数=倍率值*当前可用坐席数</span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="整理时间">
                        <Row>
                            <Col span="6">
                                <Select v-model="formItemStep1.select">
                                    <Option value="1">18</Option>
                                    <Option value="2">20</Option>
                                    <Option value="3">30</Option>
                                    <Option value="4">5</Option>
                                    <Option value="5">6</Option>
                                    <Option value="6">7</Option>
                                    <Option value="7">8</Option>
                                    <Option value="8">9</Option>
                                </Select>
                            </Col>
                            <Col span="4">
                                <span style="padding-left: 20px">秒</span>
                            </Col>
                            <Col span="14">
                                <span style="padding-left: 20px">任务生成后可根据需要在任务详情页面调整</span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="任务描述" prop="textarea">
                        <Row>
                            <Col span="10">
                                <Input v-model="formItemStep1.textarea" type="textarea"
                                       :autosize="{minRows: 3,maxRows: 3}"
                                       placeholder="选择一二班组进行外呼执行"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="执行时间">
                        <Row>
                            <Col span="7">
                                <RadioGroup v-model="formItemStep1.doStyle">
                                    <Radio label="1">永久</Radio>
                                    <Radio label="2">自定义</Radio>
                                </RadioGroup>
                            </Col>
                            <Col span="7" v-show="formItemStep1.doStyle=='2'">
                                <DatePicker v-model="formItemStep1.doTime" value="" format="yyyy/MM/dd" type="daterange"
                                            placement="bottom-end"
                                            placeholder="选择时间区间" style="width: 200px"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="号码隐藏">
                        <Row>
                            <RadioGroup v-model="formItemStep1.hideStyle">
                                <Radio label="1">不隐藏</Radio>
                                <Radio label="2">隐藏中间四位</Radio>
                                <Radio label="3">隐藏最后四位</Radio>
                            </RadioGroup>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button :loading="nextLoading" type="primary" size="large" @click="next('formItemStep1')">确认创建，下一步导入数据</Button>
                    </FormItem>
                </Form>
                <Form :model="formItemStep2" :label-width="100" v-show="current==1">
                    <p class="p1">温馨提醒：分派数量不可大于5万条</p>
                    <Row style="margin: 20px 0">
                        <Col span="8">&nbsp;</Col>
                        <Col span="8">
                            <Upload ref=createTaskUpload action="//jsonplaceholder.typicode.com/posts/"
                                    :on-progress="handleProgress" :on-success="handleSuccess" :on-remove="handleRemove">
                                <Button  size="large" :loading="chooseFileLoading" >选择文件</Button>
                            </Upload>
                        </Col>
                        <Col span="8">&nbsp;</Col>
                    </Row>
                    <Row v-if="step2.isLoad">
                        <Col class="demo-spin-col" span="18" style="margin: 10px 0">
                            <Spin fix>
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <span style="padding-left: 10px">正在导入客户资料请不要关闭</span>
                            </Spin>
                        </Col>
                    </Row>
                    <p style="text-align: center">请下载外呼清单文档模板，根据导入资料进行上传。<a href="" download="文件名.txt">点击下载《外呼清单模板》</a>
                    </p>
                    <FormItem label="号码是否排重">
                        <Row>
                            <Col span="10">
                                <Select v-model="formItemStep2.select">
                                    <Option value="1">任务间去重，校验所有历史的外呼记录数据进行重排</Option>
                                    <Option value="2">不去重 无论任务间，任务中，均不排重</Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="黑名单去重">
                        <Row>
                            <Col span="10">
                                <i-switch v-model="formItemStep2.switch">
                                    <span slot="open">开</span>
                                    <span slot="close">关</span>
                                </i-switch>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button size="large" style="margin-right: 30px" @click="goStep1">返回任务设置</Button>
                        <Button type="primary" size="large" :loading="confirmDataLoading" @click="submit" :disabled="step2.isLoadOK">确定数据</Button>
                    </FormItem>
                </Form>
                <Form :model="formItemStep3" :label-width="80" v-show="current==2">
                    <p class="p1">导入结果：成功上传{{step3.loadSuccess}}条，错误{{step3.loadError}}条，重复{{step3.loadAgain}}条，格式不正确{{step3.loadStyleError}}条，黑名单剔除{{step3.loadBackList}}条</p>
                    <p class="p1">如结果无异常请进行任务分配</p>
                    <FormItem label="处理坐席">
                        <Row>
                            <Col span="10">
                                <RadioGroup v-model="formItemStep3.moduleType" size="small" @on-change="changeModuleType(formItemStep3.moduleType)">
                                    <Radio label="1">指定坐席</Radio>
                                    <Radio label="2">指定客服组</Radio>
                                    <Radio label="3">指定客服组内坐席</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    </FormItem>

                 

                    <Row>
                       <div id="transfer">
                           <div class="tra_left">
                               <div class="tra_left_head">
                                   <Checkbox v-model="leftSelectAll" @on-change="changeLeftAll"></Checkbox>
                                   <p>{{headerLeftCon}}</p>
                                   <p>{{headerLeftCount}}</p>
                               </div>
                               <div style="width:90%;margin:0 auto">
                                   <Input v-model="leftSearch" size="small" icon="ios-search" :placeholder="searchPlaceholder"></Input>
                               </div>
                               <div class="tra_tab" v-show="formItemStep3.moduleType==1">
                                    <span :class=" leftTabIndex==1 ? 'tra_tab_cur' :''"  style="margin:0 20px;cursor:pointer" @click="leftChangeTab(1)">按工号排序</span>
                                    <span :class=" leftTabIndex==2 ? 'tra_tab_cur' :''" style="cursor:pointer" @click="leftChangeTab(2)">按姓名排序</span>
                               </div>

                                <!--没搜索-->
                                <div class="tra_conbox" v-show="leftSearchEmpty">
                                    <div class="tra_sigle" v-for="item in initData" v-show="formItemStep3.moduleType!=3">

                                        <Checkbox v-model="item.select" v-show="item.show"></Checkbox>
                                    
                                        <p :class="[{'pColor':item.isSearch}, 'tra_sigle_center']">{{item.key}}</p>
                                    </div>

                                    <div v-show="formItemStep3.moduleType==3" v-for="item in initData">
                                        <div class="tra_sigle" style="border-top:1px solid #DDDEE1;border-bottom:1px solid #DDDEE1;" >

                                            <Checkbox v-model="item.select" v-show="item.show"  @on-change="changeLeftSome(item.key)"></Checkbox>
                                            <p class="tra_sigle_center">{{item.key}}</p>
                                            <p style="cursor:pointer" @click="spreadList(item.key,'initData')">
                                                <Icon type="android-arrow-dropup" v-show="!item.spread"></Icon>
                                                <Icon type="android-arrow-dropdown"  v-show="item.spread"></Icon>
                                            </p>
                                        </div>
                                        <div class="tra_sigle" v-show="!item.spread" v-for="itm in item.agentList">

                                            <Checkbox v-model="itm.select" v-show="itm.show"></Checkbox>
                                            <p :class="[{'pColor':itm.isSearch}, 'tra_sigle_center']">{{itm.key}}</p>
                                            
                                        </div>
                                    
                                    </div>    
                                </div>
                                <!--有搜索-->
                                <div class="tra_conbox" v-show="!leftSearchEmpty">
                                    <div class="tra_sigle" v-for="item in searchLeftData" v-show="formItemStep3.moduleType!=3">

                                        <Checkbox v-model="item.select" v-show="item.show"></Checkbox>
                                    
                                        <p :class="[{'pColor':item.isSearch}, 'tra_sigle_center']">{{item.key}}</p>
                                    </div>

                                    <div v-show="formItemStep3.moduleType==3" v-for="item in searchLeftData">
                                        <div class="tra_sigle" style="border-top:1px solid #DDDEE1;border-bottom:1px solid #DDDEE1;" >

                                            <Checkbox v-model="item.select" v-show="item.show"  @on-change="changeLeftSome(item.key)"></Checkbox>
                                            <p class="tra_sigle_center">{{item.key}}</p>
                                            <p style="cursor:pointer" @click="spreadList(item.key,'searchLeftData')">
                                                <Icon type="android-arrow-dropup" v-show="!item.spread"></Icon>
                                                <Icon type="android-arrow-dropdown"  v-show="item.spread"></Icon>
                                            </p>
                                        </div>
                                        <div class="tra_sigle" v-show="!item.spread" v-for="itm in item.agentList">

                                            <Checkbox v-model="itm.select" v-show="itm.show"></Checkbox>
                                            <p :class="[{'pColor':itm.isSearch}, 'tra_sigle_center']">{{itm.key}}</p>
                                            
                                        </div>
                                    
                                    </div>    
                                </div>
                            



                           </div>
                            <div class="tra_center">
                                <Button type="primary" @click="toLeft" :disabled="toSelectLeft" size="small" icon="chevron-left" style="margin-bottom:20px;width:24px;height:24px"></Button>
                                <Button type="primary" @click="toRight" :disabled="toSelectRight" size="small" icon="chevron-right" style="width:24px;height:24px"></Button>
                            </div>
                            <div class="tra_right">
                               <div class="tra_right_head">
                                   <Checkbox v-model="rightSelectAll" @on-change="changeRightAll"></Checkbox>
                                   <p>{{headerRightCon}}</p>
                                   <p>{{headerRightCount}}</p>
                               </div>
                               <div style="width:90%;margin:0 auto">
                                   <Input v-model="rightSearch" size="small" icon="ios-search" :placeholder="searchPlaceholder"></Input>
                               </div>
                               <div class="tra_tab" v-show="formItemStep3.moduleType==1">
                                    <span :class=" rightTabIndex==1 ? 'tra_tab_cur' :''"  style="margin:0 20px;cursor:pointer" @click="rightChangeTab(1)">按工号排序</span>
                                    <span :class=" rightTabIndex==2 ? 'tra_tab_cur' :''" style="cursor:pointer" @click="rightChangeTab(2)">按姓名排序</span>
                               </div>

                                 <!--无搜索-->
                               <div class="tra_conbox"  v-show="rightSearchEmpty">
                                    <div class="tra_sigle" v-for="item in targetData" v-show="formItemStep3.moduleType!=3">
                                        <Checkbox v-model="item.select" v-show="item.show"></Checkbox>
                                        <p :class="[{'pColor':item.isSearch}, 'tra_sigle_center']">{{item.key}}</p>
                                    </div>
                                  
                                    <div v-show="formItemStep3.moduleType==3" v-for="item in targetData">
                                        <div class="tra_sigle" style="border-top:1px solid #DDDEE1;border-bottom:1px solid #DDDEE1;" >

                                            <Checkbox v-model="item.select" v-show="item.show"  @on-change="changeRightSome(item.key)"></Checkbox>
                                            <p class="tra_sigle_center">{{item.key}}</p>
                                            <p style="cursor:pointer" @click="spreadList(item.key,'targetData')">
                                                <Icon type="android-arrow-dropup" v-show="!item.spread"></Icon>
                                                <Icon type="android-arrow-dropdown"  v-show="item.spread"></Icon>
                                            </p>
                                        </div>
                                        <div class="tra_sigle" v-show="!item.spread" v-for="itm in item.agentList">

                                            <Checkbox v-model="itm.select" v-show="itm.show"></Checkbox>
                                            <p :class="[{'pColor': itm.isSearch}, 'tra_sigle_center']">{{itm.key}}</p>
                                            
                                        </div>
                                    
                                    </div>                                 
                                </div>
                                <!--有搜索-->
                                <div class="tra_conbox"  v-show="!rightSearchEmpty">
                                    <div class="tra_sigle" v-for="item in searchRightData" v-show="formItemStep3.moduleType!=3">
                                        <Checkbox v-model="item.select" v-show="item.show"></Checkbox>
                                        <p :class="[{'pColor':item.isSearch}, 'tra_sigle_center']">{{item.key}}</p>
                                    </div>
                                  
                                    <div v-show="formItemStep3.moduleType==3" v-for="item in searchRightData">
                                        <div class="tra_sigle" style="border-top:1px solid #DDDEE1;border-bottom:1px solid #DDDEE1;" >

                                            <Checkbox v-model="item.select" v-show="item.show"  @on-change="changeRightSome(item.key)"></Checkbox>
                                            <p class="tra_sigle_center">{{item.key}}</p>
                                            <p style="cursor:pointer" @click="spreadList(item.key,'searchRightData')">
                                                <Icon type="android-arrow-dropup" v-show="!item.spread"></Icon>
                                                <Icon type="android-arrow-dropdown"  v-show="item.spread"></Icon>
                                            </p>
                                        </div>
                                        <div class="tra_sigle" v-show="!item.spread" v-for="itm in item.agentList">

                                            <Checkbox v-model="itm.select" v-show="itm.show"></Checkbox>
                                            <p :class="[{'pColor': itm.isSearch}, 'tra_sigle_center']">{{itm.key}}</p>
                                            
                                        </div>
                                    
                                    </div>                                 
                                </div>
                           </div>
                        </div> 
                    </Row>












                    <FormItem>
                        <Button size="large" style="margin-right: 30px" @click="goStep2">返回导入数据</Button>
                        <Button type="primary" size="large" :loading="finishTaskLoading" @click="doneTask">完成任务分配</Button>
                    </FormItem>
                </Form>
                <div v-show="current==3">
                    <div style="text-align: center">
                        <p style="margin:100px 0 50px">外呼任务创建成功，点击确认返回任务管理页面</p>
                        <Button type="primary" icon="md-checkmark" size="large" @click="createTaskSuccess">确定</Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    // import Caspanel from "iview/src/components/cascader/caspanel";
    import $ from 'jquery'
    import tool from '@/assets/js/tool.js'
    export default {
        name: 'CreateTask',
        // components: {Caspanel},
        data() {
            var validateName=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('任务名不能为空'))
                }
                if (value.length >20) {
                    callback(new Error('任务名不能超过二十个字符'))
                }
                let len=this.Trim(value,'is_global').length
                if(len<1){
                    callback(new Error('任务名不能为空'))
                }
                callback()
            };//验证任务名
            // var validateautoRate=(rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('倍率不能为空'))
            //     }
            //     if (value>2 || value<0.01 ) {
            //         callback(new Error('倍率应在0.01至2之间'))
            //     }
            //     let len=this.Trim(value,'is_global').length
            //     if(len!=3){
            //         callback(new Error('倍率应设置为3个字符'))
            //     }
            //     callback()
            // };//验证倍率
            var validatetextarea=(rule, value, callback) => {
                let len=this.Trim(value,'is_global').length
                if(len>100 || len<1){
                    callback(new Error('任务描述应在1~100字符内'))
                }
                callback()
            };//验证文本域描述

            return {
                leftSelectAll:false,
                rightSelectAll:false,
                leftSearch:'',
                rightSearch:'',
                leftTabIndex:2,//tab切换
                rightTabIndex:2,//tab切换
                initData:[],//穿梭框左侧数据
                initAllData:[],//穿梭框左侧所有数据
                searchLeftData:[],//左侧搜索数据
                searchRightData:[],//右侧搜索数据
                targetData:[],//穿梭框右侧数据
                dataAgent:[],//坐席列表
                dataGroup:[],//群组列表
                dataAgentOfGroup:[],//班组内坐席
                headerLeftCon:'坐席列表',
                headerRightCon:'已获坐席列表',
                searchPlaceholder:'搜索成员',
                leftSearchEmpty:true,//左边是否在搜索，true表示没搜索
                rightSearchEmpty:true,//右边是否在搜索



                startTimeOptions: {
                    disabledDate (date) {
                        // console.log(date)
                        // console.log(date.valueOf())
                        // console.log(Date.now())
                        return  date.valueOf() < Date.now() - 86400000;
                    }
                }, //开始日期设置
                endTimeOptions: {
                    disabledDate (date) {
                        // console.log(date)
                        // console.log(date.valueOf())
                        // console.log(Date.now())
                        return  date.valueOf() < Date.now() - 86400000;
                    }
                }, //结束日期设置
                starttime: '', //开始日期model
                endtime: '',//结束日期model



                current:2,//当前step
                uploadList: [],
                nextLoading:false,//下一步按钮的状态
                confirmDataLoading:false,//确定数据按钮的状态
                chooseFileLoading:false,//选择文件按钮的状态
                finishTaskLoading:false,//完成任务分配按钮的状态

                step2: {
                    isLoad: false,//文件是否正在上传
                    isLoadOK: true//文件是否已经上传
                },//第二步信息
                step3: {
                    loadSuccess:'12320',//成功上传数
                    loadError:'2',//错误数
                    loadAgain:'10',//重复数
                    loadStyleError:'3',//格式不正确数
                    loadBackList:'5',//黑名单数
                    member:'1',//已分配成员
                    memberGroup:'2',//已分配客服组
                    data: [],//穿梭框数据
                    targetKeys:[],//穿梭框右侧任务
                    titles:["全部成员","选中成员"],//穿梭框列表
                },//第三步信息
                formItemStep1: {
                    Name: '',//任务名称
                    moduleType: '手动',//外呼模式
                    autoRate:1.5 ,//自动倍率
                    select: '2',//整理时间
                    doStyle: '1',//执行时间的方式
                    doTime: '',//执行时间
                    hideStyle: '1',//号码隐藏方式
                    textarea: ''//任务描述
                },
                ruleFormItemStep1:{
                    Name:[{ validator: validateName, trigger: 'blur',required:true }],
                    // autoRate:[{ validator: validateautoRate, trigger: 'blur',type:'string'}],
                    textarea:[{ validator: validatetextarea, trigger: 'blur',type:'string' }]
                },
                formItemStep2: {
                    select: '1',//号码排重
                    switch: true,//黑名单去重
                },
                formItemStep3: {
                    moduleType: '1',//指定坐席
                    Name: '',//搜索坐席
                    taskName: '',//指定客服组
                },
                num:''
            }
        },
        created(){
           
        },
        mounted(){
            this.getAgentList();
            // console.log(tool.aa())
            //  console.log(tool.pySegSort(['撒的','十大发发']),'飞洒')
           
            // console.log(tool.pySegSort(['撒的','十大发发']),'飞洒')

            var arr=['i','u','v','I','U','V','ii','uu','vv']
            console.log(this.pySort(arr),'111')
           
        },
        methods: {
            toLeft(){
                if(this.formItemStep3.moduleType!=3){
                  
                    
                    if(this.formItemStep3.moduleType==1){
                        if(this.leftTabIndex==2){ 
                            if(this.RightTabIndex==2){
                                //左边按姓名，右边按姓名排序
                                if(this.rightSearch==''){
                                    this.searchRightData=this.targetData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchRightData,'searchRightData')
                                    for(var i=0;i<this.searchRightData.length;i++){
                                        if(this.searchRightData[i].select){
                                            arr.push(this.searchRightData[i])
                                        }else{
                                            arr1.push(this.searchRightData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }

                                    this.initData=this.reSortData(this.initData.concat(arr))
                                  
                                    this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                                    this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')

                                for(var m=0;m<this.targetData.length;m++){
                                    for(var n=0;n<this.initData.length;n++){
                                        if(this.targetData[m]!=undefined){
                                            if(this.targetData[m].key==this.initData[n].key){
                                                    this.targetData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.targetData=this.reSortData(this.targetData)
                                // this.initData=this.reSortData(arr2)
                                this.searchRightData=this.reSortData(arr1)
                            
                            }else{
                                //左边按姓名，右边按工号排序
                                    if(this.rightSearch==''){
                                    this.searchRightData=this.targetData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchRightData,'12searchRightData')
                                    for(var i=0;i<this.searchRightData.length;i++){
                                        if(this.searchRightData[i].select){
                                            arr.push(this.searchRightData[i])
                                        }else{
                                            arr1.push(this.searchRightData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }

                                    this.initData=this.reSortData(this.initData.concat(arr))
                                  
                                    this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                                    this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')

                                    for(var m=0;m<this.targetData.length;m++){
                                    for(var n=0;n<this.initData.length;n++){
                                        if(this.targetData[m]!=undefined){
                                            if(this.targetData[m].key==this.initData[n].key){
                                                    this.targetData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                               
                                // this.initData=this.reSortData(arr2)
                                this.initData=this.reSortData(this.initData)
                                this.searchRightData=arr1                                               
                            }             
                        
                        }else{


                            if(this.RightTabIndex==2){
                                //左边按公号，右边按姓名
                                // this.initData=this.reSortData(arr2)
                                // this.searchLeftData=this.reSortData(arr2)
                                if(this.rightSearch==''){
                                    this.searchRightData=this.targetData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchRightData,'searchRightData')
                                    for(var i=0;i<this.searchRightData.length;i++){
                                        if(this.searchRightData[i].select){
                                            arr.push(this.searchRightData[i])
                                        }else{
                                            arr1.push(this.searchRightData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }
                                this.initData=this.reSortData(this.initData.concat(arr))
                                this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')
                                 for(var m=0;m<this.targetData.length;m++){
                                    for(var n=0;n<this.initData.length;n++){
                                        if(this.targetData[m]!=undefined){
                                            if(this.targetData[m].key==this.initData[n].key){
                                                    this.targetData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.targetData=this.reSortData(this.targetData)
                                // this.searchLeftData=this.reSortData(arr1)
                                this.searchRightData=arr1
                                
                            }else{
                                //左右均按工号排序
                                if(this.rightSearch==''){
                                    this.searchRightData=this.targetData
                                }
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    var arr2=[]
                                    console.log(this.searchRightData,'初始searchRightData')
                                    for(var i=0;i<this.searchRightData.length;i++){
                                        if(this.searchRightData[i].select){
                                            arr.push(this.searchRightData[i])
                                        }else{
                                            arr1.push(this.searchRightData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }
                                    

                                
                              this.initData=this.reSortData(this.initData.concat(arr))
                              this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')
                              
                                for(var m=0;m<this.targetData.length;m++){
                                    for(var n=0;n<this.initData.length;n++){
                                        if(this.targetData[m]!=undefined){
                                            if(this.targetData[m].key==this.initData[n].key){
                                                    this.targetData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.searchRightData=arr1.sort(this.defaultSort('number'))
                            
                            }
                        }
                       
                    }
                    if(this.formItemStep3.moduleType==2){
                        if(this.rightSearch==''){
                            this.searchRightData=this.targetData
                        }
                        var arr=[]//向右发送的数据
                        var arr1=[]//左边剩余的数据
                        var arr2=[]
                        console.log(this.searchRightData,this.targetData,'2searchRightData')
                        for(var i=0;i<this.searchRightData.length;i++){
                            if(this.searchRightData[i].select){
                                arr.push(this.searchRightData[i])
                            }else{
                                arr1.push(this.searchRightData[i]) 
                            }
                        }
                        for(var j=0;j<arr.length;j++){
                            arr[j].select=false
                            arr[j].isSearch=false
                        }
                        console.log(this.initData,'初始数据1')

                        this.initData=(this.initData.concat(arr)).sort(this.defaultSort('defaultNum'));
                         console.log(this.initData,'初始数据2')
                        var arr3=[]
                        for(var m=0;m<this.targetData.length;m++){
                            for(var n=0;n<this.initData.length;n++){
                               if(this.targetData[m]!=undefined){
                                   if(this.targetData[m].key==this.initData[n].key){
                                        this.targetData.splice(m,1)                                  
                                    }
                               }
                                
                            }
                        
                        }                  
                        this.searchRightData=arr1.sort(this.defaultSort('defaultNum'))
                    }
                    
                }else{

                    var arr=this.searchRightData
                    var arr1=[]
                    var obj1={}
                    var arr2=[]
                    var obj2={}
                    var arr3=[]
                    var obj3={}
                    var arr4=[]
                    var obj4={}
                    for(var i=0;i<arr.length;i++){
                        for(var j=0;j<arr[i].agentList.length;j++){
                            if(arr[i].agentList[j].select){
                                obj1.groupId=arr[i].groupId
                                obj1.groupName=arr[i].groupName
                                obj1.groupNum=arr[i].groupNum
                                obj1.key=arr[i].key
                                obj1.select=false
                                obj1.isSearch=false
                                obj1.show=arr[i].show
                                obj1.spread=arr[i].spread
                                obj1.agentList=[]

                                obj2.agentNum=arr[i].agentList[j].agentNum
                                obj2.groupOf=arr[i].agentList[j].groupOf
                                obj2.id=arr[i].agentList[j].id
                                obj2.key=arr[i].agentList[j].key
                                obj2.loginId=arr[i].agentList[j].loginId
                                obj2.select=false
                                obj2.isSearch=false
                                obj2.show=arr[i].agentList[j].show
                                arr2.push(obj2)
                                obj1.agentList=arr2
                                obj2={}                               
                            }else{
                                obj3.groupId=arr[i].groupId
                                obj3.groupName=arr[i].groupName
                                obj3.groupNum=arr[i].groupNum
                                obj3.key=arr[i].key
                                obj3.select=false
                                obj3.isSearch=false
                                obj3.show=arr[i].show
                                obj3.spread=arr[i].spread
                                obj3.agentList=[]

                                obj4.agentNum=arr[i].agentList[j].agentNum
                                obj4.groupOf=arr[i].agentList[j].groupOf
                                obj4.id=arr[i].agentList[j].id
                                obj4.key=arr[i].agentList[j].key
                                obj4.loginId=arr[i].agentList[j].loginId
                                obj4.select=false
                                obj4.isSearch=false
                                obj4.show=arr[i].agentList[j].show
                                arr4.push(obj4)
                                obj3.agentList=arr4
                                obj4={}      


                            }
                        
                        }
                        if(JSON.stringify(obj1)!='{}'){
                            arr1.push(obj1)
                        }
                        if(JSON.stringify(obj3)!='{}'){
                            arr3.push(obj3)
                        }                     
                        obj1={}
                        arr2=[]
                        obj3={}
                        arr4=[]
                    }

                    console.log(arr1,'arr1')//目标值
                    console.log(arr3,'arr3')//原始值
                    this.initData=this.agentGroupTargetConcatSort(arr1,'initData')
                    console.log(this.initData,'this.initData')
                    this.searchLeftData=this.agentGroupTargetConcatSort(arr1,'initData')
                    console.log(this.searchLeftData,'this.searchLeftData')
                    this.targetData=arr3
                    this.searchRightData=arr3
                }

            },//向左传数据
            toRight(){
                if(this.formItemStep3.moduleType!=3){     
                    if(this.formItemStep3.moduleType==1){
                        if(this.rightTabIndex==2){ 
                            if(this.leftTabIndex==2){
                                //左边按姓名，右边按姓名排序
                                if(this.leftSearch==''){
                                    this.searchLeftData=this.initData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchLeftData,'初始searchLeftData')
                                    for(var i=0;i<this.searchLeftData.length;i++){
                                        if(this.searchLeftData[i].select){
                                            arr.push(this.searchLeftData[i])
                                        }else{
                                            arr1.push(this.searchLeftData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }

                                    this.targetData=this.reSortData(this.targetData.concat(arr))
                                  
                                    this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')
                                    this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')

                                for(var m=0;m<this.initData.length;m++){
                                    for(var n=0;n<this.targetData.length;n++){
                                        if(this.initData[m]!=undefined){
                                            if(this.initData[m].key==this.targetData[n].key){
                                                    this.initData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.initData=this.reSortData(this.initData)
                                this.targetData=this.reSortData(this.targetData.concat(arr))
                                // this.initData=this.reSortData(arr2)
                                this.searchLeftData=arr1
                            
                            }else{
                                //左边按工号，右边按姓名排序
                                if(this.leftSearch==''){
                                    this.searchLeftData=this.initData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchLeftData,'初始searchLeftData')
                                    for(var i=0;i<this.searchLeftData.length;i++){
                                        if(this.searchLeftData[i].select){
                                            arr.push(this.searchLeftData[i])
                                        }else{
                                            arr1.push(this.searchLeftData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }

                                    this.targetData=this.reSortData(this.targetData.concat(arr))
                                  
                                    this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')
                                    this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')

                                    for(var m=0;m<this.initData.length;m++){
                                    for(var n=0;n<this.targetData.length;n++){
                                        if(this.initData[m]!=undefined){
                                            if(this.initData[m].key==this.targetData[n].key){
                                                    this.initData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                               
                                // this.initData=this.reSortData(arr2)
                                this.targetData=this.reSortData(this.targetData)
                                this.searchLeftData=arr1                                               
                            }             
                        
                        }else{


                            if(this.leftTabIndex==2){
                                // this.initData=this.reSortData(arr2)
                                // this.searchLeftData=this.reSortData(arr2)
                                if(this.leftSearch==''){
                                    this.searchLeftData=this.initData
                                }
                                    
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    console.log(this.searchLeftData,'初始searchLeftData')
                                    for(var i=0;i<this.searchLeftData.length;i++){
                                        if(this.searchLeftData[i].select){
                                            arr.push(this.searchLeftData[i])
                                        }else{
                                            arr1.push(this.searchLeftData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }
 
                                //左边按姓名，右边按工号排序
                                this.targetData=this.reSortData(this.targetData.concat(arr))
                                this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                                 for(var m=0;m<this.initData.length;m++){
                                    for(var n=0;n<this.targetData.length;n++){
                                        if(this.initData[m]!=undefined){
                                            if(this.initData[m].key==this.targetData[n].key){
                                                    this.initData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.initData=this.reSortData(this.initData)
                                // this.searchLeftData=this.reSortData(arr1)
                                this.searchLeftData=arr1
                                
                            }else{
                                if(this.leftSearch==''){
                                    this.searchLeftData=this.initData
                                }
                                    var arr=[]//向右发送的数据
                                    var arr1=[]//左边剩余的数据
                                    var arr2=[]
                                    console.log(this.searchLeftData,'初始searchLeftData')
                                    for(var i=0;i<this.searchLeftData.length;i++){
                                        if(this.searchLeftData[i].select){
                                            arr.push(this.searchLeftData[i])
                                        }else{
                                            arr1.push(this.searchLeftData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }
                                    

                                //左右均按工号排序
                              this.targetData=this.reSortData(this.targetData.concat(arr))
                              this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                              console.log(this.initData,this.targetData)
                                for(var m=0;m<this.initData.length;m++){
                                    for(var n=0;n<this.targetData.length;n++){
                                        if(this.initData[m]!=undefined){
                                            if(this.initData[m].key==this.targetData[n].key){
                                                    this.initData.splice(m,1)                                  
                                                }
                                        }
                                        
                                    }
                                
                                }
                                this.searchLeftData=arr1.sort(this.defaultSort('number'))
                            
                            }
                        }
                       
                    }
                    if(this.formItemStep3.moduleType==2){
                        if(this.leftSearch==''){
                            this.searchLeftData=this.initData
                        }
                        var arr=[]//向右发送的数据
                        var arr1=[]//左边剩余的数据
                        var arr2=[]
                                    console.log(this.searchLeftData,'初始searchLeftData')
                                    for(var i=0;i<this.searchLeftData.length;i++){
                                        if(this.searchLeftData[i].select){
                                            arr.push(this.searchLeftData[i])
                                        }else{
                                            arr1.push(this.searchLeftData[i]) 
                                        }
                                    }
                                    for(var j=0;j<arr.length;j++){
                                        arr[j].select=false
                                        arr[j].isSearch=false
                                    }


                        this.targetData=(this.targetData.concat(arr)).sort(this.defaultSort('defaultNum'));
                        var arr3=[]
                        for(var m=0;m<this.initData.length;m++){
                            for(var n=0;n<this.targetData.length;n++){
                               if(this.initData[m]!=undefined){
                                   if(this.initData[m].key==this.targetData[n].key){
                                        this.initData.splice(m,1)                                  
                                    }
                               }
                                
                            }
                        
                        }                  
                        this.searchLeftData=arr1.sort(this.defaultSort('defaultNum'))
                    }
                    
                }else{

                    var arr=this.searchLeftData
                    var arr1=[]
                    var obj1={}
                    var arr2=[]
                    var obj2={}
                    var arr3=[]
                    var obj3={}
                    var arr4=[]
                    var obj4={}
                    for(var i=0;i<arr.length;i++){
                        for(var j=0;j<arr[i].agentList.length;j++){
                            if(arr[i].agentList[j].select){
                                obj1.groupId=arr[i].groupId
                                obj1.groupName=arr[i].groupName
                                obj1.groupNum=arr[i].groupNum
                                obj1.key=arr[i].key
                                obj1.select=false
                                obj1.isSearch=false
                                obj1.show=arr[i].show
                                obj1.spread=arr[i].spread
                                obj1.agentList=[]

                                obj2.agentNum=arr[i].agentList[j].agentNum
                                obj2.groupOf=arr[i].agentList[j].groupOf
                                obj2.id=arr[i].agentList[j].id
                                obj2.key=arr[i].agentList[j].key
                                obj2.loginId=arr[i].agentList[j].loginId
                                obj2.select=false
                                obj2.isSearch=false
                                obj2.show=arr[i].agentList[j].show
                                arr2.push(obj2)
                                obj1.agentList=arr2
                                obj2={}                               
                            }else{
                                obj3.groupId=arr[i].groupId
                                obj3.groupName=arr[i].groupName
                                obj3.groupNum=arr[i].groupNum
                                obj3.key=arr[i].key
                                obj3.select=false
                                obj3.isSearch=false
                                obj3.show=arr[i].show
                                obj3.spread=arr[i].spread
                                obj3.agentList=[]

                                obj4.agentNum=arr[i].agentList[j].agentNum
                                obj4.groupOf=arr[i].agentList[j].groupOf
                                obj4.id=arr[i].agentList[j].id
                                obj4.key=arr[i].agentList[j].key
                                obj4.loginId=arr[i].agentList[j].loginId
                                obj4.select=false
                                obj4.isSearch=false
                                obj4.show=arr[i].agentList[j].show
                                arr4.push(obj4)
                                obj3.agentList=arr4
                                obj4={}      


                            }
                        
                        }
                        if(JSON.stringify(obj1)!='{}'){
                            arr1.push(obj1)
                        }
                        if(JSON.stringify(obj3)!='{}'){
                            arr3.push(obj3)
                        }                     
                        obj1={}
                        arr2=[]
                        obj3={}
                        arr4=[]
                    }

                    console.log(arr1,'arr1')//目标值
                    console.log(arr3,'arr3')//原始值
                    this.targetData=this.agentGroupTargetConcatSort(arr1,'targetData')
                    console.log(this.targetData,'this.targetData')
                    this.searchRightData=this.agentGroupTargetConcatSort(arr1,'targetData')
                    console.log(this.searchRightData,'this.searchRightData')
                    this.initData=arr3
                    this.searchLeftData=arr3
                }
               
            },//向右传数据
            agentGroupTargetConcatSort(arr,label){
                var arr1=arr.concat(this[label])

                for(var i=0;i<arr1.length;i++){
                    for(var j=0;j<arr1.length;j++){
                        if(arr1[i].key==arr1[j].key){
                            arr1[i].agentList= arr1[i].agentList.concat(arr1[j].agentList)
                        }
                    }
                    arr1[i].agentList=(this.removeObjRepeat(arr1[i].agentList)).sort(this.defaultSort('agentNum'))
                }


                arr1=(this.removeObjRepeat(arr1)).sort(this.defaultSort('groupNum'))
               
                return arr1
                
            },//班组中坐席目标值合并排序
            removeObjRepeat(arr){
                var result = [];
                var obj = {};
                for(var i =0; i<arr.length; i++){
                  if(!obj[arr[i].key]){
                    result.push(arr[i]);
                    obj[arr[i].key] = true;
                    }
                }
                return result

            },//去除重复的对象
            reSortData(arr){
                var arr1=[];
                var len = arr.length;
                for(var i=0;i<len;i++){
                    arr1.push(arr[i].key)
                }    
                var arr2=tool.sortAll(arr1)
                var objx={};
                var arrx=[];
                for(var j=0;j<arr2.length;j++){
                   if(this.allCaps(arr2[j])){
                       objx.show=false;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }else{
                       objx.show=true;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }
               
                }
                return arrx

            },//改变数据迁移后再次排序
            defaultSort(property){
                return function(obj1,obj2){
                        var value1 = obj1[property];
                        var value2 = obj2[property];
                        return value1 - value2;     // 升序
                }
            },//默认排序
            sortJobNum(arr,label,item){
                var arr1=[]
                for(var i=0;i<arr.length;i++){
                    for(var j=0;j<this[item].length;j++){
                        if(arr[i][label]==this[item][j].key){
                            this[item][j].number=Number(arr[i].number)
                            arr1.push(this[item][j])
                        }
                    }
                }
                function compare(property){
                    return function(obj1,obj2){
                        var value1 = obj1[property];
                        var value2 = obj2[property];
                        return value1 - value2;     // 升序
                    }
                }
           
                arr1=arr1.sort(compare('number'))
                return arr1
            },//按工号排序
            sortName(arr,label,item){
                 console.log(arr,label,item,'姓名')
                 var arr1=[]
                 for(var i=0;i<arr.length;i++){
                    if(arr[i].show){
                        arr1.push(arr[i].key)
                    }
                     
                 }
                 console.log(arr1)
                var arr2=tool.sortAll(arr1)
                var objx={};
                var arrx=[];
               for(var j=0;j<arr2.length;j++){
                   if(this.allCaps(arr2[j])){
                       objx.show=false;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }else{
                       objx.show=true;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }
                
                }
                return arrx

            },//按姓名排序
            leftChangeTab(item){
                this.leftTabIndex=item
                if(item==1 && this.formItemStep3.moduleType=='1'){
                    this.initData=this.sortJobNum(this.dataAgent,'loginId','initData')
                    this.searchLeftData=this.sortJobNum(this.dataAgent,'loginId','initData')
                }//按工号排序
                
                if(item==2 && this.formItemStep3.moduleType=='1'){
                   this.initData=this.sortName(this.initData,'loginId','initData')
                   this.searchLeftData=this.sortName(this.initData,'loginId','initData')
                }//按姓名排序

            },//左侧table切换
            rightChangeTab(item){
                this.rightTabIndex=item
                if(item==1 && this.formItemStep3.moduleType=='1'){
                   this.targetData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                   this.searchRightData=this.sortJobNum(this.dataAgent,'loginId','targetData')
                }//按工号排序
                
                if(item==2 && this.formItemStep3.moduleType=='1'){
                   this.targetData=this.sortName(this.targetData,'loginId','targetData')
                   this.searchRightData=this.sortName(this.targetData,'loginId','targetData')
                }//按姓名排序

            },//右侧table切换
            changeLeftAll(item){
                if(this.formItemStep3.moduleType!='3'){
                    if(item){
                        for(var i=0;i<this.initData.length;i++){
                            this.initData[i].select=true
                        }
                    }else{
                        for(var i=0;i<this.initData.length;i++){
                            this.initData[i].select=false
                        }
                    }

                }else{

                    for(var i=0;i<this.initData.length;i++){
                         this.initData[i].select=item
                        for(var j=0;j<this.initData[i].agentList.length;j++){
                            this.initData[i].agentList[j].select=item
                        }
                    }
                }
              
            },//左边全选
            changeRightAll(item){
                if(this.formItemStep3.moduleType!='3'){
                    if(item){
                        for(var i=0;i<this.targetData.length;i++){
                            this.targetData[i].select=true
                        }
                    }else{
                            for(var i=0;i<this.targetData.length;i++){
                            this.targetData[i].select=false
                        }
                    }
                    this.headerRightCount=this.targetData.length+"/"+this.targetData.length
                }else{
                    for(var i=0;i<this.targetData.length;i++){
                         this.targetData[i].select=item
                        for(var j=0;j<this.targetData[i].agentList.length;j++){
                            this.targetData[i].agentList[j].select=item
                        }
                    }
                    
                }
                
            },//右边全选
            changeLeftSome(item){
                console.log(item)
                for(var i=0;i<this.initData.length;i++){
                    if(this.initData[i].key==item){
                        var itm=this.initData[i].select
                        for(var j=0;j<this.initData[i].agentList.length;j++){
                            this.initData[i].agentList[j].select=itm
                        }
                    }
                }
            },//左边部分全选
            changeRightSome(item){
                console.log(item)
                for(var i=0;i<this.targetData.length;i++){
                    if(this.targetData[i].key==item){
                        var itm=this.targetData[i].select
                        for(var j=0;j<this.targetData[i].agentList.length;j++){
                            this.targetData[i].agentList[j].select=itm
                        }
                    }
                }
            },//右边部分全选
            getAgentList(){
                var data=[
                    {id:'112as',loginId:'按',number:'324'},
                    {id:'122d',loginId:'吧',number:'123'},
                    {id:'3234s',loginId:'陈',number:'1323'},
                    {id:'43sd',loginId:'都',number:'23'},
                    {id:'52ded',loginId:'饿',number:'45'},
                    {id:'13ds',loginId:'发',number:'233'},
                    {id:'65sd',loginId:'个',number:'452'},
                     {id:'65sd',loginId:'好',number:'452'},
                      {id:'65sd',loginId:'iii',number:'452'},
                       {id:'65sd',loginId:'就',number:'452'},
                        {id:'65sd',loginId:'看',number:'452'},
                         {id:'65sd',loginId:'里',number:'452'},
                          {id:'65sd',loginId:'忙',number:'452'},
                           {id:'65sd',loginId:'那',number:'452'},
                            {id:'65sd',loginId:'噢',number:'452'},
                             {id:'65sd',loginId:'怕',number:'452'},
                              {id:'65sd',loginId:'请',number:'452'},
                               {id:'65sd',loginId:'人',number:'452'},
                               {id:'65sd',loginId:'是',number:'452'},
                        {id:'65sd',loginId:'天',number:'452'},
                         {id:'65sd',loginId:'uu',number:'452'},
                          {id:'65sd',loginId:'vv',number:'452'},
                           {id:'65sd',loginId:'我',number:'452'},
                            {id:'65sd',loginId:'想',number:'452'},
                             {id:'65sd',loginId:'要',number:'452'},
                              {id:'65sd',loginId:'在',number:'452'},
                               {id:'112as',loginId:'a',number:'324'},
                    {id:'122d',loginId:'b',number:'123'},
                    {id:'3234s',loginId:'c',number:'1323'},
                    {id:'43sd',loginId:'d',number:'23'},
                    {id:'52ded',loginId:'e',number:'45'},
                    {id:'13ds',loginId:'f',number:'233'},
                    {id:'65sd',loginId:'g',number:'452'},
                     {id:'65sd',loginId:'h',number:'452'},
                      {id:'65sd',loginId:'i',number:'452'},
                       {id:'65sd',loginId:'j',number:'452'},
                        {id:'65sd',loginId:'k',number:'452'},
                         {id:'65sd',loginId:'l',number:'452'},
                          {id:'65sd',loginId:'m',number:'452'},
                           {id:'65sd',loginId:'n',number:'452'},
                            {id:'65sd',loginId:'o',number:'452'},
                             {id:'65sd',loginId:'p',number:'452'},
                              {id:'65sd',loginId:'q',number:'452'},
                               {id:'65sd',loginId:'r',number:'452'},
                               {id:'65sd',loginId:'s',number:'452'},
                        {id:'65sd',loginId:'t',number:'452'},
                         {id:'65sd',loginId:'u',number:'452'},
                          {id:'65sd',loginId:'v',number:'452'},
                           {id:'65sd',loginId:'w',number:'452'},
                            {id:'65sd',loginId:'x',number:'452'},
                             {id:'65sd',loginId:'y',number:'452'},
                              {id:'65sd',loginId:'z',number:'452'},
                                                                   
                    ]
                this.dataAgent=data;
                var len = data.length;
                var arr1=[]
                for(var i=0;i<len;i++){
                    arr1.push(data[i].loginId)
                }    
                var arr2=tool.sortAll(arr1)
                var objx={};
                var arrx=[];
               for(var j=0;j<arr2.length;j++){
                   if(this.allCaps(arr2[j])){
                       objx.show=false;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }else{
                       objx.show=true;
                       objx.isSearch=false;
                       objx.key=arr2[j];
                       objx.select=false
                       arrx.push(objx)
                       objx={}
                   }
               
                }
               
                this.initData=arrx
                this.searchLeftData=arrx
                this.initAllData=arrx
                console.log(arrx,'坐席')


                this.headerLeftCon="坐席列表"
                this.headerRightCon="已分配坐席列表"
                this.targetData=[]


            },//获取坐席列表
            getGroupList(){
                var data=[
                    {groupId:'112as',groupName:'班组1',number:'324'},
                    {groupId:'122d',groupName:'yyzx',number:'123'},
                    {groupId:'3234s',groupName:'1212',number:'1323'},
                    {groupId:'43sd',groupName:'345',number:'23'},
                    {groupId:'52ded',groupName:'sdss',number:'45'},
                    {groupId:'13ds',groupName:'jsd',number:'233'},
                    {groupId:'65sd',groupName:'班组2',number:'452'}                                        
                    ]
                this.dataGroup=data;
            
                //班组不排序
               var objx={};
               var arrx=[];
                for(var i=0;i<data.length;i++){
                    objx.show=true;
                    objx.isSearch=false;
                    objx.key=data[i].groupName;
                    objx.select=false
                    objx.defaultNum=i
                    arrx.push(objx)
                    objx={}
                }



                this.initData=arrx             
                this.searchLeftData=arrx
                this.initAllData=arrx
                // console.log(arrx,'班组')



                this.headerLeftCon="客服组列表"
                this.headerRightCon="已分配客服组"
                this.targetData=[]
            },//获取班组列表
            getAgentOfGroupList(){
                var data=[
                    {groupId:'112as',groupName:'班组1',
                    agentList:
                        [
                        {id:'112as',loginId:'啥快递的坐席1'},
                        {id:'122d',loginId:'yyzx'},
                        {id:'3234s',loginId:'1212'},
                        {id:'43sd',loginId:'345'},
                        {id:'52ded',loginId:'sdss'},
                        {id:'13ds',loginId:'jsd'},
                        {id:'65sd',loginId:'阿萨德'} 
                        ]},
                    {groupId:'122d',groupName:'班组2',
                    agentList:
                        [
                        {id:'112as',loginId:'ssd'},
                        {id:'122d',loginId:'第三方'},
                        {id:'3234s',loginId:'c2第三方'},
                        {id:'43sd',loginId:'3464'},
                        {id:'52ded',loginId:'fdsf'},
                        {id:'13ds',loginId:'地方'},
                        {id:'65sd',loginId:'俺叔'} 
                        ]
                    
                    }
                                     
                ]


                for(var i=0;i<data.length;i++){
                    data[i].groupNum=i
                    data[i].select=false
                    data[i].isSearch=false
                    data[i].show=true
                    data[i].spread=false
                    data[i].key=data[i].groupName
                    for(var j=0;j<data[i].agentList.length;j++){
                        data[i].agentList[j].groupOf=i
                        data[i].agentList[j].agentNum=j
                        data[i].agentList[j].select=false
                        data[i].agentList[j].isSearch=false
                        data[i].agentList[j].show=true
                        data[i].agentList[j].key=data[i].agentList[j].loginId
                    }

                }
                console.log(data,'data')




                this.dataAgentOfGroup=data
                this.initData=data             
                this.searchLeftData=data
                this.initAllData=data



                this.headerLeftCon="坐席列表"
                this.headerRightCon="已分配坐席列表"
                this.targetData=[]
                

            },//班组内部坐席
            allCaps(text){
                for(var i=0;i<text.length;i++){
                    var c=text.charAt(i)
                    if(c < 'A' || c>'Z') return false
                }
                return true
            },//判断是否为大写字母
            changeModuleType(item){
                if(item==1){
                    this.getAgentList()
                    this.searchPlaceholder='搜索成员'
                    
                }
                if(item==2){
                    this.getGroupList()
                    this.searchPlaceholder='搜索客服组'
                }
                if(item==3){
                    this.getAgentOfGroupList()
                    this.searchPlaceholder='搜索成员'
                }
                this.leftSearch=''
                this.rightSearch=''
            },
            spreadList(item,label){
                console.log(item,label)
                for(var i=0;i<this[label].length;i++){
                    if(this[label][i].key==item){
                        this[label][i].spread=!this[label][i].spread
                    }
                }
            },//展开坐席列表
            // getAllData(){
            //     for(var i=0;i<this.initAllData.length;i++){
            //         for(var j=0;j<this.targetData.length;j++){
            //             if(this.initAllData[i].key==this.targetData[j].key){
            //                 this.initAllData.splice(i,1)
            //                 i=i-1
            //             }
            //         }
            //     }
                
            //     console.log(this.initAllData,'this.initAllData')
            // },
            



             pySort:function(arr,empty){
          var $this = this;
          if(!String.prototype.localeCompare)
            return null;
          var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
          var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
          var arrList = [];
          for(var m =0;m<arr.length;m++){
            arrList.push(arr[m]);
          }
          console.log(arrList)
          var result = [];
          var curr;
          for(var i=0;i<letters.length;i++){
            curr = {letter: letters[i], data:[]};
            if(i!=26){
              for(var j =0;j<arrList.length;j++){
                var initial = arrList[j].charAt(0);//截取第一个字符
                if(arrList[j].charAt(0)==letters[i]||arrList[j].charAt(0)==letters[i].toLowerCase()){  //首字符是英文的
                    console.log(arrList[j])
                  curr.data.push(arrList[j]);
                }else if(zh[i]!='*'&&$this.isChinese(initial)){   //判断是否是无汉字,是否是中文
                  if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {  //判断中文字符在哪一个类别
                    curr.data.push(arrList[j]);
                  }
                }
              }
            }else{
              for(var k =0;k<arrList.length;k++){
                var ini = arrList[k].charAt(0);      //截取第一个字符
                if(!$this.isChar(ini)&&!$this.isChinese(ini)){
                  curr.data.push(arrList[k]);
                }
              }
            }
            if(empty || curr.data.length) {
              result.push(curr);
              //curr.data.sort(function(a,b){
              //  return b.localeCompare(a);    //排序,英文排序,汉字排在英文后面
              //});
            }
          }
          return result;
        },
        isChinese:function(temp){
          var re=/[^\u4E00-\u9FA5]/;
          if (re.test(temp)){return false;}
          return true ;
        },
        isChar:function(char){
          var reg = /[A-Za-z]/;
          if (!reg.test(char)){return false ;}
          return true ;
        },








            Trim(str,is_global){
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g,"");
                if(is_global.toLowerCase()=="g")
                {
                    result = result.replace(/\s/g,"");
                }
                return result
            },
            dateToStr(datetime){
                var year = datetime.getFullYear();
                var month = datetime.getMonth()+1;//js从0开始取
                var date = datetime.getDate();
                var hour = datetime.getHours();
                var minutes = datetime.getMinutes();
                var second = datetime.getSeconds();

                if(month<10){
                    month = "0" + month;
                }
                if(date<10){
                    date = "0" + date;
                }
                if(hour <10){
                    hour = "0" + hour;
                }
                if(minutes <10){
                    minutes = "0" + minutes;
                }
                if(second <10){
                    second = "0" + second ;
                }
                var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
                return time;
            },//时间转换
            next(name) {

            },//下一步导入数据
            goStep1() {
                this.current = 0
            },//返回第一步
            goStep2(){
                this.current = 1
            },//返回第二步
            //切换坐席和人员分组
            handleProgress() {
            },//文件上传过程
            handleSuccess() {
            },//文件上传成功
            handleRemove(){

            },
            submit() {


            },//提交数据
            handleChange (newTargetKeys,direction, moveKeys) {


            },//操作穿梭框
            selectChange(sourceSelectedKeys, targetSelectedKeys){


            },
           

            doneTask(){
            },//完成任务分配
            createTaskSuccess(){
                this.$router.push('/clkm/TaskManage')
            },//任务创建成功
        },
        computed: {
            // list () {
            //   return this.$store.state.clkm.list
            // }
            
            headerLeftCount(){
                var num=0
                var num1=0
                var setLabel=''
                if(this.leftSearch==''){
                    setLabel='initData'
                }else{
                    setLabel='searchLeftData'
                }
                if(this.formItemStep3.moduleType!=3){
                    for(var i=0;i<this[setLabel].length;i++){
                        if(this[setLabel][i].show){
                        num++
                        }
                        if(this[setLabel][i].select && this[setLabel][i].show){
                            num1++
                        }
                    }
                    return num1+"/"+num

                }else{

                    var arr=[]
                    for(var j=0;j<this[setLabel].length;j++){
                        if(this[setLabel][j].show){
                            num+=this[setLabel][j].agentList.length
                        }
                        for(var k=0;k<this[setLabel][j].agentList.length;k++){
                            if(this[setLabel][j].agentList[k].select){
                                num1++
                            }
                        }
                    }

                    return num1+"/"+num

                }
                
            },
            headerRightCount(){
                var num=0
                var num1=0
                var setLabel=''
                if(this.rightSearch==''){
                    setLabel='targetData'
                }else{
                    setLabel='searchRightData'
                }
                if(this.formItemStep3.moduleType!=3){
                    for(var i=0;i<this[setLabel].length;i++){
                        if(this[setLabel][i].show){
                        num++
                        }
                        if(this[setLabel][i].select){
                            num1++
                        }
                    }
                    return num1+"/"+num

                }else{
                    var arr=[]
                    for(var j=0;j<this[setLabel].length;j++){
                        if(this[setLabel][j].show){
                            num+=this[setLabel][j].agentList.length
                        }
                        for(var k=0;k<this[setLabel][j].agentList.length;k++){
                            if(this[setLabel][j].agentList[k].select){
                                num1++
                            }
                        }
                    }
                    return num1+"/"+num
                }
                
            },
            toSelectLeft(){
                var flag=true
                if(this.formItemStep3.moduleType!=3){
                    for(var i=0;i<this.targetData.length;i++){
                        if(this.targetData[i].select){
                        flag=false
                        }

                    }
                    return flag

                }else{
                    for(var i=0;i<this.targetData.length;i++){
                        for(var j=0;j<this.targetData[i].agentList.length;j++){
                            if(this.targetData[i].agentList[j].select){
                                flag=false
                            }
                        }
                    }
                    return flag
                }
                
                
            },//向左选择按钮是否可以点击
            toSelectRight(){
                var flag=true
                if(this.formItemStep3.moduleType!=3){
                    for(var i=0;i<this.initData.length;i++){
                        if(this.initData[i].select){
                        flag=false
                        }

                    }
                    return flag

                }else{
                    for(var i=0;i<this.initData.length;i++){
                        for(var j=0;j<this.initData[i].agentList.length;j++){
                            if(this.initData[i].agentList[j].select){
                                flag=false
                            }
                        }
                    }
                    return flag

                }
                

            }//向右选择按钮是否可以点击
        },
        watch:{
            leftSearch(newVal,oldVal){
                var arr=[]
                this.searchLeftData=this.initData
                //一个initData列表，一个searchData列表，当搜索内容不为空时显示搜索列表，为空时显示init列表
                var arr1=this.searchLeftData
                if(this.formItemStep3.moduleType!=3){   
                        if(newVal==''){
                            this.leftSearchEmpty=true
                            arr=this.initAllData
                            for(var i=0;i<arr.length;i++){
                                arr[i].isSearch=false
                            }
                            for(var j=0;j<arr1.length;j++){
                                arr1[j].isSearch=false
                            }


                        }else{
                            this.leftSearchEmpty=false
                            for(var i=0;i<arr1.length;i++){
                                if(arr1[i].key.indexOf(newVal)!='-1'){
                                    arr1[i].isSearch=true
                                    arr.push(arr1[i])
                                }else{
                                    arr1[i].isSearch=false
                                
                                }
                            }


                        }
                        
                    
                    this.searchLeftData=this.removeObjRepeat(arr)
                    
                   

                }else{

                    if(newVal==""){

                                this.leftSearchEmpty=true
                                console.log(1111)
                                arr=this.initAllData
                                console.log(arr1)
                                for(var i=0;i<arr.length;i++){
                                    arr[i].isSearch=false
                                }
                                for(var k=0;k<arr1.length;k++){
                                     arr1[k].isSearch=false
                                    for(var j=0;j<arr1[k].agentList.length;j++){
                                        arr1[k].agentList[j].isSearch=false
                                    }
                                   
                                }
                              
                    }else{
                        for(var i=0;i<arr1.length;i++){
                            for(var j=0;j<arr1[i].agentList.length;j++){
                                
                                    this.leftSearchEmpty=false
                                    if(arr1[i].agentList[j].key.indexOf(newVal)!='-1'){
                                        arr1[i].agentList[j].isSearch=true
                                        arr.push(arr1[i])
                                    }else{
                                        arr1[i].agentList[j].isSearch=false
                                    
                                    }
                                
                                
                            }
                        }

                    }

                  
                    this.searchLeftData=this.removeObjRepeat(arr)
                   
                }
                                
          
            },
            rightSearch(newVal,oldVal){
                var arr=[]
                this.searchRightData=this.targetData
                var arr1=this.searchRightData
                if(this.formItemStep3.moduleType!=3){    
                        if(newVal==""){
                            this.rightSearchEmpty=true
                            arr=this.initAllData
                            for(var i=0;i<arr.length;i++){
                                arr[i].isSearch=false
                            }
                            for(var j=0;j<arr1.length;j++){
                                arr1[j].isSearch=false
                            }

                        }else{
                            this.rightSearchEmpty=false
                            for(var i=0;i<arr1.length;i++){
                                if(arr1[i].key.indexOf(newVal)!='-1'){
                                    arr1[i].isSearch=true
                                    arr.push(arr1[i])
                                }else{
                                    arr1[i].isSearch=false
                                
                                }
                            }


                        }
                        

                   this.searchRightData=this.removeObjRepeat(arr)

                }else{
                    if(newVal==""){
                                // this.rightSearchEmpty=true
                                // arr1[i].agentList[j].isSearch=false
                                // arr.push(arr1[i])

                        this.rightSearchEmpty=true
                        arr=this.initAllData
                                console.log(arr1)
                                for(var i=0;i<arr.length;i++){
                                    arr[i].isSearch=false
                                }
                                for(var k=0;k<arr1.length;k++){
                                     arr1[k].isSearch=false
                                    for(var j=0;j<arr1[k].agentList.length;j++){
                                        arr1[k].agentList[j].isSearch=false
                                    }
                                   
                                }



                    }else{
                        for(var i=0;i<arr1.length;i++){
                            for(var j=0;j<arr1[i].agentList.length;j++){
                                
                                    this.rightSearchEmpty=false
                                    if(arr1[i].agentList[j].key.indexOf(newVal)!='-1'){
                                        arr1[i].agentList[j].isSearch=true
                                        arr.push(arr1[i])
                                    }else{
                                        arr1[i].agentList[j].isSearch=false
                                    
                                    }
                                
                                
                            }
                        }


                    }


                    
                    this.searchRightData=this.removeObjRepeat(arr)
                    // this.targetData=this.removeObjRepeat(arr)

                }
                
               
            }
        }
    }
</script>
<style lang="stylus" scoped>

    #transfer
        display flex
        .tra_left
            width 45%
            height 400px
            border 1px solid #DDDEE1
            border-radius 5px
            display flex
            flex-direction column
            .tra_left_head
                background rgba(249,250,252,1)
                border-radius 5px 5px 0px 0px
                height 35px
                display flex
                justify-content space-around
                align-items center
            .tra_tab
                height 35px
                display flex
                align-items center
                border-bottom 1px solid #E4E5E9
                
                .tra_tab_cur
                    border-bottom 2px solid #2F80EB
            .tra_conbox
                flex 1
                overflow-y auto               
                .tra_sigle
                    display flex
                    padding 0 5%
                    justify-content space-between
                    .tra_sigle_center
                        flex 1
                    .pColor
                        color #ED3F14

                
                
                    

        .tra_center
            width 100px
            display flex
            flex-direction column
            justify-content center
            align-items center
        .tra_right
            width 45%
            height 400px
            border 1px solid #DDDEE1
            border-radius 5px
            
            .tra_right_head
                background rgba(249,250,252,1)
                border-radius 5px 5px 0px 0px
                height 35px
                display flex
                justify-content space-around
                align-items center
            .tra_tab
                height 35px
                display flex
                align-items center
                border-bottom 1px solid #E4E5E9
                
                .tra_tab_cur
                    border-bottom 2px solid #2F80EB
            .tra_conbox
                flex 1
                overflow-y auto               
                .tra_sigle
                    display flex
                    padding 0 5%
                    justify-content space-between
                    .tra_sigle_center
                        flex 1
                    .pColor
                        color #ED3F14


    .page-wrapper
        height 100%
        background #fff

    .p1
        text-align center
        font-size 16px

    .ivu-radio-group-button
        .ivu-radio-wrapper-checked
            color #fff
            background #2d8cf0


    .ivu-checkbox-wrapper-disabled
         .ivu-checkbox-disabled
                display none

    .ivu-transfer-list-content-item-disabled
        >span
            position relative
            left -15px
            font-size 14px

    /*.demo-spin-col*/
    /*height 100px*/
    /*position relative*/
    /*border 1px solid #eee*/
    .demo-spin-icon-load
        animation ani-demo-spin 1s linear infinite

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
