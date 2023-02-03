select database();
use schema_test_db;
-- 内连接: 查询多张表的交集部分
-- 隐士内连接: select 字段列表 from 表1, 表2, ..., 表n where 条件 ...;
-- 显示内连接: select 字段类别 from 表1 [inner] join 表2 on 连接条件 ...;
-- !!! 注意: 内连接只能查询多张表的交集部分
select * from emp, dept; -- 笛卡尔乘积, 得出所有表肯能排列的乘积
-- 查询员工信息和对应的部门(这里可以看到结果是少了一个的, 这是因为我们的数据中emp.dept_id存在一个null, 和dept.id没有对应的值)
select * from emp, dept where emp.dept_id = dept.id; -- 隐士内连接: 根据where条件筛出emp.dept_id = dept.id的数据;
select * from emp e join dept d on e.dept_id = d.id; -- 显示内连接: 连接条件 e.dept_id = d.id

-- 外连接: 查询连接表的"所有数据"和被连接表的交集数据, 分左外连接和右外连接
-- 左外连接: select 字段列表 from 表1 lfet [outer] join 表2 on 连接条件 ...;
-- 右外连接: select 字段列表 from 表1 right [outer] join 表2 on 连接条件 ...;
-- 注意: 外连接是可以查询某个表的全部数据的!!!
select * from emp e left join dept d on e.dept_id = d.id; -- 很显然, 这里拥有emp的所有数据
select * from emp e right join dept d on e.dept_id = d.id; -- 很显然, 这里拥有dept的所有数据

-- 自连接: 就是自己连接自己，也就是把一张表连接查询多次. 自连接必须用到表别名
-- 自连接的意义: 部分数据关联表内的其他数据, 比如, 员工的上级领导人
-- select * from 表1 b join 表1 b1 on 连接条件 ...;
select e1.name as manageNamefrom , e.* from emp e left join emp e1 on e.managerid = e1.id; -- 查询员工信息,和员工领导的名称

-- 联合查询: 将多张表的查询结果之间拼在起来, 形成一张表
-- union [all] : 不加all就是去重
select * from emp where age >40 union select * from emp where salary<20000;

-- 子查询/嵌套查询
-- 子查询外部的语句可以是 INSERT / UPDATE / DELETE / SELECT 的任何一个
-- 子查询按位置可以分为 where form select 后
-- 按查询结果分
-- 1.标量子查询: 查询结果为单个值(数值, 日期, 字符串), 常使用 = <> > >= < <=
-- 1-1. 查询销售部的所有员工
select * from emp where dept_id = (select id from dept where name = '销售部'); -- 先dept表销售部门的id, 在查emp表dept_id = dept.id
-- 1.2 查询赵敏之后入职的人员名单
select * from emp where entrydate > (select entrydate from emp where name = '赵敏');

-- 2. 列子查询: 查询一列结果, 常使用 操作符 IN 、NOT IN 、 ANY 、SOME 、 ALL
-- 2.1 查询 "销售部" 和 "市场部" 的所有员工信息,
select * from emp where dept_id in(select id from dept where name in('销售部','市场部')); -- 先查询出两个部门的id
-- 2.2 查询比 财务部 所有人工资都高的员工信息
select * from emp where salary > all(select salary from emp where emp.dept_id = (select id from dept where name = '财务部'));
-- 先查询出财务部们id, 在查询出财务部的所有工资/或者最大工资, 最后筛选
-- 2.3 查询比研发部其中任意一人工资高的员工信息
select * from emp where salary > some(select salary from emp where emp.dept_id = (select id from dept where name = '研发部'));

-- 3. 行子查询: 查询的结果为一行数据(不论列数), 常用的操作符: = 、<> 、IN 、NOT IN
-- 3.1 查询工资, 领导都和张无忌一样的员工信息
select * from emp where salary = (select salary from emp where name = '张无忌') and managerid = (select managerid from emp where name = '张无忌');
-- 3.1 优化
select * from emp where (salary,managerid) = (select salary,managerid from emp where name = '张无忌');

