---
type: config-record
title: "Ming_AIGC GitHub 配置记录"
project_id: "ZERO-ECHO"
repo: "ym86932359/Ming_AIGC"
status: active
created: 2026-07-13
updated: 2026-07-13
---

# Ming_AIGC GitHub 配置记录

本文记录本地《零点回声酒馆》AIGC 资产库与 GitHub 仓库 `ym86932359/Ming_AIGC` 的连接方式，便于后续同步、排错和迁移。

## 基本信息

| 项目 | 值 |
| --- | --- |
| 本地目录 | `/Users/Admin/Documents/铭仔 obsidian/个人创作/ai铭仔` |
| GitHub 仓库 | `ym86932359/Ming_AIGC` |
| 仓库地址 | `https://github.com/ym86932359/Ming_AIGC` |
| 当前分支 | `main` |
| 上游分支 | `origin/main` |
| 远端名称 | `origin` |
| 远端地址 | `git@github.com:ym86932359/Ming_AIGC.git` |

## 当前提交状态

| 提交 | 说明 |
| --- | --- |
| `e2e5fb0` | GitHub 初始提交 |
| `75b12f8` | 上传《零点回声酒馆》AIGC 资产库主体 |
| `7ba7b40` | 补充 PV01-S01 第一分镜资料包 |

当前本地 `main` 已跟踪 `origin/main`，最后一次确认时两者均指向 `7ba7b40`。

## SSH 推送认证

本仓库使用仓库专用 SSH key 推送，不依赖全局 GitHub 登录状态。

| 项目 | 值 |
| --- | --- |
| 私钥路径 | `/Users/Admin/.ssh/ming_aigc_github` |
| 公钥路径 | `/Users/Admin/.ssh/ming_aigc_github.pub` |
| Key 类型 | `ed25519` |
| Key 注释 | `ym86932359-Ming_AIGC-Codex` |
| Deploy key 标题 | `Codex Ming_AIGC push key` |
| GitHub 设置页 | `https://github.com/ym86932359/Ming_AIGC/settings/keys` |
| 权限要求 | Deploy key 必须开启 `Allow write access` |

仓库级 Git 配置：

```bash
core.sshCommand = ssh -i /Users/Admin/.ssh/ming_aigc_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new
```

安全边界：

- 不要把 `/Users/Admin/.ssh/ming_aigc_github` 私钥内容写入 Markdown、聊天、脚本或仓库。
- 公钥可以重新添加到 GitHub Deploy keys；私钥遗失时应生成新 key 并删除旧 Deploy key。
- 该 SSH 配置只写在本仓库 `.git/config`，不影响其他 Git 仓库。

## 忽略规则

根目录 `.gitignore` 已排除不应上传的本地/依赖内容：

- `.DS_Store`
- `.env`、`.env.*`
- `node_modules/`
- `.superpowers/`
- 常见构建缓存：`.cache/`、`dist/`、`build/`、`.next/`、`out/`

当前仓库没有启用 Git LFS。首次上传前已确认项目文件未超过 GitHub 单文件 100MB 限制；`node_modules/` 中的大型二进制依赖被忽略。

## 常用命令

检查状态：

```bash
git status -sb
git log --oneline --decorate -5
git remote -v
```

提交新资料：

```bash
git add -A
git commit -m "Update Ming AIGC assets"
```

推送到 GitHub：

```bash
git push
```

验证远端分支：

```bash
git ls-remote --heads origin main
```

## 后续维护规则

- 每次新增正式资产后，先确认 `.gitignore` 没有误收依赖目录或系统文件。
- 大于 95MB 的新文件要先检查是否会接近 GitHub 单文件限制。
- 若后续出现 `Permission denied (publickey)`，优先检查 GitHub Deploy key 是否仍存在且开启写权限。
- 若更换电脑或迁移目录，需要重新复制或生成 SSH key，并在仓库 `.git/config` 中恢复 `core.sshCommand`。
