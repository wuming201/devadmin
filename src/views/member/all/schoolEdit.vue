<template>
  <div class="schoolInfo">
    <div class="memberInfo">
      <p class="name"><span><span class="title">幼儿园名称:</span><el-input v-model="sname"></el-input></span></p>
      <p><span><span class="title">幼儿园简称:</span><span class="innerText"><el-input v-model="scontractId"></el-input></span></span><span><span class="title">创建者ID:</span><span class="innerText"><el-input v-model="scontractId" disabled></el-input></span></span></p>
      <p><span><span class="title">联系电话:</span><span class="innerText"><el-input v-model="stelphone"></el-input></span>{{phoneStatusText}}</span>
        <span><span class="title">负责人:</span><span class="innerText"><el-input v-model="susername"></el-input></span></span></p>
      <p class="address"><span><span class="title">幼儿园地址:</span><el-input class="city" placeholder="城市" v-model="stelphone" disabled></el-input><el-input class="info" placeholder="详细地址" v-model="susername" disabled></el-input></span></p>
      <!--<p class="duoxuan"><span><span class="title">授权类目:</span>-->
      <!--<span>-->
      <!--<el-checkbox-group v-model="checkedAuthorize">-->
      <!--<el-checkbox v-for="authorize in videoClass" :label="authorize.value" :key="authorize.value">{{authorize.label}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
      <!--</span>-->
      <!--</span></p>-->
      <p><el-button type="success" @click="save1">保存</el-button><el-button type="info" @click="quit">取消</el-button></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolEdit',
    data() {
      return {
        showIt: false,
        multipleSelection: [],
        isIndeterminate: true,
        checkedAuthorize: [],
        videoClass: [],
        schoolInfo: [],
        yname: "",
        id: '',
        page: 0,
        region:[],
      region1: [
    { label: '北京', value: 'BeiJing', children: [{ label: '北京', children: [{label:'东城区',children:[]},{label:'西城区',children:[]},{label:'崇文区',children:[]},{label:'宣武区',children:[]},{label:'朝阳区',children:[]},{label:'丰台区',children:[]},{label:'石景山区',children:[]},{label:'海淀区',children:[]},{label:'门头沟区',children:[]},{label:'房山区',children:[]},{label:'通州区',children:[]},{label:'顺义区',children:[]},{label:'昌平区',children:[]},{label:'大兴区',children:[]},{label:'平谷区',children:[]},{label:'怀柔区',children:[]},{label:'密云县',children:[]},{label:'延庆县',children:[]}]}]},

    { label: '天津', value: 'TianJin', children: [{ label: '天津', children: [{label:'和平区',children:[]},{label:'河东区',children:[]},{label:'河西区',children:[]},{label:'南开区',children:[]},{label:'河北区',children:[]},{label:'红桥区',children:[]},{label:'塘沽区',children:[]},{label:'汉沽区',children:[]},{label:'大港区',children:[]},{label:'东丽区',children:[]},{label:'西青区',children:[]},{label:'津南区',children:[]},{label:'北辰区',children:[]},{label:'武清区',children:[]},{label:'宝坻区',children:[]},{label:'宁河县',children:[]},{label:'静海县',children:[]},{label:'蓟  县',children:[]}]}]},

    {
        label: '河北',
        value: 'HeBei',
        children: [
            { label: '石家庄', children: [{label:'长安区',children:[]},{label:'桥东区',children:[]},{label:'桥西区',children:[]},{label:'新华区',children:[]},{label:'郊  区',children:[]},{label:'井陉矿区',children:[]},{label:'井陉县',children:[]},{label:'正定县',children:[]},{label:'栾城县',children:[]},{label:'行唐县',children:[]},{label:'灵寿县',children:[]},{label:'高邑县',children:[]},{label:'深泽县',children:[]},{label:'赞皇县',children:[]},{label:'无极县',children:[]},{label:'平山县',children:[]},{label:'元氏县',children:[]},{label:'赵  县',children:[]},{label:'辛集市',children:[]},{label:'藁',children:[]},{label:'晋州市',children:[]},{label:'新乐市',children:[]},{label:'鹿泉市',children:[]}]},

            { label: '唐山', children: [{label:'路南区',children:[]},{label:'路北区',children:[]},{label:'古冶区',children:[]},{label:'开平区',children:[]},{label:'新  区',children:[]},{label:'丰润县',children:[]},{label:'滦  县',children:[]},{label:'滦南县',children:[]},{label:'乐亭县',children:[]},{label:'迁西县',children:[]},{label:'玉田县',children:[]},{label:'唐海县',children:[]},{label:'遵化市',children:[]},{label:'丰南市',children:[]},{label:'迁安市',children:[]}]},

            { label: '秦皇岛', children: [{label:'海港区',children:[]},{label:'山海关区',children:[]},{label:'北戴河区',children:[]},{label:'青龙满族自治县',children:[]},{label:'昌黎县',children:[]},{label:'抚宁县',children:[]},{label:'卢龙县',children:[]}]},

            { label: '邯郸', children: [{label:'邯山区',children:[]},{label:'丛台区',children:[]},{label:'复兴区',children:[]},{label:'峰峰矿区',children:[]},{label:'邯郸县',children:[]},{label:'临漳县',children:[]},{label:'成安县',children:[]},{label:'大名县',children:[]},{label:'涉  县',children:[]},{label:'磁  县',children:[]},{label:'肥乡县',children:[]},{label:'永年县',children:[]},{label:'邱  县',children:[]},{label:'鸡泽县',children:[]},{label:'广平县',children:[]},{label:'馆陶县',children:[]},{label:'魏  县',children:[]},{label:'曲周县',children:[]},{label:'武安市',children:[]}]},

            { label: '邢台', children: [{label:'桥东区',children:[]},{label:'桥西区',children:[]},{label:'邢台县',children:[]},{label:'临城县',children:[]},{label:'内丘县',children:[]},{label:'柏乡县',children:[]},{label:'隆尧县',children:[]},{label:'任  县',children:[]},{label:'南和县',children:[]},{label:'宁晋县',children:[]},{label:'巨鹿县',children:[]},{label:'新河县',children:[]},{label:'广宗县',children:[]},{label:'平乡县',children:[]},{label:'威  县',children:[]},{label:'清河县',children:[]},{label:'临西县',children:[]},{label:'南宫市',children:[]},{label:'沙河市',children:[]}]},

            { label: '保定', children: [{label:'新市区',children:[]},{label:'北市区',children:[]},{label:'南市区',children:[]},{label:'满城县',children:[]},{label:'清苑县',children:[]},{label:'涞水县',children:[]},{label:'阜平县',children:[]},{label:'徐水县',children:[]},{label:'定兴县',children:[]},{label:'唐  县',children:[]},{label:'高阳县',children:[]},{label:'容城县',children:[]},{label:'涞源县',children:[]},{label:'望都县',children:[]},{label:'安新县',children:[]},{label:'易  县',children:[]},{label:'曲阳县',children:[]},{label:'蠡  县',children:[]},{label:'顺平县',children:[]},{label:'博野',children:[]},{label:'雄县',children:[]},{label:'涿州市',children:[]},{label:'定州市',children:[]},{label:'安国市',children:[]},{label:'高碑店市',children:[]}]},

            { label: '张家口', children: [{label:'桥东区',children:[]},{label:'桥西区',children:[]},{label:'宣化区',children:[]},{label:'下花园区',children:[]},{label:'宣化县',children:[]},{label:'张北县',children:[]},{label:'康保县',children:[]},{label:'沽源县',children:[]},{label:'尚义县',children:[]},{label:'蔚  县',children:[]},{label:'阳原县',children:[]},{label:'怀安县',children:[]},{label:'万全县',children:[]},{label:'怀来县',children:[]},{label:'涿鹿县',children:[]},{label:'赤城县',children:[]},{label:'崇礼县',children:[]}]},

            { label: '承德', children: [{label:'双桥区',children:[]},{label:'双滦区',children:[]},{label:'鹰手营子矿区',children:[]},{label:'承德县',children:[]},{label:'兴隆县',children:[]},{label:'平泉县',children:[]},{label:'滦平县',children:[]},{label:'隆化县',children:[]},{label:'丰宁满族自治县',children:[]},{label:'宽城满族自治县',children:[]},{label:'围场满族蒙古族自治县',children:[]}]},

            { label: '沧州', children: [{label:'新华区',children:[]},{label:'运河区',children:[]},{label:'沧  县',children:[]},{label:'青  县',children:[]},{label:'东光县',children:[]},{label:'海兴县',children:[]},{label:'盐山县',children:[]},{label:'肃宁县',children:[]},{label:'南皮县',children:[]},{label:'吴桥县',children:[]},{label:'献  县',children:[]},{label:'孟村回族自治县',children:[]},{label:'泊头市',children:[]},{label:'任丘市',children:[]},{label:'黄骅市',children:[]},{label:'河间市',children:[]}]},

            { label: '廊坊', children: [{label:'安次区',children:[]},{label:'固安县',children:[]},{label:'永清县',children:[]},{label:'香河县',children:[]},{label:'大城县',children:[]},{label:'文安县',children:[]},{label:'大厂回族自治县',children:[]},{label:'霸州市',children:[]},{label:'三河市',children:[]}]},

            { label: '衡水', children: [{label:'桃城区',children:[]},{label:'枣强县',children:[]},{label:'武邑县',children:[]},{label:'武强县',children:[]},{label:'饶阳县',children:[]},{label:'安平县',children:[]},{label:'故城县',children:[]},{label:'景  县',children:[]},{label:'阜城县',children:[]},{label:'冀州市',children:[]},{label:'深州市',children:[]}]}

        ]
    },

    {
        label: '山西',
        value: 'ShanXi',
        children: [

            { label: '太原', children: [{label:'小店区',children:[]},{label:'迎泽区',children:[]},{label:'杏花岭区',children:[]},{label:'尖草坪区',children:[]},{label:'万柏林区',children:[]},{label:'晋源区',children:[]},{label:'清徐县',children:[]},{label:'阳曲县',children:[]},{label:'娄烦县',children:[]},{label:'古交市',children:[]}]},

            { label: '大同', children: [{label:'城  区',children:[]},{label:'矿  区',children:[]},{label:'南郊区',children:[]},{label:'新荣区',children:[]},{label:'阳高县',children:[]},{label:'天镇县',children:[]},{label:'广灵县',children:[]},{label:'灵丘县',children:[]},{label:'浑源县',children:[]},{label:'左云县',children:[]},{label:'大同县',children:[]}]},

            { label: '阳泉', children: [{label:'城  区',children:[]},{label:'矿  区',children:[]},{label:'郊  区',children:[]},{label:'平定县',children:[]},{label:'盂  县',children:[]}]},

            { label: '长治', children: [{label:'城  区',children:[]},{label:'郊  区',children:[]},{label:'长治县',children:[]},{label:'襄垣县',children:[]},{label:'屯留县',children:[]},{label:'平顺县',children:[]},{label:'黎城县',children:[]},{label:'壶关县',children:[]},{label:'长子县',children:[]},{label:'武乡县',children:[]},{label:'沁  县',children:[]},{label:'沁源县',children:[]},{label:'潞城市',children:[]}]},

            { label: '晋城', children: [{label:'城  区',children:[]},{label:'沁水县',children:[]},{label:'阳城县',children:[]},{label:'陵川县',children:[]},{label:'泽州县',children:[]},{label:'高平市',children:[]}]},

            { label: '朔州', children: [{label:'朔城区',children:[]},{label:'平鲁区',children:[]},{label:'山阴县',children:[]},{label:'应  县',children:[]},{label:'右玉县',children:[]},{label:'怀仁县',children:[]}]},

            { label: '忻州', children: [{label:'忻府区',children:[]},{label:'原平市',children:[]},{label:'定襄县',children:[]},{label:'五台县',children:[]},{label:'代  县',children:[]},{label:'繁峙县',children:[]},{label:'宁武县',children:[]},{label:'静乐县',children:[]},{label:'神池县',children:[]},{label:'五寨县',children:[]},{label:'岢岚县',children:[]},{label:'河曲县',children:[]},{label:'保德县',children:[]},{label:'偏关县',children:[]}]},

            { label: '吕梁', children: [{label:'离石区',children:[]},{label:'孝义市',children:[]},{label:'汾阳市',children:[]},{label:'文水县',children:[]},{label:'交城县',children:[]},{label:'兴  县',children:[]},{label:'临  县',children:[]},{label:'柳林县',children:[]},{label:'石楼县',children:[]},{label:'岚  县',children:[]},{label:'方山县',children:[]},{label:'中阳县',children:[]},{label:'交口县',children:[]}]},

            { label: '晋中', children: [{label:'榆次市',children:[]},{label:'介休市',children:[]},{label:'榆社县',children:[]},{label:'左权县',children:[]},{label:'和顺县',children:[]},{label:'昔阳县',children:[]},{label:'寿阳县',children:[]},{label:'太谷县',children:[]},{label:'祁  县',children:[]},{label:'平遥县',children:[]},{label:'灵石县',children:[]}]},

            { label: '临汾', children: [{label:'临汾市',children:[]},{label:'侯马市',children:[]},{label:'霍州市',children:[]},{label:'曲沃县',children:[]},{label:'翼城县',children:[]},{label:'襄汾县',children:[]},{label:'洪洞县',children:[]},{label:'古  县',children:[]},{label:'安泽县',children:[]},{label:'浮山县',children:[]},{label:'吉  县',children:[]},{label:'乡宁县',children:[]},{label:'蒲  县',children:[]},{label:'大宁县',children:[]},{label:'永和县',children:[]},{label:'隰  县',children:[]},{label:'汾西县',children:[]}]},

            { label: '运城', children: [{label:'运城市',children:[]},{label:'永济市',children:[]},{label:'河津市',children:[]},{label:'芮城县',children:[]},{label:'临猗县',children:[]},{label:'万荣县',children:[]},{label:'新绛县',children:[]},{label:'稷山县',children:[]},{label:'闻喜县',children:[]},{label:'夏  县',children:[]},{label:'绛  县',children:[]},{label:'平陆县',children:[]},{label:'垣曲县',children:[]}]}

        ]
    },

    {
        label: '内蒙古',
        value: 'NeiMengGu',
        children: [

            { label: '呼和浩特', children: [{label:'新城区',children:[]},{label:'回民区',children:[]},{label:'玉泉区',children:[]},{label:'郊  区',children:[]},{label:'土默特左旗',children:[]},{label:'托克托县',children:[]},{label:'和林格尔县',children:[]},{label:'清水河县',children:[]},{label:'武川县',children:[]}]},

            { label: '包头', children: [{label:'东河区',children:[]},{label:'昆都伦区',children:[]},{label:'青山区',children:[]},{label:'石拐矿区',children:[]},{label:'白云矿区',children:[]},{label:'郊  区',children:[]},{label:'土默特右旗',children:[]},{label:'固阳县',children:[]},{label:'达尔罕茂明安联合旗',children:[]}]},

            { label: '乌海', children: [{label:'海勃湾区',children:[]},{label:'海南区',children:[]},{label:'乌达区',children:[]}]},

            { label: '赤峰', children: [{label:'红山区',children:[]},{label:'元宝山区',children:[]},{label:'松山区',children:[]},{label:'阿鲁科尔沁旗',children:[]},{label:'巴林左旗',children:[]},{label:'巴林右旗',children:[]},{label:'林西县',children:[]},{label:'克什克腾旗',children:[]},{label:'翁牛特旗',children:[]},{label:'喀喇沁旗',children:[]},{label:'宁城县',children:[]},{label:'敖汉旗',children:[]}]},

            { label: '呼伦贝尔', children: [{label:'海拉尔市',children:[]},{label:'满洲里市',children:[]},{label:'扎兰屯市',children:[]},{label:'牙克石市',children:[]},{label:'根河市',children:[]},{label:'额尔古纳市',children:[]},{label:'阿荣旗',children:[]},{label:'莫力达瓦达斡尔族自治旗',children:[]},{label:'鄂伦春自治旗',children:[]},{label:'鄂温克族自治旗',children:[]},{label:'新巴尔虎右旗',children:[]},{label:'新巴尔虎左旗',children:[]},{label:'陈巴尔虎旗',children:[]}]},

            { label: '兴安盟', children: [{label:'乌兰浩特市',children:[]},{label:'阿尔山市',children:[]},{label:'科尔沁右翼前旗',children:[]},{label:'科尔沁右翼中旗',children:[]},{label:'扎赉特旗',children:[]},{label:'突泉县',children:[]}]},

            { label: '通辽', children: [{label:'科尔沁区',children:[]},{label:'霍林郭勒市',children:[]},{label:'科尔沁左翼中旗',children:[]},{label:'科尔沁左翼后旗',children:[]},{label:'开鲁县',children:[]},{label:'库伦旗',children:[]},{label:'奈曼旗',children:[]},{label:'扎鲁特旗',children:[]}]},

            { label: '锡林郭勒盟', children: [{label:'二连浩特市',children:[]},{label:'锡林浩特市',children:[]},{label:'阿巴嘎旗',children:[]},{label:'苏尼特左旗',children:[]},{label:'苏尼特右旗',children:[]},{label:'东乌珠穆沁旗',children:[]},{label:'西乌珠穆沁旗',children:[]},{label:'太仆寺旗',children:[]},{label:'镶黄旗',children:[]},{label:'正镶白旗',children:[]},{label:'正蓝旗',children:[]},{label:'多伦县',children:[]}]},

            { label: '乌兰察布盟', children: [{label:'集宁市',children:[]},{label:'丰镇市',children:[]},{label:'卓资县',children:[]},{label:'化德县',children:[]},{label:'商都县',children:[]},{label:'兴和县',children:[]},{label:'凉城县',children:[]},{label:'察哈尔右翼前旗',children:[]},{label:'察哈尔右翼中旗',children:[]},{label:'察哈尔右翼后旗',children:[]},{label:'四子王旗',children:[]}]},

            { label: '伊克昭盟', children: [{label:'东胜市',children:[]},{label:'达拉特旗',children:[]},{label:'准格尔旗',children:[]},{label:'鄂托克前旗',children:[]},{label:'鄂托克旗',children:[]},{label:'杭锦旗',children:[]},{label:'乌审旗',children:[]},{label:'伊金霍洛旗',children:[]}]},

            { label: '巴彦淖尔盟', children: [{label:'临河市',children:[]},{label:'五原县',children:[]},{label:'磴口县',children:[]},{label:'乌拉特前旗',children:[]},{label:'乌拉特中旗',children:[]},{label:'乌拉特后旗',children:[]},{label:'杭锦后旗',children:[]}]},

            { label: '阿拉善盟', children: [{label:'阿拉善左旗',children:[]},{label:'阿拉善右旗',children:[]},{label:'额济纳旗',children:[]}]}

        ]
    },

    {
        label: '辽宁',
        value: 'LiaoNing',
        children: [

            { label: '沈阳', children: [{label:'沈河区',children:[]},{label:'皇姑区',children:[]},{label:'和平区',children:[]},{label:'大东区',children:[]},{label:'铁西区',children:[]},{label:'苏家屯区',children:[]},{label:'东陵区',children:[]},{label:'于洪区',children:[]},{label:'新民市',children:[]},{label:'法库县',children:[]},{label:'辽中县',children:[]},{label:'康平县',children:[]},{label:'新城子区',children:[]},{label:'其他',children:[]}]},

            { label: '大连', children: [{label:'西岗区',children:[]},{label:'中山区',children:[]},{label:'沙河口区',children:[]},{label:'甘井子区',children:[]},{label:'旅顺口区',children:[]},{label:'金州区',children:[]},{label:'瓦房店市',children:[]},{label:'普兰店市',children:[]},{label:'庄河市',children:[]},{label:'长海县',children:[]},{label:'其他',children:[]}]},

            { label: '鞍山', children: [{label:'铁东区',children:[]},{label:'铁西区',children:[]},{label:'立山区',children:[]},{label:'千山区',children:[]},{label:'海城市',children:[]},{label:'台安县',children:[]},{label:'岫岩满族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '抚顺', children: [{label:'顺城区',children:[]},{label:'新抚区',children:[]},{label:'东洲区',children:[]},{label:'望花区',children:[]},{label:'抚顺县',children:[]},{label:'清原满族自治县',children:[]},{label:'新宾满族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '本溪', children: [{label:'平山区',children:[]},{label:'明山区',children:[]},{label:'溪湖区',children:[]},{label:'南芬区',children:[]},{label:'本溪满族自治县',children:[]},{label:'桓仁满族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '丹东', children: [{label:'振兴区',children:[]},{label:'元宝区',children:[]},{label:'振安区',children:[]},{label:'东港市',children:[]},{label:'凤城市',children:[]},{label:'宽甸满族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '锦州', children: [{label:'太和区',children:[]},{label:'古塔区',children:[]},{label:'凌河区',children:[]},{label:'凌海市',children:[]},{label:'黑山县',children:[]},{label:'义县',children:[]},{label:'北宁市',children:[]},{label:'其他',children:[]}]},

            { label: '营口', children: [{label:'站前区',children:[]},{label:'西市区',children:[]},{label:'鲅鱼圈区',children:[]},{label:'老边区',children:[]},{label:'大石桥市',children:[]},{label:'盖州市',children:[]},{label:'其他',children:[]}]},

            { label: '阜新', children: [{label:'海州区',children:[]},{label:'新邱区',children:[]},{label:'太平区',children:[]},{label:'清河门区',children:[]},{label:'细河区',children:[]},{label:'彰武县',children:[]},{label:'阜新蒙古族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '辽阳', children: [{label:'白塔区',children:[]},{label:'文圣区',children:[]},{label:'宏伟区',children:[]},{label:'太子河区',children:[]},{label:'弓长岭区',children:[]},{label:'灯塔市',children:[]},{label:'辽阳县',children:[]},{label:'其他',children:[]}]},

            { label: '盘锦', children: [{label:'双台子区',children:[]},{label:'兴隆台区',children:[]},{label:'盘山县',children:[]},{label:'大洼县',children:[]},{label:'其他',children:[]}]},

            { label: '铁岭', children: [{label:'银州区',children:[]},{label:'清河区',children:[]},{label:'调兵山市',children:[]},{label:'开原市',children:[]},{label:'铁岭县',children:[]},{label:'昌图县',children:[]},{label:'西丰县',children:[]},{label:'其他',children:[]}]},

            { label: '朝阳', children: [{label:'双塔区',children:[]},{label:'龙城区',children:[]},{label:'凌源市',children:[]},{label:'北票市',children:[]},{label:'朝阳县',children:[]},{label:'建平县',children:[]},{label:'喀喇沁左翼蒙古族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '葫芦岛', children: [{label:'龙港区',children:[]},{label:'南票区',children:[]},{label:'连山区',children:[]},{label:'兴城市',children:[]},{label:'绥中县',children:[]},{label:'建昌县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '吉林',
        value: 'JiLin',
        children: [

            { label: '长春', children: [{label:'朝阳区',children:[]},{label:'宽城区',children:[]},{label:'二道区',children:[]},{label:'南关区',children:[]},{label:'绿园区',children:[]},{label:'双阳区',children:[]},{label:'九台市',children:[]},{label:'榆树市',children:[]},{label:'德惠市',children:[]},{label:'农安县',children:[]},{label:'其他',children:[]}]},

            { label: '吉林', children: [{label:'船营区',children:[]},{label:'昌邑区',children:[]},{label:'龙潭区',children:[]},{label:'丰满区',children:[]},{label:'舒兰市',children:[]},{label:'桦甸市',children:[]},{label:'蛟河市',children:[]},{label:'磐石市',children:[]},{label:'永吉县',children:[]},{label:'其他',children:[]}]},

            { label: '四平', children: [{label:'铁西区',children:[]},{label:'铁东区',children:[]},{label:'公主岭市',children:[]},{label:'双辽市',children:[]},{label:'梨树县',children:[]},{label:'伊通满族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '辽源', children: [{label:'龙山区',children:[]},{label:'西安区',children:[]},{label:'东辽县',children:[]},{label:'东丰县',children:[]},{label:'其他',children:[]}]},

            { label: '通化', children: [{label:'东昌区',children:[]},{label:'二道江区',children:[]},{label:'梅河口市',children:[]},{label:'集安市',children:[]},{label:'通化县',children:[]},{label:'辉南县',children:[]},{label:'柳河县',children:[]},{label:'其他',children:[]}]},

            { label: '白山', children: [{label:'八道江区',children:[]},{label:'江源区',children:[]},{label:'临江市',children:[]},{label:'靖宇县',children:[]},{label:'抚松县',children:[]},{label:'长白朝鲜族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '松原', children: [{label:'宁江区',children:[]},{label:'乾安县',children:[]},{label:'长岭县',children:[]},{label:'扶余县',children:[]},{label:'前郭尔罗斯蒙古族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '白城', children: [{label:'洮北区',children:[]},{label:'大安市',children:[]},{label:'洮南市',children:[]},{label:'镇赉县',children:[]},{label:'通榆县',children:[]},{label:'其他',children:[]}]},

            { label: '延边朝鲜族自治州', children: [{label:'延吉市',children:[]},{label:'图们市',children:[]},{label:'敦化市',children:[]},{label:'龙井市',children:[]},{label:'珲春市',children:[]},{label:'和龙市',children:[]},{label:'安图县',children:[]},{label:'汪清县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '黑龙江',
        value: 'HeiLongJiang',
        children: [

            { label: '哈尔滨', children: [{label:'松北区',children:[]},{label:'道里区',children:[]},{label:'南岗区',children:[]},{label:'平房区',children:[]},{label:'香坊区',children:[]},{label:'道外区',children:[]},{label:'呼兰区',children:[]},{label:'阿城区',children:[]},{label:'双城市',children:[]},{label:'尚志市',children:[]},{label:'五常市',children:[]},{label:'宾县',children:[]},{label:'方正县',children:[]},{label:'通河县',children:[]},{label:'巴彦县',children:[]},{label:'延寿县',children:[]},{label:'木兰县',children:[]},{label:'依兰县',children:[]},{label:'其他',children:[]}]},

            { label: '齐齐哈尔', children: [{label:'龙沙区',children:[]},{label:'昂昂溪区',children:[]},{label:'铁锋区',children:[]},{label:'建华区',children:[]},{label:'富拉尔基区',children:[]},{label:'碾子山区',children:[]},{label:'梅里斯达斡尔族区',children:[]},{label:'讷河市',children:[]},{label:'富裕县',children:[]},{label:'拜泉县',children:[]},{label:'甘南县',children:[]},{label:'依安县',children:[]},{label:'克山县',children:[]},{label:'泰来县',children:[]},{label:'克东县',children:[]},{label:'龙江县',children:[]},{label:'其他',children:[]}]},

            { label: '鹤岗', children: [{label:'兴山区',children:[]},{label:'工农区',children:[]},{label:'南山区',children:[]},{label:'兴安区',children:[]},{label:'向阳区',children:[]},{label:'东山区',children:[]},{label:'萝北县',children:[]},{label:'绥滨县',children:[]},{label:'其他',children:[]}]},

            { label: '双鸭山', children: [{label:'尖山区',children:[]},{label:'岭东区',children:[]},{label:'四方台区',children:[]},{label:'宝山区',children:[]},{label:'集贤县',children:[]},{label:'宝清县',children:[]},{label:'友谊县',children:[]},{label:'饶河县',children:[]},{label:'其他',children:[]}]},

            { label: '鸡西', children: [{label:'鸡冠区',children:[]},{label:'恒山区',children:[]},{label:'城子河区',children:[]},{label:'滴道区',children:[]},{label:'梨树区',children:[]},{label:'麻山区',children:[]},{label:'密山市',children:[]},{label:'虎林市',children:[]},{label:'鸡东县',children:[]},{label:'其他',children:[]}]},

            { label: '大庆', children: [{label:'萨尔图区',children:[]},{label:'红岗区',children:[]},{label:'龙凤区',children:[]},{label:'让胡路区',children:[]},{label:'大同区',children:[]},{label:'林甸县',children:[]},{label:'肇州县',children:[]},{label:'肇源县',children:[]},{label:'杜尔伯特蒙古族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '伊春', children: [{label:'伊春区',children:[]},{label:'带岭区',children:[]},{label:'南岔区',children:[]},{label:'金山屯区',children:[]},{label:'西林区',children:[]},{label:'美溪区',children:[]},{label:'乌马河区',children:[]},{label:'翠峦区',children:[]},{label:'友好区',children:[]},{label:'上甘岭区',children:[]},{label:'五营区',children:[]},{label:'红星区',children:[]},{label:'新青区',children:[]},{label:'汤旺河区',children:[]},{label:'乌伊岭区',children:[]},{label:'铁力市',children:[]},{label:'嘉荫县',children:[]},{label:'其他',children:[]}]},

            { label: '牡丹江', children: [{label:'爱民区',children:[]},{label:'东安区',children:[]},{label:'阳明区',children:[]},{label:'西安区',children:[]},{label:'绥芬河市',children:[]},{label:'宁安市',children:[]},{label:'海林市',children:[]},{label:'穆棱市',children:[]},{label:'林口县',children:[]},{label:'东宁县',children:[]},{label:'其他',children:[]}]},

            { label: '佳木斯', children: [{label:'向阳区',children:[]},{label:'前进区',children:[]},{label:'东风区',children:[]},{label:'郊区',children:[]},{label:'同江市',children:[]},{label:'富锦市',children:[]},{label:'桦川县',children:[]},{label:'抚远县',children:[]},{label:'桦南县',children:[]},{label:'汤原县',children:[]},{label:'其他',children:[]}]},

            { label: '七台河', children: [{label:'桃山区',children:[]},{label:'新兴区',children:[]},{label:'茄子河区',children:[]},{label:'勃利县',children:[]},{label:'其他',children:[]}]},

            { label: '黑河', children: [{label:'爱辉区',children:[]},{label:'北安市',children:[]},{label:'五大连池市',children:[]},{label:'逊克县',children:[]},{label:'嫩江县',children:[]},{label:'孙吴县',children:[]},{label:'其他',children:[]}]},

            { label: '绥化', children: [{label:'北林区',children:[]},{label:'安达市',children:[]},{label:'肇东市',children:[]},{label:'海伦市',children:[]},{label:'绥棱县',children:[]},{label:'兰西县',children:[]},{label:'明水县',children:[]},{label:'青冈县',children:[]},{label:'庆安县',children:[]},{label:'望奎县',children:[]},{label:'其他',children:[]}]},

            { label: '大兴安岭地区', children: [{label:'呼玛县',children:[]},{label:'塔河县',children:[]},{label:'漠河县',children:[]},{label:'大兴安岭辖区',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '上海',
        value: 'ShangHai',
        children: [

            { label: '上海', children: [{label:'黄浦区',children:[]},{label:'卢湾区',children:[]},{label:'徐汇区',children:[]},{label:'长宁区',children:[]},{label:'静安区',children:[]},{label:'普陀区',children:[]},{label:'闸北区',children:[]},{label:'虹口区',children:[]},{label:'杨浦区',children:[]},{label:'宝山区',children:[]},{label:'闵行区',children:[]},{label:'嘉定区',children:[]},{label:'松江区',children:[]},{label:'金山区',children:[]},{label:'青浦区',children:[]},{label:'南汇区',children:[]},{label:'奉贤区',children:[]},{label:'浦东新区',children:[]},{label:'崇明县',children:[]},{label:'其他',children:[]}]}

        ]
    },

    {
        label: '江苏',
        value: 'JiangSu',
        children: [

            { label: '南京', children: [{label:'玄武区',children:[]},{label:'白下区',children:[]},{label:'秦淮区',children:[]},{label:'建邺区',children:[]},{label:'鼓楼区',children:[]},{label:'下关区',children:[]},{label:'栖霞区',children:[]},{label:'雨花台区',children:[]},{label:'浦口区',children:[]},{label:'江宁区',children:[]},{label:'六合区',children:[]},{label:'溧水县',children:[]},{label:'高淳县',children:[]},{label:'其他',children:[]}]},

            { label: '苏州', children: [{label:'金阊区',children:[]},{label:'平江区',children:[]},{label:'沧浪区',children:[]},{label:'虎丘区',children:[]},{label:'吴中区',children:[]},{label:'相城区',children:[]},{label:'常熟市',children:[]},{label:'张家港市',children:[]},{label:'昆山市',children:[]},{label:'吴江市',children:[]},{label:'太仓市',children:[]},{label:'其他',children:[]}]},

            { label: '无锡', children: [{label:'崇安区',children:[]},{label:'南长区',children:[]},{label:'北塘区',children:[]},{label:'滨湖区',children:[]},{label:'锡山区',children:[]},{label:'惠山区',children:[]},{label:'江阴市',children:[]},{label:'宜兴市',children:[]},{label:'其他',children:[]}]},

            { label: '常州', children: [{label:'钟楼区',children:[]},{label:'天宁区',children:[]},{label:'戚墅堰区',children:[]},{label:'新北区',children:[]},{label:'武进区',children:[]},{label:'金坛市',children:[]},{label:'溧阳市',children:[]},{label:'其他',children:[]}]},

            { label: '镇江', children: [{label:'京口区',children:[]},{label:'润州区',children:[]},{label:'丹徒区',children:[]},{label:'丹阳市',children:[]},{label:'扬中市',children:[]},{label:'句容市',children:[]},{label:'其他',children:[]}]},

            { label: '南通', children: [{label:'崇川区',children:[]},{label:'港闸区',children:[]},{label:'通州市',children:[]},{label:'如皋市',children:[]},{label:'海门市',children:[]},{label:'启东市',children:[]},{label:'海安县',children:[]},{label:'如东县',children:[]},{label:'其他',children:[]}]},

            { label: '泰州', children: [{label:'海陵区',children:[]},{label:'高港区',children:[]},{label:'姜堰市',children:[]},{label:'泰兴市',children:[]},{label:'靖江市',children:[]},{label:'兴化市',children:[]},{label:'其他',children:[]}]},

            { label: '扬州', children: [{label:'广陵区',children:[]},{label:'维扬区',children:[]},{label:'邗江区',children:[]},{label:'江都市',children:[]},{label:'仪征市',children:[]},{label:'高邮市',children:[]},{label:'宝应县',children:[]},{label:'其他',children:[]}]},

            { label: '盐城', children: [{label:'亭湖区',children:[]},{label:'盐都区',children:[]},{label:'大丰市',children:[]},{label:'东台市',children:[]},{label:'建湖县',children:[]},{label:'射阳县',children:[]},{label:'阜宁县',children:[]},{label:'滨海县',children:[]},{label:'响水县',children:[]},{label:'其他',children:[]}]},

            { label: '连云港', children: [{label:'新浦区',children:[]},{label:'海州区',children:[]},{label:'连云区',children:[]},{label:'东海县',children:[]},{label:'灌云县',children:[]},{label:'赣榆县',children:[]},{label:'灌南县',children:[]},{label:'其他',children:[]}]},

            { label: '徐州', children: [{label:'云龙区',children:[]},{label:'鼓楼区',children:[]},{label:'九里区',children:[]},{label:'泉山区',children:[]},{label:'贾汪区',children:[]},{label:'邳州市',children:[]},{label:'新沂市',children:[]},{label:'铜山县',children:[]},{label:'睢宁县',children:[]},{label:'沛县',children:[]},{label:'丰县',children:[]},{label:'其他',children:[]}]},

            { label: '淮安', children: [{label:'清河区',children:[]},{label:'清浦区',children:[]},{label:'楚州区',children:[]},{label:'淮阴区',children:[]},{label:'涟水县',children:[]},{label:'洪泽县',children:[]},{label:'金湖县',children:[]},{label:'盱眙县',children:[]},{label:'其他',children:[]}]},

            { label: '宿迁', children: [{label:'宿城区',children:[]},{label:'宿豫区',children:[]},{label:'沭阳县',children:[]},{label:'泗阳县',children:[]},{label:'泗洪县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '浙江',
        value: 'ZheJiang',
        children: [

            { label: '杭州', children: [{label:'拱墅区',children:[]},{label:'西湖区',children:[]},{label:'上城区',children:[]},{label:'下城区',children:[]},{label:'江干区',children:[]},{label:'滨江区',children:[]},{label:'余杭区',children:[]},{label:'萧山区',children:[]},{label:'建德市',children:[]},{label:'富阳市',children:[]},{label:'临安市',children:[]},{label:'桐庐县',children:[]},{label:'淳安县',children:[]},{label:'其他',children:[]}]},

            { label: '宁波', children: [{label:'海曙区',children:[]},{label:'江东区',children:[]},{label:'江北区',children:[]},{label:'镇海区',children:[]},{label:'北仑区',children:[]},{label:'鄞州区',children:[]},{label:'余姚市',children:[]},{label:'慈溪市',children:[]},{label:'奉化市',children:[]},{label:'宁海县',children:[]},{label:'象山县',children:[]},{label:'其他',children:[]}]},

            { label: '温州', children: [{label:'鹿城区',children:[]},{label:'龙湾区',children:[]},{label:'瓯海区',children:[]},{label:'瑞安市',children:[]},{label:'乐清市',children:[]},{label:'永嘉县',children:[]},{label:'洞头县',children:[]},{label:'平阳县',children:[]},{label:'苍南县',children:[]},{label:'文成县',children:[]},{label:'泰顺县',children:[]},{label:'其他',children:[]}]},

            { label: '嘉兴', children: [{label:'秀城区',children:[]},{label:'秀洲区',children:[]},{label:'海宁市',children:[]},{label:'平湖市',children:[]},{label:'桐乡市',children:[]},{label:'嘉善县',children:[]},{label:'海盐县',children:[]},{label:'其他',children:[]}]},

            { label: '湖州', children: [{label:'吴兴区',children:[]},{label:'南浔区',children:[]},{label:'长兴县',children:[]},{label:'德清县',children:[]},{label:'安吉县',children:[]},{label:'其他',children:[]}]},

            { label: '绍兴', children: [{label:'越城区',children:[]},{label:'诸暨市',children:[]},{label:'上虞市',children:[]},{label:'嵊州市',children:[]},{label:'绍兴县',children:[]},{label:'新昌县',children:[]},{label:'其他',children:[]}]},

            { label: '金华', children: [{label:'婺城区',children:[]},{label:'金东区',children:[]},{label:'兰溪市',children:[]},{label:'义乌市',children:[]},{label:'东阳市',children:[]},{label:'永康市',children:[]},{label:'武义县',children:[]},{label:'浦江县',children:[]},{label:'磐安县',children:[]},{label:'其他',children:[]}]},

            { label: '衢州', children: [{label:'柯城区',children:[]},{label:'衢江区',children:[]},{label:'江山市',children:[]},{label:'龙游县',children:[]},{label:'常山县',children:[]},{label:'开化县',children:[]},{label:'其他',children:[]}]},

            { label: '舟山', children: [{label:'定海区',children:[]},{label:'普陀区',children:[]},{label:'岱山县',children:[]},{label:'嵊泗县',children:[]},{label:'其他',children:[]}]},

            { label: '台州', children: [{label:'椒江区',children:[]},{label:'黄岩区',children:[]},{label:'路桥区',children:[]},{label:'临海市',children:[]},{label:'温岭市',children:[]},{label:'玉环县',children:[]},{label:'天台县',children:[]},{label:'仙居县',children:[]},{label:'三门县',children:[]},{label:'其他',children:[]}]},

            { label: '丽水', children: [{label:'莲都区',children:[]},{label:'龙泉市',children:[]},{label:'缙云县',children:[]},{label:'青田县',children:[]},{label:'云和县',children:[]},{label:'遂昌县',children:[]},{label:'松阳县',children:[]},{label:'庆元县',children:[]},{label:'景宁畲族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '安徽',
        value: 'AnHui',
        children: [

            { label: '合肥', children: [{label:'庐阳区',children:[]},{label:'瑶海区',children:[]},{label:'蜀山区',children:[]},{label:'包河区',children:[]},{label:'长丰县',children:[]},{label:'肥东县',children:[]},{label:'肥西县',children:[]},{label:'其他',children:[]}]},

            { label: '芜湖', children: [{label:'镜湖区',children:[]},{label:'弋江区',children:[]},{label:'鸠江区',children:[]},{label:'三山区',children:[]},{label:'芜湖县',children:[]},{label:'南陵县',children:[]},{label:'繁昌县',children:[]},{label:'其他',children:[]}]},

            { label: '蚌埠', children: [{label:'蚌山区',children:[]},{label:'龙子湖区',children:[]},{label:'禹会区',children:[]},{label:'淮上区',children:[]},{label:'怀远县',children:[]},{label:'固镇县',children:[]},{label:'五河县',children:[]},{label:'其他',children:[]}]},

            { label: '淮南', children: [{label:'田家庵区',children:[]},{label:'大通区',children:[]},{label:'谢家集区',children:[]},{label:'八公山区',children:[]},{label:'潘集区',children:[]},{label:'凤台县',children:[]},{label:'其他',children:[]}]},

            { label: '马鞍山', children: [{label:'雨山区',children:[]},{label:'花山区',children:[]},{label:'金家庄区',children:[]},{label:'当涂县',children:[]},{label:'其他',children:[]}]},

            { label: '淮北', children: [{label:'相山区',children:[]},{label:'杜集区',children:[]},{label:'烈山区',children:[]},{label:'濉溪县',children:[]},{label:'其他',children:[]}]},

            { label: '铜陵', children: [{label:'铜官山区',children:[]},{label:'狮子山区',children:[]},{label:'郊区',children:[]},{label:'铜陵县',children:[]},{label:'其他',children:[]}]},

            { label: '安庆', children: [{label:'迎江区',children:[]},{label:'大观区',children:[]},{label:'宜秀区',children:[]},{label:'桐城市',children:[]},{label:'宿松县',children:[]},{label:'枞阳县',children:[]},{label:'太湖县',children:[]},{label:'怀宁县',children:[]},{label:'岳西县',children:[]},{label:'望江县',children:[]},{label:'潜山县',children:[]},{label:'其他',children:[]}]},

            { label: '黄山', children: [{label:'屯溪区',children:[]},{label:'黄山区',children:[]},{label:'徽州区',children:[]},{label:'休宁县',children:[]},{label:'歙县',children:[]},{label:'祁门县',children:[]},{label:'黟县',children:[]},{label:'其他',children:[]}]},

            { label: '滁州', children: [{label:'琅琊区',children:[]},{label:'南谯区',children:[]},{label:'天长市',children:[]},{label:'明光市',children:[]},{label:'全椒县',children:[]},{label:'来安县',children:[]},{label:'定远县',children:[]},{label:'凤阳县',children:[]},{label:'其他',children:[]}]},

            { label: '阜阳', children: [{label:'颍州区',children:[]},{label:'颍东区',children:[]},{label:'颍泉区',children:[]},{label:'界首市',children:[]},{label:'临泉县',children:[]},{label:'颍上县',children:[]},{label:'阜南县',children:[]},{label:'太和县',children:[]},{label:'其他',children:[]}]},

            { label: '宿州', children: [{label:'埇桥区',children:[]},{label:'萧县',children:[]},{label:'泗县',children:[]},{label:'砀山县',children:[]},{label:'灵璧县',children:[]},{label:'其他',children:[]}]},

            { label: '巢湖', children: [{label:'居巢区',children:[]},{label:'含山县',children:[]},{label:'无为县',children:[]},{label:'庐江县',children:[]},{label:'和县',children:[]},{label:'其他',children:[]}]},

            { label: '六安', children: [{label:'金安区',children:[]},{label:'裕安区',children:[]},{label:'寿县',children:[]},{label:'霍山县',children:[]},{label:'霍邱县',children:[]},{label:'舒城县',children:[]},{label:'金寨县',children:[]},{label:'其他',children:[]}]},

            { label: '亳州', children: [{label:'谯城区',children:[]},{label:'利辛县',children:[]},{label:'涡阳县',children:[]},{label:'蒙城县',children:[]},{label:'其他',children:[]}]},

            { label: '池州', children: [{label:'贵池区',children:[]},{label:'东至县',children:[]},{label:'石台县',children:[]},{label:'青阳县',children:[]},{label:'其他',children:[]}]},

            { label: '宣城', children: [{label:'宣州区',children:[]},{label:'宁国市',children:[]},{label:'广德县',children:[]},{label:'郎溪县',children:[]},{label:'泾县',children:[]},{label:'旌德县',children:[]},{label:'绩溪县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '福建',
        value: 'FuJian',
        children: [

            { label: '福州', children: [{label:'鼓楼区',children:[]},{label:'台江区',children:[]},{label:'仓山区',children:[]},{label:'马尾区',children:[]},{label:'晋安区',children:[]},{label:'福清市',children:[]},{label:'长乐市',children:[]},{label:'闽侯县',children:[]},{label:'闽清县',children:[]},{label:'永泰县',children:[]},{label:'连江县',children:[]},{label:'罗源县',children:[]},{label:'平潭县',children:[]},{label:'其他',children:[]}]},

            { label: '厦门', children: [{label:'思明区',children:[]},{label:'海沧区',children:[]},{label:'湖里区',children:[]},{label:'集美区',children:[]},{label:'同安区',children:[]},{label:'翔安区',children:[]},{label:'其他',children:[]}]},

            { label: '莆田', children: [{label:'城厢区',children:[]},{label:'涵江区',children:[]},{label:'荔城区',children:[]},{label:'秀屿区',children:[]},{label:'仙游县',children:[]},{label:'其他',children:[]}]},

            { label: '三明', children: [{label:'梅列区',children:[]},{label:'三元区',children:[]},{label:'永安市',children:[]},{label:'明溪县',children:[]},{label:'将乐县',children:[]},{label:'大田县',children:[]},{label:'宁化县',children:[]},{label:'建宁县',children:[]},{label:'沙县',children:[]},{label:'尤溪县',children:[]},{label:'清流县',children:[]},{label:'泰宁县',children:[]},{label:'其他',children:[]}]},

            { label: '泉州', children: [{label:'鲤城区',children:[]},{label:'丰泽区',children:[]},{label:'洛江区',children:[]},{label:'泉港区',children:[]},{label:'石狮市',children:[]},{label:'晋江市',children:[]},{label:'南安市',children:[]},{label:'惠安县',children:[]},{label:'永春县',children:[]},{label:'安溪县',children:[]},{label:'德化县',children:[]},{label:'金门县',children:[]},{label:'其他',children:[]}]},

            { label: '漳州', children: [{label:'芗城区',children:[]},{label:'龙文区',children:[]},{label:'龙海市',children:[]},{label:'平和县',children:[]},{label:'南靖县',children:[]},{label:'诏安县',children:[]},{label:'漳浦县',children:[]},{label:'华安县',children:[]},{label:'东山县',children:[]},{label:'长泰县',children:[]},{label:'云霄县',children:[]},{label:'其他',children:[]}]},

            { label: '南平', children: [{label:'延平区',children:[]},{label:'建瓯市',children:[]},{label:'邵武市',children:[]},{label:'武夷山市',children:[]},{label:'建阳市',children:[]},{label:'松溪县',children:[]},{label:'光泽县',children:[]},{label:'顺昌县',children:[]},{label:'浦城县',children:[]},{label:'政和县',children:[]},{label:'其他',children:[]}]},

            { label: '龙岩', children: [{label:'新罗区',children:[]},{label:'漳平市',children:[]},{label:'长汀县',children:[]},{label:'武平县',children:[]},{label:'上杭县',children:[]},{label:'永定县',children:[]},{label:'连城县',children:[]},{label:'其他',children:[]}]},

            { label: '宁德', children: [{label:'蕉城区',children:[]},{label:'福安市',children:[]},{label:'福鼎市',children:[]},{label:'寿宁县',children:[]},{label:'霞浦县',children:[]},{label:'柘荣县',children:[]},{label:'屏南县',children:[]},{label:'古田县',children:[]},{label:'周宁县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '江西',
        value: 'JiangXi',
        children: [

            { label: '南昌', children: [{label:'东湖区',children:[]},{label:'西湖区',children:[]},{label:'青云谱区',children:[]},{label:'湾里区',children:[]},{label:'青山湖区',children:[]},{label:'新建县',children:[]},{label:'南昌县',children:[]},{label:'进贤县',children:[]},{label:'安义县',children:[]},{label:'其他',children:[]}]},

            { label: '景德镇', children: [{label:'珠山区',children:[]},{label:'昌江区',children:[]},{label:'乐平市',children:[]},{label:'浮梁县',children:[]},{label:'其他',children:[]}]},

            { label: '萍乡', children: [{label:'安源区',children:[]},{label:'湘东区',children:[]},{label:'莲花县',children:[]},{label:'上栗县',children:[]},{label:'芦溪县',children:[]},{label:'其他',children:[]}]},

            { label: '九江', children: [{label:'浔阳区',children:[]},{label:'庐山区',children:[]},{label:'瑞昌市',children:[]},{label:'九江县',children:[]},{label:'星子县',children:[]},{label:'武宁县',children:[]},{label:'彭泽县',children:[]},{label:'永修县',children:[]},{label:'修水县',children:[]},{label:'湖口县',children:[]},{label:'德安县',children:[]},{label:'都昌县',children:[]},{label:'其他',children:[]}]},

            { label: '新余', children: [{label:'渝水区',children:[]},{label:'分宜县',children:[]},{label:'其他',children:[]}]},

            { label: '鹰潭', children: [{label:'月湖区',children:[]},{label:'贵溪市',children:[]},{label:'余江县',children:[]},{label:'其他',children:[]}]},

            { label: '赣州', children: [{label:'章贡区',children:[]},{label:'瑞金市',children:[]},{label:'南康市',children:[]},{label:'石城县',children:[]},{label:'安远县',children:[]},{label:'赣县',children:[]},{label:'宁都县',children:[]},{label:'寻乌县',children:[]},{label:'兴国县',children:[]},{label:'定南县',children:[]},{label:'上犹县',children:[]},{label:'于都县',children:[]},{label:'龙南县',children:[]},{label:'崇义县',children:[]},{label:'信丰县',children:[]},{label:'全南县',children:[]},{label:'大余县',children:[]},{label:'会昌县',children:[]},{label:'其他',children:[]}]},

            { label: '吉安', children: [{label:'吉州区',children:[]},{label:'青原区',children:[]},{label:'井冈山市',children:[]},{label:'吉安县',children:[]},{label:'永丰县',children:[]},{label:'永新县',children:[]},{label:'新干县',children:[]},{label:'泰和县',children:[]},{label:'峡江县',children:[]},{label:'遂川县',children:[]},{label:'安福县',children:[]},{label:'吉水县',children:[]},{label:'万安县',children:[]},{label:'其他',children:[]}]},

            { label: '宜春', children: [{label:'袁州区',children:[]},{label:'丰城市',children:[]},{label:'樟树市',children:[]},{label:'高安市',children:[]},{label:'铜鼓县',children:[]},{label:'靖安县',children:[]},{label:'宜丰县',children:[]},{label:'奉新县',children:[]},{label:'万载县',children:[]},{label:'上高县',children:[]},{label:'其他',children:[]}]},

            { label: '抚州', children: [{label:'临川区',children:[]},{label:'南丰县',children:[]},{label:'乐安县',children:[]},{label:'金溪县',children:[]},{label:'南城县',children:[]},{label:'东乡县',children:[]},{label:'资溪县',children:[]},{label:'宜黄县',children:[]},{label:'广昌县',children:[]},{label:'黎川县',children:[]},{label:'崇仁县',children:[]},{label:'其他',children:[]}]},

            { label: '上饶', children: [{label:'信州区',children:[]},{label:'德兴市',children:[]},{label:'上饶县',children:[]},{label:'广丰县',children:[]},{label:'鄱阳县',children:[]},{label:'婺源县',children:[]},{label:'铅山县',children:[]},{label:'余干县',children:[]},{label:'横峰县',children:[]},{label:'弋阳县',children:[]},{label:'玉山县',children:[]},{label:'万年县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '山东',
        value: 'ShanDong',
        children: [

            { label: '济南', children: [{label:'市中区',children:[]},{label:'历下区',children:[]},{label:'天桥区',children:[]},{label:'槐荫区',children:[]},{label:'历城区',children:[]},{label:'长清区',children:[]},{label:'章丘市',children:[]},{label:'平阴县',children:[]},{label:'济阳县',children:[]},{label:'商河县',children:[]},{label:'其他',children:[]}]},

            { label: '青岛', children: [{label:'市南区',children:[]},{label:'市北区',children:[]},{label:'城阳区',children:[]},{label:'四方区',children:[]},{label:'李沧区',children:[]},{label:'黄岛区',children:[]},{label:'崂山区',children:[]},{label:'胶南市',children:[]},{label:'胶州市',children:[]},{label:'平度市',children:[]},{label:'莱西市',children:[]},{label:'即墨市',children:[]},{label:'其他',children:[]}]},

            { label: '淄博', children: [{label:'张店区',children:[]},{label:'临淄区',children:[]},{label:'淄川区',children:[]},{label:'博山区',children:[]},{label:'周村区',children:[]},{label:'桓台县',children:[]},{label:'高青县',children:[]},{label:'沂源县',children:[]},{label:'其他',children:[]}]},

            { label: '枣庄', children: [{label:'市中区',children:[]},{label:'山亭区',children:[]},{label:'峄城区',children:[]},{label:'台儿庄区',children:[]},{label:'薛城区',children:[]},{label:'滕州市',children:[]},{label:'其他',children:[]}]},

            { label: '东营', children: [{label:'东营区',children:[]},{label:'河口区',children:[]},{label:'垦利县',children:[]},{label:'广饶县',children:[]},{label:'利津县',children:[]},{label:'其他',children:[]}]},

            { label: '烟台', children: [{label:'芝罘区',children:[]},{label:'福山区',children:[]},{label:'牟平区',children:[]},{label:'莱山区',children:[]},{label:'龙口市',children:[]},{label:'莱阳市',children:[]},{label:'莱州市',children:[]},{label:'招远市',children:[]},{label:'蓬莱市',children:[]},{label:'栖霞市',children:[]},{label:'海阳市',children:[]},{label:'长岛县',children:[]},{label:'其他',children:[]}]},

            { label: '潍坊', children: [{label:'潍城区',children:[]},{label:'寒亭区',children:[]},{label:'坊子区',children:[]},{label:'奎文区',children:[]},{label:'青州市',children:[]},{label:'诸城市',children:[]},{label:'寿光市',children:[]},{label:'安丘市',children:[]},{label:'高密市',children:[]},{label:'昌邑市',children:[]},{label:'昌乐县',children:[]},{label:'临朐县',children:[]},{label:'其他',children:[]}]},

            { label: '济宁', children: [{label:'市中区',children:[]},{label:'任城区',children:[]},{label:'曲阜市',children:[]},{label:'兖州市',children:[]},{label:'邹城市',children:[]},{label:'鱼台县',children:[]},{label:'金乡县',children:[]},{label:'嘉祥县',children:[]},{label:'微山县',children:[]},{label:'汶上县',children:[]},{label:'泗水县',children:[]},{label:'梁山县',children:[]},{label:'其他',children:[]}]},

            { label: '泰安', children: [{label:'泰山区',children:[]},{label:'岱岳区',children:[]},{label:'新泰市',children:[]},{label:'肥城市',children:[]},{label:'宁阳县',children:[]},{label:'东平县',children:[]},{label:'其他',children:[]}]},

            { label: '威海', children: [{label:'环翠区',children:[]},{label:'乳山市',children:[]},{label:'文登市',children:[]},{label:'荣成市',children:[]},{label:'其他',children:[]}]},

            { label: '日照', children: [{label:'东港区',children:[]},{label:'岚山区',children:[]},{label:'五莲县',children:[]},{label:'莒县',children:[]},{label:'其他',children:[]}]},

            { label: '莱芜', children: [{label:'莱城区',children:[]},{label:'钢城区',children:[]},{label:'其他',children:[]}]},

            { label: '临沂', children: [{label:'兰山区',children:[]},{label:'罗庄区',children:[]},{label:'河东区',children:[]},{label:'沂南县',children:[]},{label:'郯城县',children:[]},{label:'沂水县',children:[]},{label:'苍山县',children:[]},{label:'费县',children:[]},{label:'平邑县',children:[]},{label:'莒南县',children:[]},{label:'蒙阴县',children:[]},{label:'临沭县',children:[]},{label:'其他',children:[]}]},

            { label: '德州', children: [{label:'德城区',children:[]},{label:'乐陵市',children:[]},{label:'禹城市',children:[]},{label:'陵县',children:[]},{label:'宁津县',children:[]},{label:'齐河县',children:[]},{label:'武城县',children:[]},{label:'庆云县',children:[]},{label:'平原县',children:[]},{label:'夏津县',children:[]},{label:'临邑县',children:[]},{label:'其他',children:[]}]},

            { label: '聊城', children: [{label:'东昌府区',children:[]},{label:'临清市',children:[]},{label:'高唐县',children:[]},{label:'阳谷县',children:[]},{label:'茌平县',children:[]},{label:'莘县',children:[]},{label:'东阿县',children:[]},{label:'冠县',children:[]},{label:'其他',children:[]}]},

            { label: '滨州', children: [{label:'滨城区',children:[]},{label:'邹平县',children:[]},{label:'沾化县',children:[]},{label:'惠民县',children:[]},{label:'博兴县',children:[]},{label:'阳信县',children:[]},{label:'无棣县',children:[]},{label:'其他',children:[]}]},

            { label: '菏泽', children: [{label:'牡丹区',children:[]},{label:'鄄城县',children:[]},{label:'单县',children:[]},{label:'郓城县',children:[]},{label:'曹县',children:[]},{label:'定陶县',children:[]},{label:'巨野县',children:[]},{label:'东明县',children:[]},{label:'成武县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '河南',
        value: 'HeNan',
        children: [

            { label: '郑州', children: [{label:'中原区',children:[]},{label:'金水区',children:[]},{label:'二七区',children:[]},{label:'管城回族区',children:[]},{label:'上街区',children:[]},{label:'惠济区',children:[]},{label:'巩义市',children:[]},{label:'新郑市',children:[]},{label:'新密市',children:[]},{label:'登封市',children:[]},{label:'荥阳市',children:[]},{label:'中牟县',children:[]},{label:'其他',children:[]}]},

            { label: '开封', children: [{label:'鼓楼区',children:[]},{label:'龙亭区',children:[]},{label:'顺河回族区',children:[]},{label:'禹王台区',children:[]},{label:'金明区',children:[]},{label:'开封县',children:[]},{label:'尉氏县',children:[]},{label:'兰考县',children:[]},{label:'杞县',children:[]},{label:'通许县',children:[]},{label:'其他',children:[]}]},

            { label: '洛阳', children: [{label:'西工区',children:[]},{label:'老城区',children:[]},{label:'涧西区',children:[]},{label:'瀍河回族区',children:[]},{label:'洛龙区',children:[]},{label:'吉利区',children:[]},{label:'偃师市',children:[]},{label:'孟津县',children:[]},{label:'汝阳县',children:[]},{label:'伊川县',children:[]},{label:'洛宁县',children:[]},{label:'嵩县',children:[]},{label:'宜阳县',children:[]},{label:'新安县',children:[]},{label:'栾川县',children:[]},{label:'其他',children:[]}]},

            { label: '平顶山', children: [{label:'新华区',children:[]},{label:'卫东区',children:[]},{label:'湛河区',children:[]},{label:'石龙区',children:[]},{label:'汝州市',children:[]},{label:'舞钢市',children:[]},{label:'宝丰县',children:[]},{label:'叶县',children:[]},{label:'郏县',children:[]},{label:'鲁山县',children:[]},{label:'其他',children:[]}]},

            { label: '安阳', children: [{label:'北关区',children:[]},{label:'文峰区',children:[]},{label:'殷都区',children:[]},{label:'龙安区',children:[]},{label:'林州市',children:[]},{label:'安阳县',children:[]},{label:'滑县',children:[]},{label:'内黄县',children:[]},{label:'汤阴县',children:[]},{label:'其他',children:[]}]},

            { label: '鹤壁', children: [{label:'淇滨区',children:[]},{label:'山城区',children:[]},{label:'鹤山区',children:[]},{label:'浚县',children:[]},{label:'淇县',children:[]},{label:'其他',children:[]}]},

            { label: '新乡', children: [{label:'卫滨区',children:[]},{label:'红旗区',children:[]},{label:'凤泉区',children:[]},{label:'牧野区',children:[]},{label:'卫辉市',children:[]},{label:'辉县市',children:[]},{label:'新乡县',children:[]},{label:'获嘉县',children:[]},{label:'原阳县',children:[]},{label:'长垣县',children:[]},{label:'封丘县',children:[]},{label:'延津县',children:[]},{label:'其他',children:[]}]},

            { label: '焦作', children: [{label:'解放区',children:[]},{label:'中站区',children:[]},{label:'马村区',children:[]},{label:'山阳区',children:[]},{label:'沁阳市',children:[]},{label:'孟州市',children:[]},{label:'修武县',children:[]},{label:'温县',children:[]},{label:'武陟县',children:[]},{label:'博爱县',children:[]},{label:'其他',children:[]}]},

            { label: '濮阳', children: [{label:'华龙区',children:[]},{label:'濮阳县',children:[]},{label:'南乐县',children:[]},{label:'台前县',children:[]},{label:'清丰县',children:[]},{label:'范县',children:[]},{label:'其他',children:[]}]},

            { label: '许昌', children: [{label:'魏都区',children:[]},{label:'禹州市',children:[]},{label:'长葛市',children:[]},{label:'许昌县',children:[]},{label:'鄢陵县',children:[]},{label:'襄城县',children:[]},{label:'其他',children:[]}]},

            { label: '漯河', children: [{label:'源汇区',children:[]},{label:'郾城区',children:[]},{label:'召陵区',children:[]},{label:'临颍县',children:[]},{label:'舞阳县',children:[]},{label:'其他',children:[]}]},

            { label: '三门峡', children: [{label:'湖滨区',children:[]},{label:'义马市',children:[]},{label:'灵宝市',children:[]},{label:'渑池县',children:[]},{label:'卢氏县',children:[]},{label:'陕县',children:[]},{label:'其他',children:[]}]},

            { label: '南阳', children: [{label:'卧龙区',children:[]},{label:'宛城区',children:[]},{label:'邓州市',children:[]},{label:'桐柏县',children:[]},{label:'方城县',children:[]},{label:'淅川县',children:[]},{label:'镇平县',children:[]},{label:'唐河县',children:[]},{label:'南召县',children:[]},{label:'内乡县',children:[]},{label:'新野县',children:[]},{label:'社旗县',children:[]},{label:'西峡县',children:[]},{label:'其他',children:[]}]},

            { label: '商丘', children: [{label:'梁园区',children:[]},{label:'睢阳区',children:[]},{label:'永城市',children:[]},{label:'宁陵县',children:[]},{label:'虞城县',children:[]},{label:'民权县',children:[]},{label:'夏邑县',children:[]},{label:'柘城县',children:[]},{label:'睢县',children:[]},{label:'其他',children:[]}]},

            { label: '信阳', children: [{label:'浉河区',children:[]},{label:'平桥区',children:[]},{label:'潢川县',children:[]},{label:'淮滨县',children:[]},{label:'息县',children:[]},{label:'新县',children:[]},{label:'商城县',children:[]},{label:'固始县',children:[]},{label:'罗山县',children:[]},{label:'光山县',children:[]},{label:'其他',children:[]}]},

            { label: '周口', children: [{label:'川汇区',children:[]},{label:'项城市',children:[]},{label:'商水县',children:[]},{label:'淮阳县',children:[]},{label:'太康县',children:[]},{label:'鹿邑县',children:[]},{label:'西华县',children:[]},{label:'扶沟县',children:[]},{label:'沈丘县',children:[]},{label:'郸城县',children:[]},{label:'其他',children:[]}]},

            { label: '驻马店', children: [{label:'驿城区',children:[]},{label:'确山县',children:[]},{label:'新蔡县',children:[]},{label:'上蔡县',children:[]},{label:'西平县',children:[]},{label:'泌阳县',children:[]},{label:'平舆县',children:[]},{label:'汝南县',children:[]},{label:'遂平县',children:[]},{label:'正阳县',children:[]},{label:'其他',children:[]}]},

            { label: '焦作', children: [{label:'济源市',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '湖北',
        value: 'HuBei',
        children: [

            { label: '武汉', children: [{label:'江岸区',children:[]},{label:'武昌区',children:[]},{label:'江汉区',children:[]},{label:'硚口区',children:[]},{label:'汉阳区',children:[]},{label:'青山区',children:[]},{label:'洪山区',children:[]},{label:'东西湖区',children:[]},{label:'汉南区',children:[]},{label:'蔡甸区',children:[]},{label:'江夏区',children:[]},{label:'黄陂区',children:[]},{label:'新洲区',children:[]},{label:'其他',children:[]}]},

            { label: '黄石', children: [{label:'黄石港区',children:[]},{label:'西塞山区',children:[]},{label:'下陆区',children:[]},{label:'铁山区',children:[]},{label:'大冶市',children:[]},{label:'阳新县',children:[]},{label:'其他',children:[]}]},

            { label: '十堰', children: [{label:'张湾区',children:[]},{label:'茅箭区',children:[]},{label:'丹江口市',children:[]},{label:'郧县',children:[]},{label:'竹山县',children:[]},{label:'房县',children:[]},{label:'郧西县',children:[]},{label:'竹溪县',children:[]},{label:'其他',children:[]}]},

            { label: '荆州', children: [{label:'沙市区',children:[]},{label:'荆州区',children:[]},{label:'洪湖市',children:[]},{label:'石首市',children:[]},{label:'松滋市',children:[]},{label:'监利县',children:[]},{label:'公安县',children:[]},{label:'江陵县',children:[]},{label:'其他',children:[]}]},

            { label: '宜昌', children: [{label:'西陵区',children:[]},{label:'伍家岗区',children:[]},{label:'点军区',children:[]},{label:'猇亭区',children:[]},{label:'夷陵区',children:[]},{label:'宜都市',children:[]},{label:'当阳市',children:[]},{label:'枝江市',children:[]},{label:'秭归县',children:[]},{label:'远安县',children:[]},{label:'兴山县',children:[]},{label:'五峰土家族自治县',children:[]},{label:'长阳土家族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '襄樊', children: [{label:'襄城区',children:[]},{label:'樊城区',children:[]},{label:'襄阳区',children:[]},{label:'老河口市',children:[]},{label:'枣阳市',children:[]},{label:'宜城市',children:[]},{label:'南漳县',children:[]},{label:'谷城县',children:[]},{label:'保康县',children:[]},{label:'其他',children:[]}]},

            { label: '鄂州', children: [{label:'鄂城区',children:[]},{label:'华容区',children:[]},{label:'梁子湖区',children:[]},{label:'其他',children:[]}]},

            { label: '荆门', children: [{label:'东宝区',children:[]},{label:'掇刀区',children:[]},{label:'钟祥市',children:[]},{label:'京山县',children:[]},{label:'沙洋县',children:[]},{label:'其他',children:[]}]},

            { label: '孝感', children: [{label:'孝南区',children:[]},{label:'应城市',children:[]},{label:'安陆市',children:[]},{label:'汉川市',children:[]},{label:'云梦县',children:[]},{label:'大悟县',children:[]},{label:'孝昌县',children:[]},{label:'其他',children:[]}]},

            { label: '黄冈', children: [{label:'黄州区',children:[]},{label:'麻城市',children:[]},{label:'武穴市',children:[]},{label:'红安县',children:[]},{label:'罗田县',children:[]},{label:'浠水县',children:[]},{label:'蕲春县',children:[]},{label:'黄梅县',children:[]},{label:'英山县',children:[]},{label:'团风县',children:[]},{label:'其他',children:[]}]},

            { label: '咸宁', children: [{label:'咸安区',children:[]},{label:'赤壁市',children:[]},{label:'嘉鱼县',children:[]},{label:'通山县',children:[]},{label:'崇阳县',children:[]},{label:'通城县',children:[]},{label:'其他',children:[]}]},

            { label: '随州', children: [{label:'曾都区',children:[]},{label:'广水市',children:[]},{label:'其他',children:[]}]},

            { label: '恩施土家族苗族自治州', children: [{label:'恩施市',children:[]},{label:'利川市',children:[]},{label:'建始县',children:[]},{label:'来凤县',children:[]},{label:'巴东县',children:[]},{label:'鹤峰县',children:[]},{label:'宣恩县',children:[]},{label:'咸丰县',children:[]},{label:'其他',children:[]}]},

            { label: '仙桃', children: [{label:'仙桃',children:[]}]},

            { label: '天门', children: [{label:'天门',children:[]}]},

            { label: '潜江', children: [{label:'潜江',children:[]}]},

            { label: '神农架林区', children: [{label:'神农架林区',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '湖南',
        value: 'HuNan',
        children: [

            { label: '长沙', children: [{label:'岳麓区',children:[]},{label:'芙蓉区',children:[]},{label:'天心区',children:[]},{label:'开福区',children:[]},{label:'雨花区',children:[]},{label:'浏阳市',children:[]},{label:'长沙县',children:[]},{label:'望城县',children:[]},{label:'宁乡县',children:[]},{label:'其他',children:[]}]},

            { label: '株洲', children: [{label:'天元区',children:[]},{label:'荷塘区',children:[]},{label:'芦淞区',children:[]},{label:'石峰区',children:[]},{label:'醴陵市',children:[]},{label:'株洲县',children:[]},{label:'炎陵县',children:[]},{label:'茶陵县',children:[]},{label:'攸县',children:[]},{label:'其他',children:[]}]},

            { label: '湘潭', children: [{label:'岳塘区',children:[]},{label:'雨湖区',children:[]},{label:'湘乡市',children:[]},{label:'韶山市',children:[]},{label:'湘潭县',children:[]},{label:'其他',children:[]}]},

            { label: '衡阳', children: [{label:'雁峰区',children:[]},{label:'珠晖区',children:[]},{label:'石鼓区',children:[]},{label:'蒸湘区',children:[]},{label:'南岳区',children:[]},{label:'耒阳市',children:[]},{label:'常宁市',children:[]},{label:'衡阳县',children:[]},{label:'衡东县',children:[]},{label:'衡山县',children:[]},{label:'衡南县',children:[]},{label:'祁东县',children:[]},{label:'其他',children:[]}]},

            { label: '邵阳', children: [{label:'双清区',children:[]},{label:'大祥区',children:[]},{label:'北塔区',children:[]},{label:'武冈市',children:[]},{label:'邵东县',children:[]},{label:'洞口县',children:[]},{label:'新邵县',children:[]},{label:'绥宁县',children:[]},{label:'新宁县',children:[]},{label:'邵阳县',children:[]},{label:'隆回县',children:[]},{label:'城步苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '岳阳', children: [{label:'岳阳楼区',children:[]},{label:'云溪区',children:[]},{label:'君山区',children:[]},{label:'临湘市',children:[]},{label:'汨罗市',children:[]},{label:'岳阳县',children:[]},{label:'湘阴县',children:[]},{label:'平江县',children:[]},{label:'华容县',children:[]},{label:'其他',children:[]}]},

            { label: '常德', children: [{label:'武陵区',children:[]},{label:'鼎城区',children:[]},{label:'津市市',children:[]},{label:'澧县',children:[]},{label:'临澧县',children:[]},{label:'桃源县',children:[]},{label:'汉寿县',children:[]},{label:'安乡县',children:[]},{label:'石门县',children:[]},{label:'其他',children:[]}]},

            { label: '张家界', children: [{label:'永定区',children:[]},{label:'武陵源区',children:[]},{label:'慈利县',children:[]},{label:'桑植县',children:[]},{label:'其他',children:[]}]},

            { label: '益阳', children: [{label:'赫山区',children:[]},{label:'资阳区',children:[]},{label:'沅江市',children:[]},{label:'桃江县',children:[]},{label:'南县',children:[]},{label:'安化县',children:[]},{label:'其他',children:[]}]},

            { label: '郴州', children: [{label:'北湖区',children:[]},{label:'苏仙区',children:[]},{label:'资兴市',children:[]},{label:'宜章县',children:[]},{label:'汝城县',children:[]},{label:'安仁县',children:[]},{label:'嘉禾县',children:[]},{label:'临武县',children:[]},{label:'桂东县',children:[]},{label:'永兴县',children:[]},{label:'桂阳县',children:[]},{label:'其他',children:[]}]},

            { label: '永州', children: [{label:'冷水滩区',children:[]},{label:'零陵区',children:[]},{label:'祁阳县',children:[]},{label:'蓝山县',children:[]},{label:'宁远县',children:[]},{label:'新田县',children:[]},{label:'东安县',children:[]},{label:'江永县',children:[]},{label:'道县',children:[]},{label:'双牌县',children:[]},{label:'江华瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '怀化', children: [{label:'鹤城区',children:[]},{label:'洪江市',children:[]},{label:'会同县',children:[]},{label:'沅陵县',children:[]},{label:'辰溪县',children:[]},{label:'溆浦县',children:[]},{label:'中方县',children:[]},{label:'新晃侗族自治县',children:[]},{label:'芷江侗族自治县',children:[]},{label:'通道侗族自治县',children:[]},{label:'靖州苗族侗族自治县',children:[]},{label:'麻阳苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '娄底', children: [{label:'娄星区',children:[]},{label:'冷水江市',children:[]},{label:'涟源市',children:[]},{label:'新化县',children:[]},{label:'双峰县',children:[]},{label:'其他',children:[]}]},

            { label: '湘西土家族苗族自治州', children: [{label:'吉首市',children:[]},{label:'古丈县',children:[]},{label:'龙山县',children:[]},{label:'永顺县',children:[]},{label:'凤凰县',children:[]},{label:'泸溪县',children:[]},{label:'保靖县',children:[]},{label:'花垣县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '广东',
        value: 'GuangDong',
        children: [

            { label: '广州', children: [{label:'越秀区',children:[]},{label:'荔湾区',children:[]},{label:'海珠区',children:[]},{label:'天河区',children:[]},{label:'白云区',children:[]},{label:'黄埔区',children:[]},{label:'番禺区',children:[]},{label:'花都区',children:[]},{label:'南沙区',children:[]},{label:'萝岗区',children:[]},{label:'增城市',children:[]},{label:'从化市',children:[]},{label:'其他',children:[]}]},

            { label: '深圳', children: [{label:'福田区',children:[]},{label:'罗湖区',children:[]},{label:'南山区',children:[]},{label:'宝安区',children:[]},{label:'龙岗区',children:[]},{label:'盐田区',children:[]},{label:'其他',children:[]}]},

            { label: '东莞', children: [{label:'莞城',children:[]},{label:'常平',children:[]},{label:'塘厦',children:[]},{label:'塘厦',children:[]},{label:'塘厦',children:[]},{label:'其他',children:[]}]},

            { label: '中山', children: [{label:'中山',children:[]}]},

            { label: '潮州', children: [{label:'湘桥区',children:[]},{label:'潮安县',children:[]},{label:'饶平县',children:[]},{label:'其他',children:[]}]},

            { label: '揭阳', children: [{label:'榕城区',children:[]},{label:'揭东县',children:[]},{label:'揭西县',children:[]},{label:'惠来县',children:[]},{label:'普宁市',children:[]},{label:'其他',children:[]}]},

            { label: '云浮', children: [{label:'云城区',children:[]},{label:'新兴县',children:[]},{label:'郁南县',children:[]},{label:'云安县',children:[]},{label:'罗定市',children:[]},{label:'其他',children:[]}]},

            { label: '珠海', children: [{label:'香洲区',children:[]},{label:'斗门区',children:[]},{label:'金湾区',children:[]},{label:'其他',children:[]}]},

            { label: '汕头', children: [{label:'金平区',children:[]},{label:'濠江区',children:[]},{label:'龙湖区',children:[]},{label:'潮阳区',children:[]},{label:'潮南区',children:[]},{label:'澄海区',children:[]},{label:'南澳县',children:[]},{label:'其他',children:[]}]},

            { label: '韶关', children: [{label:'浈江区',children:[]},{label:'武江区',children:[]},{label:'曲江区',children:[]},{label:'乐昌市',children:[]},{label:'南雄市',children:[]},{label:'始兴县',children:[]},{label:'仁化县',children:[]},{label:'翁源县',children:[]},{label:'新丰县',children:[]},{label:'乳源瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '佛山', children: [{label:'禅城区',children:[]},{label:'南海区',children:[]},{label:'顺德区',children:[]},{label:'三水区',children:[]},{label:'高明区',children:[]},{label:'其他',children:[]}]},

            { label: '江门', children: [{label:'蓬江区',children:[]},{label:'江海区',children:[]},{label:'新会区',children:[]},{label:'恩平市',children:[]},{label:'台山市',children:[]},{label:'开平市',children:[]},{label:'鹤山市',children:[]},{label:'其他',children:[]}]},

            { label: '湛江', children: [{label:'赤坎区',children:[]},{label:'霞山区',children:[]},{label:'坡头区',children:[]},{label:'麻章区',children:[]},{label:'吴川市',children:[]},{label:'廉江市',children:[]},{label:'雷州市',children:[]},{label:'遂溪县',children:[]},{label:'徐闻县',children:[]},{label:'其他',children:[]}]},

            { label: '茂名', children: [{label:'茂南区',children:[]},{label:'茂港区',children:[]},{label:'化州市',children:[]},{label:'信宜市',children:[]},{label:'高州市',children:[]},{label:'电白县',children:[]},{label:'其他',children:[]}]},

            { label: '肇庆', children: [{label:'端州区',children:[]},{label:'鼎湖区',children:[]},{label:'高要市',children:[]},{label:'四会市',children:[]},{label:'广宁县',children:[]},{label:'怀集县',children:[]},{label:'封开县',children:[]},{label:'德庆县',children:[]},{label:'其他',children:[]}]},

            { label: '惠州', children: [{label:'惠城区',children:[]},{label:'惠阳区',children:[]},{label:'博罗县',children:[]},{label:'惠东县',children:[]},{label:'龙门县',children:[]},{label:'其他',children:[]}]},

            { label: '梅州', children: [{label:'梅江区',children:[]},{label:'兴宁市',children:[]},{label:'梅县',children:[]},{label:'大埔县',children:[]},{label:'丰顺县',children:[]},{label:'五华县',children:[]},{label:'平远县',children:[]},{label:'蕉岭县',children:[]},{label:'其他',children:[]}]},

            { label: '汕尾', children: [{label:'城区',children:[]},{label:'陆丰市',children:[]},{label:'海丰县',children:[]},{label:'陆河县',children:[]},{label:'其他',children:[]}]},

            { label: '河源', children: [{label:'源城区',children:[]},{label:'紫金县',children:[]},{label:'龙川县',children:[]},{label:'连平县',children:[]},{label:'和平县',children:[]},{label:'东源县',children:[]},{label:'其他',children:[]}]},

            { label: '阳江', children: [{label:'江城区',children:[]},{label:'阳春市',children:[]},{label:'阳西县',children:[]},{label:'阳东县',children:[]},{label:'其他',children:[]}]},

            { label: '清远', children: [{label:'清城区',children:[]},{label:'英德市',children:[]},{label:'连州市',children:[]},{label:'佛冈县',children:[]},{label:'阳山县',children:[]},{label:'清新县',children:[]},{label:'连山壮族瑶族自治县',children:[]},{label:'连南瑶族自治县',children:[]},{label:'其他',children:[]}]}

        ]
    },

    {
        label: '广西',
        value: 'GuangXi',
        children: [

            { label: '南宁', children: [{label:'青秀区',children:[]},{label:'兴宁区',children:[]},{label:'西乡塘区',children:[]},{label:'良庆区',children:[]},{label:'江南区',children:[]},{label:'邕宁区',children:[]},{label:'武鸣县',children:[]},{label:'隆安县',children:[]},{label:'马山县',children:[]},{label:'上林县',children:[]},{label:'宾阳县',children:[]},{label:'横县',children:[]},{label:'其他',children:[]}]},

            { label: '柳州', children: [{label:'城中区',children:[]},{label:'鱼峰区',children:[]},{label:'柳北区',children:[]},{label:'柳南区',children:[]},{label:'柳江县',children:[]},{label:'柳城县',children:[]},{label:'鹿寨县',children:[]},{label:'融安县',children:[]},{label:'融水苗族自治县',children:[]},{label:'三江侗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '桂林', children: [{label:'象山区',children:[]},{label:'秀峰区',children:[]},{label:'叠彩区',children:[]},{label:'七星区',children:[]},{label:'雁山区',children:[]},{label:'阳朔县',children:[]},{label:'临桂县',children:[]},{label:'灵川县',children:[]},{label:'全州县',children:[]},{label:'平乐县',children:[]},{label:'兴安县',children:[]},{label:'灌阳县',children:[]},{label:'荔浦县',children:[]},{label:'资源县',children:[]},{label:'永福县',children:[]},{label:'龙胜各族自治县',children:[]},{label:'恭城瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '梧州', children: [{label:'万秀区',children:[]},{label:'蝶山区',children:[]},{label:'长洲区',children:[]},{label:'岑溪市',children:[]},{label:'苍梧县',children:[]},{label:'藤县',children:[]},{label:'蒙山县',children:[]},{label:'其他',children:[]}]},

            { label: '北海', children: [{label:'海城区',children:[]},{label:'银海区',children:[]},{label:'铁山港区',children:[]},{label:'合浦县',children:[]},{label:'其他',children:[]}]},

            { label: '防城港', children: [{label:'港口区',children:[]},{label:'防城区',children:[]},{label:'东兴市',children:[]},{label:'上思县',children:[]},{label:'其他',children:[]}]},

            { label: '钦州', children: [{label:'钦南区',children:[]},{label:'钦北区',children:[]},{label:'灵山县',children:[]},{label:'浦北县',children:[]},{label:'其他',children:[]}]},

            { label: '贵港', children: [{label:'港北区',children:[]},{label:'港南区',children:[]},{label:'覃塘区',children:[]},{label:'桂平市',children:[]},{label:'平南县',children:[]},{label:'其他',children:[]}]},

            { label: '玉林', children: [{label:'玉州区',children:[]},{label:'北流市',children:[]},{label:'容县',children:[]},{label:'陆川县',children:[]},{label:'博白县',children:[]},{label:'兴业县',children:[]},{label:'其他',children:[]}]},

            { label: '百色', children: [{label:'右江区',children:[]},{label:'凌云县',children:[]},{label:'平果县',children:[]},{label:'西林县',children:[]},{label:'乐业县',children:[]},{label:'德保县',children:[]},{label:'田林县',children:[]},{label:'田阳县',children:[]},{label:'靖西县',children:[]},{label:'田东县',children:[]},{label:'那坡县',children:[]},{label:'隆林各族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '贺州', children: [{label:'八步区',children:[]},{label:'钟山县',children:[]},{label:'昭平县',children:[]},{label:'富川瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '河池', children: [{label:'金城江区',children:[]},{label:'宜州市',children:[]},{label:'天峨县',children:[]},{label:'凤山县',children:[]},{label:'南丹县',children:[]},{label:'东兰县',children:[]},{label:'都安瑶族自治县',children:[]},{label:'罗城仫佬族自治县',children:[]},{label:'巴马瑶族自治县',children:[]},{label:'环江毛南族自治县',children:[]},{label:'大化瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '来宾', children: [{label:'兴宾区',children:[]},{label:'合山市',children:[]},{label:'象州县',children:[]},{label:'武宣县',children:[]},{label:'忻城县',children:[]},{label:'金秀瑶族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '崇左', children: [{label:'江州区',children:[]},{label:'凭祥市',children:[]},{label:'宁明县',children:[]},{label:'扶绥县',children:[]},{label:'龙州县',children:[]},{label:'大新县',children:[]},{label:'天等县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '海南',
        value: 'HaiNan',
        children: [

            { label: '海口', children: [{label:'龙华区',children:[]},{label:'秀英区',children:[]},{label:'琼山区',children:[]},{label:'美兰区',children:[]},{label:'其他',children:[]}]},

            { label: '三亚', children: [{label:'三亚市',children:[]},{label:'其他',children:[]}]},

            { label: '五指山', children: [{label:'五指山',children:[]}]},

            { label: '琼海', children: [{label:'琼海',children:[]}]},

            { label: '儋州', children: [{label:'儋州',children:[]}]},

            { label: '文昌', children: [{label:'文昌',children:[]}]},

            { label: '万宁', children: [{label:'万宁',children:[]}]},

            { label: '东方', children: [{label:'东方',children:[]}]},

            { label: '澄迈县', children: [{label:'澄迈县',children:[]}]},

            { label: '定安县', children: [{label:'定安县',children:[]}]},

            { label: '屯昌县', children: [{label:'屯昌县',children:[]}]},

            { label: '临高县', children: [{label:'临高县',children:[]}]},

            { label: '白沙黎族自治县', children: [{label:'白沙黎族自治县',children:[]}]},

            { label: '昌江黎族自治县', children: [{label:'昌江黎族自治县',children:[]}]},

            { label: '乐东黎族自治县', children: [{label:'乐东黎族自治县',children:[]}]},

            { label: '陵水黎族自治县', children: [{label:'陵水黎族自治县',children:[]}]},

            { label: '保亭黎族苗族自治县', children: [{label:'保亭黎族苗族自治县',children:[]}]},

            { label: '琼中黎族苗族自治县', children: [{label:'琼中黎族苗族自治县',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '重庆',
        value: 'ChongQing',
        children: [

            { label: '重庆', children: [{label:'渝中区',children:[]},{label:'大渡口区',children:[]},{label:'江北区',children:[]},{label:'南岸区',children:[]},{label:'北碚区',children:[]},{label:'渝北区',children:[]},{label:'巴南区',children:[]},{label:'长寿区',children:[]},{label:'双桥区',children:[]},{label:'沙坪坝区',children:[]},{label:'万盛区',children:[]},{label:'万州区',children:[]},{label:'涪陵区',children:[]},{label:'黔江区',children:[]},{label:'永川区',children:[]},{label:'合川区',children:[]},{label:'江津区',children:[]},{label:'九龙坡区',children:[]},{label:'南川区',children:[]},{label:'綦江县',children:[]},{label:'潼南县',children:[]},{label:'荣昌县',children:[]},{label:'璧山县',children:[]},{label:'大足县',children:[]},{label:'铜梁县',children:[]},{label:'梁平县',children:[]},{label:'开县',children:[]},{label:'忠县',children:[]},{label:'城口县',children:[]},{label:'垫江县',children:[]},{label:'武隆县',children:[]},{label:'丰都县',children:[]},{label:'奉节县',children:[]},{label:'云阳县',children:[]},{label:'巫溪县',children:[]},{label:'巫山县',children:[]},{label:'石柱土家族自治县',children:[]},{label:'秀山土家族苗族自治县',children:[]},{label:'酉阳土家族苗族自治县',children:[]},{label:'彭水苗族土家族自治县',children:[]},{label:'其他',children:[]}]}

        ]
    },

    {
        label: '四川',
        value: 'SiChuan',
        children: [

            { label: '成都', children: [{label:'青羊区',children:[]},{label:'锦江区',children:[]},{label:'金牛区',children:[]},{label:'武侯区',children:[]},{label:'成华区',children:[]},{label:'龙泉驿区',children:[]},{label:'青白江区',children:[]},{label:'新都区',children:[]},{label:'温江区',children:[]},{label:'都江堰市',children:[]},{label:'彭州市',children:[]},{label:'邛崃市',children:[]},{label:'崇州市',children:[]},{label:'金堂县',children:[]},{label:'郫县',children:[]},{label:'新津县',children:[]},{label:'双流县',children:[]},{label:'蒲江县',children:[]},{label:'大邑县',children:[]},{label:'其他',children:[]}]},

            { label: '自贡', children: [{label:'大安区',children:[]},{label:'自流井区',children:[]},{label:'贡井区',children:[]},{label:'沿滩区',children:[]},{label:'荣县',children:[]},{label:'富顺县',children:[]},{label:'其他',children:[]}]},

            { label: '攀枝花', children: [{label:'仁和区',children:[]},{label:'米易县',children:[]},{label:'盐边县',children:[]},{label:'东区',children:[]},{label:'西区',children:[]},{label:'其他',children:[]}]},

            { label: '泸州', children: [{label:'江阳区',children:[]},{label:'纳溪区',children:[]},{label:'龙马潭区',children:[]},{label:'泸县',children:[]},{label:'合江县',children:[]},{label:'叙永县',children:[]},{label:'古蔺县',children:[]},{label:'其他',children:[]}]},

            { label: '德阳', children: [{label:'旌阳区',children:[]},{label:'广汉市',children:[]},{label:'什邡市',children:[]},{label:'绵竹市',children:[]},{label:'罗江县',children:[]},{label:'中江县',children:[]},{label:'其他',children:[]}]},

            { label: '绵阳', children: [{label:'涪城区',children:[]},{label:'游仙区',children:[]},{label:'江油市',children:[]},{label:'盐亭县',children:[]},{label:'三台县',children:[]},{label:'平武县',children:[]},{label:'安县',children:[]},{label:'梓潼县',children:[]},{label:'北川羌族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '广元', children: [{label:'元坝区',children:[]},{label:'朝天区',children:[]},{label:'青川县',children:[]},{label:'旺苍县',children:[]},{label:'剑阁县',children:[]},{label:'苍溪县',children:[]},{label:'市中区',children:[]},{label:'其他',children:[]}]},

            { label: '遂宁', children: [{label:'船山区',children:[]},{label:'安居区',children:[]},{label:'射洪县',children:[]},{label:'蓬溪县',children:[]},{label:'大英县',children:[]},{label:'其他',children:[]}]},

            { label: '内江', children: [{label:'市中区',children:[]},{label:'东兴区',children:[]},{label:'资中县',children:[]},{label:'隆昌县',children:[]},{label:'威远县',children:[]},{label:'其他',children:[]}]},

            { label: '乐山', children: [{label:'市中区',children:[]},{label:'五通桥区',children:[]},{label:'沙湾区',children:[]},{label:'金口河区',children:[]},{label:'峨眉山市',children:[]},{label:'夹江县',children:[]},{label:'井研县',children:[]},{label:'犍为县',children:[]},{label:'沐川县',children:[]},{label:'马边彝族自治县',children:[]},{label:'峨边彝族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '南充', children: [{label:'顺庆区',children:[]},{label:'高坪区',children:[]},{label:'嘉陵区',children:[]},{label:'阆中市',children:[]},{label:'营山县',children:[]},{label:'蓬安县',children:[]},{label:'仪陇县',children:[]},{label:'南部县',children:[]},{label:'西充县',children:[]},{label:'其他',children:[]}]},

            { label: '眉山', children: [{label:'东坡区',children:[]},{label:'仁寿县',children:[]},{label:'彭山县',children:[]},{label:'洪雅县',children:[]},{label:'丹棱县',children:[]},{label:'青神县',children:[]},{label:'其他',children:[]}]},

            { label: '宜宾', children: [{label:'翠屏区',children:[]},{label:'宜宾县',children:[]},{label:'兴文县',children:[]},{label:'南溪县',children:[]},{label:'珙县',children:[]},{label:'长宁县',children:[]},{label:'高县',children:[]},{label:'江安县',children:[]},{label:'筠连县',children:[]},{label:'屏山县',children:[]},{label:'其他',children:[]}]},

            { label: '广安', children: [{label:'广安区',children:[]},{label:'华蓥市',children:[]},{label:'岳池县',children:[]},{label:'邻水县',children:[]},{label:'武胜县',children:[]},{label:'其他',children:[]}]},

            { label: '达州', children: [{label:'通川区',children:[]},{label:'万源市',children:[]},{label:'达县',children:[]},{label:'渠县',children:[]},{label:'宣汉县',children:[]},{label:'开江县',children:[]},{label:'大竹县',children:[]},{label:'其他',children:[]}]},

            { label: '雅安', children: [{label:'雨城区',children:[]},{label:'芦山县',children:[]},{label:'石棉县',children:[]},{label:'名山县',children:[]},{label:'天全县',children:[]},{label:'荥经县',children:[]},{label:'宝兴县',children:[]},{label:'汉源县',children:[]},{label:'其他',children:[]}]},

            { label: '巴中', children: [{label:'巴州区',children:[]},{label:'南江县',children:[]},{label:'平昌县',children:[]},{label:'通江县',children:[]},{label:'其他',children:[]}]},

            { label: '资阳', children: [{label:'雁江区',children:[]},{label:'简阳市',children:[]},{label:'安岳县',children:[]},{label:'乐至县',children:[]},{label:'其他',children:[]}]},

            { label: '阿坝藏族羌族自治州', children: [{label:'马尔康县',children:[]},{label:'九寨沟县',children:[]},{label:'红原县',children:[]},{label:'汶川县',children:[]},{label:'阿坝县',children:[]},{label:'理县',children:[]},{label:'若尔盖县',children:[]},{label:'小金县',children:[]},{label:'黑水县',children:[]},{label:'金川县',children:[]},{label:'松潘县',children:[]},{label:'壤塘县',children:[]},{label:'茂县',children:[]},{label:'其他',children:[]}]},

            { label: '甘孜藏族自治州', children: [{label:'康定县',children:[]},{label:'丹巴县',children:[]},{label:'炉霍县',children:[]},{label:'九龙县',children:[]},{label:'甘孜县',children:[]},{label:'雅江县',children:[]},{label:'新龙县',children:[]},{label:'道孚县',children:[]},{label:'白玉县',children:[]},{label:'理塘县',children:[]},{label:'德格县',children:[]},{label:'乡城县',children:[]},{label:'石渠县',children:[]},{label:'稻城县',children:[]},{label:'色达县',children:[]},{label:'巴塘县',children:[]},{label:'泸定县',children:[]},{label:'得荣县',children:[]},{label:'其他',children:[]}]},

            { label: '凉山彝族自治州', children: [{label:'西昌市',children:[]},{label:'美姑县',children:[]},{label:'昭觉县',children:[]},{label:'金阳县',children:[]},{label:'甘洛县',children:[]},{label:'布拖县',children:[]},{label:'雷波县',children:[]},{label:'普格县',children:[]},{label:'宁南县',children:[]},{label:'喜德县',children:[]},{label:'会东县',children:[]},{label:'越西县',children:[]},{label:'会理县',children:[]},{label:'盐源县',children:[]},{label:'德昌县',children:[]},{label:'冕宁县',children:[]},{label:'木里藏族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '贵州',
        value: 'GuiZhou',
        children: [

            { label: '贵阳', children: [{label:'南明区',children:[]},{label:'云岩区',children:[]},{label:'花溪区',children:[]},{label:'乌当区',children:[]},{label:'白云区',children:[]},{label:'小河区',children:[]},{label:'清镇市',children:[]},{label:'开阳县',children:[]},{label:'修文县',children:[]},{label:'息烽县',children:[]},{label:'其他',children:[]}]},

            { label: '六盘水', children: [{label:'钟山区',children:[]},{label:'水城县',children:[]},{label:'盘县',children:[]},{label:'六枝特区',children:[]},{label:'其他',children:[]}]},

            { label: '遵义', children: [{label:'红花岗区',children:[]},{label:'汇川区',children:[]},{label:'赤水市',children:[]},{label:'仁怀市',children:[]},{label:'遵义县',children:[]},{label:'绥阳县',children:[]},{label:'桐梓县',children:[]},{label:'习水县',children:[]},{label:'凤冈县',children:[]},{label:'正安县',children:[]},{label:'余庆县',children:[]},{label:'湄潭县',children:[]},{label:'道真仡佬族苗族自治县',children:[]},{label:'务川仡佬族苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '安顺', children: [{label:'西秀区',children:[]},{label:'普定县',children:[]},{label:'平坝县',children:[]},{label:'镇宁布依族苗族自治县',children:[]},{label:'紫云苗族布依族自治县',children:[]},{label:'关岭布依族苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '铜仁地区', children: [{label:'铜仁市',children:[]},{label:'德江县',children:[]},{label:'江口县',children:[]},{label:'思南县',children:[]},{label:'石阡县',children:[]},{label:'玉屏侗族自治县',children:[]},{label:'松桃苗族自治县',children:[]},{label:'印江土家族苗族自治县',children:[]},{label:'沿河土家族自治县',children:[]},{label:'万山特区',children:[]},{label:'其他',children:[]}]},

            { label: '毕节地区', children: [{label:'毕节市',children:[]},{label:'黔西县',children:[]},{label:'大方县',children:[]},{label:'织金县',children:[]},{label:'金沙县',children:[]},{label:'赫章县',children:[]},{label:'纳雍县',children:[]},{label:'威宁彝族回族苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '黔西南布依族苗族自治州', children: [{label:'兴义市',children:[]},{label:'望谟县',children:[]},{label:'兴仁县',children:[]},{label:'普安县',children:[]},{label:'册亨县',children:[]},{label:'晴隆县',children:[]},{label:'贞丰县',children:[]},{label:'安龙县',children:[]},{label:'其他',children:[]}]},

            { label: '黔东南苗族侗族自治州', children: [{label:'凯里市',children:[]},{label:'施秉县',children:[]},{label:'从江县',children:[]},{label:'锦屏县',children:[]},{label:'镇远县',children:[]},{label:'麻江县',children:[]},{label:'台江县',children:[]},{label:'天柱县',children:[]},{label:'黄平县',children:[]},{label:'榕江县',children:[]},{label:'剑河县',children:[]},{label:'三穗县',children:[]},{label:'雷山县',children:[]},{label:'黎平县',children:[]},{label:'岑巩县',children:[]},{label:'丹寨县',children:[]},{label:'其他',children:[]}]},

            { label: '黔南布依族苗族自治州', children: [{label:'都匀市',children:[]},{label:'福泉市',children:[]},{label:'贵定县',children:[]},{label:'惠水县',children:[]},{label:'罗甸县',children:[]},{label:'瓮安县',children:[]},{label:'荔波县',children:[]},{label:'龙里县',children:[]},{label:'平塘县',children:[]},{label:'长顺县',children:[]},{label:'独山县',children:[]},{label:'三都水族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '云南',
        value: 'YunNan',
        children: [

            { label: '昆明', children: [{label:'盘龙区',children:[]},{label:'五华区',children:[]},{label:'官渡区',children:[]},{label:'西山区',children:[]},{label:'东川区',children:[]},{label:'安宁市',children:[]},{label:'呈贡县',children:[]},{label:'晋宁县',children:[]},{label:'富民县',children:[]},{label:'宜良县',children:[]},{label:'嵩明县',children:[]},{label:'石林彝族自治县',children:[]},{label:'禄劝彝族苗族自治县',children:[]},{label:'寻甸回族彝族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '曲靖', children: [{label:'麒麟区',children:[]},{label:'宣威市',children:[]},{label:'马龙县',children:[]},{label:'沾益县',children:[]},{label:'富源县',children:[]},{label:'罗平县',children:[]},{label:'师宗县',children:[]},{label:'陆良县',children:[]},{label:'会泽县',children:[]},{label:'其他',children:[]}]},

            { label: '玉溪', children: [{label:'红塔区',children:[]},{label:'江川县',children:[]},{label:'澄江县',children:[]},{label:'通海县',children:[]},{label:'华宁县',children:[]},{label:'易门县',children:[]},{label:'峨山彝族自治县',children:[]},{label:'新平彝族傣族自治县',children:[]},{label:'元江哈尼族彝族傣族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '保山', children: [{label:'隆阳区',children:[]},{label:'施甸县',children:[]},{label:'腾冲县',children:[]},{label:'龙陵县',children:[]},{label:'昌宁县',children:[]},{label:'其他',children:[]}]},

            { label: '昭通', children: [{label:'昭阳区',children:[]},{label:'鲁甸县',children:[]},{label:'巧家县',children:[]},{label:'盐津县',children:[]},{label:'大关县',children:[]},{label:'永善县',children:[]},{label:'绥江县',children:[]},{label:'镇雄县',children:[]},{label:'彝良县',children:[]},{label:'威信县',children:[]},{label:'水富县',children:[]},{label:'其他',children:[]}]},

            { label: '丽江', children: [{label:'古城区',children:[]},{label:'永胜县',children:[]},{label:'华坪县',children:[]},{label:'玉龙纳西族自治县',children:[]},{label:'宁蒗彝族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '普洱', children: [{label:'思茅区',children:[]},{label:'普洱哈尼族彝族自治县',children:[]},{label:'墨江哈尼族自治县',children:[]},{label:'景东彝族自治县',children:[]},{label:'景谷傣族彝族自治县',children:[]},{label:'镇沅彝族哈尼族拉祜族自治县',children:[]},{label:'江城哈尼族彝族自治县',children:[]},{label:'孟连傣族拉祜族佤族自治县',children:[]},{label:'澜沧拉祜族自治县',children:[]},{label:'西盟佤族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '临沧', children: [{label:'临翔区',children:[]},{label:'凤庆县',children:[]},{label:'云县',children:[]},{label:'永德县',children:[]},{label:'镇康县',children:[]},{label:'双江拉祜族佤族布朗族傣族自治县',children:[]},{label:'耿马傣族佤族自治县',children:[]},{label:'沧源佤族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '德宏傣族景颇族自治州', children: [{label:'潞西市',children:[]},{label:'瑞丽市',children:[]},{label:'梁河县',children:[]},{label:'盈江县',children:[]},{label:'陇川县',children:[]},{label:'其他',children:[]}]},

            { label: '怒江傈僳族自治州', children: [{label:'泸水县',children:[]},{label:'福贡县',children:[]},{label:'贡山独龙族怒族自治县',children:[]},{label:'兰坪白族普米族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '迪庆藏族自治州', children: [{label:'香格里拉县',children:[]},{label:'德钦县',children:[]},{label:'维西傈僳族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '大理白族自治州', children: [{label:'大理市',children:[]},{label:'祥云县',children:[]},{label:'宾川县',children:[]},{label:'弥渡县',children:[]},{label:'永平县',children:[]},{label:'云龙县',children:[]},{label:'洱源县',children:[]},{label:'剑川县',children:[]},{label:'鹤庆县',children:[]},{label:'漾濞彝族自治县',children:[]},{label:'南涧彝族自治县',children:[]},{label:'巍山彝族回族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '楚雄彝族自治州', children: [{label:'楚雄市',children:[]},{label:'双柏县',children:[]},{label:'牟定县',children:[]},{label:'南华县',children:[]},{label:'姚安县',children:[]},{label:'大姚县',children:[]},{label:'永仁县',children:[]},{label:'元谋县',children:[]},{label:'武定县',children:[]},{label:'禄丰县',children:[]},{label:'其他',children:[]}]},

            { label: '红河哈尼族彝族自治州', children: [{label:'蒙自县',children:[]},{label:'个旧市',children:[]},{label:'开远市',children:[]},{label:'绿春县',children:[]},{label:'建水县',children:[]},{label:'石屏县',children:[]},{label:'弥勒县',children:[]},{label:'泸西县',children:[]},{label:'元阳县',children:[]},{label:'红河县',children:[]},{label:'金平苗族瑶族傣族自治县',children:[]},{label:'河口瑶族自治县',children:[]},{label:'屏边苗族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '文山壮族苗族自治州', children: [{label:'文山县',children:[]},{label:'砚山县',children:[]},{label:'西畴县',children:[]},{label:'麻栗坡县',children:[]},{label:'马关县',children:[]},{label:'丘北县',children:[]},{label:'广南县',children:[]},{label:'富宁县',children:[]},{label:'其他',children:[]}]},

            { label: '西双版纳傣族自治州', children: [{label:'景洪市',children:[]},{label:'勐海县',children:[]},{label:'勐腊县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '西藏',
        value: 'XiZang',
        children: [

            { label: '拉萨', children: [{label:'城关区',children:[]},{label:'林周县',children:[]},{label:'当雄县',children:[]},{label:'尼木县',children:[]},{label:'曲水县',children:[]},{label:'堆龙德庆县',children:[]},{label:'达孜县',children:[]},{label:'墨竹工卡县',children:[]},{label:'其他',children:[]}]},

            { label: '那曲地区', children: [{label:'那曲县',children:[]},{label:'嘉黎县',children:[]},{label:'比如县',children:[]},{label:'聂荣县',children:[]},{label:'安多县',children:[]},{label:'申扎县',children:[]},{label:'索县',children:[]},{label:'班戈县',children:[]},{label:'巴青县',children:[]},{label:'尼玛县',children:[]},{label:'其他',children:[]}]},

            { label: '昌都地区', children: [{label:'昌都县',children:[]},{label:'江达县',children:[]},{label:'贡觉县',children:[]},{label:'类乌齐县',children:[]},{label:'丁青县',children:[]},{label:'察雅县',children:[]},{label:'八宿县',children:[]},{label:'左贡县',children:[]},{label:'芒康县',children:[]},{label:'洛隆县',children:[]},{label:'边坝县',children:[]},{label:'其他',children:[]}]},

            { label: '林芝地区', children: [{label:'林芝县',children:[]},{label:'工布江达县',children:[]},{label:'米林县',children:[]},{label:'墨脱县',children:[]},{label:'波密县',children:[]},{label:'察隅县',children:[]},{label:'朗县',children:[]},{label:'其他',children:[]}]},

            { label: '山南地区', children: [{label:'乃东县',children:[]},{label:'扎囊县',children:[]},{label:'贡嘎县',children:[]},{label:'桑日县',children:[]},{label:'琼结县',children:[]},{label:'曲松县',children:[]},{label:'措美县',children:[]},{label:'洛扎县',children:[]},{label:'加查县',children:[]},{label:'隆子县',children:[]},{label:'错那县',children:[]},{label:'浪卡子县',children:[]},{label:'其他',children:[]}]},

            { label: '日喀则地区', children: [{label:'日喀则市',children:[]},{label:'南木林县',children:[]},{label:'江孜县',children:[]},{label:'定日县',children:[]},{label:'萨迦县',children:[]},{label:'拉孜县',children:[]},{label:'昂仁县',children:[]},{label:'谢通门县',children:[]},{label:'白朗县',children:[]},{label:'仁布县',children:[]},{label:'康马县',children:[]},{label:'定结县',children:[]},{label:'仲巴县',children:[]},{label:'亚东县',children:[]},{label:'吉隆县',children:[]},{label:'聂拉木县',children:[]},{label:'萨嘎县',children:[]},{label:'岗巴县',children:[]},{label:'其他',children:[]}]},

            { label: '阿里地区', children: [{label:'噶尔县',children:[]},{label:'普兰县',children:[]},{label:'札达县',children:[]},{label:'日土县',children:[]},{label:'革吉县',children:[]},{label:'改则县',children:[]},{label:'措勤县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '陕西',
        value: 'ShanXi',
        children: [

            { label: '西安', children: [{label:'莲湖区',children:[]},{label:'新城区',children:[]},{label:'碑林区',children:[]},{label:'雁塔区',children:[]},{label:'灞桥区',children:[]},{label:'未央区',children:[]},{label:'阎良区',children:[]},{label:'临潼区',children:[]},{label:'长安区',children:[]},{label:'高陵县',children:[]},{label:'蓝田县',children:[]},{label:'户县',children:[]},{label:'周至县',children:[]},{label:'其他',children:[]}]},

            { label: '铜川', children: [{label:'耀州区',children:[]},{label:'王益区',children:[]},{label:'印台区',children:[]},{label:'宜君县',children:[]},{label:'其他',children:[]}]},

            { label: '宝鸡', children: [{label:'渭滨区',children:[]},{label:'金台区',children:[]},{label:'陈仓区',children:[]},{label:'岐山县',children:[]},{label:'凤翔县',children:[]},{label:'陇县',children:[]},{label:'太白县',children:[]},{label:'麟游县',children:[]},{label:'扶风县',children:[]},{label:'千阳县',children:[]},{label:'眉县',children:[]},{label:'凤县',children:[]},{label:'其他',children:[]}]},

            { label: '咸阳', children: [{label:'秦都区',children:[]},{label:'渭城区',children:[]},{label:'杨陵区',children:[]},{label:'兴平市',children:[]},{label:'礼泉县',children:[]},{label:'泾阳县',children:[]},{label:'永寿县',children:[]},{label:'三原县',children:[]},{label:'彬县',children:[]},{label:'旬邑县',children:[]},{label:'长武县',children:[]},{label:'乾县',children:[]},{label:'武功县',children:[]},{label:'淳化县',children:[]},{label:'其他',children:[]}]},

            { label: '渭南', children: [{label:'临渭区',children:[]},{label:'韩城市',children:[]},{label:'华阴市',children:[]},{label:'蒲城县',children:[]},{label:'潼关县',children:[]},{label:'白水县',children:[]},{label:'澄城县',children:[]},{label:'华县',children:[]},{label:'合阳县',children:[]},{label:'富平县',children:[]},{label:'大荔县',children:[]},{label:'其他',children:[]}]},

            { label: '延安', children: [{label:'宝塔区',children:[]},{label:'安塞县',children:[]},{label:'洛川县',children:[]},{label:'子长县',children:[]},{label:'黄陵县',children:[]},{label:'延川县',children:[]},{label:'富县',children:[]},{label:'延长县',children:[]},{label:'甘泉县',children:[]},{label:'宜川县',children:[]},{label:'志丹县',children:[]},{label:'黄龙县',children:[]},{label:'吴起县',children:[]},{label:'其他',children:[]}]},

            { label: '汉中', children: [{label:'汉台区',children:[]},{label:'留坝县',children:[]},{label:'镇巴县',children:[]},{label:'城固县',children:[]},{label:'南郑县',children:[]},{label:'洋县',children:[]},{label:'宁强县',children:[]},{label:'佛坪县',children:[]},{label:'勉县',children:[]},{label:'西乡县',children:[]},{label:'略阳县',children:[]},{label:'其他',children:[]}]},

            { label: '榆林', children: [{label:'榆阳区',children:[]},{label:'清涧县',children:[]},{label:'绥德县',children:[]},{label:'神木县',children:[]},{label:'佳县',children:[]},{label:'府谷县',children:[]},{label:'子洲县',children:[]},{label:'靖边县',children:[]},{label:'横山县',children:[]},{label:'米脂县',children:[]},{label:'吴堡县',children:[]},{label:'定边县',children:[]},{label:'其他',children:[]}]},

            { label: '安康', children: [{label:'汉滨区',children:[]},{label:'紫阳县',children:[]},{label:'岚皋县',children:[]},{label:'旬阳县',children:[]},{label:'镇坪县',children:[]},{label:'平利县',children:[]},{label:'石泉县',children:[]},{label:'宁陕县',children:[]},{label:'白河县',children:[]},{label:'汉阴县',children:[]},{label:'其他',children:[]}]},

            { label: '商洛', children: [{label:'商州区',children:[]},{label:'镇安县',children:[]},{label:'山阳县',children:[]},{label:'洛南县',children:[]},{label:'商南县',children:[]},{label:'丹凤县',children:[]},{label:'柞水县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '甘肃',
        value: 'GanSu',
        children: [

            { label: '兰州', children: [{label:'城关区',children:[]},{label:'七里河区',children:[]},{label:'西固区',children:[]},{label:'安宁区',children:[]},{label:'红古区',children:[]},{label:'永登县',children:[]},{label:'皋兰县',children:[]},{label:'榆中县',children:[]},{label:'其他',children:[]}]},

            { label: '嘉峪关', children: [{label:'嘉峪关市',children:[]},{label:'其他',children:[]}]},

            { label: '金昌', children: [{label:'金川区',children:[]},{label:'永昌县',children:[]},{label:'其他',children:[]}]},

            { label: '白银', children: [{label:'白银区',children:[]},{label:'平川区',children:[]},{label:'靖远县',children:[]},{label:'会宁县',children:[]},{label:'景泰县',children:[]},{label:'其他',children:[]}]},

            { label: '天水', children: [{label:'清水县',children:[]},{label:'秦安县',children:[]},{label:'甘谷县',children:[]},{label:'武山县',children:[]},{label:'张家川回族自治县',children:[]},{label:'北道区',children:[]},{label:'秦城区',children:[]},{label:'其他',children:[]}]},

            { label: '武威', children: [{label:'凉州区',children:[]},{label:'民勤县',children:[]},{label:'古浪县',children:[]},{label:'天祝藏族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '酒泉', children: [{label:'肃州区',children:[]},{label:'玉门市',children:[]},{label:'敦煌市',children:[]},{label:'金塔县',children:[]},{label:'肃北蒙古族自治县',children:[]},{label:'阿克塞哈萨克族自治县',children:[]},{label:'安西县',children:[]},{label:'其他',children:[]}]},

            { label: '张掖', children: [{label:'甘州区',children:[]},{label:'民乐县',children:[]},{label:'临泽县',children:[]},{label:'高台县',children:[]},{label:'山丹县',children:[]},{label:'肃南裕固族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '庆阳', children: [{label:'西峰区',children:[]},{label:'庆城县',children:[]},{label:'环县',children:[]},{label:'华池县',children:[]},{label:'合水县',children:[]},{label:'正宁县',children:[]},{label:'宁县',children:[]},{label:'镇原县',children:[]},{label:'其他',children:[]}]},

            { label: '平凉', children: [{label:'崆峒区',children:[]},{label:'泾川县',children:[]},{label:'灵台县',children:[]},{label:'崇信县',children:[]},{label:'华亭县',children:[]},{label:'庄浪县',children:[]},{label:'静宁县',children:[]},{label:'其他',children:[]}]},

            { label: '定西', children: [{label:'安定区',children:[]},{label:'通渭县',children:[]},{label:'临洮县',children:[]},{label:'漳县',children:[]},{label:'岷县',children:[]},{label:'渭源县',children:[]},{label:'陇西县',children:[]},{label:'其他',children:[]}]},

            { label: '陇南', children: [{label:'武都区',children:[]},{label:'成县',children:[]},{label:'宕昌县',children:[]},{label:'康县',children:[]},{label:'文县',children:[]},{label:'西和县',children:[]},{label:'礼县',children:[]},{label:'两当县',children:[]},{label:'徽县',children:[]},{label:'其他',children:[]}]},

            { label: '临夏回族自治州', children: [{label:'临夏市',children:[]},{label:'临夏县',children:[]},{label:'康乐县',children:[]},{label:'永靖县',children:[]},{label:'广河县',children:[]},{label:'和政县',children:[]},{label:'东乡族自治县',children:[]},{label:'积石山保安族东乡族撒拉族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '甘南藏族自治州', children: [{label:'合作市',children:[]},{label:'临潭县',children:[]},{label:'卓尼县',children:[]},{label:'舟曲县',children:[]},{label:'迭部县',children:[]},{label:'玛曲县',children:[]},{label:'碌曲县',children:[]},{label:'夏河县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '青海',
        value: 'QingHai',
        children: [

            { label: '西宁', children: [{label:'城中区',children:[]},{label:'城东区',children:[]},{label:'城西区',children:[]},{label:'城北区',children:[]},{label:'湟源县',children:[]},{label:'湟中县',children:[]},{label:'大通回族土族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '海东地区', children: [{label:'平安县',children:[]},{label:'乐都县',children:[]},{label:'民和回族土族自治县',children:[]},{label:'互助土族自治县',children:[]},{label:'化隆回族自治县',children:[]},{label:'循化撒拉族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '海北藏族自治州', children: [{label:'海晏县',children:[]},{label:'祁连县',children:[]},{label:'刚察县',children:[]},{label:'门源回族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '海南藏族自治州', children: [{label:'共和县',children:[]},{label:'同德县',children:[]},{label:'贵德县',children:[]},{label:'兴海县',children:[]},{label:'贵南县',children:[]},{label:'其他',children:[]}]},

            { label: '黄南藏族自治州', children: [{label:'同仁县',children:[]},{label:'尖扎县',children:[]},{label:'泽库县',children:[]},{label:'河南蒙古族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '果洛藏族自治州', children: [{label:'玛沁县',children:[]},{label:'班玛县',children:[]},{label:'甘德县',children:[]},{label:'达日县',children:[]},{label:'久治县',children:[]},{label:'玛多县',children:[]},{label:'其他',children:[]}]},

            { label: '玉树藏族自治州', children: [{label:'玉树县',children:[]},{label:'杂多县',children:[]},{label:'称多县',children:[]},{label:'治多县',children:[]},{label:'囊谦县',children:[]},{label:'曲麻莱县',children:[]},{label:'其他',children:[]}]},

            { label: '海西蒙古族藏族自治州', children: [{label:'德令哈市',children:[]},{label:'格尔木市',children:[]},{label:'乌兰县',children:[]},{label:'都兰县',children:[]},{label:'天峻县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '宁夏',
        value: 'NingXia',
        children: [

            { label: '银川', children: [{label:'兴庆区',children:[]},{label:'西夏区',children:[]},{label:'金凤区',children:[]},{label:'灵武市',children:[]},{label:'永宁县',children:[]},{label:'贺兰县',children:[]},{label:'其他',children:[]}]},

            { label: '石嘴山', children: [{label:'大武口区',children:[]},{label:'惠农区',children:[]},{label:'平罗县',children:[]},{label:'其他',children:[]}]},

            { label: '吴忠', children: [{label:'利通区',children:[]},{label:'青铜峡市',children:[]},{label:'盐池县',children:[]},{label:'同心县',children:[]},{label:'其他',children:[]}]},

            { label: '固原', children: [{label:'原州区',children:[]},{label:'西吉县',children:[]},{label:'隆德县',children:[]},{label:'泾源县',children:[]},{label:'彭阳县',children:[]},{label:'其他',children:[]}]},

            { label: '中卫', children: [{label:'沙坡头区',children:[]},{label:'中宁县',children:[]},{label:'海原县',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '新疆',
        value: 'XinJiang',
        children: [

            { label: '乌鲁木齐', children: [{label:'天山区',children:[]},{label:'沙依巴克区',children:[]},{label:'新市区',children:[]},{label:'水磨沟区',children:[]},{label:'头屯河区',children:[]},{label:'达坂城区',children:[]},{label:'东山区',children:[]},{label:'乌鲁木齐县',children:[]},{label:'其他',children:[]}]},

            { label: '克拉玛依', children: [{label:'克拉玛依区',children:[]},{label:'独山子区',children:[]},{label:'白碱滩区',children:[]},{label:'乌尔禾区',children:[]},{label:'其他',children:[]}]},

            { label: '吐鲁番地区', children: [{label:'吐鲁番市',children:[]},{label:'托克逊县',children:[]},{label:'鄯善县',children:[]},{label:'其他',children:[]}]},

            { label: '哈密地区', children: [{label:'哈密市',children:[]},{label:'伊吾县',children:[]},{label:'巴里坤哈萨克自治县',children:[]},{label:'其他',children:[]}]},

            { label: '和田地区', children: [{label:'和田市',children:[]},{label:'和田县',children:[]},{label:'洛浦县',children:[]},{label:'民丰县',children:[]},{label:'皮山县',children:[]},{label:'策勒县',children:[]},{label:'于田县',children:[]},{label:'墨玉县',children:[]},{label:'其他',children:[]}]},

            { label: '阿克苏地区', children: [{label:'阿克苏市',children:[]},{label:'温宿县',children:[]},{label:'沙雅县',children:[]},{label:'拜城县',children:[]},{label:'阿瓦提县',children:[]},{label:'库车县',children:[]},{label:'柯坪县',children:[]},{label:'新和县',children:[]},{label:'乌什县',children:[]},{label:'其他',children:[]}]},

            { label: '喀什地区', children: [{label:'喀什市',children:[]},{label:'巴楚县',children:[]},{label:'泽普县',children:[]},{label:'伽师县',children:[]},{label:'叶城县',children:[]},{label:'岳普湖县',children:[]},{label:'疏勒县',children:[]},{label:'麦盖提县',children:[]},{label:'英吉沙县',children:[]},{label:'莎车县',children:[]},{label:'疏附县',children:[]},{label:'塔什库尔干塔吉克自治县',children:[]},{label:'其他',children:[]}]},

            { label: '克孜勒苏柯尔克孜自治州', children: [{label:'阿图什市',children:[]},{label:'阿合奇县',children:[]},{label:'乌恰县',children:[]},{label:'阿克陶县',children:[]},{label:'其他',children:[]}]},

            { label: '巴音郭楞蒙古自治州', children: [{label:'库尔勒市',children:[]},{label:'和静县',children:[]},{label:'尉犁县',children:[]},{label:'和硕县',children:[]},{label:'且末县',children:[]},{label:'博湖县',children:[]},{label:'轮台县',children:[]},{label:'若羌县',children:[]},{label:'焉耆回族自治县',children:[]},{label:'其他',children:[]}]},

            { label: '昌吉回族自治州', children: [{label:'昌吉市',children:[]},{label:'阜康市',children:[]},{label:'奇台县',children:[]},{label:'玛纳斯县',children:[]},{label:'吉木萨尔县',children:[]},{label:'呼图壁县',children:[]},{label:'木垒哈萨克自治县',children:[]},{label:'米泉市',children:[]},{label:'其他',children:[]}]},

            { label: '博尔塔拉蒙古自治州', children: [{label:'博乐市',children:[]},{label:'精河县',children:[]},{label:'温泉县',children:[]},{label:'其他',children:[]}]},

            { label: '石河子', children: [{label:'石河子',children:[]}]},

            { label: '阿拉尔', children: [{label:'阿拉尔',children:[]}]},

            { label: '图木舒克', children: [{label:'图木舒克',children:[]}]},

            { label: '五家渠', children: [{label:'五家渠',children:[]}]},

            { label: '伊犁哈萨克自治州', children: [{label:'伊宁市',children:[]},{label:'奎屯市',children:[]},{label:'伊宁县',children:[]},{label:'特克斯县',children:[]},{label:'尼勒克县',children:[]},{label:'昭苏县',children:[]},{label:'新源县',children:[]},{label:'霍城县',children:[]},{label:'巩留县',children:[]},{label:'察布查尔锡伯自治县',children:[]},{label:'塔城地区',children:[]},{label:'阿勒泰地区',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '台湾',
        value: 'TaiWan',
        children: [

            { label: '台湾', children: [{label:'台北市',children:[]},{label:'高雄市',children:[]},{label:'台北县',children:[]},{label:'桃园县',children:[]},{label:'新竹县',children:[]},{label:'苗栗县',children:[]},{label:'台中县',children:[]},{label:'彰化县',children:[]},{label:'南投县',children:[]},{label:'云林县',children:[]},{label:'嘉义县',children:[]},{label:'台南县',children:[]},{label:'高雄县',children:[]},{label:'屏东县',children:[]},{label:'宜兰县',children:[]},{label:'花莲县',children:[]},{label:'台东县',children:[]},{label:'澎湖县',children:[]},{label:'基隆市',children:[]},{label:'新竹市',children:[]},{label:'台中市',children:[]},{label:'嘉义市',children:[]},{label:'台南市',children:[]},{label:'其他',children:[]}]},

            { label: '其他', children: [{label:'其他',children:[]}]}

        ]
    },

    {
        label: '澳门',
        value: 'AoMen',
        children: [

            { label: '澳门', children: [{label:'花地玛堂区',children:[]},{label:'圣安多尼堂区',children:[]},{label:'大堂区',children:[]},{label:'望德堂区',children:[]},{label:'风顺堂区',children:[]},{label:'嘉模堂区',children:[]},{label:'圣方济各堂区',children:[]},{label:'路凼',children:[]},{label:'其他',children:[]}]}

        ]
    },

    {
        label: '香港',
        value: 'XiangGang',
        children: [

            { label: '香港', children: [{label:'中西区',children:[]},{label:'湾仔区',children:[]},{label:'东区',children:[]},{label:'南区',children:[]},{label:'深水埗区',children:[]},{label:'油尖旺区',children:[]},{label:'九龙城区',children:[]},{label:'黄大仙区',children:[]},{label:'观塘区',children:[]},{label:'北区',children:[]},{label:'大埔区',children:[]},{label:'沙田区',children:[]},{label:'西贡区',children:[]},{label:'元朗区',children:[]},{label:'屯门区',children:[]},{label:'荃湾区',children:[]},{label:'葵青区',children:[]},{label:'离岛区',children:[]},{label:'其他',children:[]}]}

        ]
    }
],
      }
    },
    methods: {
      generateCode() {
        this.showIt = !this.showIt
      },
      getSchoolInfo(id) {
        var _this = this
        PUBLIC.get('User.Mechanism.Selauth', { id: id, page: '1' }, function(data) {
          console.log(data)
          var newData = [];
          var demo = {
            name: 'name',
            username:'username',
            rec_status: 'rec_status',
            user_phone: 'user_phone',
            contract_num: 'contract_num',
            contract_doc: 'contract_doc',
            auth_dir: 'auth_dir',


          }
          newData =  PUBLIC.formatObj(demo, data)
          // newData
          _this.schoolInfo = newData
          _this.checkedAuthorize = _this.schoolInfo.auth_dir.split(',')
          _this.oldCheck=JSON.parse(JSON.stringify(_this.checkedAuthorize))
          _this.selectedOptions=[data.province,data.city,data.county]
          console.log(_this.checkedAuthorize)
        })
      },
      upSchoolInfo() {
        var _this = this
        this.schoolInfo.auth_dir = _this.checkedAuthorize
        console.log(this.schoolInfo.auth_dir)
        PUBLIC.get("User.Mechanism.Melist",{user_phone:_this.schoolInfo.user_phone},function(data){

          for(var n=0;n<data.length;n++){
            if(data[n].user_phone==_this.schoolInfo.user_phone && data[n].id!=_this.id){
              PUBLIC.toa("该手机号已使用")
              return
            }
          }

          // if(data.length==0){
              console.log(_this.selectedOptions)
            PUBLIC.get('User.Mechanism.Updateauth', { id: _this.id, name: _this.schoolInfo.name, username: _this.schoolInfo.username, user_phone: _this.schoolInfo.user_phone, contract_num: _this.schoolInfo.contract_num, contract_doc: _this.schoolInfo.contract_doc, auth_dir: _this.checkedAuthorize,pro:_this.selectedOptions[0],city:_this.selectedOptions[1],county:_this.selectedOptions[2]}, function(data) {
            console.log(data)
            var closeClass= Array.from(new Set(_this.oldCheck.concat(_this.checkedAuthorize).filter(v => !new Set(_this.oldCheck).has(v) || !new Set(_this.checkedAuthorize).has(v))))
            console.log(closeClass)

            // _this.quit()
            if(data == true){
              _this.$router.push({name:'园所资料',query: { page: _this.page }})
            }
          })
          // }
        })


      },
      upFile:function(){
      console.log("触发上传")
      document.getElementById("upFileForm").click();
    },
    upFileChange:function(){
      var _this=this
      console.log("开始上传文件")
      PUBLIC.postFile("upFileForm",function(data){
        _this.schoolInfo.contract_doc=data
      })
    },
    quit:function(){
      this.$router.push({name:'园所资料',query: { page: this.page }})
    },
    getRegionList:function(){
        var _this=this
        //构建address数据树形结构
        var addIndex=0
        for(var n=0;n<this.region1.length;n++){
          addIndex++
          this.region1[n].id=addIndex
          this.region1[n].value=this.region1[n].label
          this.region1[n].children=this.region1[n].children?this.region1[n].children:[]
          for(var i=0;i<this.region1[n].children.length;i++){
            addIndex++
            this.region1[n].children[i].id=addIndex
            this.region1[n].children[i].value=this.region1[n].children[i].label
            this.region1[n].children[i].parentId=this.region1[n].id
            this.region1[n].children[i].children=this.region1[n].children[i].children?this.region1[n].children[i].children:[]
            for(var x=0;x<this.region1[n].children[i].children.length;x++){
              addIndex++
              this.region1[n].children[i].children[x].id=addIndex
              this.region1[n].children[i].children[x].value=this.region1[n].children[i].children[x].label
              // this.region1[n].children[i].children[x].children=[]
              delete this.region1[n].children[i].children[x].children
              this.region1[n].children[i].children[x].parentId=this.region1[n].children[i].id

            }
          }
        }

        this.region = JSON.parse(JSON.stringify(this.region1))
        console.log(this.region)
        // this.oldOptions=JSON.parse(JSON.stringify(this.testAddress))
      },
    },
    mounted() {
      this.page = this.$route.params.page
      this.id = this.$route.params.id
      DATAC.setConf(this)
      this.getSchoolInfo(this.id)
      this.getRegionList()
    },
    watch: {
      checkedAuthorize() {
        console.log(this.checkedAuthorize)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  .schoolInfo{
    padding: 120px 470px;
    .memberInfo{
      font-size: 14px;
      p {
        text-align: left;
        span{
          display: inline-block;
          .title{
            width: 110px;
            text-align: right;
            padding-right: 10px;
          }
          .innerText{
            width: 200px;
          }
          .el-checkbox{
            width: 146px;
            margin-left: 0;
          }
        }
        >span{
          padding-bottom: 55px;
          height: 80px;
          >span{
            width: 80%;
            line-height: 30px;
          }
        }
        >span:first-of-type{
          margin-right: 70px;
        }
      }
      .name{
        .el-input{
          width: 400px;
        }
      }
      .address{
        .city{
          width: 120px;
        }
        .info{
          width: 435px;
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
      .duoxuan{
        >span:first-of-type{
          margin-right: 0;
        }
        .title{
          vertical-align: top;
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
  }

</style>
