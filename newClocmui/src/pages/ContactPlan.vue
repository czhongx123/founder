<template>
    <div class="page-wrapper">
        <Card>
            <Form :model="formItem1" :label-width="80">

                <Row :gutter="10">
                    <Col span="4">
                    <Select v-model="formItem1.period">
                        <Option value="1">今天</Option>
                        <Option value="2">过去7天</Option>
                        <Option value="3">过去30天</Option>
                        <Option value="4">全部时间</Option>
                        <Option value="5">自定义</Option>
                    </Select>
                    </Col>
                    <Col span="4">
                    <Select v-model="formItem1.followResult">
                        <Option value="1">全部跟进结果</Option>
                        <Option value="2">无</Option>
                        <Option value="3">有意向</Option>
                        <Option value="4">无意向</Option>
                        <Option value="5">高意向</Option>
                        <Option value="6">已成交</Option>
                    </Select>
                    </Col>
                    <Col span="2">
                    <Button type="primary" icon="ios-search" :loading="searchLoading" @click="search">搜索</Button>
                    </Col>
                    <Col span="3">
                    <Button type="primary" icon="md-add" @click="addPlan">添加联系计划</Button>
                    </Col>
                    <Col span="3">
                    <Button type="success" icon="md-archive" :loading="exportDataLoading" @click="exportData">导出联系计划
                    </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <p style="margin: 20px 0;padding-left: 30px">
                    <span style="padding: 3px 20px;border-bottom: 1px solid #0066FF ">全部计划(12)</span>
                </p>
            </Row>
            <Table :height="heightTable" :columns="columns1" :data="tableData1"></Table>
            <Modal v-model="editModal" title="编辑联系计划" :closable="false" :mask-closable="false" :footer-hide=true>
                <Form :model="formItemEdit" ref="formItemEdit" :rules="ruleFormItemEdit" :label-width="100">
                    <Row>
                        <FormItem label="编辑计划" prop="title">
                            <Input v-model="formItemEdit.title" placeholder="请输入计划标题"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="客户电话" prop="tel">
                            <Input v-model="formItemEdit.tel" placeholder="请输入客户电话"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="跟进结果">
                            <RadioGroup v-model="formItemEdit.followResult">
                                <Radio label="无"></Radio>
                                <Radio label="有意向"></Radio>
                                <Radio label="无意向"></Radio>
                                <Radio label="高意向"></Radio>
                                <Radio label="已成交"></Radio>
                            </RadioGroup>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="预约时间">
                            <DatePicker type="datetime" v-model="formItemEdit.visitTime" placeholder="选择预约时间"></DatePicker>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="提醒时间">
                            <Select v-model="formItemEdit.remindTime">
                                <Option value="1">5分钟</Option>
                                <Option value="2">10分钟</Option>
                                <Option value="3">15分钟</Option>
                            </Select>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="备注" prop="remarks">
                            <Input v-model="formItemEdit.remarks" type="textarea" :rows="4" placeholder="备注最多输入200个字符"></Input>
                        </FormItem>
                    </Row>
                    <Row style="margin-top:40px;text-align: center">
                        <Col :span="14">
                        <Button type="primary" :loading="confirmLoading" @click="confirm('formItemEdit')">确认修改
                        </Button>
                        </Col>
                        <Col :span="5">
                        <Button type="default" @click="cancel()">取消
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <v-addplan v-if="$store.state[name].isPlanShow"></v-addplan>
        </Card>
    </div>
