---
title:centos7 开发环境配置
date: 2017-02-15 10:31:32
categories：
-centos7
tags:
-centos
reference:
-http://man.linuxde.net/wget
---

### 基础命令

查看本机外网ip
```
$ curl icanhazip.com
```

### wget命令 [[参考]](http://man.linuxde.net/wget)

### 语法
```bash
$ wget (选项) <下载地址>
```
选项：
```
-a<日志文件>：在指定的日志文件中记录资料的执行过程；
-A<后缀名>：指定要下载文件的后缀名，多个后缀名之间使用逗号进行分隔；
-b：进行后台的方式运行wget； 
-B<连接地址>：设置参考的连接地址的基地地址；
-c：继续执行上次终端的任务； 
-C<标志>：设置服务器数据块功能标志on为激活，off为关闭，默认值为on；
-d：调试模式运行指令； 
-D<域名列表>：设置顺着的域名列表，域名之间用“，”分隔； 
-e<指令>：作为文件“.wgetrc”中的一部分执行指定的指令； 
-h：显示指令帮助信息； -i<文件>：从指定文件获取要下载的URL地址； 
-l<目录列表>：设置顺着的目录列表，多个目录用“，”分隔； 
-L：仅顺着关联的连接； 
-r：递归下载方式； 
-nc：文件存在时，下载文件不覆盖原有文件； 
-nv：下载时只显示更新和出错信息，不显示指令的详细执行过程； 
-q：不显示指令执行过程； 
-nh：不查询主机名称； 
-v：显示详细执行过程； 
-V：显示版本信息； 
--passive-ftp：使用被动模式PASV连接FTP服务器； 
--follow-ftp：从HTML文件中下载FTP连接文件。
 ```
 ### 例子

 ```
#使用wget下载单个文件
wget http://www.linuxde.net/testfile.zip

#下载并以不同的文件名保存
wget -O wordpress.zip http://www.linuxde.net/download.aspx?id=1080

#wget限速下载
wget --limit-rate=300k http://www.linuxde.net/testfile.zip

使用wget断点续传
wget -c http://www.linuxde.net/testfile.zip

使用wget后台下载
wget -b http://www.linuxde.net/testfile.zip
tail -f wget-log #查看下载进度

伪装代理名称下载
wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" http://www.linuxde.net/testfile.zip

测试下载链接
wget --spider URL

增加重试次数
wget --tries=40 URL

下载多个文件
wget -i filelist.txt

参考: http://man.linuxde.net/wget
 ```

### firewalld

### 1. 简介
firewalld支持动态更新，不需要重启服务，并加入了zone的概念。
firewalld支持图形化界面和工具界面，字符界面管理工具是 **firwall-cmd**
firewalld默认配置有连个：```/usr/lib/firewalld```（系统配置）和```/etc/firewalld```（用户配置） 

### 2. 安装
```
$ sudo yum install firewalld firewall-config
```
### 3. 运行

查看firewalld状态
```
$ sudo systemctl status firewalld 

$ sudo firewall-cmd --state
```
启动firewalld
```
$ sudo systemctl start  firewalld
```
停止firewalld
```
$ sudo systemctl stop firewalld
```
启用firewalld
```
$ sudo systemctl enable  firewalld
```
禁用firewalld
```
$ sudo systemctl disable firewalld
```

### 4. 配置firewalld

拒绝所有包、取消拒绝所有包、查看是否拒绝所有包
```
$ sudo firewall-cmd --panic-on
$ sudo firewall-cmd --panic-off
$ sudo firewall-cmd --query-panic
```
更新firewall规则（无需断开连接）
```
$ sudo firewall-cmd --reload
```
更新firewall规则（需断开，类似重启）
```
$ sudo firewall-cmd --complete-reload
```
查看所有打开的端口
```
$ sudo firewall-cmd --list-all
$ sudo firewall-cmd --zone=public --list-ports
```
永久添加一个端口到指定的域（需要更新firewall规则）
```
$ sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
```
### nginx常用命令 [[参考]](https://my.oschina.net/psuyun/blog/113694)

查看nginx进程 
```
ps -ef|grep nginx
```

启动nginx
```
#一般启动
nginx
 
#不停止nginx的情况下，重启nginx，重新加载配置文件，启动新的工作线程，完美停止旧的工作线程。
nginx -s reload
```
停止nginx的命令
```
nginx -s stop

#强制停止nginx 
pkill -9 nginx

#完美停止nginx 
 kill -QUIT `cat /var/run/nginx.pid`

#快速停止nginx 
kill -TERM `cat /var/run/nginx.pid`
或者
kill -INT `cat /var/run/nginx.pid`

#完美停止工作进程（主要用于平滑升级） 
kill -WINCH `cat /var/run/nginx.pid`
```
### docker [[参考]](http://blog.csdn.net/iloveyin/article/details/40542519)

常用命令
```
docker version 查看docker的版本号，包括客户端、服务端、依赖的Go等
docker info 查看系统(docker)层面信息，包括管理的images, containers数等
docker search <image> 在docker index中搜索image
docker pull <image> 从docker registry server 中下拉image
docker push <image|repository> 推送一个image或repository到registry
docker push <image|repository>:TAG 同上，指定tag
docker inspect <image|container> 查看image或container的底层信息
docker images TODO filter out the intermediate image layers (intermediate image layers 是什么)
docker images -a 列出所有的images
docker ps 默认显示正在运行中的container
docker ps -l 显示最后一次创建的container，包括未运行的
docker ps -a 显示所有的container，包括未运行的
docker logs <container> 查看container的日志，也就是执行命令的一些输出
docker rm <container...> 删除一个或多个container
docker rm `docker ps -a -q` 删除所有的container
docker ps -a -q | xargs docker rm 同上, 删除所有的container
docker rmi <image...> 删除一个或多个image
docker start/stop/restart <container> 开启/停止/重启container
docker start -i <container> 启动一个container并进入交互模式
docker attach <container> attach一个运行中的container
docker run <image> <command> 使用image创建container并执行相应命令，然后停止
docker run -i -t <image> /bin/bash 使用image创建container并进入交互模式, login shell是/bin/bash
docker run -i -t -p <host_port:contain_port> 将container的端口映射到宿主机的端口
docker commit <container> [repo:tag] 将一个container固化为一个新的image，后面的repo:tag可选
docker build <path> 寻找path路径下名为的Dockerfile的配置文件，使用此配置生成新的image
docker build -t repo[:tag] 同上，可以指定repo和可选的tag
docker build - < <dockerfile> 使用指定的dockerfile配置文件，docker以stdin方式获取内容，使用此配置生成新的image
docker port <container> <container port> 查看本地哪个端口映射到container的指定端口，其实用docker ps 也可以看到
```
### 其他
* 退出container但是保持运行

    默认情况下，如果使用ctrl-c退出container,那么container也会stop

    按ctrl-p ctrl-q可以退出到宿主机，而保持container仍然在运行