-- 4.列子查询 子查询返回的结果是多行多列 in
-- 查询与 "鹿杖客" 或 "宋远桥" 的职位和薪资相同的员工信息
select * from emp where (salary,job) in(select salary,job from emp where name = '鹿杖客' or name = '宋远桥' );
-- 查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息
select emp.*, dept.* from emp left join dept on emp.dept_id = dept.id where emp.entrydate > '2006-01-01';
select e.*, d.* from (select * from emp where entrydate > '2006-01-01') e left join dept d on e.dept_id = d.id;

-- 多表查询案例
-- 1. 查询员工的姓名、年龄、职位、部门信息
select e.name, e.age, e.job, d.name deptName from emp e, dept d where e.dept_id = d.id;
select e.name, e.age, e.job, d.name from emp e inner join dept d on e.dept_id = d.id;

-- 2. 查询年龄小于30岁的员工的姓名、年龄、职位、部门信息
select e.name, e.age, e.job, d.name from emp e , dept d where e.dept_id = d.id and e.age < 30;
select e.name, e.age, e.job, d.name  from emp e inner join dept d on e.dept_id = d.id where age < 30;

-- 3. 查询拥有员工的部门信息
select distinct d.* from dept d, emp e where e.dept_id = d.id;

-- 4. 查询所有年龄大于40岁的员工, 及其归属的部门名称; 如果员工没有分配部门, 也需要展示出
select e.name, d.name from emp e left outer join dept d on e.dept_id = d.id;

-- 5. 查询所有员工的工资等级
select e.name, g.grade from emp e,salgrade g where e.salary between g.losal and g.hisal;
select e.name, g.grade  from emp e left outer join salgrade g on e.salary between g.losal and g.hisal;

-- 6. 查询 "研发部" 所有员工的信息和工资等级
select e.name, g.grade from emp e, salgrade g
    where salary between g.losal and g.hisal
        and e.dept_id = (select id from dept where name = '研发部');
select * from emp e
    left outer join salgrade g on e.salary between g.losal and g.hisal
         where e.dept_id = (select id from dept where name = '研发部');

-- 7. 查询 "研发部" 员工的平均工资
select avg(salary),count(salary) from emp where emp.dept_id = (select id from dept where name = '研发部');
select avg(salary) from emp left join dept on emp.dept_id = dept.id where dept.name = '研发部';

-- 8. 查询工资比 "灭绝" 高的员工信息
select * from emp where salary > (select salary from emp where name = '灭绝');

-- 9. 查询比平均薪资高的员工信息
select * from emp where salary > (select avg(salary) from emp);

-- 10. 查询低于本部门平均工资的员工信息
-- 10.1 先查询各个部门的平均工资 --> 利用到分组查询
select dept.*, avg(salary) from dept join emp on dept.id = emp.dept_id group by dept.id;
--
select * from emp,
              (select dept.*, avg(salary) sal from dept join emp on dept.id = emp.dept_id group by dept.id) n
         where salary < n.sal and n.id = emp.dept_id;
-- 10.2 在查询员工工资的中途中, 查询员工所在部门的平均工资, 和员工的工资进行比较
select avg(e1.salary) from emp e1 where e1.dept_id = 1;
select * from emp e2 where e2.salary < ( select avg(e1.salary) from emp e1 where
e1.dept_id = e2.dept_id );

-- 11. 查询所有的部门信息, 并统计部门的员工人数
-- 11.1 我的思考, 查询所有部门信息, emp左连接dept, 然后根据dept.id分组, 统计员工总数
select dept.*,count(emp.dept_id) from dept left outer join emp on dept.id = emp.dept_id group by dept.id;
-- 11.2 教学: 查询dept信息
select d.id, d.name , ( select count(*) from emp e where e.dept_id = d.id ) '人数' from dept d;

-- 12. 查询所有学生的选课情况, 展示出学生名称, 学号, 课程名称;
-- 12. 1
select * from student left join student_course sc on student.id = sc.studentid
left join course c on sc.courseid = c.id;
-- 12.2
select s.name , s.no , c.name from student s , student_course sc , course c where
s.id = sc.studentid and sc.courseid = c.id ;


-- 查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息
select * from (select * from emp where entrydate > '2006-01-01') d left join dept on dept.id = d.dept_id;