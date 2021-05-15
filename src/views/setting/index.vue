<template>
  <div class="setting-container">
    <!-- <button @click="showDetails">请求</button> -->
    <div>
      <el-button size="small" type="primary" @click="handleCreate">添加用户</el-button>
    </div>
    <div class="setting-text">
       <el-table
          
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="realName"
		        label="真实姓名"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="roleName"
		        label="身份"
		        >
		      </el-table-column>
          <el-table-column
              prop="tel"
              label="电话"
              width="180">
          </el-table-column>
		      <el-table-column
		        prop="id"
		        label="编号">
		      </el-table-column>
           <el-table-column
		        prop="userName"
		        label="用户名">
		      </el-table-column>
           <el-table-column
		        prop="class"
		        label="类别"
            align="center"
            width="230">
		      </el-table-column>
           <el-table-column
		        prop="email"
		        label="邮箱"
            width="180">
		      </el-table-column>
           <el-table-column
		        prop="status"
		        label="状态">
		      </el-table-column>
          <el-table-column label="操作" prop="action" width="250">
<!--        <template slot-scope="{row,$index}" slot-scope="scope">-->
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="success"  >指令</el-button> -->
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row, scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.$index)" >禁用</el-button>
          <el-button size="mini" type="info" @click="my_reset2()" >重置</el-button>
        </template>
      </el-table-column>
		    </el-table>

     <el-pagination
       @current-change="handleCurrentChange"
       @size-change="handleSizeChange"
       background
      :page-size="10"
      :pager-count="11"
      :page-sizes="[5,10,15]"
      layout="total,jumper,prev, pager, next,sizes"
      :total="total">
    </el-pagination>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="no" ref="no">
          <el-input v-model="edit1" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="身份" prop="name" ref="name">
          <el-input v-model="edit2" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="电话" prop="type" ref="type">
          <el-input v-model="edit3" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="编号" prop="erweima" ref="erweima">
          <el-input v-model="edit4" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="用户名" prop="num" ref="num">
          <el-input v-model="edit5" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="类别" prop="xuhao" ref="xuhao">
          <el-input v-model="edit6" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="address" ref="address">
          <el-input v-model="edit7" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="状态" prop="ccid" ref="ccid">
          <el-input v-model="edit8" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="edit9" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
// import table from 'mock/table'


export default {
  name: 'Setting',
  data(){
    return{
      total: 0,
      temp: 0,
      listLoading: true,
        tableData: [],
        dataform: {
            realName: '',
            roleName: '',
            tel: '',
            id: '',
            userName: '',
            class: '',
            email: '',
            status: ''
        },
        pagesize: 10,
        current_page: 1,
        listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
        },
        edit1: '',
        edit2: '',
        edit3: '',
        edit4: '',
        edit5: '',
        edit6: '',
        edit7: '',
        edit8: '',
        edit9: '',
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
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted: function (){

    this.showDetails();

  },


  methods: {
    handleSizeChange(size){
      this.pagesize=size
      console.log(size)
      this.tableData.splice(0, 10)
        // console.log(currentPage)
      this.showDetails();
    },
    handleCurrentChange(current_page){
        this.current_page = current_page;
        this.tableData.splice(0, 15)
        // console.log(currentPage)
        this.showDetails();
    },
    showDetails(pageSize) {
        pageSize=this.current_page
        axios({
            method: 'POST',
            url: ' http://139.196.34.172:8000/gateway',
            data: {
                "method": "user.UserService.queryUserByPage",
                "bizRequest": {
                    "pageSize": this.pagesize,
                    "pageNum": pageSize
                }
            }
        }).then(response =>{
            // console.log(response);
            // console.log(response.data.bizResponse.bizData.data[0]);
            var i=0;
            this.total=response.data.bizResponse.bizData.total
            while(i<response.data.bizResponse.bizData.data.length)
            // this.temp=this.current_page*10<this.total?this.current_page*10:this.total
            // while(i<this.temp)
            {
                this.dataform=response.data.bizResponse.bizData.data[i];
                i++;
                this.tableData.push(this.dataform)
                // console.log(this.tableData[0])
            }
            // console.log(this.tableData[0])
            // console.log(this.dataform)
            // this.tableData.push(response.data.bizResponse.bizData.data)
        })
    },
    handleUpdate(row, index) {
      this.edit1 = this.tableData[index].realName
      this.edit2 = this.tableData[index].roleName
      this.edit3 = this.tableData[index].tel
      this.edit4 = this.tableData[index].id
      this.edit5 = this.tableData[index].userName
      this.edit6 = this.tableData[index].class
      this.edit7 = this.tableData[index].email
      this.edit8=this.tableData[index].status
      this.my_index = index
      this.my_row = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['tableData'].clearValidate()
      })
    },
    my_reset() {
      this.edit1 = ''
      this.edit2 = ''
      this.edit3 = ''
      this.edit4 = ''
      this.edit5 = ''
      this.edit6 = ''
      this.edit7 = ''
      this.edit8 = ''
      this.edit9 = ''
    },
    my_reset2() {
        axios({
        method: 'POST',
            url: ' http://139.196.34.172:8000/gateway',
            data: {
                "method": "user.UserService.addUser",
                "bizRequest": {
                    "realName": '',
                    "roleName": '',
                    // "id": list.id,
                    "tel": '',
                    "emial": '',
                    "userName": list.userName,
                    // "class": list.class,
                    // "status": list.status,
                    "loginFrom": 1,
                    "passWord": list.passWord
                }
            }
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
    handleCreate() {
      this.my_reset()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['tableData'].clearValidate()
      })
    },
    createData() {
      var list = {
        realName: this.edit1,
        roleName: this.edit2,
        tel: this.edit3,
        id: this.edit4,
        userName: this.edit5,
        class: this.edit6,
        email: this.edit7,
        status: this.edit8,
        passWord: this.edit9
      }
      // console.log(list)
      axios({
        method: 'POST',
            url: ' http://139.196.34.172:8000/gateway',
            data: {
                "method": "user.UserService.addUser",
                "bizRequest": {
                    "realName": list.realName,
                    "roleName": list.roleName,
                    // "id": list.id,
                    "tel": list.tel,
                    "emial": list.email,
                    "userName": list.userName,
                    // "class": list.class,
                    // "status": list.status,
                    "loginFrom": 1,
                    "passWord": list.passWord
                }
            }
      })
      // this.tableData.push(list)
      this.dialogFormVisible = false
      this.my_reset()
    },
    updateData() {
      var list1 = {
        realName: this.edit1,
        roleName: this.edit2,
        tel: this.edit3,
        id: this.edit4,
        userName: this.edit5,
        class: this.edit6,
        email: this.edit7,
        status: this.edit8
      }
      // console.log(list1)
      axios({
        method: 'POST',
            url: ' http://139.196.34.172:8000/gateway',
            data: {
                "method": "user.UserService.updateUserInfo",
                "bizRequest": {
                    "realName": list1.realName,
                    "roleName": list1.roleName,
                    "id": list1.id,
                    "tel": list1.tel,
                    "userName": list1.userName,
                    "emial": list1.email,
                    "loginFrom": 1
                }
            }
      }).then(response =>{
        console.log(response)
        this.dialogFormVisible = false
        // this.my_reset()
      })
      // this.tableData.splice(this.my_index, 1, list)
      
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
