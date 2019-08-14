// 用于模拟搜索的数据
let allusers = [] // 全部数据
let CUR_FILTERDATA = [] // 过滤后的数据

let perpagecount = 10 // 每页显示的数量
// let CUR_PAGE = 1

export const searchdata = (k = {}) => {
  let data = []
  for (let i = 0; i < allusers.length; i++) {
    if (allusers[i].name.indexOf(k.name) !== -1) {
      data.push(allusers[i])
    }
  }
  return Promise.resolve(data)
}
export const dofilter = (allfilter = {}) => {
  let data = []
  let filter = allfilter.filters
  let page = allfilter.page
  for (let i = 0; i < allusers.length; i++) {
    let sameKeyNum = 0
    for (let k in filter) {
      if (k === 'birthPlace') {
        if (allusers[i][k].child.code === filter[k] + '') sameKeyNum++
      }
      if (k === 'birthDay') {
        var gt = new Date(filter[k]['gt']).getTime()
        var lt = new Date(filter[k]['lt']).getTime()
        var usertime = new Date(allusers[i][k]).getTime()
        if (usertime <= lt && usertime >= gt) {
          sameKeyNum++
        }
      }
      if (k === 'age') {
        let agea = filter[k].split(',')
        if (allusers[i][k] <= agea[1] && allusers[i][k] >= agea[0]) {
          sameKeyNum++
        }
      }
      if (allusers[i][k] === filter[k] + '') {
        sameKeyNum++
      }
    }
    if (sameKeyNum === Object.keys(filter).length) data.push(allusers[i])
  }
  if (Object.keys(filter).length === 0) data = allusers
  CUR_FILTERDATA = data
  let rdata = CUR_FILTERDATA.slice(perpagecount * (page - 1), perpagecount * (page - 1) + perpagecount)
  let _page = Math.ceil(data.length / perpagecount) ? Math.ceil(data.length / perpagecount) : 1
  let res = {
    data: rdata,
    pagenum: _page
  }
  return res
}
// 模拟radio
export const radiodata = () => {
  let data = [
    { label: '项目1', value: 1 },
    { label: '项目2', value: 2 },
    { label: '项目3', value: 3 },
    { label: '项目4', value: 4 },
    { label: '项目5', value: 5 }
  ]
  return Promise.resolve(data)
}
// 随机生成表数据
export const createTableDataByRandom = (len) => {
  let users = []
  const xarr = ['王', '黄', '陈', '方', '林', '刘', '张', '吴', '蔡', '龚', '杨', '潘', '俞', '庄', '许', '徐', '欧阳', '欧', '诸葛', '肖', '涂', '严', '颜', '冯', '曾']
  const nchar = ['容止', '羡林', '芷', '回', '言蹊', '思睿', '怀瑾', '瑾', '遇', '道韫', '弦', '柳', '酒', '梦', '桑', '遥', '雨夕', '风遥', '雁白', '青沐', '合', '逸思', '霏', '清疏', '秋荻', '廷轩', '轩', '宇', '絮影', '清淮', '柳依', '寒箫', '箫', '惜夏', '意轩', '旖旎', '慕青', '宣', '晓', '沛', '斯年', '莲舟', '依凝', '井与', '予锦', '艳', '淑芬', '思哲', '湛', '梦文', '承嗣', '博艺', '玲杰', '德馨', '琪维', '俊', '钰', '蔚', '彬郁', '诗嘉', '津媛', '艺歆', '奕然', '雯梦', '思佳']
  const phead = ['134', '135', '137', '138', '155', '130', '186', '133', '153', '180', '150', '151', '188']
  const numstr = '0123456789'
  const gchar = ['1', '2']
  const csign = ['+', '-']
  const bcity = cities()
  let byear = 1996
  for (let i = 0; i < len; i++) {
    let curuser = {}
    let cursing = csign[Math.floor(Math.random() * csign.length)]

    let curx = xarr[Math.floor(Math.random() * xarr.length)]
    let curn = nchar[Math.floor(Math.random() * nchar.length)]
    let cury = 1996
    let curm = Math.floor(Math.random() * 11) + 1
    let curd = Math.floor(Math.random() * 29) + 1
    let gender = gchar[Math.floor(Math.random() * gchar.length)]
    if (cursing === '+') cury = byear + Math.floor(Math.random() * 10)
    if (cursing === '-') cury = byear - Math.floor(Math.random() * 10)
    let age = 2018 - cury
    // 获取手机号
    let phone = phead[Math.floor(Math.random() * phead.length)]
    for (let j = 0; j < 8; j++) {
      phone += numstr.charAt(Math.floor(Math.random() * numstr.length))
    }
    let province = bcity[Math.floor(Math.random() * bcity.length)]
    let city = province.children[Math.floor(Math.random() * province.children.length)]
    let birthPlace = JSON.parse(JSON.stringify(province))
    birthPlace.child = city
    delete birthPlace.children
    curuser = {
      gender,
      age,
      phone,
      birthPlace,
      name: curx + curn,
      uid: randomString(16),
      birthDay: cury + '.' + curm + '.' + curd
    }
    users.push(curuser)
  }
  allusers = JSON.parse(JSON.stringify(users))
  let _page = Math.ceil(users.length / perpagecount) ? Math.ceil(users.length / perpagecount) : 1
  let rdata = users.slice(0, perpagecount)
  let res = {
    data: rdata,
    pagenum: _page
  }
  return res
}
// 获取uid
const randomString = function (len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return 'uid_' + pwd
}
// 表数据
export const tabledata = () => {
  let data = []
  return Promise.resolve(data)
}

