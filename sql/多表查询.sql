


-- 创建学生表
create table student(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    no varchar(10) comment '学号'
) comment '学生表';

insert into student values (null, '黛绮丝', '2000100101'),(null, '谢逊','2000100102'),
                           (null, '殷天正', '2000100103'),(null, '韦一笑', '2000100104');

create table course (
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '课程名称'
) comment '课程表';

insert into course values (null, 'Java'), (null, 'PHP'), (null , 'MySQL') ,(null, 'Hadoop');

create table student_course (
    id int auto_increment comment '主键' primary key,
    studentid int not null comment '学生ID',
    courseid int not null comment '课程ID',
    constraint fk_courseid foreign key (courseid) references course (id),
    constraint fk_studentid foreign key (studentid) references student (id)
)   comment '学生课程中间表';

insert into student_course values (null,1,1),(null,1,2),(null,1,3),(null,2,2),
(null,2,3),(null,3,4);

-- 多表查询概述
-- 删除并重新创建emp表和dept表
use schema_test_db;
truncate table emp;
ALTER TABLE emp DROP FOREIGN KEY fk_emp_dept_id;
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id);
truncate dept;

INSERT INTO dept (id, name) VALUES (1, '研发部'), (2, '市场部'),(3, '财务部'), (4,
'销售部'), (5, '总经办');

