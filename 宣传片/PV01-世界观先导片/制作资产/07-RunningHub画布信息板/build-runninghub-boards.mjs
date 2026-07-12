import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = path.dirname(fileURLToPath(import.meta.url));
const W = 1920;
const H = 1080;
const C = {
  bg: '#07090c', panel: '#11161c', panel2: '#171d24', text: '#eef4f2', muted: '#9aa7aa',
  canon: '#58dfc1', daily: '#d7aa63', feral: '#bd4a49', contempt: '#b9a16a',
  pending: '#77818c', accepted: '#52ae72', review: '#d28a3d', reject: '#b53b3b', purple: '#8b72d9'
};

const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function wrap(text, max = 23) {
  const lines = [];
  for (const raw of String(text).split('\n')) {
    if (!raw) { lines.push(''); continue; }
    let line = '';
    for (const ch of raw) {
      line += ch;
      if (line.length >= max || '。；：，、？！'.includes(ch) && line.length >= max - 5) {
        lines.push(line);
        line = '';
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

function textBlock(x, y, text, size = 23, color = C.text, max = 23, lh = 1.45, weight = 400) {
  return wrap(text, max).map((line, i) =>
    `<text x="${x}" y="${y + i * size * lh}" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(line)}</text>`
  ).join('');
}

function card({x, y, w, h, title, body, color = C.canon, tag = '', bodySize = 22, max = 23}) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${C.panel}" stroke="${color}" stroke-width="3"/>
    <rect x="${x}" y="${y}" width="${w}" height="58" rx="22" fill="${color}" opacity="0.16"/>
    <text x="${x + 24}" y="${y + 39}" fill="${color}" font-size="28" font-weight="700" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(title)}</text>
    ${tag ? `<text x="${x + w - 22}" y="${y + 38}" text-anchor="end" fill="${C.muted}" font-size="18" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(tag)}</text>` : ''}
    ${textBlock(x + 24, y + 92, body, bodySize, C.text, max, 1.45)}
  </g>`;
}

function base(title, subtitle, content, accent = C.canon, footer = 'ZERO-ECHO-PV01｜RunningHub导演作战墙｜v02锁片｜本地已同步／画布待替换') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="glow" cx="18%" cy="0%" r="78%"><stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/><stop offset="100%" stop-color="${C.bg}" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000" flood-opacity="0.42"/></filter>
    </defs>
    <rect width="1920" height="1080" fill="${C.bg}"/>
    <rect width="1920" height="1080" fill="url(#glow)"/>
    <rect x="42" y="36" width="10" height="76" rx="5" fill="${accent}"/>
    <text x="78" y="76" fill="${C.text}" font-size="42" font-weight="800" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(title)}</text>
    <text x="80" y="108" fill="${C.muted}" font-size="21" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(subtitle)}</text>
    <g filter="url(#shadow)">${content}</g>
    <line x1="48" y1="1030" x2="1872" y2="1030" stroke="#263039" stroke-width="2"/>
    <text x="48" y="1061" fill="${C.muted}" font-size="18" font-family="PingFang SC, Noto Sans CJK SC, sans-serif">${esc(footer)}</text>
  </svg>`;
}

function gridCards(items, {cols, x = 48, y = 150, gap = 22, w, h, bodySize = 22, max = 23}) {
  return items.map((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return card({...item, x: x + col * (w + gap), y: y + row * (h + gap), w, h, bodySize, max});
  }).join('');
}

const boards = [];

boards.push(['00-导演总控与状态图例.svg', base(
  '00｜导演总控与状态图例',
  '同体双声｜60秒正片＋4秒片尾｜14镜｜16任务｜C01—C08｜3840×2160／24fps',
  gridCards([
    {title:'核心命题', color:C.canon, body:'日常小铭给人再看一遍的勇气；小丑小铭让人无法再把怯懦叫作体面。\n观众视点：尚未入席的客人。'},
    {title:'人物正史', color:C.daily, body:'continuity_id：XIAOMING-S1-ZERO-BARTENDER\nvisual_asset_version：根目录v04\n日常／疯癫／蔑视均为同一身份。'},
    {title:'转化规则', color:C.feral, body:'A日常 ↔ B疯癫 ↔ C蔑视。\n常规同机位硬切；S10→S11唯一使用23帧明暗红人格夺权。禁止镜中变身、液化融脸和双人叠影。'},
    {title:'状态编码', color:C.accepted, body:'CANON 正史｜TODO 待生成\nREVIEW 待审｜ACCEPTED 可接续\nRETAKE 单变量返修｜REJECTED 禁用\nANIMATIC ONLY 仅导演预演。'},
    {title:'视觉与交付', color:C.contempt, body:'新国风赛博琉璃国漫CG。\n低饱和冷雨＋琥珀实景灯。\n主版64秒16:9；60—64秒片尾文字全部后期合成。'},
    {title:'当前闸门', color:C.review, body:'64秒v02锁片预演已渲染。Take02技术通过并改编为S02源片；S01世界空镜、S03—S14、正式本人配音与中文口型待生产。'}
  ], {cols:3,w:586,h:350,bodySize:23,max:25})
)]);

boards.push(['01-资产地图与唯一职责.svg', base(
  '01—03｜资产地图与唯一职责',
  '源媒体53项：世界/场景/道具18｜人物与A-B-C 11｜分镜4｜音频18｜预演与海报2',
  gridCards([
    {title:'世界空镜 WK01—WK05', color:C.canon, body:'建立上层新区、旧城高架、中层生活、零点城市与记忆层。\n职责：世界尺度与材质。\n不得替代当前镜头的空间几何。'},
    {title:'场景 KF01—KF08', color:C.canon, body:'PV01调用：KF01、02、03、04、06、08。\nKF02＝室内唯一空间母图。\nKF06只传灯闪/失焦桥帧；KF08只传片尾构图。'},
    {title:'道具 PROP01—PROP07', color:C.canon, body:'记忆杯、调酒匙、00:17圆钟、门铃门牌、零号空椅、酒红杯巾、延迟长镜。\n每件只控制自身结构与材质。'},
    {title:'人物正式v04', color:C.daily, body:'日常总卡、小丑妆造、双24格表情、F01—F04补充卡。\n身份优先级最高。\n不读取候选版本、历史版本或原始身份照。'},
    {title:'A/B/C同机位板', color:C.feral, body:'65mm：A65、B65-F01、B65-F02。\n85mm：A85、B85-F03、C85-F04。\n只锁人物、景别、姿态与硬切匹配。'},
    {title:'禁用隔离', color:C.reject, body:'KF05、KF07仅属正片镜中自我对话母题。\n真人原始照片、本地历史版、候选版和废弃样张不得进入PV01生成链。'}
  ], {cols:3,w:586,h:350,bodySize:23,max:25})
)]);

boards.push(['02-人物三状态连续性.svg', base(
  '02｜小铭三状态连续性',
  '表演曲线：F01狞笑试探 → F02疯癫揭穿 → F03毒舌快感 → F04蔑视看穿',
  gridCards([
    {title:'A｜日常赛博酒保', color:C.daily, body:'目标：让观众相信自己可以坐下。\n动作：擦杯、放杯、抬眼；均匀、克制、无评判。\n声音：本人声底，中低音近讲，3.5—4字/秒。'},
    {title:'B｜F01 狞笑试探', color:C.feral, body:'一侧眉高、一侧压低；右侧上唇轻提，少量露齿。\n歪头8°—12°，轻笑一次。\n台词：“酒哪有秘密好喝？”'},
    {title:'B｜F02 疯癫揭穿', color:C.feral, body:'快—停—快；只允许一次短“哈”。\n眼线直刺镜头，句尾头部回正。\n台词：“看你故意漏掉的。”'},
    {title:'B｜F03 毒舌快感', color:C.feral, body:'贴近半步；鼻翼与下颌张力升高。\n“怯懦”落点突然停笑。\n只拆穿主动掩饰，不攻击不可控弱点。'},
    {title:'C｜F04 蔑视看穿', color:C.contempt, body:'狞笑、歪头和多余眨眼全部停止。\n头、肩、下颌回正；只做必要口型。\n像听过同一谎言太多次，连愤怒都嫌浪费。'},
    {title:'身份与妆面硬锁', color:C.canon, body:'同脸、同发际线、同黑色层次发、同成年骨相与基础礼装。\n暖象牙底、墨黑眼翼、朱砂鼻笑弧、旧金额纹、烟青玉电路固定。'}
  ], {cols:3,w:586,h:350,bodySize:23,max:25})
)]);

const shots = [
  ['S01｜00:00—00:03','WK02旧城世界先出现；无酒馆门、招牌与文字。\n24mm低机位｜列车左→右冷扫。',C.pending],
  ['S02｜00:03—00:08','Take02改编为入口源片；末尾门开10—15cm并以门板遮挡。\nVO：记忆可以被保存。',C.review],
  ['S03｜00:08—00:13','推门入酒馆；九席、第七号位、零号空椅建立。\n28mm低速滑行。',C.pending],
  ['S04｜00:13—00:18','圆钟／黑门／记忆杯三件短组接。\n故障青只在杯底。',C.pending],
  ['S05｜00:18—00:23','日常小铭擦杯，停半拍抬眼。\n“欢迎。这里不卖遗忘。”',C.daily],
  ['S06｜00:23—00:28','65mm放杯到第七号位，焦点由杯沿到眼睛。\n“你点的，不是酒。”',C.daily],
  ['S07｜00:28—00:32','F01开场中性、句中歪头、最后6帧回中性。\n“酒哪有秘密好喝？”',C.feral],
  ['S08｜00:32—00:36','目光句中右偏4°，最后6帧回镜头。\n“第一遍，看你记得的。”',C.daily],
  ['S09｜00:36—00:41','冷光切F02；快—停—快，一次短哈。\n“看你故意漏掉的。”',C.feral],
  ['S10｜00:41—00:45','日常留余地；44.28后进入23帧明暗红人格夺权。\n后景狞笑在红光前J-cut。',C.daily],
  ['S11｜00:45—00:50','F03贴近半步，65→85mm一次轻推。\n“怯懦，改名叫体面。”',C.feral],
  ['S12｜00:50—00:53','日常85mm绝对锁定。\n“我不替你忘记。”',C.daily],
  ['S13｜00:53—00:57','无闪硬切F04；与S14为同一连续7秒源片。\n“我负责拆穿你。”',C.contempt],
  ['S14｜00:57—01:00','57秒无可见切点；F04说完停0.8秒。\n“零点回声酒馆。敢看吗？”',C.contempt],
  ['END｜01:00—01:04','硬切烟木黑；左上琥珀光先显片名、后显“敬请期待”。\n本地后期，不占Seedance任务。',C.contempt]
].map(([title,body,color])=>({title,body,color}));

boards.push(['03-四幕14镜时间轴.svg', base(
  '03｜四幕14镜＋片尾时间轴',
  'A 旧城与入口 → B 安全表面被撕开 → C 疯癫毒舌峰值 → D 静止蔑视 → 4秒品牌余韵',
  gridCards(shots, {cols:5,w:344,h:255,gap:20,y:145,bodySize:18,max:21})
)]);

boards.push(['04-Seedance任务-S01至S04C.svg', base(
  '04｜Seedance任务 01—06',
  '世界与机制｜正史重锚｜每条只有一个可见事件与完成终点',
  gridCards([
    {title:'JOB 01｜S01 世界先于入口', color:C.pending, body:'I2V｜@WK02旧城空镜唯一源\n24mm贴近积水；近黑开场；冷白列车光只扫一次；末尾轻抬。\n终点：旧城生活网络完整。\n禁：酒馆门、招牌、人物与文字。'},
    {title:'JOB 02｜S02 入口显现', color:C.review, body:'V2V／编辑延展｜Take02作为入口源片，KF01 v02只校验建筑与门牌\n28mm眼平克制前移；保留雨、列车与实体“零号酒馆”。\n终点：门只开10—15cm，近黑门板遮满画面。\n禁：重做S01、穿门入室、额外文字。'},
    {title:'JOB 03｜S03 入酒馆', color:C.pending, body:'I2V｜@KF02空间唯一源\n28mm／机高1.55m，沿吧台低速滑入；门铃一次。\n终点：九席、第七号、零号椅、黑门关系清楚。'},
    {title:'JOB 04｜S04A 圆钟', color:C.pending, body:'I2V｜@KF02圆钟墙面\n90mm微距固定约1.6秒；指针00:17；旧黄铜窄高光。\n终点：完全静止。\n禁：发光、滴答、额外文字。'},
    {title:'JOB 05｜S04B 黑门', color:C.pending, body:'I2V｜@KF02黑门\n90mm固定约1.6秒；门完全静止、无把手、无门缝光。\n终点：漆面只留营业灯弱反射。\n禁：开门、人物、镜面异常。'},
    {title:'JOB 06｜S04C 记忆杯', color:C.pending, body:'I2V｜@KF04／PROP01＋KF02台面\n90mm微距约1.8秒；杯底故障青从无到有；细薄玻璃谐振。\n终点：青光只照内壁与极小桌面反射。'}
  ], {cols:3,w:586,h:350,bodySize:20,max:27})
)]);

boards.push(['05-Seedance任务-S05至S08.svg', base(
  '05｜Seedance任务 07—10',
  '建立可信酒保 → 第一次撕开安全表面 → 恢复日常，确认同一身体切换',
  gridCards([
    {title:'JOB 07｜S05 日常欢迎', color:C.daily, body:'R2V/I2V｜日常v04＋KF02\n50mm中近景，仅4%慢推。匀速擦杯→门铃余音消失→停半拍抬眼。\n台词：欢迎。这里不卖遗忘。\n终点：第一次直视镜头。'},
    {title:'JOB 08｜S06 你点的不是酒', color:C.daily, body:'R2V/I2V｜日常v04＋KF02＋PROP01\n65mm手部起；只做放杯一个动作；焦点由杯沿到眼睛。\n终点：头肩手眼线稳定，供S07硬切。'},
    {title:'JOB 09｜S07 F01狞笑试探', color:C.feral, body:'I2V｜B65-F01＋妆造v04＋KF02\n开场中性；句中轻笑一次、歪头10°；最后6帧回到中性正头。\n台词：当然不是。酒哪有秘密好喝？\n禁：生成融脸与灯闪。'},
    {title:'JOB 10｜S08 第一遍', color:C.daily, body:'I2V｜日常v04＋KF02\n严格匹配S07的65mm头肩与手位；开场已恢复日常。目光句中右偏4°，最后6帧回镜头。\n台词：第一遍，看你记得的。\n终点：正视镜头保持。'}
  ], {cols:2,x:100,w:840,h:370,gap:40,y:165,bodySize:25,max:35})
)]);

boards.push(['06-Seedance任务-S09至S11B.svg', base(
  '06｜Seedance任务 11—14',
  '价值争辩加速 → F03毒舌峰值；中文长句拆成两条口型板',
  gridCards([
    {title:'JOB 11｜S09 F02疯癫揭穿', color:C.feral, body:'I2V｜B65-F02＋妆造v04＋KF02\n冷轮廓掠过后稳定；先快说“第二遍？”；一次短哈；再放慢，最后头回正。\n禁：持续大笑、乱摆、发光眼。'},
    {title:'JOB 12｜S10 日常留余地', color:C.daily, body:'I2V｜日常v04＋KF02\n匹配S09的65mm头肩手眼线；仅下颌轻放松与一次呼吸。\n台词：有些事，不说，也能过去。\n44.28秒后的23帧人格夺权全部交后期，不在本任务生成。'},
    {title:'JOB 13｜S11A 毒舌起句', color:C.feral, body:'I2V/FLF｜23帧夺权完成后的B65-F02为唯一首帧＋B85-F03落点＋KF02\n开场已是完整昏暗小丑；65→85mm一次轻推；狞笑开始消失。\n台词：过去？那叫藏好。\n终点：靠近动作完成。'},
    {title:'JOB 14｜S11B 毒舌落点', color:C.feral, body:'Continuation优先｜只接已验收S11A的真实末帧；B85-F03只校验身份表情\n头完全回正；说“怯懦”时突然停笑；句尾半秒静止。\n台词：你们最爱把怯懦，改名叫体面。\n禁：额外推进、闪光与计划末帧冒充实际末帧。'}
  ], {cols:2,x:100,w:840,h:370,gap:40,y:165,bodySize:24,max:35})
)]);

boards.push(['07-Seedance任务-S12至S14.svg', base(
  '07｜Seedance任务 15—16＋POST-E01',
  '日常职责 → 无闪蔑视接管 → 同一长镜直视挑战 → 品牌余韵',
  gridCards([
    {title:'JOB 15｜S12 日常职责', color:C.daily, body:'I2V｜A85＋日常v04＋KF02\n85mm正面绝对锁定；不开闪；暖光恢复；眉间与下颌放松。\n台词：我不替你忘记。\n终点：末帧直接匹配S13；留约17帧声画空隙。'},
    {title:'JOB 16｜S13—S14 蔑视长镜', color:C.contempt, body:'I2V／Continuation｜C85-F04＋A85匹配＋KF02；一条连续7秒源片\n53—60秒85mm完全锁定；57秒无可见切点；不闪、不融脸、几乎不眨眼。\n台词：他陪你看完。我负责拆穿你。／零点回声酒馆。敢看吗？\n句尾保持0.8秒。'},
    {title:'POST-E01｜60—64秒片尾艺术字', color:C.purple, body:'后期合成，不占Seedance任务。\n60.00硬切烟木黑并静置；左上2800K窄束琥珀光先显“零号回声酒馆”，后显“敬请期待”。\n旧黄铜＋暖象牙字面，矿物黑底；最后0.5秒不再新增动画。\n禁：霓虹、故障字、Logo爆闪与预告片俗亮。'}
  ], {cols:3,w:586,h:500,bodySize:23,max:30,y:210})
)]);

boards.push(['08-声音灯光与VFX.svg', base(
  '08｜声音、灯光与VFX合同',
  '三声线来自同一身份；疯癫到蔑视的骤停是全片最强节奏断点',
  gridCards([
    {title:'日常声线', color:C.daily, body:'本人声底，中低音、干、近讲。\n3.5—4字/秒；自然呼吸；轻木质早反射。\n对应VO01—05、07、09、11。'},
    {title:'疯癫声线', color:C.feral, body:'同一声底低移1—1.5半音。\n4—4.5字/秒，快—停—快；耳语8%—12%，25—35ms。\n仅一次短“哈”；禁止怪兽音。'},
    {title:'蔑视声线', color:C.contempt, body:'同一声底低移约2半音。\n3—3.5字/秒；低、慢、干；耳语低于3%；主声中央。\n禁止咆哮、拖腔和表演式发疯。'},
    {title:'日常灯光', color:C.daily, body:'2700—2900K实景灯；左前4300K柔主光；右前5000K辅光；左后7000K轮廓30%—35%。\n肤色58—64 IRE。'},
    {title:'疯癫／蔑视灯光', color:C.feral, body:'疯癫：琥珀降1档，4000K窄侧光，7200K轮廓45%，暗朱砂<5%。\n蔑视：闪动停止，4100K窄柔光，背景暗半档。'},
    {title:'VFX与SFX', color:C.purple, body:'S10→S11唯一23帧人格夺权：明4f／暗3f／明3f／暗3f／红3f／近黑2f／完整小丑5f；红闪只叠小丑脸，背景最大12px失焦。\n后景狞笑在红光前J-cut；S12→S13无闪硬切。片尾另用左上暖光揭字声。'}
  ], {cols:3,w:586,h:350,bodySize:21,max:29})
)]);

boards.push(['09-审片连续性与交付边界.svg', base(
  '09｜审片、连续性与交付边界',
  '只有ACCEPTED成片或末帧可以成为下一任务参考；计划终点不等于实际终点',
  gridCards([
    {title:'审片状态机', color:C.accepted, body:'TODO → REVIEW → ACCEPTED／RETAKE／REJECTED。\n失败只修一个变量；同一镜三次失败后拆镜或转后期。\nREJECTED永不接入下一镜。'},
    {title:'连续性回填', color:C.canon, body:'每条接受后记录：实际开始／结束姿态、手位、眼线、镜头相位、光线、声线、背景清晰度和开放运动。\n实际状态覆盖计划状态。'},
    {title:'参考传递格式', color:C.pending, body:'[资产]只控制[身份／环境／姿态／道具／声音]；忽略该参考中的[机位／动作／环境／音色／文字]。\n身份优先级最高。'},
    {title:'隔离区', color:C.reject, body:'KF05、KF07、历史版、候选版、原始真人照、失败Take与ANIMATIC ONLY均无生成下游。\n镜中对话只保留给正片母题。'},
    {title:'导演预演说明', color:C.purple, body:'现有64秒v02由锁定资产与静态分镜构成，只验证时码、构图、台词、声线、23帧人格夺权和片尾艺术字。\n不得冒充Seedance动态终片。'},
    {title:'最终交付合同', color:C.contempt, body:'ZERO-ECHO-PV01-世界观先导宣传片-64s-4K-v02.mp4\n60秒正片＋4秒片尾｜16:9｜3840×2160｜24fps。\n主版通过后再派生30秒、15秒和9:16；外部画布仍为v01，待人工替换v02信息板。'}
  ], {cols:3,w:586,h:350,bodySize:21,max:29})
)]);

for (const [name, svg] of boards) {
  fs.writeFileSync(path.join(outDir, name), svg, 'utf8');
}

console.log(`wrote ${boards.length} SVG boards to ${outDir}`);
