<template>
  <div class="app-container">
    <div class="articleRead">
      <div class="container">
        <div class="content clearfix">
          <div class="articles right">
            <h2>{{info.title}}</h2>
            <p class="author"><span>发布者：{{info.writer}}</span><span>发布时间：{{info.time}}</span></p>
            <div class="abstract">
              <p><span>摘要：</span>{{info.desc}}</p>
            </div>
            <div class="contents" v-html="decodeURIComponent(info.body)">
              <!-- {{info.body}} -->
            </div>
            <p>
              <el-button type="primary" @click="edit">编辑</el-button>
              <el-button type="info" @click="cancel">取消</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {selectKuang, timeBox, UE} from '../../components/index'

  export default {
    name: 'add-edit',
    components: {
      selectKuang,
      timeBox,
      UE
    },
    data() {
      return {
        showPass: false,
        showReject: false,
        changeImg: '',
        newTitle: '',
        newBody: '',
        reTime: '',
        startTime: '',
        endTime: '',
        address: '',
        file: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        id: "",
        info: {},
        tableData3: [],
        multipleSelection: []
      }
    },
    methods: {
      edit() {
        console.log('aaaaaaaaaaaa')
        this.$router.push({name: 'kkip文章编辑'})
        console.log(this.id)
      },
      load: function () {
        var _this = this
        PUBLIC.get("Article.articles.message", {id: this.id}, function (data) {
          _this.info = data
        })
      },
      cancel() {
        this.$router.push({name: '文章列表'})
      },
      passIt() {
        console.log(this.showPass)
        this.showPass = !this.showPass
      },
      rejectIt() {
        this.showReject = !this.showReject
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      editAct() {
        var _this = this
        PUBLIC.get('Active.actives.publish', {
          title: this.newTitle,
          body: this.newBody,
          img: this.newImg,
          id: 2
        }, function (data) {
          console.log(data)
          PUBLIC.get('Active.actives.updategrop', {
            id: 2,
            end_time: _this.endTime,
            start_time: _this.startTime,
            reg_end_time: _this.reTime,
            address: _this.address,
            reg_file: _this.file
          }, function (data) {
            console.log("第二层adjklasj")
          })
        })
      }

    },
    mounted() {
      this.id = this.$route.params.id
      this.load()
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .articleRead {
    background-position: 0px 80%;
    .container {
      background-position: -270px 100%;
      .content {
        margin-top: 10px;
        height: 1200px;
        .articles {
          margin-left: 200px;
          padding: 64px 63px;
          background-color: rgba(220, 220, 220, 0.2);
          width: 1300px;
          height: 1072px;
          h2 {
            font-weight: bold;
            text-align: center;
            font-size: 20px;
            line-height: 60px;
          }
          .author {
            display: flex;
            justify-content: space-around;
            line-height: 60px;
            span {
              color: #7e8c8d;
            }
          }
          .abstract {
            padding: 20px 0;
            background-color: #F2F2F2;
            span {
              font-weight: bold
            }
          }
          .contents {
            margin-top: 40px
          }
          >p {
            margin-top: 100px;
            text-align: center;
            button{
              width: 100px;
              margin: 0 30px;
            }
          }
        }
      }
    }
  }

</style>