</template>
<script>
import AddPlan from "@/components/AddPlan";
import { mapState } from "vuex";
import { name } from "@/config";
export default {
  name: "ContactPlan",
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("计划名不能为空"));
      }
      if (value.length > 20) {
        callback(new Error("计划名任务名不能超过二十个字符"));
      }
      let len = this.Trim(value, "is_global").length;
      if (len < 1) {
        callback(new Error("计划名不能为空"));
      }
      callback();
    }; //验证计划名
    var validateTel = (rule, value, callback) => {
      if (value !== "") {
        if (!/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback(new Error("手机号不能为空"));
      }
    }; //验证计划名
    var validatetextarea = (rule, value, callback) => {
      let len = this.Trim(value, "is_global").length;
      if (len > 200) {
        callback(new Error("备注应在200字符内"));
      }
      callback();
    }; //验证文本域描述
    return {
      name: name, //整个模块的名字
      searchLoading: false, //搜索任务按钮的状态
      exportDataLoading: false, //导出联系计划按钮的状态
      confirmLoading: false, //编辑弹窗确定按钮的状态
      editModal: false, //编辑弹窗是否显示
      ruleFormItemEdit: {
        title: [{ validator: validateTitle, trigger: "blur", required: true }],
        tel: [{ validator: validateTel, trigger: "blur", required: true }],
        // remindTime:[{ validator: validateTitle, trigger: 'blur',required:true }],
        // autoRate:[{ validator: validateautoRate, trigger: 'blur',type:'string'}],
        remarks: [
          { validator: validatetextarea, trigger: "blur", type: "string" }
        ]
      },
      formItemEdit: {
        title: "", //计划的标题
        tel: "", //客户的电话
        followResult: "", //跟进的结果
        visitTime: "", //预约的时间
        remindTime: "", //提醒的标题
        remarks: "" //备注
      }, //编辑弹窗信息
      formItem1: {
        period: "", //搜索范围
        followResult: "1" //跟进结果
      },
      columns1: [
        {
          title: "客户电话号码",
          key: "tel"
        },
        {
          title: "计划名称",
          key: "title"
        },
        {
          title: "相关任务",
          key: "task"
        },
        {
          title: "计划时间",
          key: "planTime"
        },
        {
          title: "回访时间",
          key: "visitTime"
        },
        {
          title: "跟进结果",
          key: "followResult"
        },
        {
          title: "备注",
          key: "remarks"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i",
                {
                  props: {},
                  style: {
                    color: "#19be6b",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "5px",
                    position: "relative"
                  },
                  class: "ivu-icon ivu-icon-md-call ",
                  on: {
                    click: () => {
                      this.ring(params.row.tel);
                    }
                  }
                },
                ""
              ),
              h(
                "i",
                {
                  props: {},
                  style: {
                    marginRight: "5px",
                    color: "#2db7f5",
                    fontSize: "20px",
                    cursor: "pointer",
                    position: "relative"
                  },
                  class: "ivu-icon ivu-icon-md-create ",
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                ""
              ),
              h(
                "i",
                {
                  props: {},
                  style: {
                    color: "#ed4014",
                    fontSize: "20px",
                    cursor: "pointer",
                    position: "relative"
                  },
                  class: "ivu-icon ivu-icon-md-trash ",
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                ""
              )
            ]);
          }
        }
      ], //table渲染信息
      tableData1: [
        {
          tel: "13273710088",
          title: "标题",
          task: "任务1",
          planTime: "2016-10-03 13:24",
          visitTime: "2016-10-03 13:24",
          followResult: "1",
          remarks: "1213"
        },
        {
          tel: "13273710088",
          title: "标题",
          task: "任务1",
          planTime: "2016-10-03 13:24:00",
          visitTime: "2016-10-03 13:24:00",
          followResult: "1",
          remarks: "121312131"
        },
        {
          tel: "13273710088",
          title: "标题",
          task: "任务1",
          planTime: "2016-10-03 13:24",
          visitTime: "2016-10-03 13:24",
          followResult: "1",
          remarks: "1213"
        },
        {
          tel: "13273710088",
          title: "标题",
          task: "任务1",
          planTime: "2016-10-03 13:24",
          visitTime: "2016-10-03 13:24",
          followResult: "1",
          remarks: "1"
        },
        {
          tel: "13273710088",
          title: "标题",
          task: "任务1",
          planTime: "2016-10-03 13:24",
          visitTime: "2016-10-03 13:24",
          followResult: "1",
          remarks: "1213"
        }
      ] //table信息
    };
  },
  mounted() {
    this.getInitData(); //初始化数据
  },
  methods: {
    Trim(str, is_global) {
      var result;
      result = str.replace(/(^\s+)|(\s+$)/g, "");
      if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
      }
      return result;
    },
    getInitData() {
      console.log("初始化数据");
    }, //获取初始化数据
    addPlan() {
      this.$store.commit(this.name + "/changePlanShow", true);

      console.log(this.$store.state.clkm.isPlanShow);
      console.log(this.$store.state[name].isPlanShow);
    }, //添加计划
    ring(item) {
      console.log(item);
    }, //开始呼叫电话
    edit(item) {
      console.log(item);
      this.editModal = true;
      this.formItemEdit = {
        title: item.title, //计划的标题
        tel: item.tel, //客户的电话
        followResult: item.followResult, //跟进的结果
        visitTime: item.visitTime, //预约的时间
        remindTime: "1", //提醒的标题
        remarks: item.remarks //备注
      };
    }, //开始编辑计划
    confirm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          setTimeout(() => {
            this.confirmLoading = false;
            this.editModal = false;
          }, 3000);
        } else {
          this.$Message.error("请完成合法配置!");
        }
      });
    }, //编辑弹窗的确定按钮
    cancel() {
      this.editModal = false;
    }, //编辑弹窗的确定按钮
    remove() {
      this.$Modal.confirm({
        title: "是否确认删除任务，删除之后任务将被收回且不可恢复",
        align: "center",
        okText: "确认删除",
        cancelText: "取消",
        onOk: () => {
          this.$Message.info("成功删除");
        },
        onCancel: () => {
          this.$Message.info("已取消");
        }
      });
    }, //开始删除计划
    search() {
      this.searchLoading = true;

      setTimeout(() => {
        this.searchLoading = false;
      }, 1000);
    }, //去搜索(主体页)
    exportData() {
      this.exportDataLoading = true;

      setTimeout(() => {
        this.$Message.info("数据导出成功");
        this.exportDataLoading = false;
      }, 1000);
    }
  },
  components: {
    "v-addplan": AddPlan
  },
  computed: {
    heightTable() {
      if (this.tableData1.length > 10) {
        return 520;
      }
    }
  }
};
</script>
<style lang="stylus">
</style>