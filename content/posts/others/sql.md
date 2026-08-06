---
title: "Sql Test"
date: 2021-09-09T10:12:08+08:00
draft: false

---

# SQL练习

## 单表查询练习

题目见参考2

```sql
1. select * from emp where deptno='30';
2. select enam, empno, deptno from emp where job='销售员';
3. select enam from emp where COMM>sal;
4. select enam form emp where COMM>(sal*0.6);
5. select * from emp where deptno='10' and job='经理';
   select * from emp where deptno='20' and job='销售员';
6. 5错了6就肯定也不知道怎么写了
7. select enam from emp where COMM=NULL or NULL<1000;
8. count不能用在where后面，那这个应该怎么写？
9. select enam from emp where hiredate like '2000%';
10.select * from emp order by empno asc;
11.select * from emp order by sal desc, hiredate asc;
```

有几个不会写或者写错了哈：5，6，7，8

```sql
5. select * from emp where (deptno=10 and job='经理') or (deptno=20 and job='销售员')
7. select enam from emp where COMM is NULL or COMM<1000;
8. select enam from emp where enam like '___';
```

## 多表查询练习

题目见参考4

```sql
1. select e.deptno, d.dname, d.loc and count(*)
	 from emp e
	 join dept d
	 on e.deptno=d.deptno
2. select e.ename
	 from emp e
	 join salgrade s
	 on e.sal between  ？？？还有子查询？不讲武德
3. select e1.ename, e2.ename
	 from emp e1
	 join emp e2
	 on e1.mgr = e2.empno
4. select e1.empno, e1.ename, d.dname
   from emp e1
   join emp e2
   on e1.hiredate < e2.hiredate and e1.mgr=e2.emptno
   join dept d
   join e1.deptno=d.deptno
5. select d.dname, e.*
   from dept d
   left join empt e
   on d.deptno=e.deptno
6. select e.ename, d.dname, 
   这种要取到统计数据的SQL我就不会写了
7. 同6
8. 不会
9. 不会
10.select e.* and d.dept
   from emp e
   join dept d
   on e.deptno=d.deptno
   where e.job=(select job from emp where ename='庞统')
12.不会
```

看啊，一到多表查询直接抓瞎。好家伙这得一个一个重新做啊，就第5题做对了。

**1. 查出至少有一个员工的部门。显示部门编号、部门名称、部门位置、部门人数。** 

至少有一个员工的部门显示所有信息如何表示？

```sql
select deptno, count(*) from emp group by deptno;
```

然后再联表查：

```sql
select d.deptno, d.dname, d.loc, temp.`count(*)`
from dept d
join (select deptno, count(*) from emp group by deptno) temp
on temp.deptno = d.deptno
```

**2. 列出薪金比关羽高的所有员工。**

这一题和join无关。

```sql
select * from emp
where sal>(select sal from emp where ename='关羽')
```

**3. 列出所有员工的姓名及其直接上级的姓名。**

这个自连接需要注意e1是ename，e2还是ename，不是mgr哈

**4. 列出受雇日期早于直接上级的所有员工的编号、姓名、部门名称。**

```sql
select e1.empno, e1.ename, d.dname
from emp e1
left join emp e2
on e1.mgr = e2.ename
left join dept d
on d.deptno = e.deptno
where e1.hiredate<e2.hiredate
```

**6. 列出所有文员的姓名及其部门名称，部门的人数。**

```sql
select e.ename, d.dname, temp.`count(*)`
from emp e
join dept d
on e.deptno = d.deptno
join (select deptno, count(*) from emp group by deptno) temp
on temp.deptno = e.deptno
where e.jon='文员'
```

**7. 列出最低薪金大于15000的各种工作及从事此工作的员工人数。**

```sql
select job, count(*)
from emp
group by job
where MIN(sal)>15000
```

这个题还是稍微有点意思的，我一开始没有加MIN关键字。这又什么问题呢？当然是有问题的哈，有了group by的话，后面如果不加MIN是没有意义的，因为group by了之后是一组数据，而直接sal是一个数据。所以需要加上分组函数MIN，这就符合题意了。

**8. 列出在销售部工作的员工的姓名，假定不知道销售部的部门编号。**

```sql
select e.ename
from emp e 
join dept d
on e.deptno = d.deptno
where d.dname='销售部'
```

**9. 列出薪金高于公司平均薪金的所有员工信息，所在部门名称，上级领导，工资等级。**

```sql
select e1.*, d.dname, e2.ename, g.grade
from emp e1
join emp e2 on e1.mgr = e2.name
join dept d on e1.deptno = d.deptno
join salgrade g on e1.sal between g.lowsale and g.highsale
where e1.sal>(select AVG(sal) from emp)
```

注意哈，AVG不能直接用，一定是放在select语句里面的。

**10.列出与庞统从事相同工作的所有员工及部门名称。**

```sql
select e.*, d.dname
from emp e
join dept d on d.deptno = e.deptno
where e.job = (select job from emp where ename='')
```

**11.列出薪金高于在部门30工作的所有员工的薪金的员工姓名和薪金、部门名称。**

```sql
select e.ename, e.sal, d.dname
from emp e
left join dept d on e.deptno = d.deptno
where sal>(select MAX(sal) from emp group by deptno where deptno=30)
```

这个where的写法，我这种跟标准答案有什么区别呀？我感觉标准答案的执行效率肯定是比我的要高

标准答案：`where sal>ALL(select sal from emp where deptno=30)`

**12.列出每个部门的员工数量、平均工资。**

```sql
select d.dname, temp.`count(*)`, temp.`AVG(sal)`
from dept d
join (select deptno, count(*), AVG(sal) from emp group by deptno) temp
on d.deptno = temp.deptno
```

# 参考

1. https://blog.csdn.net/m0_37857602/article/details/77749686 （分组函数与group by）

2. https://www.cnblogs.com/gdwkong/p/7487248.html （SQL单表查询练习题）

3. https://www.bilibili.com/video/BV1fx411X7BD（SQL视频讲解）

4. https://blog.csdn.net/fy_java1995/article/details/80305172 （多表查询练习）