INSERT INTO emp (id, name, age, job,salary, entrydate, managerid, dept_id)
VALUES
(1, '金庸', 66, '总裁',20000, '2000-01-01', null,5),(2, '张无忌', 20,
'项目经理',12500, '2005-12-05', 1,1),
(3, '杨逍', 33, '开发', 8400,'2000-11-03', 2,1),(4, '韦一笑', 48, '开
发',11000, '2002-02-05', 2,1),
(5, '常遇春', 43, '开发',10500, '2004-09-07', 3,1),(6, '小昭', 19, '程
序员鼓励师',6600, '2004-10-12', 2,1);

select count(*) from dept;

-- 多表查询
select * from emp,dept; -- 笛卡尔积 所有的组合情况
select * from emp,dept where emp.dept_id = dept.id;

-- 内连接
-- 隐式内连接 SELECT 字段列表 FROM 表1 , 表2 WHERE 条件 ... ;
-- 查询每一个员工的姓名 , 及关联的部门的名称 (隐式内连接实现)
select emp.name as name, dept.name as deptName from emp, dept where emp.dept_id = dept.id;

-- 显示内连接
select e.name, d.name from emp e inner join dept d on e.dept_id = d.id;

-- 查询emp表的所有数据和部门数据 (左外连接
select e.*, d.name from emp e left outer join dept d on e.dept_id = d.id;
select e.*, d.name from emp e left join dept d on e.dept_id = d.id;

-- 查询dept表的所有数据, 及其对应的emp数据
select d.*,e.* from emp e right join dept d on d.id = e.dept_id order by d.id desc ;

-- 左外即右外, 右外即左外
select d.*,e.* from dept d left join emp e on d.id = e.dept_id order by d.id desc ;
select e.*, d.name from  dept d  right join emp e on e.dept_id = d.id;

-- 自连接: 无关内外连接
-- 自连接的内连接: 内连接只会查询交集数据
-- 查询所有员工和其领导的名字
select e.name,e1.name as manageName from emp e  join emp e1 on e.id=e1.managerid;
select e.name, e1.name as manageName from emp e ,emp e1 where e.id = e1.managerid;

-- 查询所有员工和其领导的名字, 员工没有领导也需要查询
-- 这里使用外连接
select e.name, e1.name from emp e left join emp e1 on e.managerid = e1.id; -- 思考? 为啥是e.managerid = e1.id ?
-- !! 这里应该看成两张表, e是员工表, e1是领导表 !!

-- 联合查询: 关键字 union [all]
-- 案例: 将薪资低于 5000 的员工 , 和 年龄大于 50 岁的员工全部查询出来.
select * from emp where salary < 5000 or age > 50;

select * from emp where salary < 5000
union all
select * from emp where age > 50;

select * from emp where salary < 5000
union
select * from emp where age > 50;

-- 子查询
-- 标量子查询
-- 1. 查询销售部的所有员工 先dept表销售部门的id, 在查emp表dept_id = dept.id
select * from emp where dept_id =  (select id from dept where name ='销售部'); --
-- (select id from dept where name ='销售部') 为子查询

-- 2. 查询赵敏之后入职的人员名单
select * from  emp  where entrydate > (select entrydate from emp where name ='赵敏');

-- 列子查询
-- 1.. 查询 "销售部" 和 "市场部" 的所有员工信息, 先查询出销售部和市场部的部门id,
select id from dept where name in('销售部','市场部');
select * from emp where dept_id in(select id from dept where name in('销售部','市场部'));

-- 2. 查询比 财务部 所有人工资都高的员工信息 !! 注意这里可以先查询出财务部的最高工资, 但是我们先不这么做
-- 先查询出财务部所有人的工资
select id from dept where name = '财务部';
select salary from emp where dept_id = (select id from dept where name = '财务部');
select * from emp where salary > all(select salary from emp where dept_id = (select id from dept where name = '财务部'));

-- 3. 查询比研发部其中任意一人工资高的员工信息 老样子先查询出研发部所有人的工资
select salary from emp where dept_id = (select id from dept where name = '研发部');
select * from emp where salary > some(select salary from emp where dept_id = (select id from dept where name = '研发部'));

-- 行子查询
-- 1. 查询和张无忌工资和领导相同的员工信息, 先查询出张无忌的工资和领导
-- 其实这个地方不需要查询部门的名称.
select salary,dept.name from emp join dept on emp.dept_id = dept.id where emp.name = '张无忌';
-- 算了, 先来个正常的
select salary, managerid from emp where name = '张无忌';
select * from emp where salary = (select salary from emp where name = '张无忌') and managerid = (select managerid from emp where name = '张无忌');
-- 另一种写法
select * from emp where (salary,managerid) = (select salary, managerid from emp where name = '张无忌');

-- 表子查询
-- 1. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
-- 先查询 两位员工的职位和薪资
select job, salary from emp where name in('鹿杖客','宋远桥');
select * from emp where (job,salary) in (select job, salary from emp where name in('鹿杖客','宋远桥'));

-- 2. 查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息
-- 先查出在2006-01-01之后入职的员工
select * from emp where  '2006-01-01' > entrydate;
select e.*,dept.name from (select * from emp where  '2006-01-01' > entrydate) e left join dept on dept.id = e.dept_id;
select sum(age) + sum(salary) from emp;


-- 案例
-- 准备数据
create table salgrade(
grade int,
losal int,
hisal int
) comment '薪资等级表';
insert into salgrade values (1,0,3000);
insert into salgrade values (2,3001,5000);
insert into salgrade values (3,5001,8000);
insert into salgrade values (4,8001,10000);
insert into salgrade values (5,10001,15000);
insert into salgrade values (6,15001,20000);
insert into salgrade values (7,20001,25000);
insert into salgrade values (8,25001,30000);
-- 1. 查询员工的姓名,年龄,职位,部门信息
-- 2. 查询年龄小于30岁的员工的姓名、年龄、职位、部门信息
-- 3. 查询拥有员工的部门ID、部门名称
-- 4. 查询所有年龄大于40岁的员工, 及其归属的部门名称; 如果员工没有分配部门, 也需要展示出来
-- 5. 查询所有员工的工资等级
-- 6. 查询研发部所有员工的信息及工资等级
-- 7. 查询研发部员工的平均工资
-- 8. 查询工资比'灭绝'高的员工信息
-- 9. 查询比平均工资高的员工信息
-- 10. 查询低于本部门平均工资的员工信息
-- 11. 查询所有的部门信息, 并统计部门员工数量
-- 12. 查询所有学生的选课情况, 展示出学生名称, 学号, 课程名称

-- 1. 查询员工的姓名,年龄,职位,部门信息
-- 使用隐士内连接: 思考 ? 先查询出笛卡尔积, 在根据where条件进行筛选
select e.name,age,job, e.name from emp e, dept d where e.dept_id = d.id;
-- 使用显示内连接: 思考 ? 内连接条件
select e.name,age,job, e.name from emp e join dept d on e.dept_id = d.id;
-- 2. 查询年龄小于30岁的员工的姓名、年龄、职位、部门信息
-- 隐士内连接
select e.*,d.name from emp e, dept d where e.dept_id = d.id and e.age < 30;
-- 显示内连接
select emp.*, d.name from emp join dept d on d.id = emp.dept_id where emp.age < 30;
-- 3. 查询拥有员工的部门ID、部门名称
select distinct dept.id, dept.name from dept, emp where dept.id = emp.dept_id;
-- 4. 查询所有年龄大于40岁的员工, 及其归属的部门名称; 如果员工没有分配部门, 也需要展示出来
select e.*,d.name from emp e left join dept d on e.dept_id=d.id where e.age > 40 order by age desc;
# select  * from emp, dept where emp.dept_id = dept.id and  a.age > 40; 为啥不行? 其实是dept_id可以为null的问题!!!
-- 5. 查询所有员工的工资等级
-- 5.1 先查询出所有员工的工资
select salary from emp;
-- 5.2 在查询工资等级表,
-- 5.3 左外连接方式
select e.name, s.grade from emp e left join salgrade s on e.salary between s.losal and s.hisal;
-- 5.3 隐士内连接方式 ? 要思考 ? 显示连接和隐士连接的问题
select e.name, s.grade from salgrade s, emp e where e.salary between s.losal and s.hisal;

-- 隐士连接基本都是全量的数据, 除非隐士连接的查询条件为null

-- 6. 查询研发部所有员工的信息及工资等级
select * from emp,dept where emp.dept_id = dept.id and emp.dept_id = (select id from dept where dept.name = '研发部');
select * from emp join dept d on emp.dept_id = d.id where emp.dept_id = (select id from dept where dept.name = '研发部');
select emp.*, salgrade.grade from emp, salgrade where salary between salgrade.losal and salgrade.hisal and emp.dept_id = (select id from dept where dept.name = '研发部');
select emp.*, salgrade.grade from emp, salgrade where salgrade.losal < salary and salary < salgrade.hisal and emp.dept_id = (select id from dept where dept.name = '研发部');


select emp.name,age,job,dept.name from emp left join dept on emp.dept_id = dept.id where age < 30 order by age desc;
# select distinct * from  dept join(select dept_id from emp where dept_id is not null) e on dept.id = e.dept_id;
select distinct dept.id, dept.name from emp, dept where emp.dept_id = dept.id;
select emp.name,dept.name, emp.age from emp left join dept on emp.dept_id = dept.id where emp.age> 40;
-- 5. 先查询出笛卡尔乘积, 在进行筛选
select emp.name, s.grade from emp,salgrade s where salary between s.losal and s.hisal;
select emp.*, s.grade from emp,salgrade s where salary between s.losal and s.hisal and emp.dept_id = (select id from dept where name='研发部');
-- 查询研发部员工的平均工资
select avg(salary) from emp where emp.dept_id =(select id from dept where name='研发部');
-- 查询工资比'灭绝'高的员工信息
select * from emp where salary > (select salary from emp where name = '灭绝');
--
select  * from emp where salary >  (select avg(salary) from emp);
-- 查询低于本部门平均工资的员工信息
select * from emp e2 where e2.salary < ( select avg(e1.salary) from emp e1 where
e1.dept_id = e2.dept_id );

select dept.*,count(*) from dept, emp where emp.dept_id = dept.id group by dept.id;

-- data_format
# select date_format(entrydate, '%Y-%m') from emp;
-- 都不为null时才可以这样操作!!!
select sum(salary + age) from emp;
-- 正确操作方式
select sum(ifnull(salary,0)+ ifnull(age,0)) from emp;

update emp set age = age + 1 where id
