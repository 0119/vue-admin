<!-- 第一部分 -->
<template>
    <!-- 必须有一层父元素 -->
    <div id="login"> .
        <!-- 内容区 -->
        <!-- 两个按钮的整体样式 -->
        <div class="login-wrap">
            <ul class="menu-tab">
                <!-- 循环数组menuTab的值 v-for="item in 数组名"  :key="item.id(唯一的key)" -->
                <!-- 想要判断样式是否使用 :class="{'样式名': 变量}"   占位符 {{item.变量}}-->
                <!-- 点击函数@click="toggleMenu(变量或数组)" -->
                <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

            <el-form-item prop="username" class="item-from">
                <label>邮箱</label>
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
                <label>密码</label>
            <el-form-item prop="password" class="item-from">
                <!-- 密码最低6位，最高20位 -->
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
                <label>验证码</label>
                <el-form-item prop="code" class="item-from">
                <el-row :gutter="10">
                <el-col :span="15">
                    <!-- 验证码最小6位，最大6位 -->
                     <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                </el-col>
                <el-col :span="9">
                    <el-button type="success" class="block">获取验证码</el-button>
                </el-col>
                </el-row>
                
               
            </el-form-item>

            <el-form-item>
                <!--  css组合 -->
                <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
            </el-form-item>
            </el-form>
            <!-- 表单结束 -->
        </div>
    </div>
</template>
<!-- 第二部分 -->
<script>
import {stripscript} from '@/utils/validate.js';
export default{
    // 当前的名称
    name: 'login',
    // 数据，绑定数据时使用
    data(){
        // 表单data开始
      // 验证用户名
      var validateUsername = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
            callback(new Error('用户名格式有误'));
        }else {
          callback(); //true
        }
      };
      // 验证密码
      var validatePassword = (rule, value, callback) => {

        // 过滤后数据
        this.ruleForm.password = stripscript(value)

          let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6至20位的数字+字母'));
        } else {
          callback();
        }
      };
      // 验证验证码
        var validateCode = (rule, value, callback) => { 
        // 过滤后数据
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
        let reg = /^[a-z0-9]{6}$/
        if (value==='') {
          return callback(new Error('请输入验证码'));
        } else if(!reg.test(value)) {
            return callback(new Error('验证码格式有误'));
        } else {
            return callback();
        }
      };
      
        // 表单data结束

        // 返回数据
        return {
            // 一个数组menuTab
            menuTab:[
                {txt:'登录',current:true},
                {txt:'注册',current:false}
            ],
             // 表单return开始
        ruleForm: {
          username: '',
          password: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
            // 表单return结束
        }
    },
    // 创建完成后自动执行
    created(){},
    // 挂在完成后自动执行
    mounted(){},
    // 定义函数区域
    methods:{
        // 点击函数
        toggleMenu(data) {
            // 循环menuTab数组
            this.menuTab.forEach(element => {
                // 将两个按钮的current变为false，清除高光
                element.current = false
            });
            // 将当前点击按钮的current变为true，高光
            data.current=true
        },
          submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>
<!-- 第三部分 -->
<!-- scoped表示样式只在当前vue文件生效 -->
<style lang="scss" scoped>
// 网页整体样式
#login{
    // 铺满全屏
    height: 100vh; // vh基于可视区的比例
    // 设置背景颜色
    background-color:#344a5f;
}
// 登陆注册按钮外部块
.login-wrap{
    // 宽330像素
    width: 330px;
    // 块级元素水平居中
    margin:auto;
}
// 登录注册按钮样式
.menu-tab{
    // 文本水平对齐
    text-align:center;
    li{
        display:inline-block;
        width: 88px;
        line-height: 36px;
        font-size:14px;
        color:#fff;
        border-radius:2px;
        cursor: pointer;
    }
    // 登录注册按钮背景颜色
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
// 表单样式
.login-form{
    margin-top:29px;
    label{
        // 变为块元素
        display: block;
        margin-bottom: 3px;
        font-size:14px;
        color:#fff;
    }
    .item-from{margin-bottom: 18px;}
    // 定义为块元素
    .block{
        // 100%宽度
        width: 100%;
        display:block;
    }
    .login-btn{margin-top:19px;}
}
</style>
