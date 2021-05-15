<template>
<!--  <el-button type="primary" @click="handleUpdate(row)">添加设备</el-button>-->
  <div style="padding:30px;">
<!--    <el-button type="primary" @click="dialogVisible = true">添加设备</el-button>-->
    <el-button type="primary" @click="handleCreate">添加设备</el-button>
    <el-table :data="tableData"  border stripe style="width: 100%">
      <el-table-column label="设备编号" prop="id">
      </el-table-column>
      <el-table-column label="设备别名" prop="name">
      </el-table-column>
      <el-table-column label="设备状态" prop="status" >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag type="info" size="medium" v-if="scope.row.ccid==0">{{ scope.row.status }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" prop="type">
      </el-table-column>
      <el-table-column label="设备二维码" prop="erweima">
      </el-table-column>
      <el-table-column label="设备批次号" prop="num">
      </el-table-column>
      <el-table-column label="设备序号" prop="xuhao">
      </el-table-column>
      <el-table-column label="设备mac地址" prop="address">
      </el-table-column>
      <el-table-column label="设备ccid" prop="ccid">
      </el-table-column>
      <el-table-column label="地址" prop="address2">
      </el-table-column>
      <el-table-column label="操作" prop="action" width="250">
<!--        <template slot-scope="{row,$index}" slot-scope="scope">-->
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ccid==0" >指令</el-button>
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row, scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备编号" prop="no" ref="no">
          <el-input v-model="edit1" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备编号" />
        </el-form-item>
        <el-form-item label="设备别名" prop="name" ref="name">
          <el-input v-model="edit2" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备别名" />
        </el-form-item>
        <el-form-item label="设备类型" prop="type" ref="type">
          <el-input v-model="edit9" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备类型" />
        </el-form-item>
        <el-form-item label="设备二维码" prop="erweima" ref="erweima">
          <el-input v-model="edit3" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备二维码" />
        </el-form-item>
        <el-form-item label="设备批次号" prop="num" ref="num">
          <el-input v-model="edit4" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备批次号" />
        </el-form-item>
        <el-form-item label="设备序号" prop="xuhao" ref="xuhao">
          <el-input v-model="edit5" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备序号" />
        </el-form-item>
        <el-form-item label="设备mac地址" prop="address" ref="address">
          <el-input v-model="edit6" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备mac地址" />
        </el-form-item>
        <el-form-item label="设备ccid" prop="ccid" ref="ccid">
          <el-input v-model="edit7" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="设备ccid" />
        </el-form-item>
        <el-form-item label="地址" prop="address2" ref="address2">
          <el-input v-model="edit8" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="地址" />
        </el-form-item>
      </el-form>
      <div slot="footer">
<!--      <div slot="footer" slot-scope="scope">-->
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      my_index: '',
      my_row: '',
      input_no: '',
      intput_name: '',
      intput_xuhao: '',
      input_status: '',
      input_type: '',
      input_ccid: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      tableKey: 0,
      list: null,
      total: 0,
      importanceOptions: [1, 2, 3],
      showReviewer: false,
      edit1: '',
      edit2: '',
      edit3: '',
      edit4: '',
      edit5: '',
      edit6: '',
      edit7: '',
      edit8: '',
      edit9: '',
      downloadLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      tempdata: {
        id: '',
        name: '',
        type: '',
        status: '',
        xuhao: '',
        ccid: ''
      },
      tableData: [
        {
          id: '10046',
          name: '水表1',
          type: '电表'
        },
        {
          id: '10044',
          name: '电表1',
          type: '水表'
        },
        {
          id: '10014',
          name: '灯2-1-1',
          type: '灯',
          status: '关闭',
          xuhao: '0001',
          ccid: '0'
        },
        {
          id: '10015',
          name: '灯2-1-2',
          type: '灯',
          status: '关闭',
          xuhao: '0002',
          ccid: '0'
        },
        {
          id: '10016',
          name: '灯2-1-3',
          status: '关闭',
          type: '灯',
          xuhao: '0003',
          ccid: '0'
        },
        {
          id: '10017',
          name: '灯2-1-2',
          status: '关闭',
          type: '灯',
          xuhao: '0004',
          ccid: '0'
        }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    my_reset() {
      this.edit1 = ''
      this.edit2 = ''
      this.edit4 = ''
      this.edit5 = ''
      this.edit6 = ''
      this.edit7 = ''
      this.edit9 = ''
    },
    createData() {
      var list = {
        id: this.edit1,
        name: this.edit2,
        status: '关闭',
        type: this.edit9,
        xuhao: this.edit5,
        ccid: this.edit7
      }
      this.tableData.push(list)
      this.dialogFormVisible = false
      this.my_reset()
    },
    resetTemp() {
      this.tempdata.id = ''
      this.tempdata.name = ''
      this.tempdata.status = ''
      this.tempdata.type = ''
      this.tempdata.xuhao = ''
      this.tempdata.ccid = ''
    },
    handleCreate() {
      this.my_reset()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['tableData'].clearValidate()
      })
    },
    handleUpdate(row, index) {
      this.edit1 = this.tableData[index].id
      this.edit2 = this.tableData[index].name
      this.edit4 = this.tableData[index].num
      this.edit5 = this.tableData[index].xuhao
      this.edit6 = this.tableData[index].ccid
      this.edit7 = this.tableData[index].address
      this.edit9 = this.tableData[index].type
      this.my_index = index
      this.my_row = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['tableData'].clearValidate()
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
    },
    updateData() {
      var list = {
        id: this.edit1,
        name: this.edit2,
        status: '关闭',
        type: this.edit9,
        xuhao: this.edit5,
        ccid: this.edit7
      }
      this.tableData.splice(this.my_index, 1, list)
      this.dialogFormVisible = false
      this.my_reset()
    }
  }
}
</script>