// 获取城市
export const cities = () => {
  let data = [{ 'code': '11', 'name': '北京市', 'children': [{ 'code': '1101', 'name': '北京市辖区' }] }, { 'code': '12', 'name': '天津市', 'children': [{ 'code': '1201', 'name': '天津市辖区' }] }, { 'code': '13', 'name': '河北省', 'children': [{ 'code': '1301', 'name': '石家庄市' }, { 'code': '1302', 'name': '唐山市' }, { 'code': '1303', 'name': '秦皇岛市' }, { 'code': '1304', 'name': '邯郸市' }, { 'code': '1305', 'name': '邢台市' }, { 'code': '1306', 'name': '保定市' }, { 'code': '1307', 'name': '张家口市' }, { 'code': '1308', 'name': '承德市' }, { 'code': '1309', 'name': '沧州市' }, { 'code': '1310', 'name': '廊坊市' }, { 'code': '1311', 'name': '衡水市' }] }, { 'code': '14', 'name': '山西省', 'children': [{ 'code': '1401', 'name': '太原市' }, { 'code': '1402', 'name': '大同市' }, { 'code': '1403', 'name': '阳泉市' }, { 'code': '1404', 'name': '长治市' }, { 'code': '1405', 'name': '晋城市' }, { 'code': '1406', 'name': '朔州市' }, { 'code': '1407', 'name': '晋中市' }, { 'code': '1408', 'name': '运城市' }, { 'code': '1409', 'name': '忻州市' }, { 'code': '1410', 'name': '临汾市' }, { 'code': '1411', 'name': '吕梁市' }] }, { 'code': '15', 'name': '内蒙古自治区', 'children': [{ 'code': '1501', 'name': '呼和浩特市' }, { 'code': '1502', 'name': '包头市' }, { 'code': '1503', 'name': '乌海市' }, { 'code': '1504', 'name': '赤峰市' }, { 'code': '1505', 'name': '通辽市' }, { 'code': '1506', 'name': '鄂尔多斯市' }, { 'code': '1507', 'name': '呼伦贝尔市' }, { 'code': '1508', 'name': '巴彦淖尔市' }, { 'code': '1509', 'name': '乌兰察布市' }, { 'code': '1522', 'name': '兴安盟' }, { 'code': '1525', 'name': '锡林郭勒盟' }, { 'code': '1529', 'name': '阿拉善盟' }] }, { 'code': '21', 'name': '辽宁省', 'children': [{ 'code': '2101', 'name': '沈阳市' }, { 'code': '2102', 'name': '大连市' }, { 'code': '2103', 'name': '鞍山市' }, { 'code': '2104', 'name': '抚顺市' }, { 'code': '2105', 'name': '本溪市' }, { 'code': '2106', 'name': '丹东市' }, { 'code': '2107', 'name': '锦州市' }, { 'code': '2108', 'name': '营口市' }, { 'code': '2109', 'name': '阜新市' }, { 'code': '2110', 'name': '辽阳市' }, { 'code': '2111', 'name': '盘锦市' }, { 'code': '2112', 'name': '铁岭市' }, { 'code': '2113', 'name': '朝阳市' }, { 'code': '2114', 'name': '葫芦岛市' }] }, { 'code': '22', 'name': '吉林省', 'children': [{ 'code': '2201', 'name': '长春市' }, { 'code': '2202', 'name': '吉林市' }, { 'code': '2203', 'name': '四平市' }, { 'code': '2204', 'name': '辽源市' }, { 'code': '2205', 'name': '通化市' }, { 'code': '2206', 'name': '白山市' }, { 'code': '2207', 'name': '松原市' }, { 'code': '2208', 'name': '白城市' }, { 'code': '2224', 'name': '延边朝鲜族自治州' }] }, { 'code': '23', 'name': '黑龙江省', 'children': [{ 'code': '2301', 'name': '哈尔滨市' }, { 'code': '2302', 'name': '齐齐哈尔市' }, { 'code': '2303', 'name': '鸡西市' }, { 'code': '2304', 'name': '鹤岗市' }, { 'code': '2305', 'name': '双鸭山市' }, { 'code': '2306', 'name': '大庆市' }, { 'code': '2307', 'name': '伊春市' }, { 'code': '2308', 'name': '佳木斯市' }, { 'code': '2309', 'name': '七台河市' }, { 'code': '2310', 'name': '牡丹江市' }, { 'code': '2311', 'name': '黑河市' }, { 'code': '2312', 'name': '绥化市' }, { 'code': '2327', 'name': '大兴安岭地区' }] }, { 'code': '31', 'name': '上海市', 'children': [{ 'code': '3101', 'name': '上海市辖区' }] }, { 'code': '32', 'name': '江苏省', 'children': [{ 'code': '3201', 'name': '南京市' }, { 'code': '3202', 'name': '无锡市' }, { 'code': '3203', 'name': '徐州市' }, { 'code': '3204', 'name': '常州市' }, { 'code': '3205', 'name': '苏州市' }, { 'code': '3206', 'name': '南通市' }, { 'code': '3207', 'name': '连云港市' }, { 'code': '3208', 'name': '淮安市' }, { 'code': '3209', 'name': '盐城市' }, { 'code': '3210', 'name': '扬州市' }, { 'code': '3211', 'name': '镇江市' }, { 'code': '3212', 'name': '泰州市' }, { 'code': '3213', 'name': '宿迁市' }] }, { 'code': '33', 'name': '浙江省', 'children': [{ 'code': '3301', 'name': '杭州市' }, { 'code': '3302', 'name': '宁波市' }, { 'code': '3303', 'name': '温州市' }, { 'code': '3304', 'name': '嘉兴市' }, { 'code': '3305', 'name': '湖州市' }, { 'code': '3306', 'name': '绍兴市' }, { 'code': '3307', 'name': '金华市' }, { 'code': '3308', 'name': '衢州市' }, { 'code': '3309', 'name': '舟山市' }, { 'code': '3310', 'name': '台州市' }, { 'code': '3311', 'name': '丽水市' }] }, { 'code': '34', 'name': '安徽省', 'children': [{ 'code': '3401', 'name': '合肥市' }, { 'code': '3402', 'name': '芜湖市' }, { 'code': '3403', 'name': '蚌埠市' }, { 'code': '3404', 'name': '淮南市' }, { 'code': '3405', 'name': '马鞍山市' }, { 'code': '3406', 'name': '淮北市' }, { 'code': '3407', 'name': '铜陵市' }, { 'code': '3408', 'name': '安庆市' }, { 'code': '3410', 'name': '黄山市' }, { 'code': '3411', 'name': '滁州市' }, { 'code': '3412', 'name': '阜阳市' }, { 'code': '3413', 'name': '宿州市' }, { 'code': '3415', 'name': '六安市' }, { 'code': '3416', 'name': '亳州市' }, { 'code': '3417', 'name': '池州市' }, { 'code': '3418', 'name': '宣城市' }] }, { 'code': '35', 'name': '福建省', 'children': [{ 'code': '3501', 'name': '福州市' }, { 'code': '3502', 'name': '厦门市' }, { 'code': '3503', 'name': '莆田市' }, { 'code': '3504', 'name': '三明市' }, { 'code': '3505', 'name': '泉州市' }, { 'code': '3506', 'name': '漳州市' }, { 'code': '3507', 'name': '南平市' }, { 'code': '3508', 'name': '龙岩市' }, { 'code': '3509', 'name': '宁德市' }] }, { 'code': '36', 'name': '江西省', 'children': [{ 'code': '3601', 'name': '南昌市' }, { 'code': '3602', 'name': '景德镇市' }, { 'code': '3603', 'name': '萍乡市' }, { 'code': '3604', 'name': '九江市' }, { 'code': '3605', 'name': '新余市' }, { 'code': '3606', 'name': '鹰潭市' }, { 'code': '3607', 'name': '赣州市' }, { 'code': '3608', 'name': '吉安市' }, { 'code': '3609', 'name': '宜春市' }, { 'code': '3610', 'name': '抚州市' }, { 'code': '3611', 'name': '上饶市' }] }, { 'code': '37', 'name': '山东省', 'children': [{ 'code': '3701', 'name': '济南市' }, { 'code': '3702', 'name': '青岛市' }, { 'code': '3703', 'name': '淄博市' }, { 'code': '3704', 'name': '枣庄市' }, { 'code': '3705', 'name': '东营市' }, { 'code': '3706', 'name': '烟台市' }, { 'code': '3707', 'name': '潍坊市' }, { 'code': '3708', 'name': '济宁市' }, { 'code': '3709', 'name': '泰安市' }, { 'code': '3710', 'name': '威海市' }, { 'code': '3711', 'name': '日照市' }, { 'code': '3712', 'name': '莱芜市' }, { 'code': '3713', 'name': '临沂市' }, { 'code': '3714', 'name': '德州市' }, { 'code': '3715', 'name': '聊城市' }, { 'code': '3716', 'name': '滨州市' }, { 'code': '3717', 'name': '菏泽市' }] }, { 'code': '41', 'name': '河南省', 'children': [{ 'code': '4101', 'name': '郑州市' }, { 'code': '4102', 'name': '开封市' }, { 'code': '4103', 'name': '洛阳市' }, { 'code': '4104', 'name': '平顶山市' }, { 'code': '4105', 'name': '安阳市' }, { 'code': '4106', 'name': '鹤壁市' }, { 'code': '4107', 'name': '新乡市' }, { 'code': '4108', 'name': '焦作市' }, { 'code': '4109', 'name': '濮阳市' }, { 'code': '4110', 'name': '许昌市' }, { 'code': '4111', 'name': '漯河市' }, { 'code': '4112', 'name': '三门峡市' }, { 'code': '4113', 'name': '南阳市' }, { 'code': '4114', 'name': '商丘市' }, { 'code': '4115', 'name': '信阳市' }, { 'code': '4116', 'name': '周口市' }, { 'code': '4117', 'name': '驻马店市' }, { 'code': '4190', 'name': '省直辖县级行政区划' }] }, { 'code': '42', 'name': '湖北省', 'children': [{ 'code': '4201', 'name': '武汉市' }, { 'code': '4202', 'name': '黄石市' }, { 'code': '4203', 'name': '十堰市' }, { 'code': '4205', 'name': '宜昌市' }, { 'code': '4206', 'name': '襄阳市' }, { 'code': '4207', 'name': '鄂州市' }, { 'code': '4208', 'name': '荆门市' }, { 'code': '4209', 'name': '孝感市' }, { 'code': '4210', 'name': '荆州市' }, { 'code': '4211', 'name': '黄冈市' }, { 'code': '4212', 'name': '咸宁市' }, { 'code': '4213', 'name': '随州市' }, { 'code': '4228', 'name': '恩施土家族苗族自治州' }, { 'code': '4290', 'name': '省直辖县级行政区划' }] }, { 'code': '43', 'name': '湖南省', 'children': [{ 'code': '4301', 'name': '长沙市' }, { 'code': '4302', 'name': '株洲市' }, { 'code': '4303', 'name': '湘潭市' }, { 'code': '4304', 'name': '衡阳市' }, { 'code': '4305', 'name': '邵阳市' }, { 'code': '4306', 'name': '岳阳市' }, { 'code': '4307', 'name': '常德市' }, { 'code': '4308', 'name': '张家界市' }, { 'code': '4309', 'name': '益阳市' }, { 'code': '4310', 'name': '郴州市' }, { 'code': '4311', 'name': '永州市' }, { 'code': '4312', 'name': '怀化市' }, { 'code': '4313', 'name': '娄底市' }, { 'code': '4331', 'name': '湘西土家族苗族自治州' }] }, { 'code': '44', 'name': '广东省', 'children': [{ 'code': '4401', 'name': '广州市' }, { 'code': '4402', 'name': '韶关市' }, { 'code': '4403', 'name': '深圳市' }, { 'code': '4404', 'name': '珠海市' }, { 'code': '4405', 'name': '汕头市' }, { 'code': '4406', 'name': '佛山市' }, { 'code': '4407', 'name': '江门市' }, { 'code': '4408', 'name': '湛江市' }, { 'code': '4409', 'name': '茂名市' }, { 'code': '4412', 'name': '肇庆市' }, { 'code': '4413', 'name': '惠州市' }, { 'code': '4414', 'name': '梅州市' }, { 'code': '4415', 'name': '汕尾市' }, { 'code': '4416', 'name': '河源市' }, { 'code': '4417', 'name': '阳江市' }, { 'code': '4418', 'name': '清远市' }, { 'code': '4419', 'name': '东莞市' }, { 'code': '4420', 'name': '中山市' }, { 'code': '4451', 'name': '潮州市' }, { 'code': '4452', 'name': '揭阳市' }, { 'code': '4453', 'name': '云浮市' }] }, { 'code': '45', 'name': '广西壮族自治区', 'children': [{ 'code': '4501', 'name': '南宁市' }, { 'code': '4502', 'name': '柳州市' }, { 'code': '4503', 'name': '桂林市' }, { 'code': '4504', 'name': '梧州市' }, { 'code': '4505', 'name': '北海市' }, { 'code': '4506', 'name': '防城港市' }, { 'code': '4507', 'name': '钦州市' }, { 'code': '4508', 'name': '贵港市' }, { 'code': '4509', 'name': '玉林市' }, { 'code': '4510', 'name': '百色市' }, { 'code': '4511', 'name': '贺州市' }, { 'code': '4512', 'name': '河池市' }, { 'code': '4513', 'name': '来宾市' }, { 'code': '4514', 'name': '崇左市' }] }, { 'code': '46', 'name': '海南省', 'children': [{ 'code': '4601', 'name': '海口市' }, { 'code': '4602', 'name': '三亚市' }, { 'code': '4603', 'name': '三沙市' }, { 'code': '4604', 'name': '儋州市' }, { 'code': '4690', 'name': '省直辖县级行政区划' }] }, { 'code': '50', 'name': '重庆市', 'children': [{ 'code': '5001', 'name': '重庆市辖区' }, { 'code': '5002', 'name': '县' }] }, { 'code': '51', 'name': '四川省', 'children': [{ 'code': '5101', 'name': '成都市' }, { 'code': '5103', 'name': '自贡市' }, { 'code': '5104', 'name': '攀枝花市' }, { 'code': '5105', 'name': '泸州市' }, { 'code': '5106', 'name': '德阳市' }, { 'code': '5107', 'name': '绵阳市' }, { 'code': '5108', 'name': '广元市' }, { 'code': '5109', 'name': '遂宁市' }, { 'code': '5110', 'name': '内江市' }, { 'code': '5111', 'name': '乐山市' }, { 'code': '5113', 'name': '南充市' }, { 'code': '5114', 'name': '眉山市' }, { 'code': '5115', 'name': '宜宾市' }, { 'code': '5116', 'name': '广安市' }, { 'code': '5117', 'name': '达州市' }, { 'code': '5118', 'name': '雅安市' }, { 'code': '5119', 'name': '巴中市' }, { 'code': '5120', 'name': '资阳市' }, { 'code': '5132', 'name': '阿坝藏族羌族自治州' }, { 'code': '5133', 'name': '甘孜藏族自治州' }, { 'code': '5134', 'name': '凉山彝族自治州' }] }, { 'code': '52', 'name': '贵州省', 'children': [{ 'code': '5201', 'name': '贵阳市' }, { 'code': '5202', 'name': '六盘水市' }, { 'code': '5203', 'name': '遵义市' }, { 'code': '5204', 'name': '安顺市' }, { 'code': '5205', 'name': '毕节市' }, { 'code': '5206', 'name': '铜仁市' }, { 'code': '5223', 'name': '黔西南布依族苗族自治州' }, { 'code': '5226', 'name': '黔东南苗族侗族自治州' }, { 'code': '5227', 'name': '黔南布依族苗族自治州' }] }, { 'code': '53', 'name': '云南省', 'children': [{ 'code': '5301', 'name': '昆明市' }, { 'code': '5303', 'name': '曲靖市' }, { 'code': '5304', 'name': '玉溪市' }, { 'code': '5305', 'name': '保山市' }, { 'code': '5306', 'name': '昭通市' }, { 'code': '5307', 'name': '丽江市' }, { 'code': '5308', 'name': '普洱市' }, { 'code': '5309', 'name': '临沧市' }, { 'code': '5323', 'name': '楚雄彝族自治州' }, { 'code': '5325', 'name': '红河哈尼族彝族自治州' }, { 'code': '5326', 'name': '文山壮族苗族自治州' }, { 'code': '5328', 'name': '西双版纳傣族自治州' }, { 'code': '5329', 'name': '大理白族自治州' }, { 'code': '5331', 'name': '德宏傣族景颇族自治州' }, { 'code': '5333', 'name': '怒江傈僳族自治州' }, { 'code': '5334', 'name': '迪庆藏族自治州' }] }, { 'code': '54', 'name': '西藏自治区', 'children': [{ 'code': '5401', 'name': '拉萨市' }, { 'code': '5402', 'name': '日喀则市' }, { 'code': '5403', 'name': '昌都市' }, { 'code': '5404', 'name': '林芝市' }, { 'code': '5405', 'name': '山南市' }, { 'code': '5424', 'name': '那曲地区' }, { 'code': '5425', 'name': '阿里地区' }] }, { 'code': '61', 'name': '陕西省', 'children': [{ 'code': '6101', 'name': '西安市' }, { 'code': '6102', 'name': '铜川市' }, { 'code': '6103', 'name': '宝鸡市' }, { 'code': '6104', 'name': '咸阳市' }, { 'code': '6105', 'name': '渭南市' }, { 'code': '6106', 'name': '延安市' }, { 'code': '6107', 'name': '汉中市' }, { 'code': '6108', 'name': '榆林市' }, { 'code': '6109', 'name': '安康市' }, { 'code': '6110', 'name': '商洛市' }] }, { 'code': '62', 'name': '甘肃省', 'children': [{ 'code': '6201', 'name': '兰州市' }, { 'code': '6202', 'name': '嘉峪关市' }, { 'code': '6203', 'name': '金昌市' }, { 'code': '6204', 'name': '白银市' }, { 'code': '6205', 'name': '天水市' }, { 'code': '6206', 'name': '武威市' }, { 'code': '6207', 'name': '张掖市' }, { 'code': '6208', 'name': '平凉市' }, { 'code': '6209', 'name': '酒泉市' }, { 'code': '6210', 'name': '庆阳市' }, { 'code': '6211', 'name': '定西市' }, { 'code': '6212', 'name': '陇南市' }, { 'code': '6229', 'name': '临夏回族自治州' }, { 'code': '6230', 'name': '甘南藏族自治州' }] }, { 'code': '63', 'name': '青海省', 'children': [{ 'code': '6301', 'name': '西宁市' }, { 'code': '6302', 'name': '海东市' }, { 'code': '6322', 'name': '海北藏族自治州' }, { 'code': '6323', 'name': '黄南藏族自治州' }, { 'code': '6325', 'name': '海南藏族自治州' }, { 'code': '6326', 'name': '果洛藏族自治州' }, { 'code': '6327', 'name': '玉树藏族自治州' }, { 'code': '6328', 'name': '海西蒙古族藏族自治州' }] }, { 'code': '64', 'name': '宁夏回族自治区', 'children': [{ 'code': '6401', 'name': '银川市' }, { 'code': '6402', 'name': '石嘴山市' }, { 'code': '6403', 'name': '吴忠市' }, { 'code': '6404', 'name': '固原市' }, { 'code': '6405', 'name': '中卫市' }] }, { 'code': '65', 'name': '新疆维吾尔自治区', 'children': [{ 'code': '6501', 'name': '乌鲁木齐市' }, { 'code': '6502', 'name': '克拉玛依市' }, { 'code': '6504', 'name': '吐鲁番市' }, { 'code': '6505', 'name': '哈密市' }, { 'code': '6523', 'name': '昌吉回族自治州' }, { 'code': '6527', 'name': '博尔塔拉蒙古自治州' }, { 'code': '6528', 'name': '巴音郭楞蒙古自治州' }, { 'code': '6529', 'name': '阿克苏地区' }, { 'code': '6530', 'name': '克孜勒苏柯尔克孜自治州' }, { 'code': '6531', 'name': '喀什地区' }, { 'code': '6532', 'name': '和田地区' }, { 'code': '6540', 'name': '伊犁哈萨克自治州' }, { 'code': '6542', 'name': '塔城地区' }, { 'code': '6543', 'name': '阿勒泰地区' }, { 'code': '6590', 'name': '自治区直辖县级行政区划' }] }, { 'name': '台湾', 'code': '710000', 'children': [{ 'name': '台北市', 'code': '710100' }, { 'name': '高雄市', 'code': '710200' }, { 'name': '基隆市', 'code': '710300' }, { 'name': '台中市', 'code': '710400' }, { 'name': '台南市', 'code': '710500' }, { 'name': '新竹市', 'code': '710600' }, { 'name': '嘉义市', 'code': '710700' }, { 'name': '新北市', 'code': '710800' }, { 'name': '宜兰县', 'code': '712200' }, { 'name': '桃园县', 'code': '712300' }, { 'name': '新竹县', 'code': '712400' }, { 'name': '苗栗县', 'code': '712500' }, { 'name': '彰化县', 'code': '712700' }, { 'name': '南投县', 'code': '712800' }, { 'name': '云林县', 'code': '712900' }, { 'name': '嘉义县', 'code': '713000' }, { 'name': '屏东县', 'code': '713300' }, { 'name': '台东县', 'code': '713400' }, { 'name': '花莲县', 'code': '713500' }, { 'name': '澎湖县', 'code': '713600' }] }, { 'name': '香港特别行政区', 'code': '810000', 'children': [{ 'name': '香港岛', 'code': '810100' }, { 'name': '九龙', 'code': '810200' }, { 'name': '新界', 'code': '810300' }] }, { 'name': '澳门特别行政区', 'code': '820000', 'children': [{ 'name': '澳门半岛', 'code': '820100' }, { 'name': '氹仔岛', 'code': '820200' }, { 'name': '路环岛', 'code': '820300' }] }]
  return data
}
