<template>
  <div class="compInfo">
    <div class="memberInfo">
      <p><span><span class="title">单位类型:</span><span class="innerText"><span v-if="compInfo.user_type == 0">幼儿园</span><span v-else>执教机构</span></span></span><span><span class="title">单位名称:</span><span class="innerText">{{compInfo.company_name}}</span></span></p>

      <p><span><span class="title">单位简称:</span><span class="innerText">{{compInfo.company_jc}}</span></span><span><span class="title">单位地址</span><span class="innerText">{{compInfo.adress}}({{JSON.parse(this.compInfo.gps)['x']}},{{JSON.parse(this.compInfo.gps)['y']}})</span></span></p>
      <p><span><span class="title">负责人:</span><span class="innerText">{{compInfo.company_user}}</span></span><span><span class="title">联系电话:</span><span class="innerText">{{compInfo.company_mall}}</span></span></p>
      <!--<p><span><span class="title">合同编号:</span><span class="innerText">{{compInfo.contract_num}}</span></span><span><span class="title">合同文件:</span><span class="innerText">{{compInfo.contract_doc}}-->
      <!--<a :href="compInfo.contract_doc" download="">下载文件</a></span></span></p>-->
      <p><span><span class="title">创建者实名:</span><span class="innerText">{{compInfo.shenq_name}}</span></span><span><span class="title">身份证号码:</span><span class="innerText">{{compInfo.idNum}}</span></span></p>
      <p><span><span class="title">认证密钥 :</span><span class="innerText">{{compInfo.username}}</span></span></p>
      <p class="rzzl"><span><span class="title">认证资料 :</span><img :src="JSON.parse(this.compInfo.user_zl)['yyzz']" alt=""><img :src="JSON.parse(this.compInfo.user_zl)['khxk']" alt=""></span></p>
      <p><el-button type="success" @click="passIt">通过</el-button><el-button type="danger" @click="rejectIt">拒绝</el-button><el-button type="info" @click="cancelIt">取消</el-button></p>

      <div class="pass" v-show="showPass">
        <h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>
        <div class="inner">
          <p>&emsp;处理人：  {{admin[0]}}</p>
          <p>处理备注：
            <el-input
              type="textarea"
              v-model="successDesc"
              :rows="2"
              placeholder="请输入通过原因！">
            </el-input>
          </p>
          <p><el-button type="success" @click="passUp">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>
        </div>
      </div>
      <div class="reject" v-show="showReject">
        <h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>
        <div class="inner">
          <p>&emsp;处理人： {{admin[0]}} </p>
          <p>处理备注：
            <el-input
              type="textarea"
              :rows="2"
              v-model="rejectDesc"
              placeholder="请输入拒绝原因！">
            </el-input>
          </p>
          <p><el-button type="danger" @click="rejectUp">拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { selectKuang } from '../../../components/index'

  export default {
    name: 'compInfo',
    components: {
      selectKuang
    },
    data() {
      return {
        id: '',
        showIt: false,
        showPass: false,
        showReject: false,
        successDesc: '',
        rejectDesc: '',
        allData: [],
        compInfo: [],
        schoolGroup: [],
        codeGroup: [],
        child_account: '',
        end_time: '',
        addTime: '',
        generate_time: '',
        welCode: '',
        use_state: '',
        multipleSelection: [],
        codeHis:[],
        use_status_dict:{
          "0":"未使用",
          "1":"已使用",
          "-1":"已过期",
        },
        shouquan: [],
        admin:[],
        x: '',
        y: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      passIt() {
        this.showPass = !this.showPass
      },
      passUp() {
        PUBLIC.get('User.Examine.shenhe', { id: this.id, user_statu: 1, user_beizhu: this.rejectDesc, user_uid: this.admin[1] }, (data) => {
          console.log(data)
          this.$router.push({name:'园所审核'})
        })
      },
      rejectIt() {
        this.showReject = !this.showReject
      },
      rejectUp() {
        PUBLIC.get('User.Examine.shenhe', { id: this.id, user_statu: -1, user_beizhu: this.rejectDesc, user_uid: this.admin[1] }, data => {
          this.$router.push({name:'园所审核'})
        })
      },
      addCode() {
        this.addTime = PUBLIC.getTime()
        // this.use_state = 0
        this.welCode=""
        var chars = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9','0']
        for(var i = 0; i < 8; i ++) {
          var code = Math.ceil(Math.random() * 10)
          console.log(code)
          console.log(this.welCode)
          this.welCode += chars[code]
        }
        // return
        let year = this.end_time.getFullYear();
        let month = this.end_time.getMonth()+1;    //js从0开始取
        let date1 = this.end_time.getDate();
        let hour = this.end_time.getHours();
        let minutes = this.end_time.getMinutes();
        let second = this.end_time.getSeconds();
        let endTime = year+ "-" +month+ "-" +date1+ " " +'0'+hour+ ":" + '0'+minutes + ":" +'0'+second
        this.end_time = endTime
        console.log(this.end_time)
        var codes = { time: this.addTime, end_time: this.end_time, child_account: this.child_account }
        this.codeGroup.push(codes)
        this.showIt = !this.showIt
      },
      getcompInfo(id, uid) {
        var _this = this
        this.shouquan=[]
        console.log(id)
        PUBLIC.get('User.Examine.selinfo', { id: id }, (data) => {
          console.log(data)
          PUBLIC.get('User.User.Userone', {uid: uid}, v => {
            data['idNum'] = v.rel_code
            this.compInfo = data
          })
        })
      },
      saveIt() {
        PUBLIC.get('User.Mechanism.Updatecode', {
          id: this.allData.id, code: this.welCode, generate_time: this.addTime, end_time: this.end_time, subaccount_num: this.child_account, use_state: 0
        }, (data) => {
          // _this.code = data.key
          // _this.ugetMoney = data.reduce_num
          this.getcompInfo(this.allData.id)
          // this.$router.push({name:'园所审核',query: { page: this.page }})
          this.$router.go(-1)
          console.log(data)
        })
        // this.$router.go(-1)
      },
      cancelIt() {
        this.$router.go(-1)
      },
      setCodeStatus(id,status){
        var _this=this
        PUBLIC.get("User.Mechanism.jycode",{id:id,on_statu:status},function(data){
          _this.getcompInfo(id)
        })
      }
    },
    mounted() {
      DATAC.setConf(this)
      this.page = this.$route.params.page
      this.id = this.$route.params.id
      this.uid = this.$route.params.uid
      // console.log(localStorage.getItem('userInfo'))
      this.admin[0] =  JSON.parse(localStorage.getItem('userInfo')).rel_name
      this.admin[1] =  JSON.parse(localStorage.getItem('userInfo')).Id
      console.log(this.admin)
      this.getcompInfo(this.id,this.uid)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .compInfo{
    padding: 120px 430px;
    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        span{
          display: inline-block;
          span{
            display: inline-block;
          }
          .title{
            width: 100px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 260px;
            vertical-align: top;
          }
        }
        >span{
          padding-bottom: 55px;
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .jianjie{
        .text{
          display: inline-block;
          margin-left: 100px;
          margin-top: -30px;
        }
      }
      .rzzl{
        img{
          width: 220px;
          height: 120px;
          margin-right: 20px;
          vertical-align: text-top;
        }
      }
      .addBtn{
        margin-top: -47px;
        margin-left: 100px;
        .el-button{
          width: 200px;
          margin-bottom: 55px;
        }
      }
      p:last-of-type {
        padding-top: 100px;
        text-align: center;
        .el-button{
          margin: 0 8%;
          width: 100px;
        }
      }
    }
    .generateBox{
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
      h3{
        background-color: #E4E4E4;
        padding: 15px;
        .fa{
          float: right;
          font-size: 18px;
          padding: 0 10px;
        }
        .fa:hover{
          color: #518BBD;
        }
      }
      .inner{
        padding:36px 80px;
        p{
          padding-bottom: 30px;
          .el-input{
            width: 200px;
          }
        }
        p:last-of-type{
          text-align: center;
          margin-top: 40px;
          >button{
            width: 120px;
          }
        }
      }
    }
    .reject,.pass{
      z-index: 100;
      width: 500px;
      height: 400px;
      font-size: 14px;
      background-color: #fff;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -250px;
      h3{
        background-color: #E4E4E4;
        padding: 15px;
        .fa{
          float: right;
          font-size: 18px;
          padding: 0 10px;
        }
        .fa:hover{
          color: #518BBD;
        }
      }
      .inner{
        padding:36px 16px;
        p{
          padding-bottom: 30px;
          .el-textarea{
            vertical-align: top;
            width: 300px;
            display: inline-block;
          }
          img{
            vertical-align:top;
            width: 140px;
            height: 80px;
            border: 1px solid #cccccc;
            display: inline-block;
          }
          button{
            vertical-align:bottom;
            margin-left: 50px;
          }
        }
        p:last-of-type{
          button{
            width: 120px;
            margin-left: 75px;
          }
        }
      }
    }
    .reject {
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:red;

      }
    }
  }
</style>


<!--<template>-->
  <!--<div class="schoolInfo">-->
    <!--<div class="memberInfo">-->
      <!--<p><span><span class="title">单位名称:</span><span class="innerText">{{schoolInfo.name}}</span></span><span><span class="title">负责人:</span><span class="innerText">{{schoolInfo.username}}</span></span></p>-->
      <!--<p><span><span class="title">联系电话:</span><span class="innerText">{{schoolInfo.user_phone}}</span></span></p>-->
      <!--<p><span><span class="title">合同编号:</span><span class="innerText">{{schoolInfo.contract_num}}</span></span><span><span class="title">合同文件:</span><span class="innerText">{{schoolInfo.contract_doc}}<a href="">下载文件</a></span></span></p>-->
      <!--<p><span><span class="title">授权类目:</span><span class="innerText">{{shouquan}}</span></span></p>-->
      <!--<p><span><span class="title">邀请码 :</span><span class="innerText">{{schoolInfo.code}}</span></span><span><span class="title">提交时间 :</span><span class="innerText">{{schoolInfo.time}}</span></span></p>-->
      <!--<p><span><span class="title">认证资料:</span><span v-for="pic in examPic"><img :src="pic" alt=""></span></span></p>-->
      <!--<p v-if="isRec === false"><span><span class="title">认证状态:</span><span><span v-if="schoolInfo.rec_status == '1'" >审核已通过</span><span  v-else-if="schoolInfo.rec_status == '-1'" >审核未通过</span><span v-else >未审核</span></span></span></p>-->
      <!--&lt;!&ndash; /<span v-else >未审核</span>   v-if="isCheck===true"&ndash;&gt;-->
      <!--<p><el-button type="success" @click="passIt" v-show="isRec">通过</el-button><el-button type="danger" @click="rejectIt" v-show="isRec">拒绝</el-button><el-button type="info" @click="cancelIt">取消</el-button></p>-->
    <!--</div>-->
    <!--<div class="pass" v-show="showPass">-->
      <!--<h3>信息编辑 <i class="fa fa-close" @click="passIt"></i></h3>-->
      <!--<div class="inner">-->
        <!--<p>&emsp;处理人：  {{admin}}</p>-->
        <!--<p>处理备注：-->
          <!--<el-input-->
            <!--type="textarea"-->
            <!--v-model="successDesc"-->
            <!--:rows="2"-->
            <!--placeholder="请输入通过原因！">-->
          <!--</el-input>-->
        <!--</p>-->
        <!--<p><el-button type="success" @click="passUp">提交</el-button><el-button type="info" @click="passIt">取消</el-button></p>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="reject" v-show="showReject">-->
      <!--<h3>信息编辑 <i class="fa fa-close" @click="rejectIt"></i></h3>-->
      <!--<div class="inner">-->
        <!--<p>&emsp;处理人： {{admin}} </p>-->
        <!--<p>处理备注：-->
          <!--<el-input-->
            <!--type="textarea"-->
            <!--:rows="2"-->
            <!--v-model="rejectDesc"-->
            <!--placeholder="请输入拒绝原因！">-->
          <!--</el-input>-->
        <!--</p>-->
        <!--<p><el-button type="danger" @click="rejectUp">拒绝</el-button><el-button type="info" @click="rejectIt">取消</el-button></p>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import { selectKuang } from '../../../components/index'-->

  <!--export default {-->
    <!--name: 'addMember',-->
    <!--components: {-->
      <!--selectKuang-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--showPass: false,-->
        <!--showReject: false,-->
        <!--isRec: true,-->
        <!--isCheck: '',-->
        <!--id: '',-->
        <!--admin: '',-->
        <!--schoolInfo: {},-->
        <!--multipleSelection: [],-->
        <!--examPic: [],-->
        <!--successDesc: '',-->
        <!--rejectDesc: '',-->
        <!--classList: [],-->
        <!--shouquan: []-->
      <!--}-->
    <!--},-->
    <!--created() {-->
      <!--this.admin = JSON.parse(localStorage.userInfo).name-->
    <!--},-->
    <!--methods: {-->
      <!--handleSelectionChange(val) {-->
        <!--this.multipleSelection = val-->
      <!--},-->
      <!--handleSizeChange(val) {-->
        <!--this.pagesize = val-->
      <!--},-->
      <!--handleCurrentChange(val) {-->
        <!--this.currentPage = val-->
      <!--},-->
      <!--cancelIt() {-->
        <!--this.$router.push({name:'园所审核',query: { page: this.page }})-->
      <!--},-->
      <!--getInfo() {-->
        <!--var s=this.his==true?"User.Mechanism.selhisone":"User.Mechanism.Selauth"-->
        <!--PUBLIC.get(s, { id: this.id }, (data) => {-->
          <!--console.log(data)-->
          <!--console.log(data.rec_status)-->
          <!--if(this.isCheck == true) {-->
            <!--this.isRec = false-->
          <!--}else {-->
            <!--if(data.rec_status === '0') {-->
              <!--console.log('aaaaaaaaaaaa')-->
              <!--this.isRec = true-->
            <!--}else{-->
              <!--this.isRec = false-->
            <!--}-->
          <!--}-->
          <!--this.schoolInfo = data-->
          <!--console.log(this)-->
          <!--var SQlist = this.schoolInfo.auth_dir.split(",")-->
          <!--PUBLIC.get('Video.drama.classlist', data =>{-->
            <!--console.log(data)-->
            <!--for(var i in data) {-->
              <!--this.classList.push({value: data[i].id, label: data[i].class })-->
              <!--console.log(this.classList[i])-->
              <!--for(var a in SQlist) {-->
                <!--console.log(SQlist[a])-->
                <!--if(SQlist[a] == this.classList[i].value) {-->
                  <!--this.shouquan.push(this.classList[i].label)-->
                <!--}-->
              <!--}-->
            <!--}-->
          <!--})-->
          <!--this.examPic = JSON.parse(data.img)-->
        <!--})-->
      <!--},-->
      <!--passIt() {-->
        <!--this.showPass = !this.showPass-->
      <!--},-->
      <!--passUp() {-->
        <!--PUBLIC.get('User.Mechanism.Updauth', { id: this.id, status: 1, beizhu: this.successDesc }, (data) => {-->
          <!--if(data == true) {-->
            <!--this.$message('审核提交成功！');-->
            <!--this.$router.push({name:'园所审核',query: { page: this.page }})-->
          <!--} else  {-->
            <!--this.$message('该视频已为通过状态，请勿重复操作！');-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--rejectIt() {-->
        <!--this.showReject = !this.showReject-->
      <!--},-->
      <!--rejectUp() {-->
        <!--PUBLIC.get('User.Mechanism.Updauth', { id: this.id, status: -1, beizhu: this.rejectDesc }, data => {-->
          <!--console.log(data)-->
          <!--if(data == true) {-->
            <!--this.$message('拒绝审核成功！');-->
            <!--setTimeout(() =>{-->
              <!--console.log( this.page)-->
              <!--this.$router.push({name:'园所审核',query: { page: this.page }})-->
            <!--}, 1000)-->
          <!--} else {-->
            <!--this.$message('该视频已为拒绝状态，请勿重复操作！');-->
          <!--}-->
          <!--console.log(data)-->
        <!--})-->

      <!--},-->
    <!--},-->
    <!--mounted() {-->
      <!--this.page = this.$route.params.page-->
      <!--this.id = this.$route.params.id-->
      <!--console.log(this.$route.params.id.indexOf('check'))-->
      <!--if(this.$route.params.check != 1) {-->
        <!--this.isCheck = false-->
        <!--// this.isRec=true-->
      <!--}else{-->
        <!--this.isCheck = true-->
      <!--}-->
      <!--this.his=this.$route.params.id.indexOf('His')== -1?false:true-->
      <!--console.log(this.id)-->
      <!--this.getInfo()-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style rel="stylesheet/scss" lang="scss" >-->
  <!--.schoolInfo{-->
    <!--padding: 120px 470px;-->
    <!--.memberInfo{-->
      <!--font-size: 14px;-->
      <!--p {-->
        <!--text-align: left;-->
        <!--span{-->
          <!--display: inline-block;-->
          <!--span{-->
            <!--display: inline-block;-->
          <!--}-->
          <!--.title{-->
            <!--vertical-align: top;-->
            <!--width: 80px;-->
            <!--text-align: right;-->
            <!--padding-right: 10px;-->
          <!--}-->
          <!--img{-->
            <!--height: 300px;-->
            <!--margin-left: 80px;-->
          <!--}-->
          <!--/*img:nth-of-type(1),img:nth-of-type(2){*/-->
          <!--/**/-->
          <!--/*}*/-->
          <!--.innerText{-->
            <!--width: 200px;-->
          <!--}-->
        <!--}-->
        <!--&gt;span{-->
          <!--padding-bottom: 55px;-->
        <!--}-->
        <!--&gt;span:first-of-type{-->
          <!--margin-right: 70px;-->
        <!--}-->
      <!--}-->
      <!--.addBtn{-->
        <!--margin-top: -47px;-->
        <!--margin-left: 100px;-->
        <!--.el-button{-->
          <!--width: 200px;-->
          <!--margin-bottom: 55px;-->
        <!--}-->
      <!--}-->
      <!--p:last-of-type {-->
        <!--padding-top: 60px;-->
        <!--text-align: center;-->
        <!--.el-button{-->
          <!--margin: 0 8%;-->
          <!--width: 100px;-->
        <!--}-->
      <!--}-->
    <!--}-->
    <!--.reject,.pass{-->
      <!--z-index: 100;-->
      <!--width: 500px;-->
      <!--height: 400px;-->
      <!--font-size: 14px;-->
      <!--background-color: #fff;-->
      <!--position: fixed;-->
      <!--top: 20%;-->
      <!--left: 50%;-->
      <!--margin-left: -250px;-->
      <!--h3{-->
        <!--background-color: #E4E4E4;-->
        <!--padding: 15px;-->
        <!--.fa{-->
          <!--float: right;-->
          <!--font-size: 18px;-->
          <!--padding: 0 10px;-->
        <!--}-->
        <!--.fa:hover{-->
          <!--color: #518BBD;-->
        <!--}-->
      <!--}-->
      <!--.inner{-->
        <!--padding:36px 16px;-->
        <!--p{-->
          <!--padding-bottom: 30px;-->
          <!--.el-textarea{-->
            <!--vertical-align: top;-->
            <!--width: 300px;-->
            <!--display: inline-block;-->
          <!--}-->
          <!--img{-->
            <!--vertical-align:top;-->
            <!--width: 140px;-->
            <!--height: 80px;-->
            <!--border: 1px solid #cccccc;-->
            <!--display: inline-block;-->
          <!--}-->
          <!--button{-->
            <!--vertical-align:bottom;-->
            <!--margin-left: 50px;-->
          <!--}-->
        <!--}-->
        <!--p:last-of-type{-->
          <!--button{-->
            <!--width: 120px;-->
            <!--margin-left: 75px;-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
    <!--.reject {-->
      <!--input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {-->
        <!--color:red;-->

      <!--}-->
    <!--}-->
  <!--}-->

<!--</style>-->
