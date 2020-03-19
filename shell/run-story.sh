#!/usr/bin/env bash
export PORT=4000                                    # 当前用户使用的端口号
export APP_LANGUAGE=cn                              # 当前应用使用的语言，如果有多语言则需要在不同语言中启动不同应用进行切换，不建议单库多语言部署
export APP_ENDPOINT=http://localhost:7000           # 当前应用需要访问的远程EndPoint
export APP_NAME=vie.app.htl                         # 该应用名称
export APP_ROUTE=zui                                # 该应用的动态路由根路径地址
export KEY_SESSION=@@ZUI/                           # Session Key前缀
export KEY_EVENT=@@ZUI-ACT                          # Redux 中的Event对应的Key前缀
export DEV_DEBUG=true                               # 是否开启Debug模式
export DEV_MOCK=true                                # 是否启用Mock
export UX_SHARED=app

export SB_PORT=6006
npm run-script build-storybook
npm run-script storybook