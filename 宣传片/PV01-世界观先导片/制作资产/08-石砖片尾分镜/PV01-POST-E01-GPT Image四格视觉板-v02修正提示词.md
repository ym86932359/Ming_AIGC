---
type: gpt-image-storyboard-edit-prompt
title: "PV01 POST-E01 - GPT Image石砖片尾四格视觉板v02修正提示词"
project_id: "ZERO-ECHO-PV01"
asset_id: "POST-E01-MASONRY-STORYBOARD-V02"
mode: "reference-image-edit"
model: "gpt-image-2"
aspect_ratio: "16:9"
quality: "high"
source_image: "[[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v01.png]]"
version: "v02"
status: "USER-REJECTED；主标题实际为零号回声声酒馆"
planned_output: "PV01-POST-E01-石砖片尾四格视觉板-v02.png"
actual_output: "[[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v02.png]]"
resolution: "1672x941"
sha256: "1149161f3d3f05f98bfb18d9fe600789d6034227ede8d192df4a8f0181e3fe2c"
created: 2026-07-12
updated: 2026-07-12
---

# PV01 POST-E01｜GPT Image石砖片尾四格视觉板v02修正提示词

## 修正目标

基于v01做局部、可控的参考图编辑。保留同一面墙、四格构图、镜头距离、砖纹、裂缝、黄铜锚钉、砂浆、湿度和左上光位，只修正文案准确性、主标题光泽与明度，以及“敬请期待”的世界观内发光。

## 不可变文案

终帧唯一完整文案严格为：**零号回声酒馆，敬请期待**

- 必须使用准确简体中文。
- “馆”后的中文全角逗号“，”必须清楚存在。
- 不得缺字、增字、换字、重字、错序或改用英文逗号。
- 最终右下格分两行：第一行“零号回声酒馆，”，第二行“敬请期待”。
- 左下格处于副标题尚未亮起的较早节拍，可只清楚显示“零号回声酒馆，”；右下终帧必须显示完整文案。

## GPT Image 2参考编辑提示词

```text
EDIT THE PROVIDED IMAGE, DO NOT REDESIGN IT.

Preserve the exact 2×2 storyboard grid, the exact same masonry wall, camera progression, perspective, brick layout, mortar cracks, wet salt stains, brass anchors, framing, scale and upper-left light direction from the reference image. Preserve all four panels as sequential views of one continuous physical wall. Do not introduce a new wall, new architecture, new camera angle, people or extra objects.

The final immutable Simplified Chinese copy is exactly: “零号回声酒馆，敬请期待”. Do not paraphrase it. Do not omit the full-width Chinese comma “，” after “馆”. Do not add, duplicate, replace, reorder or garble any character.

TYPOGRAPHY AS PHYSICAL ARCHITECTURE:
In the bottom-left reveal panel, the raised basalt masonry must read exactly “零号回声酒馆，” with the Chinese comma physically formed from smaller basalt blocks at the lower-right end of the main line. The subtitle area is present but not yet illuminated.

In the bottom-right final panel, display the exact full two-line copy:
First line: “零号回声酒馆，”
Second line: “敬请期待”
Both lines remain real masonry integrated into the same wall. No flat overlay text, no printed type and no floating title card.

MAIN TITLE VISIBILITY:
Keep the title built from protruding smoke-black basalt blocks, but make it materially brighter and more legible. Increase the upper-left grazing light to a controlled 3000K warm amber. Add believable polished mineral facets and warm limestone-silver highlights on the forward-facing stone surfaces, with brighter mortar edges and stronger local contrast around every stroke. Preserve dark basalt sides and architectural shadow depth. The title should be immediately readable and visually dominant without turning gold, metallic, glossy plastic or white.

SUBTITLE LIGHT EFFECT:
Keep “敬请期待” recessed 2–4 centimeters into the same stone wall. Make the recessed character faces glow with a clear warm-ivory luminous core, while an extremely thin restrained fault-cyan light leaks only from selected inner mortar seams around the characters. Cyan halo thickness must remain approximately 2–4 percent of character height. The glow must visibly separate all four characters from the wall, illuminate nearby stone edges physically, and still feel like hidden near-future light inside the masonry. It must not look like a neon sign, LED text, hologram, projected subtitle, nightclub lighting or magical rune.

PALETTE AND EXPOSURE:
Keep the background wall in smoke-black and rain-slate blue-gray so the brighter mineral title and luminous subtitle stand out. Lift only the text-zone midtones and polished stone highlights; preserve deep readable background blacks, damp texture, aged brass and cinematic contrast. The final panel must be noticeably more visible than the reference while remaining a night scene.

PANEL CONTINUITY:
Top-left remains an extreme close-up of the same first-character masonry fragment. Top-right remains the same partial dolly-back reveal. Bottom-left and bottom-right must remain spatially identical enough to animate between them; only the subtitle illumination and a very slight downward spread of the same amber grazing light may change. Preserve the same main-title geometry in both bottom panels.

QUALITY:
Premium photorealistic architectural cinema frame, tangible basalt pores, mortar grains, condensation, subtle polished mineral reflection, realistic light falloff, fine 35mm grain, soft highlight roll-off, no digital oversharpening.

AVOID:
No incorrect Chinese, no missing comma, no English punctuation, no other readable text, no English, no pinyin, no logo, no watermark, no QR code, no new panel labels, no floating typography, no gold letters, no metal logo, no flat subtitle, no commercial neon, no cyan wash across the wall, no magenta, no hologram, no projection, no LED wall, no magic glow, no flying bricks, no sparks, no people, no new wall, no changed camera geometry and no continuity drift.
```

## v02验收闸门

- [ ] 右下终帧逐字准确呈现“零号回声酒馆，敬请期待”。实际为“零号回声声酒馆，敬请期待”。
- [x] “馆”后为中文全角逗号“，”，不是省略、句号或英文逗号。
- [x] 主标题石材正面更亮、更有矿物光泽，仍保持玄武岩实体重量。
- [x] “敬请期待”四字明显可读，具有暖象牙亮芯与极细故障青砖缝透光。
- [x] 光效属于凹砖内部，不是霓虹、LED、投影或平面后期字。
- [ ] 四格仍为同一面墙、同一正确字构、同一光位与连续后撤端点。墙体连续，但错误七字字构被继承。
- [x] 无人物、额外文字、Logo、水印或世界观外色彩。

## 关联

- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/README]]
- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v01-导演审片记录]]
- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖场景化片尾-导演分镜剧本]]
- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-GPT Image四格视觉板-v03去重提示词]]
