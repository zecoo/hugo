---
title: "Kubeadm 安装记录"
date: 2020-04-28T16:37:07+08:00
draft: true
tags: ["k8s", "kubeadm"]
categories: ["k8s"]
---

装好的那一瞬间，我感动得要哭了。我现在也算半个k8s运维小能手了吧。

安装K8s有这几种方法

1. minikube
2. mircok8s
3. kubeadm

这三种方法我都用过。minikube在win上以虚拟机的形式运行，挺麻烦的讲道理。microk8s是最友好的方式，解决一个拉镜像的问题，也就不成问题了。kubeadm应该是最麻烦的了。

回归正题，记录整个安装以及填坑的过程。

首先docker要安装上。

然后，kubelet、kubeadm、kubectl、kubernetes-cni一套安装下来。

我现在才看到参考1中的一句话：

```shell
# 指定版本否则都会默认安装库中最新版本，会因为彼此依赖的版本不同安装失败
$ yum install -y kubelet-1.13.1 kubeadm-1.13.1 kubectl-1.13.1   kubernetes-cni-0.6.0
# 设置开机启动并启动kubelet
$ systemctl enable kubelet && systemctl start kubelet
```

看到第一句话了吗？给我大声读几遍！！我就是因为这个，吃了多少亏，搜索多少资料😭。请一定保证你的kubelet、kubeadm、kubectl的版本相同。

第二步，`kubeadm config images list`列出所有需要的image，因为国内网络问题嘛，一样的。然后用以下bash脚本安装好，docke images检查一下。

```bash
for  i  in  `kubeadm config images list`;  do
    imageName=${i#k8s.gcr.io/}
    docker pull registry.aliyuncs.com/google_containers/$imageName
    docker tag registry.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
    docker rmi registry.aliyuncs.com/google_containers/$imageName
done;
```

第三步，`kubeadm init --pod-network-cidr=10.244.0.0/16`初始化kubeadm。这一步最重要的是`/etc/kubernetes/admin.conf`这个文件。还有后面那个参数，如果不加上，就会遇到新的坑哦～

init结束之后，不要忘了提示的三行命令

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

第四步，到了这里，我们发现所有的pod都运行挺好的，除了coredns。但是镜像也都下载好了，为什么宁就比较特殊呢？然后我describe了一下，发现和flannel有关。

所以啦，就是要先把flannel给部署好。注意版本问题。

> 版本1.13.1使用的是github上flannel-old.yml文件。而1.17以上版本用的是flannel.yml文件。

这里还有一个坑，flannel是quay.io库的镜像，国内也是访问不到的，describe flannel pod就能看到该下载哪个版本的flannel镜像。还有刚才提到的init后面的参数，如果没有添加这个参数的话，flannel部署也会出问题的😊。好的，flannel解决掉，coredns也就马上部署好了。

最后一套检查一下

```shell
kubectl get node
kubectl get sc
kubectl get pod --all-namespaces
```

## 参考

https://blog.csdn.net/zjcjava/article/details/99317569 （我按照这篇来装的！）

https://blog.csdn.net/woay2008/article/details/93250137 （三行命令没敲能把人愁死）

https://www.cnblogs.com/gscienty/p/10586118.html （简洁版安装过程）

https://www.kubernetes.org.cn/5462.html （带dashboard的教程）

https://www.cnblogs.com/caibao666/p/11664726.html （flannel的那个坑）

https://blog.csdn.net/u012547633/article/details/103846564 （另一个也喜欢记录的小伙伴）

https://www.cnblogs.com/qq952693358/p/6537846.html （E: Unable to lock directory /var/lib/apt/lists/ 错误）

https://learnku.com/articles/29209 （k8s-pull.sh）