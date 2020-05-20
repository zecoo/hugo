---
title: "Delta debug MS"
date: "2020-05-20T00:00:00+08:00"
tags: ["RCA"]
categories: ["paper"]
draft: false
---

1. a triangular tract of sediment deposited at the mouth of a river, typically where it diverges into several outlets. 

2. the fourth letter of the Greek alphabet ( Δ , δ ), transliterated as ‘d.’. 

3. variation of a variable or function. 

4. 一组影响系统执行dimensions，高效找出导致错误的deltas。这里delta包括（deployment、enviromental、configurations） 

5. 四个dimensions：node、instance、configuration、sequence 

6. node：分布式的服务器，未知性较多 

7. instance：微服务的instance一般都是有状态的，如果没有处理好，相同的instance如果不是同样的状态就会出错。 

8. configuration：docker的配置，k8s的配置，是挺恶心的，万一内存不够，就爆了 

9. sequence：异步的invocation导致错误 

10. 微服务settings作为circumstances，就可以用delta bebugging了，db是一种简化和隔离错误案例的方法 

11. Istio是微服务service mesh的？Istio可以部署在k8s里的 

12. delta debugging的作用是找到min的deltas导致错误 

13. controller：delta debugging的位置，是文章核心嗷 

14. scheduler：根据容器状态选择test case去执行。queue，有可用资源就去跑测试 

15. executor：根据所给的circumstances在docker上跑测试用例，返回测试结果 

16. circumstance：4个dimension的组合 

17. delta：两个cir之间的差异 

18. delta db目的：通过最简单cir抽取导致错误的最小delta set 

19. min setting：一个node，一个instance，默认conf（full memory），正确的seq 

20. general setting：一个可能引起错误的cir 

21. 表示方法：0表示min setting，1表示general setting 

22. seq的表示方法稍微复杂一点，0表示顺序执行，1表示逆序执行 

23. seq能全覆盖，node、instance numbers可以放低一点要求 

24. If the given failing test case still fails with the simplest circumstance, the failure can be thought to be caused by internal faults of related microservices 

25. 我们的目标是找到应用在min cir上导致ftc产生ftr的同时ptc产生ptr的deltas 

26. atomic delta是什么意思？？ 

27. we partition the set of deltas X into n equal-sized partitions 

28. 13vm each 8-core cpu 24gb memory 

29. 36-63 deltas -》 1-2deltas 

30. 就是能分出到底是哪种问题 

31. 但是有个很重要的点就是要开发再确认bug 