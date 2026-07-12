---
type: gpt-image-storyboard-edit-prompt
title: "PV01 POST-E01 - GPT Image石砖片尾四格视觉板v03去重提示词"
project_id: "ZERO-ECHO-PV01"
asset_id: "POST-E01-MASONRY-STORYBOARD-V03"
mode: "precise-object-edit"
model: "gpt-image-2"
aspect_ratio: "16:9"
quality: "high"
source_image: "[[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v02.png]]"
version: "v03"
status: "USER-REJECTED；六字计数通过但回与声之间存在异常空槽"
planned_output: "PV01-POST-E01-石砖片尾四格视觉板-v03.png"
actual_output: "[[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v03.png]]"
resolution: "1672x941"
sha256: "b5fc2881ebdcc872e96c0e99d8b2e4a84fb50d5b446b316f76acc435d5740118"
created: 2026-07-12
updated: 2026-07-12
---

# PV01 POST-E01｜GPT Image石砖片尾四格视觉板v03去重提示词

## 唯一修复任务

当前错误主标题是七个大字位：`零｜号｜回｜声｜声｜酒｜馆`。

本次只删除从左数第5个大字位，即第二个、重复的“声”，再将`酒｜馆｜，`整体左移并重新等距。正确主标题必须是六个大字位：`零｜号｜回｜声｜酒｜馆`，随后才是小型中文逗号`，`。

## GPT Image 2参考编辑提示词

```text
Use case: precise-object-edit.
Asset type: 2×2 cinematic masonry end-card storyboard.
Input image: the provided v02 storyboard is the edit target.

PRIMARY REQUEST — CHANGE ONLY THE MAIN TITLE ROW:
The current image incorrectly contains seven large Chinese character clusters in this order:
1 零 / 2 号 / 3 回 / 4 声 / 5 声 / 6 酒 / 7 馆 / then a small Chinese comma.

Delete the fifth large character cluster from the left — the SECOND of the two adjacent “声” characters. Remove its protruding basalt blocks, side shadows and mortar footprint, restoring that region to the same old smoke-black masonry wall behind it. Keep the fourth character “声”.

After removing the duplicate, move the existing “酒”, “馆” and the small full-width Chinese comma “，” leftward to close the gap. Re-space the whole main-title line into exactly SIX evenly balanced large character positions:
1 “零” / 2 “号” / 3 “回” / 4 “声” / 5 “酒” / 6 “馆” / followed by one small “，” punctuation mark.

The final exact two-line copy must be:
First line: “零号回声酒馆，”
Second line: “敬请期待”

There must be exactly six large square character clusters before the comma, never seven. There must be exactly one “声”, never “声声”. The comma is punctuation and must be visibly smaller than the six title characters.

Apply this same corrected six-character title geometry consistently to BOTH bottom-left and bottom-right panels. In the top-right partial reveal, correct any visible portion so it belongs to the same six-character wall. The top-left close-up may remain unchanged.

LOCKED INVARIANTS — DO NOT CHANGE:
- Keep the exact 2×2 grid, panel boundaries, camera distances, perspective and composition.
- Keep the same wall, old brick layout outside the title row, cracks, salt stains, brass anchors, floor, beams and upper-left light direction.
- Keep the warm limestone-silver highlights and 3000K amber grazing light on the title.
- Keep the second-line “敬请期待” exactly unchanged in wording, position, warm-ivory luminous core and restrained fault-cyan inner mortar glow.
- Keep the same exposure, rain-slate shadows, damp stone texture, fine film grain and architectural realism.
- Do not add any new character, symbol, English text, label, logo or watermark.

Do not preserve the current erroneous seven-character main-title geometry. Reconstruct only the main title row as six characters. Do not redesign any other part of the image.
```

## 三重验收闸门

- [x] 放大人工计数：`零1｜号2｜回3｜声4｜酒5｜馆6`，不存在第7个大字位。
- [x] 中文识别：第一行输出六个字符，且不得含`声声`；第二行为四字`敬请期待`。
- [x] 逐字人工复核：六字均为正确字形，不以OCR单独代替视觉审片。
- [x] 中文全角逗号位于“馆”后，尺寸显著小于六个大字。
- [ ] 左下与右下使用同一正确且等距的六字几何。两格均有正确六字，但“回｜声”之间保留了删除字后的异常空槽。
- [x] “敬请期待”的文字、位置和发光效果未漂移。
- [x] 墙体、机位、砖纹、光位、黄铜锚钉和世界观色卡未漂移。

## 关联

- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/README]]
- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖片尾四格视觉板-v02-导演审片记录]]
- [[个人创作/ai铭仔/宣传片/PV01-世界观先导片/制作资产/08-石砖片尾分镜/PV01-POST-E01-石砖场景化片尾-导演分镜剧本]]
